import React from 'react'

const ShowPaymentInformation = ({ paymentIntent, orderStatus }) => {
  return (
    <div>
      <p>
        <span>
          Order ID: {paymentIntent.id}
        </span>
        &nbsp;
        &nbsp;
        <span>
          Amount: {(paymentIntent.amount / 100).toLocaleString('en-US', {
            style: "currency",
            currency: "INR"
          })}
        </span>
        &nbsp;
        &nbsp;
        <span>
          Ordered On: {new Date(paymentIntent.created * 1000).toLocaleString()}
        </span>
        <br />
        <span>
          Order Status:
          <span className="badge bg-primary" >
            {orderStatus}
          </span>
        </span>

      </p>
    </div>
  )
}

export default ShowPaymentInformation