import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoCRM — управление автосалоном",
  description: "CRM-система для автомобильного бизнеса"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
