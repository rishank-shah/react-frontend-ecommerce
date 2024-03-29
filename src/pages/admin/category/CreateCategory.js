import React,{useState,useEffect,useCallback} from 'react'
import {toast} from 'react-toastify'
import AdminNav from '../../../components/nav/AdminNav'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import {getCategories,createCategory,removeCategory} from '../../../api/ServerCategory'
import SearchForm from '../../../components/forms/SearchForm'

const CreateCategory = () =>{

    const [name,setName] = useState('')
    const [categories,setCategories] = useState([])
    const [searchText,setSearchText] = useState('')

    const {user} = useSelector((state)=>({...state}))

    const listCategoryOnLoad = useCallback(() => getCategories().then(cat=> setCategories(cat.data)),[setCategories])

    useEffect(()=>{
        listCategoryOnLoad()
    },[listCategoryOnLoad])

    const handleDelete = (slug,name) =>{
        let confirm = window.confirm(`Are you sure you want to delete "${name}" Category?`)
        if(confirm){
            removeCategory(user.token,slug)
            .then(res=>{
                listCategoryOnLoad()
                toast.success(`Category "${res.data.name}" Deleted Successfully`)
            })
            .catch(err=>{
                if(err.response.status === 400)
                    toast.error(err.response.data)
            })
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        createCategory(user.token,name)
        .then(res=>{
            setName('')
            listCategoryOnLoad()
            toast.success(`Category (${res.data.name}) created`)
        })
        .catch(err=>{
            if(err.response.status === 400)
                toast.error(err.response.data)
        })
    }

    const search = (key) => (c) => c.name.toLowerCase().includes(key)

    const categoryForm = () =>(
        <form onSubmit={handleSubmit} >
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" onChange={e=>setName(e.target.value)} value={name} autoFocus required></input>
            </div>
            <button className="mt-2 btn btn-outline-primary">Save Category</button>
        </form>
    )

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                <div className="col-9">
                    <div className="ml-5 mt-3">
                        <h4>
                            Create Category
                        </h4>
                        {categoryForm()}
                    </div>
                    <div className="ml-5">
                        <SearchForm searchText={searchText} setSearchText={setSearchText} />
                    </div>
                    <div className="ml-5">
                        <hr/>
                        {categories.filter(search(searchText)).map((cat)=>(
                            <div key={cat._id} className="alert alert-primary">
                                {cat.name}
                                <span onClick={()=> handleDelete(cat.slug,cat.name)} className="btn btn-sm float-right"><DeleteOutlined className="text-danger" /></span>
                                <Link className="btn btn-sm float-right mr-1" to={`/admin/category/${cat.slug}`}><EditOutlined className="text-primary"/></Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCategory;