import React,{useEffect,useState} from 'react'
import {getProducts,getProductsCount} from '../../api/ServerProduct'
import ProductCard from '../cards/ProductCard'
import LoadingCard from '../cards/LoadingCard'
import {Pagination} from "antd"

const  BestProducts = ({NUMBER_OF_PRODUCTS}) =>{
    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(false)
    const [page,setPage] = useState(1)
    const [productsCount,setProductsCount] = useState(0)


    useEffect(()=>{
        setLoading(true)
        getProducts('sold','desc',page)
            .then(res=>{
                setProducts(res.data)
                setLoading(false)
            })
    },[page])

    useEffect(()=>{
        getProductsCount()
            .then(res=>
                setProductsCount(res.data)
            )
    },[])

    return(
        <>
            <div className="container">
                {
                    !loading ? (
                            <div className="row">
                                {
                                    products.map(p => (
                                        <div key={p._id} className="col-md-3">
                                            <ProductCard product={p}/>
                                        </div>
                                    ))
                                }
                            </div>
                        ):
                        <LoadingCard count = {NUMBER_OF_PRODUCTS}/>
                }
            </div>
            <Pagination 
                className="text-center mt-4"
                current={page} 
                total={(productsCount/4) * 10} 
                onChange={(value)=>setPage(value)}
            />
        </>
    )
}

export default BestProducts;
