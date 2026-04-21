import { Link } from "react-router";
import {
  AlertTriangle,
  Calendar,
  TrendingDown,
  Package,
  ArrowRight,
  Clock,
} from "lucide-react";

interface ExpiringItem {
  id: string;
  inventoryCode: string;
  name: string;
  category: string;
  currentStock: number;
  unit: string;
  expiryDate: string;
  daysLeft: number;
  status: "urgent" | "warning" | "normal";
}

interface LowStockItem {
  id: string;
  inventoryCode: string;
  name: string;
  category: string;
  currentStock: number;
  safetyStock: number;
  unit: string;
  shortage: number;
}

const expiringItems: ExpiringItem[] = [
  {
    id: "e1",
    inventoryCode: "INV-2024-001",
    name: "소고기 패티",
    category: "육류",
    currentStock: 45,
    unit: "개",
    expiryDate: "2026-03-30",
    daysLeft: 1,
    status: "urgent",
  },
  {
    id: "e2",
    inventoryCode: "INV-2024-002",
    name: "생크림",
    category: "유제품",
    currentStock: 12,
    unit: "L",
    expiryDate: "2026-03-31",
    daysLeft: 2,
    status: "urgent",
  },
  {
    id: "e3",
    inventoryCode: "INV-2024-003",
    name: "양상추",
    category: "채소",
    currentStock: 8,
    unit: "kg",
    expiryDate: "2026-04-01",
    daysLeft: 3,
    status: "warning",
  },
  {
    id: "e4",
    inventoryCode: "INV-2024-004",
    name: "체다치즈",
    category: "유제품",
    currentStock: 30,
    unit: "장",
    expiryDate: "2026-04-02",
    daysLeft: 4,
    status: "warning",
  },
  {
    id: "e5",
    inventoryCode: "INV-2024-005",
    name: "토마토",
    category: "채소",
    currentStock: 15,
    unit: "kg",
    expiryDate: "2026-04-03",
    daysLeft: 5,
    status: "warning",
  },
];

const lowStockItems: LowStockItem[] = [
  {
    id: "l1",
    inventoryCode: "INV-2024-006",
    name: "감자",
    category: "채소",
    currentStock: 15,
    safetyStock: 50,
    unit: "kg",
    shortage: 35,
  },
  {
    id: "l2",
    inventoryCode: "INV-2024-007",
    name: "버거빵",
    category: "빵류",
    currentStock: 80,
    safetyStock: 150,
    unit: "개",
    shortage: 70,
  },
  {
    id: "l3",
    inventoryCode: "INV-2024-008",
    name: "콜라 시럽",
    category: "음료",
    currentStock: 3,
    safetyStock: 10,
    unit: "L",
    shortage: 7,
  },
  {
    id: "l4",
    inventoryCode: "INV-2024-009",
    name: "식용유",
    category: "조미료",
    currentStock: 5,
    safetyStock: 15,
    unit: "L",
    shortage: 10,
  },
];

export function BranchInventoryDashboard() {
  const stats = [
    {
      id: "s1",
      name: "유통기한 임박 (3일 이내)",
      value: expiringItems.filter((i) => i.daysLeft <= 3).length,
      icon: AlertTriangle,
      color: "red",
      bgColor: "bg-red-100",
      textColor: "text-red-600",
    },
    {
      id: "s2",
      name: "유통기한 경고 (7일 이내)",
      value: expiringItems.filter((i) => i.daysLeft <= 7).length,
      icon: Calendar,
      color: "orange",
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
    },
    {
      id: "s3",
      name: "안전재고 미달",
      value: lowStockItems.length,
      icon: TrendingDown,
      color: "yellow",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
    },
    {
      id: "s4",
      name: "전체 재고 품목",
      value: 127,
      icon: Package,
      color: "blue",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">재고관리 대시보드</h2>
        <p className="text-gray-500 mt-1">재고 현황과 알림을 확인하세요</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} ${stat.textColor} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/inventory/status"
          className="bg-blue-50 rounded-lg p-6 hover:bg-blue-100 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg text-blue-900">재고 현황</h3>
              <p className="text-sm text-blue-600 mt-1">전체 재고 조회 및 관리</p>
            </div>
            <ArrowRight className="w-6 h-6 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          to="/inventory/disposal"
          className="bg-red-50 rounded-lg p-6 hover:bg-red-100 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg text-red-900">재고 폐기 처리</h3>
              <p className="text-sm text-red-600 mt-1">폐기 등록 및 관리</p>
            </div>
            <ArrowRight className="w-6 h-6 text-red-600 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          to="/inventory/history"
          className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg text-gray-900">재고 이력 조회</h3>
              <p className="text-sm text-gray-600 mt-1">입출고 이력 확인</p>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-600 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Expiring Items Alert */}
      <div className="bg-white rounded-lg border border-red-200 overflow-hidden">
        <div className="bg-red-50 px-6 py-4 border-b border-red-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <div>
                <h3 className="font-semibold text-lg text-red-900">
                  유통기한 임박 알림
                </h3>
                <p className="text-sm text-red-600">
                  조속한 확인과 조치가 필요합니다
                </p>
              </div>
            </div>
            <Link
              to="/inventory/status?tab=expiring"
              className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
            >
              전체 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

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
              {expiringItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6 text-gray-600 font-mono text-sm">
                    {item.inventoryCode}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{item.category}</td>
                  <td className="py-4 px-6 text-right font-semibold text-gray-900">
                    {item.currentStock}
                    {item.unit}
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {item.expiryDate}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                        item.daysLeft <= 1
                          ? "bg-red-100 text-red-700"
                          : item.daysLeft <= 3
                          ? "bg-orange-100 text-orange-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                      D-{item.daysLeft}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "urgent"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {item.status === "urgent" ? "긴급" : "경고"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low Stock Alert */}
      <div className="bg-white rounded-lg border border-yellow-200 overflow-hidden">
        <div className="bg-yellow-50 px-6 py-4 border-b border-yellow-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingDown className="w-6 h-6 text-yellow-600" />
              <div>
                <h3 className="font-semibold text-lg text-yellow-900">
                  안전재고 미달 알림
                </h3>
                <p className="text-sm text-yellow-600">
                  발주가 필요한 품목입니다
                </p>
              </div>
            </div>
            <Link
              to="/inventory/status?filter=lowstock"
              className="text-sm text-yellow-600 hover:text-yellow-700 font-medium flex items-center gap-1"
            >
              전체 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

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
                <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                  부족량
                </th>
                <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">
                  상태
                </th>
              </tr>
            </thead>
            <tbody>
              {lowStockItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6 text-gray-600 font-mono text-sm">
                    {item.inventoryCode}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{item.category}</td>
                  <td className="py-4 px-6 text-right font-semibold text-yellow-700">
                    {item.currentStock}
                    {item.unit}
                  </td>
                  <td className="py-4 px-6 text-right text-gray-600">
                    {item.safetyStock}
                    {item.unit}
                  </td>
                  <td className="py-4 px-6 text-right font-semibold text-red-600">
                    -{item.shortage}
                    {item.unit}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                      발주 필요
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}