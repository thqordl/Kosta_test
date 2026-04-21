import { useState } from "react";
import { Search, AlertTriangle, CheckCircle, Package, ChevronLeft, ChevronRight, Filter } from "lucide-react";

interface InventoryItem {
  id: string;
  itemCode: string;
  itemName: string;
  category: string;
  currentStock: number;
  safetyStock: number;
  unit: string;
  status: "normal" | "low" | "out";
  lastUpdated: string;
}

interface BranchData {
  branchName: string;
  inventory: InventoryItem[];
}

const allBranchesData: BranchData[] = [
  {
    branchName: "강남점",
    inventory: [
      { id: "1", itemCode: "MEAT-001", itemName: "소고기 패티", category: "육류", currentStock: 45, safetyStock: 50, unit: "개", status: "low", lastUpdated: "2026-04-01 09:30" },
      { id: "2", itemCode: "VEG-001", itemName: "감자", category: "채소", currentStock: 15, safetyStock: 50, unit: "kg", status: "low", lastUpdated: "2026-04-01 10:15" },
      { id: "3", itemCode: "DAIRY-001", itemName: "생크림", category: "유제품", currentStock: 12, safetyStock: 15, unit: "L", status: "low", lastUpdated: "2026-04-01 08:45" },
      { id: "4", itemCode: "VEG-002", itemName: "양상추", category: "채소", currentStock: 8, safetyStock: 20, unit: "kg", status: "low", lastUpdated: "2026-04-01 11:20" },
      { id: "5", itemCode: "BREAD-001", itemName: "버거빵", category: "빵류", currentStock: 80, safetyStock: 150, unit: "개", status: "low", lastUpdated: "2026-04-01 07:30" },
      { id: "6", itemCode: "DAIRY-002", itemName: "체다치즈", category: "유제품", currentStock: 30, safetyStock: 25, unit: "장", status: "normal", lastUpdated: "2026-04-01 09:00" },
      { id: "7", itemCode: "SAUCE-001", itemName: "식용유", category: "조미료", currentStock: 18, safetyStock: 15, unit: "L", status: "normal", lastUpdated: "2026-04-01 10:30" },
      { id: "8", itemCode: "BEV-001", itemName: "콜라 시럽", category: "음료", currentStock: 12, safetyStock: 10, unit: "L", status: "normal", lastUpdated: "2026-04-01 08:15" },
    ],
  },
  {
    branchName: "홍대점",
    inventory: [
      { id: "1", itemCode: "MEAT-001", itemName: "소고기 패티", category: "육류", currentStock: 32, safetyStock: 50, unit: "개", status: "low", lastUpdated: "2026-04-01 09:45" },
      { id: "2", itemCode: "VEG-001", itemName: "감자", category: "채소", currentStock: 22, safetyStock: 50, unit: "kg", status: "low", lastUpdated: "2026-04-01 10:00" },
      { id: "3", itemCode: "DAIRY-001", itemName: "생크림", category: "유제품", currentStock: 13, safetyStock: 15, unit: "L", status: "low", lastUpdated: "2026-04-01 08:30" },
      { id: "4", itemCode: "VEG-002", itemName: "양상추", category: "채소", currentStock: 10, safetyStock: 20, unit: "kg", status: "low", lastUpdated: "2026-04-01 11:00" },
      { id: "5", itemCode: "BREAD-001", itemName: "버거빵", category: "빵류", currentStock: 120, safetyStock: 150, unit: "개", status: "low", lastUpdated: "2026-04-01 07:45" },
      { id: "6", itemCode: "DAIRY-002", itemName: "체다치즈", category: "유제품", currentStock: 27, safetyStock: 25, unit: "장", status: "normal", lastUpdated: "2026-04-01 09:15" },
      { id: "7", itemCode: "SAUCE-001", itemName: "식용유", category: "조미료", currentStock: 16, safetyStock: 15, unit: "L", status: "normal", lastUpdated: "2026-04-01 10:45" },
      { id: "8", itemCode: "BEV-001", itemName: "콜라 시럽", category: "음료", currentStock: 11, safetyStock: 10, unit: "L", status: "normal", lastUpdated: "2026-04-01 08:00" },
    ],
  },
  {
    branchName: "신촌점",
    inventory: [
      { id: "1", itemCode: "MEAT-001", itemName: "소고기 패티", category: "육류", currentStock: 38, safetyStock: 50, unit: "개", status: "low", lastUpdated: "2026-04-01 09:20" },
      { id: "2", itemCode: "VEG-001", itemName: "감자", category: "채소", currentStock: 28, safetyStock: 50, unit: "kg", status: "low", lastUpdated: "2026-04-01 10:30" },
      { id: "3", itemCode: "DAIRY-001", itemName: "생크림", category: "유제품", currentStock: 14, safetyStock: 15, unit: "L", status: "low", lastUpdated: "2026-04-01 08:50" },
      { id: "4", itemCode: "VEG-002", itemName: "양상추", category: "채소", currentStock: 12, safetyStock: 20, unit: "kg", status: "low", lastUpdated: "2026-04-01 11:10" },
      { id: "5", itemCode: "BREAD-001", itemName: "버거빵", category: "빵류", currentStock: 135, safetyStock: 150, unit: "개", status: "low", lastUpdated: "2026-04-01 07:20" },
      { id: "6", itemCode: "DAIRY-002", itemName: "체다치즈", category: "유제품", currentStock: 28, safetyStock: 25, unit: "장", status: "normal", lastUpdated: "2026-04-01 09:05" },
      { id: "7", itemCode: "SAUCE-001", itemName: "식용유", category: "조미료", currentStock: 17, safetyStock: 15, unit: "L", status: "normal", lastUpdated: "2026-04-01 10:20" },
      { id: "8", itemCode: "BEV-001", itemName: "콜라 시럽", category: "음료", currentStock: 10, safetyStock: 10, unit: "L", status: "normal", lastUpdated: "2026-04-01 08:10" },
    ],
  },
  {
    branchName: "이대점",
    inventory: [
      { id: "1", itemCode: "MEAT-001", itemName: "소고기 패티", category: "육류", currentStock: 42, safetyStock: 50, unit: "개", status: "low", lastUpdated: "2026-04-01 09:35" },
      { id: "2", itemCode: "VEG-001", itemName: "감자", category: "채소", currentStock: 25, safetyStock: 50, unit: "kg", status: "low", lastUpdated: "2026-04-01 10:20" },
      { id: "3", itemCode: "DAIRY-001", itemName: "생크림", category: "유제품", currentStock: 11, safetyStock: 15, unit: "L", status: "low", lastUpdated: "2026-04-01 08:40" },
      { id: "4", itemCode: "VEG-002", itemName: "양상추", category: "채소", currentStock: 9, safetyStock: 20, unit: "kg", status: "low", lastUpdated: "2026-04-01 11:15" },
      { id: "5", itemCode: "BREAD-001", itemName: "버거빵", category: "빵류", currentStock: 145, safetyStock: 150, unit: "개", status: "low", lastUpdated: "2026-04-01 07:40" },
      { id: "6", itemCode: "DAIRY-002", itemName: "체다치즈", category: "유제품", currentStock: 26, safetyStock: 25, unit: "장", status: "normal", lastUpdated: "2026-04-01 09:10" },
      { id: "7", itemCode: "SAUCE-001", itemName: "식용유", category: "조미료", currentStock: 14, safetyStock: 15, unit: "L", status: "low", lastUpdated: "2026-04-01 10:35" },
      { id: "8", itemCode: "BEV-001", itemName: "콜라 시럽", category: "음료", currentStock: 9, safetyStock: 10, unit: "L", status: "low", lastUpdated: "2026-04-01 08:05" },
    ],
  },
];

