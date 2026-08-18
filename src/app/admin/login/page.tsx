import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import AdminLogin from "@/components/admin/AdminLogin";
export default async function LoginPage() { if (await getSession()) redirect("/admin"); return <AdminLogin />; }
