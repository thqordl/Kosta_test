import { useAuth } from "../contexts/AuthContext";
import { HeadquartersInventoryDashboard } from "./inventory/HeadquartersInventoryDashboard";
import { BranchInventoryDashboard } from "./inventory/BranchInventoryDashboard";

export function InventoryDashboardRouter() {
  const { user } = useAuth();
  
  if (user?.role === "본사관리자") {
    return <HeadquartersInventoryDashboard />;
  }
  
  return <BranchInventoryDashboard />;
}