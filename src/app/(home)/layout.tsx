import type { Metadata } from "next";
import { Lora } from "next/font/google";

import "../globals.css";
import NavBar from "@/components/navigation/nav-bar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const lora = Lora({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "ecommerce",
  description: "developed by shivaji",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={lora.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="w-full dark:bg-zinc-800 grow">
              <div className="max-w-6xl mx-auto lg:p-6">{children}</div>
            </main>
            <footer className="flex h-14 items-center justify-center bg-slate-400">
              <h2>@Shivaji</h2>
            </footer>
          </div>
          <Toaster
            toastOptions={{
              style: { color: "green" },
              className: "my-toast",
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
