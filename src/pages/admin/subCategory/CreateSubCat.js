import React,{useState,useEffect,useCallback} from 'react'
import {toast} from 'react-toastify'
import AdminNav from '../../../components/nav/AdminNav'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import {getCategories} from '../../../api/ServerCategory'
import {getSubCategories,createSubCategory,removeSubCategory} from '../../../api/ServerSubCategory'
import SearchForm from '../../../components/forms/SearchForm'

const CreateSubCat = () =>{

    const [name,setName] = useState('')
    const [categories,setCategories] = useState([])
    const [subCategories,setSubCategories] = useState([])
    const [category,setCategory] = useState("")

    const [searchText,setSearchText] = useState('')

    const {user} = useSelector((state)=>({...state}))

    const listCategoryOnLoad = useCallback(() => getCategories().then(cat=> setCategories(cat.data)),[setCategories])

    const listSubCategoryOnLoad = useCallback(() => getSubCategories().then(cat=> setSubCategories(cat.data)),[setSubCategories])

    useEffect(()=>{
        listCategoryOnLoad()
        listSubCategoryOnLoad()
    },[listCategoryOnLoad,listSubCategoryOnLoad])

    const handleDelete = (slug,name) =>{
        let confirm = window.confirm(`Are you sure you want to delete "${name}" Subcategory?`)
        if(confirm){
            removeSubCategory(user.token,slug)
            .then(res=>{
                toast.success(`Subcategory "${res.data.name}" Deleted Successfully`)
                listSubCategoryOnLoad()
            })
            .catch(err=>{
                if(err.response.status === 400)
                    toast.error(err.response.data)
            })
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        createSubCategory(user.token,name,category)
        .then(res=>{
            setName('')
            toast.success(`Subcategory (${res.data.name}) created`)
            listSubCategoryOnLoad()
        })
        .catch(err=>{
            if(err.response.status === 400)
                toast.error(err.response.data)
        })
    }

    const search = (key) => (c) => c.name.toLowerCase().includes(key)

    const subCategoryForm = () =>(
        <form onSubmit={handleSubmit} >
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" onChange={e=>setName(e.target.value)} value={name} autoFocus required></input>
            </div>
            <div className="form-group">
                <label>Select Category:</label>
                <select name="category" className="form-control" onChange={e=> setCategory(e.target.value)}>
                    <option>Please Select</option>
                    {categories.length > 0 && categories.map((c)=>(
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>
            <button className="mt-2 btn btn-outline-primary">Save Subcategory</button>
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
                            Create SubCategory
                        </h4>
                        {subCategoryForm()}
                    </div>
                    <div className="ml-5">
                        <SearchForm searchText={searchText} setSearchText={setSearchText} />
                    </div>
                    <div className="ml-5">
                        <hr/>
                        {subCategories.filter(search(searchText)).map((cat)=>(
                            <div key={cat._id} className="alert alert-primary">
                                {cat.name}
                                <span onClick={()=> handleDelete(cat.slug,cat.name)} className="btn btn-sm float-right"><DeleteOutlined className="text-danger" /></span>
                                <Link className="btn btn-sm float-right mr-1" to={`/admin/subcategory/${cat.slug}`}><EditOutlined className="text-primary"/></Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateSubCat;