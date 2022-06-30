import Stripe from "stripe";
import { getImage } from "../../lib/Api";

const idStripe = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
const stripe = new Stripe(idStripe, {
  apiVersion: "2020-08-27",
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [{ shipping_rate: "shr_1Kz0TeJLtNQoiNqYHEO03YIt" }],
        line_items: req.body.map((item) => {
          const image = getImage(item.media_gallery_entries[0].file);

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [image],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
      };

      // Create Checkout Sessions from body params.
      const session: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
