import { useState } from "react";
import { TrendingUp, AlertTriangle, DollarSign, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// 지점별 폐기 금액 데이터
const branchDisposalData = [
  { branch: "강남점", amount: 2850000, items: 45, rate: 4.2 },
  { branch: "홍대점", amount: 2420000, items: 38, rate: 3.8 },
  { branch: "신촌점", amount: 1950000, items: 32, rate: 3.2 },
  { branch: "이대점", amount: 1680000, items: 28, rate: 2.9 },
  { branch: "본사 물류창고", amount: 1250000, items: 22, rate: 2.1 },
];

// 폐기 사유별 데이터
const disposalReasonData = [
  { reason: "유통기한 만료", value: 4850000, count: 85 },
  { reason: "품질 불량", value: 2950000, count: 48 },
  { reason: "파손/손상", value: 1200000, count: 22 },
  { reason: "기타", value: 1150000, count: 10 },
];

// 상품별 폐기율 데이터
const itemDisposalData = [
  {
    itemName: "소고기 패티",
    category: "육류",
    totalStock: 1200,
    disposed: 85,
    rate: 7.1,
    amount: 2125000,
  },
  {
    itemName: "생크림",
    category: "유제품",
    totalStock: 450,
    disposed: 45,
    rate: 10.0,
    amount: 1350000,
  },
  {
    itemName: "양상추",
    category: "채소",
    totalStock: 680,
    disposed: 72,
    rate: 10.6,
    amount: 1080000,
  },
  {
    itemName: "체다치즈",
    category: "유제품",
    totalStock: 520,
    disposed: 38,
    rate: 7.3,
    amount: 950000,
  },
  {
    itemName: "토마토",
    category: "채소",
    totalStock: 380,
    disposed: 42,
    rate: 11.1,
    amount: 840000,
  },
  {
    itemName: "버거빵",
    category: "빵류",
    totalStock: 2400,
    disposed: 95,
    rate: 4.0,
    amount: 475000,
  },
];

const COLORS = ["#EF4444", "#F59E0B", "#3B82F6", "#10B981"];

export function DisposalRateAnalysis() {
  const [dateRange, setDateRange] = useState("month"); // month, quarter, year
  const [rankingPage, setRankingPage] = useState(1);
  const rankingPerPage = 5;

  const totalDisposal = branchDisposalData.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const totalItems = branchDisposalData.reduce(
    (sum, item) => sum + item.items,
    0
  );
  const avgRate =
    branchDisposalData.reduce((sum, item) => sum + item.rate, 0) /
    branchDisposalData.length;

  // High risk branches (loss rate > 3.5%)
  const highRiskBranches = branchDisposalData.filter((b) => b.rate > 3.5);

  // Pagination for branch disposal ranking (5 items per page)
  const totalRankingPages = Math.ceil(branchDisposalData.length / rankingPerPage);
  const rankingStartIndex = (rankingPage - 1) * rankingPerPage;
  const rankingEndIndex = rankingStartIndex + rankingPerPage;
  const currentRankingBranches = branchDisposalData.slice(rankingStartIndex, rankingEndIndex);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            지점별/상품별 폐기율 조회
          </h2>
          <p className="text-gray-500 mt-1">
            폐기 현황을 분석하고 고위험 지점을 관리하세요
          </p>
        </div>
        <div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="month">이번 달</option>
            <option value="quarter">이번 분기</option>
            <option value="year">올해</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">
                ₩{(totalDisposal / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500">총 폐기 금액</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{totalItems}건</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">폐기 품목 수</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">
                {avgRate.toFixed(1)}%
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500">평균 폐기율</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-red-600">
                {highRiskBranches.length}개
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500">고위험 지점</p>
        </div>
      </div>

      {/* 지점별 폐기 금액 랭킹 + 폐기 사유별 분포 및 상세 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 지점별 폐기 금액 랭킹 */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-semibold text-lg text-gray-900">
              지점별 폐기 금액 랭킹
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              전체 지점의 폐기 금액 순위를 확인하세요
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                    순위
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                    지점명
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">
                    폐기 금액
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">
                    폐기율
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRankingBranches.map((branch, index) => (
                  <tr
                    key={branch.branch}
                    className={`border-b border-gray-100 hover:bg-gray-50 ${
                      branch.rate > 3.5 ? "bg-red-50" : ""
                    }`}
                  >
                    <td className="py-3 px-4 font-semibold text-gray-900">
                      {rankingStartIndex + index + 1}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {branch.branch}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-900">
                      ₩{branch.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                          branch.rate > 3.5
                            ? "bg-red-100 text-red-700"
                            : branch.rate > 3.0
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {branch.rate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {branchDisposalData.length > rankingPerPage && (
            <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setRankingPage((prev) => Math.max(prev - 1, 1))}
                disabled={rankingPage === 1}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                이전
              </button>
              <div className="text-sm text-gray-500">
                {rankingPage} / {totalRankingPages}
              </div>
              <button
                onClick={() =>
                  setRankingPage((prev) => Math.min(prev + 1, totalRankingPages))
                }
                disabled={rankingPage === totalRankingPages}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                다음
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* 폐기 사유별 분포 및 상세 */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">
            폐기 사유별 분포
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                key="reason-pie"
                data={disposalReasonData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.reason} (${entry.count}건)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {disposalReasonData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                key="reason-tooltip"
                formatter={(value) => `₩${Number(value).toLocaleString()}`}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* 폐기 사유별 상세 */}
          <div className="grid grid-cols-1 gap-3 mt-6">
            {disposalReasonData.map((reason, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-3"
                style={{ borderLeftWidth: "4px", borderLeftColor: COLORS[index] }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4
                    className="font-semibold text-sm"
                    style={{ color: COLORS[index] }}
                  >
                    {reason.reason}
                  </h4>
                  <span className="text-xs font-bold text-gray-900">
                    {((reason.value / totalDisposal) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">{reason.count}건</span>
                  <span className="font-semibold text-gray-900">
                    ₩{(reason.value / 1000000).toFixed(1)}M
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 상품별 폐기율 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-lg text-gray-900">
            상품별 폐기율 분석
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            품목별 폐기 현황과 개선이 필요한 품목을 확인하세요
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  품목명
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  카테고리
                </th>
                <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                  총 재고
                </th>
                <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                  폐기 수량
                </th>
                <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">
                  폐기율
                </th>
                <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                  폐기 금액
                </th>
                <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">
                  상태
                </th>
              </tr>
            </thead>
            <tbody>
              {itemDisposalData.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-100 hover:bg-gray-50 ${
                    item.rate > 10 ? "bg-orange-50" : ""
                  }`}
                >
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {item.itemName}
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right text-gray-900">
                    {item.totalStock.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-right font-semibold text-red-600">
                    {item.disposed}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                        item.rate > 10
                          ? "bg-red-100 text-red-700"
                          : item.rate > 7
                          ? "bg-orange-100 text-orange-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.rate}%
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right font-semibold text-gray-900">
                    ₩{item.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {item.rate > 10 ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        <AlertTriangle className="w-3 h-3" />
                        심각
                      </span>
                    ) : item.rate > 7 ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                        <AlertTriangle className="w-3 h-3" />
                        주의
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        정상
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <p className="text-sm text-blue-900">
            <span className="font-semibold">이번 달</span> 전체 폐기 금액은{" "}
            <span className="font-semibold">
              ₩{totalDisposal.toLocaleString()}
            </span>
            이며, 평균 폐기율은{" "}
            <span className="font-semibold">{avgRate.toFixed(1)}%</span>입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
