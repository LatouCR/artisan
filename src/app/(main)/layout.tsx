import "src/styles/global.css"

import { GeistSans } from "geist/font/sans";

import {
  ClerkProvider,
} from '@clerk/nextjs'

import TopNav from "@/components/nav/Topnav";
import SideNav from "@/components/nav/SideNav";

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
          <header className="w-full sticky top-0">
            <TopNav />
          </header>
          <div className="flex w-screen h-screen bg-white">
            <div className="flex-col flex sm:max-w-20 lg:max-w-full">
              <div className="flex flex-col flex-1 overflow-y-hidden h-screen">
                <SideNav />
              </div>
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto bg-slate-100">
              <div className="flex flex-col flex-1">
                {children}
              </div>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

