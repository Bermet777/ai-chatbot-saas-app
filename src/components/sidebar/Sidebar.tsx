"use client";

import React, { useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
//import { menuItems } from "@/components/sidebar/menuItems";
import SidebarMenuItem from "./SidebarMenuItem";
import useTheme from "@/hooks/useTheme";
import { menuGroups } from "@/components/sidebar/menuGroups";

// Optionally, if you have heroicons installed:
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";


export default function Sidebar() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const clerk = useClerk();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const [groupExpanded, setGroupExpanded] = useState<Record<string, boolean>>(() => { //new added
    const initial: Record<string, boolean> = {};
    menuGroups.forEach((group) => {
      if (group.collapsible) {
        initial[group.groupLabel] = true; // default expanded
      }
    });
    return initial;
  });

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  const toggleGroup = (groupLabel: string) => { //new added
    setGroupExpanded((prev) => ({
      ...prev,
      [groupLabel]: !prev[groupLabel],
    }));
  };

  const handleSignOut = async () => {
    try {
      await clerk.signOut();
      router.push("/auth/sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div
      className={`
        flex flex-col h-full border-r border-gray-200 transition-all duration-300
        ${collapsed ? "w-16" : "w-60"}
        bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100
      `}
    >
      {/* Header / Brand / Toggle buttons */}
      <div className="flex items-center justify-between p-4 h-16 border-b border-gray-200 dark:border-gray-700">
        {!collapsed && <div className="font-bold text-xl">MailGenie</div>}
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
            {/* If not using heroicons, you can use: {theme === "light" ? "🌙" : "☀️"} */}
          </button>
          {/* Sidebar Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-900 focus:outline-none dark:text-gray-300 dark:hover:text-gray-100"
            aria-label="Toggle sidebar"
          >
            {collapsed ? "»" : "«"}
          </button>
        </div>
      </div>

      {/* Menu Items
      <nav className="flex-1 px-2">
        <p
          className={`text-sm uppercase ${collapsed ? "text-center" : "text-gray-500 dark:text-gray-400"}`}
        >
          Menu
        </p>
        <div className="mt-2 space-y-1">
          {menuItems.map((item) => (
            <SidebarMenuItem
              key={item.label}
              label={item.label}
              href={item.href}
              icon={item.icon}
              collapsed={collapsed}
            />
          ))}
        </div>
      </nav> */}
{/* //new added */}
      {/* Menu Groups */} 
      <nav className="flex-1 px-2 overflow-y-auto">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="mt-4">
            {/* Group header is shown only when sidebar is expanded */}
            {!collapsed && (
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-gray-500 dark:text-gray-400">
                  {group.groupLabel}
                </p>
                {group.collapsible && (
                  <button
                    onClick={() => toggleGroup(group.groupLabel)}
                    className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label={`Toggle ${group.groupLabel} section`}
                  >
                    {groupExpanded[group.groupLabel] ? "–" : "+"}
                  </button>
                )}
              </div>
            )}
            <div className={`mt-2 space-y-1 ${group.collapsible && !groupExpanded[group.groupLabel] ? "hidden" : ""}`}>
              {group.items.map((item, index) => (
                <SidebarMenuItem
                  key={index}
                  label={item.label}
                  href={item.href}
                  icon={item.icon}
                  collapsed={collapsed}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Sign Out Button */}
      <div className="p-4">
        <button
          onClick={handleSignOut}
          className="flex items-center w-full text-left text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-md dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700"
        >
          <span className="text-xl">↩</span>
          {!collapsed && <span className="ml-4">Sign out</span>}
        </button>
      </div>
    </div>
  );
}
