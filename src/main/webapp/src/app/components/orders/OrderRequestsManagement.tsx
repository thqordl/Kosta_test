import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Edit,
  Save,
  AlertTriangle,
  MapPin,
  Calendar,
  Eye,
  X,
  Clock,
} from "lucide-react";

interface OrderRequest {
  id: string;
  orderNumber: string;
  branch: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  items: OrderItem[];
}

interface OrderItem {
  id: string;
  itemName: string;
  itemCode: string;
  requestedQty: number;
  adjustedQty: number;
  unit: string;
  currentStock: number;
  safetyStock: number;
}

const mockOrderRequests: OrderRequest[] = [
  {
    id: "1",
    orderNumber: "PO-2026-0329-001",
    branch: "강남점",
    date: "2026-03-29 10:30",
    status: "pending",
    items: [
      {
        id: "i1",
        itemName: "소고기 패티",
        itemCode: "MEAT-001",
        requestedQty: 55,
        adjustedQty: 55,
        unit: "개",
        currentStock: 45,
        safetyStock: 50,
      },
      {
        id: "i2",
        itemName: "감자",
        itemCode: "VEG-001",
        requestedQty: 85,
        adjustedQty: 85,
        unit: "kg",
        currentStock: 15,
        safetyStock: 50,
      },
      {
        id: "i3",
        itemName: "생크림",
        itemCode: "DAIRY-001",
        requestedQty: 18,
        adjustedQty: 18,
        unit: "L",
        currentStock: 12,
        safetyStock: 15,
      },
      {
        id: "i4",
        itemName: "양상추",
        itemCode: "VEG-002",
        requestedQty: 27,
        adjustedQty: 27,
        unit: "kg",
        currentStock: 8,
        safetyStock: 20,
      },
    ],
  },
  {
    id: "2",
    orderNumber: "PO-2026-0329-002",
    branch: "홍대점",
    date: "2026-03-29 09:15",
    status: "pending",
    items: [
      {
        id: "i5",
        itemName: "버거빵",
        itemCode: "BREAD-001",
        requestedQty: 80,
        adjustedQty: 80,
        unit: "개",
        currentStock: 120,
        safetyStock: 150,
      },
      {
        id: "i6",
        itemName: "체다치즈",
        itemCode: "DAIRY-002",
        requestedQty: 25,
        adjustedQty: 25,
        unit: "장",
        currentStock: 28,
        safetyStock: 25,
      },
      {
        id: "i7",
        itemName: "식용유",
        itemCode: "SAUCE-001",
        requestedQty: 15,
        adjustedQty: 15,
        unit: "L",
        currentStock: 16,
        safetyStock: 15,
      },
    ],
  },
  {
    id: "3",
    orderNumber: "PO-2026-0329-003",
    branch: "신촌점",
    date: "2026-03-29 08:45",
    status: "pending",
    items: [
      {
        id: "i8",
        itemName: "소고기 패티",
        itemCode: "MEAT-001",
        requestedQty: 45,
        adjustedQty: 45,
        unit: "개",
        currentStock: 30,
        safetyStock: 50,
      },
      {
        id: "i9",
        itemName: "토마토",
        itemCode: "VEG-003",
        requestedQty: 20,
        adjustedQty: 20,
        unit: "kg",
        currentStock: 8,
        safetyStock: 15,
      },
    ],
  },
];

const rejectionReasons = [
  "요청 수량이 안전 재고의 3배를 초과합니다",
  "본사 재고가 부족하여 승인이 불가능합니다",
  "최근 발주 이력과 중복되어 재검토가 필요합니다",
  "품목 승인 기준을 충족하지 못했습니다",
  "기타 (직접 입력)",
];

