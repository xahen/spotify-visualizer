import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Spotify Data Visualizer",
    description: "Coded by Oliver Borg",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
