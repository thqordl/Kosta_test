import { useState } from "react";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Eye,
  X,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface OrderRequest {
  id: string;
  orderNumber: string;
  branch: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  itemCount: number;
  totalQty: number;
}

const mockOrderRequests: OrderRequest[] = [
  {
    id: "1",
    orderNumber: "PO-2026-0329-001",
    branch: "강남점",
    date: "2026-03-29 10:30",
    status: "pending",
    itemCount: 4,
    totalQty: 185,
  },
  {
    id: "2",
    orderNumber: "PO-2026-0329-002",
    branch: "홍대점",
    date: "2026-03-29 09:15",
    status: "pending",
    itemCount: 3,
    totalQty: 120,
  },
  {
    id: "3",
    orderNumber: "PO-2026-0329-003",
    branch: "신촌점",
    date: "2026-03-29 08:45",
    status: "pending",
    itemCount: 5,
    totalQty: 210,
  },
  {
    id: "4",
    orderNumber: "PO-2026-0328-001",
    branch: "강남점",
    date: "2026-03-28 14:20",
    status: "approved",
    itemCount: 5,
    totalQty: 250,
  },
  {
    id: "5",
    orderNumber: "PO-2026-0328-002",
    branch: "이대점",
    date: "2026-03-28 11:30",
    status: "approved",
    itemCount: 4,
    totalQty: 180,
  },
  {
    id: "6",
    orderNumber: "PO-2026-0327-001",
    branch: "홍대점",
    date: "2026-03-27 16:45",
    status: "approved",
    itemCount: 6,
    totalQty: 310,
  },
  {
    id: "7",
    orderNumber: "PO-2026-0327-002",
    branch: "신촌점",
    date: "2026-03-27 11:00",
    status: "rejected",
    itemCount: 4,
    totalQty: 180,
  },
];

interface OrderItem {
  itemName: string;
  requestedQty: number;
  unit: string;
  currentStock: number;
  safetyStock: number;
}

const mockOrderItems: Record<string, OrderItem[]> = {
  "1": [
    {
      itemName: "소고기 패티",
      requestedQty: 55,
      unit: "개",
      currentStock: 45,
      safetyStock: 50,
    },
    {
      itemName: "감자",
      requestedQty: 85,
      unit: "kg",
      currentStock: 15,
      safetyStock: 50,
    },
    {
      itemName: "생크림",
      requestedQty: 18,
      unit: "L",
      currentStock: 12,
      safetyStock: 15,
    },
    {
      itemName: "양상추",
      requestedQty: 27,
      unit: "kg",
      currentStock: 8,
      safetyStock: 20,
    },
  ],
};

// Top 5 items by order volume
const allOrderedItems = [
  { itemName: "버거빵", totalQty: 650, unit: "개" },
  { itemName: "소고기 패티", totalQty: 450, unit: "개" },
  { itemName: "감자", totalQty: 380, unit: "kg" },
  { itemName: "양상추", totalQty: 210, unit: "kg" },
  { itemName: "체다치즈", totalQty: 180, unit: "장" },
  { itemName: "생크림", totalQty: 120, unit: "L" },
  { itemName: "식용유", totalQty: 95, unit: "L" },
  { itemName: "토마토", totalQty: 87, unit: "kg" },
  { itemName: "양파", totalQty: 75, unit: "kg" },
  { itemName: "피클", totalQty: 68, unit: "kg" },
  { itemName: "케챱", totalQty: 56, unit: "병" },
  { itemName: "머스타드", totalQty: 45, unit: "병" },
  { itemName: "마요네즈", totalQty: 42, unit: "병" },
  { itemName: "베이컨", totalQty: 38, unit: "팩" },
  { itemName: "햄", totalQty: 32, unit: "팩" },
];

