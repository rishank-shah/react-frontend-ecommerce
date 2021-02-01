import React,{useState,useEffect,useCallback} from 'react'
import {toast} from 'react-toastify'
import AdminNav from '../../../components/nav/AdminNav'
import {useSelector} from 'react-redux'
import {readProduct} from '../../../api/ServerProduct'
import { getCategories,getSubcatgeoryByCategory } from "../../../api/ServerCategory";

const initState = {
    title:'',
    description:'',
    price:0,
    categories:[],
    category:'',
    subcategories:[],
    subcategoriesOptions:[],
    quantity:0,
    images:[],
    shipping:'',
    colors:['Black','White','Brown','Blue','Silver','Gold'],
    color:'',
    brands:['Apple','Samsung','Microsoft','Lenovo','HP','Asus','Dell'],
    brand:''
}

const UpdateProduct = ({match}) =>{

    const [values,setValues] = useState(initState)

    const {slug} = match.params
    const {user} = useSelector((state)=>({...state}))

    useEffect(()=>{
        readProduct(user.token,slug)
        .then(res=>{
            setValues({
                ...values,
                ...res.data
            })
        })
    },[])

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                <div className="col-9">
                    <div className="ml-5 mt-3">
                        <h4>
                            Update Product
                            {JSON.stringify(values)}
                        </h4>
                        FORM
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct