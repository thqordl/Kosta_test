import { useState } from "react";
import { Search, Calendar, Filter, Package, Download, ChevronLeft, ChevronRight } from "lucide-react";

interface ReceivingHistoryItem {
  id: string;
  orderId: string;
  receivingDate: string;
  orderDate: string;
  status: "입고완료" | "부분입고" | "취소됨";
  itemCount: number;
  totalAmount: number;
  supplier: string;
  receivedBy: string;
  notes: string;
}

export function ReceivingHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [dateRange, setDateRange] = useState({
    start: "2024-03-01",
    end: "2024-03-29"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data
  const receivingHistory: ReceivingHistoryItem[] = [
    {
      id: "RCV-2024-0315",
      orderId: "ORD-2024-0312",
      receivingDate: "2024-03-15",
      orderDate: "2024-03-12",
      status: "입고완료",
      itemCount: 25,
      totalAmount: 2500000,
      supplier: "본사 물류센터",
      receivedBy: "김지점",
      notes: "정상 입고"
    },
    {
      id: "RCV-2024-0314",
      orderId: "ORD-2024-0311",
      receivingDate: "2024-03-14",
      orderDate: "2024-03-11",
      status: "입고완료",
      itemCount: 18,
      totalAmount: 1800000,
      supplier: "본사 물류센터",
      receivedBy: "이매니저",
      notes: "정상 입고"
    },
    {
      id: "RCV-2024-0313",
      orderId: "ORD-2024-0310",
      receivingDate: "2024-03-13",
      orderDate: "2024-03-10",
      status: "부분입고",
      itemCount: 15,
      totalAmount: 1200000,
      supplier: "본사 물류센터",
      receivedBy: "김지점",
      notes: "일부 품목 지연"
    },
    {
      id: "RCV-2024-0312",
      orderId: "ORD-2024-0309",
      receivingDate: "2024-03-12",
      orderDate: "2024-03-09",
      status: "입고완료",
      itemCount: 30,
      totalAmount: 3200000,
      supplier: "본사 물류센터",
      receivedBy: "이매니저",
      notes: "정상 입고"
    },
    {
      id: "RCV-2024-0311",
      orderId: "ORD-2024-0308",
      receivingDate: "2024-03-11",
      orderDate: "2024-03-08",
      status: "입고완료",
      itemCount: 22,
      totalAmount: 2200000,
      supplier: "본사 물류센터",
      receivedBy: "김지점",
      notes: "정상 입고"
    },
    {
      id: "RCV-2024-0310",
      orderId: "ORD-2024-0307",
      receivingDate: "2024-03-10",
      orderDate: "2024-03-07",
      status: "취소됨",
      itemCount: 0,
      totalAmount: 0,
      supplier: "본사 물류센터",
      receivedBy: "시스템",
      notes: "발주 취소로 인한 입고 취소"
    },
    {
      id: "RCV-2024-0309",
      orderId: "ORD-2024-0306",
      receivingDate: "2024-03-09",
      orderDate: "2024-03-06",
      status: "입고완료",
      itemCount: 20,
      totalAmount: 2000000,
      supplier: "본사 물류센터",
      receivedBy: "이매니저",
      notes: "정상 입고"
    },
    {
      id: "RCV-2024-0308",
      orderId: "ORD-2024-0305",
      receivingDate: "2024-03-08",
      orderDate: "2024-03-05",
      status: "입고완료",
      itemCount: 28,
      totalAmount: 2800000,
      supplier: "본사 물류센터",
      receivedBy: "김지점",
      notes: "정상 입고"
    }
  ];

  const filteredHistory = receivingHistory.filter(item => {
    const matchesSearch = 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    
    const itemDate = new Date(item.receivingDate);
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);
    const matchesDate = itemDate >= startDate && itemDate <= endDate;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedHistory = filteredHistory.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
    const badges = {
      "입고완료": "bg-green-100 text-green-800",
      "부분입고": "bg-orange-100 text-orange-800",
      "취소됨": "bg-gray-100 text-gray-800"
    };
    return badges[status as keyof typeof badges] || "bg-gray-100 text-gray-800";
  };

  const handleExport = () => {
    alert("입고 이력이 엑셀 파일로 다운로드됩니다.");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">입고 이력</h1>
        <p className="text-gray-500 mt-2">과거 입고 내역을 조회하고 관리합니다</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="flex-1 min-w-[240px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="입고번호, 발주번호, 공급처 검색..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-[150px] pl-8 pr-2 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <span className="text-gray-500">~</span>
            <div className="relative">
              <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-[150px] pl-8 pr-2 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">전체 상태</option>
            <option value="입고완료">입고완료</option>
            <option value="부분입고">부분입고</option>
            <option value="취소됨">취소됨</option>
          </select>

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>엑셀</span>
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-900">
              총 {filteredHistory.length}건의 입고 이력
            </span>
          </div>
          <div className="text-sm text-blue-700">
            총 금액: {filteredHistory.reduce((sum, item) => sum + item.totalAmount, 0).toLocaleString()}원
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">입고번호</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">발주번호</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">입고일</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">상태</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">품목 수</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">총 금액</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">처리자</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">비고</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedHistory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.orderId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.receivingDate}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-900">
                    {item.itemCount}개
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900">
                    {item.totalAmount.toLocaleString()}원
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.receivedBy}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedHistory.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">조회된 입고 이력이 없습니다</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              전체 {filteredHistory.length}건 중 {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredHistory.length)}건 표시
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-700">
                페이지 {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
