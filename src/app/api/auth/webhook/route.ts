// import { Webhook } from 'svix'
// import { headers } from 'next/headers'
// import { WebhookEvent } from '@clerk/nextjs/server'


// export async function POST(req: Request) {
//   const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

//   if (!CLERK_WEBHOOK_SECRET) {
//     throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
//   }

//   // Create new Svix instance with secret
//   const wh = new Webhook(CLERK_WEBHOOK_SECRET)

//   // Get headers
//   const headerPayload = await headers()
//   const svix_id = headerPayload.get('svix-id')
//   const svix_timestamp = headerPayload.get('svix-timestamp')
//   const svix_signature = headerPayload.get('svix-signature')

//   // If there are no headers, error out
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response('Error: Missing Svix headers', {
//       status: 400,
//     })
//   }

//   // Get body
//   const payload = await req.json()
//   const body = JSON.stringify(payload)

//   let evt: WebhookEvent

//   // Verify payload with headers
//   try {
//     evt = wh.verify(body, {
//       'svix-id': svix_id,
//       'svix-timestamp': svix_timestamp,
//       'svix-signature': svix_signature,
//     }) as WebhookEvent
//   } catch (err) {
//     console.error('Error: Could not verify webhook:', err)
//     return new Response('Error: Verification error', {
//       status: 400,
//     })
//   }

//   // Do something with payload
//   // For this guide, log payload to console
//   const { id } = evt.data
//   const eventType = evt.type
//   console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
//   console.log('Webhook payload:', body)

//   if (evt.type === 'user.created') {
//     console.log('userId:', evt.data.id) 
//   }
// }


import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Ensure correct path to Prisma

export async function POST(req: Request) {
  try {
    const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!CLERK_WEBHOOK_SECRET) {
      console.error("❌ Error: CLERK_WEBHOOK_SECRET is missing.");
      return NextResponse.json({ error: "Missing secret" }, { status: 500 });
    }

    const wh = new Webhook(CLERK_WEBHOOK_SECRET);
    
    // ✅ Fix: Await headers() before calling .get()
    const headerPayload = await headers();  

    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json({ error: "Missing Svix headers" }, { status: 400 });
    }

    // Parse the incoming request
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Verify the webhook
    const evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;

    console.log(`✅ Received webhook with type: ${evt.type}`);
    console.log(`📌 Webhook payload:`, evt.data);

    if (evt.type === "user.created") {
      const userData = evt.data;
      console.log(`🆕 New user created with Clerk ID: ${userData.id}`);

      // Store user in database
      await prisma.user.create({
        data: {
          fullname: `${userData.first_name} ${userData.last_name}`,
          clerkId: userData.id,
          type: "user", // Default role
          stripeId: "", // Empty or handle Stripe integration separately
        },
      });

      console.log("✅ User stored in database successfully.");
    }

    // Always return a response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Webhook processing failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
