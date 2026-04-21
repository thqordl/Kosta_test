import { useState } from "react";
import {
  Trash2,
  AlertCircle,
  CheckCircle,
  Calendar,
  User,
  Plus,
  ChevronLeft,
  ChevronRight,
  Package,
  Search,
  Download,
  TrendingUp,
  TrendingDown,
  Filter,
  FileText,
} from "lucide-react";

// Types
interface DisposalRecord {
  id: string;
  inventoryCode: string;
  date: string;
  itemName: string;
  category: string;
  quantity: number;
  unit: string;
  reason: string;
  reasonDetail: string;
  handler: string;
  status: "completed";
}

interface InventoryHistory {
  id: string;
  inventoryCode: string;
  date: string;
  time: string;
  itemName: string;
  type: "입고" | "출고" | "폐기" | "조정";
  quantityChange: number;
  afterQuantity: number;
  unit: string;
  handler: string;
  note: string;
}

// Mock Data
const mockDisposalHistory: DisposalRecord[] = [
  {
    id: "d1",
    inventoryCode: "INV-2024-001",
    date: "2026-03-28 14:30",
    itemName: "소고기 패티",
    category: "육류",
    quantity: 10,
    unit: "개",
    reason: "유통기한 만료",
    reasonDetail: "유통기한 초과로 인한 폐기",
    handler: "김철수 (지점장)",
    status: "completed",
  },
  {
    id: "d2",
    inventoryCode: "INV-2024-003",
    date: "2026-03-27 11:20",
    itemName: "양상추",
    category: "채소",
    quantity: 3,
    unit: "kg",
    reason: "품질 불량",
    reasonDetail: "변색 및 신선도 저하",
    handler: "이영희 (매니저)",
    status: "completed",
  },
  {
    id: "d3",
    inventoryCode: "INV-2024-002",
    date: "2026-03-26 16:45",
    itemName: "생크림",
    category: "유제품",
    quantity: 2,
    unit: "L",
    reason: "유통기한 만료",
    reasonDetail: "유통기한 초과",
    handler: "김철수 (지점장)",
    status: "completed",
  },
  {
    id: "d4",
    inventoryCode: "INV-2024-005",
    date: "2026-03-25 10:15",
    itemName: "토마토",
    category: "채소",
    quantity: 5,
    unit: "kg",
    reason: "품질 불량",
    reasonDetail: "곰팡이 발생",
    handler: "박민수 (직원)",
    status: "completed",
  },
  {
    id: "d5",
    inventoryCode: "INV-2024-007",
    date: "2026-03-24 09:30",
    itemName: "버거빵",
    category: "빵류",
    quantity: 20,
    unit: "개",
    reason: "기타",
    reasonDetail: "배송 중 파손",
    handler: "이영희 (매니저)",
    status: "completed",
  },
];

