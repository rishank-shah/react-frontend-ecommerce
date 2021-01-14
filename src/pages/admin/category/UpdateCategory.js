import React,{useState,useEffect, useCallback} from 'react'
import {toast} from 'react-toastify'
import AdminNav from '../../../components/nav/AdminNav'
import {useSelector} from 'react-redux'
import {getCategory,updateCategory} from '../../../api/ServerCategory'

const UpdateCategory = ({history,match}) =>{

    const [name,setName] = useState('')

    const {user} = useSelector((state)=>({...state}))

    const loadCategory = useCallback(() => getCategory(match.params.slug).then(cat=> setName(cat.data.name)),[match.params.slug,setName])

    useEffect(()=>{
        loadCategory()
    },[loadCategory])

    const handleSubmit = (e) =>{
        e.preventDefault();
        updateCategory(user.token,name,match.params.slug)
        .then(res=>{
            setName('')
            history.push('/admin/category')
            toast.success(`Category (${res.data.name}) Updated`)
        })
        .catch(err=>{
            if(err.response.status === 400)
                toast.error(err.response.data)
        })
    }

    const categoryForm = () =>(
        <form onSubmit={handleSubmit} >
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" onChange={e=>setName(e.target.value)} value={name} autoFocus required></input>
            </div>
            <button className="mt-2 btn btn-outline-primary">Update Category</button>
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
                            Update Category
                        </h4>
                        {categoryForm()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateCategory;