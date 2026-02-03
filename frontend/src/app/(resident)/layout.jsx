import { ResidentBottomNav } from "@/components/navigation/ResidentBottomNav";

export default function ResidentLayout({ children }) {
  return (
    <>
      <main className="">{children}</main>
      <ResidentBottomNav />
    </>
  );
}
