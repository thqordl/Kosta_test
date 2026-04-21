import { useAuth } from "../contexts/AuthContext";
import { SalesManagementDashboard } from "./sales-management/SalesManagementDashboard";
import { BranchOwnSalesDetail } from "./branch-sales/BranchOwnSalesDetail";

export function SalesRouter() {
  const { user } = useAuth();

  if (user?.role === "본사관리자") {
    return <SalesManagementDashboard />;
  }

  return <BranchOwnSalesDetail />;
}
