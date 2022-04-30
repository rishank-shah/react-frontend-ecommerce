import React, { useEffect, useState } from 'react'
import UserNav from '../../components/nav/UserNav'
import { getUserOrders } from '../../api/ServerOrder'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import ShowPaymentInformation from '../../components/cards/ShowPaymentInformation'

const History = () => {

	const [userOrders, setUserOrders] = useState([])
	const [error, setError] = useState(false)

	const { user } = useSelector((state) => ({ ...state }))

	useEffect(() => {
		getUserOrders(user.token)
			.then((res) => {
				if (res.data.success) {
					setUserOrders(res.data.orders)
					setError(false)
				} else {
					toast.error("Something went wrong when fetching orders")
					setError(true)
				}
			})
	}, [])

	const showOrderProducts = (products) => {
		return (
			<table className="table table-bordered">
				<thead className="thead-light">
					<tr>
						<th scope="col">Title</th>
						<th scope="col">Price</th>
						<th scope="col">Brand</th>
						<th scope="col">Color</th>
						<th scope="col">Count</th>
					</tr>
				</thead>
				<tbody>
					{products.map((prod, i) => (
						<tr key={i} >
							<td>{prod.product.title}</td>
							<td>{prod.product.price}</td>
							<td>{prod.product.brand}</td>
							<td>{prod.color}</td>
							<td>{prod.count}</td>
						</tr>
					))}
				</tbody>
			</table>
		)
	}

	const showOrdersTable = () => {
		return userOrders.map((order, i) => (
			<div key={i} className="card p-5 m-5" >
				<ShowPaymentInformation paymentIntent={order.paymentIntent} orderStatus = {order.orderStatus} />
				{showOrderProducts(order.products)}
				<div className="row">
					<div className="col">
						<p>PDF Download</p>
					</div>
				</div>
			</div>
		))
	}

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<UserNav />
				</div>
				<div className="col text-center">
					<h4 className='mt-3' >
						{userOrders.length > 0 && !error ? "User purchased orders history" : "User has purchased no orders yet"}
					</h4>
					{showOrdersTable()}
				</div>
			</div>
		</div>
	)
}

export default History