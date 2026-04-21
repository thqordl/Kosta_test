import { useState } from "react";
import {
  Calendar,
  Clock,
  AlertTriangle,
  Package,
  Filter,
  TrendingUp,
  DollarSign,
} from "lucide-react";

interface ExpiryItem {
  id: string;
  branch: string;
  itemName: string;
  itemCode: string;
  category: string;
  quantity: number;
  unit: string;
  receivedDate: string;
  expiryDate: string;
  daysLeft: number;
  status: "urgent" | "warning" | "normal";
}

const mockExpiryItems: ExpiryItem[] = [
  {
    id: "1",
    branch: "강남점",
    itemName: "소고기 패티",
    itemCode: "MEAT-001",
    category: "육류",
    quantity: 45,
    unit: "개",
    receivedDate: "2026-03-20",
    expiryDate: "2026-03-30",
    daysLeft: 1,
    status: "urgent",
  },
  {
    id: "1-2",
    branch: "강남점",
    itemName: "소고기 패티",
    itemCode: "MEAT-001",
    category: "육류",
    quantity: 30,
    unit: "개",
    receivedDate: "2026-03-18",
    expiryDate: "2026-03-29",
    daysLeft: 0,
    status: "urgent",
  },
  {
    id: "2",
    branch: "강남점",
    itemName: "생크림",
    itemCode: "DAIRY-001",
    category: "유제품",
    quantity: 12,
    unit: "L",
    receivedDate: "2026-03-25",
    expiryDate: "2026-03-31",
    daysLeft: 2,
    status: "urgent",
  },
  {
    id: "3",
    branch: "홍대점",
    itemName: "소고기 패티",
    itemCode: "MEAT-001",
    category: "육류",
    quantity: 38,
    unit: "개",
    receivedDate: "2026-03-20",
    expiryDate: "2026-03-30",
    daysLeft: 1,
    status: "urgent",
  },
  {
    id: "3-2",
    branch: "홍대점",
    itemName: "소고기 패티",
    itemCode: "MEAT-001",
    category: "육류",
    quantity: 25,
    unit: "개",
    receivedDate: "2026-03-22",
    expiryDate: "2026-04-01",
    daysLeft: 3,
    status: "warning",
  },
  {
    id: "4",
    branch: "본사 물류창고",
    itemName: "체다치즈",
    itemCode: "DAIRY-002",
    category: "유제품",
    quantity: 50,
    unit: "장",
    receivedDate: "2026-03-24",
    expiryDate: "2026-03-31",
    daysLeft: 2,
    status: "urgent",
  },
  {
    id: "4-2",
    branch: "본사 물류창고",
    itemName: "체다치즈",
    itemCode: "DAIRY-002",
    category: "유제품",
    quantity: 35,
    unit: "장",
    receivedDate: "2026-03-23",
    expiryDate: "2026-03-30",
    daysLeft: 1,
    status: "urgent",
  },
  {
    id: "5",
    branch: "신촌점",
    itemName: "양상추",
    itemCode: "VEG-002",
    category: "채소",
    quantity: 8,
    unit: "kg",
    receivedDate: "2026-03-26",
    expiryDate: "2026-04-01",
    daysLeft: 3,
    status: "warning",
  },
  {
    id: "5-2",
    branch: "신촌점",
    itemName: "양상추",
    itemCode: "VEG-002",
    category: "채소",
    quantity: 6,
    unit: "kg",
    receivedDate: "2026-03-27",
    expiryDate: "2026-04-03",
    daysLeft: 5,
    status: "warning",
  },
  {
    id: "6",
    branch: "이대점",
    itemName: "토마토",
    itemCode: "VEG-003",
    category: "채소",
    quantity: 15,
    unit: "kg",
    receivedDate: "2026-03-25",
    expiryDate: "2026-04-02",
    daysLeft: 4,
    status: "warning",
  },
  {
    id: "7",
    branch: "강남점",
    itemName: "양상추",
    itemCode: "VEG-002",
    category: "채소",
    quantity: 10,
    unit: "kg",
    receivedDate: "2026-03-26",
    expiryDate: "2026-04-02",
    daysLeft: 4,
    status: "warning",
  },
  {
    id: "8",
    branch: "홍대점",
    itemName: "토마토",
    itemCode: "VEG-003",
    category: "채소",
    quantity: 12,
    unit: "kg",
    receivedDate: "2026-03-24",
    expiryDate: "2026-04-03",
    daysLeft: 5,
    status: "warning",
  },
  {
    id: "9",
    branch: "신촌점",
    itemName: "버거빵",
    itemCode: "BREAD-001",
    category: "빵류",
    quantity: 165,
    unit: "개",
    receivedDate: "2026-03-23",
    expiryDate: "2026-04-05",
    daysLeft: 7,
    status: "warning",
  },
  {
    id: "9-2",
    branch: "신촌점",
    itemName: "버거빵",
    itemCode: "BREAD-001",
    category: "빵류",
    quantity: 120,
    unit: "개",
    receivedDate: "2026-03-24",
    expiryDate: "2026-04-06",
    daysLeft: 8,
    status: "normal",
  },
  {
    id: "10",
    branch: "본사 물류창고",
    itemName: "생크림",
    itemCode: "DAIRY-001",
    category: "유제품",
    quantity: 65,
    unit: "L",
    receivedDate: "2026-03-22",
    expiryDate: "2026-04-06",
    daysLeft: 8,
    status: "normal",
  },
];

