import { useState, useMemo } from "react";
import { BranchMap } from "./BranchMap";
import {
  MapPin,
  Search,
  Send,
  Inbox,
  Clock,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  ArrowLeftRight,
  Package,
  Filter,
  Map,
} from "lucide-react";

interface Branch {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  distance: number;
}

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  stock: number;
}

interface SwapRequest {
  id: string;
  type: "sent" | "received";
  status: "pending" | "approved" | "rejected";
  fromBranch: string;
  toBranch: string;
  itemName: string;
  quantity: number;
  unit: string;
  requestDate: string;
  responseDate?: string;
  message?: string;
}

interface SwapHistory {
  id: string;
  date: string;
  fromBranch: string;
  toBranch: string;
  itemName: string;
  quantity: number;
  unit: string;
  status: "completed";
}

const mockBranches: Branch[] = [
  { id: "b1", name: "강남점", address: "서울 강남구 테헤란로 123", lat: 37.4979, lng: 127.0276, distance: 2.5 },
  { id: "b2", name: "홍대점", address: "서울 마포구 양화로 456", lat: 37.5563, lng: 126.9239, distance: 5.3 },
  { id: "b3", name: "잠실점", address: "서울 송파구 올림픽로 789", lat: 37.5133, lng: 127.1028, distance: 3.8 },
  { id: "b4", name: "신촌점", address: "서울 서대문구 신촌로 321", lat: 37.5559, lng: 126.9368, distance: 6.1 },
  { id: "b5", name: "판교점", address: "경기 성남시 분당구 판교역로 654", lat: 37.3952, lng: 127.1112, distance: 8.7 },
];

const mockItems: InventoryItem[] = [
  { id: "i1", name: "소고기 패티", category: "단백질", unit: "개", stock: 120 },
  { id: "i2", name: "양상추", category: "야채", unit: "kg", stock: 15 },
  { id: "i3", name: "체다치즈", category: "치즈", unit: "장", stock: 80 },
  { id: "i4", name: "허니오트 빵", category: "빵류", unit: "개", stock: 200 },
  { id: "i5", name: "랜치 소스", category: "소스", unit: "L", stock: 10 },
];

const mockSentRequests: SwapRequest[] = [
  {
    id: "sr1",
    type: "sent",
    status: "pending",
    fromBranch: "명동점",
    toBranch: "강남점",
    itemName: "소고기 패티",
    quantity: 20,
    unit: "개",
    requestDate: "2026-04-03 10:30",
  },
  {
    id: "sr2",
    type: "sent",
    status: "approved",
    fromBranch: "명동점",
    toBranch: "홍대점",
    itemName: "양상추",
    quantity: 5,
    unit: "kg",
    requestDate: "2026-04-02 14:20",
    responseDate: "2026-04-02 15:45",
  },
];

const mockReceivedRequests: SwapRequest[] = [
  {
    id: "rr1",
    type: "received",
    status: "pending",
    fromBranch: "잠실점",
    toBranch: "명동점",
    itemName: "허니오트 빵",
    quantity: 30,
    unit: "개",
    requestDate: "2026-04-03 09:15",
    message: "긴급히 필요합니다",
  },
  {
    id: "rr2",
    type: "received",
    status: "pending",
    fromBranch: "신촌점",
    toBranch: "명동점",
    itemName: "랜치 소스",
    quantity: 3,
    unit: "L",
    requestDate: "2026-04-03 11:00",
  },
];

const mockHistory: SwapHistory[] = [
  {
    id: "h1",
    date: "2026-04-02",
    fromBranch: "명동점",
    toBranch: "홍대점",
    itemName: "양상추",
    quantity: 5,
    unit: "kg",
    status: "completed",
  },
  {
    id: "h2",
    date: "2026-04-01",
    fromBranch: "강남점",
    toBranch: "명동점",
    itemName: "체다치즈",
    quantity: 15,
    unit: "장",
    status: "completed",
  },
  {
    id: "h3",
    date: "2026-03-31",
    fromBranch: "명동점",
    toBranch: "잠실점",
    itemName: "소고기 패티",
    quantity: 10,
    unit: "개",
    status: "completed",
  },
];

type PageType = "search" | "sent" | "received" | "history";

