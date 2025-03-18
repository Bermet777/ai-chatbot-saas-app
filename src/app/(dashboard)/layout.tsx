// "use client";

// import React from "react";
// import Sidebar from "@/components/sidebar/Sidebar";

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <main className="flex-1 p-4">{children}</main>
//     </div>
//   );
// }

//working code

"use client";

import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar on the left */}
      <Sidebar />
      {/* Main content area */}
      <div className="flex-1 overflow-auto p-4">
        {children}
      </div>
    </div>
  );
}



