import { useState } from "react";
import {
  Calendar,
  Search,
  Download,
  TrendingUp,
  TrendingDown,
  Package,
  Trash2,
  User,
  Filter,
} from "lucide-react";

interface InventoryHistory {
  id: string;
  date: string;
  time: string;
  itemName: string;
  type: "입고" | "출고" | "폐기" | "조정";
  quantityChange: number;
  afterQuantity: number;
  unit: string;
  handler: string;
  note: string;
}

const mockHistory: InventoryHistory[] = [
  {
    id: "h1",
    date: "2026-03-29",
    time: "09:30",
    itemName: "소고기 패티",
    type: "입고",
    quantityChange: 50,
    afterQuantity: 95,
    unit: "개",
    handler: "김철수 (지점장)",
    note: "정기 발주 입고",
  },
  {
    id: "h2",
    date: "2026-03-29",
    time: "12:15",
    itemName: "양상추",
    type: "출고",
    quantityChange: -5,
    afterQuantity: 8,
    unit: "kg",
    handler: "박민수 (주방)",
    note: "점심 피크타임 사용",
  },
  {
    id: "h3",
    date: "2026-03-28",
    time: "14:30",
    itemName: "소고기 패티",
    type: "폐기",
    quantityChange: -10,
    afterQuantity: 45,
    unit: "개",
    handler: "김철수 (지점장)",
    note: "유통기한 만료",
  },
  {
    id: "h4",
    date: "2026-03-28",
    time: "10:00",
    itemName: "버거빵",
    type: "입고",
    quantityChange: 100,
    afterQuantity: 180,
    unit: "개",
    handler: "이영희 (매니저)",
    note: "긴급 발주 입고",
  },
  {
    id: "h5",
    date: "2026-03-28",
    time: "18:45",
    itemName: "생크림",
    type: "출고",
    quantityChange: -3,
    afterQuantity: 12,
    unit: "L",
    handler: "최지훈 (직원)",
    note: "디저트 제조",
  },
  {
    id: "h6",
    date: "2026-03-27",
    time: "11:20",
    itemName: "양상추",
    type: "폐기",
    quantityChange: -3,
    afterQuantity: 13,
    unit: "kg",
    handler: "이영희 (매니저)",
    note: "품질 불량 - 변색",
  },
  {
    id: "h7",
    date: "2026-03-27",
    time: "09:00",
    itemName: "감자",
    type: "입고",
    quantityChange: 30,
    afterQuantity: 45,
    unit: "kg",
    handler: "김철수 (지점장)",
    note: "정기 발주 입고",
  },
  {
    id: "h8",
    date: "2026-03-27",
    time: "15:30",
    itemName: "체다치즈",
    type: "조정",
    quantityChange: -5,
    afterQuantity: 30,
    unit: "장",
    handler: "이영희 (매니저)",
    note: "재고 실사 후 조정",
  },
  {
    id: "h9",
    date: "2026-03-26",
    time: "16:45",
    itemName: "생크림",
    type: "폐기",
    quantityChange: -2,
    afterQuantity: 15,
    unit: "L",
    handler: "김철수 (지점장)",
    note: "유통기한 초과",
  },
  {
    id: "h10",
    date: "2026-03-26",
    time: "10:30",
    itemName: "토마토",
    type: "입고",
    quantityChange: 20,
    afterQuantity: 35,
    unit: "kg",
    handler: "박민수 (직원)",
    note: "정기 발주 입고",
  },
];

const historyTypes = ["전체", "입고", "출고", "폐기", "조정"];

