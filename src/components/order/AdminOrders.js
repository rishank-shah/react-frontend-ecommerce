import React from 'react'
import ShowPaymentInformation from '../cards/ShowPaymentInformation'

const AdminOrders = ({ orders, updateOrderStatusAdmin }) => {
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
  return (
    <>
      {orders.map((order) => {
        let class_type = "bg-light"
        if (order.orderStatus === "Processed") {
          class_type = 'bg-dark'
        } else if (order.orderStatus === "Delivered") {
          class_type = 'bg-success'
        } else if (order.orderStatus === "Cancelled") {
          class_type = 'bg-danger'
        } else if (order.orderStatus === "Dispatched") {
          class_type = 'bg-info'
        }
        return (
          <div key={order._id} className="row pb-5" >
            <div className={`btn btn-block ${class_type}`} >
              <ShowPaymentInformation
                paymentIntent={order.paymentIntent}
                orderStatus={order.orderStatus}
                showStatus={false}
              />

              <div className='row' >
                <div className="col md-4">
                  Delivery Status
                </div>
                <div className="col md-4">
                  <select
                    onChange={e => updateOrderStatusAdmin(order._id, e.target.value)}
                    className="form-control"
                    defaultValue={order.orderStatus}
                  >
                    <option value="Not Processed" >Not Processed</option>
                    <option value="Processed" >Processed</option>
                    <option value="Dispatched" >Dispatched</option>
                    <option value="Cancelled" >Cancelled</option>
                    <option value="Delivered" >Delivered</option>
                  </select>
                </div>
                <div className="col"></div>
              </div>
            </div>
            {showOrderProducts(order.products)}
          </div>
        )
      })}
    </>
  )
}

export default AdminOrders;