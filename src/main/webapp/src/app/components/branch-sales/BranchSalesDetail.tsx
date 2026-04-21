import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { 
  Search, 
  TrendingUp, 
  DollarSign, 
  ShoppingCart,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// 직영점 목록
const branches = [
  "강남점", "홍대점", "명동점", "잠실점", "신촌점", 
  "여의도점", "판교점", "송파점", "강북점", "부산점"
];

// 메뉴 카테고리
const menuCategories = {
  "샌드위치": ["이탈리안 비엠티", "터키 베이컨 아보카도", "로티세리 치킨", "써브웨이 클럽", "스파이시 이탈리안"],
  "샐러드": ["터키 샐러드", "참치 샐러드", "치킨 샐러드", "베지 샐러드", "비엠티 샐러드"],
  "사이드": ["감자튀김", "치즈스틱", "쿠키", "음료", "칩"]
};

// Mock 당일 매출 데이터
const todaySales = {
  totalSales: 3420000,
  totalOrders: 198,
  avgOrderValue: 17272,
  topMenu: "이탈리안 비엠티"
};

// Mock 주간 매출 데이터 (날짜 필터용)
const generateWeeklyData = (selectedDate: string) => [
  { id: 'w1', date: "3/27 (월)", sales: 2800000, orders: 165 },
  { id: 'w2', date: "3/28 (화)", sales: 2600000, orders: 154 },
  { id: 'w3', date: "3/29 (수)", sales: 3100000, orders: 182 },
  { id: 'w4', date: "3/30 (목)", sales: 2900000, orders: 171 },
  { id: 'w5', date: "3/31 (금)", sales: 3400000, orders: 201 },
  { id: 'w6', date: "4/1 (토)", sales: 3800000, orders: 225 },
  { id: 'w7', date: "4/2 (일)", sales: 3200000, orders: 189 },
];

// Mock 기간 매출 데이터
const generatePeriodData = (startDate: string, endDate: string) => [
  { id: 'p1', date: "3/26", sales: 2900000 },
  { id: 'p2', date: "3/27", sales: 2800000 },
  { id: 'p3', date: "3/28", sales: 2600000 },
  { id: 'p4', date: "3/29", sales: 3100000 },
  { id: 'p5', date: "3/30", sales: 2900000 },
  { id: 'p6', date: "3/31", sales: 3400000 },
  { id: 'p7', date: "4/1", sales: 3800000 },
  { id: 'p8', date: "4/2", sales: 3200000 },
];

// Mock 시간대 비교 데이터
const generateHourlyComparisonData = (selectedHour: string) => [
  { id: 'hc1', timeSlot: "10:00-11:00", sales: 320000, orders: 21 },
  { id: 'hc2', timeSlot: "11:00-12:00", sales: 520000, orders: 38 },
  { id: 'hc3', timeSlot: "12:00-13:00", sales: 880000, orders: 65 },
  { id: 'hc4', timeSlot: "13:00-14:00", sales: 760000, orders: 54 },
  { id: 'hc5', timeSlot: "14:00-15:00", sales: 420000, orders: 29 },
];

// Mock 메뉴 비교 데이터
const generateMenuComparisonData = (category: string, menu: string) => [
  { id: 'mc1', name: "이탈리안 비엠티", sales: 1250000, orders: 142 },
  { id: 'mc2', name: "터키 베이컨 아보카도", sales: 1180000, orders: 128 },
  { id: 'mc3', name: "로티세리 치킨", sales: 980000, orders: 105 },
  { id: 'mc4', name: "써브웨이 클럽", sales: 820000, orders: 89 },
  { id: 'mc5', name: "스파이시 이탈리안", sales: 750000, orders: 78 },
];

// Mock 검색 결과 데이터
const generateSearchResults = (filterType: string) => {
  const base = Array.from({ length: 23 }, (_, i) => ({
    id: `result-${i + 1}`,
    date: `2026-04-${String(i + 1).padStart(2, '0')}`,
    time: filterType === 'time' ? `${String(10 + (i % 12)).padStart(2, '0')}:00` : '',
    menu: filterType === 'menu' ? ['이탈리안 비엠티', '터키 샐러드', '치즈스틱'][i % 3] : '',
    sales: Math.floor(Math.random() * 500000) + 2000000,
    orders: Math.floor(Math.random() * 50) + 100,
    avgPrice: 0
  }));
  
  return base.map(item => ({
    ...item,
    avgPrice: Math.floor(item.sales / item.orders)
  }));
};

type FilterType = 'date' | 'period' | 'time' | 'menu';

export function BranchSalesDetail() {
  const { user } = useAuth();
  const [selectedBranch, setSelectedBranch] = useState("강남점");
  const [filterType, setFilterType] = useState<FilterType>('date');
  const [searched, setSearched] = useState(false);
  
  // 필터 값
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("12:00-13:00");
  const [selectedCategory, setSelectedCategory] = useState("샌드위치");
  const [selectedMenu, setSelectedMenu] = useState("이탈리안 비엠티");
  
  // 페이징
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(value);
  };

  const handleSearch = () => {
    setSearched(true);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearched(false);
    setCurrentPage(1);
  };

  // 검색 결과 데이터
  const searchResults = searched ? generateSearchResults(filterType) : [];
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  const paginatedResults = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderFilterInputs = () => {
    switch (filterType) {
      case 'date':
        return (
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm"
          />
        );
      
      case 'period':
        return (
          <>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="시작 날짜"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="종료 날짜"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm"
            />
          </>
        );
      
      case 'time':
        return (
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm"
          >
            <option>06:00-07:00</option>
            <option>07:00-08:00</option>
            <option>08:00-09:00</option>
            <option>09:00-10:00</option>
            <option>10:00-11:00</option>
            <option>11:00-12:00</option>
            <option>12:00-13:00</option>
            <option>13:00-14:00</option>
            <option>14:00-15:00</option>
            <option>15:00-16:00</option>
            <option>16:00-17:00</option>
            <option>17:00-18:00</option>
            <option>18:00-19:00</option>
            <option>19:00-20:00</option>
            <option>20:00-21:00</option>
            <option>21:00-22:00</option>
          </select>
        );
      
      case 'menu':
        return (
          <>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedMenu(menuCategories[e.target.value as keyof typeof menuCategories][0]);
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm"
            >
              {Object.keys(menuCategories).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={selectedMenu}
              onChange={(e) => setSelectedMenu(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm"
            >
              {menuCategories[selectedCategory as keyof typeof menuCategories].map(menu => (
                <option key={menu} value={menu}>{menu}</option>
              ))}
            </select>
          </>
        );
    }
  };

  const renderChart = () => {
    switch (filterType) {
      case 'date':
        const weeklyData = generateWeeklyData(selectedDate);
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                labelStyle={{ color: "#000" }}
              />
              <Legend />
              <Bar dataKey="sales" fill="#00853D" name="매출" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'period':
        const periodData = generatePeriodData(startDate, endDate);
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={periodData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                labelStyle={{ color: "#000" }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#00853D" 
                strokeWidth={2}
                name="매출"
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'time':
        const hourlyData = generateHourlyComparisonData(selectedTime);
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timeSlot" />
              <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                labelStyle={{ color: "#000" }}
              />
              <Legend />
              <Bar dataKey="sales" fill="#FFD100" name="매출" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'menu':
        const menuData = generateMenuComparisonData(selectedCategory, selectedMenu);
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={menuData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
              <YAxis type="category" dataKey="name" width={150} />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                labelStyle={{ color: "#000" }}
              />
              <Legend />
              <Bar dataKey="sales" fill="#00853D" name="매출" />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  const getChartTitle = () => {
    switch (filterType) {
      case 'date':
        return "주간 매출 추이";
      case 'period':
        return "기간별 매출 추이";
      case 'time':
        return "시간대별 매출 비교";
      case 'menu':
        return `${selectedCategory} 카테고리 메뉴별 비교`;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">직영점 매출 조회</h1>
        <p className="text-gray-500 mt-1">직영점별 매출 데이터를 다양한 방식으로 조회하세요</p>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Branch Selection */}
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm"
          >
            {branches.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-300"></div>

          {/* Filter Type Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => { setFilterType('date'); setSearched(false); }}
              className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                filterType === 'date'
                  ? 'border-[#00853D] bg-[#00853D]/5 text-[#00853D]'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              날짜별
            </button>
            <button
              onClick={() => { setFilterType('period'); setSearched(false); }}
              className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                filterType === 'period'
                  ? 'border-[#00853D] bg-[#00853D]/5 text-[#00853D]'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              기간별
            </button>
            <button
              onClick={() => { setFilterType('time'); setSearched(false); }}
              className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                filterType === 'time'
                  ? 'border-[#00853D] bg-[#00853D]/5 text-[#00853D]'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              시간대별
            </button>
            <button
              onClick={() => { setFilterType('menu'); setSearched(false); }}
              className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                filterType === 'menu'
                  ? 'border-[#00853D] bg-[#00853D]/5 text-[#00853D]'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              메뉴별
            </button>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-300"></div>

          {/* Filter Inputs */}
          <div className="flex gap-2">
            {renderFilterInputs()}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 ml-auto">
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#00853D]/90 transition-colors font-medium text-sm"
            >
              <Search className="w-4 h-4" />
              검색
            </button>
            {searched && (
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
              >
                초기화
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      {!searched ? (
        // Today's Summary
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">오늘의 매출 요약</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">총 매출</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatCurrency(todaySales.totalSales)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#00853D]/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[#00853D]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">총 주문수</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {todaySales.totalOrders}건
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#FFD100]/20 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-[#FFD100]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">평균 객단가</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatCurrency(todaySales.avgOrderValue)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">인기 메뉴</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    {todaySales.topMenu}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Search Results
        <>
          {/* Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{getChartTitle()}</h2>
            {renderChart()}
          </div>

          {/* Results Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                검색 결과 ({searchResults.length}건)
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      번호
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      날짜
                    </th>
                    {filterType === 'time' && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        시간대
                      </th>
                    )}
                    {filterType === 'menu' && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        메뉴명
                      </th>
                    )}
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      매출액
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      주문수
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      평균 객단가
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedResults.map((result, index) => (
                    <tr key={result.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {result.date}
                      </td>
                      {filterType === 'time' && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {result.time}
                        </td>
                      )}
                      {filterType === 'menu' && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {result.menu}
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                        {formatCurrency(result.sales)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {result.orders}건
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {formatCurrency(result.avgPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                페이지 {currentPage} / {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    return page === 1 || 
                           page === totalPages || 
                           Math.abs(page - currentPage) <= 1;
                  })
                  .map((page, index, array) => {
                    if (index > 0 && page - array[index - 1] > 1) {
                      return [
                        <span key={`ellipsis-${page}`} className="px-3 py-2">...</span>,
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg border transition-colors ${
                            currentPage === page
                              ? 'bg-[#00853D] text-white border-[#00853D]'
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ];
                    }
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          currentPage === page
                            ? 'bg-[#00853D] text-white border-[#00853D]'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}