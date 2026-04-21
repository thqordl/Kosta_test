import { createBrowserRouter } from 'react-router';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Root } from './components/Root';
import { HomePage } from './components/HomePage';
import { Dashboard } from './components/Dashboard';
import { NotFound } from './components/NotFound';
import { ServerError } from './components/ServerError';
import { HR } from './components/HR';
import { EmployeeDetail } from './components/EmployeeDetail';
import { Schedule } from './components/Schedule';
import { Finance } from './components/Finance';
import { Account } from './components/Account';
import { Permissions } from './components/Permissions';
import { Inventory } from './components/Inventory';
import { Sales } from './components/Sales';
import { EmployeeScheduleManagement } from './components/EmployeeScheduleManagement';
import { InventoryDashboardRouter } from './components/InventoryDashboardRouter';
import { OrdersRouter } from './components/OrdersRouter';
import { SalesRouter } from './components/SalesRouter';
import { RecipeRouter } from './components/RecipeRouter';
import { BranchesRouter } from './components/BranchesRouter';

// Branch components
import { BranchSearch } from './components/branches/BranchSearch';
import { BranchInquiries } from './components/branches/BranchInquiries';

// Dashboard components
import { InventoryDashboard } from './components/dashboards/InventoryDashboard';
import { SalesDashboard } from './components/dashboards/SalesDashboard';

// Inventory components
import { BranchInventoryStatus } from './components/inventory/BranchInventoryStatus';
import { LossManagement } from './components/inventory/LossManagement';
import { ItemsMaster } from './components/inventory/ItemsMaster';
import { WarehouseReceive } from './components/inventory/WarehouseReceive';
import { WarehouseRelease } from './components/inventory/WarehouseRelease';
import { WarehouseExpiryTracking } from './components/inventory/WarehouseExpiryTracking';
import { InventoryStatus } from './components/inventory/InventoryStatus';
import { InventoryMovement } from './components/inventory/InventoryMovement';

// Order components
import { HeadquartersOrderDashboard } from './components/orders/HeadquartersOrderDashboard';
import { OrderCreate } from './components/orders/OrderCreate';
import { OrderHistory } from './components/orders/OrderHistory';
import { OrderRequestsManagement } from './components/orders/OrderRequestsManagement';
import { OrderItemLimits } from "./components/orders/OrderItemLimits";

// Branch Sales components
import { BranchSalesDetail } from "./components/branch-sales/BranchSalesDetail";
import { BranchOwnSalesDetail } from "./components/branch-sales/BranchOwnSalesDetail";
import { BranchSalesRanking } from "./components/branch-sales/BranchSalesRanking";

// Branches components
import { BranchesDashboard } from './components/dashboards/BranchesDashboard';
import { HeadquartersNotices } from './components/branches/HeadquartersNotices';
import { HeadquartersInquiries } from './components/branches/HeadquartersInquiries';

// Delivery components
import { RealTimeTracking } from './components/delivery/RealTimeTracking';
import { DispatchManagement } from './components/delivery/DispatchManagement';
import { DriverVehicleManagement } from './components/delivery/DriverVehicleManagement';

// Recipe components
import { RecipeManagement } from './components/recipe/RecipeManagement';
import { BranchRecipeView } from './components/recipe/BranchRecipeView';

// Sales Management components
import { SalesManagementDashboard } from './components/sales-management/SalesManagementDashboard';
import { MenuRanking } from './components/sales-management/MenuRanking';
import { HeadquartersSales } from './components/sales-management/HeadquartersSales';
import { SalesInquiry } from './components/sales-management/SalesInquiry';
import { HourlyOrders } from './components/sales-management/HourlyOrders';

// Inventory Swap components
import { InventorySwap } from './components/inventory-swap/InventorySwap';

// Receiving components
import { ReceivingConfirm } from './components/receiving/ReceivingConfirm';
import { ReceivingHistory } from './components/receiving/ReceivingHistory';