export function HeadquartersOrderDashboard() {
  const [selectedBranch, setSelectedBranch] = useState("전체");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [selectedOrder, setSelectedOrder] = useState<OrderRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Date range filters
  const [startDate, setStartDate] = useState("2026-03-25");
  const [endDate, setEndDate] = useState("2026-03-29");

  const branches = ["전체", "강남점", "홍대점", "신촌점", "이대점"];

  // Filter orders
  const filteredOrders = mockOrderRequests.filter((order) => {
    const matchesBranch =
      selectedBranch === "전체" || order.branch === selectedBranch;
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;
    const orderDate = new Date(order.date.split(" ")[0]);
    const matchesDateRange = orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    return matchesBranch && matchesStatus && matchesDateRange;
  });

  // Statistics
  const stats = {
    pending: mockOrderRequests.filter((o) => o.status === "pending").length,
    approved: mockOrderRequests.filter((o) => o.status === "approved").length,
    rejected: mockOrderRequests.filter((o) => o.status === "rejected").length,
    todayPending: mockOrderRequests.filter(
      (o) => o.status === "pending" && o.date.includes("2026-03-29")
    ).length,
  };

  const getStatusBadge = (status: OrderRequest["status"]) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <Clock className="w-3 h-3" />
            대기
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3" />
            승인
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <XCircle className="w-3 h-3" />
            반려
          </span>
        );
    }
  };

  const handleViewDetail = (order: OrderRequest) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">발주 요청 취합 및 조회</h2>
        <p className="text-gray-500 mt-1">
          전체 지점의 발주 요청을 통합 관리하세요
        </p>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-lg text-gray-900">발주 요청/이력</h3>
        </div>

        {/* Order Requests List */}
        <>
            {/* Filters Inside Tab */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    지점 선택
                  </label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {branches.map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    일자 범위 선택
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="flex items-center text-gray-500">~</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    상태 필터
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as any)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">전체</option>
                    <option value="pending">대기</option>
                    <option value="approved">승인</option>
                    <option value="rejected">반려</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Status Summary Cards */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg border border-yellow-200 p-4 bg-yellow-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-yellow-600 mb-1">대기 (승인필요)</p>
                      <p className="text-xl font-bold text-yellow-600">{stats.pending}건</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-green-200 p-4 bg-green-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-green-600 mb-1">승인 (처리완료)</p>
                      <p className="text-xl font-bold text-green-600">{stats.approved}건</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-red-200 p-4 bg-red-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-red-600 mb-1">반려 (재검토)</p>
                      <p className="text-xl font-bold text-red-600">{stats.rejected}건</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                      <XCircle className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-blue-200 p-4 bg-blue-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-blue-600 mb-1">전체 발주 요청</p>
                      <p className="text-xl font-bold text-blue-600">{mockOrderRequests.length}건</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                      발주서 번호
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                      요청 지점
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                      요청 일시
                    </th>
                    <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                      품목 수
                    </th>
                    <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                      총 수량
                    </th>
                    <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">
                      상태
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                        order.status === "pending"
                          ? "bg-yellow-50"
                          : order.status === "rejected"
                          ? "bg-red-50"
                          : ""
                      }`}
                      onClick={() => handleViewDetail(order)}
                    >
                      <td className="py-4 px-6 font-mono text-sm text-blue-600">
                        {order.orderNumber}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {order.branch}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {order.date}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right font-semibold text-gray-900">
                        {order.itemCount}개
                      </td>
                      <td className="py-4 px-6 text-right font-semibold text-blue-600">
                        {order.totalQty}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {getStatusBadge(order.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="py-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">발주 요청이 없습니다</p>
                <p className="text-gray-400 text-sm">
                  선택한 필터 조건에 해당하는 발주가 없습니다
                </p>
              </div>
            )}

            {filteredOrders.length > itemsPerPage && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex items-center gap-1 px-3 py-1 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    이전
                  </button>
                  <p className="text-sm text-gray-500">
                    {currentPage} / {totalPages}
                  </p>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center gap-1 px-3 py-1 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    다음
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  발주서 상세 정보
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedOrder.orderNumber}
                </p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    요청 지점
                  </label>
                  <p className="font-semibold text-gray-900">
                    {selectedOrder.branch}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    요청 일시
                  </label>
                  <p className="text-gray-900">{selectedOrder.date}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    품목 수
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedOrder.itemCount}개
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    총 요청 수량
                  </label>
                  <p className="text-lg font-semibold text-blue-600">
                    {selectedOrder.totalQty}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  상태
                </label>
                {getStatusBadge(selectedOrder.status)}
              </div>

              {mockOrderItems[selectedOrder.id] && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    발주 품목 상세
                  </h4>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-2 px-4 text-sm font-semibold text-gray-900">
                            품목명
                          </th>
                          <th className="text-right py-2 px-4 text-sm font-semibold text-gray-900">
                            요청 수량
                          </th>
                          <th className="text-right py-2 px-4 text-sm font-semibold text-gray-900">
                            현재 재고
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockOrderItems[selectedOrder.id].map((item, idx) => (
                          <tr key={idx} className="border-t border-gray-100">
                            <td className="py-2 px-4 text-gray-900">
                              {item.itemName}
                            </td>
                            <td className="py-2 px-4 text-right font-semibold text-blue-600">
                              {item.requestedQty}
                              {item.unit}
                            </td>
                            <td
                              className={`py-2 px-4 text-right font-semibold ${
                                item.currentStock < item.safetyStock
                                  ? "text-red-600"
                                  : "text-green-600"
                              }`}
                            >
                              {item.currentStock}
                              {item.unit}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6">
              <button
                onClick={() => setShowDetailModal(false)}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}