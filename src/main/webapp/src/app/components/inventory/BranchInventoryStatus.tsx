import { useState } from "react";
import { Search, AlertTriangle, CheckCircle, Package, ChevronLeft, ChevronRight, Filter } from "lucide-react";

interface BranchStock {
  branch: string;
  quantity: number;
  status: "normal" | "low" | "out";
}

interface ItemStock {
  id: string;
  itemCode: string;
  itemName: string;
  category: string;
  unit: string;
  safetyStock: number;
  currentStock: number;
  branches: BranchStock[];
  total: number;
  status: "normal" | "low" | "out";
  lastUpdated: string;
  branchName?: string;
}

const mockItemStocks: ItemStock[] = [
  {
    id: "1",
    itemCode: "MEAT-001",
    itemName: "소고기 패티",
    category: "육류",
    unit: "개",
    safetyStock: 50,
    currentStock: 45,
    status: "low",
    lastUpdated: "2026-04-01 09:30",
    branches: [
      { branch: "강남점", quantity: 45, status: "low" },
      { branch: "홍대점", quantity: 32, status: "low" },
      { branch: "신촌점", quantity: 38, status: "low" },
      { branch: "이대점", quantity: 42, status: "low" },
      { branch: "본사 물류창고", quantity: 250, status: "normal" },
    ],
    total: 407,
  },
  {
    id: "1-out",
    itemCode: "MEAT-001",
    itemName: "소고기 패티",
    category: "육류",
    unit: "개",
    safetyStock: 50,
    currentStock: 0,
    status: "out",
    lastUpdated: "2026-04-01 09:30",
    branches: [
      { branch: "압구정점", quantity: 0, status: "out" },
    ],
    total: 0,
  },
  {
    id: "2",
    itemCode: "VEG-001",
    itemName: "감자",
    category: "채소",
    unit: "kg",
    safetyStock: 50,
    currentStock: 15,
    status: "low",
    lastUpdated: "2026-04-01 10:15",
    branches: [
      { branch: "강남점", quantity: 15, status: "low" },
      { branch: "홍대점", quantity: 22, status: "low" },
      { branch: "신촌점", quantity: 28, status: "low" },
      { branch: "이대점", quantity: 25, status: "low" },
      { branch: "본사 물류창고", quantity: 180, status: "normal" },
    ],
    total: 270,
  },
  {
    id: "3",
    itemCode: "DAIRY-001",
    itemName: "생크림",
    category: "유제품",
    unit: "L",
    safetyStock: 15,
    currentStock: 12,
    status: "low",
    lastUpdated: "2026-04-01 08:45",
    branches: [
      { branch: "강남점", quantity: 12, status: "low" },
      { branch: "홍대점", quantity: 13, status: "low" },
      { branch: "신촌점", quantity: 14, status: "low" },
      { branch: "이대점", quantity: 11, status: "low" },
      { branch: "본사 물류창고", quantity: 65, status: "normal" },
    ],
    total: 115,
  },
  {
    id: "4",
    itemCode: "VEG-002",
    itemName: "양상추",
    category: "채소",
    unit: "kg",
    safetyStock: 20,
    currentStock: 8,
    status: "low",
    lastUpdated: "2026-04-01 11:20",
    branches: [
      { branch: "강남점", quantity: 8, status: "low" },
      { branch: "홍대점", quantity: 10, status: "low" },
      { branch: "신촌점", quantity: 12, status: "low" },
      { branch: "이대점", quantity: 9, status: "low" },
      { branch: "본사 물류창고", quantity: 85, status: "normal" },
    ],
    total: 124,
  },
  {
    id: "5",
    itemCode: "BREAD-001",
    itemName: "버거빵",
    category: "빵류",
    unit: "개",
    safetyStock: 150,
    currentStock: 80,
    status: "low",
    lastUpdated: "2026-04-01 07:30",
    branches: [
      { branch: "강남점", quantity: 80, status: "low" },
      { branch: "홍대점", quantity: 120, status: "low" },
      { branch: "신촌점", quantity: 135, status: "low" },
      { branch: "이대점", quantity: 145, status: "low" },
      { branch: "본사 물류창고", quantity: 650, status: "normal" },
    ],
    total: 1130,
  },
  {
    id: "6",
    itemCode: "DAIRY-002",
    itemName: "체다치즈",
    category: "유제품",
    unit: "장",
    safetyStock: 25,
    currentStock: 30,
    status: "normal",
    lastUpdated: "2026-04-01 09:00",
    branches: [
      { branch: "강남점", quantity: 30, status: "normal" },
      { branch: "홍대점", quantity: 27, status: "normal" },
      { branch: "신촌점", quantity: 28, status: "normal" },
      { branch: "이대점", quantity: 26, status: "normal" },
      { branch: "본사 물류창고", quantity: 150, status: "normal" },
    ],
    total: 261,
  },
  {
    id: "7",
    itemCode: "SAUCE-001",
    itemName: "식용유",
    category: "조미료",
    unit: "L",
    safetyStock: 15,
    currentStock: 18,
    status: "normal",
    lastUpdated: "2026-04-01 10:30",
    branches: [
      { branch: "강남점", quantity: 18, status: "normal" },
      { branch: "홍대점", quantity: 16, status: "normal" },
      { branch: "신촌점", quantity: 17, status: "normal" },
      { branch: "이대점", quantity: 14, status: "low" },
      { branch: "본사 물류창고", quantity: 75, status: "normal" },
    ],
    total: 140,
  },
  {
    id: "8",
    itemCode: "BEV-001",
    itemName: "콜라 시럽",
    category: "음료",
    unit: "L",
    safetyStock: 10,
    currentStock: 12,
    status: "normal",
    lastUpdated: "2026-04-01 08:15",
    branches: [
      { branch: "강남점", quantity: 12, status: "normal" },
      { branch: "홍대점", quantity: 11, status: "normal" },
      { branch: "신촌점", quantity: 10, status: "normal" },
      { branch: "이대점", quantity: 9, status: "low" },
      { branch: "본사 물류창고", quantity: 45, status: "normal" },
    ],
    total: 87,
  },
  {
    id: "9-out",
    itemCode: "DAIRY-001",
    itemName: "생크림",
    category: "유제품",
    unit: "L",
    safetyStock: 15,
    currentStock: 0,
    status: "out",
    lastUpdated: "2026-04-01 11:45",
    branches: [
      { branch: "신사점", quantity: 0, status: "out" },
    ],
    total: 0,
  },
];

