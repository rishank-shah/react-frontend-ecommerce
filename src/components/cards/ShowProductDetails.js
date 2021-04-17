import React from 'react'
import {Link} from 'react-router-dom'

const ShowProductDetails = ({product}) =>{
    const {price,description,category,subcategories,shipping,color,sold,brand,quantity} = product
    return(
        <ul className="list-group">
            <li className="list-group-item">
                Price 
                <span className="label label-default label-pill pull-xs-right">
                    Rs {price}
                </span>
            </li>
            {category && (
                <li className="list-group-item">
                    Category 
                    <Link to={`/category/${category.slug}`} className="label label-default label-pill pull-xs-right">
                        {category.name}
                    </Link>
                </li>
            )}
            {subcategories && subcategories.length >0 && (
                <li className="list-group-item">
                    Sub-Categories 
                    {subcategories.map((s)=><Link to={`/sub-category/${s.slug}`} key={s.slug} className="label label-default label-pill pull-xs-right">{s.name}</Link>)}
                </li>
            )}
            <li className="list-group-item">
                Brand 
                <span className="label label-default label-pill pull-xs-right">
                    {brand}
                </span>
            </li>
            <li className="list-group-item">
                Shipping 
                <span className="label label-default label-pill pull-xs-right">
                    {shipping}
                </span>
            </li>
            <li className="list-group-item">
                Color 
                <span className="label label-default label-pill pull-xs-right">
                    {color}
                </span>
            </li>
            <li className="list-group-item">
                Available Quantity 
                <span className="label label-default label-pill pull-xs-right">
                    {quantity}
                </span>
            </li>
            <li className="list-group-item">
                Sold
                <span className="label label-default label-pill pull-xs-right">
                    {sold}
                </span>
            </li>
        </ul>
    )
}

export default ShowProductDetails