import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getAuthToken } from "@/actions";
import { redirect, usePathname } from "next/navigation";
import SideBar from "@/components/sidebar";
import { useState } from "react";
import UserDashboardLayout from "@/components/layouts/dashboard-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PF | Dashboard",
  description: "Your Personal Finance Dashboard",
};


export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    // try {
    //     const tokens = await getAuthToken()
    //     console.log(tokens, "TOkens")
    //     if (!tokens.authToken || !tokens.refreshToken) {
    //         redirect('/signin')
    //     }
    // } catch (error) {
    //     console.log(error, "Dashboard Page Error")
    //     redirect('/signin')
    // }
  return (
    <UserDashboardLayout children={children}/>
  );
}
