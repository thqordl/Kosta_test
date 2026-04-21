import { useState } from "react";
import { Truck, MapPin, Clock, AlertTriangle, Navigation, Phone, Package, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface Delivery {
  id: string;
  deliveryNo: string;
  driver: string;
  driverPhone: string;
  vehicle: string;
  region: string;
  branches: string[];
  status: "출고 대기" | "배송 중" | "지점 도착" | "입고 완료";
  currentLocation: string;
  eta: string;
  progress: number;
  departureTime: string;
  itemCount: number;
  isDelayed: boolean;
  delayReason?: string;
}

export function RealTimeTracking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("전체");
  const [regionFilter, setRegionFilter] = useState<string>("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const mockDeliveries: Delivery[] = [
    {
      id: "DEL001",
      deliveryNo: "DL-2026-0329-001",
      driver: "김배송",
      driverPhone: "010-1234-5678",
      vehicle: "12가3456 (2.5톤 냉장)",
      region: "서울/경기권",
      branches: ["강남본점", "홍대점", "신촌점"],
      status: "배송 중",
      currentLocation: "서울 강남구 테헤란로",
      eta: "오후 2시 30분",
      progress: 65,
      departureTime: "오전 9:00",
      itemCount: 45,
      isDelayed: false,
    },
    {
      id: "DEL002",
      deliveryNo: "DL-2026-0329-002",
      driver: "이운송",
      driverPhone: "010-2345-6789",
      vehicle: "34나5678 (1톤 냉동)",
      region: "서울/경기권",
      branches: ["판교점", "수원점"],
      status: "배송 중",
      currentLocation: "경기 성남시 분당구",
      eta: "오후 3시 15분",
      progress: 80,
      departureTime: "오전 8:30",
      itemCount: 32,
      isDelayed: true,
      delayReason: "교통 체증",
    },
    {
      id: "DEL003",
      deliveryNo: "DL-2026-0329-003",
      driver: "박택배",
      driverPhone: "010-3456-7890",
      vehicle: "56다7890 (2.5톤 냉장)",
      region: "충청권",
      branches: ["대전점", "청주점", "천안점"],
      status: "출고 대기",
      currentLocation: "본사 물류창고",
      eta: "오후 4시 00분",
      progress: 0,
      departureTime: "오후 1:00 예정",
      itemCount: 58,
      isDelayed: false,
    },
    {
      id: "DEL004",
      deliveryNo: "DL-2026-0329-004",
      driver: "최물류",
      driverPhone: "010-4567-8901",
      vehicle: "78라9012 (1톤 냉장)",
      region: "경상권",
      branches: ["부산해운대점", "대구동성로점"],
      status: "지점 도착",
      currentLocation: "부산 해운대구",
      eta: "도착 완료",
      progress: 100,
      departureTime: "오전 7:00",
      itemCount: 38,
      isDelayed: false,
    },
    {
      id: "DEL005",
      deliveryNo: "DL-2026-0329-005",
      driver: "정배달",
      driverPhone: "010-5678-9012",
      vehicle: "90마1234 (2.5톤 냉동)",
      region: "전라권",
      branches: ["광주점", "전주점"],
      status: "입고 완료",
      currentLocation: "광주 서구",
      eta: "입고 완료",
      progress: 100,
      departureTime: "오전 6:30",
      itemCount: 42,
      isDelayed: false,
    },
    {
      id: "DEL006",
      deliveryNo: "DL-2026-0329-006",
      driver: "한운반",
      driverPhone: "010-6789-0123",
      vehicle: "12바3456 (2.5톤 냉장)",
      region: "서울/경기권",
      branches: ["인천점", "부천점"],
      status: "배송 중",
      currentLocation: "인천 남동구",
      eta: "오후 2시 00분",
      progress: 55,
      departureTime: "오전 9:30",
      itemCount: 40,
      isDelayed: false,
    },
    {
      id: "DEL007",
      deliveryNo: "DL-2026-0329-007",
      driver: "송물류",
      driverPhone: "010-7890-1234",
      vehicle: "34사5678 (1톤 냉동)",
      region: "강원권",
      branches: ["춘천점", "원주점"],
      status: "출고 대기",
      currentLocation: "본사 물류창고",
      eta: "오후 5시 00분",
      progress: 0,
      departureTime: "오후 2:00 예정",
      itemCount: 35,
      isDelayed: false,
    },
    {
      id: "DEL008",
      deliveryNo: "DL-2026-0329-008",
      driver: "강배송",
      driverPhone: "010-8901-2345",
      vehicle: "56아7890 (2.5톤 냉장)",
      region: "경상권",
      branches: ["울산점", "창원점"],
      status: "배송 중",
      currentLocation: "울산 남구",
      eta: "오후 3시 30분",
      progress: 70,
      departureTime: "오전 8:00",
      itemCount: 48,
      isDelayed: false,
    },
  ];

  const regions = ["전체", "서울/경기권", "충청권", "경상권", "전라권", "강원권"];
  const statuses = ["전체", "출고 대기", "배송 중", "지점 도착", "입고 완료"];

  const filteredDeliveries = mockDeliveries.filter((delivery) => {
    const matchesSearch =
      delivery.deliveryNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.branches.some((branch) => branch.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "전체" || delivery.status === statusFilter;
    const matchesRegion = regionFilter === "전체" || delivery.region === regionFilter;
    return matchesSearch && matchesStatus && matchesRegion;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "출고 대기":
        return "bg-gray-100 text-gray-800";
      case "배송 중":
        return "bg-blue-100 text-blue-800";
      case "지점 도착":
        return "bg-green-100 text-green-800";
      case "입고 완료":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const stats = [
    {
      label: "총 배송 건",
      value: mockDeliveries.length,
      color: "blue",
    },
    {
      label: "배송 중",
      value: mockDeliveries.filter((d) => d.status === "배송 중").length,
      color: "blue",
    },
    {
      label: "지연 건",
      value: mockDeliveries.filter((d) => d.isDelayed).length,
      color: "red",
    },
    {
      label: "완료 건",
      value: mockDeliveries.filter((d) => d.status === "입고 완료").length,
      color: "green",
    },
  ];

  // Pagination
  const totalPages = Math.ceil(filteredDeliveries.length / itemsPerPage);
  const paginatedDeliveries = filteredDeliveries.slice(
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">배송 조회</h1>
        <p className="text-gray-500 mt-2">
          본사 물류창고를 떠난 차량의 실시간 위치와 도착 예정 시간을 확인하세요
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
            <p className="text-xs text-gray-600">{stat.label}</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="배송번호, 기사명, 지점명으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="권역 선택" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="상태 선택" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Delivery List */}
      <div className="space-y-3">
        {paginatedDeliveries.map((delivery) => (
          <Card
            key={delivery.id}
            className={`p-4 ${
              delivery.isDelayed ? "border-2 border-red-500 bg-red-50" : ""
            }`}
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-gray-900">{delivery.deliveryNo}</h3>
                      {delivery.isDelayed && (
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{delivery.region}</p>
                  </div>
                </div>
                <Badge className={`${getStatusColor(delivery.status)} text-base px-4 py-1.5 font-semibold`}>{delivery.status}</Badge>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">배송 기사</p>
                  <p className="font-medium text-sm text-gray-900">{delivery.driver}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mt-0.5">
                    <Phone className="w-3 h-3" />
                    {delivery.driverPhone}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">차량</p>
                  <p className="font-medium text-sm text-gray-900">{delivery.vehicle}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">출고 시간</p>
                  <p className="font-medium text-sm text-gray-900">{delivery.departureTime}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">도착 예정</p>
                  <p
                    className={`font-bold text-sm ${
                      delivery.isDelayed ? "text-red-600" : "text-blue-600"
                    }`}
                  >
                    {delivery.eta}
                  </p>
                </div>
              </div>

              {/* Current Location */}
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">현재 위치:</span>
                <span className="font-medium text-gray-900">{delivery.currentLocation}</span>
                {delivery.isDelayed && delivery.delayReason && (
                  <span className="ml-2 text-red-600">({delivery.delayReason})</span>
                )}
              </div>

              {/* Branches */}
              <div>
                <p className="text-xs text-gray-500 mb-1.5">배송 지점 ({delivery.branches.length})</p>
                <div className="flex flex-wrap gap-1.5">
                  {delivery.branches.map((branch, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs py-0.5 px-2">
                      {branch}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {filteredDeliveries.length > 0 && renderPagination()}

      {filteredDeliveries.length === 0 && (
        <Card className="p-12">
          <div className="text-center text-gray-500">
            <Truck className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>검색 결과가 없습니다.</p>
          </div>
        </Card>
      )}
    </div>
  );
}