const mockHistory: InventoryHistory[] = [
  {
    id: "h1",
    inventoryCode: "INV-2024-001",
    date: "2026-03-29",
    time: "09:30",
    itemName: "소고기 패티",
    type: "입고",
    quantityChange: 50,
    afterQuantity: 95,
    unit: "개",
    handler: "김철수 (지점장)",
    note: "정기 발주 입고",
  },
  {
    id: "h2",
    inventoryCode: "INV-2024-003",
    date: "2026-03-29",
    time: "12:15",
    itemName: "양상추",
    type: "출고",
    quantityChange: -5,
    afterQuantity: 8,
    unit: "kg",
    handler: "박민수 (주방)",
    note: "점심 피크타임 사용",
  },
  {
    id: "h3",
    inventoryCode: "INV-2024-001",
    date: "2026-03-28",
    time: "14:30",
    itemName: "소고기 패티",
    type: "폐기",
    quantityChange: -10,
    afterQuantity: 45,
    unit: "개",
    handler: "김철수 (지점장)",
    note: "유통기한 만료",
  },
  {
    id: "h4",
    inventoryCode: "INV-2024-007",
    date: "2026-03-28",
    time: "10:00",
    itemName: "버거빵",
    type: "입고",
    quantityChange: 100,
    afterQuantity: 180,
    unit: "개",
    handler: "이영희 (매니저)",
    note: "긴급 발주 입고",
  },
  {
    id: "h5",
    inventoryCode: "INV-2024-002",
    date: "2026-03-28",
    time: "18:45",
    itemName: "생크림",
    type: "출고",
    quantityChange: -3,
    afterQuantity: 12,
    unit: "L",
    handler: "최지훈 (직원)",
    note: "디저트 제조",
  },
  {
    id: "h6",
    inventoryCode: "INV-2024-003",
    date: "2026-03-27",
    time: "11:20",
    itemName: "양상추",
    type: "폐기",
    quantityChange: -3,
    afterQuantity: 13,
    unit: "kg",
    handler: "이영희 (매니저)",
    note: "품질 불량 - 변색",
  },
  {
    id: "h7",
    inventoryCode: "INV-2024-006",
    date: "2026-03-27",
    time: "09:00",
    itemName: "감자",
    type: "입고",
    quantityChange: 30,
    afterQuantity: 45,
    unit: "kg",
    handler: "김철수 (지점장)",
    note: "정기 발주 입고",
  },
  {
    id: "h8",
    inventoryCode: "INV-2024-004",
    date: "2026-03-27",
    time: "15:30",
    itemName: "체다치즈",
    type: "조정",
    quantityChange: -5,
    afterQuantity: 30,
    unit: "장",
    handler: "이영희 (매니저)",
    note: "재고 실사 후 조정",
  },
  {
    id: "h9",
    inventoryCode: "INV-2024-002",
    date: "2026-03-26",
    time: "16:45",
    itemName: "생크림",
    type: "폐기",
    quantityChange: -2,
    afterQuantity: 15,
    unit: "L",
    handler: "김철수 (지점장)",
    note: "유통기한 초과",
  },
  {
    id: "h10",
    inventoryCode: "INV-2024-005",
    date: "2026-03-26",
    time: "10:30",
    itemName: "토마토",
    type: "입고",
    quantityChange: 20,
    afterQuantity: 35,
    unit: "kg",
    handler: "박민수 (직원)",
    note: "정기 발주 입고",
  },
];

const availableItems = [
  { id: "i1", name: "소고기 패티", category: "육류", unit: "개", stock: 45, inventoryCode: "INV-2024-001" },
  { id: "i2", name: "생크림", category: "유제품", unit: "L", stock: 12, inventoryCode: "INV-2024-002" },
  { id: "i3", name: "양상추", category: "채소", unit: "kg", stock: 8, inventoryCode: "INV-2024-003" },
  { id: "i4", name: "체다치즈", category: "유제품", unit: "장", stock: 30, inventoryCode: "INV-2024-004" },
  { id: "i5", name: "토마토", category: "채소", unit: "kg", stock: 15, inventoryCode: "INV-2024-005" },
  { id: "i6", name: "버거빵", category: "빵류", unit: "개", stock: 80, inventoryCode: "INV-2024-007" },
  { id: "i7", name: "감자", category: "채소", unit: "kg", stock: 15, inventoryCode: "INV-2024-006" },
  { id: "i8", name: "식용유", category: "조미료", unit: "L", stock: 5, inventoryCode: "INV-2024-009" },
];

const disposalReasons = [
  { value: "유통기한 만료", label: "유통기한 만료" },
  { value: "품질 불량", label: "품질 불량" },
  { value: "기타", label: "기타" },
];

const historyTypes = ["전체", "입고", "출고", "폐기", "조정"];

type TabType = "disposal" | "history";

