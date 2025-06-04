import { Inter } from "next/font/google";
import "./globals.css";
import { Separator } from "@/components/ui/separator";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "내 블로그",
  description: "개인 블로그 - Next.js로 만든 현대적인 블로그",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-background">
          {/* 1080px 중앙 컨테이너 */}
          <div className="max-w-[1080px] mx-auto">
            {/* 헤더 */}
            <header className="bg-glass border-b border-glass sticky top-0 z-50">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-xl flex items-center justify-center">
                      <span className="text-black font-bold text-lg">Jwn</span>
                    </div>
                    <h1 className="text-xl font-bold text-gradient-dark">
                      내 블로그
                    </h1>
                  </div>
                  <nav className="hidden sm:flex items-center space-x-6">
                    <a href="/" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                      홈
                    </a>
                    <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                      소개
                    </a>
                  </nav>
                </div>
              </div>
            </header>

            {/* 메인 콘텐츠 */}
            <main className="px-4 sm:px-6 lg:px-8 py-8">
              <div className="bg-card border border-border rounded-2xl shadow-dark p-6 sm:p-8">
                {children}
              </div>
            </main>            
          </div>
        </div>
      </body>
    </html>
  );
}
