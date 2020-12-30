import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Menu} from 'antd'
import { AppstoreOutlined, SettingOutlined ,UserOutlined, UserAddOutlined,LogoutOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import firebase from 'firebase'
import {useDispatch,useSelector} from 'react-redux'

const {SubMenu,Item} = Menu

const Header = () =>{
    const [current,setCurrent] = useState('home')
    
    let dispatch = useDispatch()
    let history = useHistory()
    let {user} = useSelector((state)=>({...state}))

    const handleClick = (event) =>{
        setCurrent(event.key);
    }

    const logout = ()=>{
      firebase.auth().signOut()
      dispatch({
        type:'LOGOUT',
        payload:null
      })
      history.push('/login')
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">Home</Link>
        </Item>

        {!user && (
          <>
            <Item key="register" icon={<UserAddOutlined />} className="float-right">
              <Link to="/login">Login</Link>
            </Item>
    
            <Item key="login" icon={<UserOutlined />} className="float-right">
              <Link to="/register">Register</Link>
            </Item>
          </>
        )}

        {user && (
          <SubMenu key="SubMenu" icon={<SettingOutlined />} title={user.email.split('@')[0]} className="float-right">
              <Item key="setting:1">Option 1</Item>
              <Item icon={<LogoutOutlined/>} onClick={logout}>Logout</Item>
          </SubMenu>
        )}
      </Menu>
    )
}

export default Header;