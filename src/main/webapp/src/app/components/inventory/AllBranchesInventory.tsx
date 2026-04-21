import { useState } from "react";
import { Search, Package, AlertTriangle, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

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
  branches: BranchStock[];
  total: number;
}

const mockItemStocks: ItemStock[] = [
  {
    id: "1",
    itemCode: "MEAT-001",
    itemName: "소고기 패티",
    category: "육류",
    unit: "개",
    safetyStock: 50,
    branches: [
      { branch: "강남점", quantity: 45, status: "low" },
      { branch: "홍대점", quantity: 38, status: "low" },
      { branch: "신촌점", quantity: 62, status: "normal" },
      { branch: "이대점", quantity: 55, status: "normal" },
      { branch: "본사 물류창고", quantity: 250, status: "normal" },
    ],
    total: 450,
  },
  {
    id: "2",
    itemCode: "VEG-001",
    itemName: "감자",
    category: "채소",
    unit: "kg",
    safetyStock: 50,
    branches: [
      { branch: "강남점", quantity: 15, status: "low" },
      { branch: "홍대점", quantity: 45, status: "low" },
      { branch: "신촌점", quantity: 30, status: "low" },
      { branch: "이대점", quantity: 52, status: "normal" },
      { branch: "본사 물류창고", quantity: 180, status: "normal" },
    ],
    total: 322,
  },
  {
    id: "3",
    itemCode: "DAIRY-001",
    itemName: "생크림",
    category: "유제품",
    unit: "L",
    safetyStock: 15,
    branches: [
      { branch: "강남점", quantity: 12, status: "low" },
      { branch: "홍대점", quantity: 18, status: "normal" },
      { branch: "신촌점", quantity: 16, status: "normal" },
      { branch: "이대점", quantity: 14, status: "low" },
      { branch: "본사 물류창고", quantity: 65, status: "normal" },
    ],
    total: 125,
  },
  {
    id: "4",
    itemCode: "VEG-002",
    itemName: "양상추",
    category: "채소",
    unit: "kg",
    safetyStock: 20,
    branches: [
      { branch: "강남점", quantity: 8, status: "low" },
      { branch: "홍대점", quantity: 25, status: "normal" },
      { branch: "신촌점", quantity: 22, status: "normal" },
      { branch: "이대점", quantity: 19, status: "low" },
      { branch: "본사 물류창고", quantity: 85, status: "normal" },
    ],
    total: 159,
  },
  {
    id: "5",
    itemCode: "BREAD-001",
    itemName: "버거빵",
    category: "빵류",
    unit: "개",
    safetyStock: 150,
    branches: [
      { branch: "강남점", quantity: 80, status: "low" },
      { branch: "홍대점", quantity: 120, status: "low" },
      { branch: "신촌점", quantity: 165, status: "normal" },
      { branch: "이대점", quantity: 145, status: "low" },
      { branch: "본사 물류창고", quantity: 650, status: "normal" },
    ],
    total: 1160,
  },
  {
    id: "6",
    itemCode: "DAIRY-002",
    itemName: "체다치즈",
    category: "유제품",
    unit: "장",
    safetyStock: 25,
    branches: [
      { branch: "강남점", quantity: 30, status: "normal" },
      { branch: "홍대점", quantity: 28, status: "normal" },
      { branch: "신촌점", quantity: 32, status: "normal" },
      { branch: "이대점", quantity: 26, status: "normal" },
      { branch: "본사 물류창고", quantity: 150, status: "normal" },
    ],
    total: 266,
  },
  {
    id: "7",
    itemCode: "SAUCE-001",
    itemName: "식용유",
    category: "조미료",
    unit: "L",
    safetyStock: 15,
    branches: [
      { branch: "강남점", quantity: 18, status: "normal" },
      { branch: "홍대점", quantity: 16, status: "normal" },
      { branch: "신촌점", quantity: 5, status: "low" },
      { branch: "이대점", quantity: 14, status: "low" },
      { branch: "본사 물류창고", quantity: 75, status: "normal" },
    ],
    total: 128,
  },
  {
    id: "8",
    itemCode: "BEV-001",
    itemName: "콜라 시럽",
    category: "음료",
    unit: "L",
    safetyStock: 10,
    branches: [
      { branch: "강남점", quantity: 12, status: "normal" },
      { branch: "홍대점", quantity: 11, status: "normal" },
      { branch: "신촌점", quantity: 3, status: "low" },
      { branch: "이대점", quantity: 9, status: "low" },
      { branch: "본사 물류창고", quantity: 45, status: "normal" },
    ],
    total: 80,
  },
];

const categories = ["전체", "육류", "채소", "유제품", "빵류", "음료", "조미료", "냉동식품"];

export function AllBranchesInventory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter items
  const filteredItems = mockItemStocks.filter((item) => {
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "전체" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "low":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <AlertTriangle className="w-3 h-3" />
            부족
          </span>
        );
      case "out":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <AlertTriangle className="w-3 h-3" />
            품절
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3" />
            정상
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          전지점 상세 품목 통합 조회
        </h2>
        <p className="text-gray-500 mt-1">
          품목별 전체 지점 보유량을 조회하세요
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">
                {mockItemStocks.length}
              </p>
              <p className="text-xs text-gray-500">전체 품목</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-green-600">
                {
                  mockItemStocks.filter((item) =>
                    item.branches.every((b) => b.status === "normal")
                  ).length
                }
              </p>
              <p className="text-xs text-gray-500">정상 품목</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-yellow-600">
                {
                  mockItemStocks.filter((item) =>
                    item.branches.some((b) => b.status === "low")
                  ).length
                }
              </p>
              <p className="text-xs text-gray-500">부족 품목</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-red-600">
                {
                  mockItemStocks.filter((item) =>
                    item.branches.some((b) => b.status === "out")
                  ).length
                }
              </p>
              <p className="text-xs text-gray-500">품절 품목</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              품목명/코드 검색
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="품목명 또는 품목코드를 입력하세요..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  품목코드
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  품목명
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  카테고리
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  강남점
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  홍대점
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  신촌점
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  이대점
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  본사 물류창고
                </th>
                <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900 bg-blue-50">
                  전체 합계
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6 font-mono text-sm text-gray-600">
                    {item.itemCode}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {item.itemName}
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {item.category}
                    </span>
                  </td>
                  {item.branches.map((branch, idx) => (
                    <td key={idx} className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`font-semibold ${
                            branch.status === "low"
                              ? "text-yellow-600"
                              : branch.status === "out"
                              ? "text-red-600"
                              : "text-gray-900"
                          }`}
                        >
                          {branch.quantity}
                          {item.unit}
                        </span>
                        {getStatusBadge(branch.status)}
                      </div>
                    </td>
                  ))}
                  <td className="py-4 px-6 text-right bg-blue-50">
                    <div className="font-bold text-lg text-blue-900">
                      {item.total}
                      {item.unit}
                    </div>
                    <div className="text-xs text-blue-600">전체 보유량</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="py-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">검색 결과가 없습니다</p>
            <p className="text-gray-400 text-sm">
              다른 검색어나 카테고리를 선택해보세요
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredItems.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
            이전
          </button>
          <div className="text-sm text-gray-500">
            {currentPage} / {totalPages}
          </div>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50"
          >
            다음
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Summary */}
      {filteredItems.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">{filteredItems.length}개</span>의
            품목이 조회되었습니다.
          </p>
        </div>
      )}
    </div>
  );
}