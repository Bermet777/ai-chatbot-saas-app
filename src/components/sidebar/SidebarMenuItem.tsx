"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarMenuItemProps {
  label: string;
  href: string;
  icon: React.ReactNode;
  collapsed: boolean;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ label, href, icon, collapsed }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} legacyBehavior>
      <a
        className={`group flex items-center rounded-md p-2 transition-colors duration-200 ${
          isActive
            ? "bg-gray-200 text-gray-900"
            : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        <span className="text-xl">{icon}</span>
        {!collapsed && <span className="ml-4">{label}</span>}
      </a>
    </Link>
  );
};

export default SidebarMenuItem;
