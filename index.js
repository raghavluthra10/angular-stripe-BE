const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");

app.use(cors());

const Stripe = require("stripe");

app.get("/secret", async (req, res) => {
  try {
    const { amount } = req.query;

    const stripe = require("stripe")(
      "sk_test_51LFwGLCuDfhw0FciC0md1nV74EWr8Crpm2nrarQ4YMytXQvKPuBgTqcTIHLMiiB5kH5hcGkj2tt40yPp5u3WkfE400dXagSCwB"
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      // automatic_payment_methods: { enabled: true },
      payment_method_types: ["card"],
    });

    console.log(paymentIntent);

    res.json({ client_secret: paymentIntent, success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
