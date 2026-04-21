import { useState } from "react";
import { Calendar, Clock, AlertTriangle, Package, Filter } from "lucide-react";

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

const branches = ["전체", "본사 물류창고", "강남점", "홍대점", "신촌점", "이대점"];

export function BranchExpiryTracking() {
  const [selectedBranch, setSelectedBranch] = useState("전체");
  const [filterDays, setFilterDays] = useState("7"); // 7일 이내

  // Filter items
  const filteredItems = mockExpiryItems.filter((item) => {
    const matchesBranch =
      selectedBranch === "전체" || item.branch === selectedBranch;
    const matchesDays = item.daysLeft <= Number(filterDays);
    return matchesBranch && matchesDays;
  });

  // Sort by urgency
  filteredItems.sort((a, b) => {
    if (a.daysLeft !== b.daysLeft) {
      return a.daysLeft - b.daysLeft;
    }
    return a.branch.localeCompare(b.branch);
  });

  // Calculate statistics
  const stats = {
    urgent: filteredItems.filter((i) => i.daysLeft <= 2).length,
    warning: filteredItems.filter((i) => i.daysLeft > 2 && i.daysLeft <= 7)
      .length,
    total: filteredItems.length,
  };

  // Group by branch
  const branchGroups = filteredItems.reduce((acc, item) => {
    if (!acc[item.branch]) {
      acc[item.branch] = [];
    }
    acc[item.branch].push(item);
    return acc;
  }, {} as Record<string, ExpiryItem[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          지점별 물품 유통기한 조회
        </h2>
        <p className="text-gray-500 mt-1">
          전 지점의 유통기한 임박 품목을 관리하세요
        </p>
      </div>

      {/* Alert Banner */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-900">긴급 조치 필요</h3>
            <p className="text-sm text-red-700">
              {stats.urgent}개 품목이 2일 이내 유통기한 만료 예정입니다. 즉시
              확인이 필요합니다.
            </p>
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
              <p className="text-xl font-bold text-red-600">{stats.urgent}</p>
              <p className="text-xs text-gray-500">긴급 (2일 이내)</p>
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
                {stats.warning}
              </p>
              <p className="text-xs text-gray-500">경고 (3-7일)</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-blue-600">{stats.total}</p>
              <p className="text-xs text-gray-500">전체 임박 품목</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <h3 className="font-semibold text-gray-900">필터</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Branch Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              지점 선택
            </label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          {/* Days Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              유통기한 기준
            </label>
            <select
              value={filterDays}
              onChange={(e) => setFilterDays(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="3">3일 이내</option>
              <option value="7">7일 이내</option>
              <option value="14">14일 이내</option>
              <option value="30">30일 이내</option>
            </select>
          </div>
        </div>
      </div>

      {/* Expiry Items Table */}
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
              {filteredItems.map((item) => (
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
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {item.branch}
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

        {filteredItems.length === 0 && (
          <div className="py-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">
              유통기한 임박 품목이 없습니다
            </p>
            <p className="text-gray-400 text-sm">
              선택한 필터 조건에 해당하는 품목이 없습니다
            </p>
          </div>
        )}
      </div>

      {/* Branch Summary */}
      {selectedBranch === "전체" && Object.keys(branchGroups).length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">
            지점별 요약
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(branchGroups).map(([branch, items]) => (
              <div
                key={branch}
                className="border border-gray-200 rounded-lg p-4"
              >
                <h4 className="font-semibold text-gray-900 mb-2">{branch}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">전체</span>
                    <span className="font-semibold text-gray-900">
                      {items.length}건
                    </span>
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
                      {
                        items.filter((i) => i.daysLeft > 2 && i.daysLeft <= 7)
                          .length
                      }
                      건
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      {filteredItems.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">{filterDays}일 이내</span> 유통기한
            만료 예정 품목{" "}
            <span className="font-semibold">{filteredItems.length}건</span>이
            조회되었습니다.
          </p>
        </div>
      )}
    </div>
  );
}