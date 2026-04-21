import { useState } from "react";
import { useSearchParams } from "react-router";
import {
  FileText,
  Clock,
  Send,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  X,
  Calendar,
  TrendingUp,
  Filter,
} from "lucide-react";

interface OrderRecord {
  id: string;
  orderNumber: string;
  date: string;
  status: "draft" | "sent" | "approved" | "rejected";
  itemCount: number;
  totalQty: number;
  rejectionReason?: string;
}

const mockOrders: OrderRecord[] = [
  {
    id: "1",
    orderNumber: "PO-2026-0329-001",
    date: "2026-03-29 10:30",
    status: "sent",
    itemCount: 4,
    totalQty: 185,
  },
  {
    id: "2",
    orderNumber: "PO-2026-0329-002",
    date: "2026-03-29 09:15",
    status: "sent",
    itemCount: 3,
    totalQty: 120,
  },
  {
    id: "3",
    orderNumber: "PO-2026-0328-001",
    date: "2026-03-28 14:20",
    status: "approved",
    itemCount: 5,
    totalQty: 250,
  },
  {
    id: "4",
    orderNumber: "PO-2026-0327-003",
    date: "2026-03-27 16:45",
    status: "approved",
    itemCount: 6,
    totalQty: 310,
  },
  {
    id: "5",
    orderNumber: "PO-2026-0327-002",
    date: "2026-03-27 11:00",
    status: "rejected",
    itemCount: 4,
    totalQty: 180,
    rejectionReason: "일부 품목의 요청 수량이 안전 재고의 3배를 초과합니다.",
  },
  {
    id: "6",
    orderNumber: "DRAFT-001",
    date: "2026-03-29 15:20",
    status: "draft",
    itemCount: 3,
    totalQty: 95,
  },
  {
    id: "7",
    orderNumber: "DRAFT-002",
    date: "2026-03-28 18:00",
    status: "draft",
    itemCount: 2,
    totalQty: 50,
  },
];

interface OrderItem {
  itemName: string;
  requestedQty: number;
  unit: string;
}

const mockOrderItems: Record<string, OrderItem[]> = {
  "1": [
    { itemName: "소고기 패티", requestedQty: 55, unit: "개" },
    { itemName: "감자", requestedQty: 85, unit: "kg" },
    { itemName: "생크림", requestedQty: 18, unit: "L" },
    { itemName: "양상추", requestedQty: 27, unit: "kg" },
  ],
  "2": [
    { itemName: "버거빵", requestedQty: 80, unit: "개" },
    { itemName: "체다치즈", requestedQty: 25, unit: "장" },
    { itemName: "식용유", requestedQty: 15, unit: "L" },
  ],
};

export function OrderHistory() {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get("status");
  const [activeTab, setActiveTab] = useState<
    "all" | "sent" | "approved" | "rejected"
  >((statusParam as any) || "all");
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [startDate, setStartDate] = useState("2026-03-01");
  const [endDate, setEndDate] = useState("2026-03-31");

  const filteredOrders =
    activeTab === "all"
      ? mockOrders.filter((o) => o.status !== "draft")
      : mockOrders.filter((o) => o.status === activeTab);

  const orderStatus = {
    sent: mockOrders.filter((o) => o.status === "sent").length,
    approved: mockOrders.filter((o) => o.status === "approved").length,
    rejected: mockOrders.filter((o) => o.status === "rejected").length,
  };

  const totalOrders = mockOrders.filter((o) => o.status !== "draft").length;

  const getStatusBadge = (status: OrderRecord["status"]) => {
    switch (status) {
      case "draft":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            <FileText className="w-3 h-3" />
            초안
          </span>
        );
      case "sent":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            <Send className="w-3 h-3" />
            전송
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

  const handleViewDetail = (order: OrderRecord) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleCancelRequest = () => {
    if (!cancelReason.trim()) {
      alert("취소 사유를 입력해주세요.");
      return;
    }
    alert("취소 요청이 본사로 전송되었습니다.");
    setShowCancelModal(false);
    setCancelReason("");
    setSelectedOrder(null);
  };

  const tabCounts = {
    all: mockOrders.filter((o) => o.status !== "draft").length,
    sent: mockOrders.filter((o) => o.status === "sent").length,
    approved: mockOrders.filter((o) => o.status === "approved").length,
    rejected: mockOrders.filter((o) => o.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">발주 내역</h2>
        <p className="text-gray-500 mt-1">
          전체 발주 내역을 상태별로 확인하세요
        </p>
      </div>

      {/* Date Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <h3 className="font-semibold text-gray-900">일자 범위</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">시작일</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">종료일</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 px-6 py-5 text-base font-semibold transition-colors ${
              activeTab === "all"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            전체 ({tabCounts.all})
          </button>
          <button
            onClick={() => setActiveTab("sent")}
            className={`flex-1 px-6 py-5 text-base font-semibold transition-colors ${
              activeTab === "sent"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-blue-500 hover:text-blue-700 hover:bg-blue-50"
            }`}
          >
            전송 ({tabCounts.sent})
          </button>
          <button
            onClick={() => setActiveTab("approved")}
            className={`flex-1 px-6 py-5 text-base font-semibold transition-colors ${
              activeTab === "approved"
                ? "text-green-600 border-b-2 border-green-600 bg-green-50"
                : "text-green-500 hover:text-green-700 hover:bg-green-50"
            }`}
          >
            승인 ({tabCounts.approved})
          </button>
          <button
            onClick={() => setActiveTab("rejected")}
            className={`flex-1 px-6 py-5 text-base font-semibold transition-colors ${
              activeTab === "rejected"
                ? "text-red-600 border-b-2 border-red-600 bg-red-50"
                : "text-red-500 hover:text-red-700 hover:bg-red-50"
            }`}
          >
            반려 ({tabCounts.rejected})
          </button>
        </div>

        {/* Orders List */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  발주서 번호
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  작성 일시
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
                <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">
                  작업
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 ${
                    order.status === "rejected" ? "bg-red-50" : ""
                  }`}
                >
                  <td className="py-4 px-6 font-mono text-sm text-blue-600">
                    {order.orderNumber}
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
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleViewDetail(order)}
                        className="inline-flex items-center gap-1 px-3 py-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        상세
                      </button>
                      {order.status === "sent" && (
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowCancelModal(true);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                          취소
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="py-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">발주 내역이 없습니다</p>
            <p className="text-gray-400 text-sm">
              새로운 발주서를 작성해보세요
            </p>
          </div>
        )}
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
                    작성 일시
                  </label>
                  <p className="text-gray-900">{selectedOrder.date}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    상태
                  </label>
                  {getStatusBadge(selectedOrder.status)}
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

              {selectedOrder.rejectionReason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-900 mb-1">
                        반려 사유
                      </h4>
                      <p className="text-sm text-red-700">
                        {selectedOrder.rejectionReason}
                      </p>
                    </div>
                  </div>
                </div>
              )}

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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              {selectedOrder.status === "sent" && (
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setShowCancelModal(true);
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  취소 요청
                </button>
              )}
              <button
                onClick={() => setShowDetailModal(false)}
                className={`${
                  selectedOrder.status === "sent" ? "flex-1" : "w-full"
                } px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors`}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <X className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  발주 취소 요청
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedOrder.orderNumber}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                취소 사유 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows={4}
                placeholder="취소 사유를 입력해주세요..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <p className="text-xs text-yellow-800">
                <strong>안내:</strong> 취소 요청이 본사로 전송되며, 승인 시 해당
                발주서는 취소됩니다.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelReason("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                닫기
              </button>
              <button
                onClick={handleCancelRequest}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                취소 요청
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
