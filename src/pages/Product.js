import React, { useState, useEffect } from 'react'
import { readProduct, starProduct, getRelatedProduct } from "../api/ServerProduct"
import ProductDetail from '../components/cards/ProductDetail'
import { useSelector } from 'react-redux'
import ProductCard from '../components/cards/ProductCard'

const Product = ({ match }) => {

  const [product, setProduct] = useState({})
  const [star, setStar] = useState(0)
  const [relatedProducts, setRelatedProducts] = useState([])

  const { user } = useSelector((state) => ({ ...state }))

  const { slug } = match.params

  useEffect(() => {
    readProduct(slug)
      .then(res => {
        setProduct(res.data)

        getRelatedProduct(res.data._id)
          .then(res => setRelatedProducts(res.data))
      })
  }, [slug])

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObj = product.ratings.find(
        (rat) => rat.postedBy.toString() === user._id.toString()
      );
      existingRatingObj && setStar(existingRatingObj.star)
    }
  }, [product, user])

  const onStarClick = (newRating, name) => {
    setStar(newRating)
    starProduct(name, newRating, user.token)
      .then(res => {
        console.log(res.data)
        readProduct(slug)
          .then(res => setProduct(res.data))
      })
  }

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <ProductDetail product={product} onStarClick={onStarClick} star={star} />
      </div>
      <div className="row">
        <div className="col text-center pt-3 pb-3">
          <hr />
          <h4>
            Related Products
          </h4>
        </div>
      </div>
      <div className="row">
        {relatedProducts.length ? relatedProducts.map((prod) =>
          <div className="col-md-3 mt-1">
            <ProductCard key={prod._id} product={prod} />
            <br />
            <br />
            <br />
          </div>
        ) : (
          <>
            <div className="col-md-5">
            </div>
            <div className="col-md-2">
              <h6 className="text-center">No Products found</h6>
            </div>
            <div className="col-md-5">
            </div>
          </>)}
        <br />
        <br />
        <br />
      </div>
    </div>
  )
}

export default Product