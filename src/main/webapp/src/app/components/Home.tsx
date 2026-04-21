import { 
  Store, 
  TrendingUp, 
  Package, 
  Truck, 
  Warehouse,
  BookOpen,
  Users,
  ArrowRight,
  BarChart3,
  AlertCircle,
  CheckCircle2,
  TrendingDown
} from "lucide-react";
import { Link } from "react-router";

const quickStats = [
  {
    id: "qs1",
    name: "전체 직영점",
    value: "24개",
    change: "+2개 (이번 분기)",
    icon: Store,
    color: "green",
  },
  {
    id: "qs2",
    name: "전사 매출 (월)",
    value: "₩2,450,000,000",
    change: "+15.3% (전월 대비)",
    icon: TrendingUp,
    color: "yellow",
  },
  {
    id: "qs3",
    name: "총 재고 가치",
    value: "₩456,000,000",
    change: "-3.2% (전월 대비)",
    icon: Package,
    color: "green-dark",
  },
  {
    id: "qs4",
    name: "총 직원 수",
    value: "324명",
    change: "+12명 (전월 대비)",
    icon: Users,
    color: "green-light",
  },
];

const managementModules = [
  {
    id: "mod1",
    name: "직영점 통합 관리",
    description: "전국 직영점의 영업 현황과 실시간 매출을 통합 관리합니다",
    icon: Store,
    color: "green",
    path: "/branches/overview",
    dashboardPath: "/branches/dashboard",
  },
  {
    id: "mod2",
    name: "매출 관리",
    description: "전체 지점의 실시간 매출 조회 및 기간별 매출 분석",
    icon: TrendingUp,
    color: "yellow",
    path: "/sales/realtime",
    dashboardPath: "/sales/dashboard",
  },
  {
    id: "mod3",
    name: "발주 관리",
    description: "지점 발주 요청 취합, 승인/반려 및 품목별 수량 설정",
    icon: Package,
    color: "green",
    path: "/orders/requests",
    dashboardPath: "/orders/hq/dashboard",
  },
  {
    id: "mod4",
    name: "배송 관리",
    description: "배송 상태 통합 트래킹 및 반품 처리",
    icon: Truck,
    color: "green-dark",
    path: "/delivery/tracking",
    dashboardPath: "/delivery/dashboard",
  },
  {
    id: "mod5",
    name: "재고 관리",
    description: "전지점 품목 통합 조회 및 본사 물류창고 관리",
    icon: Warehouse,
    color: "green-light",
    path: "/inventory/branch-status",
    dashboardPath: "/inventory/dashboard",
  },
  {
    id: "mod6",
    name: "레시피 관리",
    description: "신규 레시피 등록, 수정 및 원가 분석",
    icon: BookOpen,
    color: "yellow",
    path: "/recipe/manage",
    dashboardPath: "/recipe/dashboard",
  },
  {
    id: "mod7",
    name: "인사 및 권한 관리",
    description: "본사 및 지점별 직원 정보, 계정 발급 및 권한 관리",
    icon: Users,
    color: "green",
    path: "/hr/employees",
    dashboardPath: "/hr/dashboard",
  },
];

const recentAlerts = [
  { id: "alert1", type: "warning", message: "강남점 재고 부족 알림 (김치 외 3품목)", time: "10분 전" },
  { id: "alert2", type: "success", message: "이번 주 전사 매출 목표 120% 달성", time: "1시간 전" },
  { id: "alert3", type: "info", message: "5개 지점 발주 요청 승인 대기 중", time: "2시간 전" },
  { id: "alert4", type: "warning", message: "부산 해운대점 배송 지연 발생", time: "3시간 전" },
];

const topBranches = [
  { id: "br1", name: "강남점", sales: "₩125,000,000", growth: "+18.5%", rank: 1 },
  { id: "br2", name: "홍대점", sales: "₩118,000,000", growth: "+15.2%", rank: 2 },
  { id: "br3", name: "잠실점", sales: "₩112,000,000", growth: "+12.8%", rank: 3 },
  { id: "br4", name: "판교점", sales: "₩108,000,000", growth: "+16.3%", rank: 4 },
  { id: "br5", name: "여의도점", sales: "₩95,000,000", growth: "+9.5%", rank: 5 },
];

