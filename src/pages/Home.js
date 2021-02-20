import React,{useEffect,useState} from 'react'
import {getProductsByCount} from '../api/ServerProduct'
import ProductCard from '../components/cards/ProductCard'
import TypeWritterEffect from '../components/cards/TypeWriterEffect' 

const  Home = () =>{
    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        getProductsByCount(4)
        .then(res=>{
          setProducts(res.data)
          setLoading(false)
        })
    },[])

    return(
      <>
        <div className="jumbotron">
            {!loading ? <h3><TypeWritterEffect arrayOfText={['All Products','Latest Products']} /></h3> : <h3>Loading...</h3>}
        </div>
        <div className="container">
          <div className="row">
            {products.map(p=>(
              <div key={p._id} className="col-md-3">
                <ProductCard product={p} />
              </div>
            ))}  
          </div>   
        </div>
      </>
    )
}
  
export default Home;
  