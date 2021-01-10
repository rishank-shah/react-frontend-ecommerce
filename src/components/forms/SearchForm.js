import React from 'react'

const SearchForm = ({searchText,setSearchText}) =>{

    const handleSearchChange = (e) =>{
        e.preventDefault();
        setSearchText(e.target.value.toLowerCase())
    }

    return(
        <div className="form-group">
            <input value = {searchText} onChange={handleSearchChange} className="form-control" type="search" placeholder="Search..." />
        </div>
    )
}

export default SearchForm 