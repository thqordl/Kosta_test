import { useState } from "react";
import { Calendar, Filter, Download, TrendingUp, Store, Clock, Menu as MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card } from "../ui/card";
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

const branches = [
  { id: "all", name: "전체 지점" },
  { id: "gangnam", name: "강남지점" },
  { id: "seocho", name: "서초지점" },
  { id: "songpa", name: "송파지점" },
  { id: "jongno", name: "종로지점" },
  { id: "mapo", name: "마포지점" },
];

const menus = [
  { id: "all", name: "전체 메뉴" },
  { id: "burger1", name: "시그니처 버거" },
  { id: "burger2", name: "치즈 버거" },
  { id: "chicken1", name: "치킨 샌드위치" },
  { id: "side1", name: "감자튀김 세트" },
  { id: "drink1", name: "아이스 아메리카노" },
];

// 지점별 매출 데이터
const branchSalesData = [
  { id: "b1", branch: "강남지점", sales: 45600000, orders: 1245, avgOrder: 36627 },
  { id: "b2", branch: "서초지점", sales: 38900000, orders: 1087, avgOrder: 35793 },
  { id: "b3", branch: "송파지점", sales: 42300000, orders: 1156, avgOrder: 36591 },
  { id: "b4", branch: "종로지점", sales: 35200000, orders: 978, avgOrder: 35991 },
  { id: "b5", branch: "마포지점", sales: 39800000, orders: 1098, avgOrder: 36248 },
];

// 기간별 매출 데이터
const periodSalesData = [
  { id: "p1", period: "1주차", sales: 38500000, orders: 1045 },
  { id: "p2", period: "2주차", sales: 41200000, orders: 1123 },
  { id: "p3", period: "3주차", sales: 39800000, orders: 1087 },
  { id: "p4", period: "4주차", sales: 42100000, orders: 1156 },
];

// 메뉴별 매출 데이터
const menuSalesData = [
  { id: "m1", name: "시그니처 버거", sales: 48500000, percentage: 31 },
  { id: "m2", name: "치킨 샌드위치", sales: 32400000, percentage: 21 },
  { id: "m3", name: "감자튀김 세트", sales: 28600000, percentage: 18 },
  { id: "m4", name: "아이스 아메리카노", sales: 24800000, percentage: 16 },
  { id: "m5", name: "콤보 세트", sales: 21500000, percentage: 14 },
];

// 시간대별 매출 데이터
const hourlySalesData = [
  { id: "h1", time: "06-09시", sales: 4200000, orders: 145 },
  { id: "h2", time: "09-12시", sales: 12800000, orders: 378 },
  { id: "h3", time: "12-15시", sales: 28500000, orders: 756 },
  { id: "h4", time: "15-18시", sales: 16700000, orders: 445 },
  { id: "h5", time: "18-21시", sales: 24300000, orders: 623 },
  { id: "h6", time: "21-24시", sales: 9200000, orders: 234 },
];

