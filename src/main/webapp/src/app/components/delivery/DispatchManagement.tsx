import { useState } from "react";
import { Truck, Users, Package, MapPin, Plus, Edit, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../ui/dialog";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface Order {
  id: string;
  orderNo: string;
  branch: string;
  region: string;
  itemCount: number;
  weight: number;
  requiresCold: boolean;
  requiresFrozen: boolean;
  priority: "긴급" | "일반";
  approvedAt: string;
}

interface Driver {
  id: string;
  name: string;
  phone: string;
  region: string;
  status: "대기" | "배송 중";
}

interface Vehicle {
  id: string;
  plateNo: string;
  type: "1톤" | "2.5톤" | "5톤";
  feature: "냉장" | "냉동" | "냉장/냉동";
  status: "가용" | "배송 중" | "점검 중";
}

interface Dispatch {
  id: string;
  dispatchNo: string;
  region: string;
  driver: Driver;
  vehicle: Vehicle;
  orders: Order[];
  totalWeight: number;
  totalItems: number;
  status: "배차 완료" | "출고 지시서 발행";
}

export function DispatchManagement() {
  const [selectedRegion, setSelectedRegion] = useState<string>("전체");
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const mockOrders: Order[] = [
    {
      id: "ORD001",
      orderNo: "PO-2026-0329-001",
      branch: "강남본점",
      region: "서울/경기권",
      itemCount: 25,
      weight: 350,
      requiresCold: true,
      requiresFrozen: false,
      priority: "일반",
      approvedAt: "2026-03-29 09:00",
    },
    {
      id: "ORD002",
      orderNo: "PO-2026-0329-002",
      branch: "홍대점",
      region: "서울/경기권",
      itemCount: 18,
      weight: 280,
      requiresCold: true,
      requiresFrozen: false,
      priority: "일반",
      approvedAt: "2026-03-29 09:15",
    },
    {
      id: "ORD003",
      orderNo: "PO-2026-0329-003",
      branch: "판교점",
      region: "서울/경기권",
      itemCount: 22,
      weight: 310,
      requiresCold: false,
      requiresFrozen: true,
      priority: "긴급",
      approvedAt: "2026-03-29 09:30",
    },
    {
      id: "ORD004",
      orderNo: "PO-2026-0329-004",
      branch: "대전점",
      region: "충청권",
      itemCount: 30,
      weight: 420,
      requiresCold: true,
      requiresFrozen: true,
      priority: "일반",
      approvedAt: "2026-03-29 09:45",
    },
    {
      id: "ORD005",
      orderNo: "PO-2026-0329-005",
      branch: "신촌점",
      region: "서울/경기권",
      itemCount: 20,
      weight: 290,
      requiresCold: true,
      requiresFrozen: false,
      priority: "일반",
      approvedAt: "2026-03-29 10:00",
    },
    {
      id: "ORD006",
      orderNo: "PO-2026-0329-006",
      branch: "인천점",
      region: "서울/경기권",
      itemCount: 28,
      weight: 380,
      requiresCold: false,
      requiresFrozen: true,
      priority: "일반",
      approvedAt: "2026-03-29 10:15",
    },
    {
      id: "ORD007",
      orderNo: "PO-2026-0329-007",
      branch: "부산점",
      region: "경상권",
      itemCount: 35,
      weight: 450,
      requiresCold: true,
      requiresFrozen: true,
      priority: "긴급",
      approvedAt: "2026-03-29 10:30",
    },
    {
      id: "ORD008",
      orderNo: "PO-2026-0329-008",
      branch: "광주점",
      region: "전라권",
      itemCount: 26,
      weight: 340,
      requiresCold: true,
      requiresFrozen: false,
      priority: "일반",
      approvedAt: "2026-03-29 10:45",
    },
    {
      id: "ORD009",
      orderNo: "PO-2026-0329-009",
      branch: "수원점",
      region: "서울/경기권",
      itemCount: 24,
      weight: 330,
      requiresCold: true,
      requiresFrozen: false,
      priority: "일반",
      approvedAt: "2026-03-29 11:00",
    },
    {
      id: "ORD010",
      orderNo: "PO-2026-0329-010",
      branch: "청주점",
      region: "충청권",
      itemCount: 19,
      weight: 270,
      requiresCold: false,
      requiresFrozen: true,
      priority: "일반",
      approvedAt: "2026-03-29 11:15",
    },
  ];

  const mockDrivers: Driver[] = [
    { id: "DRV001", name: "김배송", phone: "010-1234-5678", region: "서울/경기권", status: "대기" },
    { id: "DRV002", name: "이운송", phone: "010-2345-6789", region: "서울/경기권", status: "배송 중" },
    { id: "DRV003", name: "박택배", phone: "010-3456-7890", region: "충청권", status: "대기" },
  ];

  const mockVehicles: Vehicle[] = [
    { id: "VEH001", plateNo: "12가3456", type: "2.5톤", feature: "냉장", status: "가용" },
    { id: "VEH002", plateNo: "34나5678", type: "1톤", feature: "냉동", status: "배송 중" },
    { id: "VEH003", plateNo: "56다7890", type: "2.5톤", feature: "냉장/냉동", status: "가용" },
  ];

  const mockDispatches: Dispatch[] = [
    {
      id: "DISP001",
      dispatchNo: "DS-2026-0329-001",
      region: "서울/경기권",
      driver: mockDrivers[0],
      vehicle: mockVehicles[0],
      orders: [mockOrders[0], mockOrders[1]],
      totalWeight: 630,
      totalItems: 43,
      status: "출고 지시서 발행",
    },
  ];

  const regions = ["전체", "서울/경기권", "충청권", "경상권", "전라권", "강원권"];

  const filteredOrders = mockOrders.filter(
    (order) => selectedRegion === "전체" || order.region === selectedRegion
  );

  const availableDrivers = mockDrivers.filter(
    (driver) =>
      driver.status === "대기" &&
      (selectedRegion === "전체" || driver.region === selectedRegion)
  );

  const availableVehicles = mockVehicles.filter((vehicle) => vehicle.status === "가용");

  const handleCreateDispatch = () => {
    console.log("Creating dispatch for orders:", selectedOrders);
    setIsDispatchModalOpen(false);
    setSelectedOrders([]);
  };

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
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
        <h1 className="text-3xl font-bold text-gray-900">배차 관리</h1>
        <p className="text-gray-500 mt-2">
          발주 승인 건을 권역별로 그룹화하고 기사와 차량을 배정하세요
        </p>
      </div>

      {/* Region Filter */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {regions.map((region) => (
              <Button
                key={region}
                variant={selectedRegion === region ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRegion(region)}
              >
                <MapPin className="w-4 h-4 mr-2" />
                {region}
              </Button>
            ))}
          </div>
          <Button onClick={() => setIsDispatchModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            배차 생성
          </Button>
        </div>
      </Card>

      {/* Pending Orders - List View */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">배차 대기 발주 건</h2>
        <Card className="overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-semibold text-gray-700">
              <div className="col-span-2">발주 번호</div>
              <div className="col-span-2">지점명</div>
              <div className="col-span-2">권역</div>
              <div className="col-span-1 text-center">품목 수</div>
              <div className="col-span-1 text-center">중량</div>
              <div className="col-span-2">온도 조건</div>
              <div className="col-span-1 text-center">우선순위</div>
              <div className="col-span-1 text-center">액션</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {paginatedOrders.map((order) => (
              <div
                key={order.id}
                className={`grid grid-cols-12 gap-4 px-4 py-3 text-sm items-center hover:bg-gray-50 transition-colors ${
                  order.priority === "긴급" ? "bg-red-50" : ""
                }`}
              >
                <div className="col-span-2 font-medium text-gray-900">{order.orderNo}</div>
                <div className="col-span-2 text-gray-900">{order.branch}</div>
                <div className="col-span-2">
                  <Badge variant="outline" className="text-xs">
                    {order.region}
                  </Badge>
                </div>
                <div className="col-span-1 text-center text-gray-900">{order.itemCount}개</div>
                <div className="col-span-1 text-center text-gray-900">{order.weight}kg</div>
                <div className="col-span-2">
                  <div className="flex gap-1">
                    {order.requiresCold && (
                      <Badge variant="outline" className="text-xs bg-blue-50">
                        냉장
                      </Badge>
                    )}
                    {order.requiresFrozen && (
                      <Badge variant="outline" className="text-xs bg-cyan-50">
                        냉동
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="col-span-1 text-center">
                  <Badge
                    className={`text-xs ${
                      order.priority === "긴급"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.priority}
                  </Badge>
                </div>
                <div className="col-span-1 flex justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-3 text-xs"
                    onClick={() => {
                      setSelectedOrders([...selectedOrders, order]);
                      setIsDispatchModalOpen(true);
                    }}
                  >
                    배차 추가
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>배차 대기 중인 발주 건이 없습니다.</p>
            </div>
          )}
        </Card>

        {/* Pagination */}
        {filteredOrders.length > 0 && renderPagination()}
      </div>

      {/* Dispatch Creation Modal */}
      <Dialog open={isDispatchModalOpen} onOpenChange={setIsDispatchModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>배차 생성</DialogTitle>
            <DialogDescription>
              배차를 생성하기 위해 필요한 정보를 입력하세요.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Selected Orders */}
            {selectedOrders.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-3">선택된 발주 건 ({selectedOrders.length})</h3>
                <div className="space-y-2">
                  {selectedOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{order.branch}</p>
                        <p className="text-sm text-gray-500">
                          {order.itemCount}개 품목 · {order.weight}kg
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setSelectedOrders(selectedOrders.filter((o) => o.id !== order.id))
                        }
                      >
                        제거
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Driver Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">배송 기사</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="기사 선택" />
                </SelectTrigger>
                <SelectContent>
                  {availableDrivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      {driver.name} - {driver.phone} ({driver.region})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Vehicle Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">차량</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="차량 선택" />
                </SelectTrigger>
                <SelectContent>
                  {availableVehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.plateNo} - {vehicle.type} {vehicle.feature}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedOrders.length === 0 && (
              <div className="flex items-center gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <p className="text-sm text-yellow-800">발주 건을 먼저 선택해주세요.</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDispatchModalOpen(false)}>
              취소
            </Button>
            <Button onClick={handleCreateDispatch} disabled={selectedOrders.length === 0}>
              배차 생성
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}