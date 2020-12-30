import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Menu} from 'antd'
import { AppstoreOutlined, SettingOutlined ,UserOutlined, UserAddOutlined,LogoutOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import firebase from 'firebase'
import {useDispatch} from 'react-redux'

const {SubMenu,Item} = Menu

const Header = () =>{
    const [current,setCurrent] = useState('home')
    let dispatch = useDispatch()
    let history = useHistory()

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

        <Item key="register" icon={<UserAddOutlined />} className="float-right">
        <Link to="/login">Login</Link>
        </Item>

        <Item key="login" icon={<UserOutlined />} className="float-right">
        <Link to="/register">Register</Link>
        </Item>

        <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Username">
            <Item key="setting:1">Option 1</Item>
            <Item icon={<LogoutOutlined/>} onClick={logout}>Logout</Item>
        </SubMenu>
      </Menu>
    )
}

export default Header;