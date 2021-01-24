import React,{useEffect,useState} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {getProductsByCount} from '../../../api/ServerProduct'
import {LoadingOutlined} from '@ant-design/icons'
import AdminProductCart from '../../../components/cards/AdminProductCart'

const ViewProducts = () =>{

    const [products,setProducts] = useState([])
    const [loading,setloading] = useState(false)

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
                                <AdminProductCart product={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProducts;