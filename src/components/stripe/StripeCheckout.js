import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useSelector, useDispatch } from 'react-redux'
import { createPaymentIntent } from "../../api/ServerStripe";
import { Link } from 'react-router-dom'
import { Card } from 'antd'
import { DollarOutlined, CheckOutlined } from '@ant-design/icons'

const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const StripeCheckout = ({ history }) => {
  const dispatch = useDispatch()
  const { user, coupon } = useSelector((state) => ({ ...state }))

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const [cartTotal, setCartTotal] = useState(0);
  const [cartTotalAfterDiscount, setCartTotalAfterDiscount] = useState(0);
  const [cartTotalPayable, setCartTotalPayable] = useState(0);


  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token, coupon)
      .then((res) => {
        if (res.data.clientSecret) {
          setClientSecret(res.data.clientSecret)
          setCartTotal(res.data.cartTotal)
          setCartTotalAfterDiscount(res.data.totalAfterDiscount)
          setCartTotalPayable(res.data.finalAmount)
        }
      })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        }
      }
    })
    if (payload.error) {
      setError(`Payment Failed ${payload.error.message}`)
      setProcessing(false)
    } else {
      setProcessing(false)
      setError(null)
      setSuccess(true)
    }
  }

  const handleChange = async (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "")
  }

  return (
    <>
      {
        !success && (
          <div>
            {coupon && cartTotalAfterDiscount !== undefined ? (
              <p className="alert alert-success">
                Coupon Applied
              </p>
            ) : (
              <p className="alert alert-danger">
                No Coupon Applied
              </p>
            )}
          </div>
        )
      }
      <div className="text-center pb-5" >
        <Card
          hoverable
          className="text-center"
          cover={
            <div className="text-center">
              <img
                src={"https://cdn.pixabay.com/photo/2016/02/20/00/24/credit-card-1211409__340.png"}
                style={{
                  height: "auto",
                  width: "250px",
                }}
              />
            </div>
          }
          actions={[
            <>
              <DollarOutlined className="text-danger" /> <br /> Total: Rs {cartTotal.toFixed(2)}
            </>,
            <>
              <CheckOutlined className="text-info" /> <br /> Total payable: Rs {(cartTotalPayable / 100).toFixed(2)}
            </>
          ]}
        />
      </div>

      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
        <button className="stripe-button" disabled={processing || disabled || success}>
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay"
            )}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}

        <br />

        <p className={success ? 'result-message' : 'result-message hidden'}>
          Payment Successful. <Link to="/user/history">Check Purchase History.</Link>
        </p>
      </form>
    </>
  )
}

export default StripeCheckout