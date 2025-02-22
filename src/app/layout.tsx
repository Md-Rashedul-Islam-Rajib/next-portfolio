import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";
// import { FloatingNav } from "@/components/ui/floating-navbar";
// import {Icon} from "@iconify/react"
import { cn } from "@/lib/utils";
import ReduxProvider from "@/redux/ReduxProvider";
import Navbar from "@/components/shared/home/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utilities/authOptions";
import { JSX } from "react";
import { Toaster } from "sonner";
const exo_2 = Exo_2({
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Next Portfolio",
  description: "Personal portfolio app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={cn("max-h-full", exo_2.className)}>
        <ReduxProvider>
          <div className="mb-8">
            <Navbar session={session} />
          </div>
          {children}
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
