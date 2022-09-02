import React, { useContext } from "react";
import CustomerContext from "../contexts/CustomerContext";
// import Stripe from "stripe";
import {loadStripe} from '@stripe/stripe-js'

export default async function Stripe(props) {
  const context = useContext(CustomerContext)
  let stripeSessionData = context.getStripe()
  console.log ('I am stripe', stripeSessionData)
  let sessionIdObject = { sessionId: stripeSessionData.sessionId };
  let publishableKey = stripeSessionData.publishableKey;
  const stripePromise = loadStripe(publishableKey);
  const stripe = await stripePromise;
  stripe.redirectToCheckout(sessionIdObject);
}