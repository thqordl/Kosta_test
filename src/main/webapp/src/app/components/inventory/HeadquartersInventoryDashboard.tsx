import { useState } from "react";
import { Link } from "react-router";
import {
  DollarSign,
  AlertTriangle,
  Clock,
  ArrowRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// 본사 총 재고 자산
const totalAssets = {
  headquarters: 125000000, // 본사 물류창고
  branches: 85000000, // 전 지점 합계
  total: 210000000,
};

// 안전재고 미달 품목
const lowStockItems = [
  { name: "소고기 패티", shortage: 150, unit: "개", branches: ["강남점", "홍대점"] },
  { name: "감자", shortage: 80, unit: "kg", branches: ["강남점", "신촌점", "홍대점"] },
  { name: "생크림", shortage: 25, unit: "L", branches: ["강남점", "이대점"] },
  { name: "양상추", shortage: 30, unit: "kg", branches: ["강남점", "이대점"] },
  { name: "버거빵", shortage: 200, unit: "개", branches: ["강남점", "홍대점", "이대점"] },
  { name: "식용유", shortage: 25, unit: "L", branches: ["신촌점", "이대점"] },
  { name: "콜라 시럽", shortage: 15, unit: "L", branches: ["신촌점", "이대점"] },
];

// 유통기한 임박 품목
const expiringItems = [
  { branch: "강남점", item: "소고기 패티", daysLeft: 1, quantity: 45, unit: "개" },
  { branch: "강남점", item: "생크림", daysLeft: 2, quantity: 12, unit: "L" },
  { branch: "홍대점", item: "소고기 패티", daysLeft: 1, quantity: 38, unit: "개" },
  { branch: "본사 물류창고", item: "체다치즈", daysLeft: 2, quantity: 50, unit: "장" },
  { branch: "신촌점", item: "양상추", daysLeft: 3, quantity: 8, unit: "kg" },
];

// 지점 폐기율 차트 데이터
const disposalRateData = [
  { month: "1월", rate: 3.2 },
  { month: "2월", rate: 2.8 },
  { month: "3월", rate: 4.1 },
  { month: "4월", rate: 3.5 },
  { month: "5월", rate: 2.9 },
  { month: "6월", rate: 3.7 },
];

// 지점별 폐기액 (이번 달)
const branchDisposalData = [
  { branch: "강남점", amount: 850000 },
  { branch: "홍대점", amount: 720000 },
  { branch: "신촌점", amount: 650000 },
  { branch: "이대점", amount: 580000 },
];

export function HeadquartersInventoryDashboard() {
  const [activeAlertTab, setActiveAlertTab] = useState<"lowStock" | "expiring">("lowStock");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">재고 관리 대시보드</h2>
        <p className="text-gray-500 mt-1">본사 및 전 지점 재고 현황을 모니터링하세요</p>
      </div>

      {/* 총 재고 자산 요약 카드 - No filters needed for dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">전체 재고 자산</p>
              <p className="text-2xl font-bold text-gray-900">
                ₩{(totalAssets.total / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">본사 물류창고</span>
              <span className="font-semibold text-gray-900">
                ₩{(totalAssets.headquarters / 1000000).toFixed(1)}M
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">전 지점 합계</span>
              <span className="font-semibold text-gray-900">
                ₩{(totalAssets.branches / 1000000).toFixed(1)}M
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">안전재고 미달 품목</p>
              <p className="text-2xl font-bold text-yellow-600">
                {lowStockItems.length}개
              </p>
            </div>
          </div>
          <Link
            to="/inventory/branch-status"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            상세 보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">유통기한 임박 (3일 이내)</p>
              <p className="text-2xl font-bold text-red-600">
                {expiringItems.filter((i) => i.daysLeft <= 3).length}건
              </p>
            </div>
          </div>
          <Link
            to="/inventory/loss-management"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            상세 보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 지점 폐기율 추이 */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-gray-900">
              전체 지점 평균 폐기율 추이
            </h3>
            <Link
              to="/inventory/loss-management"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              상세 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={disposalRateData}>
              <CartesianGrid key="grid-disposal" strokeDasharray="3 3" />
              <XAxis key="xaxis-disposal" dataKey="month" />
              <YAxis key="yaxis-disposal" />
              <Tooltip key="tooltip-disposal" formatter={(value) => `${value}%`} />
              <Legend key="legend-disposal" />
              <Line
                key="line-disposal-rate"
                type="monotone"
                dataKey="rate"
                stroke="#EF4444"
                strokeWidth={2}
                name="폐기율"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 지점별 폐기액 (이번 달) */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-gray-900">
              지점별 폐기액 (이번 달)
            </h3>
            <Link
              to="/inventory/loss-management"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              상세 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={branchDisposalData}>
              <CartesianGrid key="grid-branch-disposal" strokeDasharray="3 3" />
              <XAxis key="xaxis-branch-disposal" dataKey="branch" />
              <YAxis key="yaxis-branch-disposal" />
              <Tooltip key="tooltip-branch-disposal" formatter={(value) => `₩${Number(value).toLocaleString()}`} />
              <Legend key="legend-branch-disposal" />
              <Bar key="bar-disposal-amount" dataKey="amount" fill="#EF4444" name="폐기액" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 안전재고 미달 경고 & 유통기한 임박 품목 - 탭 통합 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveAlertTab("lowStock")}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
              activeAlertTab === "lowStock"
                ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            안전재고 미달 경고
          </button>
          <button
            onClick={() => setActiveAlertTab("expiring")}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
              activeAlertTab === "expiring"
                ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            유통기한 임박 품목
          </button>
        </div>

        {activeAlertTab === "lowStock" ? (
          <>
            <div className="bg-yellow-50 px-6 py-4 border-b border-yellow-200">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                <div>
                  <h3 className="font-semibold text-lg text-yellow-900">
                    안전재고 미달 경고
                  </h3>
                  <p className="text-sm text-yellow-600">
                    발주가 필요한 품목입니다
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                      품목명
                    </th>
                    <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                      부족량
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                      해당 지점
                    </th>
                    <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">
                      조치
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockItems.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-6 font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="py-4 px-6 text-right font-semibold text-red-600">
                        -{item.shortage}
                        {item.unit}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1">
                          {item.branches.map((branch) => (
                            <span
                              key={branch}
                              className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full"
                            >
                              {branch}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <Link
                          to="/orders/requests"
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          발주 요청
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <div className="bg-red-50 px-6 py-4 border-b border-red-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-red-600" />
                  <div>
                    <h3 className="font-semibold text-lg text-red-900">
                      유통기한 임박 품목
                    </h3>
                    <p className="text-sm text-red-600">
                      3일 이내 만료 예정 품목
                    </p>
                  </div>
                </div>
                <Link
                  to="/inventory/loss-management"
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
                      지점/창고
                    </th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                      품목명
                    </th>
                    <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                      수량
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
                  {expiringItems.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-100 hover:bg-gray-50 ${
                        item.daysLeft <= 1 ? "bg-red-50" : ""
                      }`}
                    >
                      <td className="py-4 px-6 font-medium text-gray-900">
                        {item.branch}
                      </td>
                      <td className="py-4 px-6 text-gray-700">{item.item}</td>
                      <td className="py-4 px-6 text-right font-semibold text-gray-900">
                        {item.quantity}
                        {item.unit}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                            item.daysLeft <= 1
                              ? "bg-red-100 text-red-700"
                              : item.daysLeft <= 2
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
                            item.daysLeft <= 1
                              ? "bg-red-100 text-red-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {item.daysLeft <= 1 ? "긴급" : "경고"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}