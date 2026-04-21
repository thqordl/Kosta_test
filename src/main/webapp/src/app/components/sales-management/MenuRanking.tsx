import { useState } from "react";
import { 
  Award, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  MapPin,
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
  Legend,
  ResponsiveContainer,
} from "recharts";

// 지점 데이터 - TOP 10 & BOTTOM 10
const topBranches = [
  { id: "tb1", rank: 1, name: "강남점", sales: 45600000, orders: 1245, avgPrice: 36627, change: 2, changeType: "up" },
  { id: "tb2", rank: 2, name: "송파점", sales: 42300000, orders: 1156, avgPrice: 36591, change: 1, changeType: "up" },
  { id: "tb3", rank: 3, name: "잠실점", sales: 39800000, orders: 1098, avgPrice: 36248, change: 0, changeType: "same" },
  { id: "tb4", rank: 4, name: "여의도점", sales: 38900000, orders: 1087, avgPrice: 35793, change: 1, changeType: "down" },
  { id: "tb5", rank: 5, name: "홍대점", sales: 37200000, orders: 1034, avgPrice: 35984, change: 3, changeType: "up" },
  { id: "tb6", rank: 6, name: "명동점", sales: 35200000, orders: 978, avgPrice: 35991, change: 2, changeType: "down" },
  { id: "tb7", rank: 7, name: "판교점", sales: 33500000, orders: 945, avgPrice: 35449, change: 1, changeType: "up" },
  { id: "tb8", rank: 8, name: "신촌점", sales: 32800000, orders: 912, avgPrice: 35965, change: 0, changeType: "same" },
  { id: "tb9", rank: 9, name: "건대점", sales: 31900000, orders: 887, avgPrice: 35968, change: 1, changeType: "down" },
  { id: "tb10", rank: 10, name: "서초점", sales: 30400000, orders: 845, avgPrice: 35976, change: 2, changeType: "up" },
];

const bottomBranches = [
  { id: "bb1", rank: 91, name: "인천1점", sales: 8500000, orders: 245, avgPrice: 34694, change: 3, changeType: "down" },
  { id: "bb2", rank: 92, name: "수원3점", sales: 8200000, orders: 234, avgPrice: 35043, change: 1, changeType: "down" },
  { id: "bb3", rank: 93, name: "안양2점", sales: 7900000, orders: 228, avgPrice: 34649, change: 2, changeType: "down" },
  { id: "bb4", rank: 94, name: "평택점", sales: 7500000, orders: 215, avgPrice: 34884, change: 0, changeType: "same" },
  { id: "bb5", rank: 95, name: "천안2점", sales: 7200000, orders: 203, avgPrice: 35468, change: 4, changeType: "down" },
  { id: "bb6", rank: 96, name: "청주점", sales: 6800000, orders: 195, avgPrice: 34872, change: 1, changeType: "down" },
  { id: "bb7", rank: 97, name: "전주2점", sales: 6500000, orders: 187, avgPrice: 34759, change: 2, changeType: "down" },
  { id: "bb8", rank: 98, name: "포항점", sales: 6100000, orders: 175, avgPrice: 34857, change: 3, changeType: "down" },
  { id: "bb9", rank: 99, name: "목포점", sales: 5700000, orders: 163, avgPrice: 34969, change: 1, changeType: "down" },
  { id: "bb10", rank: 100, name: "제주2점", sales: 5200000, orders: 148, avgPrice: 35135, change: 2, changeType: "down" },
];

