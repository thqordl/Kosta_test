import { useState } from "react";
import { Search, Plus, Download, Eye } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  date: string;
  amount: number;
  status: "완료" | "처리중" | "대기" | "취소";
  items: number;
}

const orders: Order[] = [
  { id: "1", orderNumber: "ORD-001", customer: "주식회사 ABC", date: "2026-03-26", amount: 12500000, status: "완료", items: 5 },
  { id: "2", orderNumber: "ORD-002", customer: "디지털 코리아", date: "2026-03-26", amount: 8300000, status: "처리중", items: 3 },
  { id: "3", orderNumber: "ORD-003", customer: "글로벌 트레이드", date: "2026-03-25", amount: 15700000, status: "완료", items: 8 },
  { id: "4", orderNumber: "ORD-004", customer: "테크 솔루션", date: "2026-03-25", amount: 6200000, status: "대기", items: 2 },
  { id: "5", orderNumber: "ORD-005", customer: "비즈니스 파트너스", date: "2026-03-24", amount: 9800000, status: "완료", items: 4 },
  { id: "6", orderNumber: "ORD-006", customer: "이노베이션 랩", date: "2026-03-24", amount: 11200000, status: "처리중", items: 6 },
  { id: "7", orderNumber: "ORD-007", customer: "스마트 시스템즈", date: "2026-03-23", amount: 7500000, status: "완료", items: 3 },
  { id: "8", orderNumber: "ORD-008", customer: "엔터프라이즈 솔루션", date: "2026-03-23", amount: 3400000, status: "취소", items: 2 },
];

const salesTrend = [
  { date: "3/20", sales: 42000000 },
  { date: "3/21", sales: 38000000 },
  { date: "3/22", sales: 45000000 },
  { date: "3/23", sales: 51000000 },
  { date: "3/24", sales: 48000000 },
  { date: "3/25", sales: 55000000 },
  { date: "3/26", sales: 62000000 },
];

export function Sales() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("전체");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "전체" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalSales = orders.reduce((sum, order) => sum + order.amount, 0);
  const completedOrders = orders.filter(order => order.status === "완료").length;
  const pendingOrders = orders.filter(order => order.status === "처리중" || order.status === "대기").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">영업관리</h2>
          <p className="text-gray-500 mt-1">주문과 판매 현황을 관리하세요</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          새 주문
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">총 매출</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₩{(totalSales / 1000000).toFixed(1)}M</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">완료된 주문</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{completedOrders}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">진행중인 주문</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{pendingOrders}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Sales trend chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 7일 매출 추이</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={salesTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value: number) => `₩${value.toLocaleString()}`} />
            <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} name="매출" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="주문번호 또는 고객명으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {["전체", "완료", "처리중", "대기", "취소"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  statusFilter === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">주문번호</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">고객</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">품목</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">금액</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{order.orderNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.items}개
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₩{order.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      order.status === "완료"
                        ? "bg-green-100 text-green-700"
                        : order.status === "처리중"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "대기"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      상세보기
                    </button>
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
