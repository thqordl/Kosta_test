import { useState } from "react";
import { Save, Package, Edit, CheckCircle, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";

interface ItemLimit {
  id: string;
  itemCode: string;
  itemName: string;
  category: string;
  unit: string;
  minQty: number;
  maxQty: number;
  currentLimit: string;
}

const mockItemLimits: ItemLimit[] = [
  {
    id: "1",
    itemCode: "MEAT-001",
    itemName: "소고기 패티",
    category: "육류",
    unit: "개",
    minQty: 20,
    maxQty: 150,
    currentLimit: "정상",
  },
  {
    id: "2",
    itemCode: "VEG-001",
    itemName: "감자",
    category: "채소",
    unit: "kg",
    minQty: 30,
    maxQty: 200,
    currentLimit: "정상",
  },
  {
    id: "3",
    itemCode: "DAIRY-001",
    itemName: "생크림",
    category: "유제품",
    unit: "L",
    minQty: 10,
    maxQty: 50,
    currentLimit: "정상",
  },
  {
    id: "4",
    itemCode: "VEG-002",
    itemName: "양상추",
    category: "채소",
    unit: "kg",
    minQty: 15,
    maxQty: 80,
    currentLimit: "정상",
  },
  {
    id: "5",
    itemCode: "BREAD-001",
    itemName: "버거빵",
    category: "빵류",
    unit: "개",
    minQty: 100,
    maxQty: 500,
    currentLimit: "정상",
  },
  {
    id: "6",
    itemCode: "DAIRY-002",
    itemName: "체다치즈",
    category: "유제품",
    unit: "장",
    minQty: 20,
    maxQty: 100,
    currentLimit: "정상",
  },
  {
    id: "7",
    itemCode: "SAUCE-001",
    itemName: "식용유",
    category: "조미료",
    unit: "L",
    minQty: 10,
    maxQty: 50,
    currentLimit: "정상",
  },
  {
    id: "8",
    itemCode: "BEV-001",
    itemName: "콜라 시럽",
    category: "음료",
    unit: "L",
    minQty: 8,
    maxQty: 40,
    currentLimit: "정상",
  },
];

const categories = ["전체", "육류", "채소", "유제품", "빵류", "음료", "조미료"];

export function OrderItemLimits() {
  const [items, setItems] = useState<ItemLimit[]>(mockItemLimits);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedItemName, setSelectedItemName] = useState("전체");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get unique item names based on category
  const itemNames = [
    "전체",
    ...Array.from(
      new Set(
        items
          .filter((item) =>
            selectedCategory === "전체" ? true : item.category === selectedCategory
          )
          .map((item) => item.itemName)
      )
    ),
  ];

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "전체" || item.category === selectedCategory;
    const matchesItemName =
      selectedItemName === "전체" || item.itemName === selectedItemName;
    return matchesCategory && matchesItemName;
  });

  const updateLimit = (
    id: string,
    field: "minQty" | "maxQty",
    value: number
  ) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSave = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item && item.minQty >= item.maxQty) {
      alert("최소 수량은 최대 수량보다 작아야 합니다.");
      return;
    }
    setEditingId(null);
    alert("발주 제한 설정이 저장되었습니다.");
  };

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          품목별 발주 수량 설정
        </h2>
        <p className="text-gray-500 mt-1">
          품목별 발주 제한을 설정하여 과다 발주를 방지하세요
        </p>
      </div>

      {/* Items Table with Category Filter */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-lg text-gray-900">
            발주 제한 설정 리스트
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            수정 아이콘을 클릭하여 수량을 변경하세요
          </p>
        </div>

        {/* Category and Item Filter Inside Table */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카테고리 선택
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedItemName("전체");
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                재료명 선택
              </label>
              <select
                value={selectedItemName}
                onChange={(e) => {
                  setSelectedItemName(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {itemNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

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
                <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">
                  최소 수량
                </th>
                <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">
                  최대 수량
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
                  <td className="py-4 px-6">
                    {editingId === item.id ? (
                      <div className="flex items-center justify-center gap-2">
                        <input
                          type="number"
                          value={item.minQty}
                          onChange={(e) =>
                            updateLimit(item.id, "minQty", Number(e.target.value))
                          }
                          min="0"
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <span className="text-gray-600">{item.unit}</span>
                      </div>
                    ) : (
                      <div className="text-center font-semibold text-gray-900">
                        {item.minQty}
                        {item.unit}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {editingId === item.id ? (
                      <div className="flex items-center justify-center gap-2">
                        <input
                          type="number"
                          value={item.maxQty}
                          onChange={(e) =>
                            updateLimit(item.id, "maxQty", Number(e.target.value))
                          }
                          min="0"
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <span className="text-gray-600">{item.unit}</span>
                      </div>
                    ) : (
                      <div className="text-center font-semibold text-gray-900">
                        {item.maxQty}
                        {item.unit}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      <CheckCircle className="w-3 h-3" />
                      {item.currentLimit}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    {editingId === item.id ? (
                      <button
                        onClick={() => handleSave(item.id)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        저장
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingId(item.id)}
                        className="inline-flex items-center gap-1 px-3 py-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        수정
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredItems.length > itemsPerPage && (
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

      {/* Summary */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-blue-600" />
          <p className="text-sm text-blue-900">
            총 <span className="font-semibold">{filteredItems.length}개 품목</span>의
            발주 제한이 설정되어 있습니다. 제한을 초과하는 발주 요청은 자동으로
            본사 승인이 필요합니다.
          </p>
        </div>
      </div>
    </div>
  );
}