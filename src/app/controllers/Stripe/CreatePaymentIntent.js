import Stripe from "stripe";
import * as Yup from 'yup';
import 'dotenv/config';
const calculateOrderAmount = (items) => {
  const total = items.reduce((acc, current) => {
    return current.price * current.quantity + acc;
  }, 0);
  return total ;
};

class CreatePaymentIntent {
  async store(request, response) {
    if (!process.env.STRIPE_SECRET_KEY) {
      return response.status(503).json({
        error: 'Pagamentos indisponíveis: STRIPE_SECRET_KEY não configurada.',
      });
    }

    const schema = Yup.object({
      products: Yup.array()
        .required()
        .of(
          Yup.object({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
            price: Yup.number().required(),
          }),
        ),
    });
    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response.status(400).json({ error: err.erros });
    }
    const { products } = request.body;
    const amount = calculateOrderAmount(products);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'brl',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    response.send({
      clientSecret: paymentIntent.client_secret,
      
    })
  }
}
export default new CreatePaymentIntent();
