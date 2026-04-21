import { useState } from "react";
import {
  PackageX,
  AlertCircle,
  CheckCircle,
  XCircle,
  ImageIcon,
  Calendar,
  MapPin,
  FileText,
  Eye,
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface ReturnRequest {
  id: string;
  requestNo: string;
  branch: string;
  requestDate: string;
  category: "파손" | "유통기한 불량" | "오배송" | "수량 오류" | "품질 불량";
  items: Array<{
    name: string;
    quantity: number;
    unit: string;
  }>;
  reason: string;
  images: string[];
  status: "대기" | "승인" | "반려" | "회수 완료";
  approver?: string;
  approvedDate?: string;
  rejectReason?: string;
  pickupScheduled?: string;
}

export function ReturnManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("전체");
  const [selectedRequest, setSelectedRequest] = useState<ReturnRequest | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [approvalAction, setApprovalAction] = useState<"승인" | "반려">("승인");
  const [rejectReason, setRejectReason] = useState("");

  const mockRequests: ReturnRequest[] = [
    {
      id: "RTN001",
      requestNo: "RTN-2026-0329-001",
      branch: "강남본점",
      requestDate: "2026-03-29 10:30",
      category: "파손",
      items: [
        { name: "계란 30구", quantity: 2, unit: "박스" },
      ],
      reason: "배송 중 충격으로 인해 계란 20개 이상 파손되었습니다. 증빙 사진 첨부합니다.",
      images: ["egg_damage_1.jpg", "egg_damage_2.jpg"],
      status: "대기",
    },
    {
      id: "RTN002",
      requestNo: "RTN-2026-0329-002",
      branch: "홍대점",
      requestDate: "2026-03-29 09:15",
      category: "유통기한 불량",
      items: [
        { name: "우유 1L", quantity: 10, unit: "팩" },
      ],
      reason: "유통기한이 오늘까지인 제품이 배송되었습니다. 판매가 불가능한 상태입니다.",
      images: ["milk_expiry_1.jpg"],
      status: "승인",
      approver: "본사 물류팀",
      approvedDate: "2026-03-29 11:00",
      pickupScheduled: "2026-03-30 오전",
    },
    {
      id: "RTN003",
      requestNo: "RTN-2026-0328-005",
      branch: "판교점",
      requestDate: "2026-03-28 14:20",
      category: "오배송",
      items: [
        { name: "단무지 5kg", quantity: 2, unit: "박스" },
        { name: "김치 3kg", quantity: 1, unit: "통" },
      ],
      reason: "발주하지 않은 품목이 배송되었습니다. 재고 확인 후 반품 요청드립니다.",
      images: ["wrong_items_1.jpg"],
      status: "회수 완료",
      approver: "본사 물류팀",
      approvedDate: "2026-03-28 15:30",
      pickupScheduled: "2026-03-29 오전",
    },
    {
      id: "RTN004",
      requestNo: "RTN-2026-0327-012",
      branch: "수원점",
      requestDate: "2026-03-27 16:45",
      category: "수량 오류",
      items: [
        { name: "햄버거 패티 200g", quantity: 5, unit: "박스" },
      ],
      reason: "발주 수량은 10박스였으나 5박스만 배송되었습니다. 추가 배송 또는 차액 정산 부탁드립니다.",
      images: [],
      status: "반려",
      approver: "본사 물류팀",
      approvedDate: "2026-03-27 17:30",
      rejectReason: "발주서 확인 결과 5박스가 정상 수량입니다. 발주서를 다시 확인해주세요.",
    },
  ];

  const statuses = ["전체", "대기", "승인", "반려", "회수 완료"];
  const categories = ["전체", "파손", "유통기한 불량", "오배송", "수량 오류", "품질 불량"];

  const filteredRequests = mockRequests.filter((request) => {
    const matchesSearch =
      request.requestNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.branch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "전체" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "대기":
        return "bg-yellow-100 text-yellow-800";
      case "승인":
        return "bg-green-100 text-green-800";
      case "반려":
        return "bg-red-100 text-red-800";
      case "회수 완료":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "파손":
        return "bg-red-100 text-red-800";
      case "유통기한 불량":
        return "bg-orange-100 text-orange-800";
      case "오배송":
        return "bg-blue-100 text-blue-800";
      case "수량 오류":
        return "bg-purple-100 text-purple-800";
      case "품질 불량":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleApprovalSubmit = () => {
    console.log("Approval action:", approvalAction, "Reason:", rejectReason);
    setIsApprovalModalOpen(false);
    setRejectReason("");
  };

  const stats = [
    {
      label: "대기 중",
      value: mockRequests.filter((r) => r.status === "대기").length,
      color: "yellow",
    },
    {
      label: "승인 완료",
      value: mockRequests.filter((r) => r.status === "승인").length,
      color: "green",
    },
    {
      label: "반려",
      value: mockRequests.filter((r) => r.status === "반려").length,
      color: "red",
    },
    {
      label: "회수 완료",
      value: mockRequests.filter((r) => r.status === "회수 완료").length,
      color: "purple",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">반품/회수 관리</h1>
        <p className="text-gray-500 mt-2">
          지점의 반품 요청을 확인하고 회수 지시서를 발급하세요
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p
                  className={`text-2xl font-bold mt-1 ${
                    stat.color === "yellow"
                      ? "text-yellow-600"
                      : stat.color === "green"
                      ? "text-green-600"
                      : stat.color === "red"
                      ? "text-red-600"
                      : "text-purple-600"
                  }`}
                >
                  {stat.value}건
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.color === "yellow"
                    ? "bg-yellow-100"
                    : stat.color === "green"
                    ? "bg-green-100"
                    : stat.color === "red"
                    ? "bg-red-100"
                    : "bg-purple-100"
                }`}
              >
                <PackageX
                  className={`w-6 h-6 ${
                    stat.color === "yellow"
                      ? "text-yellow-600"
                      : stat.color === "green"
                      ? "text-green-600"
                      : stat.color === "red"
                      ? "text-red-600"
                      : "text-purple-600"
                  }`}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="반품번호, 지점명으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {statuses.map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Return Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg text-gray-900">{request.requestNo}</h3>
                    <Badge className={getCategoryColor(request.category)}>
                      {request.category}
                    </Badge>
                    <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {request.branch}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {request.requestDate}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedRequest(request);
                      setIsDetailModalOpen(true);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    상세
                  </Button>
                  {request.status === "대기" && (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => {
                        setSelectedRequest(request);
                        setIsApprovalModalOpen(true);
                      }}
                    >
                      처리
                    </Button>
                  )}
                </div>
              </div>

              {/* Items */}
              <div>
                <p className="text-sm text-gray-500 mb-2">반품 품목</p>
                <div className="flex flex-wrap gap-2">
                  {request.items.map((item, idx) => (
                    <Badge key={idx} variant="outline">
                      {item.name} {item.quantity}
                      {item.unit}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Reason */}
              <div>
                <p className="text-sm text-gray-500 mb-1">반품 사유</p>
                <p className="text-gray-700">{request.reason}</p>
              </div>

              {/* Images */}
              {request.images.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ImageIcon className="w-4 h-4" />
                  <span>증빙 사진 {request.images.length}장</span>
                </div>
              )}

              {/* Approval Info */}
              {request.status !== "대기" && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-500">처리자: </span>
                      <span className="font-medium text-gray-900">{request.approver}</span>
                      <span className="text-gray-500 ml-4">처리일: </span>
                      <span className="font-medium text-gray-900">{request.approvedDate}</span>
                    </div>
                    {request.status === "승인" && request.pickupScheduled && (
                      <div>
                        <span className="text-gray-500">회수 예정: </span>
                        <span className="font-medium text-blue-600">
                          {request.pickupScheduled}
                        </span>
                      </div>
                    )}
                  </div>
                  {request.status === "반려" && request.rejectReason && (
                    <div className="mt-2 p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-800">{request.rejectReason}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card className="p-12">
          <div className="text-center text-gray-500">
            <PackageX className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>검색 결과가 없습니다.</p>
          </div>
        </Card>
      )}

      {/* Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>반품 요청 상세</DialogTitle>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">반품 번호</p>
                  <p className="font-medium">{selectedRequest.requestNo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">지점</p>
                  <p className="font-medium">{selectedRequest.branch}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">요청 일시</p>
                  <p className="font-medium">{selectedRequest.requestDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">상태</p>
                  <Badge className={getStatusColor(selectedRequest.status)}>
                    {selectedRequest.status}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">반품 품목</p>
                <div className="space-y-2">
                  {selectedRequest.items.map((item, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium">
                        {item.name} - {item.quantity}
                        {item.unit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">반품 사유</p>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedRequest.reason}</p>
                </div>
              </div>

              {selectedRequest.images.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">증빙 사진</p>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedRequest.images.map((image, idx) => (
                      <div
                        key={idx}
                        className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center"
                      >
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
              닫기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approval Modal */}
      <Dialog open={isApprovalModalOpen} onOpenChange={setIsApprovalModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>반품 요청 처리</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">처리 결과</label>
              <Select value={approvalAction} onValueChange={(v: any) => setApprovalAction(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="승인">승인 (회수 지시서 발급)</SelectItem>
                  <SelectItem value="반려">반려</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {approvalAction === "반려" && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  반려 사유 <span className="text-red-600">*</span>
                </label>
                <Textarea
                  placeholder="반려 사유를 입력하세요..."
                  rows={4}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
              </div>
            )}

            {approvalAction === "승인" && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900">회수 지시서가 발급됩니다</p>
                    <p className="text-sm text-green-700 mt-1">
                      다음 배송 시 해당 품목을 회수하도록 배송 기사에게 지시됩니다.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApprovalModalOpen(false)}>
              취소
            </Button>
            <Button
              onClick={handleApprovalSubmit}
              disabled={approvalAction === "반려" && !rejectReason.trim()}
            >
              {approvalAction === "승인" ? "승인 및 회수 지시서 발급" : "반려"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
