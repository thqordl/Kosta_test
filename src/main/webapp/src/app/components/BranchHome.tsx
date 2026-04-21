import { useAuth } from "../contexts/AuthContext";
import { 
  TrendingUp, 
  Package, 
  AlertTriangle, 
  Users,
  Calendar,
  Clock,
  DollarSign,
  ArrowLeftRight,
  FileText,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router";

// Mock data
const todayStats = {
  sales: 3400000,
  orders: 201,
  inventory: 85,
  alerts: 3,
};

const quickActions = [
  {
    title: "발주서 작성",
    description: "새로운 발주 요청 생성",
    icon: FileText,
    path: "/orders/create",
    color: "green",
  },
  {
    title: "재고 현황",
    description: "실시간 재고 확인",
    icon: Package,
    path: "/inventory/status",
    color: "green-light",
  },
  {
    title: "재고 교환 요청",
    description: "주변 지점에 재고 지원 요청",
    icon: ArrowLeftRight,
    path: "/inventory-swap/dashboard",
    color: "green-dark",
  },
  {
    title: "매출 조회",
    description: "오늘의 매출 상세",
    icon: DollarSign,
    path: "/branch-sales/detail",
    color: "yellow",
  },
];

const recentNotices = [
  { id: 1, title: "3월 재고 조사 안내", date: "2026-03-29", type: "공지" },
  { id: 2, title: "신메뉴 출시 예정 (4월)", date: "2026-03-28", type: "공지" },
  { id: 3, title: "봄 시즌 프로모션 시작", date: "2026-03-27", type: "안내" },
];

const pendingTasks = [
  { id: 1, title: "발주 승인 대기 중", count: 2, path: "/orders/history" },
  { id: 2, title: "재고 교환 요청", count: 3, path: "/inventory-swap/dashboard" },
  { id: 3, title: "직원 근무표 승인", count: 1, path: "/schedule" },
];

const todaySchedule = [
  { time: "09:00", event: "개점 준비", status: "completed" },
  { time: "11:00", event: "재고 확인", status: "completed" },
  { time: "14:00", event: "본사 미팅", status: "ongoing" },
  { time: "17:00", event: "마감 정산", status: "pending" },
];

export function BranchHome() {
  const { user } = useAuth();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(value);
  };

  const getColorClasses = (color: string) => {
    const colors = {
      green: "bg-[#00853D]/10 text-[#00853D] hover:bg-[#00853D]/20 border border-[#00853D]/20",
      "green-light": "bg-[#00A94F]/10 text-[#00A94F] hover:bg-[#00A94F]/20 border border-[#00A94F]/20",
      "green-dark": "bg-[#006B2F]/10 text-[#006B2F] hover:bg-[#006B2F]/20 border border-[#006B2F]/20",
      yellow: "bg-[#FFD100]/20 text-[#F5C400] hover:bg-[#FFD100]/30 border border-[#FFD100]/30",
    };
    return colors[color as keyof typeof colors] || colors.green;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#00853D] to-[#00A94F] rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-14 h-14 bg-[#FFD100] rounded-xl flex items-center justify-center shadow-md">
            <span className="text-[#00853D] font-bold text-2xl">S</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">안녕하세요, {user?.name}님!</h1>
            <p className="text-white/90">
              {user?.branch} - {user?.role} | {new Date().toLocaleDateString("ko-KR", { 
                year: "numeric", 
                month: "long", 
                day: "numeric",
                weekday: "long"
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Today Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border-2 border-[#00853D]/10 p-6 hover:border-[#00853D]/30 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">오늘 매출</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(todayStats.sales)}
              </p>
            </div>
            <div className="w-12 h-12 bg-[#00853D] rounded-lg flex items-center justify-center shadow-md">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border-2 border-[#00853D]/10 p-6 hover:border-[#00853D]/30 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">주문 건수</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{todayStats.orders}건</p>
            </div>
            <div className="w-12 h-12 bg-[#00A94F] rounded-lg flex items-center justify-center shadow-md">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border-2 border-[#00853D]/10 p-6 hover:border-[#00853D]/30 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">재고 현황</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{todayStats.inventory}%</p>
            </div>
            <div className="w-12 h-12 bg-[#006B2F] rounded-lg flex items-center justify-center shadow-md">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border-2 border-[#00853D]/10 p-6 hover:border-[#00853D]/30 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">알림</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{todayStats.alerts}건</p>
            </div>
            <div className="w-12 h-12 bg-[#FFD100] rounded-lg flex items-center justify-center shadow-md">
              <AlertTriangle className="w-6 h-6 text-[#00853D]" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-[#00853D]/10 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <div className="w-1 h-5 bg-[#00853D] rounded-full"></div>
          빠른 작업
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                to={action.path}
                className={`p-4 rounded-lg transition-all ${getColorClasses(action.color)}`}
              >
                <Icon className="w-8 h-8 mb-3" />
                <h3 className="font-semibold mb-1">{action.title}</h3>
                <p className="text-sm opacity-80">{action.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Tasks */}
        <div className="bg-white rounded-xl shadow-sm border-2 border-[#00853D]/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-1 h-5 bg-[#FFD100] rounded-full"></div>
              처리 대기
            </h2>
            <AlertTriangle className="w-5 h-5 text-[#FFD100]" />
          </div>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <Link
                key={task.id}
                to={task.path}
                className="flex items-center justify-between p-4 bg-[#FFD100]/10 border border-[#FFD100]/30 rounded-lg hover:bg-[#FFD100]/20 transition-colors"
              >
                <span className="font-medium text-gray-900">{task.title}</span>
                <span className="px-3 py-1 bg-[#00853D] text-white rounded-full text-sm font-semibold shadow-sm">
                  {task.count}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Today Schedule */}
        <div className="bg-white rounded-xl shadow-sm border-2 border-[#00853D]/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-1 h-5 bg-[#00853D] rounded-full"></div>
              오늘 일정
            </h2>
            <Calendar className="w-5 h-5 text-[#00853D]" />
          </div>
          <div className="space-y-3">
            {todaySchedule.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  item.status === "completed"
                    ? "bg-[#00853D]/10 border border-[#00853D]/20"
                    : item.status === "ongoing"
                    ? "bg-[#FFD100]/20 border border-[#FFD100]/30"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-200 shadow-sm">
                  <Clock className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.event}</p>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
                {item.status === "completed" && (
                  <CheckCircle className="w-5 h-5 text-[#00853D]" />
                )}
                {item.status === "ongoing" && (
                  <div className="w-2 h-2 bg-[#FFD100] rounded-full animate-pulse shadow-sm" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Notices */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-[#00853D]/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <div className="w-1 h-5 bg-[#00853D] rounded-full"></div>
            최근 공지사항
          </h2>
          <Link to="/branches/notices" className="text-sm text-[#00853D] hover:text-[#006B2F] font-medium">
            전체보기 →
          </Link>
        </div>
        <div className="space-y-3">
          {recentNotices.map((notice) => (
            <div
              key={notice.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#00853D] text-white rounded-full text-xs font-medium shadow-sm">
                  {notice.type}
                </span>
                <span className="font-medium text-gray-900">{notice.title}</span>
              </div>
              <span className="text-sm text-gray-500">{notice.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}