export function InventoryMovement() {
  const [activeTab, setActiveTab] = useState<TabType>("disposal");

  // Disposal states
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [reasonDetail, setReasonDetail] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [disposalHistory, setDisposalHistory] = useState<DisposalRecord[]>(mockDisposalHistory);
  const [disposalPage, setDisposalPage] = useState(1);

  // History states
  const [startDate, setStartDate] = useState("2026-03-20");
  const [endDate, setEndDate] = useState("2026-03-29");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedItemName, setSelectedItemName] = useState("전체");
  const [selectedType, setSelectedType] = useState("전체");

  // Get unique categories from history
  const historyCategories = ["전체", ...Array.from(new Set(
    mockHistory.map(item => {
      const inventoryItem = availableItems.find(ai => ai.name === item.itemName);
      return inventoryItem?.category || "기타";
    })
  ))];

  // Get available item names based on selected category
  const availableItemNamesForHistory = ["전체", ...Array.from(new Set(
    mockHistory
      .filter(item => {
        if (selectedCategory === "전체") return true;
        const inventoryItem = availableItems.find(ai => ai.name === item.itemName);
        return inventoryItem?.category === selectedCategory;
      })
      .map(item => item.itemName)
  ))];

  // Reset item name when category changes
  const handleHistoryCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedItemName("전체");
  };

  const itemsPerPage = 10;
  const selectedItemData = availableItems.find((i) => i.id === selectedItem);

  // Disposal handlers
  const handleDisposal = () => {
    if (!selectedItem || !quantity || !reason) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    const qty = Number(quantity);
    if (qty <= 0 || qty > (selectedItemData?.stock || 0)) {
      alert("올바른 수량을 입력해주세요.");
      return;
    }

    setShowConfirmModal(true);
  };

  const confirmDisposal = () => {
    const newRecord: DisposalRecord = {
      id: `d${Date.now()}`,
      inventoryCode: selectedItemData!.inventoryCode,
      date: new Date().toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      itemName: selectedItemData!.name,
      category: selectedItemData!.category,
      quantity: Number(quantity),
      unit: selectedItemData!.unit,
      reason,
      reasonDetail: reasonDetail || reason,
      handler: "김철수 (지점장)",
      status: "completed",
    };

    setDisposalHistory([newRecord, ...disposalHistory]);
    setShowConfirmModal(false);
    setShowFormModal(false);
    resetForm();
    alert("폐기 처리가 완료되었습니다.");
  };

  const resetForm = () => {
    setSelectedItem("");
    setQuantity("");
    setReason("");
    setReasonDetail("");
  };

  // Disposal pagination
  const totalDisposalPages = Math.ceil(disposalHistory.length / itemsPerPage);
  const disposalStartIndex = (disposalPage - 1) * itemsPerPage;
  const currentDisposalRecords = disposalHistory.slice(disposalStartIndex, disposalStartIndex + itemsPerPage);

  // Today's disposal statistics
  const today = new Date().toISOString().split("T")[0];
  const todayRecords = disposalHistory.filter((r) => r.date.includes(today));
  const todayTotal = todayRecords.reduce((sum, r) => sum + r.quantity, 0);

  // History filters
  const filteredHistory = mockHistory.filter((item) => {
    const matchesDate = item.date >= startDate && item.date <= endDate;
    const matchesItemName = selectedItemName === "전체" || item.itemName === selectedItemName;
    const matchesType = selectedType === "전체" || item.type === selectedType;
    const matchesCategory = selectedCategory === "전체" || 
      availableItems.find(ai => ai.name === item.itemName)?.category === selectedCategory;
    return matchesDate && matchesItemName && matchesType && matchesCategory;
  });

  // History statistics
  const historyStats = {
    total: filteredHistory.length,
    receive: filteredHistory.filter((i) => i.type === "입고").length,
    release: filteredHistory.filter((i) => i.type === "출고").length,
    disposal: filteredHistory.filter((i) => i.type === "폐기").length,
    adjustment: filteredHistory.filter((i) => i.type === "조정").length,
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "입고":
        return <TrendingUp className="w-4 h-4" />;
      case "출고":
        return <TrendingDown className="w-4 h-4" />;
      case "폐기":
        return <Trash2 className="w-4 h-4" />;
      case "조정":
        return <Package className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "입고":
        return "bg-green-100 text-green-700";
      case "출고":
        return "bg-blue-100 text-blue-700";
      case "폐기":
        return "bg-red-100 text-red-700";
      case "조정":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleExcelDownload = () => {
    const headers = ["일시", "재료명", "유형", "수량 변화", "처리 후 수량", "처리자", "비고"];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      filteredHistory
        .map((item) =>
          [
            `${item.date} ${item.time}`,
            item.itemName,
            item.type,
            `${item.quantityChange > 0 ? "+" : ""}${item.quantityChange}${item.unit}`,
            `${item.afterQuantity}${item.unit}`,
            item.handler,
            item.note,
          ].join(",")
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `재고이력_${startDate}_${endDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">재고 변동</h2>
        <p className="text-gray-500 mt-1">재고 폐기 처리와 이력을 관리하세요</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <h3 className="font-semibold text-gray-900">필터</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">시작일</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
            <select
              value={selectedCategory}
              onChange={(e) => handleHistoryCategoryChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {historyCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">품목명</label>
            <select
              value={selectedItemName}
              onChange={(e) => setSelectedItemName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {availableItemNamesForHistory.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("disposal")}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "disposal"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Trash2 className="w-5 h-5" />
              <span>재고 폐기 처리</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "history"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <FileText className="w-5 h-5" />
              <span>재고 이력</span>
            </div>
          </button>
        </div>
      </div>

      {/* Disposal Tab */}
      {activeTab === "disposal" && (
        <div className="space-y-6">
          {/* Header with Add Button */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">재고 폐기 처리</h3>
              <p className="text-sm text-gray-500 mt-1">폐기할 재고를 등록하세요</p>
            </div>
            <button
              onClick={() => setShowFormModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              폐기 처리 등록
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{todayRecords.length}건</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">오늘 폐기</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{todayTotal}개</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">오늘 폐기 수량</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{disposalHistory.length}건</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">전체 폐기 이력</p>
            </div>
          </div>

          {/* Disposal History Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-lg text-gray-900">폐기 이력</h3>
              <p className="text-sm text-gray-500 mt-1">최근 폐기 처리 내역을 확인하세요</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">재고 번호</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">처리 일시</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">재료명</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">카테고리</th>
                    <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">폐기 수량</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">폐기 사유</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">처리자</th>
                    <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDisposalRecords.map((record) => (
                    <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6 text-gray-600 font-mono text-sm">
                        {record.inventoryCode}
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {record.date}
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900">{record.itemName}</td>
                      <td className="py-4 px-6 text-gray-600">{record.category}</td>
                      <td className="py-4 px-6 text-right font-semibold text-red-600">
                        {record.quantity}{record.unit}
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <span className="font-medium text-gray-900">{record.reason}</span>
                          {record.reasonDetail && record.reasonDetail !== record.reason && (
                            <p className="text-sm text-gray-500 mt-1">{record.reasonDetail}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          {record.handler}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <CheckCircle className="w-4 h-4" />
                          완료
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {disposalHistory.length > itemsPerPage && (
              <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
                <button
                  onClick={() => setDisposalPage((prev) => Math.max(prev - 1, 1))}
                  disabled={disposalPage === 1}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  이전
                </button>
                <div className="text-sm text-gray-500">
                  {disposalPage} / {totalDisposalPages}
                </div>
                <button
                  onClick={() => setDisposalPage((prev) => Math.min(prev + 1, totalDisposalPages))}
                  disabled={disposalPage === totalDisposalPages}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  다음
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <div className="space-y-6">
          {/* Header with Excel Button */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">재고 이력</h3>
              <p className="text-sm text-gray-500 mt-1">재고 입출고 내역을 조회하고 분석하세요</p>
            </div>
            <button
              onClick={handleExcelDownload}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-5 h-5" />
              엑셀 다운로드
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-xl font-bold text-gray-900">{historyStats.total}</p>
              <p className="text-xs text-gray-500 mt-1">전체 이력</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-xl font-bold text-green-600">{historyStats.receive}</p>
              <p className="text-xs text-gray-500 mt-1">입고</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <TrendingDown className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-xl font-bold text-blue-600">{historyStats.release}</p>
              <p className="text-xs text-gray-500 mt-1">출고</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <Trash2 className="w-8 h-8 text-red-400" />
              </div>
              <p className="text-xl font-bold text-red-600">{historyStats.disposal}</p>
              <p className="text-xs text-gray-500 mt-1">폐기</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <Package className="w-8 h-8 text-yellow-400" />
              </div>
              <p className="text-xl font-bold text-yellow-600">{historyStats.adjustment}</p>
              <p className="text-xs text-gray-500 mt-1">조정</p>
            </div>
          </div>

          {/* Type Filter */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">이동 유형</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {historyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* History Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">재고 번호</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">일시</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">재료명</th>
                    <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">유형</th>
                    <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">수량 변화</th>
                    <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">처리 후 수량</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">처리자</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">비고</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-6 text-gray-600 font-mono text-sm">
                        {item.inventoryCode}
                      </td>
                      <td className="py-3 px-6 text-gray-700">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <div className="font-medium text-sm">{item.date}</div>
                            <div className="text-xs text-gray-500">{item.time}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-6 font-medium text-gray-900">{item.itemName}</td>
                      <td className="py-3 px-6 text-center">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                          {getTypeIcon(item.type)}
                          {item.type}
                        </span>
                      </td>
                      <td className={`py-3 px-6 text-right font-semibold ${item.quantityChange > 0 ? "text-green-600" : "text-red-600"}`}>
                        {item.quantityChange > 0 ? "+" : ""}
                        {item.quantityChange}{item.unit}
                      </td>
                      <td className="py-3 px-6 text-right font-semibold text-gray-900">
                        {item.afterQuantity}{item.unit}
                      </td>
                      <td className="py-3 px-6 text-gray-700">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{item.handler}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-gray-600 text-sm">{item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredHistory.length === 0 && (
              <div className="py-12 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">이력이 없습니다</p>
                <p className="text-gray-400 text-sm">검색 조건을 변경하거나 날짜 범위를 조정해보세요</p>
              </div>
            )}
          </div>

          {/* Summary */}
          {filteredHistory.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">{startDate} ~ {endDate}</span> 기간 동안{" "}
                <span className="font-semibold">총 {filteredHistory.length}건</span>의 재고 이동이 발생했습니다.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">폐기 처리 등록</h3>
                <p className="text-sm text-gray-500">폐기할 재료와 사유를 입력하세요</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  재료 선택 <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedItem}
                  onChange={(e) => {
                    setSelectedItem(e.target.value);
                    setQuantity("");
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">재료를 선택하세요</option>
                  {availableItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.category}) - 현재 재고: {item.stock}{item.unit}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  폐기 수량 <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    disabled={!selectedItem}
                    min="1"
                    max={selectedItemData?.stock || 0}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    placeholder="폐기할 수량을 입력하세요"
                  />
                  <div className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium min-w-[60px] flex items-center justify-center">
                    {selectedItemData?.unit || "단위"}
                  </div>
                </div>
                {selectedItemData && (
                  <p className="text-sm text-gray-500 mt-1">
                    현재 재고: {selectedItemData.stock}{selectedItemData.unit}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  폐기 사유 <span className="text-red-500">*</span>
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">사유를 선택하세요</option>
                  {disposalReasons.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">상세 사유 (선택)</label>
                <textarea
                  value={reasonDetail}
                  onChange={(e) => setReasonDetail(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="폐기 사유에 대한 상세 내용을 입력하세요"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowFormModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleDisposal}
                  disabled={!selectedItem || !quantity || !reason}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  폐기 처리
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && selectedItemData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">폐기 처리 확인</h3>
                <p className="text-sm text-gray-500">아래 내용을 확인해주세요</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">재료명</span>
                <span className="text-sm font-semibold text-gray-900">{selectedItemData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">폐기 수량</span>
                <span className="text-sm font-semibold text-red-600">
                  {quantity}{selectedItemData.unit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">폐기 사유</span>
                <span className="text-sm font-semibold text-gray-900">{reason}</span>
              </div>
              {reasonDetail && (
                <div className="pt-2 border-t border-gray-200">
                  <span className="text-sm text-gray-600">상세 사유</span>
                  <p className="text-sm text-gray-900 mt-1">{reasonDetail}</p>
                </div>
              )}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-yellow-800">
                폐기 처리 후에는 복구할 수 없습니다. 계속하시겠습니까?
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={confirmDisposal}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}