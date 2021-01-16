import React from 'react'

const CreateProductForm = ({handleChange,handleSubmit,values,handleCategoryChange,showSubcategory}) =>{ 
    const {title,description,price,quantity,colors,brands,categories,subcategoriesOptions} = values

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
            <div className="form-group">
                <label>Price</label>
                <input type="number" name="price" className="form-control" value={price} onChange={handleChange}></input>
            </div>
            <div className="form-group">
                <label>Shipping</label>
                <select name="shipping" className="form-control" onChange={handleChange}>
                    <option>Select One Option</option>
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
                <select name="color" className="form-control" onChange={handleChange}>
                    <option>Select One Color</option>
                    {colors.map((c)=>(
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Brand</label>
                <select name="brand" className="form-control" onChange={handleChange}>
                    <option>Select One brand</option>
                    {brands.map((c)=>(
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Category</label>
                <select name="category" className="form-control" onChange={handleCategoryChange}>
                    <option>Select One Category</option>
                    {categories.length && categories.map((c)=>(
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>
            {subcategoriesOptions ? subcategoriesOptions.length : 'no'}
            <button className="btn btn-outline-primary" type="submit" disabled={!title || !description || !price || !quantity}>Save Product</button>
        </form>
    )
}
export default CreateProductForm