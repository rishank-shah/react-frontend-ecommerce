import React,{useState} from 'react'
import {toast} from 'react-toastify'
import AdminNav from '../../../components/nav/AdminNav'
import {useSelector} from 'react-redux'
import {createProduct} from '../../../api/ServerProduct'

const initState = {
    title:'',
    description:'',
    price:0,
    categories:[],
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

const CreateProduct = () =>{

    const [values,setValues] = useState(initState)
    
    const {user} = useSelector((state)=>({...state}))

    const {title,description,price,quantity,colors,brands} = values

    const handleSubmit = (e) =>{
        e.preventDefault()
        createProduct(user.token,values)
        .then((res)=>{
            toast.success(`Product ${res.data.title} created successfully`)
            setValues(initState)
        })
        .catch(()=>
            toast.error('Creating Product Failed')
        )
    }

    const handleChange = (e) =>{
        setValues({
            ...values,
            [e.target.name]:e.target.value
        })
    }

    const productForm = () =>(
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input type="text" name="title" className="form-control" value={title} onChange={handleChange}></input>
            </div>
            <div className="form-group">
                <label>Description</label>
                <input type="text" name="description" className="form-control" value={description} onChange={handleChange}></input>
            </div>
            <div className="form-group">
                <label>Price</label>
                <input type="number" name="price" className="form-control" value={price} onChange={handleChange}></input>
            </div>
            <div className="form-group">
                <label>Shipping</label>
                <select name="shipping" className="form-control" onChange={handleChange}>
                    <option>Select One Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
            <div className="form-group">
                <label>Quantity</label>
                <input type="number" name="quantity" className="form-control" value={quantity} onChange={handleChange}></input>
            </div>
            <div className="form-group">
                <label>Color</label>
                <select name="color" className="form-control" onChange={handleChange}>
                    <option>Select One Color</option>
                    {colors.map((c)=>(
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Brand</label>
                <select name="brand" className="form-control" onChange={handleChange}>
                    <option>Select One brand</option>
                    {brands.map((c)=>(
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
            <button className="btn btn-outline-primary" type="submit">Save Product</button>
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
                            Create Product
                        </h4>
                        {productForm()}
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