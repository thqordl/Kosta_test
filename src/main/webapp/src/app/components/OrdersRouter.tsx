import { useAuth } from "../contexts/AuthContext";
import { HeadquartersOrderDashboard } from "./orders/HeadquartersOrderDashboard";
import { OrderCreate } from "./orders/OrderCreate";

export function OrdersRouter() {
  const { user } = useAuth();

  if (user?.role === "본사관리자") {
    return <HeadquartersOrderDashboard />;
  }

  return <OrderCreate />;
}
