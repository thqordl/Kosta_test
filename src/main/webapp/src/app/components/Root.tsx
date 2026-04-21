import { Outlet, Link, useLocation, useNavigate, Navigate } from "react-router";
import { 
  LayoutDashboard, 
  Package, 
  TrendingUp, 
  Users, 
  DollarSign,
  Menu,
  X,
  Settings,
  LogOut,
  Shield,
  Calendar,
  ChevronDown,
  ChevronRight,
  Store,
  Truck,
  BookOpen,
  BarChart3,
  Warehouse,
  Home,
  FileText,
  ArrowLeftRight,
  PackageCheck,
  Headphones
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { NotificationCenter } from "./NotificationCenter";

interface SubMenuItem {
  name: string;
  path: string;
}

interface MenuItem {
  name: string;
  path?: string;
  icon: any;
  module: string;
  subItems?: SubMenuItem[];
}

export function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, canAccessModule, isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["대시보드"]);

  // Check if user is authenticated, if not redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 본사 관리자용 메뉴
  const headOfficeNavigation: MenuItem[] = [
    {
      name: "홈",
      path: "/",
      icon: Home,
      module: "home",
    },
    {
      name: "지점 재고 관리",
      icon: Warehouse,
      module: "inventory",
      subItems: [
        { name: "지점재고 현황", path: "/inventory/branch-status" },
        { name: "지점 손실 관리", path: "/inventory/loss-management" },
      ],
    },
    {
      name: "물류창고 관리",
      icon: PackageCheck,
      module: "logistics",
      subItems: [
        { name: "본사 물류창고 입고", path: "/logistics/warehouse-receive" },
        { name: "본사 물류창고 출고", path: "/logistics/warehouse-release" },
        { name: "유통기한 조회", path: "/logistics/warehouse-expiry" },
        { name: "물류창고 내 품목", path: "/logistics/items-master" },
      ],
    },
    {
      name: "발주 관리",
      icon: FileText,
      module: "orders",
      subItems: [
        { name: "발주 요청 취합 및 조회", path: "/orders/hq/dashboard" },
        { name: "발주 요청 승인/반려", path: "/orders/hq/requests" },
        { name: "품목별 발주 수량 설정", path: "/orders/hq/limits" },
      ],
    },
    {
      name: "매출 관리",
      icon: TrendingUp,
      module: "sales-management",
      subItems: [
        { name: "직영점 매출 조회", path: "/sales-management/detail" },
        { name: "매출 순위", path: "/sales-management/ranking" },
        { name: "본사 매출 조회", path: "/sales-management/headquarters" },
      ],
    },
    {
      name: "배송 관리",
      icon: Truck,
      module: "delivery",
      subItems: [
        { name: "배송 조회", path: "/delivery/tracking" },
        { name: "배차 관리", path: "/delivery/dispatch" },
        { name: "기사/차량 관리", path: "/delivery/drivers" },
      ],
    },
    {
      name: "레시피 관리",
      icon: BookOpen,
      module: "recipe",
      path: "/recipe/manage",
    },
    {
      name: "직영점 관리",
      icon: Store,
      module: "branches",
      subItems: [
        { name: "직영점 조회", path: "/branches/search" },
        { name: "공지사항", path: "/branches/notices" },
        { name: "문의 게시판", path: "/branches/inquiries" },
      ],
    },
    {
      name: "인사 및 권한 관리",
      icon: Users,
      module: "hr",
      subItems: [
        { name: "본사 및 지점별 직원 정보 통합 조회", path: "/hr/employees" },
        { name: "직영점 계정 발급/삭제 및 권한 부여", path: "/hr/accounts" },
        { name: "직원 일정 관리", path: "/hr/schedule" },
      ],
    },
  ];

  // 지점장/지점매니저용 메뉴 (기존)
  const branchNavigation: MenuItem[] = [
    { name: "홈", path: "/", icon: Home, module: "home" },
    {
      name: "재고관리",
      icon: Warehouse,
      module: "inventory",
      subItems: [
        { name: "재고 현황", path: "/inventory/status" },
        { name: "재고 변동", path: "/inventory/movement" },
      ],
    },
    {
      name: "입고 관리",
      icon: PackageCheck,
      module: "receiving",
      subItems: [
        { name: "입고 이력", path: "/receiving/history" },
        { name: "입고 처리", path: "/receiving/confirm" },
      ],
    },
    {
      name: "발주 관리",
      icon: FileText,
      module: "orders",
      subItems: [
        { name: "발주 내역", path: "/orders/history" },
        { name: "발주서 작성", path: "/orders/create" },
      ],
    },
    {
      name: "매출 관리",
      icon: DollarSign,
      module: "sales-management",
      subItems: [
        { name: "매출 조회", path: "/branch-sales/detail" },
        { name: "매출 순위", path: "/branch-sales/ranking" },
      ],
    },
    {
      name: "재고 교환/요청",
      icon: ArrowLeftRight,
      module: "inventory-swap",
      path: "/inventory-swap/dashboard",
    },
    { 
      name: "레시피 관리", 
      path: "/recipe/view", 
      icon: BookOpen, 
      module: "recipe" 
    },
    { 
      name: "직원관리", 
      icon: Users, 
      module: "hr",
      subItems: [
        { name: "직원 정보 조회", path: "/hr" },
        { name: "일정관리", path: "/schedule" },
      ],
    },
    {
      name: "운영지원",
      icon: Headphones,
      module: "support",
      subItems: [
        { name: "공지사항", path: "/support/notices" },
        { name: "문의사항", path: "/support/inquiries" },
      ],
    },
  ];

  // 본사관리자 여부에 따라 메뉴 선택
  const allNavigation = user?.role === "본사관리자" ? headOfficeNavigation : branchNavigation;

  // Filter navigation based on user permissions
  const navigation = allNavigation.filter(item => canAccessModule(item.module));

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuName)
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    );
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActiveItem = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-30 transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 overflow-y-auto`}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#00853D] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">분</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Zero Loss</h1>
              <p className="text-xs text-gray-500">ERP</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedMenus.includes(item.name);
            
            if (hasSubItems) {
              return (
                <div key={item.name}>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.subItems.map((subItem) => {
                        const isActive = isActiveItem(subItem.path);
                        return (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            onClick={() => setSidebarOpen(false)}
                            className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                              isActive
                                ? "bg-[#00853D] text-white font-medium"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            } else {
              const isActive = item.path ? isActiveItem(item.path) : false;
              return (
                <Link
                  key={item.name}
                  to={item.path || "#"}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#00853D] text-white font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            }
          })}
        </nav>

        {/* User info in sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <Link to="/account" className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="w-10 h-10 rounded-full bg-[#00853D] flex items-center justify-center text-white font-semibold">
              {user?.name.charAt(0) || "U"}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{user?.name || "사용자"}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <div className="flex items-center gap-4 ml-auto relative">
              {/* Notification Center */}
              <NotificationCenter />

              <div className="text-right">
                <p className="text-sm font-medium">{user?.name || "사용자"}</p>
                <p className="text-xs text-gray-500">{user?.username}</p>
              </div>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-10 h-10 rounded-full bg-[#00853D] flex items-center justify-center text-white hover:bg-[#006B2F] transition-colors"
              >
                {user?.name.charAt(0) || "U"}
              </button>

              {/* User dropdown menu */}
              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 top-14 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                    <Link
                      to="/account"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      <Settings className="w-4 h-4" />
                      계정 관리
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      로그아웃
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}