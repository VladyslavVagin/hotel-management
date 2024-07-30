import { createBooking, updateHotelRoom } from "@/libs/apis";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const checkout_session_completed = "checkout.session.completed";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request, res: Response) {
  const reqBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // load our events
  switch (event.type) {
    case checkout_session_completed:
      const session = event.data.object as Stripe.Checkout.Session;
      const {
        metadata: {
          checkinDate,
          checkoutDate,
          adults,
          children,
          numberOfDays,
          hotelRoom,
          discount,
          totalPrice,
          user,
        },
      } = session;

      // create a booking
      await createBooking({
        adults: Number(adults),
        checkinDate,
        checkoutDate,
        children: Number(children),
        hotelRoom,
        numberOfDays: Number(numberOfDays),
        totalPrice: Number(totalPrice),
        user,
        discount: Number(discount),
      });

      // update Hotel Room availability
      await updateHotelRoom(hotelRoom);

      return new NextResponse.json("Booking successful", {
        status: 200,
        statusText: "Booking successful",
      });

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new NextResponse.json("Event received", {
    status: 200,
    statusText: "Event received",
  });
}
