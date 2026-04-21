import { useState } from "react";
import { Package, CheckCircle, AlertTriangle, ChevronDown, ChevronUp, History } from "lucide-react";
import { useNavigate } from "react-router";

interface ReceivingDetailItem {
  itemId: string;
  itemName: string;
  category: string;
  orderedQty: number;
  receivedQty: number;
  unit: string;
  expiryDate: string;
  notes: string;
}

interface ReceivingOrder {
  id: string;
  orderId: string;
  orderDate: string;
  expectedDate: string;
  status: "입고대기" | "부분입고" | "입고완료";
  supplier: string;
  items: ReceivingDetailItem[];
}

export function ReceivingConfirm() {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [expandedOrders, setExpandedOrders] = useState<string[]>(["RCV-001"]);
  const [receivingData, setReceivingData] = useState<ReceivingOrder[]>([
    {
      id: "RCV-001",
      orderId: "ORD-2024-001",
      orderDate: "2024-03-28",
      expectedDate: "2024-03-29",
      status: "입고대기",
      supplier: "본사 물류센터",
      items: [
        {
          itemId: "ITEM-001",
          itemName: "아메리카노 원두",
          category: "원두",
          orderedQty: 50,
          receivedQty: 50,
          unit: "kg",
          expiryDate: "2024-06-29",
          notes: ""
        },
        {
          itemId: "ITEM-002",
          itemName: "우유 (1L)",
          category: "유제품",
          orderedQty: 100,
          receivedQty: 98,
          unit: "개",
          expiryDate: "2024-04-05",
          notes: "2개 파손"
        },
        {
          itemId: "ITEM-003",
          itemName: "설탕",
          category: "부재료",
          orderedQty: 20,
          receivedQty: 20,
          unit: "kg",
          expiryDate: "2025-03-29",
          notes: ""
        }
      ]
    },
    {
      id: "RCV-002",
      orderId: "ORD-2024-002",
      orderDate: "2024-03-27",
      expectedDate: "2024-03-29",
      status: "입고대기",
      supplier: "본사 물류센터",
      items: [
        {
          itemId: "ITEM-004",
          itemName: "테이크아웃 컵 (12oz)",
          category: "포장용품",
          orderedQty: 1000,
          receivedQty: 1000,
          unit: "개",
          expiryDate: "-",
          notes: ""
        },
        {
          itemId: "ITEM-005",
          itemName: "빨대",
          category: "포장용품",
          orderedQty: 500,
          receivedQty: 500,
          unit: "개",
          expiryDate: "-",
          notes: ""
        }
      ]
    }
  ]);
  const [statusHistory, setStatusHistory] = useState<{ [key: string]: { status: string; timestamp: string; user: string }[] }>({
    "RCV-001": [
      { status: "발주 완료", timestamp: "2024-03-28 10:30", user: "김지점" },
      { status: "배송 중", timestamp: "2024-03-28 14:00", user: "본사시스템" },
      { status: "입고 대기", timestamp: "2024-03-29 08:00", user: "본사시스템" }
    ]
  });

  const toggleOrder = (orderId: string) => {
    setExpandedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleQtyChange = (orderId: string, itemId: string, value: number) => {
    setReceivingData(prev =>
      prev.map(order =>
        order.id === orderId
          ? {
              ...order,
              items: order.items.map(item =>
                item.itemId === itemId
                  ? { ...item, receivedQty: value }
                  : item
              )
            }
          : order
      )
    );
  };

  const handleNotesChange = (orderId: string, itemId: string, value: string) => {
    setReceivingData(prev =>
      prev.map(order =>
        order.id === orderId
          ? {
              ...order,
              items: order.items.map(item =>
                item.itemId === itemId
                  ? { ...item, notes: value }
                  : item
              )
            }
          : order
      )
    );
  };

  const handleConfirmReceiving = (orderId: string) => {
    const order = receivingData.find(o => o.id === orderId);
    if (!order) return;

    const allItemsReceived = order.items.every(item => item.receivedQty > 0);
    
    if (!allItemsReceived) {
      setToastMessage("⚠️ 입고 수량을 확인해주세요");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    // Update status
    setReceivingData(prev =>
      prev.map(o =>
        o.id === orderId
          ? { ...o, status: "입고완료" as const }
          : o
      )
    );

    // Add to history
    setStatusHistory(prev => ({
      ...prev,
      [orderId]: [
        ...(prev[orderId] || []),
        {
          status: "입고 완료",
          timestamp: new Date().toLocaleString('ko-KR'),
          user: "김지점"
        }
      ]
    }));

    setToastMessage("✅ 입고가 완료되었습니다. 재고가 자동으로 반영되었습니다.");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      // Optionally navigate to inventory status page
      // navigate("/inventory/status");
    }, 3000);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      "입고대기": "bg-yellow-100 text-yellow-800",
      "부분입고": "bg-orange-100 text-orange-800",
      "입고완료": "bg-green-100 text-green-800"
    };
    return badges[status as keyof typeof badges] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">입고 처리</h1>
          <p className="text-gray-500 mt-2">입고 대기 중인 물품을 확인하고 입고를 확정합니다</p>
        </div>
        <button
          onClick={() => navigate("/receiving/history")}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          입고 이력
        </button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-white border-l-4 border-blue-600 shadow-lg rounded-lg p-4 max-w-md animate-slide-in">
          <p className="font-medium text-gray-900">{toastMessage}</p>
        </div>
      )}

      {/* Receiving Orders List */}
      <div className="space-y-4">
        {receivingData.map((order) => {
          const isExpanded = expandedOrders.includes(order.id);
          const hasDiscrepancy = order.items.some(item => item.orderedQty !== item.receivedQty);
          
          return (
            <div key={order.id} className="bg-white rounded-lg shadow">
              {/* Order Header */}
              <button
                onClick={() => toggleOrder(order.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900">{order.id}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                      {hasDiscrepancy && order.status !== "입고완료" && (
                        <span className="flex items-center gap-1 text-orange-600 text-sm">
                          <AlertTriangle className="w-4 h-4" />
                          <span>수량 불일치</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-6 mt-1 text-sm text-gray-500">
                      <span>발주번호: {order.orderId}</span>
                      <span>입고 예정일: {order.expectedDate}</span>
                      <span>공급처: {order.supplier}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {order.status === "입고완료" && (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Order Details */}
              {isExpanded && (
                <div className="border-t border-gray-200 px-6 py-4">
                  {/* Items Table */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-4">입고 품목</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">품목명</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">카테고리</th>
                            <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">발주 수량</th>
                            <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">입고 수량</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">유통기한</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">비고</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {order.items.map((item) => (
                            <tr key={item.itemId}>
                              <td className="px-4 py-3 text-sm text-gray-900">{item.itemName}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{item.category}</td>
                              <td className="px-4 py-3 text-sm text-center text-gray-900">
                                {item.orderedQty} {item.unit}
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="number"
                                  value={item.receivedQty}
                                  onChange={(e) => handleQtyChange(order.id, item.itemId, parseInt(e.target.value) || 0)}
                                  disabled={order.status === "입고완료"}
                                  className={`w-24 px-3 py-1 border rounded text-center ${
                                    item.receivedQty !== item.orderedQty && order.status !== "입고완료"
                                      ? "border-orange-500 bg-orange-50"
                                      : "border-gray-300"
                                  } ${order.status === "입고완료" ? "bg-gray-100" : ""}`}
                                />
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900">{item.expiryDate}</td>
                              <td className="px-4 py-3">
                                <input
                                  type="text"
                                  value={item.notes}
                                  onChange={(e) => handleNotesChange(order.id, item.itemId, e.target.value)}
                                  disabled={order.status === "입고완료"}
                                  placeholder="비고 입력"
                                  className={`w-full px-3 py-1 border border-gray-300 rounded text-sm ${
                                    order.status === "입고완료" ? "bg-gray-100" : ""
                                  }`}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Status History */}
                  <div className="mb-6">
                    <button
                      onClick={() => {
                        const el = document.getElementById(`history-${order.id}`);
                        if (el) el.classList.toggle("hidden");
                      }}
                      className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      <History className="w-4 h-4" />
                      <span>상태 변경 이력 보기</span>
                    </button>
                    <div id={`history-${order.id}`} className="hidden mt-3 space-y-2">
                      {statusHistory[order.id]?.map((history, index) => (
                        <div key={index} className="flex items-center gap-4 text-sm">
                          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                          <span className="font-medium text-gray-900">{history.status}</span>
                          <span className="text-gray-500">{history.timestamp}</span>
                          <span className="text-gray-500">처리자: {history.user}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {order.status !== "입고완료" && (
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => navigate("/receiving/history")}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        취소
                      </button>
                      <button
                        onClick={() => handleConfirmReceiving(order.id)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>입고 확정</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {receivingData.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">입고 대기 중인 물품이 없습니다</p>
        </div>
      )}
    </div>
  );
}