export function Home() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="bg-gradient-to-r from-[#00853D] to-[#00A94F] rounded-xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-[#FFD100] rounded-lg flex items-center justify-center">
            <span className="text-[#00853D] font-bold text-2xl">S</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold">ZERO LOSS 본사 관리 시스템</h2>
            <p className="text-white/90 mt-1">전국 직영점을 통합 관리하는 본사 관리자 포털에 오신 것을 환영합니다</p>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            green: "bg-[#00853D] text-white",
            "green-dark": "bg-[#006B2F] text-white",
            "green-light": "bg-[#00A94F] text-white",
            yellow: "bg-[#FFD100] text-[#00853D]",
          }[stat.color];

          return (
            <div key={stat.id} className="bg-white rounded-lg border-2 border-[#00853D]/10 p-6 hover:border-[#00853D]/30 transition-all shadow-sm hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${colorClasses} flex items-center justify-center shadow-md`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600 mt-1">{stat.name}</p>
                <p className="text-xs text-gray-500 mt-2">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Management modules grid */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <div className="w-1 h-6 bg-[#00853D] rounded-full"></div>
          관리 모듈
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {managementModules.map((module) => {
            const Icon = module.icon;
            const colorClasses = {
              green: "bg-[#00853D]/5 border-[#00853D]/20 hover:border-[#00853D]/40 hover:bg-[#00853D]/10",
              "green-dark": "bg-[#006B2F]/5 border-[#006B2F]/20 hover:border-[#006B2F]/40 hover:bg-[#006B2F]/10",
              "green-light": "bg-[#00A94F]/5 border-[#00A94F]/20 hover:border-[#00A94F]/40 hover:bg-[#00A94F]/10",
              yellow: "bg-[#FFD100]/10 border-[#FFD100]/30 hover:border-[#FFD100]/50 hover:bg-[#FFD100]/20",
            }[module.color];
            
            const iconColorClasses = {
              green: "text-[#00853D]",
              "green-dark": "text-[#006B2F]",
              "green-light": "text-[#00A94F]",
              yellow: "text-[#F5C400]",
            }[module.color];

            const iconBgClasses = {
              green: "bg-[#00853D]",
              "green-dark": "bg-[#006B2F]",
              "green-light": "bg-[#00A94F]",
              yellow: "bg-[#FFD100]",
            }[module.color];

            return (
              <div 
                key={module.id} 
                className={`border-2 rounded-xl p-6 transition-all ${colorClasses} shadow-sm hover:shadow-md`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 ${iconBgClasses} rounded-lg flex items-center justify-center text-white shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <Link 
                    to={module.dashboardPath}
                    className="text-sm text-[#00853D] hover:text-[#006B2F] flex items-center gap-1 font-medium"
                  >
                    <BarChart3 className="w-4 h-4" />
                    대시보드
                  </Link>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{module.name}</h4>
                <p className="text-sm text-gray-600 mb-4">{module.description}</p>
                <Link 
                  to={module.path}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#00853D] hover:text-[#006B2F] hover:gap-3 transition-all"
                >
                  바로가기
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom section with alerts and top branches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent alerts */}
        <div className="bg-white rounded-xl border-2 border-[#00853D]/10 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-5 bg-[#00853D] rounded-full"></div>
            최근 알림
          </h3>
          <div className="space-y-3">
            {recentAlerts.map((alert) => {
              const Icon = alert.type === "warning" 
                ? AlertCircle 
                : alert.type === "success" 
                ? CheckCircle2 
                : AlertCircle;
              
              const colorClasses = alert.type === "warning"
                ? "text-[#F5C400] bg-[#FFD100]/20"
                : alert.type === "success"
                ? "text-[#00853D] bg-[#00853D]/10"
                : "text-[#00A94F] bg-[#00A94F]/10";

              return (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className={`w-8 h-8 rounded-lg ${colorClasses} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top performing branches */}
        <div className="bg-white rounded-xl border-2 border-[#00853D]/10 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-5 bg-[#00853D] rounded-full"></div>
            이번 달 TOP 5 점
          </h3>
          <div className="space-y-3">
            {topBranches.map((branch) => (
              <div key={branch.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-sm ${
                    branch.rank === 1 
                      ? "bg-[#FFD100] text-[#00853D]"
                      : branch.rank === 2
                      ? "bg-[#00A94F] text-white"
                      : branch.rank === 3
                      ? "bg-[#00853D] text-white"
                      : "bg-[#006B2F] text-white"
                  }`}>
                    {branch.rank}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{branch.name}</p>
                    <p className="text-sm text-gray-500">매출: {branch.sales}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[#00853D]">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">{branch.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}