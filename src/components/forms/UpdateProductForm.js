import React from 'react'
import { Select } from 'antd';
import ImageUpload from  './ImageUpload'
const { Option } = Select;

const UpdateProductForm = ({categories,setArrayOfSubIDs,handleChange,handleSubmit,values,setValues,handleCategoryChange,arrayOfSubIDs,subOptions,selectedCategory}) =>{ 
    const {title,description,price,quantity,colors,brands,subcategories,category,color,shipping,brand} = values

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input type="text" name="title" className="form-control" value={title} onChange={handleChange}></input>
            </div>
            <div className="form-group">
                <label>Description</label>
                <input type="text" name="description" className="form-control" value={description} onChange={handleChange}></input>
            </div>
            <ImageUpload values={values} setValues={setValues} />
            <div className="form-group">
                <label>Price</label>
                <input type="number" name="price" className="form-control" value={price} onChange={handleChange}></input>
            </div>
            <div className="form-group">
                <label>Shipping</label>
                <select value={shipping === 'Yes' ? 'Yes' : 'No' } name="shipping" className="form-control" onChange={handleChange}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
            <div className="form-group">
                <label>Quantity</label>
                <input type="number" name="quantity" className="form-control" value={quantity} onChange={handleChange}></input>
            </div>
            <div className="form-group">
                <label>Color</label>
                <select value={color} name="color" className="form-control" onChange={handleChange}>
                    {colors.map((c)=>(
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Brand</label>
                <select value={brand} name="brand" className="form-control" onChange={handleChange}>
                    {brands.map((c)=>(
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Category</label>
                <select value={selectedCategory ? selectedCategory : category._id} name="category" className="form-control" onChange={handleCategoryChange}>
                    <option>Select One Category</option>
                    {categories.length && categories.map((c)=>(
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label>SubCategory</label>
                <Select 
                    mode="multiple" 
                    style={{ width: '100%' }} 
                    placeholder="Select one SubSategory" 
                    onChange={value=>setArrayOfSubIDs(value)} 
                    optionLabelProp="label" 
                    value={arrayOfSubIDs}
                >
                    {subOptions.length && subOptions.map((s)=>
                        <Option key={s._id} value={s._id} label={s.name}>{s.name}</Option>
                    )}
                </Select>
            </div>

            <button className="btn btn-outline-primary" type="submit" disabled={!title || !description || !price || !quantity}>Update Product</button>
        </form>
    )
}
export default UpdateProductForm