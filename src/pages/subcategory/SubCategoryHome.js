import React, { useEffect, useState } from 'react'
import {getSubCategoryAndProducts} from '../../api/ServerSubCategory'
import ProductCard from '../../components/cards/ProductCard'
import {LoadingOutlined} from '@ant-design/icons'
import {Pagination} from "antd"

const SubCategoryHome = ({match}) =>{

    const [subCategory,setSubCategory] = useState({})
    const [products,setProducts] = useState([])
    const [productsCount,setProductsCount] = useState([])
    const [loading,setLoading] = useState(false)
    const [page,setPage] = useState(1)

    const {slug} = match.params

    useEffect(()=>{
        setLoading(true)
        getSubCategoryAndProducts(slug,page)
            .then(res=>{
                setSubCategory(res.data.subcategory)
                setProducts(res.data.products)
                setProductsCount(res.data.productsCount)
                setLoading(false)
            })
    },[slug,page])

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    {loading ? (
                        <h3 className="text-center text-danger mt-5">
                            L<LoadingOutlined/>ading
                        </h3>
                    ):(
                        <h3 className="text-center mt-5 p-3 mb-5 jumbotron">
                            {productsCount} Product's Found in "{subCategory.name}" sub-category
                        </h3>
                    )}
                </div>
            </div>
            <div className="row">
                {products.map((p)=>
                    <div className="col-md-3" key={p._id}>
                        <ProductCard product={p} />
                    </div>
                )}
            </div>
            <Pagination 
                className="text-center mt-5"
                current={page} 
                total={(productsCount/4)*10} 
                onChange={(value)=>setPage(value)}
            />
            <br/>
            <br/>
            <br/>
        </div>
    )
}

export default SubCategoryHome