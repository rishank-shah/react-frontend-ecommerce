import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {getSubCategories} from '../../api/ServerSubCategory'

const SubCategoryList = () =>{
    
    const [subCategories,setSubCategories] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        getSubCategories()
            .then(res=>setSubCategories(res.data))
            setLoading(false)
    },[])

    const showAllSubCategory = () =>
        subCategories.map((subcat)=>
            <div key={subcat._id} className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3">
                <Link to={`/sub-category/${subcat.slug}`}>{subcat.name}</Link>
            </div>
        )

    return(
        <div className="container">
            <div className="row">
                {loading ? (<h4 className="text-center text-danger">Loading</h4>):showAllSubCategory()}
            </div>
        </div>
    )
}

export default SubCategoryList