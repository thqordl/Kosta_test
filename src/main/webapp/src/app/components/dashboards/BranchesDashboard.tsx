import { useMemo } from "react";
import { 
  Store, 
  TrendingUp, 
  Users, 
  AlertTriangle,
  CheckCircle2,
  MapPin
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
    name: "총 직영점 수",
    value: "24개",
    change: "+2개",
    trend: "up",
    icon: Store,
    color: "blue",
  },
  {
    id: "st2",
    name: "영업 중인 지점",
    value: "23개",
    change: "정상 운영",
    trend: "up",
    icon: CheckCircle2,
    color: "green",
  },
  {
    id: "st3",
    name: "이슈 발생 지점",
    value: "1개",
    change: "재고 부족",
    trend: "down",
    icon: AlertTriangle,
    color: "yellow",
  },
  {
    id: "st4",
    name: "평균 직원 수",
    value: "13.5명",
    change: "+1.2명",
    trend: "up",
    icon: Users,
    color: "purple",
  },
];

const branchSalesData = [
  { id: "bs1", branch: "강남점", sales: 125000000, orders: 1234 },
  { id: "bs2", branch: "홍대점", sales: 118000000, orders: 1156 },
  { id: "bs3", branch: "잠실점", sales: 112000000, orders: 1089 },
  { id: "bs4", branch: "판교��", sales: 108000000, orders: 1045 },
  { id: "bs5", branch: "여의도점", sales: 95000000, orders: 923 },
  { id: "bs6", branch: "신촌점", sales: 87000000, orders: 845 },
];

const regionData = [
  { id: "rg1", name: "서울 강남권", value: 35, branches: 8 },
  { id: "rg2", name: "서울 강북권", value: 25, branches: 6 },
  { id: "rg3", name: "경기권", value: 20, branches: 5 },
  { id: "rg4", name: "부산/경남", value: 12, branches: 3 },
  { id: "rg5", name: "기타 지역", value: 8, branches: 2 },
];

const monthlyTrendData = [
  { id: "mt1", month: "1월", totalSales: 2100000000, avgPerBranch: 87500000 },
  { id: "mt2", month: "2월", totalSales: 2250000000, avgPerBranch: 93750000 },
  { id: "mt3", month: "3월", totalSales: 2450000000, avgPerBranch: 102083333 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"];

export function BranchesDashboard() {
  const branchChartData = useMemo(() => branchSalesData, []);
  const regionChartData = useMemo(() => regionData, []);
  const trendChartData = useMemo(() => monthlyTrendData, []);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">직영점 통합 관리 대시보드</h2>
        <p className="text-gray-500 mt-1">전국 직영점의 실��간 운영 현황을 확인하세요</p>
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
        {/* Branch sales ranking */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">지점별 매출 순위</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={branchChartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="branch" type="category" width={80} />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#3b82f6" name="매출 (원)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Region distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">지역별 분포</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={regionChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} (${value}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {regionChartData.map((entry, index) => (
                  <Cell key={`cell-${entry.id}-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">월별 전사 매출 추이</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalSales" stroke="#3b82f6" name="전사 총 매출" strokeWidth={2} />
              <Line type="monotone" dataKey="avgPerBranch" stroke="#10b981" name="지점 평균 매출" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Branch list */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">지점 현황 목록</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">순위</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">지점명</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">매출액</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">주문 건수</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">상태</th>
              </tr>
            </thead>
            <tbody>
              {branchSalesData.map((branch, index) => (
                <tr key={branch.id} className="border-b border-gray-100 hover:bg-gray-50">
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
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{branch.branch}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">
                    ₩{branch.sales.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {branch.orders.toLocaleString()}건
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      정상
                    </span>
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