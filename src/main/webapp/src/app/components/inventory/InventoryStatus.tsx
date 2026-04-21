import { useState } from "react";
import {
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
  Package,
  ChevronLeft,
  ChevronRight,
  Calendar,
  TrendingDown,
} from "lucide-react";
import { useSearchParams } from "react-router";

interface InventoryItem {
  id: string;
  inventoryCode: string;
  name: string;
  category: string;
  currentStock: number;
  unit: string;
  safetyStock: number;
  receivedDate: string;
  expiryDate: string;
  daysLeft: number;
  status: "critical" | "warning" | "low" | "normal";
}

const categories = [
  "전체",
  "단백질",
  "야채",
  "치즈",
  "빵류",
  "소스",
  "쿠키",
  "음료",
  "기타",
];

const mockInventory: InventoryItem[] = [
  {
    id: "inv1",
    inventoryCode: "INV-2024-001",
    name: "치킨 스트립",
    category: "단백질",
    currentStock: 45,
    unit: "kg",
    safetyStock: 50,
    receivedDate: "2026-03-20",
    expiryDate: "2026-03-30",
    daysLeft: 1,
    status: "critical",
  },
  {
    id: "inv2",
    inventoryCode: "INV-2024-002",
    name: "랜치 소스",
    category: "소스",
    currentStock: 8,
    unit: "L",
    safetyStock: 15,
    receivedDate: "2026-03-25",
    expiryDate: "2026-03-31",
    daysLeft: 2,
    status: "critical",
  },
  {
    id: "inv3",
    inventoryCode: "INV-2024-003",
    name: "양상추",
    category: "야채",
    currentStock: 8,
    unit: "kg",
    safetyStock: 20,
    receivedDate: "2026-03-26",
    expiryDate: "2026-04-01",
    daysLeft: 3,
    status: "warning",
  },
  {
    id: "inv4",
    inventoryCode: "INV-2024-010",
    name: "오이",
    category: "야채",
    currentStock: 15,
    unit: "kg",
    safetyStock: 50,
    receivedDate: "2026-03-15",
    expiryDate: "2026-04-15",
    daysLeft: 17,
    status: "low",
  },
  {
    id: "inv5",
    inventoryCode: "INV-2024-007",
    name: "허니오트 빵",
    category: "빵류",
    currentStock: 80,
    unit: "개",
    safetyStock: 150,
    receivedDate: "2026-03-27",
    expiryDate: "2026-04-05",
    daysLeft: 7,
    status: "low",
  },
  {
    id: "inv6",
    inventoryCode: "INV-2024-004",
    name: "아메리칸 치즈",
    category: "치즈",
    currentStock: 30,
    unit: "kg",
    safetyStock: 25,
    receivedDate: "2026-03-24",
    expiryDate: "2026-04-02",
    daysLeft: 4,
    status: "warning",
  },
  {
    id: "inv7",
    inventoryCode: "INV-2024-005",
    name: "토마토",
    category: "야채",
    currentStock: 15,
    unit: "kg",
    safetyStock: 10,
    receivedDate: "2026-03-26",
    expiryDate: "2026-04-03",
    daysLeft: 5,
    status: "normal",
  },
  {
    id: "inv8",
    inventoryCode: "INV-2024-008",
    name: "탄산음료",
    category: "음료",
    currentStock: 3,
    unit: "박스",
    safetyStock: 10,
    receivedDate: "2026-02-15",
    expiryDate: "2026-08-15",
    daysLeft: 139,
    status: "low",
  },
  {
    id: "inv9",
    inventoryCode: "INV-2024-009",
    name: "올리브 오일",
    category: "소스",
    currentStock: 5,
    unit: "L",
    safetyStock: 15,
    receivedDate: "2026-03-01",
    expiryDate: "2027-03-01",
    daysLeft: 337,
    status: "low",
  },
  {
    id: "inv10",
    inventoryCode: "INV-2024-011",
    name: "초콜릿칩 쿠키",
    category: "쿠키",
    currentStock: 120,
    unit: "개",
    safetyStock: 100,
    receivedDate: "2026-03-10",
    expiryDate: "2027-03-10",
    daysLeft: 346,
    status: "normal",
  },
];

type TabType = "all" | "expiring" | "lowstock";