export function InventoryHistory() {
  const [startDate, setStartDate] = useState("2026-03-20");
  const [endDate, setEndDate] = useState("2026-03-29");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("전체");

  // Filter history
  const filteredHistory = mockHistory.filter((item) => {
    const matchesDate =
      item.date >= startDate && item.date <= endDate;
    const matchesSearch = item.itemName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "전체" || item.type === selectedType;
    return matchesDate && matchesSearch && matchesType;
  });

  // Calculate statistics
  const stats = {
    total: filteredHistory.length,
    receive: filteredHistory.filter((i) => i.type === "입고").length,
    release: filteredHistory.filter((i) => i.type === "출고").length,
    disposal: filteredHistory.filter((i) => i.type === "폐기").length,
    adjustment: filteredHistory.filter((i) => i.type === "조정").length,
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "입고":
        return <TrendingUp className="w-4 h-4" />;
      case "출고":
        return <TrendingDown className="w-4 h-4" />;
      case "폐기":
        return <Trash2 className="w-4 h-4" />;
      case "조정":
        return <Package className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "입고":
        return "bg-green-100 text-green-700";
      case "출고":
        return "bg-blue-100 text-blue-700";
      case "폐기":
        return "bg-red-100 text-red-700";
      case "조정":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleExcelDownload = () => {
    // CSV 형식으로 다운로드 (실제 구현 시에는 라이브러리 사용 권장)
    const headers = [
      "일시",
      "재료명",
      "유형",
      "수량 변화",
      "처리 후 수량",
      "처리자",
      "비고",
    ];
    
    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      filteredHistory
        .map((item) =>
          [
            `${item.date} ${item.time}`,
            item.itemName,
            item.type,
            `${item.quantityChange > 0 ? "+" : ""}${item.quantityChange}${item.unit}`,
            `${item.afterQuantity}${item.unit}`,
            item.handler,
            item.note,
          ].join(",")
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `재고이력_${startDate}_${endDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">재고 이력 조회</h2>
          <p className="text-gray-500 mt-1">
            재고 입출고 내역을 조회하고 분석하세요
          </p>
        </div>
        <button
          onClick={handleExcelDownload}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download className="w-5 h-5" />
          엑셀 다운로드
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-sm text-gray-500 mt-1">전체 이력</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-10 h-10 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.receive}</p>
          <p className="text-sm text-gray-500 mt-1">입고</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingDown className="w-10 h-10 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-blue-600">{stats.release}</p>
          <p className="text-sm text-gray-500 mt-1">출고</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Trash2 className="w-10 h-10 text-red-400" />
          </div>
          <p className="text-2xl font-bold text-red-600">{stats.disposal}</p>
          <p className="text-sm text-gray-500 mt-1">폐기</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-10 h-10 text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-yellow-600">{stats.adjustment}</p>
          <p className="text-sm text-gray-500 mt-1">조정</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <h3 className="font-semibold text-gray-900">필터</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              시작일
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              종료일
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              재료명 검색
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="재료명 입력..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이동 유형
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {historyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  일시
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  재료명
                </th>
                <th className="text-center py-3 px-6 text-sm font-semibold text-gray-900">
                  유형
                </th>
                <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                  수량 변화
                </th>
                <th className="text-right py-3 px-6 text-sm font-semibold text-gray-900">
                  처리 후 수량
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  처리자
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-900">
                  비고
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6 text-gray-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="font-medium">{item.date}</div>
                        <div className="text-sm text-gray-500">{item.time}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {item.itemName}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
                        item.type
                      )}`}
                    >
                      {getTypeIcon(item.type)}
                      {item.type}
                    </span>
                  </td>
                  <td
                    className={`py-4 px-6 text-right font-semibold ${
                      item.quantityChange > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.quantityChange > 0 ? "+" : ""}
                    {item.quantityChange}
                    {item.unit}
                  </td>
                  <td className="py-4 px-6 text-right font-semibold text-gray-900">
                    {item.afterQuantity}
                    {item.unit}
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      {item.handler}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600 text-sm">
                    {item.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredHistory.length === 0 && (
          <div className="py-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">이력이 없습니다</p>
            <p className="text-gray-400 text-sm">
              검색 조건을 변경하거나 날짜 범위를 조정해보세요
            </p>
          </div>
        )}
      </div>

      {/* Summary */}
      {filteredHistory.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">
              {startDate} ~ {endDate}
            </span>{" "}
            기간 동안{" "}
            <span className="font-semibold">총 {filteredHistory.length}건</span>
            의 재고 이동이 발생했습니다.
          </p>
        </div>
      )}
    </div>
  );
}
