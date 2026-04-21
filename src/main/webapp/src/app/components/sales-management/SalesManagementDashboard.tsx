import { Link } from "react-router";
import { useMemo } from "react";
import { 
  DollarSign, 
  TrendingUp, 
  ShoppingCart,
  Calendar,
  ArrowUpRight,
  Clock,
  Award,
  BarChart3,
  FileText,
  Building2
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const stats = [
  {
    id: "st1",
    name: "이번 달 총 매출",
    value: "₩156,500,000",
    change: "+12.3%",
    trend: "up",
    icon: DollarSign,
    color: "blue",
  },
  {
    id: "st2",
    name: "오늘 매출",
    value: "₩5,240,000",
    change: "+8.1%",
    trend: "up",
    icon: TrendingUp,
    color: "green",
  },
  {
    id: "st3",
    name: "이번 달 주문 건수",
    value: "1,456건",
    change: "+15.7%",
    trend: "up",
    icon: ShoppingCart,
    color: "purple",
  },
  {
    id: "st4",
    name: "평균 주문 금액",
    value: "₩107,500",
    change: "+4.2%",
    trend: "up",
    icon: Calendar,
    color: "orange",
  },
];

const dailySalesData = [
  { id: "ds1", date: "3/21", sales: 4800000, orders: 45 },
  { id: "ds2", date: "3/22", sales: 5100000, orders: 48 },
  { id: "ds3", date: "3/23", sales: 4950000, orders: 46 },
  { id: "ds4", date: "3/24", sales: 5300000, orders: 52 },
  { id: "ds5", date: "3/25", sales: 5650000, orders: 54 },
  { id: "ds6", date: "3/26", sales: 5400000, orders: 51 },
  { id: "ds7", date: "3/27", sales: 5240000, orders: 49 },
];

const timeSlotData = [
  { id: "ts1", time: "06-09시", sales: 320000, orders: 12 },
  { id: "ts2", time: "09-12시", sales: 980000, orders: 18 },
  { id: "ts3", time: "12-15시", sales: 1560000, orders: 28 },
  { id: "ts4", time: "15-18시", sales: 750000, orders: 14 },
  { id: "ts5", time: "18-21시", sales: 1340000, orders: 24 },
  { id: "ts6", time: "21-24시", sales: 290000, orders: 8 },
];

const topMenus = [
  { id: "tm1", name: "이탈리안 비엠티", sales: 12450000, orders: 856, rank: 1 },
  { id: "tm2", name: "로티세리 치킨", sales: 9870000, orders: 734, rank: 2 },
  { id: "tm3", name: "참치 샌드위치", sales: 8340000, orders: 1123, rank: 3 },
  { id: "tm4", name: "초콜릿칩 쿠키", sales: 7230000, orders: 1456, rank: 4 },
  { id: "tm5", name: "베지 샌드위치", sales: 6780000, orders: 512, rank: 5 },
];

const quickLinks = [
  {
    id: "ql1",
    title: "매출 상세 조회",
    description: "기간별·지점별·메뉴별 상세 분석",
    path: "/sales-management/detail",
    icon: BarChart3,
    color: "blue",
  },
  {
    id: "ql2",
    title: "매출 순위 조회",
    description: "지점별·날짜별·메뉴별 순위",
    path: "/sales-management/ranking",
    icon: Award,
    color: "green",
  },
  {
    id: "ql3",
    title: "본사 매출 조회",
    description: "본사 전체 매출 및 수익성 분석",
    path: "/sales-management/headquarters",
    icon: Building2,
    color: "purple",
  },
];

export function SalesManagementDashboard() {
  const dailyChartData = useMemo(() => dailySalesData, []);
  const timeChartData = useMemo(() => timeSlotData, []);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">매출 관리 대시보드</h2>
        <p className="text-gray-500 mt-1">본사 전체의 매출 현황과 수익성을 종합적으로 분석하세요</p>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          const colorClasses = {
            blue: "bg-blue-50 text-blue-600 hover:bg-blue-100",
            green: "bg-green-50 text-green-600 hover:bg-green-100",
            purple: "bg-purple-50 text-purple-600 hover:bg-purple-100",
          }[link.color];

          return (
            <Link
              key={link.id}
              to={link.path}
              className={`${colorClasses} rounded-lg p-6 transition-colors`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{link.title}</h3>
                  <p className="text-sm mt-1 opacity-80">{link.description}</p>
                </div>
                <Icon className="w-8 h-8" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: "bg-blue-100 text-blue-600",
            green: "bg-green-100 text-green-600",
            orange: "bg-orange-100 text-orange-600",
            purple: "bg-purple-100 text-purple-600",
          }[stat.color];

          return (
            <div key={stat.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-lg ${colorClasses} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily sales trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">일별 매출 추이 (최근 7일)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailyChartData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid key="grid-daily" strokeDasharray="3 3" />
              <XAxis key="xaxis-daily" dataKey="date" />
              <YAxis key="yaxis-daily" />
              <Tooltip key="tooltip-daily" />
              <Legend key="legend-daily" />
              <Area key="area-sales" type="monotone" dataKey="sales" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSales)" name="매출 (원)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Time slot sales */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">시간대별 매출 (오늘)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timeChartData}>
              <CartesianGrid key="grid-time" strokeDasharray="3 3" />
              <XAxis key="xaxis-time" dataKey="time" />
              <YAxis key="yaxis-time" />
              <Tooltip key="tooltip-time" />
              <Legend key="legend-time" />
              <Bar key="bar-time-sales" dataKey="sales" fill="#10b981" name="매출 (원)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top selling menus */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">이번 달 인기 메뉴 TOP 5</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">순위</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">메뉴명</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">매출액</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">주문 건수</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">평균 단가</th>
              </tr>
            </thead>
            <tbody>
              {topMenus.map((menu) => (
                <tr key={menu.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                      menu.rank === 1 ? "bg-yellow-100 text-yellow-700" :
                      menu.rank === 2 ? "bg-gray-100 text-gray-700" :
                      menu.rank === 3 ? "bg-orange-100 text-orange-700" :
                      "bg-blue-50 text-blue-700"
                    }`}>
                      {menu.rank}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900">{menu.name}</td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">
                    ₩{menu.sales.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {menu.orders.toLocaleString()}건
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    ₩{Math.round(menu.sales / menu.orders).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}