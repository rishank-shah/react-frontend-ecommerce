import React, { useState, useEffect } from 'react'
import AdminNav from '../../components/nav/AdminNav'
import { getAllOrders, updateOrderStatus } from '../../api/ServerOrder'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AdminOrders from '../../components/order/AdminOrders'

const AdminDashboard = () => {

	const [orders, setOrders] = useState([])

	const { user } = useSelector((state) => ({ ...state }))

	useEffect(() => {
		loadAllOrders()
	}, [])

	const loadAllOrders = () => {
		getAllOrders(user.token)
			.then((res) => {
				if (res.data.success) {
					setOrders(res.data.orders)
				} else {
					toast.error("Something went wrong when fetching all orders.")
				}
			})
	}

	const updateOrderStatusAdmin = (orderID, orderStatus) => {
		updateOrderStatus(user.token, orderID, orderStatus)
			.then((res) => {
				if (res.data.success) {
					toast.success("Order Updated Successfully")
					loadAllOrders()
				} else {
					toast.error("Order Update Failed")
				}
			})
	}

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col">
					<h4>Admin Dashboard</h4>
					<AdminOrders orders={orders} updateOrderStatusAdmin={updateOrderStatusAdmin} />
				</div>
			</div>
		</div>
	)
}

export default AdminDashboard;