export function InventoryStatus() {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") as TabType | null;
  const filterParam = searchParams.get("filter");

  const [activeTab, setActiveTab] = useState<TabType>(
    tabParam || (filterParam === "lowstock" ? "lowstock" : "all")
  );
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedItemName, setSelectedItemName] = useState("전체");

  // Get available item names based on selected category
  const availableItemNames = ["전체", ...Array.from(new Set(
    mockInventory
      .filter(item => selectedCategory === "전체" || item.category === selectedCategory)
      .map(item => item.name)
  ))];

  // Reset item name when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedItemName("전체");
  };

  // Filter inventory
  let filteredInventory = mockInventory.filter((item) => {
    const matchesCategory =
      selectedCategory === "전체" || item.category === selectedCategory;
    const matchesItemName =
      selectedItemName === "전체" || item.name === selectedItemName;
    return matchesCategory && matchesItemName;
  });

  // Apply tab filters
  if (activeTab === "expiring") {
    filteredInventory = filteredInventory.filter(
      (item) => item.daysLeft <= 7 && item.daysLeft >= 0
    );
  } else if (activeTab === "lowstock") {
    filteredInventory = filteredInventory.filter(
      (item) => item.currentStock < item.safetyStock
    );
  }

  // Sort by urgency
  filteredInventory.sort((a, b) => {
    const statusOrder = { critical: 0, warning: 1, low: 2, normal: 3 };
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status];
    }
    return a.daysLeft - b.daysLeft;
  });

  const getStatusInfo = (item: InventoryItem) => {
    if (item.daysLeft <= 1) {
      return {
        label: "긴급",
        className: "bg-red-100 text-red-700",
        rowClassName: "bg-red-50",
      };
    } else if (item.daysLeft <= 3) {
      return {
        label: "임박",
        className: "bg-orange-100 text-orange-700",
        rowClassName: "bg-orange-50",
      };
    } else if (item.daysLeft <= 7) {
      return {
        label: "경고",
        className: "bg-yellow-100 text-yellow-700",
        rowClassName: "",
      };
    } else if (item.currentStock < item.safetyStock) {
      return {
        label: "재고부족",
        className: "bg-yellow-100 text-yellow-700",
        rowClassName: "bg-yellow-50",
      };
    } else {
      return {
        label: "정상",
        className: "bg-green-100 text-green-700",
        rowClassName: "",
      };
    }
  };

  const stats = {
    all: mockInventory.length,
    expiring: mockInventory.filter(
      (i) => i.daysLeft <= 7 && i.daysLeft >= 0
    ).length,
    lowstock: mockInventory.filter((i) => i.currentStock < i.safetyStock)
      .length,
  };

  // Dashboard statistics
  const dashboardStats = [
    {
      id: "s1",
      name: "유통기한 임박 (3일 이내)",
      value: mockInventory.filter((i) => i.daysLeft <= 3).length,
      icon: AlertTriangle,
      bgColor: "bg-red-100",
      textColor: "text-red-600",
    },
    {
      id: "s2",
      name: "유통기한 경고 (7일 이내)",
      value: mockInventory.filter((i) => i.daysLeft <= 7).length,
      icon: Calendar,
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
    },
    {
      id: "s3",
      name: "안전재고 미달",
      value: mockInventory.filter((i) => i.currentStock < i.safetyStock).length,
      icon: TrendingDown,
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
    },
    {
      id: "s4",
      name: "전체 재고 품목",
      value: mockInventory.length,
      icon: Package,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">재고 현황</h2>
        <p className="text-gray-500 mt-1">재고 현황과 알림을 확인하세요</p>
      </div>

      {/* Dashboard Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} ${stat.textColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Package className="w-5 h-5" />
              <span>전체 재고</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === "all"
                    ? "bg-blue-700 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {stats.all}
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("expiring")}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "expiring"
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              <span>유통기한 임박</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === "expiring"
                    ? "bg-orange-700 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {stats.expiring}
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("lowstock")}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "lowstock"
                ? "bg-yellow-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              <span>안전재고 미달</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === "lowstock"
                    ? "bg-yellow-700 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {stats.lowstock}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Category filter */}
          <div className="flex-1">
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

          {/* Item Name filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              재료명
            </label>
            <select
              value={selectedItemName}
              onChange={(e) => setSelectedItemName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={selectedCategory === "전체" && availableItemNames.length <= 1}
            >
              {availableItemNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  재고 번호
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  재료명
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  카테고리
                </th>
                <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                  현재 수량
                </th>
                <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                  안전 재고
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  입고일
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  유통기한
                </th>
                <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">
                  D-Day
                </th>
                <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">
                  상태
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => {
                const statusInfo = getStatusInfo(item);
                const isLowStock = item.currentStock < item.safetyStock;

                return (
                  <tr
                    key={item.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 ${statusInfo.rowClassName}`}
                  >
                    <td className="py-4 px-6 text-gray-600 font-mono text-sm">
                      {item.inventoryCode}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {item.category}
                    </td>
                    <td
                      className={`py-4 px-6 text-right font-semibold ${
                        isLowStock ? "text-red-600" : "text-gray-900"
                      }`}
                    >
                      {item.currentStock}
                      {item.unit}
                      {isLowStock && (
                        <div className="text-xs text-red-500 mt-1">
                          (안전재고 미달)
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right text-gray-600">
                      {item.safetyStock}
                      {item.unit}
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      {item.receivedDate}
                    </td>
                    <td
                      className={`py-4 px-6 font-medium ${
                        item.daysLeft <= 1
                          ? "text-red-600"
                          : item.daysLeft <= 3
                          ? "text-orange-600"
                          : item.daysLeft <= 7
                          ? "text-yellow-600"
                          : "text-gray-700"
                      }`}
                    >
                      {item.expiryDate}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                          item.daysLeft <= 1
                            ? "bg-red-100 text-red-700"
                            : item.daysLeft <= 3
                            ? "bg-orange-100 text-orange-700"
                            : item.daysLeft <= 7
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.daysLeft <= 7 && <Clock className="w-4 h-4" />}
                        D-{item.daysLeft}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.className}`}
                      >
                        {statusInfo.label === "정상" ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <AlertTriangle className="w-4 h-4" />
                        )}
                        {statusInfo.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredInventory.length === 0 && (
          <div className="py-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">
              검색 결과가 없습니다
            </p>
            <p className="text-gray-400 text-sm">
              다른 검색어나 필터를 시도해보세요
            </p>
          </div>
        )}
      </div>

      {/* Summary */}
      {filteredInventory.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">총 {filteredInventory.length}개</span>
            의 재고 품목이 조회되었습니다.
          </p>
        </div>
      )}
    </div>
  );
}