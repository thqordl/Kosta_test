import { useState } from "react";
import {
  Search,
  Package,
  Plus,
  Edit,
  X,
  CheckCircle,
  Filter,
} from "lucide-react";

interface Item {
  id: string;
  itemCode: string;
  itemName: string;
  category: string;
  unit: string;
  unitPrice: number;
  safetyStock: number;
  description: string;
  supplier: string;
  shelfLife: number; // days
  storageMethod: string;
  status: "active" | "inactive";
}

const mockItems: Item[] = [
  {
    id: "1",
    itemCode: "PROTEIN-001",
    itemName: "치킨 스트립",
    category: "단백질",
    unit: "kg",
    unitPrice: 18000,
    safetyStock: 50,
    description: "서브웨이 전용 치킨 스트립",
    supplier: "(주)프레시미트",
    shelfLife: 15,
    storageMethod: "냉장 (0-4°C)",
    status: "active",
  },
  {
    id: "2",
    itemCode: "PROTEIN-002",
    itemName: "참치",
    category: "단백질",
    unit: "kg",
    unitPrice: 25000,
    safetyStock: 30,
    description: "참치 샌드위치용 참치",
    supplier: "(주)오션푸드",
    shelfLife: 20,
    storageMethod: "냉장 (1-5°C)",
    status: "active",
  },
  {
    id: "3",
    itemCode: "VEG-001",
    itemName: "양상추",
    category: "야채",
    unit: "kg",
    unitPrice: 5000,
    safetyStock: 50,
    description: "신선한 양상추",
    supplier: "(주)신선농산",
    shelfLife: 7,
    storageMethod: "냉장 (2-5°C)",
    status: "active",
  },
  {
    id: "4",
    itemCode: "VEG-002",
    itemName: "토마토",
    category: "야채",
    unit: "kg",
    unitPrice: 4500,
    safetyStock: 30,
    description: "완숙 토마토",
    supplier: "(주)신선농산",
    shelfLife: 10,
    storageMethod: "냉장 (5-10°C)",
    status: "active",
  },
  {
    id: "5",
    itemCode: "BREAD-001",
    itemName: "허니오트 빵",
    category: "빵류",
    unit: "개",
    unitPrice: 500,
    safetyStock: 150,
    description: "시그니처 허니오트 빵",
    supplier: "(주)베이커리월드",
    shelfLife: 14,
    storageMethod: "실온 보관",
    status: "active",
  },
  {
    id: "6",
    itemCode: "CHEESE-001",
    itemName: "아메리칸 치즈",
    category: "치즈",
    unit: "kg",
    unitPrice: 18000,
    safetyStock: 25,
    description: "슬라이스 아메리칸 치즈",
    supplier: "(주)유진유업",
    shelfLife: 21,
    storageMethod: "냉장 (1-5°C)",
    status: "active",
  },
  {
    id: "7",
    itemCode: "SAUCE-001",
    itemName: "랜치 소스",
    category: "소스",
    unit: "L",
    unitPrice: 12000,
    safetyStock: 15,
    description: "서브웨이 시그니처 랜치 소스",
    supplier: "(주)글로벌푸드",
    shelfLife: 90,
    storageMethod: "냉장 (1-5°C)",
    status: "active",
  },
  {
    id: "8",
    itemCode: "VEG-003",
    itemName: "오이",
    category: "야채",
    unit: "kg",
    unitPrice: 3500,
    safetyStock: 40,
    description: "신선한 오이",
    supplier: "(주)신선농산",
    shelfLife: 14,
    storageMethod: "냉장 (5-10°C)",
    status: "active",
  },
  {
    id: "9",
    itemCode: "SAUCE-002",
    itemName: "스위트 어니언 소스",
    category: "소스",
    unit: "L",
    unitPrice: 13000,
    safetyStock: 15,
    description: "인기 스위트 어니언 소스",
    supplier: "(주)글로벌푸드",
    shelfLife: 90,
    storageMethod: "냉장 (1-5°C)",
    status: "active",
  },
  {
    id: "10",
    itemCode: "BREAD-002",
    itemName: "위트 빵",
    category: "빵류",
    unit: "개",
    unitPrice: 500,
    safetyStock: 120,
    description: "통밀 빵",
    supplier: "(주)베이커리월드",
    shelfLife: 14,
    storageMethod: "실온 보관",
    status: "active",
  },
  {
    id: "11",
    itemCode: "PROTEIN-003",
    itemName: "햄",
    category: "단백질",
    unit: "kg",
    unitPrice: 20000,
    safetyStock: 40,
    description: "슬라이스 햄",
    supplier: "(주)프레시미트",
    shelfLife: 20,
    storageMethod: "냉장 (0-4°C)",
    status: "active",
  },
  {
    id: "12",
    itemCode: "VEG-004",
    itemName: "피망",
    category: "야채",
    unit: "kg",
    unitPrice: 4000,
    safetyStock: 30,
    description: "신선한 피망",
    supplier: "(주)신선농산",
    shelfLife: 10,
    storageMethod: "냉장 (5-10°C)",
    status: "active",
  },
  {
    id: "13",
    itemCode: "COOKIE-001",
    itemName: "초콜릿칩 쿠키",
    category: "쿠키",
    unit: "개",
    unitPrice: 1500,
    safetyStock: 100,
    description: "서브웨이 시그니처 쿠키",
    supplier: "(주)베이커리월드",
    shelfLife: 60,
    storageMethod: "실온 보관",
    status: "active",
  },
  {
    id: "14",
    itemCode: "DRINK-001",
    itemName: "탄산음료",
    category: "음료",
    unit: "박스",
    unitPrice: 15000,
    safetyStock: 20,
    description: "330ml 캔 음료 (24개입)",
    supplier: "(주)음료유통",
    shelfLife: 180,
    storageMethod: "실온 보관",
    status: "active",
  },
  {
    id: "15",
    itemCode: "SAUCE-003",
    itemName: "올리브 오일",
    category: "소스",
    unit: "L",
    unitPrice: 15000,
    safetyStock: 10,
    description: "엑스트라 버진 올리브 오일",
    supplier: "(주)글로벌푸드",
    shelfLife: 365,
    storageMethod: "실온 보관",
    status: "active",
  },
];

