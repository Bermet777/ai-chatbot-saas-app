import React from "react";
import DashboardIcon from "@/icons/dashboard-icon";
import TimerIcon from "@/icons/timer-icon";
import ChatIcon from "@/icons/chat-icon";
import EmailIcon from "@/icons/email-icon";
import IntegrationsIcon from "@/icons/integrations-icon";
import SettingsIcon from "@/icons/settings-icon";

// Menu item type
export interface MenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

// Menu group type; collapsible means the group can be toggled open/closed.
export interface MenuGroup {
  groupLabel: string;
  items: MenuItem[];
  collapsible?: boolean;
}

export const menuGroups: MenuGroup[] = [
  {
    groupLabel: "MENU",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: <DashboardIcon />,
      },
      {
        label: "Appointment",
        href: "/appointment",
        icon: <TimerIcon />,
      },
      {
        label: "Conversation",
        href: "/conversation",
        icon: <ChatIcon />,
      },
    ],
    collapsible: false, // always expanded
  },
  {
    groupLabel: "OPTIONS",
    items: [
      {
        label: "Email Marketing",
        href: "/emailmarketing",
        icon: <EmailIcon />,
      },
      {
        label: "Integrations",
        href: "/integrations",
        icon: <IntegrationsIcon />,
      },
      {
        label: "Settings",
        href: "/settings",
        icon: <SettingsIcon />,
      },
    ],
    collapsible: true, // bonus: can collapse/expand this group
  },
];
