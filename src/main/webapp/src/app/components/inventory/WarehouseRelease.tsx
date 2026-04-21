import { useState } from "react";
import {
  Package,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  X,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
} from "lucide-react";

interface ReleaseOrder {
  id: string;
  orderId: string;
  branch: string;
  orderDate: string;
  status: "출고대기" | "준비중" | "출고 완료" | "재고부족";
  items: ReleaseItem[];
}

interface ReleaseItem {
  itemCode: string;
  itemName: string;
  category: string;
  requestedQty: number; // 발주 요청 수량
  confirmedQty?: number; // 출고 수량 (최종확정 수량, 출고대기 상태만 가짐)
  unit: string;
  warehouseStock: number;
}

const mockReleaseOrders: ReleaseOrder[] = [
  {
    id: "ro1",
    orderId: "PO-2026-0329-001",
    branch: "강남점",
    orderDate: "2026-03-29",
    status: "출고대기",
    items: [
      {
        itemCode: "MEAT-001",
        itemName: "소고기 패티",
        category: "육류",
        requestedQty: 55,
        confirmedQty: 50,
        unit: "개",
        warehouseStock: 250,
      },
      {
        itemCode: "VEG-001",
        itemName: "감자",
        category: "채소",
        requestedQty: 85,
        confirmedQty: 85,
        unit: "kg",
        warehouseStock: 180,
      },
      {
        itemCode: "DAIRY-001",
        itemName: "생크림",
        category: "유제품",
        requestedQty: 18,
        confirmedQty: 15,
        unit: "L",
        warehouseStock: 65,
      },
      {
        itemCode: "VEG-002",
        itemName: "양상추",
        category: "채소",
        requestedQty: 27,
        confirmedQty: 27,
        unit: "kg",
        warehouseStock: 50,
      },
    ],
  },
  {
    id: "ro2",
    orderId: "PO-2026-0329-002",
    branch: "홍대점",
    orderDate: "2026-03-29",
    status: "준비중",
    items: [
      {
        itemCode: "BREAD-001",
        itemName: "버거빵",
        category: "빵류",
        requestedQty: 80,
        unit: "개",
        warehouseStock: 650,
      },
      {
        itemCode: "DAIRY-002",
        itemName: "체다치즈",
        category: "유제품",
        requestedQty: 25,
        unit: "장",
        warehouseStock: 120,
      },
      {
        itemCode: "SAUCE-001",
        itemName: "식용유",
        category: "조미료",
        requestedQty: 15,
        unit: "L",
        warehouseStock: 45,
      },
    ],
  },
  {
    id: "ro3",
    orderId: "PO-2026-0329-003",
    branch: "신촌점",
    orderDate: "2026-03-29",
    status: "출고대기",
    items: [
      {
        itemCode: "MEAT-001",
        itemName: "소고기 패티",
        category: "육류",
        requestedQty: 45,
        confirmedQty: 45,
        unit: "개",
        warehouseStock: 250,
      },
      {
        itemCode: "VEG-003",
        itemName: "토마토",
        category: "채소",
        requestedQty: 20,
        confirmedQty: 20,
        unit: "kg",
        warehouseStock: 80,
      },
    ],
  },
  {
    id: "ro4",
    orderId: "PO-2026-0329-004",
    branch: "이대점",
    orderDate: "2026-03-29",
    status: "재고부족",
    items: [
      {
        itemCode: "VEG-002",
        itemName: "양상추",
        category: "채소",
        requestedQty: 50,
        unit: "kg",
        warehouseStock: 30,
      },
    ],
  },
];

interface ReleaseHistory {
  id: string;
  releaseDate: string;
  orderId: string;
  branch: string;
  handler: string;
  status: "출고 완료";
  items: ReleaseHistoryItem[];
}

interface ReleaseHistoryItem {
  itemCode: string;
  itemName: string;
  category: string;
  requestedQty: number;
  confirmedQty: number;
  unit: string;
}