const categories = ["전체", "육류", "채소", "유제품", "빵류", "음료", "조미료"];
const branches = ["전체", "강남점", "홍대점", "신촌점", "이대점", "본사 물류창고"];

const ITEMS_PER_PAGE = 10;

export function BranchInventoryStatus() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("전체");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedItemName, setSelectedItemName] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "expiring" | "low">("all");

  // Get unique item names for the dropdown
  const itemNames = ["전체", ...Array.from(new Set(mockItemStocks.map(item => item.itemName)))];

  // Flatten items with branch information, excluding "본사 물류창고"
  const flattenedItems = mockItemStocks.flatMap((item) =>
    item.branches
      .filter((branch) => branch.branch !== "본사 물류창고")
      .map((branch) => ({
        ...item,
        branchName: branch.branch,
        currentStock: branch.quantity,
        status: branch.status,
      }))
  );

  // Filter items based on search criteria
  const getFilteredItems = () => {
    if (!hasSearched) {
      return [];
    }

    let items = flattenedItems.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.branchName.includes(searchQuery);
      const matchesBranch = selectedBranch === "전체" || item.branchName === selectedBranch;
      const matchesCategory = selectedCategory === "전체" || item.category === selectedCategory;
      const matchesItemName = selectedItemName === "전체" || item.itemName === selectedItemName;
      return matchesSearch && matchesBranch && matchesCategory && matchesItemName;
    });

    // Apply tab filter
    if (activeTab === "low") {
      items = items.filter(item => item.status === "low" || item.status === "out");
    } else if (activeTab === "expiring") {
      items = []; // No expiring items in mock data
    }

    return items;
  };

  const filteredItems = getFilteredItems();

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Calculate statistics (only when searched)
  const stats = hasSearched
    ? {
        total: filteredItems.length,
        normal: filteredItems.filter((i) => i.status === "normal").length,
        low: filteredItems.filter((i) => i.status === "low").length,
        out: filteredItems.filter((i) => i.status === "out").length,
      }
    : { total: 0, normal: 0, low: 0, out: 0 };

  const handleSearch = () => {
    setHasSearched(true);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedBranch("전체");
    setSelectedCategory("전체");
    setSelectedItemName("전체");
    setCurrentPage(1);
    setHasSearched(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "normal":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3" />
            정상
          </span>
        );
      case "low":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <AlertTriangle className="w-3 h-3" />
            부족
          </span>
        );
      case "out":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <Package className="w-3 h-3" />
            품절
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">지점재고 현황</h2>
        <p className="text-gray-500 mt-1">모든 지점의 재고 현황을 조회하세요</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Branch Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">지점 선택</label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
            >
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">카테고리 선택</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Item Name Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">품목명 선택</label>
            <select
              value={selectedItemName}
              onChange={(e) => setSelectedItemName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
            >
              {itemNames.map((itemName) => (
                <option key={itemName} value={itemName}>
                  {itemName}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">검색어</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="품목명, 코드..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F] font-medium transition-colors"
          >
            조회하기
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
          >
            초기화
          </button>
        </div>
      </div>

      {/* Tabs */}
      {hasSearched && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === "all"
                  ? "text-[#00853D] border-b-2 border-[#00853D] bg-green-50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              전체 재고 ({stats.total})
            </button>
            <button
              onClick={() => setActiveTab("expiring")}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === "expiring"
                  ? "text-yellow-600 border-b-2 border-yellow-600 bg-yellow-50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              유통기한 임박 (0)
            </button>
            <button
              onClick={() => setActiveTab("low")}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === "low"
                  ? "text-red-600 border-b-2 border-red-600 bg-red-50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              안전재고 미달 ({stats.low})
            </button>
          </div>
        </div>
      )}

      {/* Inventory List */}
      {hasSearched && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">지점</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">품목코드</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">품목명</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">카테고리</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900">현재 재고</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900">안전 재고</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-gray-900">상태</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">최종 업데이트</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-gray-500">
                      <Package className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p>검색 결과가 없습니다</p>
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item, index) => (
                    <tr key={`${item.branchName}-${item.id}-${index}`} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                          {item.branchName}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-mono text-sm text-gray-600">{item.itemCode}</td>
                      <td className="py-4 px-6 font-medium text-gray-900">{item.itemName}</td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span
                          className={`font-semibold ${
                            item.status === "normal"
                              ? "text-green-600"
                              : item.status === "low"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {item.currentStock}
                          {item.unit}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right text-gray-600">
                        {item.safetyStock}
                        {item.unit}
                      </td>
                      <td className="py-4 px-6 text-center">{getStatusBadge(item.status)}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{item.lastUpdated}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} / {filteredItems.length}개
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`min-w-[40px] px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === page
                              ? "bg-[#00853D] text-white"
                              : "border border-gray-300 hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span key={page} className="px-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Initial State Message */}
      {!hasSearched && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">조회 조건을 선택하세요</h3>
          <p className="text-gray-500">
            지점, 카테고리, 품목명을 선택하거나 검색어를 입력한 후 '조회하기' 버튼을 클릭하세요
          </p>
        </div>
      )}
    </div>
  );
}
