import type { Metadata } from "next";
import { ProfileProvider } from "@/context/ProfileContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIVisor — Alberta Student AI Assistant",
  description:
    "Personalized roadmaps, soft skills, program switching, and co-op prep for Alberta post-secondary students. Powered by ALIS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <ProfileProvider>{children}</ProfileProvider>
      </body>
    </html>
  );
}
