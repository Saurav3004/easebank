import { Poppins } from "next/font/google";
import "./globals.css";
import MainLayout from "@/layout/MainLayout";


const PoppinsFont = Poppins({
  variable: '--font-poppins',
  subsets: ["latin"],
  weight: '400'
})

export const metadata = {
  title: "EaseBank",
  description: "A Bank only for coders",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${PoppinsFont.className}`}
        suppressHydrationWarning
      >
        <MainLayout>
        {children}
        </MainLayout>
      </body>
    </html>
  );
}
