// import { Sidebar } from "@/app/components/sidebar";

export default function StatsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <Sidebar /> */}
      {children}
    </>
  );
}