interface DisposalRecord {
  id: string;
  date: string;
  branch: string;
  itemName: string;
  quantity: number;
  unit: string;
  amount: number;
  reason: string;
}

const mockDisposalRecords: DisposalRecord[] = [
  {
    id: "1",
    date: "2026-04-04",
    branch: "강남점",
    itemName: "소고기 패티",
    quantity: 25,
    unit: "개",
    amount: 625000,
    reason: "유통기한 만료",
  },
  {
    id: "2",
    date: "2026-04-03",
    branch: "홍대점",
    itemName: "생크림",
    quantity: 8,
    unit: "L",
    amount: 240000,
    reason: "유통기한 만료",
  },
  {
    id: "3",
    date: "2026-04-03",
    branch: "강남점",
    itemName: "양상추",
    quantity: 12,
    unit: "kg",
    amount: 180000,
    reason: "품질 불량",
  },
  {
    id: "4",
    date: "2026-04-02",
    branch: "신촌점",
    itemName: "토마토",
    quantity: 15,
    unit: "kg",
    amount: 300000,
    reason: "유통기한 만료",
  },
  {
    id: "5",
    date: "2026-04-02",
    branch: "이대점",
    itemName: "체다치즈",
    quantity: 20,
    unit: "장",
    amount: 500000,
    reason: "품질 불량",
  },
  {
    id: "6",
    date: "2026-04-01",
    branch: "강남점",
    itemName: "버거빵",
    quantity: 50,
    unit: "개",
    amount: 250000,
    reason: "유통기한 만료",
  },
  {
    id: "7",
    date: "2026-04-01",
    branch: "홍대점",
    itemName: "소고기 패티",
    quantity: 18,
    unit: "개",
    amount: 450000,
    reason: "파손/손상",
  },
  {
    id: "8",
    date: "2026-03-31",
    branch: "신촌점",
    itemName: "생크림",
    quantity: 6,
    unit: "L",
    amount: 180000,
    reason: "유통기한 만료",
  },
  {
    id: "9",
    date: "2026-03-30",
    branch: "강남점",
    itemName: "양상추",
    quantity: 10,
    unit: "kg",
    amount: 150000,
    reason: "품질 불량",
  },
  {
    id: "10",
    date: "2026-03-29",
    branch: "이대점",
    itemName: "토마토",
    quantity: 12,
    unit: "kg",
    amount: 240000,
    reason: "유통기한 만료",
  },
];

const branches = ["전체", "본사 물류창고", "강남점", "홍대점", "신촌점", "이대점"];

