// "use server";
// import { currentUser } from "@clerk/nextjs/server";
// import { prisma } from "@/lib/prisma";
// import { Plans } from "@prisma/client";

// export const onIntegrateDomain = async (domain: string, icon: string) => {
//   const user = await currentUser();
//   console.log("Current user:", user?.id);
//   if (!user) return { status: 401, message: "Unauthorized" };

//   try {
//     // Fetch the user from database using clerkId
//     const dbUser = await prisma.user.findUnique({
//       where: { clerkId: user.id },
//       include: {
//         billing: true,
//         domains: true,
//       },
//     });

//     console.log("DB user found:", dbUser?.id);

//     if (!dbUser) {
//       return { status: 404, message: "User not found in database" };
//     }

//     console.log("Attempting to create domain in database");

//     // Check if the domain already exists
//     const existingDomain = await prisma.domain.findFirst({
//       where: {
//         name: domain,
//         userId: dbUser.id,
//       },
//     });

//     if (existingDomain) {
//       return { status: 409, message: "Domain already integrated" };
//     }

//     // Check subscription plan and enforce limits
//     const userPlan = dbUser.billing?.plan || Plans.STANDARD;
//     const currentDomainCount = dbUser.domains.length;

//     // Define domain limits based on subscription plans
//     const domainLimits = {
//       [Plans.STANDARD]: 1,
//       [Plans.PRO]: 3,
//       [Plans.ULTIMATE]: 5,
//     };

//     const allowedDomains = domainLimits[userPlan];

//     if (currentDomainCount >= allowedDomains) {
//       return { 
//         status: 403, 
//         message: `Domain limit reached. Your ${userPlan} plan allows ${allowedDomains} domains. Please upgrade your plan.` 
//       };
//     }

//     // Create a new domain entry and link it to the user
//     const newDomain = await prisma.domain.create({
//       data: {
//         name: domain,
//         icon: icon,
//         userId: dbUser.id,
//       },
//     });

//     return { 
//       status: 200, 
//       message: "Domain successfully added",
//       data: newDomain
//     };
//   } catch (error) {
//     console.error("Error integrating domain:", error);
//     return { status: 500, message: "Internal Server Error" };
//   }
// }; 




// src/actions/settings.ts
// "use server";
// import { currentUser } from "@clerk/nextjs/server";
// import { prisma } from "@/lib/prisma";
// import { Plans } from "@prisma/client";

// export const onIntegrateDomain = async (domain: string, icon: string) => {
//   const user = await currentUser();
//   if (!user) return { status: 401, message: "Unauthorized" };

//   try {
//     // Fetch the user from database using clerkId
//     const dbUser = await prisma.user.findUnique({
//       where: { clerkId: user.id },
//       include: {
//         billing: true,
//         domains: true,
//       },
//     });
//     console.log("DB user found:", dbUser?.id);

//     if (!dbUser) {
//       return { status: 404, message: "User not found in database" };
//     }

//     // Check if the domain already exists
//     const existingDomain = await prisma.domain.findFirst({
//       where: {
//         name: domain,
//         userId: dbUser.id,
//       },
//     });

//     if (existingDomain) {
//       console.log("Domain already exists");
//       return { status: 409, message: "Domain already integrated" };
//     }

//     // Check subscription plan and enforce limits
//     const userPlan = dbUser.billing?.plan || Plans.STANDARD;
//     const currentDomainCount = dbUser.domains.length;
//     console.log("Current plan:", userPlan, "Domain count:", currentDomainCount);

//     // Define domain limits based on subscription plans
//     const domainLimits = {
//       [Plans.STANDARD]: 1,
//       [Plans.PRO]: 3,
//       [Plans.ULTIMATE]: 5,
//     };

//     const allowedDomains = domainLimits[userPlan];

//     if (currentDomainCount >= allowedDomains) {
//       console.log("Domain limit reached");
//       return { 
//         status: 403, 
//         message: `Domain limit reached. Your ${userPlan} plan allows ${allowedDomains} domains. Please upgrade your plan.` 
//       };
//     }

//     // Create a new domain entry and link it to the user
//     console.log("Attempting to create domain in database");
//     const newDomain = await prisma.domain.create({
//       data: {
//         name: domain,
//         icon: icon,
//         userId: dbUser.id,
//       },
//     });
//     console.log("New domain created:", newDomain);

//     return { 
//       status: 200, 
//       message: "Domain successfully added",
//       data: newDomain
//     };
//   } catch (error) {
//     console.error("Error integrating domain:", error);
//     return { status: 500, message: "Internal Server Error" };
//   }
// };





"use server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { Plans } from "@prisma/client";

export const onIntegrateDomain = async (domain: string, icon: string) => {
  console.log("Server action called with:", { domain, icon });
  
  const user = await currentUser();
  console.log("Current user:", user?.id);
  
  if (!user) return { status: 401, message: "Unauthorized" };

  try {
    // Fetch the user from database using clerkId
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
      include: {
        billing: true,
        domains: true,
      },
    });
    console.log("DB user found:", dbUser?.id);

    if (!dbUser) {
      return { status: 404, message: "User not found in database" };
    }

    // Check if the domain already exists
    const existingDomain = await prisma.domain.findFirst({
      where: {
        name: domain,
        userId: dbUser.id,
      },
    });

    if (existingDomain) {
      console.log("Domain already exists");
      return { status: 409, message: "Domain already integrated" };
    }

    // Check subscription plan and enforce limits
    const userPlan = dbUser.billing?.plan || Plans.STANDARD;
    const currentDomainCount = dbUser.domains.length;
    console.log("Current plan:", userPlan, "Domain count:", currentDomainCount);

    // Define domain limits based on subscription plans
    const domainLimits = {
      [Plans.STANDARD]: 2,
      [Plans.PRO]: 3,
      [Plans.ULTIMATE]: 5,
    };

    const allowedDomains = domainLimits[userPlan];

    if (currentDomainCount >= allowedDomains) {
      console.log("Domain limit reached");
      return { 
        status: 403, 
        message: `Domain limit reached. Your ${userPlan} plan allows ${allowedDomains} domains. Please upgrade your plan.` 
      };
    }

    // Validate icon URL - use an empty string as fallback instead of null
    const validIcon = icon && icon.trim().length > 0 ? icon.trim() : "";
    console.log("Creating domain with icon:", validIcon);

    // Create a new domain entry and link it to the user
    const newDomain = await prisma.domain.create({
      data: {
        name: domain,
        icon: icon || "",
        userId: dbUser.id,
      },
    });
    console.log("New domain created:", newDomain);

    return { 
      status: 200, 
      message: "Domain successfully added",
      data: newDomain
    };
  } catch (error) {
    console.error("Error integrating domain:", error ? error.toString() : "Unknown error");
    return { status: 500, message: "Internal Server Error" };
  }
};