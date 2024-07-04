import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

function Payment(props) {
  const { stripePromise } = props;
  const [clientSecret, setClientSecret] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");

  useEffect(() => {
    // Create PaymentIntent when the page loads
    fetch("http://localhost:4242/api/stripe/create-payment-intent")
      .then((res) => res.json())
      .then(({ clientSecret, paymentDetails }) => {
        setClientSecret(clientSecret)
        setPaymentDetails(paymentDetails)
      });
  }, []);

  console.log(paymentDetails)

  return (
    <>
      <h1>Checkout Details</h1>
      <legend>{paymentDetails}</legend>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
