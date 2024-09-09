import MyHead from "@/frontend/components/head";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: "Thinklog",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <MyHead />
            <body>
                {children}
                <div id="modal-root" />
                <Toaster />
            </body>
        </html>
    );
}
