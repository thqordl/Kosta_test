import { useState } from "react";
import { 
  Search, 
  TrendingUp, 
  DollarSign, 
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Building2
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
  ComposedChart,
} from "recharts";

// 메뉴 카테고리
const menuCategories = {
  "샌드위치": ["이탈리안 비엠티", "터키 베이컨 아보카도", "로티세리 치킨", "써브웨이 클럽", "스파이시 이탈리안"],
  "샐러드": ["터키 샐러드", "참치 샐러드", "치킨 샐러드", "베지 샐러드", "비엠티 샐러드"],
  "사이드": ["감자튀김", "치즈스틱", "쿠키", "음료", "칩"]
};

// Mock 당일 본사 전체 매출 데이터
const todayHeadquartersSales = {
  totalSales: 125400000,
  totalOrders: 8234,
  avgOrderValue: 15234,
  totalProfit: 48210000,
  profitMargin: 38.4
};

// Mock 주간 본사 매출 데이터 (날짜 필터용)
const generateWeeklyData = (selectedDate: string) => [
  { id: 'w1', date: "3/27 (월)", sales: 112800000, orders: 7456, profit: 43200000, margin: 38.3 },
  { id: 'w2', date: "3/28 (화)", sales: 108600000, orders: 7212, profit: 41800000, margin: 38.5 },
  { id: 'w3', date: "3/29 (수)", sales: 119100000, orders: 7892, profit: 45900000, margin: 38.5 },
  { id: 'w4', date: "3/30 (목)", sales: 115900000, orders: 7634, profit: 44600000, margin: 38.5 },
  { id: 'w5', date: "3/31 (금)", sales: 128400000, orders: 8456, profit: 49400000, margin: 38.5 },
  { id: 'w6', date: "4/1 (토)", sales: 138800000, orders: 9112, profit: 53500000, margin: 38.5 },
  { id: 'w7', date: "4/2 (일)", sales: 125200000, orders: 8234, profit: 48200000, margin: 38.5 },
];

// Mock 기간 본사 매출 데이터
const generatePeriodData = (startDate: string, endDate: string) => [
  { id: 'p1', date: "3/26", sales: 110900000, profit: 42700000, margin: 38.5 },
  { id: 'p2', date: "3/27", sales: 112800000, profit: 43400000, margin: 38.5 },
  { id: 'p3', date: "3/28", sales: 108600000, profit: 41800000, margin: 38.5 },
  { id: 'p4', date: "3/29", sales: 119100000, profit: 45900000, margin: 38.5 },
  { id: 'p5', date: "3/30", sales: 115900000, profit: 44600000, margin: 38.5 },
  { id: 'p6', date: "3/31", sales: 128400000, profit: 49400000, margin: 38.5 },
  { id: 'p7', date: "4/1", sales: 138800000, profit: 53500000, margin: 38.6 },
  { id: 'p8', date: "4/2", sales: 125200000, profit: 48200000, margin: 38.5 },
];

// Mock 메뉴 비교 데이터
const generateMenuComparisonData = (category: string, menu: string) => [
  { id: 'mc1', name: "이탈리안 비엠티", sales: 42500000, orders: 3842, profit: 17850000, margin: 42.0 },
  { id: 'mc2', name: "터키 베이컨 아보카도", sales: 39800000, orders: 3428, profit: 16720000, margin: 42.0 },
  { id: 'mc3', name: "로티세리 치킨", sales: 35800000, orders: 3205, profit: 14920000, margin: 41.7 },
  { id: 'mc4', name: "써브웨이 클럽", sales: 32200000, orders: 2989, profit: 13402000, margin: 41.6 },
  { id: 'mc5', name: "스파이시 이탈리안", sales: 28750000, orders: 2678, profit: 11902000, margin: 41.4 },
];

// Mock 검색 결과 데이터
const generateSearchResults = (filterType: string) => {
  const base = Array.from({ length: 45 }, (_, i) => ({
    id: `result-${i + 1}`,
    date: `2026-04-${String(i + 1).padStart(2, '0')}`,
    menu: filterType === 'menu' ? ['이탈리안 비엠티', '터키 샐러드', '치즈스틱'][i % 3] : '',
    sales: Math.floor(Math.random() * 20000000) + 100000000,
    orders: Math.floor(Math.random() * 2000) + 6000,
    profit: 0,
    margin: 0
  }));
  
  return base.map(item => {
    const profit = Math.floor(item.sales * 0.385);
    const margin = 38.5;
    return {
      ...item,
      profit,
      margin,
      avgPrice: Math.floor(item.sales / item.orders)
    };
  });
};

type FilterType = 'date' | 'period' | 'menu';