const categories = ["전체", "육류", "채소", "유제품", "빵류", "음료", "조미료"];
const statusOptions = ["전체", "정상", "부족", "품절"];

const ITEMS_PER_PAGE = 10;

export function BranchInventoryMonitoring() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("전체");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedStatus, setSelectedStatus] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);

  // Flatten all inventory items with branch info
  const allItems = allBranchesData.flatMap((branch) =>
    branch.inventory.map((item) => ({
      ...item,
      branchName: branch.branchName,
    }))
  );

  // Filter items
  const filteredItems = allItems.filter((item) => {
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.branchName.includes(searchQuery);
    const matchesBranch = selectedBranch === "전체" || item.branchName === selectedBranch;
    const matchesCategory = selectedCategory === "전체" || item.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "전체" ||
      (selectedStatus === "정상" && item.status === "normal") ||
      (selectedStatus === "부족" && item.status === "low") ||
      (selectedStatus === "품절" && item.status === "out");
    return matchesSearch && matchesBranch && matchesCategory && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Calculate statistics
  const stats = {
    total: allItems.length,
    normal: allItems.filter((i) => i.status === "normal").length,
    low: allItems.filter((i) => i.status === "low").length,
    out: allItems.filter((i) => i.status === "out").length,
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
        <h2 className="text-3xl font-bold text-gray-900">지점별 실시간 재고 모니터링</h2>
        <p className="text-gray-500 mt-1">모든 지점의 재고 현황을 한눈에 확인하세요</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-sm text-gray-500 mt-1">전체 품목</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.normal}</p>
          <p className="text-sm text-gray-500 mt-1">정상 재고</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-yellow-600">{stats.low}</p>
          <p className="text-sm text-gray-500 mt-1">재고 부족</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-red-600">{stats.out}</p>
          <p className="text-sm text-gray-500 mt-1">품절</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="font-semibold text-gray-900">필터 및 검색</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">검색</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="품목명, 코드, 지점명..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
              />
            </div>
          </div>

          {/* Branch Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">지점</label>
            <select
              value={selectedBranch}
              onChange={(e) => {
                setSelectedBranch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
            >
              <option value="전체">전체</option>
              {allBranchesData.map((branch) => (
                <option key={branch.branchName} value={branch.branchName}>
                  {branch.branchName}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            총 <span className="font-semibold text-gray-900">{filteredItems.length}</span>개 품목
          </p>
          {(searchQuery || selectedBranch !== "전체" || selectedCategory !== "전체" || selectedStatus !== "전체") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedBranch("전체");
                setSelectedCategory("전체");
                setSelectedStatus("전체");
                setCurrentPage(1);
              }}
              className="text-sm text-[#00853D] hover:text-[#006B2F] font-medium"
            >
              필터 초기화
            </button>
          )}
        </div>
      </div>

      {/* Inventory List */}
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
                  <tr key={`${item.branchName}-${item.id}`} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                        {item.branchName}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-sm text-gray-600">{item.itemCode}</td>
                    <td className="py-4 px-6 font-medium text-gray-900">{item.itemName}</td>
                    <td className="py-4 px-6 text-gray-700">{item.category}</td>
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
                  // Show first, last, current, and adjacent pages
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
    </div>
  );
}
