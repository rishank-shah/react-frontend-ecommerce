import React from "react";
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripeCheckout from '../components/stripe/StripeCheckout'
import '../stripe.css'

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const Payment = () => {
  return (
    <div className="container p-5 text-center">
      <h4>Complete your Payment</h4>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  )
};

export default Payment;