export function HeadquartersSales() {
  const [filterType, setFilterType] = useState<FilterType>('date');
  const [selectedDate, setSelectedDate] = useState('2026-04-02');
  const [startDate, setStartDate] = useState('2026-03-26');
  const [endDate, setEndDate] = useState('2026-04-02');
  const [selectedCategory, setSelectedCategory] = useState<string>("샌드위치");
  const [selectedMenu, setSelectedMenu] = useState<string>("이탈리안 비엠티");
  const [searched, setSearched] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = () => {
    setSearched(true);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearched(false);
    setSelectedDate('2026-04-02');
    setStartDate('2026-03-26');
    setEndDate('2026-04-02');
    setSelectedCategory("샌드위치");
    setSelectedMenu("이탈리안 비엠티");
    setCurrentPage(1);
  };

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

  const getChartData = () => {
    if (!searched) {
      return generateWeeklyData(selectedDate);
    }

    switch (filterType) {
      case 'date':
        return generateWeeklyData(selectedDate);
      case 'period':
        return generatePeriodData(startDate, endDate);
      case 'menu':
        return generateMenuComparisonData(selectedCategory, selectedMenu);
      default:
        return [];
    }
  };

  const getChartTitle = () => {
    if (!searched) {
      return "주간 본사 전체 매출 현황";
    }

    switch (filterType) {
      case 'date':
        return `${selectedDate} 기준 주간 본사 매출`;
      case 'period':
        return `${startDate} ~ ${endDate} 기간별 본사 매출`;
      case 'menu':
        return `${selectedCategory} 카테고리 메뉴별 본사 매출`;
      default:
        return "";
    }
  };

  const chartData = getChartData();

  // Pagination
  const searchResults = generateSearchResults(filterType);
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  const paginatedResults = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-6">
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              1
            </button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-2 rounded-lg border transition-all ${
              currentPage === page
                ? 'bg-[#00853D] text-white border-[#00853D]'
                : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2">...</span>}
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">본사 매출 조회</h1>
        <p className="text-gray-500 mt-1">본사 전체 매출 및 수익성을 분석하세요</p>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-3">
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

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {(todayHeadquartersSales.totalSales / 1000000).toFixed(1)}M
          </p>
          <p className="text-sm text-gray-500 mt-1">총 매출액</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {(todayHeadquartersSales.totalProfit / 1000000).toFixed(1)}M
          </p>
          <p className="text-sm text-gray-500 mt-1">순이익</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {todayHeadquartersSales.profitMargin.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500 mt-1">이익률</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {todayHeadquartersSales.totalOrders.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">총 주문수</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ₩{todayHeadquartersSales.avgOrderValue.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">평균 주문액</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{getChartTitle()}</h2>
        <ResponsiveContainer width="100%" height={350}>
          {filterType === 'menu' ? (
            <BarChart data={chartData}>
              <CartesianGrid key="grid-hq-chart" strokeDasharray="3 3" />
              <XAxis key="xaxis-hq-chart" dataKey="name" />
              <YAxis key="yaxis-hq-chart" />
              <Tooltip 
                key="tooltip-hq-chart"
                formatter={(value: number) => `₩${value.toLocaleString()}`}
              />
              <Legend key="legend-hq-chart" />
              <Bar key="bar-hq-sales" dataKey="sales" fill="#00853D" name="매출액" />
              <Bar key="bar-hq-profit" dataKey="profit" fill="#FFD100" name="순이익" />
            </BarChart>
          ) : (
            <ComposedChart data={chartData}>
              <CartesianGrid key="grid-hq-composed" strokeDasharray="3 3" />
              <XAxis key="xaxis-hq-composed" dataKey="date" />
              <YAxis key="yaxis-hq-left" yAxisId="left" />
              <YAxis key="yaxis-hq-right" yAxisId="right" orientation="right" />
              <Tooltip 
                key="tooltip-hq-composed"
                formatter={(value: number, name: string) => {
                  if (name === '이익률 (%)') return `${value}%`;
                  return `₩${value.toLocaleString()}`;
                }}
              />
              <Legend key="legend-hq-composed" />
              <Bar key="bar-hq-composed-sales" yAxisId="left" dataKey="sales" fill="#00853D" name="총 매출" />
              <Bar key="bar-hq-composed-profit" yAxisId="left" dataKey="profit" fill="#FFD100" name="순이익" />
              <Line key="line-hq-margin" yAxisId="right" type="monotone" dataKey="margin" stroke="#FF6B6B" strokeWidth={2} name="이익률 (%)" />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Data Table with Pagination */}
      {searched && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">상세 매출 내역</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">날짜</th>
                  {filterType === 'menu' && (
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">메뉴</th>
                  )}
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">매출액</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">순이익</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">이익률</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">주문수</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">평균 주문액</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedResults.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{result.date}</td>
                    {filterType === 'menu' && (
                      <td className="px-4 py-3 text-sm text-gray-900">{result.menu}</td>
                    )}
                    <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">
                      ₩{result.sales.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-green-600 font-semibold">
                      ₩{result.profit.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-gray-900">
                      {result.margin.toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600">
                      {result.orders.toLocaleString()}건
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600">
                      ₩{result.avgPrice.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {renderPagination()}
        </div>
      )}
    </div>
  );
}
