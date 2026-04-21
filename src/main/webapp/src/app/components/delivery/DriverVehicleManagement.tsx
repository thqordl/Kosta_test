import { useState } from "react";
import { User, Truck, Plus, Edit, Trash2, Phone, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";

interface Driver {
  id: string;
  name: string;
  phone: string;
  region: string;
  status: "대기" | "배송 중" | "휴무";
  assignedVehicle?: string;
  totalDeliveries: number;
}

interface Vehicle {
  id: string;
  plateNo: string;
  type: "1톤" | "2.5톤" | "5톤";
  feature: "냉장" | "냉동" | "냉장/냉동" | "일반";
  status: "가용" | "배송 중" | "점검 중";
  assignedDriver?: string;
  lastInspection: string;
  mileage: number;
}

export function DriverVehicleManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [currentDriverPage, setCurrentDriverPage] = useState(1);
  const [currentVehiclePage, setCurrentVehiclePage] = useState(1);
  const itemsPerPage = 8;

  const mockDrivers: Driver[] = [
    {
      id: "DRV001",
      name: "김배송",
      phone: "010-1234-5678",
      region: "서울/경기권",
      status: "배송 중",
      assignedVehicle: "12가3456",
      totalDeliveries: 342,
    },
    {
      id: "DRV002",
      name: "이운송",
      phone: "010-2345-6789",
      region: "서울/경기권",
      status: "대기",
      assignedVehicle: "34나5678",
      totalDeliveries: 285,
    },
    {
      id: "DRV003",
      name: "박택배",
      phone: "010-3456-7890",
      region: "충청권",
      status: "대기",
      assignedVehicle: "56다7890",
      totalDeliveries: 421,
    },
    {
      id: "DRV004",
      name: "최물류",
      phone: "010-4567-8901",
      region: "경상권",
      status: "배송 중",
      assignedVehicle: "78라9012",
      totalDeliveries: 198,
    },
    {
      id: "DRV005",
      name: "정배달",
      phone: "010-5678-9012",
      region: "전라권",
      status: "휴무",
      totalDeliveries: 156,
    },
    {
      id: "DRV006",
      name: "한운반",
      phone: "010-6789-0123",
      region: "서울/경기권",
      status: "대기",
      assignedVehicle: "90마1234",
      totalDeliveries: 267,
    },
    {
      id: "DRV007",
      name: "송물류",
      phone: "010-7890-1234",
      region: "강원권",
      status: "배송 중",
      assignedVehicle: "12바3456",
      totalDeliveries: 189,
    },
    {
      id: "DRV008",
      name: "강배송",
      phone: "010-8901-2345",
      region: "경상권",
      status: "대기",
      assignedVehicle: "34사5678",
      totalDeliveries: 312,
    },
    {
      id: "DRV009",
      name: "윤운송",
      phone: "010-9012-3456",
      region: "전라권",
      status: "배송 중",
      totalDeliveries: 225,
    },
    {
      id: "DRV010",
      name: "임택배",
      phone: "010-0123-4567",
      region: "충청권",
      status: "대기",
      assignedVehicle: "56아7890",
      totalDeliveries: 178,
    },
  ];

  const mockVehicles: Vehicle[] = [
    {
      id: "VEH001",
      plateNo: "12가3456",
      type: "2.5톤",
      feature: "냉장",
      status: "배송 중",
      assignedDriver: "김배송",
      lastInspection: "2026-03-15",
      mileage: 45280,
    },
    {
      id: "VEH002",
      plateNo: "34나5678",
      type: "1톤",
      feature: "냉동",
      status: "가용",
      assignedDriver: "이운송",
      lastInspection: "2026-03-20",
      mileage: 32150,
    },
    {
      id: "VEH003",
      plateNo: "56다7890",
      type: "2.5톤",
      feature: "냉장/냉동",
      status: "가용",
      assignedDriver: "박택배",
      lastInspection: "2026-03-10",
      mileage: 58920,
    },
    {
      id: "VEH004",
      plateNo: "78라9012",
      type: "1톤",
      feature: "냉장",
      status: "배송 중",
      assignedDriver: "최물류",
      lastInspection: "2026-03-25",
      mileage: 28340,
    },
    {
      id: "VEH005",
      plateNo: "90마1234",
      type: "5톤",
      feature: "냉장/냉동",
      status: "점검 중",
      lastInspection: "2026-02-28",
      mileage: 72450,
    },
    {
      id: "VEH006",
      plateNo: "12바3456",
      type: "2.5톤",
      feature: "냉장",
      status: "가용",
      assignedDriver: "송물류",
      lastInspection: "2026-03-18",
      mileage: 41230,
    },
    {
      id: "VEH007",
      plateNo: "34사5678",
      type: "1톤",
      feature: "냉동",
      status: "배송 중",
      assignedDriver: "강배송",
      lastInspection: "2026-03-22",
      mileage: 36780,
    },
    {
      id: "VEH008",
      plateNo: "56아7890",
      type: "2.5톤",
      feature: "냉장/냉동",
      status: "가용",
      assignedDriver: "임택배",
      lastInspection: "2026-03-12",
      mileage: 52340,
    },
    {
      id: "VEH009",
      plateNo: "78자9012",
      type: "1톤",
      feature: "냉장",
      status: "점검 중",
      lastInspection: "2026-02-25",
      mileage: 64120,
    },
    {
      id: "VEH010",
      plateNo: "90차1234",
      type: "5톤",
      feature: "냉장/냉동",
      status: "가용",
      lastInspection: "2026-03-08",
      mileage: 38560,
    },
  ];

  const filteredDrivers = mockDrivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.phone.includes(searchTerm) ||
      driver.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVehicles = mockVehicles.filter(
    (vehicle) =>
      vehicle.plateNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.assignedDriver?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDriverStatusColor = (status: string) => {
    switch (status) {
      case "대기":
        return "bg-green-100 text-green-800";
      case "배송 중":
        return "bg-blue-100 text-blue-800";
      case "휴무":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getVehicleStatusColor = (status: string) => {
    switch (status) {
      case "가용":
        return "bg-green-100 text-green-800";
      case "배송 중":
        return "bg-blue-100 text-blue-800";
      case "점검 중":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDeleteDriver = (driverId: string) => {
    if (window.confirm("이 기사 정보를 삭제하시겠습니까?")) {
      console.log("Deleting driver:", driverId);
    }
  };

  const handleDeleteVehicle = (vehicleId: string) => {
    if (window.confirm("이 차량 정보를 삭제하시겠습니까?")) {
      console.log("Deleting vehicle:", vehicleId);
    }
  };

  const driverStats = [
    {
      label: "총 기사",
      value: mockDrivers.length,
    },
    {
      label: "대기 중",
      value: mockDrivers.filter((d) => d.status === "대기").length,
    },
    {
      label: "배송 중",
      value: mockDrivers.filter((d) => d.status === "배송 중").length,
    },
    {
      label: "휴무",
      value: mockDrivers.filter((d) => d.status === "휴무").length,
    },
  ];

  const vehicleStats = [
    {
      label: "총 차량",
      value: mockVehicles.length,
    },
    {
      label: "가용",
      value: mockVehicles.filter((v) => v.status === "가용").length,
    },
    {
      label: "배송 중",
      value: mockVehicles.filter((v) => v.status === "배송 중").length,
    },
    {
      label: "점검 중",
      value: mockVehicles.filter((v) => v.status === "점검 중").length,
    },
  ];

  // Pagination for drivers
  const totalDriverPages = Math.ceil(filteredDrivers.length / itemsPerPage);
  const paginatedDrivers = filteredDrivers.slice(
    (currentDriverPage - 1) * itemsPerPage,
    currentDriverPage * itemsPerPage
  );

  // Pagination for vehicles
  const totalVehiclePages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const paginatedVehicles = filteredVehicles.slice(
    (currentVehiclePage - 1) * itemsPerPage,
    currentVehiclePage * itemsPerPage
  );

  const renderPagination = (currentPage: number, totalPages: number, onPageChange: (page: number) => void) => {
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
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
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
            onClick={() => onPageChange(page)}
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
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
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
        <h1 className="text-3xl font-bold text-gray-900">기사/차량 관리</h1>
        <p className="text-gray-500 mt-2">
          배송 업무를 수행하는 기사와 차량 정보를 관리하세요
        </p>
      </div>

      {/* Search */}
      <Card className="p-6">
        <Input
          placeholder="기사명, 전화번호, 차량번호로 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="drivers" className="space-y-6">
        {/* Drivers Tab */}
        <TabsContent value="drivers" className="space-y-6">
          {/* Combined Row: Tabs, Stats, Button */}
          <div className="flex items-center gap-4">
            <TabsList>
              <TabsTrigger value="drivers">
                <User className="w-4 h-4 mr-2" />
                배송 기사
              </TabsTrigger>
              <TabsTrigger value="vehicles">
                <Truck className="w-4 h-4 mr-2" />
                차량
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 flex items-center gap-3">
              {driverStats.map((stat, index) => (
                <div key={index} className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-2">
                  <p className="text-xs text-gray-600">{stat.label}</p>
                  <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>

            <Button onClick={() => setIsDriverModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              기사 추가
            </Button>
          </div>

          {/* Drivers List */}
          <Card className="overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-semibold text-gray-700">
                <div className="col-span-2">이름</div>
                <div className="col-span-2">전화번호</div>
                <div className="col-span-2">담당 권역</div>
                <div className="col-span-2">배차 차량</div>
                <div className="col-span-2 text-center">상태</div>
                <div className="col-span-2 text-center">액션</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {paginatedDrivers.map((driver) => (
                <div
                  key={driver.id}
                  className="grid grid-cols-12 gap-4 px-4 py-3 text-sm items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="col-span-2 font-medium text-gray-900">{driver.name}</div>
                  <div className="col-span-2 text-gray-600 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-gray-400" />
                    {driver.phone}
                  </div>
                  <div className="col-span-2">
                    <Badge variant="outline" className="text-xs">
                      {driver.region}
                    </Badge>
                  </div>
                  <div className="col-span-2 text-gray-900">
                    {driver.assignedVehicle || "-"}
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <Badge className={`${getDriverStatusColor(driver.status)} text-sm px-3 py-1`}>
                      {driver.status}
                    </Badge>
                  </div>
                  <div className="col-span-2 flex justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-3 text-xs"
                      onClick={() => {
                        setEditingDriver(driver);
                        setIsDriverModalOpen(true);
                      }}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      수정
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-xs"
                      onClick={() => handleDeleteDriver(driver.id)}
                    >
                      <Trash2 className="w-3 h-3 text-red-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredDrivers.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                <User className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>등록된 기사가 없습니다.</p>
              </div>
            )}
          </Card>

          {/* Pagination */}
          {filteredDrivers.length > 0 && renderPagination(currentDriverPage, totalDriverPages, setCurrentDriverPage)}
        </TabsContent>

        {/* Vehicles Tab */}
        <TabsContent value="vehicles" className="space-y-6">
          {/* Combined Row: Tabs, Stats, Button */}
          <div className="flex items-center gap-4">
            <TabsList>
              <TabsTrigger value="drivers">
                <User className="w-4 h-4 mr-2" />
                배송 기사
              </TabsTrigger>
              <TabsTrigger value="vehicles">
                <Truck className="w-4 h-4 mr-2" />
                차량
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 flex items-center gap-3">
              {vehicleStats.map((stat, index) => (
                <div key={index} className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-2">
                  <p className="text-xs text-gray-600">{stat.label}</p>
                  <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>

            <Button onClick={() => setIsVehicleModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              차량 추가
            </Button>
          </div>

          {/* Vehicles List */}
          <Card className="overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-semibold text-gray-700">
                <div className="col-span-2">차량 번호</div>
                <div className="col-span-1 text-center">톤수</div>
                <div className="col-span-2">특성</div>
                <div className="col-span-2">배차 기사</div>
                <div className="col-span-2">최근 점검</div>
                <div className="col-span-1 text-center">상태</div>
                <div className="col-span-2 text-center">액션</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {paginatedVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="grid grid-cols-12 gap-4 px-4 py-3 text-sm items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="col-span-2 font-medium text-gray-900">{vehicle.plateNo}</div>
                  <div className="col-span-1 text-center text-gray-900">{vehicle.type}</div>
                  <div className="col-span-2">
                    <Badge variant="outline" className="text-xs">
                      {vehicle.feature}
                    </Badge>
                  </div>
                  <div className="col-span-2 text-gray-900">
                    {vehicle.assignedDriver || "-"}
                  </div>
                  <div className="col-span-2 text-gray-600">{vehicle.lastInspection}</div>
                  <div className="col-span-1 flex justify-center">
                    <Badge className={`${getVehicleStatusColor(vehicle.status)} text-sm px-3 py-1`}>
                      {vehicle.status}
                    </Badge>
                  </div>
                  <div className="col-span-2 flex justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-3 text-xs"
                      onClick={() => {
                        setEditingVehicle(vehicle);
                        setIsVehicleModalOpen(true);
                      }}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      수정
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-xs"
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                    >
                      <Trash2 className="w-3 h-3 text-red-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredVehicles.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                <Truck className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>등록된 차량이 없습니다.</p>
              </div>
            )}
          </Card>

          {/* Pagination */}
          {filteredVehicles.length > 0 && renderPagination(currentVehiclePage, totalVehiclePages, setCurrentVehiclePage)}
        </TabsContent>
      </Tabs>

      {/* Driver Modal */}
      <Dialog
        open={isDriverModalOpen}
        onOpenChange={(open) => {
          setIsDriverModalOpen(open);
          if (!open) setEditingDriver(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingDriver ? "기사 정보 수정" : "기사 추가"}</DialogTitle>
            <DialogDescription>
              기사의 기본 정보를 입력하세요.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">이름</label>
              <Input placeholder="기사 이름" defaultValue={editingDriver?.name} />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">전화번호</label>
              <Input placeholder="010-0000-0000" defaultValue={editingDriver?.phone} />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">담당 권역</label>
              <Select defaultValue={editingDriver?.region}>
                <SelectTrigger>
                  <SelectValue placeholder="권역 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="서울/경기권">서울/경기권</SelectItem>
                  <SelectItem value="충청권">충청권</SelectItem>
                  <SelectItem value="경상권">경상권</SelectItem>
                  <SelectItem value="전라권">전라권</SelectItem>
                  <SelectItem value="강원권">강원권</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">상태</label>
              <Select defaultValue={editingDriver?.status}>
                <SelectTrigger>
                  <SelectValue placeholder="상태 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="대기">대기</SelectItem>
                  <SelectItem value="배송 중">배송 중</SelectItem>
                  <SelectItem value="휴무">휴무</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDriverModalOpen(false)}>
              취소
            </Button>
            <Button onClick={() => setIsDriverModalOpen(false)}>
              {editingDriver ? "수정" : "추가"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Vehicle Modal */}
      <Dialog
        open={isVehicleModalOpen}
        onOpenChange={(open) => {
          setIsVehicleModalOpen(open);
          if (!open) setEditingVehicle(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingVehicle ? "차량 정보 수정" : "차량 추가"}</DialogTitle>
            <DialogDescription>
              차량의 기본 정보를 입력하세요.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">차량 번호</label>
              <Input placeholder="12가3456" defaultValue={editingVehicle?.plateNo} />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">톤수</label>
              <Select defaultValue={editingVehicle?.type}>
                <SelectTrigger>
                  <SelectValue placeholder="톤수 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1톤">1톤</SelectItem>
                  <SelectItem value="2.5톤">2.5톤</SelectItem>
                  <SelectItem value="5톤">5톤</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">특성</label>
              <Select defaultValue={editingVehicle?.feature}>
                <SelectTrigger>
                  <SelectValue placeholder="특성 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="냉장">냉장</SelectItem>
                  <SelectItem value="냉동">냉동</SelectItem>
                  <SelectItem value="냉장/냉동">냉장/냉동</SelectItem>
                  <SelectItem value="일반">일반</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">상태</label>
              <Select defaultValue={editingVehicle?.status}>
                <SelectTrigger>
                  <SelectValue placeholder="상태 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="가용">가용</SelectItem>
                  <SelectItem value="배송 중">배송 중</SelectItem>
                  <SelectItem value="점검 중">점검 중</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">주행거리 (km)</label>
              <Input
                type="number"
                placeholder="0"
                defaultValue={editingVehicle?.mileage}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVehicleModalOpen(false)}>
              취소
            </Button>
            <Button onClick={() => setIsVehicleModalOpen(false)}>
              {editingVehicle ? "수정" : "추가"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
