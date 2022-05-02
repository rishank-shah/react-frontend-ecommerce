import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserWishlist, removeUserWishlist } from '../../api/ServerUser';
import UserNav from '../../components/nav/UserNav'
import { DeleteOutlined } from "@ant-design/icons"

const Wishlist = () => {

	const { user } = useSelector((state) => ({ ...state }))

	const [wishlistProducts, setWishlistProducts] = useState([]);

	useEffect(() => {
		loadUserWishlist();
	}, [])

	const loadUserWishlist = () => {
		getUserWishlist(user.token)
			.then((res) => {
				if (res.data.success) {
					setWishlistProducts(res.data.wishlist)
					toast.success("Wishlist fetched successfully")
				} else {
					toast.error("Something went wrong when fetching the wishlist")
				}
			})
	}

	const handleRemoveFromWishlist = (productID) => {
		removeUserWishlist(user.token, productID)
			.then((res) => {
				if (res.data.success) {
					loadUserWishlist();
					toast.success("Removed from wishlist")
				} else {
					toast.error("Something went wrong when removing from wishlist")
				}
			})
	}

	const showWishList = () => (
		wishlistProducts.map((prod) => (
			<div key={prod._id} className="alert alert-primary">
				<Link to={`/product/${prod.slug}`} > {prod.title} </Link>
				<span onClick={(e) => handleRemoveFromWishlist(prod._id)} className='btn btn-sm float-right' >
					<DeleteOutlined className="text-danger" />
				</span>
			</div>
		))
	)

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<UserNav />
				</div>
				<div className="col">
					<h4>Wishlist</h4>
					{wishlistProducts && wishlistProducts.length > 0 ? showWishList() : <h3>No Items in wishlist</h3>}
				</div>
			</div>
		</div>
	)
}

export default Wishlist