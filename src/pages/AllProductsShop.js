import React,{useEffect,useState} from "react";
import {getProducts,getProductsCount} from '../api/ServerProduct'
import { useSelector,useDispatch } from 'react-redux';
import {Pagination} from "antd"
import ProductCard from '../components/cards/ProductCard'
import {LoadingOutlined} from '@ant-design/icons'

const NUMBER_OF_PRODUCTS_ON_PAGE = 9

const AllProductsShop = () =>{

    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(false)
    const [page,setPage] = useState(1)
    const [productsCount,setProductsCount] = useState(0)

    const {search} = useSelector((state)=>({...state}))
    const {text} = search

    useEffect(()=>{
        setLoading(true)
        getProducts('sold','desc',page,NUMBER_OF_PRODUCTS_ON_PAGE)
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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        Menu
                    </div>
                    <div className="col-md-9">
                        {loading ? (
                            <h3 className="text-center text-danger mt-5">
                                L<LoadingOutlined/>ading
                            </h3>
                        ):(
                            <h3 className="text-center mt-5 p-3 mb-5 jumbotron">
                                Product's
                            </h3>
                        )}
                        {productsCount<1 && <p>No Product Found</p>}
                        <div className="row">
                            {products.map((p)=>(
                                <div key={p._id} className="col-md-4 mt-3 mb-5">
                                    <ProductCard product={p}/>
                                </div>
                            ))}
                        </div>
                        <Pagination 
                            className="text-center mt-5"
                            current={page} 
                            total={(productsCount/NUMBER_OF_PRODUCTS_ON_PAGE) * 10} 
                            onChange={(value)=>setPage(value)}
                        />
                    </div>
                </div>
            </div>
        </>
    )

}

export default AllProductsShop;