import "src/styles/global.css"

import { GeistSans } from "geist/font/sans";

import {
  ClerkProvider,
} from '@clerk/nextjs'

import TopNav from "@/components/topnav";

export const metadata = {
  title: "Artisan",
  description: "Artisan Social Network",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <TopNav/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}


