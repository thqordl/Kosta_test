import { useMemo } from "react";
import { 
  Package, 
  Clock, 
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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
    id: "st1",
    name: "총 발주 요청",
    value: "48건",
    change: "이번 주",
    trend: "up",
    icon: Package,
    color: "blue",
  },
  {
    id: "st2",
    name: "승인 완료",
    value: "35건",
    change: "72.9%",
    trend: "up",
    icon: CheckCircle2,
    color: "green",
  },
  {
    id: "st3",
    name: "승인 대기",
    value: "8건",
    change: "처리 필요",
    trend: "warning",
    icon: Clock,
    color: "yellow",
  },
  {
    id: "st4",
    name: "반려",
    value: "5건",
    change: "10.4%",
    trend: "down",
    icon: XCircle,
    color: "red",
  },
];

const weeklyOrderData = [
  { id: "wo1", day: "월", requests: 8, approved: 6, rejected: 2 },
  { id: "wo2", day: "화", requests: 12, approved: 9, rejected: 3 },
  { id: "wo3", day: "수", requests: 6, approved: 5, rejected: 1 },
  { id: "wo4", day: "목", requests: 10, approved: 8, rejected: 2 },
  { id: "wo5", day: "금", requests: 9, approved: 7, rejected: 2 },
  { id: "wo6", day: "토", requests: 2, approved: 0, rejected: 0 },
  { id: "wo7", day: "일", requests: 1, approved: 0, rejected: 0 },
];

const categoryOrderData = [
  { id: "co1", name: "식자재", value: 45, count: 156 },
  { id: "co2", name: "포장재", value: 25, count: 87 },
  { id: "co3", name: "소모품", value: 15, count: 52 },
  { id: "co4", name: "음료 원재료", value: 10, count: 35 },
  { id: "co5", name: "기타", value: 5, count: 18 },
];

const topOrderedItems = [
  { id: "oi1", item: "치킨 스트립", quantity: "2,400kg", amount: "₩48,000,000", requests: 18 },
  { id: "oi2", item: "허니오트 빵", quantity: "15,000개", amount: "₩7,500,000", requests: 15 },
  { id: "oi3", item: "양상추", quantity: "1,800kg", amount: "₩9,000,000", requests: 14 },
  { id: "oi4", item: "아메리칸 치즈", quantity: "600kg", amount: "₩18,000,000", requests: 12 },
  { id: "oi5", item: "탄산음료", quantity: "500박스", amount: "₩7,500,000", requests: 10 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"];

const pendingRequests = [
  { id: "pr1", branch: "강남점", items: 8, amount: "₩15,600,000", requestDate: "2026-03-27", urgency: "긴급" },
  { id: "pr2", branch: "홍대점", items: 5, amount: "₩8,200,000", requestDate: "2026-03-26", urgency: "보통" },
  { id: "pr3", branch: "잠실점", items: 12, amount: "₩22,400,000", requestDate: "2026-03-26", urgency: "긴급" },
  { id: "pr4", branch: "판교점", items: 6, amount: "₩9,800,000", requestDate: "2026-03-25", urgency: "보통" },
  { id: "pr5", branch: "여의도점", items: 9, amount: "₩13,500,000", requestDate: "2026-03-25", urgency: "낮음" },
];

export function OrdersDashboard() {
  const weeklyChartData = useMemo(() => weeklyOrderData, []);
  const categoryChartData = useMemo(() => categoryOrderData, []);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">발주 관리 대시보드</h2>
        <p className="text-gray-500 mt-1">전체 지점의 발주 요청 및 승인 현황을 확인하세요</p>
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
        {/* Weekly order requests */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">주간 발주 요청 현황</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="approved" stackId="a" fill="#10b981" name="승인" />
              <Bar dataKey="rejected" stackId="a" fill="#ef4444" name="반려" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">품목 카테고리별 발주 비율</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} (${value}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryChartData.map((entry, index) => (
                  <Cell key={`cell-${entry.id}-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pending requests */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">승인 대기 중인 발주 요청</h3>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
            <AlertCircle className="w-4 h-4" />
            {pendingRequests.length}건 대기 중
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">지점명</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">품목 수</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">발주 금액</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">요청일</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">긴급도</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">처리</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.map((request) => (
                <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{request.branch}</td>
                  <td className="py-3 px-4 text-right text-gray-600">{request.items}개</td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">{request.amount}</td>
                  <td className="py-3 px-4 text-center text-gray-600">{request.requestDate}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block px-3 py-1 text-xs rounded-full ${
                      request.urgency === "긴급" ? "bg-red-100 text-red-700" :
                      request.urgency === "보통" ? "bg-yellow-100 text-yellow-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {request.urgency}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                        승인
                      </button>
                      <button className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300">
                        반려
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top ordered items */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">많이 발주된 품목 TOP 5</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">순위</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">품목명</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">총 수량</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">총 금액</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">요청 건수</th>
              </tr>
            </thead>
            <tbody>
              {topOrderedItems.map((item, index) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                      index === 0 ? "bg-yellow-100 text-yellow-700" :
                      index === 1 ? "bg-gray-100 text-gray-700" :
                      index === 2 ? "bg-orange-100 text-orange-700" :
                      "bg-blue-50 text-blue-700"
                    }`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900">{item.item}</td>
                  <td className="py-3 px-4 text-right text-gray-600">{item.quantity}</td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">{item.amount}</td>
                  <td className="py-3 px-4 text-right text-gray-600">{item.requests}건</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}