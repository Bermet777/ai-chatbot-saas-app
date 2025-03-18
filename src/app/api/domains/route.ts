// src/app/api/domains/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" }, 
        { status: 401 }
      );
    }

    // Get the user from your database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { domains: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" }, 
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      domains: user.domains.map(domain => ({
        id: domain.id,
        name: domain.name,
        icon: domain.icon
      }))
    });
  } catch (error) {
    console.error("Error fetching domains:", error);
    return NextResponse.json(
      { error: "Failed to fetch domains" }, 
      { status: 500 }
    );
  }
}