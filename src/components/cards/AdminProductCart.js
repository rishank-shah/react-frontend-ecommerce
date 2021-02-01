import React from 'react'
import {Card} from 'antd'
import DefaultProduct from '../../components/img/DefaultProduct.jpg'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'

const {Meta} = Card

const AdminProductCart = ({product,handleRemove}) =>{
    const {slug,title,description,images} = product

    return(
        <Card
        hoverable
        className="mt-1"
        cover={<img className="p-2" style={{ height: "250px", objectFit:'cover'}} alt="not available" src={images && images.length? images[0].url : DefaultProduct} />}
        actions={[
            <Link to={`/admin/update/product/${slug}`} ><EditOutlined className="text-primary"/></Link>,
            <DeleteOutlined onClick={()=>handleRemove(slug,title)} className="text-danger"/>
        ]}
        >
            <Meta title={title} description={description.length > 47 ? `${description.substring(0,47)}...` : description} />
        </Card>
    )
}

export default AdminProductCart;