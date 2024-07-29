'use client'
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { getAuthToken } from "@/actions";
import { redirect, usePathname } from "next/navigation";
import SideBar from "@/components/sidebar";
import { useState } from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import routes from "@/routes";
import { getActiveNavbar, getActiveRoute } from "@/utils/navigation";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({weight: ["100","200","300","400","500","600","700","800","900"], subsets:["latin"]});

export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const [open, setOpen] = useState(false);
    const pathname = usePathname();
  return (
    <div className={`flex h-full w-full bg-background-100 dark:bg-background-900 ${poppins.className}`}>
    <SideBar routes={routes} open={open} setOpen={setOpen} variant="admin" />
    {/* Navbar & Main Content */}
    <div className="h-full w-full font-dm dark:bg-navy-900">
      {/* Main Content */}
      <main
        className={`mx-2.5  flex-none transition-all dark:bg-navy-900 
            md:pr-2 xl:ml-[323px]`}
      >
        {/* Routes */}
        <div>
          {/* <Navbar
            onOpenSidenav={() => setOpen(!open)}
            brandText={getActiveRoute(routes, pathname)}
            secondary={getActiveNavbar(routes, pathname)}
          /> */}
          <div className="mx-auto min-h-screen p-2 !pt-[10px] md:p-2">
            {children}
          </div>
          <div className="p-3">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  </div>
  );
}
