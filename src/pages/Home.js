import React from 'react'
import TypeWritterEffect from '../components/cards/TypeWriterEffect'
import NewArrivals from "../components/home/NewArrivals";
import BestProducts from "../components/home/BestProducts";
import CategoryList from '../components/category/CategoryList'
import SubCategoryList from '../components/subcategory/SubCategoryList'

const NUMBER_OF_PRODUCTS = 4

const  Home = () =>{
    return(
      <>
        <div className="jumbotron">
            <h3><TypeWritterEffect arrayOfText={['All Products','Latest Products']} /></h3>
        </div>
        <h4 className="text-center mt-3 mb-4 display-5">New Arrivals</h4>
         <NewArrivals NUMBER_OF_PRODUCTS = {NUMBER_OF_PRODUCTS} />
          <br/>
          <br/>
          <hr/>

          <h4 className="text-center mt-3 mb-4 display-5">Best Sellers</h4>
          <BestProducts NUMBER_OF_PRODUCTS = {NUMBER_OF_PRODUCTS} />
          <br/>
          <br/>
          <hr/>
          
          <h4 className="text-center mt-4 mb-2 display-4">Categories</h4>
          <CategoryList/>
          <br/>
          <br/>
          <hr/>

          <h4 className="text-center mt-4 mb-2 display-4">Sub-Categories</h4>
          <SubCategoryList/>
          <br/>
          <br/>
          <br/>
      </>
    )
}
  
export default Home;
  