export function OrderRequestsManagement() {
  const [orders, setOrders] = useState<OrderRequest[]>(mockOrderRequests);
  const [selectedOrder, setSelectedOrder] = useState<OrderRequest | null>(
    orders[0]
  );
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState(rejectionReasons[0]);
  const [customReason, setCustomReason] = useState("");

  const updateAdjustedQty = (orderId: string, itemId: string, newQty: number) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              items: order.items.map((item) =>
                item.id === itemId ? { ...item, adjustedQty: newQty } : item
              ),
            }
          : order
      )
    );

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        items: selectedOrder.items.map((item) =>
          item.id === itemId ? { ...item, adjustedQty: newQty } : item
        ),
      });
    }
  };

  const handleApprove = () => {
    if (!selectedOrder) return;

    setOrders(
      orders.map((order) =>
        order.id === selectedOrder.id ? { ...order, status: "approved" } : order
      )
    );

    if (selectedOrder) {
      setSelectedOrder({ ...selectedOrder, status: "approved" });
    }

    alert(
      `${selectedOrder.branch}의 발주서가 승인되었습니다. 출고 처리를 진행해주세요.`
    );
    setShowApproveModal(false);
  };

  const handleReject = () => {
    if (!selectedOrder) return;

    const finalReason =
      rejectionReason === "기타 (직접 입력)" ? customReason : rejectionReason;

    if (!finalReason.trim()) {
      alert("반려 사유를 입력해주세요.");
      return;
    }

    setOrders(
      orders.map((order) =>
        order.id === selectedOrder.id ? { ...order, status: "rejected" } : order
      )
    );

    if (selectedOrder) {
      setSelectedOrder({ ...selectedOrder, status: "rejected" });
    }

    alert(`${selectedOrder.branch}의 발주서가 반려되었습니다.`);
    setShowRejectModal(false);
    setRejectionReason(rejectionReasons[0]);
    setCustomReason("");
  };

  const pendingOrders = orders.filter((o) => o.status === "pending");

  const getStatusBadge = (status: OrderRequest["status"]) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <Clock className="w-3 h-3" />
            대기중
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3" />
            승인완료
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <XCircle className="w-3 h-3" />
            반려
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          발주 요청 승인/반려
        </h2>
        <p className="text-gray-500 mt-1">
          발주 요청을 검토하고 승인 또는 반려 처리하세요
        </p>
      </div>

      {/* Alert */}
      {pendingOrders.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-900">
                처리 대기 중인 발주 요청
              </h3>
              <p className="text-sm text-yellow-700">
                <span className="font-bold">{pendingOrders.length}건</span>의 발주
                요청이 승인 대기 중입니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Order List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-900">발주 요청 목록</h3>
              <p className="text-xs text-gray-500 mt-1">
                {orders.length}건의 발주 요청
              </p>
            </div>
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {orders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedOrder?.id === order.id
                      ? "bg-blue-50 border-l-4 border-blue-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-gray-900 truncate">
                          {order.orderNumber}
                        </h4>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                          <span className="text-xs text-gray-600">{order.branch}</span>
                        </div>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{order.date}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      품목 {order.items.length}개 ·  수량 합계{" "}
                      {order.items.reduce((sum, item) => sum + item.requestedQty, 0)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Order Detail */}
        <div className="lg:col-span-2">
          {selectedOrder ? (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Header */}
              <div
                className={`px-6 py-4 border-b ${
                  selectedOrder.status === "pending"
                    ? "bg-yellow-50 border-yellow-200"
                    : selectedOrder.status === "approved"
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {selectedOrder.orderNumber}
                    </h3>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {selectedOrder.branch}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {selectedOrder.date}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(selectedOrder.status)}
                </div>

                {selectedOrder.status === "pending" && (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => setShowRejectModal(true)}
                      className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors text-sm"
                    >
                      <XCircle className="w-4 h-4" />
                      반려
                    </button>
                    <button
                      onClick={() => setShowApproveModal(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      <CheckCircle className="w-4 h-4" />
                      승인
                    </button>
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                        품목코드
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                        품목명
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">
                        요청 수량
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">
                        최종 확정 수량
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">
                        지점 현재 재고
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">
                        상태
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="py-4 px-4 font-mono text-sm text-gray-600">
                          {item.itemCode}
                        </td>
                        <td className="py-4 px-4 font-medium text-gray-900">
                          {item.itemName}
                        </td>
                        <td className="py-4 px-4 text-right font-semibold text-blue-600">
                          {item.requestedQty}
                          {item.unit}
                        </td>
                        <td className="py-4 px-4">
                          {selectedOrder.status === "pending" ? (
                            <div className="flex items-center justify-center gap-2">
                              <input
                                type="number"
                                value={item.adjustedQty}
                                onChange={(e) =>
                                  updateAdjustedQty(
                                    selectedOrder.id,
                                    item.id,
                                    Number(e.target.value)
                                  )
                                }
                                min="0"
                                className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center font-semibold text-green-600 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              />
                              <span className="text-gray-600">{item.unit}</span>
                              <Edit className="w-4 h-4 text-gray-400" />
                            </div>
                          ) : (
                            <div className="text-center font-semibold text-green-600">
                              {item.adjustedQty}
                              {item.unit}
                            </div>
                          )}
                        </td>
                        <td
                          className={`py-4 px-4 text-right font-semibold ${
                            item.currentStock < item.safetyStock
                              ? "text-red-600"
                              : "text-gray-900"
                          }`}
                        >
                          {item.currentStock}
                          {item.unit}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {item.currentStock < item.safetyStock ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                              <AlertTriangle className="w-3 h-3" />
                              부족
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                              <CheckCircle className="w-3 h-3" />
                              정상
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">총 품목 수</span>
                  <span className="font-semibold text-gray-900">
                    {selectedOrder.items.length}개
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600">총 요청 수량</span>
                  <span className="font-semibold text-blue-600">
                    {selectedOrder.items.reduce(
                      (sum, item) => sum + item.requestedQty,
                      0
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600">총 확정 수량</span>
                  <span className="font-semibold text-green-600">
                    {selectedOrder.items.reduce(
                      (sum, item) => sum + item.adjustedQty,
                      0
                    )}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">발주 요청을 선택하세요</p>
              <p className="text-gray-400 text-sm mt-2">
                왼쪽 목록에서 발주 요청을 클릭하면 상세 내용을 확인할 수 있습니다
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Approve Modal */}
      {showApproveModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  발주 승인 확인
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedOrder.orderNumber}
                </p>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 mb-4 border border-green-200">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">요청 지점</span>
                  <span className="font-semibold text-green-900">
                    {selectedOrder.branch}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">품목 수</span>
                  <span className="font-semibold text-green-900">
                    {selectedOrder.items.length}개
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">총 수량</span>
                  <span className="font-semibold text-green-900">
                    {selectedOrder.items.reduce(
                      (sum, item) => sum + item.adjustedQty,
                      0
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-xs text-blue-800">
                <strong>안내:</strong> 승인 후 출고 대기 목록으로 이동하며, 출고
                처리를 진행할 수 있습니다.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowApproveModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleApprove}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                승인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  발주 반려 처리
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedOrder.orderNumber}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                반려 사유 선택 <span className="text-red-500">*</span>
              </label>
              <select
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {rejectionReasons.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </div>

            {rejectionReason === "기타 (직접 입력)" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  반려 사유 입력 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  rows={3}
                  placeholder="반려 사유를 입력해주세요..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <p className="text-xs text-yellow-800">
                <strong>안내:</strong> 반려 시 지점에 사유가 전달되며, 지점에서
                수정 후 재요청할 수 있습니다.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason(rejectionReasons[0]);
                  setCustomReason("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleReject}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                반려
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}