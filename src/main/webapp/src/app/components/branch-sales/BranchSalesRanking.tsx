import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Award,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Trophy,
  AlertTriangle
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 베스트셀러 TOP 10
const bestMenus = [
  { id: "bm1", rank: 1, name: "이탈리안 비엠티", category: "샌드위치", sales: 3450000, orders: 245, avgPrice: 14082 },
  { id: "bm2", rank: 2, name: "로티세리 치킨", category: "샌드위치", sales: 2870000, orders: 215, avgPrice: 13349 },
  { id: "bm3", rank: 3, name: "터키 베이컨 아보카도", category: "샌드위치", sales: 2340000, orders: 172, avgPrice: 13605 },
  { id: "bm4", rank: 4, name: "써브웨이 클럽", category: "샌드위치", sales: 2030000, orders: 150, avgPrice: 13533 },
  { id: "bm5", rank: 5, name: "스파이시 이탈리안", category: "샌드위치", sales: 1780000, orders: 131, avgPrice: 13588 },
  { id: "bm6", rank: 6, name: "치킨 샐러드", category: "샐러드", sales: 1450000, orders: 116, avgPrice: 12500 },
  { id: "bm7", rank: 7, name: "터키 샐러드", category: "샐러드", sales: 1230000, orders: 101, avgPrice: 12178 },
  { id: "bm8", rank: 8, name: "참치 샐러드", category: "샐러드", sales: 1010000, orders: 85, avgPrice: 11882 },
  { id: "bm9", rank: 9, name: "쿠키 세트", category: "사이드", sales: 980000, orders: 195, avgPrice: 5026 },
  { id: "bm10", rank: 10, name: "음료 세트", category: "사이드", sales: 850000, orders: 213, avgPrice: 3991 },
];

// 워스트셀러 BOTTOM 10
const worstMenus = [
  { id: "wm1", rank: 41, name: "베지 디럭스", category: "샌드위치", sales: 85000, orders: 7, avgPrice: 12143 },
  { id: "wm2", rank: 42, name: "에그마요 샌드위치", category: "샌드위치", sales: 78000, orders: 6, avgPrice: 13000 },
  { id: "wm3", rank: 43, name: "할라피뇨 샌드위치", category: "샌드위치", sales: 68000, orders: 5, avgPrice: 13600 },
  { id: "wm4", rank: 44, name: "스테이크 샐러드", category: "샐러드", sales: 52000, orders: 4, avgPrice: 13000 },
  { id: "wm5", rank: 45, name: "새우 샐러드", category: "샐러드", sales: 38000, orders: 3, avgPrice: 12667 },
  { id: "wm6", rank: 46, name: "올리브 샌드위치", category: "샌드위치", sales: 26000, orders: 2, avgPrice: 13000 },
  { id: "wm7", rank: 47, name: "비프 샐러드", category: "샐러드", sales: 13000, orders: 1, avgPrice: 13000 },
  { id: "wm8", rank: 48, name: "피클 칩스", category: "사이드", sales: 9500, orders: 2, avgPrice: 4750 },
  { id: "wm9", rank: 49, name: "크림 수프", category: "사이드", sales: 5000, orders: 1, avgPrice: 5000 },
  { id: "wm10", rank: 50, name: "치아바타 샌드위치", category: "샌드위치", sales: 0, orders: 0, avgPrice: 0 },
];

// 최고 매출 요일/시간대
const topDayTimeSlots = [
  { id: "dt1", rank: 1, day: "금요일", timeSlot: "12:00-13:00", sales: 880000, orders: 65 },
  { id: "dt2", rank: 2, day: "토요일", timeSlot: "18:00-19:00", sales: 820000, orders: 61 },
  { id: "dt3", rank: 3, day: "금요일", timeSlot: "18:00-19:00", sales: 790000, orders: 59 },
  { id: "dt4", rank: 4, day: "목요일", timeSlot: "12:00-13:00", sales: 765000, orders: 56 },
  { id: "dt5", rank: 5, day: "토요일", timeSlot: "12:00-13:00", sales: 740000, orders: 54 },
];

