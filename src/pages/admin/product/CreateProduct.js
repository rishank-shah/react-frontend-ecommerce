import React,{useState,useEffect,useCallback} from 'react'
import {toast} from 'react-toastify'
import AdminNav from '../../../components/nav/AdminNav'
import {useSelector} from 'react-redux'
import {createProduct} from '../../../api/ServerProduct'
import CreateProductForm from '../../../components/forms/CreateProductForm'
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

const CreateProduct = () =>{

    const [values,setValues] = useState(initState)
    const [showSubcategory,setShowSubcategory] = useState(false)
    
    const {user} = useSelector((state)=>({...state}))

    const listCategoryOnLoad = useCallback(() => getCategories().then(cat=> setValues({
        ...values,
        categories:cat.data
        // eslint-disable-next-line
    })),[setValues])

    useEffect(()=>{
        listCategoryOnLoad()
    },[listCategoryOnLoad])

    const {title,brand,color,shipping,category} = values

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(!brand){
            toast.error('Please select a valid brand')
            return
        }
        if(!color){
            toast.error('Please select a valid color')
            return
        }
        if(!shipping){
            toast.error('Please select a valid shipping')
            return
        }
        if(!category){
            toast.error('Please select a valid category')
            return
        }
        createProduct(user.token,values)
        .then((res)=>{
            window.location.reload()
            toast.success(`Product ${res.data.title} created successfully`)
            setValues(initState)
        })
        .catch((err)=>{
            const error = err.response.data.err
            if(error.includes('E11000 duplicate key error collection'))
                toast.error(`Product with name ${title} exists in database`)
            else{
                toast.error('Unexpected error while creating Product')
            }
        })
    }

    const handleCategoryChange = (e)=>{
        e.preventDefault()
        setValues({
            ...values,
            category:e.target.value
        })
        getSubcatgeoryByCategory(e.target.value)
        .then(res=>{
            setValues({
                ...values,
                subcategoriesOptions:res.data
            })
        })
    }

    const handleChange = (e) =>{
        setValues({
            ...values,
            [e.target.name]:e.target.value
        })
    }

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                <div className="col-9">
                    <div className="ml-5 mt-3">
                        <h4>
                            Create Product
                        </h4>
                        <CreateProductForm handleSubmit={handleSubmit} handleChange={handleChange}  values={values} handleCategoryChange={handleCategoryChange} showSubcategory={showSubcategory} />
                    </div>
                    <div className="ml-5">
                        SEARCH
                    </div>
                    <div className="ml-5">
                        <hr/>
                        LIST
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateProduct