import { useState } from "react";
import {
  Clock,
  AlertTriangle,
  Package,
  Calendar,
  Trash2,
  TrendingDown,
  DollarSign,
  Filter,
} from "lucide-react";

interface WarehouseExpiryItem {
  id: string;
  itemCode: string;
  itemName: string;
  category: string;
  quantity: number;
  unit: string;
  receivedDate: string;
  expiryDate: string;
  daysLeft: number;
  unitPrice: number;
  totalValue: number;
  status: "urgent" | "warning" | "normal";
}

const mockWarehouseExpiry: WarehouseExpiryItem[] = [
  {
    id: "we1",
    itemCode: "MEAT-001",
    itemName: "소고기 패티",
    category: "육류",
    quantity: 50,
    unit: "개",
    receivedDate: "2026-03-15",
    expiryDate: "2026-03-31",
    daysLeft: 2,
    unitPrice: 25000,
    totalValue: 1250000,
    status: "urgent",
  },
  {
    id: "we1-2",
    itemCode: "MEAT-001",
    itemName: "소고기 패티",
    category: "육류",
    quantity: 35,
    unit: "개",
    receivedDate: "2026-03-14",
    expiryDate: "2026-03-30",
    daysLeft: 1,
    unitPrice: 25000,
    totalValue: 875000,
    status: "urgent",
  },
  {
    id: "we2",
    itemCode: "DAIRY-002",
    itemName: "체다치즈",
    category: "유제품",
    quantity: 80,
    unit: "장",
    receivedDate: "2026-03-20",
    expiryDate: "2026-04-01",
    daysLeft: 3,
    unitPrice: 18000,
    totalValue: 1440000,
    status: "urgent",
  },
  {
    id: "we2-2",
    itemCode: "DAIRY-002",
    itemName: "체다치즈",
    category: "유제품",
    quantity: 60,
    unit: "장",
    receivedDate: "2026-03-19",
    expiryDate: "2026-03-31",
    daysLeft: 2,
    unitPrice: 18000,
    totalValue: 1080000,
    status: "urgent",
  },
  {
    id: "we3",
    itemCode: "DAIRY-001",
    itemName: "생크림",
    category: "유제품",
    quantity: 25,
    unit: "L",
    receivedDate: "2026-03-22",
    expiryDate: "2026-04-03",
    daysLeft: 5,
    unitPrice: 30000,
    totalValue: 750000,
    status: "warning",
  },
  {
    id: "we3-2",
    itemCode: "DAIRY-001",
    itemName: "생크림",
    category: "유제품",
    quantity: 18,
    unit: "L",
    receivedDate: "2026-03-21",
    expiryDate: "2026-04-02",
    daysLeft: 4,
    unitPrice: 30000,
    totalValue: 540000,
    status: "warning",
  },
  {
    id: "we4",
    itemCode: "VEG-002",
    itemName: "양상추",
    category: "채소",
    quantity: 30,
    unit: "kg",
    receivedDate: "2026-03-24",
    expiryDate: "2026-04-04",
    daysLeft: 6,
    unitPrice: 5000,
    totalValue: 150000,
    status: "warning",
  },
  {
    id: "we4-2",
    itemCode: "VEG-002",
    itemName: "양상추",
    category: "채소",
    quantity: 22,
    unit: "kg",
    receivedDate: "2026-03-25",
    expiryDate: "2026-04-05",
    daysLeft: 7,
    unitPrice: 5000,
    totalValue: 110000,
    status: "warning",
  },
  {
    id: "we5",
    itemCode: "VEG-003",
    itemName: "토마토",
    category: "채소",
    quantity: 45,
    unit: "kg",
    receivedDate: "2026-03-23",
    expiryDate: "2026-04-05",
    daysLeft: 7,
    unitPrice: 8000,
    totalValue: 360000,
    status: "warning",
  },
  {
    id: "we5-2",
    itemCode: "VEG-003",
    itemName: "토마토",
    category: "채소",
    quantity: 38,
    unit: "kg",
    receivedDate: "2026-03-24",
    expiryDate: "2026-04-06",
    daysLeft: 8,
    unitPrice: 8000,
    totalValue: 304000,
    status: "normal",
  },
  {
    id: "we6",
    itemCode: "BREAD-001",
    itemName: "버거빵",
    category: "빵류",
    quantity: 200,
    unit: "개",
    receivedDate: "2026-03-25",
    expiryDate: "2026-04-08",
    daysLeft: 10,
    unitPrice: 500,
    totalValue: 100000,
    status: "normal",
  },
  {
    id: "we6-2",
    itemCode: "BREAD-001",
    itemName: "버거빵",
    category: "빵류",
    quantity: 150,
    unit: "개",
    receivedDate: "2026-03-26",
    expiryDate: "2026-04-09",
    daysLeft: 11,
    unitPrice: 500,
    totalValue: 75000,
    status: "normal",
  },
];

export function WarehouseExpiryTracking() {
  const [items, setItems] = useState<WarehouseExpiryItem[]>(
    mockWarehouseExpiry
  );
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showDisposalModal, setShowDisposalModal] = useState(false);

  // Filters
  const [filterStatus, setFilterStatus] = useState("전체");
  const [filterCategory, setFilterCategory] = useState("전체");

  const categories = ["전체", "육류", "채소", "유제품", "빵류", "음료", "조미료"];
  const statuses = ["전체", "긴급", "경고", "정상"];

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesStatus =
      filterStatus === "전체" ||
      (filterStatus === "긴급" && item.status === "urgent") ||
      (filterStatus === "경고" && item.status === "warning") ||
      (filterStatus === "정상" && item.status === "normal");
    const matchesCategory =
      filterCategory === "전체" || item.category === filterCategory;
    return matchesStatus && matchesCategory;
  });

  const urgentItems = filteredItems.filter((i) => i.daysLeft <= 3);
  const warningItems = filteredItems.filter((i) => i.daysLeft > 3 && i.daysLeft <= 7);
  const totalValue = urgentItems.reduce((sum, i) => sum + i.totalValue, 0);

  const handleDisposal = () => {
    const disposedItems = items.filter((i) => selectedItems.includes(i.id));
    setItems(items.filter((i) => !selectedItems.includes(i.id)));
    setSelectedItems([]);
    setShowDisposalModal(false);
    alert(
      `${disposedItems.length}개 품목이 폐기 처리되었습니다.`
    );
  };

  const handleDiscountRelease = () => {
    const discountedItems = items.filter((i) => selectedItems.includes(i.id));
    setItems(items.filter((i) => !selectedItems.includes(i.id)));
    setSelectedItems([]);
    setShowDiscountModal(false);
    alert(
      `${discountedItems.length}개 품목이 할인 출고 처리되었습니다.`
    );
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          유통기한 조회
        </h2>
        <p className="text-gray-500 mt-1">
          창고 내 유통기한 임박 품목을 관리하고 조치하세요
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              상태 필터
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리 필터
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
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-red-600">
                {urgentItems.length}개
              </p>
              <p className="text-xs text-gray-500">긴급 (3일 이내)</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-orange-600">
                {warningItems.length}개
              </p>
              <p className="text-xs text-gray-500">경고 (4-7일)</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-purple-600">
                ₩{(totalValue / 1000000).toFixed(1)}M
              </p>
              <p className="text-xs text-gray-500">위험 자산 가치</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {selectedItems.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-semibold text-blue-900">
                  {selectedItems.length}개 품목 선택됨
                </p>
                <p className="text-sm text-blue-600">
                  선택한 품목에 대한 조치를 진행하세요
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDisposalModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                폐기 처리
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expiry Items Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-lg text-gray-900">
            유통기한 임박 품목 리스트
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            체크박스를 선택하여 일괄 처리하세요
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900 w-12">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredItems.length}
                    onChange={(e) =>
                      setSelectedItems(
                        e.target.checked ? filteredItems.map((i) => i.id) : []
                      )
                    }
                    className="w-4 h-4 rounded border-gray-300 bg-white"
                  />
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  품목코드
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  품목명
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  카테고리
                </th>
                <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                  수량
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
                <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                  자산 가치
                </th>
                <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">
                  상태
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 ${
                    item.daysLeft <= 2
                      ? "bg-red-50"
                      : item.daysLeft <= 3
                      ? "bg-orange-50"
                      : ""
                  }`}
                >
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelectItem(item.id)}
                      className="w-4 h-4 rounded border-gray-300 bg-white"
                    />
                  </td>
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
                  <td className="py-4 px-6 text-right font-semibold text-gray-900">
                    {item.quantity}
                    {item.unit}
                  </td>
                  <td className="py-4 px-6 text-gray-700 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {item.receivedDate}
                    </div>
                  </td>
                  <td
                    className={`py-4 px-6 font-medium ${
                      item.daysLeft <= 2
                        ? "text-red-600"
                        : item.daysLeft <= 3
                        ? "text-orange-600"
                        : "text-yellow-600"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {item.expiryDate}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${
                        item.daysLeft <= 2
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
                  <td className="py-4 px-6 text-right font-semibold text-gray-900">
                    ₩{item.totalValue.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "urgent"
                          ? "bg-red-100 text-red-700"
                          : item.status === "warning"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.status === "urgent" ? (
                        <>
                          <AlertTriangle className="w-3 h-3" />
                          긴급
                        </>
                      ) : item.status === "warning" ? (
                        <>
                          <Clock className="w-3 h-3" />
                          경고
                        </>
                      ) : (
                        "정상"
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Discount Modal */}
      {showDiscountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                <TrendingDown className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  할인 출고 처리
                </h3>
                <p className="text-sm text-gray-500">확인 후 처리하세요</p>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 mb-4 border border-orange-200">
              <p className="text-sm text-orange-800 mb-2">
                <strong>{selectedItems.length}개 품목</strong>을 할인가로
                출고 처리합니다.
              </p>
              <p className="text-xs text-orange-600">
                * 할인 출고 후 재고에서 차감되며, 매출 관리에 반영됩니다.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDiscountModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleDiscountRelease}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Disposal Modal */}
      {showDisposalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">폐기 처리</h3>
                <p className="text-sm text-gray-500">확인 후 처리하세요</p>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-4 mb-4 border border-red-200">
              <p className="text-sm text-red-800 mb-2">
                <strong>{selectedItems.length}개 품목</strong>을 폐기
                처리합니다.
              </p>
              <p className="text-xs text-red-600">
                * 폐기 후 복구할 수 없으며, 폐기율 통계에 반영됩니다.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <p className="text-xs text-yellow-800">
                폐기 처리된 품목은 복구할 수 없습니다. 계속하시겠습니까?
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDisposalModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleDisposal}
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