import LayoutDashboard from "@/components/layout/LayoutDashboard";
import DashboardPage from "./dashboard/page";

export default function AdminPage() {
  return (
    <>
      <LayoutDashboard title="Dashboard" desc="Welcome to the admin dashboard!">
        <DashboardPage />
      </LayoutDashboard>
    </>
  );
}
