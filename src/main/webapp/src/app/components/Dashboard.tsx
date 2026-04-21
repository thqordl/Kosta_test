import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  Users, 
  DollarSign,
  ShoppingCart
} from "lucide-react";
import { useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const stats = [
  {
    name: "총 매출",
    value: "₩245,000,000",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "blue",
  },
  {
    name: "신규 주문",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    color: "green",
  },
  {
    name: "재고 현황",
    value: "8,456",
    change: "-2.4%",
    trend: "down",
    icon: Package,
    color: "yellow",
  },
  {
    name: "직원 수",
    value: "156",
    change: "+3.1%",
    trend: "up",
    icon: Users,
    color: "purple",
  },
];

const salesData = [
  { id: "m1", month: "1월", revenue: 45000000, orders: 234 },
  { id: "m2", month: "2월", revenue: 52000000, orders: 267 },
  { id: "m3", month: "3월", revenue: 48000000, orders: 245 },
  { id: "m4", month: "4월", revenue: 61000000, orders: 312 },
  { id: "m5", month: "5월", revenue: 55000000, orders: 289 },
  { id: "m6", month: "6월", revenue: 67000000, orders: 334 },
];

const categoryData = [
  { id: "cat1", name: "전자제품", value: 35 },
  { id: "cat2", name: "의류", value: 25 },
  { id: "cat3", name: "식품", value: 20 },
  { id: "cat4", name: "가구", value: 12 },
  { id: "cat5", name: "기타", value: 8 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"];

const recentOrders = [
  { id: "ORD-001", customer: "주식회사 ABC", amount: "₩12,500,000", status: "완료", date: "2026-03-26" },
  { id: "ORD-002", customer: "디지털 코리아", amount: "₩8,300,000", status: "처리중", date: "2026-03-26" },
  { id: "ORD-003", customer: "글로벌 트레이드", amount: "₩15,700,000", status: "완료", date: "2026-03-25" },
  { id: "ORD-004", customer: "테크 솔루션", amount: "₩6,200,000", status: "대기", date: "2026-03-25" },
  { id: "ORD-005", customer: "비즈니스 파트너스", amount: "₩9,800,000", status: "완료", date: "2026-03-24" },
];

const dailyOrderData = [
  { id: "d1", date: "2026-03-26", orders: 50 },
  { id: "d2", date: "2026-03-27", orders: 60 },
  { id: "d3", date: "2026-03-28", orders: 55 },
  { id: "d4", date: "2026-03-29", orders: 70 },
  { id: "d5", date: "2026-03-30", orders: 65 },
  { id: "d6", date: "2026-03-31", orders: 80 },
];

export function Dashboard() {
  // Memoize chart data to prevent unnecessary re-renders
  const salesChartData = useMemo(() => salesData, []);
  const categoryChartData = useMemo(() => categoryData, []);
  const ordersChartData = useMemo(() => salesData, []);
  const dailyOrderChartData = useMemo(() => dailyOrderData, []);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">대시보드</h2>
        <p className="text-gray-500 mt-1">실시간 비즈니스 현황을 확인하세요</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: "bg-blue-100 text-blue-600",
            green: "bg-green-100 text-green-600",
            yellow: "bg-yellow-100 text-yellow-600",
            purple: "bg-purple-100 text-purple-600",
          }[stat.color];

          return (
            <div key={stat.name} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-lg ${colorClasses} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}
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
        {/* Revenue chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">월별 매출 추이</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="매출" key="revenue-line" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">카테고리별 판매 비율</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryChartData.map((entry, index) => (
                  <Cell key={`pie-cell-${entry.id}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Orders bar chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">월별 주문 건수</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ordersChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#10b981" name="주문 건수" key="orders-bar" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Daily orders */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">일별 주문 건수</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyOrderChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#10b981" name="주문 건수" key="orders-bar" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent orders */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 주문</h3>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{order.customer}</p>
                  <p className="text-sm text-gray-500">{order.id} · {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{order.amount}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    order.status === "완료" 
                      ? "bg-green-100 text-green-700"
                      : order.status === "처리중"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}