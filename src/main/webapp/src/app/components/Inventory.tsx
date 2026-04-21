import { useState } from "react";
import { Search, Plus, AlertTriangle, Package, Edit, Trash2 } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  quantity: number;
  minQuantity: number;
  price: number;
  status: "재고충분" | "재고부족" | "품절";
}

const initialInventory: InventoryItem[] = [
  { id: "1", name: "노트북 - ThinkPad X1", category: "전자제품", sku: "SKU-001", quantity: 45, minQuantity: 20, price: 1500000, status: "재고충분" },
  { id: "2", name: "무선 마우스 - MX Master", category: "전자제품", sku: "SKU-002", quantity: 15, minQuantity: 30, price: 120000, status: "재고부족" },
  { id: "3", name: "오피스 의자 - ErgoMax", category: "가구", sku: "SKU-003", quantity: 28, minQuantity: 15, price: 450000, status: "재고충분" },
  { id: "4", name: "모니터 - UltraWide 34", category: "전자제품", sku: "SKU-004", quantity: 0, minQuantity: 10, price: 890000, status: "품절" },
  { id: "5", name: "키보드 - 기계식", category: "전자제품", sku: "SKU-005", quantity: 67, minQuantity: 25, price: 180000, status: "재고충분" },
  { id: "6", name: "책상 - 스탠딩 데스크", category: "가구", sku: "SKU-006", quantity: 12, minQuantity: 8, price: 650000, status: "재고충분" },
  { id: "7", name: "헤드셋 - WH-1000XM5", category: "전자제품", sku: "SKU-007", quantity: 8, minQuantity: 15, price: 420000, status: "재고부족" },
  { id: "8", name: "프린터 - LaserJet Pro", category: "전자제품", sku: "SKU-008", quantity: 22, minQuantity: 10, price: 350000, status: "재고충분" },
];

export function Inventory() {
  const [inventory] = useState<InventoryItem[]>(initialInventory);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const categories = ["전체", "전자제품", "가구", "의류", "식품"];

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "전체" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockCount = inventory.filter(item => item.status === "재고부족" || item.status === "품절").length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">재고관리</h2>
          <p className="text-gray-500 mt-1">제품 재고를 관리하고 모니터링하세요</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          재고 추가
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{inventory.length}</p>
              <p className="text-sm text-gray-500">전체 제품</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{lowStockCount}</p>
              <p className="text-sm text-gray-500">재고 부족 경고</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">₩{(totalValue / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-gray-500">총 재고 가치</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="제품명 또는 SKU로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제품</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">수량</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">가격</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{item.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.quantity}개</div>
                    <div className="text-xs text-gray-500">최소: {item.minQuantity}개</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₩{item.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      item.status === "재고충분"
                        ? "bg-green-100 text-green-700"
                        : item.status === "재고부족"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-700">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
