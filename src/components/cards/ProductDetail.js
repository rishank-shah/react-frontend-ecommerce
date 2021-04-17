import React from 'react'
import {Card,Descriptions,Tabs} from 'antd'
import {Link} from 'react-router-dom'
import {HeartOutlined,ShoppingCartOutlined} from '@ant-design/icons'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DefaultProduct from '../../components/img/DefaultProduct.jpg'
import ShowProductDetails from './ShowProductDetails'

const {TabPane} = Tabs

const ProductDetail = ({product}) =>{
    const {images,title,description} = product
    return (
        <>
            <div className="col-md-7">
                {   images && images.length ?
                    (<Carousel showArrows={true} autoPlay infiniteLoop>
                        { images && images.map((i)=><img src={i.url} key={i.public_id}></img>)}
                    </Carousel>):
                    (<Card 
                        cover={
                        <img className="p-2" style={{ height: "500px", objectFit:'cover'}} alt="not available" src={DefaultProduct} />
                    }>

                    </Card>)
                }

                <Tabs type="card">
                    <TabPane tab="Description" key ="description">
                        {description && description}
                    </TabPane>
                    <TabPane tab="More" key ="more">
                        <ul>
                            <li>
                                See the source code on <a target="_blank" href="https://github.com/rishank-shah/react-frontend-ecommerce">GitHub</a> 
                            </li>
                            <li>
                                More Info
                            </li>
                            <li>
                                More Info
                            </li>
                        </ul>
                    </TabPane>
                </Tabs>
            </div>
            <div className="col-md-5">
                <h2 className="text-center p-3">{title}</h2>
                <Card
                    actions={[
                        <>
                            <ShoppingCartOutlined className="text-success" /><br/>Add To Cart
                        </>,
                        <Link to="/">
                            <HeartOutlined className="text-info" /><br/>Add To WishList
                        </Link>,

                    ]}
                >
                    <ShowProductDetails product={product} />
                </Card>
            </div>
        </>
    )
}

export default ProductDetail