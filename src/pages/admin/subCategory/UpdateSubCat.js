import React,{useState,useEffect} from 'react'
import {toast} from 'react-toastify'
import AdminNav from '../../../components/nav/AdminNav'
import {useSelector} from 'react-redux'
import {getCategories} from '../../../api/ServerCategory'
import {updateSubCategory,getSubCategory} from '../../../api/ServerSubCategory'

const UpdateSubCat = ({history,match}) =>{

    const [name,setName] = useState('')
    const [categories,setCategories] = useState([])
    const [parent,setParent] = useState("")

    const {user} = useSelector((state)=>({...state}))

    const listCategoryOnLoad = () => getCategories().then(cat=> setCategories(cat.data))

    const subCategoryLoad = () => getSubCategory(match.params.slug).then(cat=> {
        setName(cat.data.name)
        setParent(cat.data.parent)
    })

    useEffect(()=>{
        listCategoryOnLoad()
        subCategoryLoad()
    },[])

    const handleSubmit = (e) =>{
        e.preventDefault();
        updateSubCategory(user.token,name,parent,match.params.slug)
        .then(res=>{
            setName('')
            toast.success(`Subcategory (${res.data.name}) updated`)
            history.push('/admin/subcategory')
        })
        .catch(err=>{
            if(err.response.status === 400)
                toast.error(err.response.data)
        })
    }

    const subCategoryForm = () =>(
        <form onSubmit={handleSubmit} >
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" onChange={e=>setName(e.target.value)} value={name} autoFocus required></input>
            </div>
            <div className="form-group">
                <label>Select Category:</label>
                <select name="category" className="form-control" onChange={e=> setParent(e.target.value)}>
                    {categories.length > 0 && categories.map((c)=>(
                        <option key={c._id} value={c._id} selected={c._id === parent} >{c.name}</option>
                    ))}
                </select>
            </div>
            <button className="mt-2 btn btn-outline-primary">Update Subcategory</button>
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
                            Update SubCategory
                        </h4>
                        {subCategoryForm()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateSubCat;