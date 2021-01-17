import React, { useState } from 'react'
import resizer from 'react-image-file-resizer'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { toast } from 'react-toastify'

const ImageUpload = ({values,setValues}) =>{

    const [error,setError] = useState(false)

    const {user} = useSelector((state)=>({...state}))

    const uploadAndResize = (e) =>{
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
    }

    return(
        <div className="form-group">
            <label>Choose Images</label>
            <input className="form-control" type="file" multiple accept="images/*" onChange={uploadAndResize} />
        </div>
    )
}

export default ImageUpload;