// 베스트셀러 TOP 10
const bestMenus = [
  { id: "bm1", rank: 1, name: "이탈리안 비엠티", category: "샌드위치", sales: 12450000, orders: 856, avgPrice: 14543 },
  { id: "bm2", rank: 2, name: "로티세리 치킨", category: "샌드위치", sales: 9870000, orders: 734, avgPrice: 13448 },
  { id: "bm3", rank: 3, name: "터키 베이컨 아보카도", category: "샌드위치", sales: 8340000, orders: 612, avgPrice: 13627 },
  { id: "bm4", rank: 4, name: "써브웨이 클럽", category: "샌드위치", sales: 7230000, orders: 534, avgPrice: 13539 },
  { id: "bm5", rank: 5, name: "스파이시 이탈리안", category: "샌드위치", sales: 6780000, orders: 498, avgPrice: 13614 },
  { id: "bm6", rank: 6, name: "치킨 샐러드", category: "샐러드", sales: 6450000, orders: 512, avgPrice: 12598 },
  { id: "bm7", rank: 7, name: "터키 샐러드", category: "샐러드", sales: 5430000, orders: 445, avgPrice: 12202 },
  { id: "bm8", rank: 8, name: "참치 샐러드", category: "샐러드", sales: 5010000, orders: 423, avgPrice: 11844 },
  { id: "bm9", rank: 9, name: "쿠키 세트", category: "사이드", sales: 4820000, orders: 956, avgPrice: 5042 },
  { id: "bm10", rank: 10, name: "음료 세트", category: "사이드", sales: 4350000, orders: 1087, avgPrice: 4002 },
];

// 워스트셀러 BOTTOM 10
const worstMenus = [
  { id: "wm1", rank: 41, name: "베지 디럭스", category: "샌드위치", sales: 450000, orders: 35, avgPrice: 12857 },
  { id: "wm2", rank: 42, name: "에그마요 샌드위치", category: "샌드위치", sales: 420000, orders: 32, avgPrice: 13125 },
  { id: "wm3", rank: 43, name: "할라피뇨 샌드위치", category: "샌드위치", sales: 380000, orders: 28, avgPrice: 13571 },
  { id: "wm4", rank: 44, name: "스테이크 샐러드", category: "샐러드", sales: 350000, orders: 27, avgPrice: 12963 },
  { id: "wm5", rank: 45, name: "새우 샐러드", category: "샐러드", sales: 320000, orders: 25, avgPrice: 12800 },
  { id: "wm6", rank: 46, name: "올리브 샌드위치", category: "샌드위치", sales: 290000, orders: 22, avgPrice: 13182 },
  { id: "wm7", rank: 47, name: "비프 샐러드", category: "샐러드", sales: 260000, orders: 20, avgPrice: 13000 },
  { id: "wm8", rank: 48, name: "피클 칩스", category: "사이드", sales: 230000, orders: 48, avgPrice: 4792 },
  { id: "wm9", rank: 49, name: "크림 수프", category: "사이드", sales: 190000, orders: 38, avgPrice: 5000 },
  { id: "wm10", rank: 50, name: "치아바타 샌드위치", category: "샌드위치", sales: 150000, orders: 12, avgPrice: 12500 },
];

// 최고 매출 요일/시간대
const topDayTimeSlots = [
  { id: "dt1", rank: 1, day: "금요일", timeSlot: "12:00-13:00", sales: 8800000, orders: 645 },
  { id: "dt2", rank: 2, day: "토요일", timeSlot: "18:00-19:00", sales: 8200000, orders: 612 },
  { id: "dt3", rank: 3, day: "금요일", timeSlot: "18:00-19:00", sales: 7900000, orders: 587 },
  { id: "dt4", rank: 4, day: "목요일", timeSlot: "12:00-13:00", sales: 7650000, orders: 563 },
  { id: "dt5", rank: 5, day: "토요일", timeSlot: "12:00-13:00", sales: 7400000, orders: 542 },
];

