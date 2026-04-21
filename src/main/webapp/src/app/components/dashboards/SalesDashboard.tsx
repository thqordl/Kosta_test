import { useMemo } from "react";
import { 
  DollarSign, 
  TrendingUp, 
  ShoppingCart,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
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
    value: "₩2,450,000,000",
    change: "+15.3%",
    trend: "up",
    icon: DollarSign,
    color: "blue",
  },
  {
    id: "st2",
    name: "오늘 매출",
    value: "₩85,600,000",
    change: "+8.7%",
    trend: "up",
    icon: TrendingUp,
    color: "green",
  },
  {
    id: "st3",
    name: "총 주문 건수",
    value: "23,456건",
    change: "+12.4%",
    trend: "up",
    icon: ShoppingCart,
    color: "purple",
  },
  {
    id: "st4",
    name: "평균 주문 금액",
    value: "₩104,500",
    change: "+2.8%",
    trend: "up",
    icon: Calendar,
    color: "orange",
  },
];

const dailySalesData = [
  { id: "ds1", date: "3/21", sales: 78000000, orders: 756 },
  { id: "ds2", date: "3/22", sales: 82000000, orders: 812 },
  { id: "ds3", date: "3/23", sales: 79000000, orders: 789 },
  { id: "ds4", date: "3/24", sales: 85000000, orders: 834 },
  { id: "ds5", date: "3/25", sales: 91000000, orders: 892 },
  { id: "ds6", date: "3/26", sales: 88000000, orders: 856 },
  { id: "ds7", date: "3/27", sales: 85600000, orders: 823 },
];

const menuCategoryData = [
  { id: "mc1", category: "메인 메뉴", sales: 980000000, percentage: 40 },
  { id: "mc2", category: "사이드 메뉴", sales: 612500000, percentage: 25 },
  { id: "mc3", category: "음료", sales: 490000000, percentage: 20 },
  { id: "mc4", category: "디저트", sales: 245000000, percentage: 10 },
  { id: "mc5", category: "세트 메뉴", sales: 122500000, percentage: 5 },
];

const timeSlotData = [
  { id: "ts1", time: "06-09시", sales: 156000000 },
  { id: "ts2", time: "09-12시", sales: 425000000 },
  { id: "ts3", time: "12-15시", sales: 735000000 },
  { id: "ts4", time: "15-18시", sales: 392000000 },
  { id: "ts5", time: "18-21시", sales: 612000000 },
  { id: "ts6", time: "21-24시", sales: 130000000 },
];

const topMenus = [
  { id: "tm1", name: "이탈리안 비엠티", sales: 245000000, orders: 15234, rank: 1 },
  { id: "tm2", name: "로티세리 치킨", sales: 198000000, orders: 12456, rank: 2 },
  { id: "tm3", name: "참치 샌드위치", sales: 167000000, orders: 18923, rank: 3 },
  { id: "tm4", name: "초콜릿칩 쿠키", sales: 134000000, orders: 22145, rank: 4 },
  { id: "tm5", name: "베지 샌드위치", sales: 123000000, orders: 8234, rank: 5 },
];

export function SalesDashboard() {
  const dailyChartData = useMemo(() => dailySalesData, []);
  const menuChartData = useMemo(() => menuCategoryData, []);
  const timeChartData = useMemo(() => timeSlotData, []);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">매출 관리 대시보드</h2>
        <p className="text-gray-500 mt-1">전체 지점의 실시간 매출 현황을 확인하세요</p>
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
        <div className="bg-white rounded-lg border border-gray-200 p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">일별 매출 추이 (최근 7일)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailyChartData}>
              <defs>
                <linearGradient id="colorSalesDaily" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value: number) => [`₩${value.toLocaleString()}`, '매출']} />
              <Legend />
              <Area type="monotone" dataKey="sales" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSalesDaily)" name="매출 (원)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Menu category sales */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">메뉴 카테고리별 매출</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={menuChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value: number) => [`₩${value.toLocaleString()}`, '매출']} />
              <Legend />
              <Bar dataKey="sales" fill="#10b981" name="매출 (원)" key="sales-bar" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Time slot sales */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">시간대별 매출</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip formatter={(value: number) => [`₩${value.toLocaleString()}`, '매출']} />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#f59e0b" strokeWidth={2} name="매출 (원)" key="sales-line" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top selling menus */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">인기 메뉴 TOP 5</h3>
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