const categories = ["전체", "단백질", "야채", "치즈", "빵류", "음료", "소스", "냉동식품"];
const storageTypes = ["냉장", "냉동", "실온"];

export function ItemsMaster() {
  const [items, setItems] = useState<Item[]>(mockItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);
  const [selectedItemName, setSelectedItemName] = useState("전체");

  // Form state
  const [formData, setFormData] = useState<Partial<Item>>({});

  // Get unique item names based on selected category
  const itemNames = [
    "전체",
    ...Array.from(
      new Set(
        items
          .filter((item) =>
            selectedCategory === "전체"
              ? true
              : item.category === selectedCategory
          )
          .map((item) => item.itemName)
      )
    ),
  ];

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "전체" || item.category === selectedCategory;
    const matchesItemName =
      selectedItemName === "전체" || item.itemName === selectedItemName;
    return matchesSearch && matchesCategory && matchesItemName;
  });

  const handleViewDetail = (item: Item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const handleEdit = (item: Item) => {
    setSelectedItem(item);
    setFormData(item);
    setIsNewItem(false);
    setShowEditModal(true);
  };

  const handleNewItem = () => {
    setSelectedItem(null);
    setFormData({
      itemCode: "",
      itemName: "",
      category: "단백질",
      unit: "kg",
      unitPrice: 0,
      safetyStock: 0,
      description: "",
      supplier: "",
      shelfLife: 0,
      storageMethod: "냉장 (0-4°C)",
      status: "active",
    });
    setIsNewItem(true);
    setShowEditModal(true);
  };

  const handleSave = () => {
    if (!formData.itemCode || !formData.itemName) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    if (isNewItem) {
      const newItem: Item = {
        id: `item${Date.now()}`,
        ...formData as Item,
      };
      setItems([newItem, ...items]);
      alert("새 품목이 등록되었습니다.");
    } else {
      setItems(
        items.map((item) =>
          item.id === selectedItem?.id ? { ...item, ...formData } : item
        )
      );
      alert("품목 정보가 수정되었습니다.");
    }

    setShowEditModal(false);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            물류창고 내 품목
          </h2>
          <p className="text-gray-500 mt-1">
            전체 품목 마스터를 관리하세요
          </p>
        </div>
        <button
          onClick={handleNewItem}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          신규 품목 등록
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리 선택
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedItemName("전체");
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

          {/* Item Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              재료명 선택
            </label>
            <select
              value={selectedItemName}
              onChange={(e) => setSelectedItemName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              품목 검색
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="품목명 또는 품목코드 입력..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{items.length}개</p>
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
                {items.filter((i) => i.status === "active").length}개
              </p>
              <p className="text-xs text-gray-500">활성 품목</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-600">
                {items.filter((i) => i.status === "inactive").length}개
              </p>
              <p className="text-xs text-gray-500">비활성 품목</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <Filter className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-purple-600">
                {categories.length - 1}개
              </p>
              <p className="text-xs text-gray-500">카테고리</p>
            </div>
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
                <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                  매입 단가
                </th>
                <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                  안전 재고
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  공급사
                </th>
                <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">
                  상태
                </th>
                <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">
                  관리
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleViewDetail(item)}
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
                  <td className="py-4 px-6 text-right text-gray-900">
                    ₩{item.unitPrice.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-right font-semibold text-gray-900">
                    {item.safetyStock}
                    {item.unit}
                  </td>
                  <td className="py-4 px-6 text-gray-700">{item.supplier}</td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.status === "active" ? (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          활성
                        </>
                      ) : (
                        "비활성"
                      )}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(item);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      수정
                    </button>
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

      {/* Detail Modal */}
      {showDetailModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">품목 상세 정보</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    품목코드
                  </label>
                  <p className="font-mono text-lg text-gray-900">
                    {selectedItem.itemCode}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    품목명
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedItem.itemName}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    카테고리
                  </label>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {selectedItem.category}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    단위
                  </label>
                  <p className="text-gray-900">{selectedItem.unit}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    매입 단가
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    ₩{selectedItem.unitPrice.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    안전 재고
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedItem.safetyStock}
                    {selectedItem.unit}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    공급사
                  </label>
                  <p className="text-gray-900">{selectedItem.supplier}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    유통기한
                  </label>
                  <p className="text-gray-900">{selectedItem.shelfLife}일</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  handleEdit(selectedItem);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                수정
              </button>
              <button
                onClick={() => setShowDetailModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit/New Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {isNewItem ? "신규 품목 등록" : "품목 정보 수정"}
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    품목코드 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.itemCode || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, itemCode: e.target.value })
                    }
                    disabled={!isNewItem}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    품목명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.itemName || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, itemName: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    카테고리
                  </label>
                  <select
                    value={formData.category || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.filter((c) => c !== "전체").map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    단위
                  </label>
                  <input
                    type="text"
                    value={formData.unit || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, unit: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    매입 단가
                  </label>
                  <input
                    type="number"
                    value={formData.unitPrice || 0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        unitPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    안전 재고
                  </label>
                  <input
                    type="number"
                    value={formData.safetyStock || 0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        safetyStock: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    공급사
                  </label>
                  <input
                    type="text"
                    value={formData.supplier || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, supplier: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    유통기한 (일)
                  </label>
                  <input
                    type="number"
                    value={formData.shelfLife || 0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shelfLife: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isNewItem ? "등록" : "저장"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}