const mockReleaseHistory: ReleaseHistory[] = [
  {
    id: "rh1",
    releaseDate: "2026-03-28 14:30",
    orderId: "PO-2026-0328-001",
    branch: "강남점",
    handler: "김철수",
    status: "출고 완료",
    items: [
      { itemCode: "MEAT-001", itemName: "소고기 패티", category: "육류", requestedQty: 100, confirmedQty: 100, unit: "개" },
      { itemCode: "VEG-002", itemName: "양상추", category: "채소", requestedQty: 35, confirmedQty: 30, unit: "kg" },
    ],
  },
  {
    id: "rh2",
    releaseDate: "2026-03-28 11:20",
    orderId: "PO-2026-0328-002",
    branch: "홍대점",
    handler: "이영희",
    status: "출고 완료",
    items: [
      { itemCode: "DAIRY-001", itemName: "생크림", category: "유제품", requestedQty: 25, confirmedQty: 25, unit: "L" },
      { itemCode: "DAIRY-002", itemName: "체다치즈", category: "유제품", requestedQty: 40, confirmedQty: 40, unit: "장" },
    ],
  },
  {
    id: "rh3",
    releaseDate: "2026-03-27 16:00",
    orderId: "PO-2026-0327-001",
    branch: "신촌점",
    handler: "박민수",
    status: "출고 완료",
    items: [
      { itemCode: "VEG-001", itemName: "감자", category: "채소", requestedQty: 70, confirmedQty: 70, unit: "kg" },
      { itemCode: "VEG-003", itemName: "토마토", category: "채소", requestedQty: 25, confirmedQty: 25, unit: "kg" },
      { itemCode: "BREAD-001", itemName: "버거빵", category: "빵류", requestedQty: 150, confirmedQty: 150, unit: "개" },
    ],
  },
];