// 날짜별 매출 데이터
const dailySalesData = [
  { id: "d1", date: "3/22", sales: 15200000, orders: 412 },
  { id: "d2", date: "3/23", sales: 16800000, orders: 445 },
  { id: "d3", date: "3/24", sales: 15900000, orders: 428 },
  { id: "d4", date: "3/25", sales: 17500000, orders: 467 },
  { id: "d5", date: "3/26", sales: 18200000, orders: 489 },
  { id: "d6", date: "3/27", sales: 16900000, orders: 451 },
  { id: "d7", date: "3/28", sales: 17100000, orders: 458 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

type ViewType = "period" | "branch" | "menu" | "hourly" | "daily";

export function SalesDetail() {
  const [viewType, setViewType] = useState<ViewType>("period");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedMenu, setSelectedMenu] = useState("all");
  const [dateRange, setDateRange] = useState("month");

  const renderChart = () => {
    switch (viewType) {
      case "period":
        return (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">기간별 매출 추이</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={periodSalesData}>
                <CartesianGrid key="grid-period" strokeDasharray="3 3" />
                <XAxis key="xaxis-period" dataKey="period" />
                <YAxis key="yaxis-period" />
                <Tooltip key="tooltip-period" formatter={(value: number) => `₩${value.toLocaleString()}`} />
                <Legend key="legend-period" />
                <Line key="line-period-sales" type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} name="매출액" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        );

      case "branch":
        return (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">지점별 매출 현황</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={branchSalesData}>
                <CartesianGrid key="grid-branch" strokeDasharray="3 3" />
                <XAxis key="xaxis-branch" dataKey="branch" />
                <YAxis key="yaxis-branch" />
                <Tooltip key="tooltip-branch" formatter={(value: number) => `₩${value.toLocaleString()}`} />
                <Legend key="legend-branch" />
                <Bar key="bar-branch-sales" dataKey="sales" fill="#10b981" name="매출액" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold">지점명</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold">총 매출</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold">주문 건수</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold">평균 주문액</th>
                  </tr>
                </thead>
                <tbody>
                  {branchSalesData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{item.branch}</td>
                      <td className="py-3 px-4 text-right font-semibold">₩{item.sales.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">{item.orders.toLocaleString()}건</td>
                      <td className="py-3 px-4 text-right">₩{item.avgOrder.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        );

      case "menu":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">메뉴별 매출 비중</h3>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    key="pie-menu"
                    data={menuSalesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} (${percentage}%)`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="sales"
                  >
                    {menuSalesData.map((entry, index) => (
                      <Cell key={`cell-${entry.id}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip key="tooltip-menu" formatter={(value: number) => `₩${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">메뉴별 매출 상세</h3>
              <div className="space-y-4 mt-8">
                {menuSalesData.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{item.name}</span>
                      <span className="font-semibold">₩{item.sales.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );

      case "hourly":
        return (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">시간대별 매출 분석</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={hourlySalesData}>
                <CartesianGrid key="grid-hourly" strokeDasharray="3 3" />
                <XAxis key="xaxis-hourly" dataKey="time" />
                <YAxis key="yaxis-hourly" />
                <Tooltip key="tooltip-hourly" formatter={(value: number) => `₩${value.toLocaleString()}`} />
                <Legend key="legend-hourly" />
                <Bar key="bar-hourly-sales" dataKey="sales" fill="#f59e0b" name="매출액" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
              {hourlySalesData.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-500">{item.time}</div>
                  <div className="text-xl font-bold mt-1">₩{(item.sales / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-gray-600 mt-1">{item.orders}건</div>
                </div>
              ))}
            </div>
          </Card>
        );

      case "daily":
        return (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">날짜별 매출 추이</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={dailySalesData}>
                <CartesianGrid key="grid-daily" strokeDasharray="3 3" />
                <XAxis key="xaxis-daily" dataKey="date" />
                <YAxis key="yaxis-daily" />
                <Tooltip key="tooltip-daily" formatter={(value: number) => `₩${value.toLocaleString()}`} />
                <Legend key="legend-daily" />
                <Line key="line-daily-sales" type="monotone" dataKey="sales" stroke="#8b5cf6" strokeWidth={3} name="매출액" />
                <Line key="line-daily-orders" type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} name="주문 건수" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">매출 상세 조회</h2>
        <p className="text-gray-500 mt-1">다양한 조건으로 매출을 상세하게 분석하세요</p>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* View Type */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">조회 유형</label>
            <Select value={viewType} onValueChange={(value) => setViewType(value as ViewType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="period">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>기간별</span>
                  </div>
                </SelectItem>
                <SelectItem value="branch">
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4" />
                    <span>지점별</span>
                  </div>
                </SelectItem>
                <SelectItem value="menu">
                  <div className="flex items-center gap-2">
                    <MenuIcon className="w-4 h-4" />
                    <span>메뉴별</span>
                  </div>
                </SelectItem>
                <SelectItem value="hourly">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>시간대별</span>
                  </div>
                </SelectItem>
                <SelectItem value="daily">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>날짜별</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">기간</label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">오늘</SelectItem>
                <SelectItem value="week">이번 주</SelectItem>
                <SelectItem value="month">이번 달</SelectItem>
                <SelectItem value="quarter">이번 분기</SelectItem>
                <SelectItem value="year">올해</SelectItem>
                <SelectItem value="custom">직접 선택</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Branch Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">지점</label>
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Menu Filter */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">메뉴</label>
            <Select value={selectedMenu} onValueChange={setSelectedMenu}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {menus.map((menu) => (
                  <SelectItem key={menu.id} value={menu.id}>
                    {menu.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <Button className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            필터 적용
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            엑셀 다운로드
          </Button>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="text-sm text-gray-500">총 매출</div>
          <div className="text-2xl font-bold mt-1">₩156,700,000</div>
          <div className="text-sm text-green-600 mt-1">▲ 12.3%</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-500">총 주문 건수</div>
          <div className="text-2xl font-bold mt-1">4,264건</div>
          <div className="text-sm text-green-600 mt-1">▲ 8.7%</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-500">평균 주문액</div>
          <div className="text-2xl font-bold mt-1">₩36,750</div>
          <div className="text-sm text-green-600 mt-1">▲ 3.2%</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-gray-500">활성 지점 수</div>
          <div className="text-2xl font-bold mt-1">5개</div>
          <div className="text-sm text-gray-600 mt-1">전체 지점</div>
        </Card>
      </div>

      {/* Charts */}
      {renderChart()}
    </div>
  );
}