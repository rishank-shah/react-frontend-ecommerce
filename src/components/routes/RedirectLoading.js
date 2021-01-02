import React,{useEffect,useState} from 'react'
import {useHistory} from 'react-router-dom'

const RedirectLoading = () =>{
    const [count,setCount] = useState(5)

    let history = useHistory()

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((currentCount)=> --currentCount)
        },1000)
        count === 0 && history.push('/')
        return () => clearInterval(interval)
    },[count])

    return(
        <div className="container p-5 text-center">
            <p>Redirecting in {count} seconds</p>
        </div>
    )
}

export default RedirectLoading;