// 최고 매출일
const topDates = [
  { id: "td1", rank: 1, date: "2026-03-15", day: "금요일", sales: 18500000, orders: 1245, note: "화이트데이 프로모션" },
  { id: "td2", rank: 2, date: "2026-03-22", day: "토요일", sales: 17800000, orders: 1198, note: "주말 특가" },
  { id: "td3", rank: 3, date: "2026-03-08", day: "토요일", sales: 17200000, orders: 1156, note: "3월 프로모션" },
  { id: "td4", rank: 4, date: "2026-03-29", day: "토요일", sales: 16900000, orders: 1134, note: "월말 세일" },
  { id: "td5", rank: 5, date: "2026-03-01", day: "토요일", sales: 16500000, orders: 1102, note: "월초 특가" },
];

type SortBy = 'sales' | 'orders' | 'avgPrice';
type ViewMode = 'branches' | 'menus' | 'timeDate';

export function MenuRanking() {
  const [period, setPeriod] = useState("이번 달");
  const [region, setRegion] = useState("전국");
  const [sortBy, setSortBy] = useState<SortBy>('sales');
  const [viewMode, setViewMode] = useState<ViewMode>('branches');

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

  const getChangeIcon = (changeType: string, change: number) => {
    if (changeType === "up") return <span className="text-green-600">▲ {change}</span>;
    if (changeType === "down") return <span className="text-red-600">▼ {change}</span>;
    return <span className="text-gray-400">-</span>;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">매출 순위 조회</h1>
        <p className="text-gray-500 mt-1">지점별, 메뉴별, 시간대별 매출 랭킹을 확인하세요</p>
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

          {/* 권역 필터 */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">권역:</span>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm"
            >
              <option>전국</option>
              <option>수도권</option>
              <option>충청권</option>
              <option>호남권</option>
              <option>영남권</option>
              <option>강원권</option>
              <option>제주권</option>
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
          onClick={() => setViewMode('branches')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'branches'
              ? 'bg-[#00853D] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          지점별 랭킹
        </button>
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

      {/* 지점별 랭킹보드 */}
      {viewMode === 'branches' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 우수 지점 TOP 10 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-4 h-4 text-[#FFD100]" />
              <h2 className="text-base font-semibold text-gray-900">우수 지점 TOP 10</h2>
            </div>
            <div className="space-y-2">
              {topBranches.map((branch) => (
                <div
                  key={branch.id}
                  className={`p-2.5 rounded-lg border transition-all ${
                    branch.rank <= 3
                      ? 'border-[#FFD100] bg-[#FFD100]/5'
                      : 'border-gray-200 hover:border-[#00853D]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">
                        {getRankBadge(branch.rank)}
                      </span>
                      <div>
                        <h3 className="font-bold text-sm text-gray-900">{branch.name}</h3>
                        <p className="text-xs text-gray-500">
                          {branch.orders}건 · 평균 {formatCurrency(branch.avgPrice)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#00853D]">
                        {formatCurrency(branch.sales)}
                      </p>
                      <p className="text-xs">
                        {getChangeIcon(branch.changeType, branch.change)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 주의/부실 지점 BOTTOM 10 */}
          <div className="bg-white rounded-xl shadow-sm border border-red-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <h2 className="text-base font-semibold text-red-900">주의/부실 지점 BOTTOM 10</h2>
              <span className="ml-auto text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                현장 점검 필요
              </span>
            </div>
            <div className="space-y-2">
              {bottomBranches.map((branch) => (
                <div
                  key={branch.id}
                  className="p-2.5 rounded-lg border border-red-200 bg-red-50/30 hover:bg-red-50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-red-600 w-6">
                        {branch.rank}위
                      </span>
                      <div>
                        <h3 className="font-bold text-sm text-gray-900">{branch.name}</h3>
                        <p className="text-xs text-gray-500">
                          {branch.orders}건 · 평균 {formatCurrency(branch.avgPrice)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-red-600">
                        {formatCurrency(branch.sales)}
                      </p>
                      <p className="text-xs">
                        {getChangeIcon(branch.changeType, branch.change)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
                비활성화 검토
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
                <YAxis key="yaxis-top-dates" tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} tick={{ fontSize: 11 }} />
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