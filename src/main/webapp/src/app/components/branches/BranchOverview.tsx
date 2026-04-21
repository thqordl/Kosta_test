import { Store, TrendingUp, Users, Package } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function BranchOverview() {
  const branchData = [
    { branch: "강남지점", sales: 45000000, orders: 1234, employees: 15, inventory: 245 },
    { branch: "홍대지점", sales: 38000000, orders: 1089, employees: 12, inventory: 238 },
    { branch: "판교지점", sales: 52000000, orders: 1456, employees: 18, inventory: 251 },
    { branch: "분당지점", sales: 41000000, orders: 1123, employees: 14, inventory: 242 },
    { branch: "신촌지점", sales: 36000000, orders: 987, employees: 11, inventory: 239 },
  ];

  const totalSales = branchData.reduce((sum, b) => sum + b.sales, 0);
  const totalEmployees = branchData.reduce((sum, b) => sum + b.employees, 0);

  const chartData = branchData.map(b => ({
    name: b.branch,
    매출: b.sales / 1000000,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">전국 직영점 영업/매출 현황</h2>
        <p className="text-gray-500 mt-1">전체 지점의 실시간 영업 현황을 확인하세요</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Store className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-sm text-gray-600">총 직영점</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{branchData.length}개</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-sm text-gray-600">전체 매출</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">₩{(totalSales / 100000000).toFixed(1)}억</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-sm text-gray-600">총 직원</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{totalEmployees}명</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">지점별 매출 비교</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `₩${value}백만`} />
            <Legend />
            <Bar dataKey="매출" fill="#3b82f6" name="매출 (백만원)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Branch Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">지점별 상세 현황</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">지점명</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">매출</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">주문 건수</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">직원 수</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">재고 품목</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {branchData.map((branch, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{branch.branch}</td>
                  <td className="px-6 py-4 text-gray-900 font-semibold">
                    ₩{(branch.sales / 10000).toLocaleString()}만
                  </td>
                  <td className="px-6 py-4 text-gray-600">{branch.orders.toLocaleString()}건</td>
                  <td className="px-6 py-4 text-gray-600">{branch.employees}명</td>
                  <td className="px-6 py-4 text-gray-600">{branch.inventory}개</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
