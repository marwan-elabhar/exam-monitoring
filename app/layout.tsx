import type {Metadata} from "next";
import "./globals.css";
import {StoreProvider} from "@/components/StoreProvider";

export const metadata: Metadata = {
    title: "ProctorDashboard",
    description: "Live Exam Monitoring Dashboard",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            className={`h-full`}
        >
        <body className="h-full">
        <StoreProvider>{children}</StoreProvider>
        </body>
        </html>
    );
}
