import React from 'react'
import { Link } from "react-router-dom";

const AdminNav = () =>(
    <nav className="d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to='/admin/dashboard' className="nav-link" >Dashboard</Link>
                </li>

                <li className="nav-item">
                    <Link to='/admin/view/products' className="nav-link" >View Products</Link>
                </li>
                
                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>CRUD</span>
                </h6>
                <li className="nav-item">
                    <Link to='/admin/product' className="nav-link" >Product</Link>
                </li>
                <li className="nav-item">
                    <Link to='/admin/category' className="nav-link" >Category</Link>
                </li>
                <li className="nav-item">
                    <Link to='/admin/subcategory' className="nav-link" >Subcategory</Link>
                </li>
                <li className="nav-item">
                    <Link to='/admin/coupons' className="nav-link" >Coupons</Link>
                </li>

                {/* <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>View/Update/Delete</span>
                </h6>
                <li className="nav-item">
                    <Link to='/admin/products' className="nav-link" >Products</Link>
                </li> */}

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Account</span>
                </h6>

                <li className="nav-item">
                    <Link to='/user/password' className="nav-link" >Update Password</Link>
                </li>
            </ul>
        </div>
    </nav>
)

export default AdminNav