// 최고 매출일
const topDates = [
  { id: "td1", rank: 1, date: "2026-03-15", day: "토요일", sales: 1850000, orders: 145, note: "화이트데이 프로모션" },
  { id: "td2", rank: 2, date: "2026-03-22", day: "토요일", sales: 1780000, orders: 138, note: "주말 특가" },
  { id: "td3", rank: 3, date: "2026-03-08", day: "토요일", sales: 1720000, orders: 132, note: "3월 프로모션" },
  { id: "td4", rank: 4, date: "2026-03-29", day: "토요일", sales: 1690000, orders: 128, note: "월말 세일" },
  { id: "td5", rank: 5, date: "2026-03-01", day: "토요일", sales: 1650000, orders: 125, note: "월초 특가" },
];

type SortBy = 'sales' | 'orders' | 'avgPrice';
type ViewMode = 'menus' | 'timeDate';

export function BranchSalesRanking() {
  const { user } = useAuth();
  const [period, setPeriod] = useState("이번 달");
  const [sortBy, setSortBy] = useState<SortBy>('sales');
  const [viewMode, setViewMode] = useState<ViewMode>('menus');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(value);
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">매출 순위</h1>
        <p className="text-gray-500 mt-1">{user?.branch} - 메뉴별, 시간대별 매출 랭킹을 확인하세요</p>
      </div>

      {/* 공통 랭킹 필터 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* 기간 설정 */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">기간:</span>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm"
            >
              <option>이번 달</option>
              <option>지난 달</option>
              <option>1분기</option>
              <option>2분기</option>
              <option>3분기</option>
              <option>4분기</option>
              <option>상반기</option>
              <option>하반기</option>
              <option>올해</option>
            </select>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-300"></div>

          {/* 정렬 기준 */}
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">정렬:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('sales')}
                className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                  sortBy === 'sales'
                    ? 'border-[#00853D] bg-[#00853D]/5 text-[#00853D]'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                총매출액 순
              </button>
              <button
                onClick={() => setSortBy('orders')}
                className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                  sortBy === 'orders'
                    ? 'border-[#00853D] bg-[#00853D]/5 text-[#00853D]'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                총 주문 건수 순
              </button>
              <button
                onClick={() => setSortBy('avgPrice')}
                className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                  sortBy === 'avgPrice'
                    ? 'border-[#00853D] bg-[#00853D]/5 text-[#00853D]'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                객단가 순
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 뷰 모드 선택 */}
      <div className="flex gap-3">
        <button
          onClick={() => setViewMode('menus')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'menus'
              ? 'bg-[#00853D] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          메뉴별 랭킹
        </button>
        <button
          onClick={() => setViewMode('timeDate')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'timeDate'
              ? 'bg-[#00853D] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          일자/시간대별 랭킹
        </button>
      </div>

      {/* 메뉴별 랭킹보드 */}
      {viewMode === 'menus' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 베스트셀러 TOP 10 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-[#00853D]" />
              <h2 className="text-base font-semibold text-gray-900">베스트셀러 (효자 메뉴) TOP 10</h2>
              <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                프로모션 추천
              </span>
            </div>
            <div className="space-y-1.5">
              {bestMenus.map((menu) => (
                <div
                  key={menu.id}
                  className="flex items-center justify-between p-2 rounded-lg border border-gray-200 hover:border-[#00853D] hover:bg-[#00853D]/5 transition-all"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <span className="font-bold text-[#00853D] text-sm w-5">
                      {menu.rank}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-gray-900">{menu.name}</h3>
                      <p className="text-xs text-gray-500">
                        {menu.category} · {menu.orders}건 판매
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-gray-900">
                      {formatCurrency(menu.sales)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 워스트셀러 BOTTOM 10 */}
          <div className="bg-white rounded-xl shadow-sm border border-orange-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="w-4 h-4 text-orange-600" />
              <h2 className="text-base font-semibold text-orange-900">워스트셀러 (단종 고려) BOTTOM 10</h2>
              <span className="ml-auto text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                주문 검토
              </span>
            </div>
            <div className="space-y-1.5">
              {worstMenus.map((menu) => (
                <div
                  key={menu.id}
                  className="flex items-center justify-between p-2 rounded-lg border border-orange-200 bg-orange-50/30 hover:bg-orange-50 transition-all"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <span className="font-bold text-orange-600 text-sm w-5">
                      {menu.rank}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-gray-900">{menu.name}</h3>
                      <p className="text-xs text-gray-500">
                        {menu.category} · {menu.orders}건만 판매
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-orange-600">
                      {formatCurrency(menu.sales)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 일자/시간대별 랭킹 */}
      {viewMode === 'timeDate' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 최고 매출 요일/시간대 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-[#00853D]" />
              <h2 className="text-base font-semibold text-gray-900">최고 매출 요일/시간대 순위</h2>
              <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                알바생 스케줄 참고
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-2 py-2 text-left text-xs font-semibold text-gray-900">순위</th>
                    <th className="px-2 py-2 text-left text-xs font-semibold text-gray-900">요일</th>
                    <th className="px-2 py-2 text-left text-xs font-semibold text-gray-900">시간대</th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-900">매출액</th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-900">주문수</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {topDayTimeSlots.map((slot) => (
                    <tr key={slot.id} className="hover:bg-gray-50">
                      <td className="px-2 py-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#00853D]/10 text-[#00853D] text-xs font-bold">
                          {slot.rank}
                        </span>
                      </td>
                      <td className="px-2 py-2 font-semibold text-sm text-gray-900">{slot.day}</td>
                      <td className="px-2 py-2 text-sm text-gray-900">{slot.timeSlot}</td>
                      <td className="px-2 py-2 text-right font-bold text-sm text-gray-900">
                        {formatCurrency(slot.sales)}
                      </td>
                      <td className="px-2 py-2 text-right text-sm text-gray-600">{slot.orders}건</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 최고 매출일 Top 5 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-[#FFD100]" />
              <h2 className="text-base font-semibold text-gray-900">최고 매출일 Top 5</h2>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={topDates}>
                <CartesianGrid key="grid-top-dates" strokeDasharray="3 3" />
                <XAxis key="xaxis-top-dates" dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis key="yaxis-top-dates" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} tick={{ fontSize: 11 }} />
                <Tooltip
                  key="tooltip-top-dates"
                  formatter={(value: number) => formatCurrency(value)}
                  labelStyle={{ color: "#000" }}
                />
                <Bar key="bar-top-dates-sales" dataKey="sales" fill="#00853D" name="매출" />
              </BarChart>
            </ResponsiveContainer>

            {/* Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-2 py-2 text-left text-xs font-semibold text-gray-900">순위</th>
                    <th className="px-2 py-2 text-left text-xs font-semibold text-gray-900">날짜</th>
                    <th className="px-2 py-2 text-left text-xs font-semibold text-gray-900">요일</th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-900">매출액</th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-900">주문수</th>
                    <th className="px-2 py-2 text-left text-xs font-semibold text-gray-900">비고</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {topDates.map((date) => (
                    <tr key={date.id} className="hover:bg-gray-50">
                      <td className="px-2 py-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FFD100]/20 text-sm font-bold">
                          {getRankBadge(date.rank)}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-xs text-gray-900">{date.date}</td>
                      <td className="px-2 py-2 font-semibold text-sm text-gray-900">{date.day}</td>
                      <td className="px-2 py-2 text-right font-bold text-sm text-gray-900">
                        {formatCurrency(date.sales)}
                      </td>
                      <td className="px-2 py-2 text-right text-sm text-gray-600">{date.orders}건</td>
                      <td className="px-2 py-2">
                        <span className="inline-block px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {date.note}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
