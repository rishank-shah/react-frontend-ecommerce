import React,{useState,useEffect} from 'react'
import {readProduct,starProduct} from "../api/ServerProduct"
import ProductDetail from '../components/cards/ProductDetail'
import {useSelector} from 'react-redux'

const Product = ({match}) =>{

    const [product,setProduct] = useState({})
    const [star,setStar] = useState(0)

    const {user} = useSelector((state)=>({...state}))

    const {slug} = match.params 

    useEffect(()=>{
        readProduct(slug)
            .then(res=>{
                setProduct(res.data)
            })
    },[slug])

    useEffect(()=>{
        if (product.ratings && user){
            let existingRatingObj = product.ratings.find(
                (rat) => rat.postedBy.toString() === user._id.toString()
              );
            existingRatingObj && setStar(existingRatingObj.star)
        }
    },[product,user])

    const onStarClick = (newRating,name)=>{
        setStar(newRating)
        starProduct(name,newRating,user.token)
            .then(res=>{
                console.log(res.data)
                readProduct(slug)
                    .then(res=>setProduct(res.data))
            })
    }

    return (
        <div className="container-fluid">
            <div className="row pt-4">
                <ProductDetail product = {product} onStarClick = {onStarClick} star = {star} />
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