import React,{useState,useEffect} from 'react'
import {toast} from 'react-toastify'
import AdminNav from '../../../components/nav/AdminNav'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import {createProduct} from '../../../api/ServerProduct'
import SearchForm from '../../../components/forms/SearchForm'

const CreateProduct = () =>{
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                <div className="col-9">
                    <div className="ml-5 mt-3">
                        <h4>
                            Create Product
                        </h4>
                        FORM
                    </div>
                    <div className="ml-5">
                        SEARCH
                    </div>
                    <div className="ml-5">
                        <hr/>
                        LIST
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateProduct