import { useState } from "react";
import { Search, MapPin, Phone, Clock, Navigation, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface Branch {
  id: string;
  name: string;
  region: string;
  address: string;
  detailedAddress: string;
  phone: string;
  manager: string;
  managerPhone: string;
  openingHours: string;
  status: "정상 운영" | "점검 중" | "휴무";
  latitude: number;
  longitude: number;
  employeeCount: number;
  monthlyRevenue: number;
}

export function BranchSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("전체");
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const regions = ["전체", "서울", "경기", "인천", "대전", "대구", "부산", "광주", "강원", "충청", "전라", "경상", "제주"];

  const mockBranches: Branch[] = [
    {
      id: "BR001",
      name: "강남본점",
      region: "서울",
      address: "서울특별시 강남구 테헤란로 123",
      detailedAddress: "제로빌딩 1층",
      phone: "02-1234-5678",
      manager: "김지점",
      managerPhone: "010-1234-5678",
      openingHours: "평일 09:00-22:00 / 주말 10:00-21:00",
      status: "정상 운영",
      latitude: 37.5012,
      longitude: 127.0396,
      employeeCount: 12,
      monthlyRevenue: 45000000,
    },
    {
      id: "BR002",
      name: "홍대점",
      region: "서울",
      address: "서울특별시 마포구 홍익로 45",
      detailedAddress: "홍대프라자 2층",
      phone: "02-2345-6789",
      manager: "이지점",
      managerPhone: "010-2345-6789",
      openingHours: "매일 10:00-23:00",
      status: "정상 운영",
      latitude: 37.5547,
      longitude: 126.9245,
      employeeCount: 10,
      monthlyRevenue: 38000000,
    },
    {
      id: "BR003",
      name: "수원점",
      region: "경기",
      address: "경기도 수원시 영통구 광교중앙로 89",
      detailedAddress: "광교타워 1층",
      phone: "031-1234-5678",
      manager: "박지점",
      managerPhone: "010-3456-7890",
      openingHours: "평일 09:00-22:00 / 주말 10:00-21:00",
      status: "정상 운영",
      latitude: 37.2844,
      longitude: 127.0443,
      employeeCount: 9,
      monthlyRevenue: 32000000,
    },
    {
      id: "BR004",
      name: "부산해운대점",
      region: "부산",
      address: "부산광역시 해운대구 해운대해변로 264",
      detailedAddress: "해운대타워 1층",
      phone: "051-1234-5678",
      manager: "최지점",
      managerPhone: "010-4567-8901",
      openingHours: "매일 08:00-23:00",
      status: "정상 운영",
      latitude: 35.1587,
      longitude: 129.1603,
      employeeCount: 11,
      monthlyRevenue: 40000000,
    },
    {
      id: "BR005",
      name: "대구동성로점",
      region: "대구",
      address: "대구광역시 중구 동성로2가 82",
      detailedAddress: "동성빌딩 1층",
      phone: "053-1234-5678",
      manager: "정지점",
      managerPhone: "010-5678-9012",
      openingHours: "평일 09:00-22:00 / 주말 10:00-21:00",
      status: "점검 중",
      latitude: 35.8687,
      longitude: 128.5931,
      employeeCount: 8,
      monthlyRevenue: 28000000,
    },
    {
      id: "BR006",
      name: "인천구월점",
      region: "인천",
      address: "인천광역시 남동구 구월로 123",
      detailedAddress: "구월프라자 1층",
      phone: "032-1234-5678",
      manager: "강지점",
      managerPhone: "010-6789-0123",
      openingHours: "매일 09:00-22:00",
      status: "정상 운영",
      latitude: 37.4615,
      longitude: 126.7323,
      employeeCount: 10,
      monthlyRevenue: 35000000,
    },
  ];

  const filteredBranches = mockBranches.filter((branch) => {
    const matchesSearch =
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === "전체" || branch.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBranches.length / itemsPerPage);
  const paginatedBranches = filteredBranches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "정상 운영":
        return "bg-green-100 text-green-800";
      case "점검 중":
        return "bg-yellow-100 text-yellow-800";
      case "휴무":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => setCurrentPage(1)}
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
            onClick={() => setCurrentPage(page)}
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
              onClick={() => setCurrentPage(totalPages)}
              className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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
        <h1 className="text-3xl font-bold text-gray-900">직영점 조회</h1>
        <p className="text-gray-500 mt-2">
          전국 직영점을 지역별로 검색하고 상세 정보를 확인할 수 있습니다.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card className="px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{mockBranches.length}개</p>
              <p className="text-xs text-gray-500">전체 직영점</p>
            </div>
          </div>
        </Card>

        <Card className="px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-green-600">
                {mockBranches.filter((b) => b.status === "정상 운영").length}개
              </p>
              <p className="text-xs text-gray-500">정상 운영 중</p>
            </div>
          </div>
        </Card>

        <Card className="px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Filter className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-yellow-600">
                {mockBranches.filter((b) => b.status === "점검 중").length}개
              </p>
              <p className="text-xs text-gray-500">점검 중</p>
            </div>
          </div>
        </Card>

        <Card className="px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Phone className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-purple-600">
                {mockBranches.reduce((sum, b) => sum + b.employeeCount, 0)}명
              </p>
              <p className="text-xs text-gray-500">총 직원 수</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="지점명, 주소, 지점장명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {regions.map((region) => (
              <Button
                key={region}
                variant={selectedRegion === region ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRegion(region)}
              >
                {region}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedBranches.map((branch) => (
          <Card
            key={branch.id}
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedBranch(branch)}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{branch.name}</h3>
                  <p className="text-sm text-gray-500">{branch.id}</p>
                </div>
                <Badge className={getStatusColor(branch.status)}>{branch.status}</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{branch.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{branch.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">지점장: {branch.manager}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex justify-between text-sm">
                <span className="text-gray-500">직원 {branch.employeeCount}명</span>
                <span className="text-blue-600 font-medium">
                  월 {(branch.monthlyRevenue / 10000).toFixed(0)}만원
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredBranches.length === 0 && (
        <Card className="p-12">
          <div className="text-center text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>검색 결과가 없습니다.</p>
          </div>
        </Card>
      )}

      {/* Pagination */}
      {filteredBranches.length > 0 && renderPagination()}

      {/* Detail Modal */}
      <Dialog open={selectedBranch !== null} onOpenChange={() => setSelectedBranch(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedBranch?.name} 상세 정보</span>
              <Badge className={getStatusColor(selectedBranch?.status || "")}>
                {selectedBranch?.status}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          {selectedBranch && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">지점 코드</p>
                  <p className="font-medium">{selectedBranch.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">지역</p>
                  <p className="font-medium">{selectedBranch.region}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">주소</p>
                <p className="font-medium">{selectedBranch.address}</p>
                <p className="text-sm text-gray-600 mt-1">{selectedBranch.detailedAddress}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">전화번호</p>
                  <p className="font-medium">{selectedBranch.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">위치 좌표</p>
                  <p className="font-medium text-sm">
                    {selectedBranch.latitude}, {selectedBranch.longitude}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">영업 시간</p>
                <p className="font-medium">{selectedBranch.openingHours}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">지점장</p>
                  <p className="font-medium">{selectedBranch.manager}</p>
                  <p className="text-sm text-gray-600 mt-1">{selectedBranch.managerPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">직원 수</p>
                  <p className="font-medium">{selectedBranch.employeeCount}명</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">월 매출</p>
                <p className="text-2xl font-bold text-blue-600">
                  {selectedBranch.monthlyRevenue.toLocaleString()}원
                </p>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" variant="outline">
                  <Navigation className="w-4 h-4 mr-2" />
                  지도에서 보기
                </Button>
                <Button className="flex-1" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  전화 걸기
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
