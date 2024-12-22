import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Init from "./components/init/init";
import SingleToast from "./components/singleToast/singleToast";
import "./globals.css";
import { ProviderInjector } from "./redux/userInfo/storageInjector";

// Load the Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] });

// Metadata for the document
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// Root Layout Component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} cz-shortcut-listen="true">
        <ProviderInjector>
          <Init>
            <SingleToast >{children}</SingleToast>
          </Init>
        </ProviderInjector>
      </body>
    </html>
  );
}