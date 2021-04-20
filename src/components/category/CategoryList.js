import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {getCategories} from '../../api/ServerCategory'

const CategoryList = () =>{
    
    const [categories,setCategories] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        getCategories()
            .then(res=>setCategories(res.data))
            setLoading(false)
    },[])

    const showAllCategory = () =>
        categories.map((cat)=>
            <div key={cat._id} className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3">
                <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
            </div>
        )

    return(
        <div className="container">
            <div className="row">
                {loading ? (<h4 className="text-center text-danger">Loading</h4>):showAllCategory()}
            </div>
        </div>
    )
}

export default CategoryList