import { useState } from "react";
import {
  Search,
  Plus,
  MessageSquare,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
  Clock,
  Edit,
  Trash2,
  Send,
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAuth } from "../../contexts/AuthContext";

interface Reply {
  id: string;
  author: string;
  authorRole: string;
  content: string;
  createdAt: string;
}

interface Inquiry {
  id: string;
  title: string;
  content: string;
  category: "설비 문의" | "재고 문의" | "운영 건의" | "인사 문의" | "기타";
  status: "대기 중" | "답변 완료" | "처리 중";
  branch: string;
  author: string;
  authorRole: string;
  createdAt: string;
  replies: Reply[];
  priority: "긴급" | "일반";
}

export function BranchInquiries() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [selectedStatus, setSelectedStatus] = useState<string>("전체");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [newInquiry, setNewInquiry] = useState({
    title: "",
    content: "",
    category: "일반 문의" as Inquiry["category"],
    priority: "일반" as Inquiry["priority"],
  });

  const mockInquiries: Inquiry[] = [
    {
      id: "INQ001",
      title: "냉장고 고장으로 긴급 수리 요청",
      content:
        "오늘 아침 출근하여 확인한 결과 주방 냉장고가 작동하지 않는 것을 발견했습니다. 온도가 15도까지 올라가 있어 일부 식재료의 폐기가 불가피할 것으로 보입니다.\n\n긴급 수리를 요청드리며, 수리 기사 방문 일정을 알려주시기 바랍니다. 또한 폐기 처리된 식재료에 대한 보상 절차도 안내 부탁드립니다.",
      category: "설비 문의",
      status: "처리 중",
      branch: user?.branch || "강남지점",
      author: user?.name || "김지점",
      authorRole: user?.role || "지점장",
      createdAt: "2026-03-29 08:30",
      priority: "긴급",
      replies: [
        {
          id: "REP001",
          author: "본사 시설관리팀",
          authorRole: "본사관리자",
          content:
            "긴급 수리 요청 접수했습니다. 오늘 오후 2시에 수리 기사가 방문할 예정입니다. 폐기 식재료 목록과 사진을 시스템에 등록해주시면 보상 절차를 진행하겠습니다.",
          createdAt: "2026-03-29 09:15",
        },
      ],
    },
    {
      id: "INQ002",
      title: "신메뉴 재료 발주 수량 조정 건의",
      content:
        "4월 신메뉴 출시를 앞두고 재료 발주 수량에 대해 건의드립니다.\n\n저희 지점은 젊은 고객층이 많아 신메뉴에 대한 수요가 높을 것으로 예상됩니다. 현재 배정된 수량보다 30% 정도 추가 발주가 필요할 것 같습니다.\n\n검토 부탁드립니다.",
      category: "재고 문의",
      status: "답변 완료",
      branch: user?.branch || "강남지점",
      author: user?.name || "이지점",
      authorRole: user?.role || "지점장",
      createdAt: "2026-03-28 16:20",
      priority: "일반",
      replies: [
        {
          id: "REP002",
          author: "본사 발주관리팀",
          authorRole: "본사관리자",
          content:
            "신메뉴 재료 추가 발주 건의 검토했습니다. 해당 지점의 지난 3개월 매출 추이를 분석한 결과, 제안하신 내용이 타당하다고 판단됩니다. 발주 수량 20% 증량 승인합니다. 시스템에서 확인해주세요.",
          createdAt: "2026-03-28 18:30",
        },
      ],
    },
    {
      id: "INQ003",
      title: "매장 리모델링 일정 문의",
      content:
        "매장 노후화로 인해 리모델링이 필요한 상황입니다. 특히 고객 좌석과 주방 설비 교체가 시급합니다.\n\n올해 리모델링 일정이 있는지, 있다면 언제쯤 가능한지 문의드립니다.",
      category: "설비 문의",
      status: "대기 중",
      branch: user?.branch || "강남지점",
      author: user?.name || "박지점",
      authorRole: user?.role || "지점장",
      createdAt: "2026-03-27 14:10",
      priority: "일반",
      replies: [],
    },
  ];

  const categories = ["전체", "설비 문의", "재고 문의", "운영 건의", "인사 문의", "기타"];
  const statuses = ["전체", "대기 중", "처리 중", "답변 완료"];

  const filteredInquiries = mockInquiries
    .filter((inquiry) => {
      const matchesSearch =
        inquiry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "전체" || inquiry.category === selectedCategory;
      const matchesStatus = selectedStatus === "전체" || inquiry.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      if (a.priority === "긴급" && b.priority !== "긴급") return -1;
      if (a.priority !== "긴급" && b.priority === "긴급") return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "대기 중":
        return "bg-yellow-100 text-yellow-800";
      case "처리 중":
        return "bg-blue-100 text-blue-800";
      case "답변 완료":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "설비 문의":
        return "bg-purple-100 text-purple-800";
      case "재고 문의":
        return "bg-orange-100 text-orange-800";
      case "운영 건의":
        return "bg-blue-100 text-blue-800";
      case "인사 문의":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateInquiry = () => {
    console.log("Creating inquiry:", newInquiry);
    setIsCreateModalOpen(false);
    setNewInquiry({
      title: "",
      content: "",
      category: "일반 문의" as Inquiry["category"],
      priority: "일반",
    });
  };

  const handleEditInquiry = () => {
    console.log("Editing inquiry:", selectedInquiry);
    setIsEditMode(false);
    setSelectedInquiry(null);
  };

  const handleDeleteInquiry = (inquiryId: string) => {
    if (window.confirm("이 문의사항을 삭제하시겠습니까?")) {
      console.log("Deleting inquiry:", inquiryId);
    }
  };

  const handleSendReply = () => {
    if (!replyContent.trim()) return;

    console.log("Sending reply:", {
      inquiryId: selectedInquiry?.id,
      content: replyContent,
    });

    if (selectedInquiry) {
      const newReply: Reply = {
        id: `REP${Date.now()}`,
        author: user?.name || "작성자",
        authorRole: user?.role || "지점장",
        content: replyContent,
        createdAt: new Date().toISOString().slice(0, 16).replace("T", " "),
      };

      setSelectedInquiry({
        ...selectedInquiry,
        replies: [...selectedInquiry.replies, newReply],
      });
    }

    setReplyContent("");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedInquiries = filteredInquiries.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">문의사항</h1>
          <p className="text-gray-500 mt-2">
            본사에 문의사항이나 건의사항을 전달할 수 있습니다.
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          문의하기
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">전체 문의</p>
              <p className="text-lg font-bold text-gray-900 mt-0.5">{mockInquiries.length}건</p>
            </div>
            <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">대기 중</p>
              <p className="text-lg font-bold text-yellow-600 mt-0.5">
                {mockInquiries.filter((i) => i.status === "대기 중").length}건
              </p>
            </div>
            <div className="w-9 h-9 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">처리 중</p>
              <p className="text-lg font-bold text-blue-600 mt-0.5">
                {mockInquiries.filter((i) => i.status === "처리 중").length}건
              </p>
            </div>
            <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">답변 완료</p>
              <p className="text-lg font-bold text-green-600 mt-0.5">
                {mockInquiries.filter((i) => i.status === "답변 완료").length}건
              </p>
            </div>
            <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
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
                placeholder="제목 또는 내용으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="상태" />
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
        </div>
      </Card>

      {/* Inquiries List */}
      <div className="space-y-3">
        {paginatedInquiries.map((inquiry) => (
          <Card
            key={inquiry.id}
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedInquiry(inquiry)}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {inquiry.priority === "긴급" && (
                      <Badge className="bg-red-100 text-red-800">긴급</Badge>
                    )}
                    <Badge className={getCategoryColor(inquiry.category)}>
                      {inquiry.category}
                    </Badge>
                    <Badge className={getStatusColor(inquiry.status)}>{inquiry.status}</Badge>
                    <h3 className="font-bold text-lg text-gray-900">{inquiry.title}</h3>
                  </div>

                  <p className="text-gray-600 line-clamp-2">{inquiry.content}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedInquiry(inquiry);
                      setIsEditMode(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteInquiry(inquiry.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {inquiry.createdAt}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MessageSquare className="w-4 h-4" />
                  <span>답변 {inquiry.replies.length}개</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredInquiries.length === 0 && (
        <Card className="p-12">
          <div className="text-center text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>검색 결과가 없습니다.</p>
          </div>
        </Card>
      )}

      {/* Pagination */}
      {filteredInquiries.length > itemsPerPage && (
        <div className="flex justify-center mt-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            이전
          </Button>
          <span className="mx-2 text-gray-500">
            {currentPage} / {Math.ceil(filteredInquiries.length / itemsPerPage)}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredInquiries.length / itemsPerPage)}
          >
            다음
          </Button>
        </div>
      )}

      {/* Create/Edit Modal */}
      <Dialog
        open={isCreateModalOpen || isEditMode}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateModalOpen(false);
            setIsEditMode(false);
            setSelectedInquiry(null);
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "문의사항 수정" : "문의하기"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">제목</label>
              <Input
                placeholder="문의 제목을 입력하세요"
                value={isEditMode ? selectedInquiry?.title : newInquiry.title}
                onChange={(e) =>
                  isEditMode
                    ? setSelectedInquiry({ ...selectedInquiry!, title: e.target.value })
                    : setNewInquiry({ ...newInquiry, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">카테고리</label>
              <Select
                value={isEditMode ? selectedInquiry?.category : newInquiry.category}
                onValueChange={(value) =>
                  isEditMode
                    ? setSelectedInquiry({
                        ...selectedInquiry!,
                        category: value as Inquiry["category"],
                      })
                    : setNewInquiry({ ...newInquiry, category: value as Inquiry["category"] })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="설비 문의">설비 문의</SelectItem>
                  <SelectItem value="재고 문의">재고 문의</SelectItem>
                  <SelectItem value="운영 건의">운영 건의</SelectItem>
                  <SelectItem value="인사 문의">인사 문의</SelectItem>
                  <SelectItem value="기타">기타</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">긴급도</label>
              <Select
                value={isEditMode ? selectedInquiry?.priority : newInquiry.priority}
                onValueChange={(value) =>
                  isEditMode
                    ? setSelectedInquiry({
                        ...selectedInquiry!,
                        priority: value as Inquiry["priority"],
                      })
                    : setNewInquiry({ ...newInquiry, priority: value as Inquiry["priority"] })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="일반">일반</SelectItem>
                  <SelectItem value="긴급">긴급</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">내용</label>
              <Textarea
                placeholder="문의 내용을 입력하세요"
                rows={10}
                value={isEditMode ? selectedInquiry?.content : newInquiry.content}
                onChange={(e) =>
                  isEditMode
                    ? setSelectedInquiry({ ...selectedInquiry!, content: e.target.value })
                    : setNewInquiry({ ...newInquiry, content: e.target.value })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateModalOpen(false);
                setIsEditMode(false);
                setSelectedInquiry(null);
              }}
            >
              취소
            </Button>
            <Button onClick={isEditMode ? handleEditInquiry : handleCreateInquiry}>
              {isEditMode ? "수정" : "등록"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail Modal */}
      <Dialog
        open={selectedInquiry !== null && !isEditMode}
        onOpenChange={() => setSelectedInquiry(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                {selectedInquiry?.priority === "긴급" && (
                  <Badge className="bg-red-100 text-red-800">긴급</Badge>
                )}
                <Badge className={getCategoryColor(selectedInquiry?.category || "")}>
                  {selectedInquiry?.category}
                </Badge>
                <Badge className={getStatusColor(selectedInquiry?.status || "")}>
                  {selectedInquiry?.status}
                </Badge>
              </div>
              <DialogTitle className="text-2xl">{selectedInquiry?.title}</DialogTitle>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {selectedInquiry?.createdAt}
                </span>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Original Inquiry */}
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="whitespace-pre-wrap text-gray-700">{selectedInquiry?.content}</p>
            </div>

            {/* Replies */}
            {selectedInquiry && selectedInquiry.replies.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg">답변 ({selectedInquiry.replies.length})</h3>
                {selectedInquiry.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className={`rounded-lg p-4 ${
                      reply.authorRole === "본사관리자"
                        ? "bg-blue-50 border-l-4 border-blue-500"
                        : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">
                        {reply.author} ({reply.authorRole})
                      </span>
                      <span className="text-xs text-gray-500">{reply.createdAt}</span>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Reply Input - 지점 직원도 댓글 달 수 있음 */}
            <div className="space-y-3 pt-4 border-t">
              <h3 className="font-bold text-lg">답변 작성</h3>
              <Textarea
                placeholder="추가 문의나 답변을 입력하세요..."
                rows={5}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedInquiry(null)}>
                  닫기
                </Button>
                <Button onClick={handleSendReply} disabled={!replyContent.trim()}>
                  <Send className="w-4 h-4 mr-2" />
                  답변 전송
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}