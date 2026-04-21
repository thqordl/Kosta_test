import { useMemo } from "react";
import { 
  Warehouse, 
  Package,
  AlertTriangle,
  TrendingDown,
  Archive,
  Calendar
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
    name: "전체 재고 가치",
    value: "₩456,000,000",
    change: "-3.2%",
    trend: "down",
    icon: Warehouse,
    color: "blue",
  },
  {
    id: "st2",
    name: "총 품목 수",
    value: "1,245개",
    change: "+18개",
    trend: "up",
    icon: Package,
    color: "green",
  },
  {
    id: "st3",
    name: "재고 부족",
    value: "23개",
    change: "긴급 발주 필요",
    trend: "warning",
    icon: AlertTriangle,
    color: "yellow",
  },
  {
    id: "st4",
    name: "유통기한 임박",
    value: "15개",
    change: "7일 이내",
    trend: "down",
    icon: Calendar,
    color: "red",
  },
];

const inventoryTrendData = [
  { id: "it1", date: "3/21", totalValue: 462000000, inStock: 1227, lowStock: 18 },
  { id: "it2", date: "3/22", totalValue: 465000000, inStock: 1232, lowStock: 20 },
  { id: "it3", date: "3/23", totalValue: 458000000, inStock: 1228, lowStock: 22 },
  { id: "it4", date: "3/24", totalValue: 461000000, inStock: 1235, lowStock: 19 },
  { id: "it5", date: "3/25", totalValue: 459000000, inStock: 1240, lowStock: 21 },
  { id: "it6", date: "3/26", totalValue: 457000000, inStock: 1242, lowStock: 24 },
  { id: "it7", date: "3/27", totalValue: 456000000, inStock: 1245, lowStock: 23 },
];

const categoryInventoryData = [
  { id: "ci1", category: "식자재", value: 185000000, items: 456 },
  { id: "ci2", category: "음료 원재료", value: 112000000, items: 234 },
  { id: "ci3", category: "포장재", value: 89000000, items: 312 },
  { id: "ci4", category: "소모품", value: 45000000, items: 178 },
  { id: "ci5", category: "기타", value: 25000000, items: 65 },
];

const warehouseActivityData = [
  { id: "wa1", date: "3/21", incoming: 156, outgoing: 178, adjusted: 5 },
  { id: "wa2", date: "3/22", incoming: 142, outgoing: 165, adjusted: 3 },
  { id: "wa3", date: "3/23", incoming: 168, outgoing: 172, adjusted: 7 },
  { id: "wa4", date: "3/24", incoming: 175, outgoing: 189, adjusted: 4 },
  { id: "wa5", date: "3/25", incoming: 152, outgoing: 167, adjusted: 6 },
  { id: "wa6", date: "3/26", incoming: 134, outgoing: 145, adjusted: 2 },
  { id: "wa7", date: "3/27", incoming: 98, outgoing: 112, adjusted: 1 },
];

const lowStockItems = [
  { id: "ls1", item: "치킨 스트립", current: 45, minimum: 200, status: "긴급", warehouse: "본사 A창고" },
  { id: "ls2", item: "참치", current: 20, minimum: 50, status: "주의", warehouse: "본사 A창고" },
  { id: "ls3", item: "허니오트 빵", current: 850, minimum: 2000, status: "긴급", warehouse: "본사 B창고" },
  { id: "ls4", item: "양상추", current: 32, minimum: 100, status: "긴급", warehouse: "본사 A창고" },
  { id: "ls5", item: "토마토", current: 28, minimum: 80, status: "긴급", warehouse: "본사 A창고" },
];

const expiringItems = [
  { id: "ex1", item: "신선 우유", quantity: "240L", expiryDate: "2026-03-30", daysLeft: 3, warehouse: "본사 A창고" },
  { id: "ex2", item: "양상추", quantity: "120kg", expiryDate: "2026-03-29", daysLeft: 2, warehouse: "본사 A창고" },
  { id: "ex3", item: "토마토", quantity: "85kg", expiryDate: "2026-03-31", daysLeft: 4, warehouse: "본사 A창고" },
  { id: "ex4", item: "치즈 슬라이스", quantity: "180팩", expiryDate: "2026-04-02", daysLeft: 6, warehouse: "본사 B창고" },
  { id: "ex5", item: "베이컨", quantity: "95kg", expiryDate: "2026-04-01", daysLeft: 5, warehouse: "본사 B창고" },
];

export function InventoryAdminDashboard() {
  const trendChartData = useMemo(() => inventoryTrendData, []);
  const categoryChartData = useMemo(() => categoryInventoryData, []);
  const activityChartData = useMemo(() => warehouseActivityData, []);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">재고 관리 대시보드</h2>
        <p className="text-gray-500 mt-1">전지점 및 본사 물류창고의 재고 현황을 확인하세요</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: "bg-blue-100 text-blue-600",
            green: "bg-green-100 text-green-600",
            yellow: "bg-yellow-100 text-yellow-600",
            red: "bg-red-100 text-red-600",
          }[stat.color];

          return (
            <div key={stat.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-lg ${colorClasses} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.name}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory value trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">재고 가치 추이 (최근 7일)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trendChartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="totalValue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" name="재고 가치 (원)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category inventory value */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">카테고리별 재고 가치</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#10b981" name="재고 가치 (원)" key="value-bar" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory movement */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">재고 입출고 현황 (최근 7일)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="incoming" stroke="#3b82f6" strokeWidth={2} name="입고" key="incoming-line" />
              <Line type="monotone" dataKey="outgoing" stroke="#ef4444" strokeWidth={2} name="출고" key="outgoing-line" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Low stock alerts */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">재고 부족 알림</h3>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            <AlertTriangle className="w-4 h-4" />
            {lowStockItems.length}개 품목 긴급
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">품목명</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">현재 재고</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">최소 재고</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">상태</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">창고</th>
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{item.item}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-red-600 font-semibold">{item.current}</span>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">{item.minimum}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block px-3 py-1 text-xs rounded-full ${
                      item.status === "긴급" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{item.warehouse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expiring items */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">유통기한 임박 품목</h3>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
            <Calendar className="w-4 h-4" />
            7일 이내 {expiringItems.length}개
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">품목명</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">수량</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">유통기한</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">남은 일수</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">창고</th>
              </tr>
            </thead>
            <tbody>
              {expiringItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{item.item}</td>
                  <td className="py-3 px-4 text-right text-gray-600">{item.quantity}</td>
                  <td className="py-3 px-4 text-center text-gray-900">{item.expiryDate}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${
                      item.daysLeft <= 2 ? "bg-red-100 text-red-700" :
                      item.daysLeft <= 4 ? "bg-orange-100 text-orange-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {item.daysLeft}일
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{item.warehouse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}