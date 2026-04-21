import { useMemo } from "react";
import { 
  Truck, 
  Package,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RotateCcw
} from "lucide-react";
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
    id: "st1",
    name: "배송 중",
    value: "42건",
    change: "실시간 트래킹",
    trend: "up",
    icon: Truck,
    color: "blue",
  },
  {
    id: "st2",
    name: "배송 완료",
    value: "156건",
    change: "이번 주",
    trend: "up",
    icon: CheckCircle2,
    color: "green",
  },
  {
    id: "st3",
    name: "배송 지연",
    value: "3건",
    change: "조치 필요",
    trend: "warning",
    icon: AlertTriangle,
    color: "yellow",
  },
  {
    id: "st4",
    name: "반품 처리",
    value: "8건",
    change: "이번 주",
    trend: "down",
    icon: RotateCcw,
    color: "red",
  },
];

const dailyDeliveryData = [
  { id: "dd1", date: "3/21", completed: 28, delayed: 2, inProgress: 8 },
  { id: "dd2", date: "3/22", completed: 32, delayed: 1, inProgress: 6 },
  { id: "dd3", date: "3/23", completed: 25, delayed: 0, inProgress: 5 },
  { id: "dd4", date: "3/24", completed: 30, delayed: 3, inProgress: 7 },
  { id: "dd5", date: "3/25", completed: 27, delayed: 1, inProgress: 9 },
  { id: "dd6", date: "3/26", completed: 14, delayed: 2, inProgress: 4 },
  { id: "dd7", date: "3/27", completed: 0, delayed: 0, inProgress: 42 },
];

const deliveryStatusData = [
  { id: "ds1", name: "배송 완료", value: 65, count: 156 },
  { id: "ds2", name: "배송 중", value: 20, count: 42 },
  { id: "ds3", name: "배송 준비", value: 10, count: 18 },
  { id: "ds4", name: "반품", value: 3, count: 8 },
  { id: "ds5", name: "지연", value: 2, count: 3 },
];

const regionDeliveryData = [
  { id: "rd1", region: "서울", onTime: 95, delayed: 5, avgTime: "2.3시간" },
  { id: "rd2", region: "경기", onTime: 92, delayed: 8, avgTime: "3.1시간" },
  { id: "rd3", region: "인천", onTime: 88, delayed: 12, avgTime: "3.5시간" },
  { id: "rd4", region: "부산", onTime: 85, delayed: 15, avgTime: "4.2시간" },
  { id: "rd5", region: "기타", onTime: 80, delayed: 20, avgTime: "5.1시간" },
];

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

const activeDeliveries = [
  { 
    id: "ad1", 
    trackingNo: "DL-2026-0327-001", 
    branch: "강남점", 
    items: "햄버거 패티 외 5품목", 
    status: "배송 중",
    driver: "김배송",
    eta: "30분",
    progress: 75
  },
  { 
    id: "ad2", 
    trackingNo: "DL-2026-0327-002", 
    branch: "홍대점", 
    items: "음료 원재료 외 3품목", 
    status: "배송 중",
    driver: "이운송",
    eta: "45분",
    progress: 60
  },
  { 
    id: "ad3", 
    trackingNo: "DL-2026-0327-003", 
    branch: "잠실점", 
    items: "포장재 외 8품목", 
    status: "지연",
    driver: "박택배",
    eta: "1시간 30분",
    progress: 40
  },
  { 
    id: "ad4", 
    trackingNo: "DL-2026-0327-004", 
    branch: "판교점", 
    items: "식자재 외 12품목", 
    status: "배송 중",
    driver: "최물류",
    eta: "1시간",
    progress: 50
  },
  { 
    id: "ad5", 
    trackingNo: "DL-2026-0327-005", 
    branch: "여의도점", 
    items: "소모품 외 4품목", 
    status: "배송 준비",
    driver: "정배달",
    eta: "2시간",
    progress: 20
  },
];

export function DeliveryDashboard() {
  const dailyChartData = useMemo(() => dailyDeliveryData, []);
  const statusChartData = useMemo(() => deliveryStatusData, []);
  const regionChartData = useMemo(() => regionDeliveryData, []);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">배송 관리 대시보드</h2>
        <p className="text-gray-500 mt-1">실시간 배송 상태와 물류 현황을 확인하세요</p>
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
        {/* Daily delivery status */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">일별 배송 현황</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyChartData}>
              <CartesianGrid key="grid-daily-delivery" strokeDasharray="3 3" />
              <XAxis key="xaxis-daily-delivery" dataKey="date" />
              <YAxis key="yaxis-daily-delivery" />
              <Tooltip key="tooltip-daily-delivery" />
              <Legend key="legend-daily-delivery" />
              <Bar key="bar-completed" dataKey="completed" fill="#10b981" name="완료" />
              <Bar key="bar-inProgress" dataKey="inProgress" fill="#3b82f6" name="배송 중" />
              <Bar key="bar-delayed" dataKey="delayed" fill="#ef4444" name="지연" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Delivery status distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">배송 상태 분포</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                key="pie-status"
                data={statusChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} (${value}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusChartData.map((entry, index) => (
                  <Cell key={`cell-${entry.id}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip key="tooltip-pie" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Region delivery performance */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">지역별 배송 성과</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionChartData}>
              <CartesianGrid key="grid-region" strokeDasharray="3 3" />
              <XAxis key="xaxis-region" dataKey="region" />
              <YAxis key="yaxis-region" />
              <Tooltip key="tooltip-region" />
              <Legend key="legend-region" />
              <Bar key="bar-onTime" dataKey="onTime" fill="#10b981" name="정시 배송률 (%)" />
              <Bar key="bar-delayed-region" dataKey="delayed" fill="#ef4444" name="지연률 (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active deliveries */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">실시간 배송 트래킹</h3>
        <div className="space-y-4">
          {activeDeliveries.map((delivery) => (
            <div key={delivery.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-gray-900">{delivery.trackingNo}</span>
                    <span className={`inline-block px-3 py-1 text-xs rounded-full ${
                      delivery.status === "배송 완료" ? "bg-green-100 text-green-700" :
                      delivery.status === "배송 중" ? "bg-blue-100 text-blue-700" :
                      delivery.status === "지연" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {delivery.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">배송지</p>
                      <p className="font-medium text-gray-900">{delivery.branch}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">품목</p>
                      <p className="font-medium text-gray-900">{delivery.items}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">배송기사</p>
                      <p className="font-medium text-gray-900">{delivery.driver}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">도착 예정</p>
                      <p className="font-medium text-gray-900">{delivery.eta}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">배송 진행률</span>
                  <span className="font-medium text-gray-900">{delivery.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      delivery.status === "지연" ? "bg-red-500" : "bg-blue-600"
                    }`}
                    style={{ width: `${delivery.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Region performance table */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">지역별 배송 상세</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">지역</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">정시 배송률</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">지연률</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">평균 배송 시간</th>
              </tr>
            </thead>
            <tbody>
              {regionDeliveryData.map((region) => (
                <tr key={region.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{region.region}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-green-600 font-semibold">{region.onTime}%</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-red-600 font-semibold">{region.delayed}%</span>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-900 font-medium">{region.avgTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}