export function LossManagement() {
  const [activeTab, setActiveTab] = useState<"expiry" | "disposal">("expiry");

  // Common filters for both tabs
  const [selectedBranch, setSelectedBranch] = useState("전체");
  const [startDate, setStartDate] = useState("2026-03-01");
  const [endDate, setEndDate] = useState("2026-04-05");

  // Filter expiry items based on expiry date range
  const filteredExpiryItems = mockExpiryItems.filter((item) => {
    const matchesBranch = selectedBranch === "전체" || item.branch === selectedBranch;
    const expiryDate = new Date(item.expiryDate);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const matchesDate = expiryDate >= start && expiryDate <= end;
    return matchesBranch && matchesDate;
  });

  filteredExpiryItems.sort((a, b) => {
    if (a.daysLeft !== b.daysLeft) {
      return a.daysLeft - b.daysLeft;
    }
    return a.branch.localeCompare(b.branch);
  });

  const expiryStats = {
    urgent: filteredExpiryItems.filter((i) => i.daysLeft <= 2).length,
    warning: filteredExpiryItems.filter((i) => i.daysLeft > 2 && i.daysLeft <= 7).length,
    total: filteredExpiryItems.length,
  };

  const branchGroups = filteredExpiryItems.reduce((acc, item) => {
    if (!acc[item.branch]) {
      acc[item.branch] = [];
    }
    acc[item.branch].push(item);
    return acc;
  }, {} as Record<string, ExpiryItem[]>);

  // Filter disposal records
  const filteredDisposalRecords = mockDisposalRecords.filter((record) => {
    const matchesBranch = selectedBranch === "전체" || record.branch === selectedBranch;
    const recordDate = new Date(record.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const matchesDate = recordDate >= start && recordDate <= end;
    return matchesBranch && matchesDate;
  });

  // Calculate disposal stats
  const disposalStats = {
    totalAmount: filteredDisposalRecords.reduce((sum, r) => sum + r.amount, 0),
    totalCount: filteredDisposalRecords.length,
    reasons: filteredDisposalRecords.reduce((acc, r) => {
      acc[r.reason] = (acc[r.reason] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };

  const topReason =
    Object.entries(disposalStats.reasons).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
  const topReasonCount = Object.entries(disposalStats.reasons).sort((a, b) => b[1] - a[1])[0]?.[1] || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">지점 손실 관리</h2>
        <p className="text-gray-500 mt-1">유통기한 임박 품목과 폐기율을 관리하세요</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Filters - Common for both tabs */}
        <div className="bg-gray-50 rounded-t-lg border-b border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">지점 선택</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
              >
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                일자 범위
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                />
                <span className="text-gray-500">~</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("expiry")}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
              activeTab === "expiry"
                ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            유통기한
          </button>
          <button
            onClick={() => setActiveTab("disposal")}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
              activeTab === "disposal"
                ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            폐기 이력
          </button>
        </div>

        <div className="p-6">
          {activeTab === "expiry" ? (
            <div className="space-y-6">
              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">{expiryStats.urgent}</p>
                      <p className="text-xs text-gray-500">긴급</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">{expiryStats.warning}</p>
                      <p className="text-xs text-gray-500">경고</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{expiryStats.total}</p>
                      <p className="text-xs text-gray-500">전체 임박 품목</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                          지점/창고
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
                        <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">
                          상태
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredExpiryItems.map((item) => (
                        <tr
                          key={item.id}
                          className={`border-b border-gray-100 hover:bg-gray-50 ${
                            item.daysLeft <= 1
                              ? "bg-red-50"
                              : item.daysLeft <= 2
                              ? "bg-orange-50"
                              : ""
                          }`}
                        >
                          <td className="py-4 px-6 font-medium text-gray-900">{item.branch}</td>
                          <td className="py-4 px-6 font-mono text-sm text-gray-600">
                            {item.itemCode}
                          </td>
                          <td className="py-4 px-6 font-medium text-gray-900">{item.itemName}</td>
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
                              item.daysLeft <= 1
                                ? "text-red-600"
                                : item.daysLeft <= 2
                                ? "text-orange-600"
                                : item.daysLeft <= 7
                                ? "text-yellow-600"
                                : "text-gray-700"
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
                                item.daysLeft <= 1
                                  ? "bg-red-100 text-red-700"
                                  : item.daysLeft <= 2
                                  ? "bg-orange-100 text-orange-700"
                                  : item.daysLeft <= 7
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              <Clock className="w-4 h-4" />
                              D-{item.daysLeft}
                            </span>
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

                {filteredExpiryItems.length === 0 && (
                  <div className="py-12 text-center">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg mb-2">유통기한 임박 품목이 없습니다</p>
                    <p className="text-gray-400 text-sm">
                      선택한 필터 조건에 해당하는 품목이 없습니다
                    </p>
                  </div>
                )}
              </div>

              {/* Branch Summary */}
              {selectedBranch === "전체" && Object.keys(branchGroups).length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-4">지점별 요약</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(branchGroups).map(([branch, items]) => (
                      <div key={branch} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{branch}</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">전체</span>
                            <span className="font-semibold text-gray-900">{items.length}건</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-red-600">긴급</span>
                            <span className="font-semibold text-red-600">
                              {items.filter((i) => i.daysLeft <= 2).length}건
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-orange-600">경고</span>
                            <span className="font-semibold text-orange-600">
                              {items.filter((i) => i.daysLeft > 2 && i.daysLeft <= 7).length}건
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Summary */}
              {filteredExpiryItems.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    조회기간 <span className="font-semibold">{startDate} ~ {endDate}</span>의 유통기한 품목{" "}
                    <span className="font-semibold">{filteredExpiryItems.length}건</span>이
                    조회되었습니다.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">폐기 금액</p>
                      <p className="text-xl font-bold text-gray-900">
                        ₩{disposalStats.totalAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">폐기 건수</p>
                      <p className="text-xl font-bold text-gray-900">{disposalStats.totalCount}건</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reasons Summary Card */}
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-semibold text-gray-900">폐기 사유 요약</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg border-2 border-red-200 bg-red-50">
                    <p className="text-lg font-bold text-gray-900 mb-1">유통기한 만료</p>
                    <p className="text-2xl font-bold text-gray-900">{disposalStats.reasons["유통기한 만료"] || 0}건</p>
                  </div>
                  <div className="p-3 rounded-lg border-2 border-orange-200 bg-orange-50">
                    <p className="text-lg font-bold text-gray-900 mb-1">품질 불량</p>
                    <p className="text-2xl font-bold text-gray-900">{disposalStats.reasons["품질 불량"] || 0}건</p>
                  </div>
                  <div className="p-3 rounded-lg border-2 border-yellow-200 bg-yellow-50">
                    <p className="text-lg font-bold text-gray-900 mb-1">파손/손상</p>
                    <p className="text-2xl font-bold text-gray-900">{disposalStats.reasons["파손/손상"] || 0}건</p>
                  </div>
                  <div className="p-3 rounded-lg border-2 border-gray-200 bg-gray-50">
                    <p className="text-lg font-bold text-gray-900 mb-1">기타</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Object.entries(disposalStats.reasons)
                        .filter(([reason]) => !["유통기한 만료", "품질 불량", "파손/손상"].includes(reason))
                        .reduce((sum, [_, count]) => sum + count, 0)}건
                    </p>
                  </div>
                </div>
              </div>

              {/* Disposal Records Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                          폐기일자
                        </th>
                        <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                          지점
                        </th>
                        <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                          품목명
                        </th>
                        <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                          수량
                        </th>
                        <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                          폐기 금액
                        </th>
                        <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                          사유
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDisposalRecords.map((record) => (
                        <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-6 text-gray-700">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              {record.date}
                            </div>
                          </td>
                          <td className="py-4 px-6 font-medium text-gray-900">{record.branch}</td>
                          <td className="py-4 px-6 font-medium text-gray-900">{record.itemName}</td>
                          <td className="py-4 px-6 text-right font-semibold text-gray-900">
                            {record.quantity}
                            {record.unit}
                          </td>
                          <td className="py-4 px-6 text-right font-semibold text-red-600">
                            ₩{record.amount.toLocaleString()}
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                record.reason === "유통기한 만료"
                                  ? "bg-red-100 text-red-700"
                                  : record.reason === "품질 불량"
                                  ? "bg-orange-100 text-orange-700"
                                  : record.reason === "파손/손상"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {record.reason}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredDisposalRecords.length === 0 && (
                  <div className="py-12 text-center">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg mb-2">폐기 이력이 없습니다</p>
                    <p className="text-gray-400 text-sm">
                      선택한 필터 조건에 해당하는 폐기 이력이 없습니다
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}