export function InventorySwap() {
  const [activePage, setActivePage] = useState<PageType>("search");
  const [selectedItem, setSelectedItem] = useState("");
  const [requestQuantity, setRequestQuantity] = useState("");
  const [maxDistance, setMaxDistance] = useState("10");
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [sentRequests, setSentRequests] = useState<SwapRequest[]>(mockSentRequests);
  const [receivedRequests, setReceivedRequests] = useState<SwapRequest[]>(mockReceivedRequests);
  const [history, setHistory] = useState<SwapHistory[]>(mockHistory);
  
  // History filters
  const [historyStartDate, setHistoryStartDate] = useState("");
  const [historyEndDate, setHistoryEndDate] = useState("");
  
  // Pagination
  const [sentPage, setSentPage] = useState(1);
  const [receivedPage, setReceivedPage] = useState(1);
  const [historyPage, setHistoryPage] = useState(1);
  const itemsPerPage = 5;

  const selectedItemData = mockItems.find((i) => i.id === selectedItem);
  
  // Filter branches by distance and item availability
  const filteredBranches = useMemo(() => {
    if (!selectedItem || !requestQuantity) return [];
    const maxDist = Number(maxDistance);
    return mockBranches.filter((b) => b.distance <= maxDist);
  }, [selectedItem, requestQuantity, maxDistance]);

  // Filter history by date range
  const filteredHistory = useMemo(() => {
    if (!historyStartDate && !historyEndDate) return history;
    return history.filter((h) => {
      const historyDate = new Date(h.date);
      const start = historyStartDate ? new Date(historyStartDate) : null;
      const end = historyEndDate ? new Date(historyEndDate) : null;
      
      if (start && historyDate < start) return false;
      if (end && historyDate > end) return false;
      return true;
    });
  }, [history, historyStartDate, historyEndDate]);

  const handleSendRequest = () => {
    if (!selectedBranch || !selectedItemData || !requestQuantity) return;

    const newRequest: SwapRequest = {
      id: `sr${Date.now()}`,
      type: "sent",
      status: "pending",
      fromBranch: "명동점",
      toBranch: selectedBranch.name,
      itemName: selectedItemData.name,
      quantity: Number(requestQuantity),
      unit: selectedItemData.unit,
      requestDate: new Date().toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setSentRequests([newRequest, ...sentRequests]);
    setShowRequestModal(false);
    setSelectedItem("");
    setRequestQuantity("");
    setSelectedBranch(null);
    alert("재고 교환 요청이 전송되었습니다.");
  };

  const handleApproveRequest = (requestId: string) => {
    setReceivedRequests(
      receivedRequests.map((r) =>
        r.id === requestId ? { ...r, status: "approved" as const, responseDate: new Date().toLocaleString("ko-KR") } : r
      )
    );
    alert("요청을 승인했습니다.");
  };

  const handleRejectRequest = (requestId: string) => {
    setReceivedRequests(
      receivedRequests.map((r) =>
        r.id === requestId ? { ...r, status: "rejected" as const, responseDate: new Date().toLocaleString("ko-KR") } : r
      )
    );
    alert("요청을 거절했습니다.");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">대기중</span>;
      case "approved":
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">승인됨</span>;
      case "rejected":
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">거절됨</span>;
      case "completed":
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">완료</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">재고 교환/요청</h2>
        <p className="text-gray-500 mt-1">지점 간 재고를 교환하고 요청을 관리하세요</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">
                {sentRequests.filter((r) => r.status === "pending").length}건
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500">보낸 요청 (대기중)</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">
                {receivedRequests.filter((r) => r.status === "pending").length}건
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500">받은 요청 (대기중)</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{history.length}건</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">전체 교환 내역</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{mockBranches.length}개</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">주변 지점</p>
        </div>
      </div>

      {/* Page Navigation Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActivePage("search")}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
              activePage === "search"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Map className="w-5 h-5" />
              <span>재고 조회 및 요청</span>
            </div>
          </button>

          <button
            onClick={() => setActivePage("sent")}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
              activePage === "sent"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              <span>보낸 요청</span>
              {sentRequests.filter((r) => r.status === "pending").length > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activePage === "sent" ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-700"
                }`}>
                  {sentRequests.filter((r) => r.status === "pending").length}
                </span>
              )}
            </div>
          </button>

          <button
            onClick={() => setActivePage("received")}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
              activePage === "received"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Inbox className="w-5 h-5" />
              <span>받은 요청</span>
              {receivedRequests.filter((r) => r.status === "pending").length > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activePage === "received" ? "bg-green-700 text-white" : "bg-gray-200 text-gray-700"
                }`}>
                  {receivedRequests.filter((r) => r.status === "pending").length}
                </span>
              )}
            </div>
          </button>

          <button
            onClick={() => setActivePage("history")}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
              activePage === "history"
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              <span>교환 내역</span>
            </div>
          </button>
        </div>
      </div>

      {/* Search & Request Page */}
      {activePage === "search" && (
        <div className="space-y-6">
          {/* Search Form */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">주변 지점 재고 조회</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  필요한 품목 <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">품목을 선택하세요</option>
                  {mockItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  필요 수량 <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={requestQuantity}
                    onChange={(e) => setRequestQuantity(e.target.value)}
                    disabled={!selectedItem}
                    min="1"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    placeholder="수량"
                  />
                  <div className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium min-w-[60px] flex items-center justify-center">
                    {selectedItemData?.unit || "단위"}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  최대 거리 (km)
                </label>
                <select
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="5">5km 이내</option>
                  <option value="10">10km 이내</option>
                  <option value="15">15km 이내</option>
                  <option value="20">20km 이내</option>
                </select>
              </div>
            </div>
          </div>

          {/* Map */}
          {selectedItem && requestQuantity && filteredBranches.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-lg text-gray-900">
                  주변 지점 지도
                  <span className="text-sm text-gray-500 font-normal ml-2">
                    ({filteredBranches.length}개 지점 발견)
                  </span>
                </h3>
              </div>
              <div style={{ height: "400px" }}>
                <BranchMap
                  branches={filteredBranches}
                  onBranchClick={(branch) => {
                    setSelectedBranch(branch);
                    setShowRequestModal(true);
                  }}
                />
              </div>
            </div>
          )}

          {/* No Results Message */}
          {selectedItem && requestQuantity && filteredBranches.length === 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">주변 지점을 찾을 수 없습니다</h3>
              <p className="text-gray-500">
                최대 거리를 늘리거나 다른 품목을 선택해보세요
              </p>
            </div>
          )}

          {/* Branch List */}
          {selectedItem && requestQuantity && filteredBranches.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-lg text-gray-900">상세 지점 정보</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">지점명</th>
                      <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">주소</th>
                      <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">거리</th>
                      <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">액션</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBranches.map((branch) => (
                      <tr key={branch.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-6 font-medium text-gray-900">{branch.name}</td>
                        <td className="py-4 px-6 text-gray-600">{branch.address}</td>
                        <td className="py-4 px-6 text-center text-gray-700">{branch.distance}km</td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => {
                              setSelectedBranch(branch);
                              setShowRequestModal(true);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                          >
                            요청하기
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sent Requests Page */}
      {activePage === "sent" && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-semibold text-lg text-gray-900">보낸 요청</h3>
            <p className="text-sm text-gray-500 mt-1">내가 다른 지점에 요청한 내역입니다</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">요청일시</th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">받는 지점</th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">품목</th>
                  <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">수량</th>
                  <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">상태</th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">응답일시</th>
                </tr>
              </thead>
              <tbody>
                {sentRequests
                  .slice((sentPage - 1) * itemsPerPage, sentPage * itemsPerPage)
                  .map((request) => (
                    <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6 text-gray-700">{request.requestDate}</td>
                      <td className="py-4 px-6 font-medium text-gray-900">{request.toBranch}</td>
                      <td className="py-4 px-6 text-gray-700">{request.itemName}</td>
                      <td className="py-4 px-6 text-right font-semibold text-gray-900">
                        {request.quantity}
                        {request.unit}
                      </td>
                      <td className="py-4 px-6 text-center">{getStatusBadge(request.status)}</td>
                      <td className="py-4 px-6 text-gray-600 text-sm">
                        {request.responseDate || "-"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {sentRequests.length > itemsPerPage && (
            <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setSentPage((p) => Math.max(p - 1, 1))}
                disabled={sentPage === 1}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                이전
              </button>
              <div className="text-sm text-gray-500">
                {sentPage} / {Math.ceil(sentRequests.length / itemsPerPage)}
              </div>
              <button
                onClick={() => setSentPage((p) => Math.min(p + 1, Math.ceil(sentRequests.length / itemsPerPage)))}
                disabled={sentPage === Math.ceil(sentRequests.length / itemsPerPage)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                다음
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Received Requests Page */}
      {activePage === "received" && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-semibold text-lg text-gray-900">받은 요청</h3>
            <p className="text-sm text-gray-500 mt-1">다른 지점에서 요청한 내역입니다</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">요청일시</th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">요청 지점</th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">품목</th>
                  <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">수량</th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">메시지</th>
                  <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">상태</th>
                  <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">액션</th>
                </tr>
              </thead>
              <tbody>
                {receivedRequests
                  .slice((receivedPage - 1) * itemsPerPage, receivedPage * itemsPerPage)
                  .map((request) => (
                    <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6 text-gray-700">{request.requestDate}</td>
                      <td className="py-4 px-6 font-medium text-gray-900">{request.fromBranch}</td>
                      <td className="py-4 px-6 text-gray-700">{request.itemName}</td>
                      <td className="py-4 px-6 text-right font-semibold text-gray-900">
                        {request.quantity}
                        {request.unit}
                      </td>
                      <td className="py-4 px-6 text-gray-600 text-sm">{request.message || "-"}</td>
                      <td className="py-4 px-6 text-center">{getStatusBadge(request.status)}</td>
                      <td className="py-4 px-6 text-center">
                        {request.status === "pending" ? (
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleApproveRequest(request.id)}
                              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 flex items-center gap-1"
                            >
                              <Check className="w-4 h-4" />
                              승인
                            </button>
                            <button
                              onClick={() => handleRejectRequest(request.id)}
                              className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 flex items-center gap-1"
                            >
                              <X className="w-4 h-4" />
                              거절
                            </button>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">처리완료</span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {receivedRequests.length > itemsPerPage && (
            <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setReceivedPage((p) => Math.max(p - 1, 1))}
                disabled={receivedPage === 1}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                이전
              </button>
              <div className="text-sm text-gray-500">
                {receivedPage} / {Math.ceil(receivedRequests.length / itemsPerPage)}
              </div>
              <button
                onClick={() =>
                  setReceivedPage((p) => Math.min(p + 1, Math.ceil(receivedRequests.length / itemsPerPage)))
                }
                disabled={receivedPage === Math.ceil(receivedRequests.length / itemsPerPage)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                다음
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* History Page */}
      {activePage === "history" && (
        <div className="space-y-6">
          {/* Date Filter */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">기간별 조회</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">시작일</label>
                <input
                  type="date"
                  value={historyStartDate}
                  onChange={(e) => setHistoryStartDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">종료일</label>
                <input
                  type="date"
                  value={historyEndDate}
                  onChange={(e) => setHistoryEndDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* History Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-lg text-gray-900">교환 내역</h3>
              <p className="text-sm text-gray-500 mt-1">완료된 재고 교환 내역입니다</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">날짜</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">보낸 지점</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">받은 지점</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">품목</th>
                    <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">수량</th>
                    <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory
                    .slice((historyPage - 1) * itemsPerPage, historyPage * itemsPerPage)
                    .map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-6 text-gray-700">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {item.date}
                          </div>
                        </td>
                        <td className="py-4 px-6 font-medium text-gray-900">{item.fromBranch}</td>
                        <td className="py-4 px-6 font-medium text-gray-900">{item.toBranch}</td>
                        <td className="py-4 px-6 text-gray-700">{item.itemName}</td>
                        <td className="py-4 px-6 text-right font-semibold text-gray-900">
                          {item.quantity}
                          {item.unit}
                        </td>
                        <td className="py-4 px-6 text-center">{getStatusBadge(item.status)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredHistory.length > itemsPerPage && (
              <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
                <button
                  onClick={() => setHistoryPage((p) => Math.max(p - 1, 1))}
                  disabled={historyPage === 1}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  이전
                </button>
                <div className="text-sm text-gray-500">
                  {historyPage} / {Math.ceil(filteredHistory.length / itemsPerPage)}
                </div>
                <button
                  onClick={() =>
                    setHistoryPage((p) => Math.min(p + 1, Math.ceil(filteredHistory.length / itemsPerPage)))
                  }
                  disabled={historyPage === Math.ceil(filteredHistory.length / itemsPerPage)}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  다음
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <Package className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">정산 안내</h4>
                <p className="text-sm text-blue-800">
                  직영점 간 재고 교환은 당장 현금 거래가 발생하지 않지만, 월말 정산 시 본사 재무팀이 각 지점의
                  원가를 정확히 계산하는 데 활용됩니다. 모든 교환 내역은 자동으로 기록되며, 증빙 자료로
                  보관됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Modal */}
      {showRequestModal && selectedBranch && selectedItemData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <Send className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">재고 교환 요청</h3>
                <p className="text-sm text-gray-500">요청 내용을 확인해주세요</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">받는 지점</span>
                <span className="text-sm font-semibold text-gray-900">{selectedBranch.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">거리</span>
                <span className="text-sm font-semibold text-gray-900">{selectedBranch.distance}km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">요청 품목</span>
                <span className="text-sm font-semibold text-gray-900">{selectedItemData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">요청 수량</span>
                <span className="text-sm font-semibold text-blue-600">
                  {requestQuantity}
                  {selectedItemData.unit}
                </span>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-yellow-800">
                요청을 보내면 상대 지점에서 승인/거절을 결정합니다.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRequestModal(false);
                  setSelectedBranch(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSendRequest}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                요청 보내기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
