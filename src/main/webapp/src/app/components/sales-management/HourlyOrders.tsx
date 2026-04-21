import { useState } from "react";
import { Clock, TrendingUp, Calendar as CalendarIcon, AlertCircle, Download } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

// Mock hourly data
const hourlyOrdersData = [
  { id: "h1", hour: 0, time: "00시", orders: 2, sales: 45000, avgOrder: 22500, isPeak: false },
  { id: "h2", hour: 1, time: "01시", orders: 1, sales: 32000, avgOrder: 32000, isPeak: false },
  { id: "h3", hour: 2, time: "02시", orders: 0, sales: 0, avgOrder: 0, isPeak: false },
  { id: "h4", hour: 3, time: "03시", orders: 0, sales: 0, avgOrder: 0, isPeak: false },
  { id: "h5", hour: 4, time: "04시", orders: 0, sales: 0, avgOrder: 0, isPeak: false },
  { id: "h6", hour: 5, time: "05시", orders: 1, sales: 28000, avgOrder: 28000, isPeak: false },
  { id: "h7", hour: 6, time: "06시", orders: 5, sales: 125000, avgOrder: 25000, isPeak: false },
  { id: "h8", hour: 7, time: "07시", orders: 12, sales: 280000, avgOrder: 23333, isPeak: false },
  { id: "h9", hour: 8, time: "08시", orders: 18, sales: 450000, avgOrder: 25000, isPeak: false },
  { id: "h10", hour: 9, time: "09시", orders: 24, sales: 620000, avgOrder: 25833, isPeak: false },
  { id: "h11", hour: 10, time: "10시", orders: 22, sales: 580000, avgOrder: 26364, isPeak: false },
  { id: "h12", hour: 11, time: "11시", orders: 28, sales: 720000, avgOrder: 25714, isPeak: false },
  { id: "h13", hour: 12, time: "12시", orders: 48, sales: 1250000, avgOrder: 26042, isPeak: true },
  { id: "h14", hour: 13, time: "13시", orders: 45, sales: 1180000, avgOrder: 26222, isPeak: true },
  { id: "h15", hour: 14, time: "14시", orders: 34, sales: 890000, avgOrder: 26176, isPeak: false },
  { id: "h16", hour: 15, time: "15시", orders: 24, sales: 620000, avgOrder: 25833, isPeak: false },
  { id: "h17", hour: 16, time: "16시", orders: 20, sales: 530000, avgOrder: 26500, isPeak: false },
  { id: "h18", hour: 17, time: "17시", orders: 26, sales: 680000, avgOrder: 26154, isPeak: false },
  { id: "h19", hour: 18, time: "18시", orders: 36, sales: 950000, avgOrder: 26389, isPeak: false },
  { id: "h20", hour: 19, time: "19시", orders: 42, sales: 1120000, avgOrder: 26667, isPeak: true },
  { id: "h21", hour: 20, time: "20시", orders: 38, sales: 980000, avgOrder: 25789, isPeak: false },
  { id: "h22", hour: 21, time: "21시", orders: 28, sales: 720000, avgOrder: 25714, isPeak: false },
  { id: "h23", hour: 22, time: "22시", orders: 17, sales: 450000, avgOrder: 26471, isPeak: false },
  { id: "h24", hour: 23, time: "23시", orders: 11, sales: 280000, avgOrder: 25455, isPeak: false },
];

// Calculate peak times (top 3 hours by order count)
const sortedByOrders = [...hourlyOrdersData].sort((a, b) => b.orders - a.orders);
const peakHours = sortedByOrders.slice(0, 3).map((item) => item.hour);
const enhancedData = hourlyOrdersData.map((item) => ({
  ...item,
  isPeak: peakHours.includes(item.hour),
}));

export function HourlyOrders() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2026, 2, 27));

  const totalOrders = enhancedData.reduce((sum, item) => sum + item.orders, 0);
  const totalSales = enhancedData.reduce((sum, item) => sum + item.sales, 0);
  const avgOrderValue = totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0;

  const peakTimeSlots = enhancedData
    .filter((item) => item.isPeak)
    .sort((a, b) => b.orders - a.orders);

  const maxOrders = Math.max(...enhancedData.map((item) => item.orders));
  const threshold = maxOrders * 0.7; // 피크 타임 임계값

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">시간대별 주문 현황</h2>
        <p className="text-gray-500 mt-1">1시간 단위 주문 건수 및 피크 타임 분석</p>
      </div>

      {/* Date selector */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">조회 날짜:</span>
          </div>
          <div className="flex items-center gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal w-64">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP", { locale: ko }) : <span>날짜 선택</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
              </PopoverContent>
            </Popover>
            <Button className="bg-blue-600 hover:bg-blue-700">조회</Button>
          </div>
        </div>
      </div>

      {/* Peak time alert */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-orange-900">피크 타임 시간대</h4>
            <p className="text-sm text-orange-700 mt-1">
              주문이 가장 많은 시간대:{" "}
              {peakTimeSlots.map((slot, index) => (
                <span key={slot.id}>
                  <strong>{slot.time}</strong> ({slot.orders}건)
                  {index < peakTimeSlots.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <p className="text-xs text-orange-600 mt-2">
              💡 피크 타임에는 직원 배치를 늘리고 재고를 충분히 준비하세요.
            </p>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
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
            <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-900">₩{totalSales.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">총 매출액</p>
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

      {/* Hourly orders chart with peak highlighting */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">시간대별 주문 건수</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">일반</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-sm text-gray-600">피크 타임</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={enhancedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip
              formatter={(value: number, name: string) => {
                if (name === "주문 건수") return `${value}건`;
                return value;
              }}
            />
            <Legend />
            <Bar dataKey="orders" name="주문 건수">
              {enhancedData.map((entry) => (
                <Cell key={entry.id} fill={entry.isPeak ? "#f97316" : "#3b82f6"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Sales by hour chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">시간대별 매출액</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={enhancedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip
              formatter={(value: number, name: string) => {
                if (name === "매출 (원)") return `₩${value.toLocaleString()}`;
                return value;
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2} name="매출 (원)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed hourly table */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">시간대별 상세 내역</h3>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            엑셀 다운로드
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">시간대</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">주문 건수</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">매출액</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">평균 주문 금액</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">상태</th>
              </tr>
            </thead>
            <tbody>
              {enhancedData.map((item) => (
                <tr
                  key={item.id}
                  className={`border-b border-gray-100 ${
                    item.isPeak ? "bg-orange-50" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="py-3 px-4 font-medium text-gray-900">{item.time}</td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">
                    {item.orders.toLocaleString()}건
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    ₩{item.sales.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {item.avgOrder > 0 ? `₩${item.avgOrder.toLocaleString()}` : "-"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {item.isPeak ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        🔥 피크 타임
                      </span>
                    ) : item.orders >= threshold ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        바쁨
                      </span>
                    ) : item.orders > 0 ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        보통
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        조용함
                      </span>
                    )}
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
