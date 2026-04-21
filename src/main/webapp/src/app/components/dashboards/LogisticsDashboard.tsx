import { Truck, Package, Clock, CheckCircle } from "lucide-react";

export function LogisticsDashboard() {
  const logisticsStats = [
    { label: "배송 중", value: "24", color: "blue", icon: Truck },
    { label: "배송 완료", value: "156", color: "green", icon: CheckCircle },
    { label: "대기 중", value: "8", color: "yellow", icon: Clock },
    { label: "총 배송 건", value: "188", color: "purple", icon: Package },
  ];

  const deliveries = [
    { id: "DEL-001", destination: "강남지점", items: 45, status: "배송중", eta: "14:30" },
    { id: "DEL-002", destination: "홍대지점", items: 38, status: "배송완료", eta: "-" },
    { id: "DEL-003", destination: "판교지점", items: 52, status: "배송중", eta: "16:00" },
    { id: "DEL-004", destination: "분당지점", items: 41, status: "대기중", eta: "18:00" },
    { id: "DEL-005", destination: "신촌지점", items: 36, status: "배송완료", eta: "-" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">물류 관리 대시보드</h2>
        <p className="text-gray-500 mt-1">실시간 배송 현황을 관리하세요</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {logisticsStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 text-${stat.color}-600`} />
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Delivery Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">오늘의 배송 현황</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">배송번호</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">목적지</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">품목 수</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">도착 예정</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {deliveries.map((delivery) => (
                <tr key={delivery.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{delivery.id}</td>
                  <td className="px-6 py-4 text-gray-600">{delivery.destination}</td>
                  <td className="px-6 py-4 text-gray-600">{delivery.items}개</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      delivery.status === "배송완료"
                        ? "bg-green-100 text-green-700"
                        : delivery.status === "배송중"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {delivery.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{delivery.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
