import React,{useEffect} from 'react'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Switch,Route} from 'react-router-dom'
import Login from './pages/auth/Login' 
import Register from './pages/auth/Register'
import Home from './pages/Home'
import Header from './components/nav/Header'
import RegisterComplete from './pages/auth/RegisterComplete'
import {auth} from './firebase'
import { useDispatch } from "react-redux";
import ForgotPassword from './pages/auth/ForgotPassword'
import {currentUser} from './api/ServerAuth'
import History from './pages/user/History'

const  App = () =>{

  const dispatch = useDispatch()

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(async(user)=>{
      if(user){
        const idTokenResult = await user.getIdTokenResult()
        currentUser(idTokenResult.token)
        .then(res=>{
        dispatch({
          type:'LOGGED_IN_USER',
          payload:{
            name:res.data.name,
            email:res.data.email,
            token:idTokenResult.token,
            role:res.data.role,
            _id:res.data._id 
          }
        })
        })
        .catch(err=>{
          console.log(err)
        })
      }
    })
    return ()=> unsubscribe();
  },[])

  return(
    <>
      <Header/>
      <ToastContainer/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />

        <Route exact path="/user/history" component={History} />
    </Switch>
    </>
  )
}

export default App;
