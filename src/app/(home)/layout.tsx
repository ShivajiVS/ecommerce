import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/navigation/navBar";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col">
            <NavBar />
            <main className="w-full dark:bg-zinc-800 grow">
              <div className="max-w-6xl mx-auto p-2 lg:p-6">{children}</div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
