import Stripe from "stripe";
import { calculateCost } from "./utils/billing";
import { success, failure } from "./utils/response";

export async function main(event) {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = "Notes storage charge";

  // Load our secret key from the  environment variables
  const stripeSecretKey = process.env.stripeSecretKey as string;
  const stripeConfig = {} as Stripe.StripeConfig;
  const stripe = new Stripe(stripeSecretKey, stripeConfig);

  try {
    await stripe.charges.create({
      source,
      amount,
      description,
      currency: "usd"
    });
    return success({ status: true });
  } catch (e) {
    return failure({ message: e.message });
  }
}
