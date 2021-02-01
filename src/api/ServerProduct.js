import axios from 'axios'

export const createProduct = async(authtoken,product) =>{
    return await axios.post(`${process.env.REACT_APP_API_URL}/product`,product,{
        headers:{
            authtoken:authtoken
        }
    })
}

export const getProductsByCount = async(count) =>
    await axios.get(`${process.env.REACT_APP_API_URL}/products/${count}`)

export const removeProduct = async (authtoken,slug) =>
    await axios.delete(`${process.env.REACT_APP_API_URL}/product/${slug}`, {
      headers: {
        authtoken,
      },
    });

export const readProduct = async (authtoken,slug) =>
    await axios.get(`${process.env.REACT_APP_API_URL}/product/${slug}`, {
      headers: {
        authtoken,
      },
    });