import { useState, useMemo } from "react";
import { Calendar, DollarSign, ShoppingCart, TrendingUp, Download } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar as CalendarComponent } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

type ViewType = "daily" | "monthly" | "yearly";

// Mock data for different views
const dailyData = [
  { id: "d1", date: "2026-03-01", sales: 4800000, orders: 45, avgOrder: 106667 },
  { id: "d2", date: "2026-03-02", sales: 5100000, orders: 48, avgOrder: 106250 },
  { id: "d3", date: "2026-03-03", sales: 4950000, orders: 46, avgOrder: 107609 },
  { id: "d4", date: "2026-03-04", sales: 5300000, orders: 52, avgOrder: 101923 },
  { id: "d5", date: "2026-03-05", sales: 5650000, orders: 54, avgOrder: 104630 },
  { id: "d6", date: "2026-03-06", sales: 5400000, orders: 51, avgOrder: 105882 },
  { id: "d7", date: "2026-03-07", sales: 5240000, orders: 49, avgOrder: 106939 },
  { id: "d8", date: "2026-03-08", sales: 5100000, orders: 47, avgOrder: 108511 },
  { id: "d9", date: "2026-03-09", sales: 5450000, orders: 53, avgOrder: 102830 },
  { id: "d10", date: "2026-03-10", sales: 5680000, orders: 55, avgOrder: 103273 },
];

const monthlyData = [
  { id: "m1", date: "2025-09", sales: 142000000, orders: 1345, avgOrder: 105576 },
  { id: "m2", date: "2025-10", sales: 148000000, orders: 1398, avgOrder: 105865 },
  { id: "m3", date: "2025-11", sales: 151000000, orders: 1412, avgOrder: 106934 },
  { id: "m4", date: "2025-12", sales: 156000000, orders: 1456, avgOrder: 107143 },
  { id: "m5", date: "2026-01", sales: 152000000, orders: 1423, avgOrder: 106817 },
  { id: "m6", date: "2026-02", sales: 147000000, orders: 1389, avgOrder: 105830 },
  { id: "m7", date: "2026-03", sales: 156500000, orders: 1456, avgOrder: 107491 },
];

const yearlyData = [
  { id: "y1", date: "2022", sales: 1580000000, orders: 14856, avgOrder: 106350 },
  { id: "y2", date: "2023", sales: 1680000000, orders: 15734, avgOrder: 106764 },
  { id: "y3", date: "2024", sales: 1750000000, orders: 16342, avgOrder: 107089 },
  { id: "y4", date: "2025", sales: 1820000000, orders: 17045, avgOrder: 106759 },
  { id: "y5", date: "2026", sales: 456000000, orders: 4268, avgOrder: 106842 }, // 현재까지
];

const hourlyData = [
  { id: "h1", hour: "00시", sales: 45000, orders: 2 },
  { id: "h2", hour: "01시", sales: 32000, orders: 1 },
  { id: "h3", hour: "06시", sales: 125000, orders: 5 },
  { id: "h4", hour: "07시", sales: 280000, orders: 12 },
  { id: "h5", hour: "08시", sales: 450000, orders: 18 },
  { id: "h6", hour: "09시", sales: 620000, orders: 24 },
  { id: "h7", hour: "10시", sales: 580000, orders: 22 },
  { id: "h8", hour: "11시", sales: 720000, orders: 28 },
  { id: "h9", hour: "12시", sales: 1250000, orders: 48 },
  { id: "h10", hour: "13시", sales: 1180000, orders: 45 },
  { id: "h11", hour: "14시", sales: 890000, orders: 34 },
  { id: "h12", hour: "15시", sales: 620000, orders: 24 },
  { id: "h13", hour: "16시", sales: 530000, orders: 20 },
  { id: "h14", hour: "17시", sales: 680000, orders: 26 },
  { id: "h15", hour: "18시", sales: 950000, orders: 36 },
  { id: "h16", hour: "19시", sales: 1120000, orders: 42 },
  { id: "h17", hour: "20시", sales: 980000, orders: 38 },
  { id: "h18", hour: "21시", sales: 720000, orders: 28 },
  { id: "h19", hour: "22시", sales: 450000, orders: 17 },
  { id: "h20", hour: "23시", sales: 280000, orders: 11 },
];

export function SalesInquiry() {
  const [viewType, setViewType] = useState<ViewType>("daily");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(2026, 2, 1));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(2026, 2, 10));

  const chartData = useMemo(() => {
    switch (viewType) {
      case "daily":
        return dailyData;
      case "monthly":
        return monthlyData;
      case "yearly":
        return yearlyData;
      default:
        return dailyData;
    }
  }, [viewType]);

  const totalSales = chartData.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = chartData.reduce((sum, item) => sum + item.orders, 0);
  const avgOrderValue = totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0;

  const formatXAxis = (value: string) => {
    if (viewType === "daily") {
      return value.split("-")[2] + "일";
    } else if (viewType === "monthly") {
      return value.split("-")[1] + "월";
    } else {
      return value + "년";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">매출 조회</h2>
        <p className="text-gray-500 mt-1">기간별 매출 합계 및 상세 분석</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* View type selector */}
          <div className="flex gap-2">
            <span className="text-sm font-medium text-gray-700 flex items-center">조회 단위:</span>
            {[
              { value: "daily", label: "일별" },
              { value: "monthly", label: "월별" },
              { value: "yearly", label: "연별" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setViewType(option.value as ViewType)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewType === option.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Date range picker */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP", { locale: ko }) : <span>시작일</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <span className="text-gray-500">~</span>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP", { locale: ko }) : <span>종료일</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700">
              조회
            </Button>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-900">₩{totalSales.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">총 매출</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-900">{totalOrders.toLocaleString()}건</p>
            <p className="text-sm text-gray-500 mt-1">총 주문 건수</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-900">₩{avgOrderValue.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">평균 주문 금액</p>
          </div>
        </div>
      </div>

      {/* Main chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {viewType === "daily" ? "일별" : viewType === "monthly" ? "월별" : "연별"} 매출 추이
          </h3>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            내보내기
          </Button>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={formatXAxis} />
            <YAxis />
            <Tooltip
              formatter={(value: number, name: string) => {
                if (name === "매출 (원)") return `₩${value.toLocaleString()}`;
                if (name === "주문 건수") return `${value.toLocaleString()}건`;
                return value;
              }}
            />
            <Legend />
            <Bar dataKey="sales" fill="#3b82f6" name="매출 (원)" />
            <Bar dataKey="orders" fill="#10b981" name="주문 건수" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Time-based sales chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">시간대별 매출 현황 (오늘)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip
              formatter={(value: number, name: string) => {
                if (name === "매출 (원)") return `₩${value.toLocaleString()}`;
                if (name === "주문 건수") return `${value}건`;
                return value;
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#f59e0b" strokeWidth={2} name="매출 (원)" />
            <Line type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={2} name="주문 건수" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed data table */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">상세 내역</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                  {viewType === "daily" ? "날짜" : viewType === "monthly" ? "월" : "연도"}
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">매출액</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">주문 건수</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">평균 주문 금액</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">
                    {viewType === "daily"
                      ? format(new Date(item.date), "yyyy년 MM월 dd일")
                      : viewType === "monthly"
                      ? format(new Date(item.date + "-01"), "yyyy년 MM월")
                      : item.date + "년"}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">
                    ₩{item.sales.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {item.orders.toLocaleString()}건
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    ₩{item.avgOrder.toLocaleString()}
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
