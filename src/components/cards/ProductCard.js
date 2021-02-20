import React from 'react'
import {Card} from 'antd'
import {EyeOutlined,ShoppingCartOutlined} from '@ant-design/icons'
import DefaultProduct from '../../components/img/DefaultProduct.jpg'
import {Link} from 'react-router-dom'

const {Meta} = Card

const ProductCard = ({product}) =>(
    <Card
        hoverable
        className="mt-1"
        cover={<img className="p-2" style={{ height: "250px", objectFit:'cover'}} alt="not available" src={product.images && product.images.length? product.images[0].url : DefaultProduct} />}
        actions={[
            <Link to={`/view/product/${product.slug}`} ><EyeOutlined className="text-primary"/></Link>,
            <ShoppingCartOutlined />
        ]}
        >
            <Meta title={product.title} description={product.description.length > 47 ? `${product.description.substring(0,47)}...` : product.description} />
        </Card>
)

export default ProductCard;