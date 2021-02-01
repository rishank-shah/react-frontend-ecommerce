import React,{useEffect,useState} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {useSelector} from 'react-redux'
import {getProductsByCount,removeProduct} from '../../../api/ServerProduct'
import {LoadingOutlined} from '@ant-design/icons'
import AdminProductCart from '../../../components/cards/AdminProductCart'
import {toast} from 'react-toastify'

const ViewProducts = () =>{

    const [products,setProducts] = useState([])
    const [loading,setloading] = useState(false)

    const {user} = useSelector((state)=>({...state}))

    const handleRemove = (slug,title) =>{
        let ans = window.confirm(`Are you sure you want to delete ${title}`)
        if(ans){
            removeProduct(user.token,slug)
            .then(res=>{
                toast.success(`Deleted ${res.data.title}`)
                setloading(true)
                getProductsByCount(10)
                .then((re)=>{
                    setProducts(re.data)
                    setloading(false)
                })
                .catch(err=>{
                    console.log(err)
                    setloading(false)
                })
            })
            .catch(err=>{
                console.log(err)
                toast.error('Delete Product Failed')
            })
        }
    }

    useEffect(()=>{
        setloading(true)
        getProductsByCount(10)
        .then((res)=>{
            setProducts(res.data)
            setloading(false)
        })
        .catch(err=>{
            console.log(err)
            setloading(false)
        })
    },[])

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                <div className="col">
                    {loading? (<h4>Loading<LoadingOutlined className="ml-3 text-danger h3"/></h4>): (<h4>All Products</h4>)}
                    <div className="row">
                        {products.map(p=>(
                            <div key={p._id} className="col-md-4">
                                <AdminProductCart product={p} handleRemove={handleRemove} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProducts;