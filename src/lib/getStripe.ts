import { loadStripe } from "@stripe/stripe-js";

let stripePromise;
const id = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(id);
  }

  return stripePromise;
};

export default getStripe;
