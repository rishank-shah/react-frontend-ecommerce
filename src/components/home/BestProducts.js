import React,{useEffect,useState} from 'react'
import {getProducts} from '../../api/ServerProduct'
import ProductCard from '../cards/ProductCard'
import LoadingCard from '../cards/LoadingCard'

const  BestProducts = ({NUMBER_OF_PRODUCTS}) =>{
    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        getProducts('sold','desc',NUMBER_OF_PRODUCTS)
            .then(res=>{
                setProducts(res.data)
                setLoading(false)
            })
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
        </>
    )
}

export default BestProducts;