export function WarehouseRelease() {
  const [orders, setOrders] = useState<ReleaseOrder[]>(mockReleaseOrders);
  const [releaseHistory, setReleaseHistory] =
    useState<ReleaseHistory[]>(mockReleaseHistory);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorOrder, setErrorOrder] = useState<ReleaseOrder | null>(null);
  const [activeTab, setActiveTab] = useState<"pending" | "history">("pending");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ReleaseOrder | null>(null);
  const [showHistoryDetailModal, setShowHistoryDetailModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<ReleaseHistory | null>(null);

  // Filters
  const [filterBranch, setFilterBranch] = useState("전체");
  const [filterStatus, setFilterStatus] = useState<"all" | "출고대기" | "준비중" | "출고 완료" | "재고부족">("all");
  const [filterStartDate, setFilterStartDate] = useState("2026-03-01");
  const [filterEndDate, setFilterEndDate] = useState("2026-04-05");

  const branches = ["전체", "강남점", "홍대점", "신촌점", "이대점"];

  // Filter orders for pending tab (출고대기, 준비중, 재고부족)
  const filteredOrders = orders.filter((order) => {
    const matchesBranch = filterBranch === "전체" || order.branch === filterBranch;
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    return matchesBranch && matchesStatus;
  });

  // Filter history (출고 완료)
  const filteredHistory = releaseHistory.filter((record) => {
    const matchesBranch = filterBranch === "전체" || record.branch === filterBranch;
    const recordDate = new Date(record.releaseDate.split(" ")[0]);
    const start = new Date(filterStartDate);
    const end = new Date(filterEndDate);
    const matchesDate = recordDate >= start && recordDate <= end;
    return matchesBranch && matchesDate;
  });

  const waitingOrders = filteredOrders.filter((o) => o.status === "출고대기");
  const preparingOrders = filteredOrders.filter((o) => o.status === "준비중");
  const completedOrders = filteredHistory.filter((o) => o.status === "출고 완료");
  const insufficientOrders = filteredOrders.filter((o) => o.status === "재고부족");

  const handleRelease = (order: ReleaseOrder) => {
    // Check if warehouse has sufficient stock for all items
    const insufficientItems = order.items.filter(
      (item) => item.warehouseStock < item.requestedQty
    );

    if (insufficientItems.length > 0) {
      setErrorOrder(order);
      setShowErrorModal(true);
      return;
    }

    // Process release
    const newHistory: ReleaseHistory = {
      id: `rh${Date.now()}`,
      releaseDate: new Date().toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      orderId: order.orderId,
      branch: order.branch,
      handler: "김철수", // Current user
      status: "출고 완료",
      items: order.items.map((item) => ({
        itemCode: item.itemCode,
        itemName: item.itemName,
        category: item.category,
        requestedQty: item.requestedQty,
        confirmedQty: item.confirmedQty || item.requestedQty,
        unit: item.unit,
      })),
    };

    setReleaseHistory([newHistory, ...releaseHistory]);
    setOrders(orders.filter((o) => o.id !== order.id));
    alert(`${order.branch}으로 출고가 완료되었습니다.`);
  };

  // Pagination for history
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentHistory = filteredHistory.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">본사 물류창고 출고</h2>
        <p className="text-gray-500 mt-1">
          지점 발주 요청에 따라 출고 처리를 진행하세요
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              지점 선택
            </label>
            <select
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
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
              상태 선택
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as "all" | "출고대기" | "준비중" | "출고 완료" | "재고부족")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
            >
              <option value="all">전체</option>
              <option value="출고대기">출고대기</option>
              <option value="준비중">준비중</option>
              <option value="출고 완료">출고 완료</option>
              <option value="재고부족">재고부족</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              일자 범위
            </label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
              />
              <span className="text-gray-500">~</span>
              <input
                type="date"
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">
                {waitingOrders.length}건
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500">출고대기</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-yellow-600">
                {preparingOrders.length}건
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500">준비중</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-green-600">
                {completedOrders.length}건
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500">출고 완료</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-red-600">
                {insufficientOrders.length}건
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500">재고 부족</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => {
              setActiveTab("pending");
              setCurrentPage(1);
            }}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
              activeTab === "pending"
                ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            출고 처리중
          </button>
          <button
            onClick={() => {
              setActiveTab("history");
              setCurrentPage(1);
            }}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
              activeTab === "history"
                ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            출고 이력
          </button>
        </div>

        {/* Release Pending List */}
        {activeTab === "pending" && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                      발주서 번호
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                      발주요청지점
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                      발주요청일
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
                  {filteredOrders.map((order) => {
                    const hasInsufficientStock = order.items.some(
                      (item) => item.warehouseStock < item.requestedQty
                    );
                    return (
                      <tr
                        key={order.id}
                        className={`border-b border-gray-100 hover:bg-gray-50 ${
                          order.status === "재고부족" ? "bg-red-50" : ""
                        }`}
                      >
                        <td className="py-4 px-6 font-mono text-sm text-blue-600">
                          {order.orderId}
                        </td>
                        <td className="py-4 px-6 font-medium text-gray-900">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {order.branch}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-700 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {order.orderDate}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          {order.status === "출고대기" && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                              <Package className="w-3 h-3" />
                              출고대기
                            </span>
                          )}
                          {order.status === "준비중" && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                              <TrendingUp className="w-3 h-3" />
                              준비중
                            </span>
                          )}
                          {order.status === "재고부족" && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                              <AlertTriangle className="w-3 h-3" />
                              재고 부족
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowDetailModal(true);
                            }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            발주/출고 상세보기
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="py-12 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">
                  출고 처리 중인 발주가 없습니다
                </p>
                <p className="text-gray-400 text-sm">모든 발주가 처리되었습니다</p>
              </div>
            )}
          </>
        )}

        {/* Release History */}
        {activeTab === "history" && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                      출고 일시
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                      출고 지점
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                      처리자
                    </th>
                    <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">
                      작업
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                      발주서 번호
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentHistory.map((record) => (
                    <tr
                      key={record.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-6 text-gray-700">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {record.releaseDate}
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {record.branch}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-700">{record.handler}</td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => {
                            setSelectedHistory(record);
                            setShowHistoryDetailModal(true);
                          }}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          발주/출고 상세보기
                        </button>
                      </td>
                      <td className="py-4 px-6 font-mono text-sm text-blue-600">
                        {record.orderId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredHistory.length > itemsPerPage && (
              <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  이전
                </button>
                <div className="text-sm text-gray-500">
                  {currentPage} / {totalPages}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  다음
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Error Modal */}
      {showErrorModal && errorOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <X className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  재고 부족 오류
                </h3>
                <p className="text-sm text-gray-500">출고 처리 불가</p>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-4 mb-4 border border-red-200">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-red-700">발주서 번호</span>
                  <span className="font-semibold text-red-900">
                    {errorOrder.orderId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-700">요청 지점</span>
                  <span className="font-semibold text-red-900">
                    {errorOrder.branch}
                  </span>
                </div>
                <div className="pt-2 border-t border-red-200">
                  <p className="text-red-700 font-semibold mb-2">재고 부족 품목:</p>
                  {errorOrder.items
                    .filter((item) => item.warehouseStock < item.requestedQty)
                    .map((item) => (
                      <div key={item.itemCode} className="ml-2 mb-2">
                        <div className="flex justify-between">
                          <span className="text-red-700">{item.itemName}</span>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span className="text-red-600">요청: {item.requestedQty}{item.unit}</span>
                          <span className="text-red-600">재고: {item.warehouseStock}{item.unit}</span>
                          <span className="text-red-600 font-bold">
                            부족: {item.requestedQty - item.warehouseStock}{item.unit}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-yellow-800">
                <strong>조치 필요:</strong> 긴급 입고 또는 타 지점 재고 이동을
                통해 재고를 확보해주세요.
              </p>
            </div>

            <button
              onClick={() => {
                setShowErrorModal(false);
                setErrorOrder(null);
              }}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal for Pending Orders */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">발주/출고 상세보기</h3>
                <p className="text-sm text-gray-500 mt-1">발주 내역 및 출고 품목 정보</p>
              </div>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedOrder(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Order Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">발주 정보</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">발주서 번호</p>
                  <p className="font-mono text-blue-600 mt-1">{selectedOrder.orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">발주요청지점</p>
                  <p className="font-semibold text-gray-900 mt-1">{selectedOrder.branch}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">발주요청일</p>
                  <p className="text-gray-900 mt-1">{selectedOrder.orderDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">상태</p>
                  <div className="mt-1">
                    {selectedOrder.status === "출고대기" && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        <Package className="w-3 h-3" />
                        출고대기
                      </span>
                    )}
                    {selectedOrder.status === "준비중" && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                        <TrendingUp className="w-3 h-3" />
                        준비중
                      </span>
                    )}
                    {selectedOrder.status === "재고부족" && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        <AlertTriangle className="w-3 h-3" />
                        재고 부족
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                {selectedOrder.status === "출고대기" ? "출고 품목" : "발주 품목"}
              </h4>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                        품목코드
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                        품목명
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                        카테고리
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">
                        발주 요청 수량
                      </th>
                      {selectedOrder.status === "출고대기" && (
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">
                          출고 수량
                        </th>
                      )}
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">
                        창고 재고
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">
                        상태
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item) => {
                      const isInsufficient = item.warehouseStock < item.requestedQty;
                      return (
                        <tr
                          key={item.itemCode}
                          className={`border-b border-gray-100 ${
                            isInsufficient ? "bg-red-50" : ""
                          }`}
                        >
                          <td className="py-3 px-4 font-mono text-sm text-gray-600">
                            {item.itemCode}
                          </td>
                          <td className="py-3 px-4 font-medium text-gray-900">
                            {item.itemName}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                              {item.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right font-semibold text-blue-600">
                            {item.requestedQty}
                            {item.unit}
                          </td>
                          {selectedOrder.status === "출고대기" && (
                            <td className="py-3 px-4 text-right font-semibold text-green-600">
                              {item.confirmedQty}
                              {item.unit}
                            </td>
                          )}
                          <td
                            className={`py-3 px-4 text-right font-semibold ${
                              isInsufficient ? "text-red-600" : "text-green-600"
                            }`}
                          >
                            {item.warehouseStock}
                            {item.unit}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {isInsufficient ? (
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
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedOrder(null);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal for History */}
      {showHistoryDetailModal && selectedHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">발주/출고 상세보기</h3>
                <p className="text-sm text-gray-500 mt-1">출고 완료 내역</p>
              </div>
              <button
                onClick={() => {
                  setShowHistoryDetailModal(false);
                  setSelectedHistory(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Order Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">출고 정보</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">발주서 번호</p>
                  <p className="font-mono text-blue-600 mt-1">{selectedHistory.orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">출고 지점</p>
                  <p className="font-semibold text-gray-900 mt-1">{selectedHistory.branch}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">출고 일시</p>
                  <p className="text-gray-900 mt-1">{selectedHistory.releaseDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">처리자</p>
                  <p className="text-gray-900 mt-1">{selectedHistory.handler}</p>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">출고 품목</h4>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                        품목코드
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                        품목명
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                        카테고리
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">
                        발주 요청 수량
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">
                        출고 수량
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedHistory.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-mono text-sm text-gray-600">
                          {item.itemCode}
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-900">
                          {item.itemName}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-blue-600">
                          {item.requestedQty}
                          {item.unit}
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-green-600">
                          {item.confirmedQty}
                          {item.unit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowHistoryDetailModal(false);
                  setSelectedHistory(null);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
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
