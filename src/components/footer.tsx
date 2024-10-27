import Link from "next/link";
import { GithubIcon, Linkedin, TwitterIcon } from "lucide-react";
import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import localFont from "next/font/local";

const socials: { title: string; icon: ReactNode; href: string }[] = [
  {
    title: "Twitter",
    icon: (
      <TwitterIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
    ),
    href: "https://x.com/shivaji_V1",
  },
  {
    title: "Linkedin",
    icon: (
      <Linkedin className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
    ),
    href: "https://www.linkedin.com/in/shivajiks/",
  },

  {
    title: "Github",
    icon: (
      <GithubIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
    ),
    href: "https://github.com/ShivajiVS",
  },
];

const redressed = localFont({
  src: "../fonts/Redressed-Regular.ttf",
  weight: "400",
});

export const Footer = () => {
  return (
    <footer className="w-full max-w-6xl mx-auto flex flex-col mt-10 px-2 md:mt-20">
      <div className="w-full flex flex-col justify-between py-6 md:flex-row space-y-6 md:space-y-0 md:space-x-20">
        {/* main  footer section */}
        <div className="space-y-1 flex-1">
          <Link
            href="/"
            className={`font-bold tracking-tight text-2xl dark:text-white ${redressed.className}`}
          >
            <span className="text-blue-500">S</span>vella
          </Link>
          <p className="text-justify text-sm tracking-tight">
            your ultimate shopping destination! Explore a curated selection of
            high-quality products across fashion, gadgets, and more. Enjoy a
            seamless shopping experience with secure checkout and personalized
            recommendations.
          </p>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase ">Shop</h2>
            <ul className="text-gray-500 text-xs font-medium">
              <li className="mb-4">
                <Link href="#" className="hover:underline">
                  All Categories
                </Link>
              </li>
              <li className="mb-4">
                <Link href="#" className="hover:underline">
                  Winter Collection
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Discount
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase">Company</h2>
            <ul className="text-gray-500 text-xs font-medium">
              <li className="mb-4">
                <Link href="#" className="hover:underline ">
                  About Us
                </Link>
              </li>
              <li className="mb-4">
                <Link href="#" className="hover:underline">
                  Affiliates
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase">Legal</h2>
            <ul className="text-gray-500 text-xs font-medium">
              <li className="mb-4">
                <Link href="#" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Separator />
      <div className="w-full flex flex-col items-center space-y-3 md:flex-row md:justify-between py-4 md:py-8">
        {/* copyright section */}
        <h2 className="font-normal tracking-tight capitalize text-muted-foreground text-base">
          © 2024
          <Link
            href="https://shivaji.vercel.app/"
            target="_blank"
            className="px-1 hover:underline"
          >
            Shivaji.
          </Link>
          all rights reserved.
        </h2>

        <div className="flex space-x-4">
          {socials.map(({ title, icon, href }) => (
            <Link href={href} target="_blank" key={title}>
              {icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