// Logistics Dashboard
import { LogisticsDashboard } from './components/dashboards/LogisticsDashboard';

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
    errorElement: <ServerError />,
  },
  {
    path: "/register",
    Component: Register,
    errorElement: <ServerError />,
  },
  {
    path: "/",
    Component: Root,
    errorElement: <ServerError />,
    children: [
      // Home route - shows Home for head office admin, Dashboard for others
      { index: true, Component: HomePage },
      
      // Branch management dashboard routes
      { path: "branches/dashboard", Component: BranchesRouter },
      { path: "branches/search", Component: BranchSearch },
      { path: "branches/notices", Component: HeadquartersNotices },
      { path: "branches/inquiries", Component: HeadquartersInquiries },
      
      // Sales management dashboard routes
      { path: "sales/dashboard", Component: SalesDashboard },
      { path: "sales/realtime", Component: () => <div className="p-6"><h2 className="text-2xl font-bold">전체 지점 실시간 매출 조회</h2><p className="text-gray-500 mt-2">준비 중입니다.</p></div> },
      { path: "sales/detailed", Component: () => <div className="p-6"><h2 className="text-2xl font-bold">기간별/메뉴별/지점별 매출 상세</h2><p className="text-gray-500 mt-2">준비 중입니다.</p></div> },
      
      // Order management routes (권한별 라우팅)
      { path: "orders", Component: OrdersRouter },
      { path: "orders/history", Component: OrderHistory },
      { path: "orders/requests", Component: OrderRequestsManagement },
      { path: "orders/limits", Component: OrderItemLimits },
      
      // Delivery management dashboard routes
      { path: "delivery/tracking", Component: RealTimeTracking },
      { path: "delivery/dispatch", Component: DispatchManagement },
      { path: "delivery/drivers", Component: DriverVehicleManagement },
      
      // Inventory management dashboard routes (본사/지점 공통 - 역할별 라우팅)
      { path: "inventory/dashboard", Component: InventoryDashboardRouter },
      
      // Inventory management routes (본사용)
      { path: "inventory/branch-status", Component: BranchInventoryStatus },
      { path: "inventory/loss-management", Component: LossManagement },
      
      // Logistics management routes (본사용 - 물류 관리)
      { path: "logistics/warehouse-receive", Component: WarehouseReceive },
      { path: "logistics/warehouse-release", Component: WarehouseRelease },
      { path: "logistics/warehouse-expiry", Component: WarehouseExpiryTracking },
      { path: "logistics/items-master", Component: ItemsMaster },
      
      // Inventory management routes (지점용)
      { path: "inventory/status", Component: InventoryStatus },
      { path: "inventory/movement", Component: InventoryMovement },
      
      // Recipe management dashboard routes (권한별 라우팅)
      { path: "recipe", Component: RecipeRouter },
      { path: "recipe/status", Component: () => <div className="p-6"><h2 className="text-2xl font-bold">레시피 활성/비활성화 및 원가 조회</h2><p className="text-gray-500 mt-2">준비 중입니다.</p></div> },
      
      // HR management dashboard routes
      { path: "hr/employees", Component: HR },
      { path: "hr/accounts", Component: Permissions },
      { path: "hr/schedule", Component: EmployeeScheduleManagement },
      
      // Sales Management routes (권한별 라우팅)
      { path: "sales-management", Component: SalesRouter },
      { path: "sales-management/detail", Component: BranchSalesDetail },
      { path: "sales-management/ranking", Component: MenuRanking },
      { path: "sales-management/headquarters", Component: HeadquartersSales },
      { path: "sales-management/inquiry", Component: SalesInquiry },
      { path: "sales-management/hourly", Component: HourlyOrders },
      
      // Inventory Swap routes (지점간 재고 교환)
      { path: "inventory-swap/dashboard", Component: InventorySwap },
      
      // Receiving routes (지점용)
      { path: "receiving/confirm", Component: ReceivingConfirm },
      { path: "receiving/history", Component: ReceivingHistory },
      
      // Support routes (운영지원 - 지점용)
      { path: "support/notices", Component: HeadquartersNotices },
      { path: "support/inquiries", Component: BranchInquiries },
      
      // Legacy Sales Management routes for branch users (지점장, 지점매니저)
      { path: "sales-management/inquiry", Component: SalesInquiry },
      { path: "sales-management/hourly", Component: HourlyOrders },
      
      // Legacy routes for branch users
      { path: "dashboard", Component: Dashboard },
      { path: "dashboard/inventory", Component: InventoryDashboard },
      { path: "dashboard/logistics", Component: LogisticsDashboard },
      { path: "inventory", Component: Inventory },
      { path: "sales", Component: Sales },
      { path: "hr", Component: HR },
      { path: "hr/:id", Component: EmployeeDetail },
      { path: "schedule", Component: Schedule },
      { path: "finance", Component: Finance },
      { path: "account", Component: Account },
      { path: "permissions", Component: Permissions },
      
      // Error pages for testing
      { path: "error/500", Component: ServerError },
      
      { path: "*", Component: NotFound },
    ],
  },
]);