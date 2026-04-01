import { cookies } from "next/headers";
import { API_BASE_URL } from "@/lib/config";
import { redirect } from "next/navigation";

export default async function BarangayDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("barangay_token")?.value;
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      Cookie: `barangay_token=${token}`,
    },
  });

  if (!response.ok) {
    redirect("/barangay/login");
  }

  return <main className="">This is the barangay Dashboard Page</main>;
}
