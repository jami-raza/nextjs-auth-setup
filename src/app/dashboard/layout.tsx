import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getAuthToken } from "../actions";
import { redirect } from "next/navigation";

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
    try {
        const tokens = await getAuthToken()
        console.log(tokens, "TOkens")
        if (!tokens.authToken || !tokens.refreshToken) {
            redirect('/signin')
        }
    } catch (error) {
        console.log(error, "Dashboard Page Error")
        redirect('/signin')
    }
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
