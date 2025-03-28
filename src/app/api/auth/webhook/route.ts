import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
//import { prisma } from "@/lib/prisma"; 
import { createUserInDB } from "@/actions/user";

export async function POST(req: Request) {
  try {
    const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!CLERK_WEBHOOK_SECRET) {
      console.error("❌ Error: CLERK_WEBHOOK_SECRET is missing.");
      return NextResponse.json({ error: "Missing secret" }, { status: 500 });
    }

    const wh = new Webhook(CLERK_WEBHOOK_SECRET);
    
    // Await headers() before calling .get()
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
      // new code to add the full name 03/05 6 lines
       // Get email address as fallback for name
    const email = userData.email_addresses?.[0]?.email_address || "";
    const firstName = userData.first_name || "";
    const lastName = userData.last_name || "";
    
    // Use email as fallback if no name available
    const fullname = firstName || lastName 
      ? `${firstName} ${lastName}`.trim()
      : email.split('@')[0] || "New User";
      //v3
      await createUserInDB({
        fullname: `${userData.first_name} ${userData.last_name}`,
        clerkId: userData.id,
        type: "user",
        stripeId: "", // or handle Stripe integration if needed
      });
      console.log("✅ User stored in database successfully.");
    }
    //   // Store user in database //commented out v2
    //   await prisma.user.create({
    //     data: {
    //       fullname: `${userData.first_name} ${userData.last_name }`,
    //       clerkId: userData.id,
    //       type: "user", 
    //       stripeId: "", 
    //     },
    //   });

    //   console.log("✅ User stored in database successfully.");
    // }


      //   const newUser = await createUserInDB({ //commented out v1
      //     fullname: `${userData.first_name} ${userData.last_name}`,
      //     clerkId: userData.id,
      //     type: "user",
      //     stripeId: "", 
      // });

      // if (newUser) {
      //   console.log("✅ User stored in database successfully.");
      // } else {
      //   console.log("⚠️ User could not be saved.");
      // }
    
    // Always return a response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Webhook processing failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
