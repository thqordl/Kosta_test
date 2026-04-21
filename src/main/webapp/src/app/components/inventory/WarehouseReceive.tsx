import { useState } from "react";
import {
  Search,
  Calendar,
  DollarSign,
  Package,
  TrendingUp,
  CheckCircle,
  Building2,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

interface ReceiveRecord {
  id: string;
  date: string;
  time: string;
  supplier: string;
  itemCode: string;
  itemName: string;
  category: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  expiryDate: string;
  handler: string;
  status: "completed";
}

const mockReceiveHistory: ReceiveRecord[] = [
  {
    id: "r1",
    date: "2026-03-29",
    time: "10:30",
    supplier: "(주)프레시미트",
    itemCode: "MEAT-001",
    itemName: "소고기 패티",
    category: "육류",
    quantity: 500,
    unit: "개",
    unitPrice: 25000,
    totalPrice: 12500000,
    expiryDate: "2026-04-15",
    handler: "김철수",
    status: "completed",
  },
  {
    id: "r2",
    date: "2026-03-29",
    time: "09:15",
    supplier: "(주)유진유업",
    itemCode: "DAIRY-001",
    itemName: "생크림",
    category: "유제품",
    quantity: 100,
    unit: "L",
    unitPrice: 30000,
    totalPrice: 3000000,
    expiryDate: "2026-04-20",
    handler: "이영희",
    status: "completed",
  },
  {
    id: "r3",
    date: "2026-03-28",
    time: "14:20",
    supplier: "(주)신선농산",
    itemCode: "VEG-001",
    itemName: "감자",
    category: "채소",
    quantity: 300,
    unit: "kg",
    unitPrice: 2500,
    totalPrice: 750000,
    expiryDate: "2026-04-28",
    handler: "박민수",
    status: "completed",
  },
  {
    id: "r4",
    date: "2026-03-28",
    time: "11:00",
    supplier: "(주)베이커리월드",
    itemCode: "BREAD-001",
    itemName: "버거빵",
    category: "빵류",
    quantity: 1000,
    unit: "개",
    unitPrice: 500,
    totalPrice: 500000,
    expiryDate: "2026-04-10",
    handler: "김철수",
    status: "completed",
  },
  {
    id: "r5",
    date: "2026-03-27",
    time: "16:45",
    supplier: "(주)신선농산",
    itemCode: "VEG-002",
    itemName: "양상추",
    category: "채소",
    quantity: 150,
    unit: "kg",
    unitPrice: 5000,
    totalPrice: 750000,
    expiryDate: "2026-04-05",
    handler: "이영희",
    status: "completed",
  },
];

const suppliers = [
  "(주)프레시미트",
  "(주)유진유업",
  "(주)신선농산",
  "(주)베이커리월드",
  "(주)글로벌푸드",
  "(주)한국식품",
];

const availableItems = [
  { code: "MEAT-001", name: "소고기 패티", category: "육류", unit: "개" },
  { code: "DAIRY-001", name: "생크림", category: "유제품", unit: "L" },
  { code: "VEG-001", name: "감자", category: "채소", unit: "kg" },
  { code: "VEG-002", name: "양상추", category: "채소", unit: "kg" },
  { code: "BREAD-001", name: "버거빵", category: "빵류", unit: "개" },
  { code: "DAIRY-002", name: "체다치즈", category: "유제품", unit: "장" },
  { code: "SAUCE-001", name: "식용유", category: "조미료", unit: "L" },
  { code: "BEV-001", name: "콜라 시럽", category: "음료", unit: "L" },
];

export function WarehouseReceive() {
  const [supplier, setSupplier] = useState("");
  const [itemSearch, setItemSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [receiveHistory, setReceiveHistory] =
    useState<ReceiveRecord[]>(mockReceiveHistory);
  const [showItemSelect, setShowItemSelect] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filters
  const [filterSupplier, setFilterSupplier] = useState("전체");
  const [filterCategory, setFilterCategory] = useState("전체");
  const [filterItemName, setFilterItemName] = useState("전체");
  const [filterStartDate, setFilterStartDate] = useState("2026-03-01");
  const [filterEndDate, setFilterEndDate] = useState("2026-04-05");

  const selectedItemData = availableItems.find((i) => i.code === selectedItem);
  const totalPrice =
    Number(quantity) * Number(unitPrice) || 0;

  const categories = ["전체", "육류", "채소", "유제품", "빵류", "음료", "조미료"];
  const allSuppliers = ["전체", ...suppliers];
  const allItemNames = ["전체", ...Array.from(new Set(availableItems.map(item => item.name)))];

  const filteredItems = availableItems.filter(
    (item) =>
      item.name.toLowerCase().includes(itemSearch.toLowerCase()) ||
      item.code.toLowerCase().includes(itemSearch.toLowerCase())
  );

  // Filter receive history based on filters
  const filteredHistory = receiveHistory.filter((record) => {
    const matchesSupplier =
      filterSupplier === "전체" || record.supplier === filterSupplier;
    const matchesCategory =
      filterCategory === "전체" || record.category === filterCategory;
    const matchesItemName =
      filterItemName === "전체" || record.itemName === filterItemName;
    const recordDate = new Date(record.date);
    const start = new Date(filterStartDate);
    const end = new Date(filterEndDate);
    const matchesDate = recordDate >= start && recordDate <= end;
    return matchesSupplier && matchesCategory && matchesItemName && matchesDate;
  });

  const handleReceive = () => {
    if (!supplier || !selectedItem || !quantity || !unitPrice || !expiryDate) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    const newRecord: ReceiveRecord = {
      id: `r${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      supplier,
      itemCode: selectedItemData!.code,
      itemName: selectedItemData!.name,
      category: selectedItemData!.category,
      quantity: Number(quantity),
      unit: selectedItemData!.unit,
      unitPrice: Number(unitPrice),
      totalPrice: Number(quantity) * Number(unitPrice),
      expiryDate,
      handler: "김철수", // 현재 로그인한 사용자
      status: "completed",
    };

    setReceiveHistory([newRecord, ...receiveHistory]);
    resetForm();
    setShowForm(false);
    alert("입고 처리가 완료되었습니다.");
  };

  const resetForm = () => {
    setSupplier("");
    setItemSearch("");
    setSelectedItem("");
    setQuantity("");
    setUnitPrice("");
    setExpiryDate("");
    setShowItemSelect(false);
  };

  // Calculate statistics based on filtered date range
  const rangeTotal = filteredHistory.reduce((sum, r) => sum + r.totalPrice, 0);

  // Pagination
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecords = filteredHistory.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">본사 물류창고 입고</h2>
          <p className="text-gray-500 mt-1">
            신규 입고를 등록하고 입고 이력을 관리하세요
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          신규 입고 등록
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              공급사 선택
            </label>
            <select
              value={filterSupplier}
              onChange={(e) => setFilterSupplier(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
            >
              {allSuppliers.map((supplier) => (
                <option key={supplier} value={supplier}>
                  {supplier}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리 선택
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              품목명 선택
            </label>
            <select
              value={filterItemName}
              onChange={(e) => setFilterItemName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
            >
              {allItemNames.map((itemName) => (
                <option key={itemName} value={itemName}>
                  {itemName}
                </option>
              ))}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">
                {filteredHistory.length}건
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500">기간 내 입고 건수</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">
                ₩{(rangeTotal / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500">기간 내 입고 금액</p>
        </div>
      </div>

      {/* Receive Form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                신규 입고 등록
              </h3>
              <p className="text-xs text-gray-500">
                공급사와 품목 정보를 입력하세요
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Supplier Selection */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                공급사 선택 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">공급사를 선택하세요</option>
                  {suppliers.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Item Selection */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                품목 검색 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                <input
                  type="text"
                  placeholder="품목명 또는 품목코드를 입력하세요..."
                  value={itemSearch}
                  onChange={(e) => {
                    setItemSearch(e.target.value);
                    setShowItemSelect(true);
                  }}
                  onFocus={() => setShowItemSelect(true)}
                  className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {showItemSelect && filteredItems.length > 0 && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {filteredItems.map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          setSelectedItem(item.code);
                          setItemSearch(item.name);
                          setShowItemSelect(false);
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-gray-50 transition-colors"
                      >
                        <div className="text-sm font-medium text-gray-900">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.code} · {item.category}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {selectedItemData && (
                <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        {selectedItemData.name}
                      </p>
                      <p className="text-xs text-blue-600">
                        {selectedItemData.code} · {selectedItemData.category} ·
                        단위: {selectedItemData.unit}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedItem("");
                        setItemSearch("");
                      }}
                      className="text-xs text-blue-600 hover:text-blue-700"
                    >
                      변경
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Quantity */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  입고 수량 <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    disabled={!selectedItem}
                    min="1"
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    placeholder="수량 입력"
                  />
                  <div className="px-3 py-1.5 bg-gray-100 rounded-lg text-gray-700 text-sm font-medium min-w-[50px] flex items-center justify-center">
                    {selectedItemData?.unit || "단위"}
                  </div>
                </div>
              </div>

              {/* Unit Price */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  매입 단가 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                    disabled={!selectedItem}
                    min="0"
                    className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    placeholder="단가 입력"
                  />
                </div>
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  유통기한 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    disabled={!selectedItem}
                    className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Total Price Display */}
            {totalPrice > 0 && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-900">
                    총 매입 금액
                  </span>
                  <span className="text-xl font-bold text-green-900">
                    ₩{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={resetForm}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                초기화
              </button>
              <button
                onClick={handleReceive}
                disabled={
                  !supplier ||
                  !selectedItem ||
                  !quantity ||
                  !unitPrice ||
                  !expiryDate
                }
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                입고 등록
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receive History */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-lg text-gray-900">입고 이력</h3>
          <p className="text-sm text-gray-500 mt-1">최근 입고 내역을 확인하세요</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  입고 일시
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  공급사
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  품목코드
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  품목명
                </th>
                <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                  수량
                </th>
                <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                  단가
                </th>
                <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                  총액
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  유통기한
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  처리자
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6 text-gray-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="font-medium">{record.date}</div>
                        <div className="text-xs text-gray-500">
                          {record.time}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-900">{record.supplier}</td>
                  <td className="py-4 px-6 font-mono text-sm text-gray-600">
                    {record.itemCode}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {record.itemName}
                  </td>
                  <td className="py-4 px-6 text-right font-semibold text-blue-600">
                    {record.quantity}
                    {record.unit}
                  </td>
                  <td className="py-4 px-6 text-right text-gray-900">
                    ₩{record.unitPrice.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-right font-bold text-gray-900">
                    ₩{record.totalPrice.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-gray-700 text-sm">
                    {record.expiryDate}
                  </td>
                  <td className="py-4 px-6 text-gray-700">{record.handler}</td>
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
      </div>
    </div>
  );
}