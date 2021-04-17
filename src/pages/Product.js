import React,{useState,useEffect} from 'react'
import {readProduct} from "../api/ServerProduct"
import ProductDetail from '../components/cards/ProductDetail'

const Product = ({match}) =>{
    const [product,setProduct] = useState({})
    const {slug} = match.params 

    useEffect(()=>{
        readProduct(slug)
            .then(res=>setProduct(res.data))
    },[slug])

    return (
        <div className="container-fluid">
            <div className="row pt-4">
                <ProductDetail product = {product} />
            </div>
            <div className="row">
                <div className="col text-center pt-3 pb-5">
                    <hr/>
                    <h4>
                        Related Products
                    </h4>
                    <hr/>
                </div>
            </div>
        </div>
    )
}

export default Product