import { Package, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";

export function InventoryDashboard() {
  const inventoryStats = [
    { label: "총 재고 품목", value: "1,247", change: "+23", color: "blue" },
    { label: "부족 품목", value: "15", change: "-5", color: "red" },
    { label: "과다 재고", value: "8", change: "+2", color: "yellow" },
    { label: "정상 재고", value: "1,224", change: "+26", color: "green" },
  ];

  const branchInventory = [
    { branch: "강남지점", total: 245, low: 3, normal: 242, status: "양호" },
    { branch: "홍대지점", total: 238, low: 5, normal: 233, status: "주의" },
    { branch: "판교지점", total: 251, low: 2, normal: 249, status: "양호" },
    { branch: "분당지점", total: 242, low: 4, normal: 238, status: "양호" },
    { branch: "신촌지점", total: 239, low: 6, normal: 233, status: "주의" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">재고 관리 대시보드</h2>
        <p className="text-gray-500 mt-1">전체 지점의 재고 현황을 한눈에 확인하세요</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {inventoryStats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <Package className={`w-8 h-8 text-${stat.color}-600`} />
              <span className="text-sm text-gray-500">{stat.change}</span>
            </div>
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Branch Inventory Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">지점별 재고 현황</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">지점</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">총 품목</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">부족 품목</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">정상 품목</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {branchInventory.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.branch}</td>
                  <td className="px-6 py-4 text-gray-600">{item.total}</td>
                  <td className="px-6 py-4">
                    <span className="text-red-600 font-medium">{item.low}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-green-600 font-medium">{item.normal}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      item.status === "양호" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {item.status}
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
