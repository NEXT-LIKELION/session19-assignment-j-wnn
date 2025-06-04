import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "My Blog",
  description: "A blog built with Next.js and shadcn/ui.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <div className="container mx-auto flex min-h-screen flex-col items-center p-4">
          <main className="w-full max-w-4xl py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
