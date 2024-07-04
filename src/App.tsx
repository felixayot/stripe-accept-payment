/* eslint-disable */
// @ts no-check
import { useState, useEffect } from "react";
import Homepage from "./components/Homepage";
import Payment from "./components/Payment";
import Completion from "./components/Completion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

function App() {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4242/api/stripe/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  return (
    <main>
      <Router>
        <Routes>
        <Route path="/" element={<Homepage />} />
          <Route path="/accept-stripe-payment" element={<Payment stripePromise={stripePromise} />} />
          <Route path="/completion" element={<Completion stripePromise={stripePromise} />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
