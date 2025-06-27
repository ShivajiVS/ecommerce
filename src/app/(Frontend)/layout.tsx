import type { Metadata } from "next";
import { Lora } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";
import NavBar from "@/components/navigation/nav-bar";
import { Toaster } from "@/components/ui/sonner";
import { Banner } from "@/components/banner";
import { ThemeProvider } from "@/components/theme-provider";
import { SanityLive } from "@/sanity/live";

const lora = Lora({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "Svella",
  description:
    "your ultimate shopping destination! Explore a curated selection of high-quality products across fashion, gadgets, and more. Enjoy a seamless shopping experience with secure checkout and personalized recommendations.",
};

export default function RootLayout({
  children,
  auth,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={lora.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen dark:bg-slate-900 dark:text-white">
              <Banner />
              <NavBar />
              <main className="w-full grow z-30">
                <div className="">
                  {children}
                  {auth}
                </div>
              </main>
            </div>
            <Toaster
              toastOptions={{
                style: { color: "green" },
                className: "my-toast",
              }}
            />
            <SanityLive />
          </ThemeProvider>
        </body>
        {/* <script
          src="https://unpkg.com/react-scan/dist/auto.global.js"
          async
        ></script> */}
      </html>
    </ClerkProvider>
  );
}
