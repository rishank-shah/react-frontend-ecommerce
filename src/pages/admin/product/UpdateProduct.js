import React,{useState,useEffect} from 'react'
import {toast} from 'react-toastify'
import AdminNav from '../../../components/nav/AdminNav'
import {useSelector} from 'react-redux'
import {readProduct,updateProduct} from '../../../api/ServerProduct'
import { getCategories,getSubcatgeoryByCategory } from "../../../api/ServerCategory";
import UpdateProductForm from '../../../components/forms/UpdateProductForm'

const initState = {
    title:'',
    description:'',
    price:0,
    category:'',
    subcategories:[],
    quantity:0,
    images:[],
    shipping:'',
    colors:['Black','White','Brown','Blue','Silver','Gold'],
    color:'',
    brands:['Apple','Samsung','Microsoft','Lenovo','HP','Asus','Dell'],
    brand:''
}

const UpdateProduct = ({match,history}) =>{

    const [values,setValues] = useState(initState)
    const [categories,setCategories] = useState([])
    const [subOptions,setSubOptions] = useState([])
    const [arrayOfSubIDs,setArrayOfSubIDs] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("");

    const {slug} = match.params
    const {user} = useSelector((state)=>({...state}))

    const listCategoryOnLoad = () => 
        getCategories().then(cat=> setCategories(cat.data))

    const loadProduct = () =>{
        readProduct(slug)
        .then(res=>{
            setValues({
                ...values,
                ...res.data
            })
            getSubcatgeoryByCategory(res.data.category._id)
            .then(sub => {
                setSubOptions(sub.data)
            })
            let arr = []
            res.data.subcategories.map(s=>{
                arr.push(s._id)
            })
            setArrayOfSubIDs((prev)=>arr)
        })

    }
    useEffect(()=>{
        loadProduct()
        listCategoryOnLoad()
        //eslint-disable-next-line
    },[])

    const handleSubmit = (e)=>{
        e.preventDefault()
        values.subcategories = arrayOfSubIDs
        values.category = selectedCategory ? selectedCategory : values.category
        updateProduct(user.token,slug,values)
        .then(res=>{
            toast.success(`Product updated (${res.data.title})`)
            history.push('/admin/view/products')
        })
        .catch(err =>{
            console.log('Updating failed',err)
            toast.error(err.response.data.err)
        })
    }

    const handleChange = (e) =>{
        setValues({
            ...values,
            [e.target.name]:e.target.value
        })
    }

    const handleCategoryChange = (e)=>{
        e.preventDefault()
        setValues({
            ...values,
            subcategories:[]
        })
        setSelectedCategory(e.target.value)
        getSubcatgeoryByCategory(e.target.value)
        .then(res=>{
            setSubOptions(res.data)
        })
        if(values.category._id === e.target.value){
            loadProduct();
        }
        setArrayOfSubIDs([])
    }

    return(
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav/>
            </div>
            <div className="col-9">
                <div className="ml-5 mt-3">
                    <h4>Update Product</h4>
                    <UpdateProductForm handleSubmit={handleSubmit} handleChange={handleChange}  values={values}  setValues={setValues} handleCategoryChange={handleCategoryChange} subOptions={subOptions} categories={categories} arrayOfSubIDs={arrayOfSubIDs} setArrayOfSubIDs={setArrayOfSubIDs} selectedCategory={selectedCategory} />
                </div>
            </div>
        </div>
    </div>
    )
}

export default UpdateProduct