import React, { useState } from 'react'
import resizer from 'react-image-file-resizer'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { toast } from 'react-toastify'
import {Avatar,Badge} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'

const ImageUpload = ({values,setValues}) =>{

    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)

    const {user} = useSelector((state)=>({...state}))

    const handleImageRemove = (public_id)=>{
        setLoading(true)
        axios.post(`${process.env.REACT_APP_API_URL}/remove-image`,{
            public_id
        },{
            headers:{
                authtoken: user?user.token:''
            }
        })
        .then(res=>{
            if(res.data.message){
                const {images} = values
                let filImages = images.filter((image)=>{
                    return image.public_id !== public_id
                })
                setValues({
                    ...values,
                    images:filImages
                })
                setLoading(false)
                toast.success(res.data.message)
            }
        })
        .catch(()=>{
            setLoading(false)
            toast.error("Failed Image Remove")
        })
    }

    const uploadAndResize = (e) =>{
        setLoading(true)
        let files = e.target.files
        let uploadedFiles = values.images
        if(files){
            for (let i = 0; i < files.length; i++) {
                resizer.imageFileResizer(
                    files[i],
                    720,720,
                    'JPEG',100,0,
                    (uri)=>{
                        axios.post(`${process.env.REACT_APP_API_URL}/upload-images`,{
                            image:uri
                        },{
                            headers:{
                                authtoken: user?user.token:''
                            }
                        })
                        .then(res=>{
                            uploadedFiles.push(res.data)
                            setValues({
                                ...values,
                                images:uploadedFiles
                            })
                        })
                        .catch(()=>{
                            setError(true)
                            toast.error("Failed Image Upload")
                        })
                    },'base64'
                )       
            }
            if(!error){
                toast.success(`Uploaded images successfully`)
            }
        }
        setLoading(false)
    }

    return(
        <>
            <div className="form-group">
                <span><label>Choose Images</label> {loading ? <LoadingOutlined className="ml-3 text-danger h3"/> : ""} </span>
                <input className="form-control" type="file" multiple accept="images/*" onChange={uploadAndResize} />
            </div>
            <div className="row ml-1 mb-4">
                {values.images && values.images.map((image)=>(
                    <Badge key={image.public_id} count="X" onClick={()=>handleImageRemove(image.public_id)} style={{cursor:'pointer'}}>
                        <Avatar src={image.url} size={100}  shape="square" className="ml-3 mb-3"/>
                    </Badge>
                ))}
            </div>
        </>
    )
}

export default ImageUpload;