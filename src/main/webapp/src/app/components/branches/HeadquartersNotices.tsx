import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  Bell,
  Pin,
  Calendar,
  User,
  Eye,
  ChevronLeft,
  ChevronRight,
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

interface Notice {
  id: string;
  title: string;
  content: string;
  type: "긴급 공지" | "일반 공지" | "위생 가이드" | "운영 지침";
  author: string;
  createdAt: string;
  isPinned: boolean;
  views: number;
  targetBranches: string[];
}

export function HeadquartersNotices() {
  const { user } = useAuth();
  const isHeadquarterAdmin = user?.role === "본사관리자";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("전체");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [newNotice, setNewNotice] = useState({
    title: "",
    content: "",
    type: "일반 공지" as Notice["type"],
    isPinned: false,
    targetBranches: ["전체"],
  });

  const mockNotices: Notice[] = [
    {
      id: "N001",
      title: "[긴급] 식품 안전 관리 강화 안내",
      content:
        "최근 식품 안전 관리 점검 결과, 일부 지점에서 유통기한 관리가 미흡한 사례가 발견되었습니다. 모든 지점은 즉시 재고 점검을 실시하고, 유통기한이 임박한 제품은 즉시 폐기 처리 바랍니다.\n\n특히 다음 사항을 준수해주시기 바랍니다:\n1. 매일 오전 재고 점검 실시\n2. 유통기한 7일 이내 제품 별도 관리\n3. 폐기 처리 시 시스템 즉시 입력\n\n문의사항은 본사 품질관리팀으로 연락 바랍니다.",
      type: "긴급 공지",
      author: "본사 품질관리팀",
      createdAt: "2026-03-29 09:00",
      isPinned: true,
      views: 145,
      targetBranches: ["전체"],
    },
    {
      id: "N002",
      title: "4월 신메뉴 출시 안내 및 레시피 교육 일정",
      content:
        "4월 1일부터 신메뉴 3종이 출시됩니다. 각 지점은 레시피 교육을 필수로 이수해주시기 바랍니다.\n\n신메뉴:\n- 프리미엄 불고기버거\n- 매콤 치즈 치킨버거\n- 시그니처 샐러드\n\n교육 일정은 별도 공지 예정입니다.",
      type: "운영 지침",
      author: "본사 메뉴개발팀",
      createdAt: "2026-03-28 14:30",
      isPinned: true,
      views: 98,
      targetBranches: ["전체"],
    },
    {
      id: "N003",
      title: "주방 위생 관리 체크리스트 업데이트",
      content:
        "주방 위생 관리 체크리스트가 업데이트되었습니다. 새로운 체크리스트는 시스템에서 다운로드 가능합니다.\n\n주요 변경사항:\n- 조리 기구 소독 주기 변경 (4시간 → 3시간)\n- 냉장고/냉동고 온도 체크 주기 강화\n- 바닥 청소 시간 추가",
      type: "위생 가이드",
      author: "본사 위생관리팀",
      createdAt: "2026-03-27 10:15",
      isPinned: false,
      views: 76,
      targetBranches: ["전체"],
    },
    {
      id: "N004",
      title: "2026년 1분기 우수 지점 선정 결과",
      content:
        "2026년 1분기 우수 지점 선정 결과를 안내드립니다.\n\n최우수 지점: 강남본점\n우수 지점: 홍대점, 부산해운대점\n\n수상 지점에는 포상금이 지급되며, 우수 사례는 전 지점에 공유될 예정입니다.",
      type: "일반 공지",
      author: "본사 경영지원팀",
      createdAt: "2026-03-26 16:00",
      isPinned: false,
      views: 112,
      targetBranches: ["전체"],
    },
    {
      id: "N005",
      title: "손 씻기 및 개인위생 관리 강화",
      content:
        "모든 직원은 다음 위생 수칙을 철저히 준수해주시기 바랍니다:\n\n1. 출근 시 손 씻기 필수\n2. 조리 전/후 손 소독\n3. 장갑 착용 의무화\n4. 두발 및 복장 규정 준수\n\n위반 시 경고 조치됩니다.",
      type: "위생 가이드",
      author: "본사 위생관리팀",
      createdAt: "2026-03-25 11:20",
      isPinned: false,
      views: 89,
      targetBranches: ["전체"],
    },
  ];

  const noticeTypes = ["전체", "긴급 공지", "일반 공지", "위생 가이드", "운영 지침"];

  const filteredNotices = mockNotices
    .filter((notice) => {
      const matchesSearch =
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === "전체" || notice.type === selectedType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "긴급 공지":
        return "bg-red-100 text-red-800";
      case "위생 가이드":
        return "bg-blue-100 text-blue-800";
      case "운영 지침":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateNotice = () => {
    console.log("Creating notice:", newNotice);
    setIsCreateModalOpen(false);
    setNewNotice({
      title: "",
      content: "",
      type: "일반 공지",
      isPinned: false,
      targetBranches: ["전체"],
    });
  };

  const handleEditNotice = () => {
    console.log("Editing notice:", selectedNotice);
    setIsEditMode(false);
    setSelectedNotice(null);
  };

  const handleDeleteNotice = (noticeId: string) => {
    if (window.confirm("이 공지사항을 삭제하시겠습니까?")) {
      console.log("Deleting notice:", noticeId);
    }
  };

  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  const currentNotices = filteredNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isHeadquarterAdmin ? "공지사항 관리" : "공지사항"}
          </h1>
          <p className="text-gray-500 mt-2">
            {isHeadquarterAdmin
              ? "전체 지점에 공지사항을 작성하고 관리할 수 있습니다."
              : "본사에서 등록한 공지사항을 확인하세요."}
          </p>
        </div>
        {isHeadquarterAdmin && (
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            공지사항 작성
          </Button>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card className="px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bell className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{mockNotices.length}건</p>
              <p className="text-xs text-gray-500">전체 공지</p>
            </div>
          </div>
        </Card>

        <Card className="px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-red-600">
                {mockNotices.filter((n) => n.type === "긴급 공지").length}건
              </p>
              <p className="text-xs text-gray-500">긴급 공지</p>
            </div>
          </div>
        </Card>

        <Card className="px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Pin className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-purple-600">
                {mockNotices.filter((n) => n.isPinned).length}건
              </p>
              <p className="text-xs text-gray-500">고정 공지</p>
            </div>
          </div>
        </Card>

        <Card className="px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-green-600">
                {Math.round(
                  mockNotices.reduce((sum, n) => sum + n.views, 0) / mockNotices.length
                )}
                회
              </p>
              <p className="text-xs text-gray-500">평균 조회수</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-6">
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
          <div className="flex gap-2 flex-wrap">
            {noticeTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Notices List */}
      <div className="space-y-3">
        {currentNotices.map((notice) => (
          <Card
            key={notice.id}
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedNotice(notice)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {notice.isPinned && (
                    <Pin className="w-4 h-4 text-purple-600 fill-purple-600" />
                  )}
                  <Badge className={getTypeColor(notice.type)}>{notice.type}</Badge>
                  <h3 className="font-bold text-lg text-gray-900">{notice.title}</h3>
                </div>

                <p className="text-gray-600 line-clamp-2">{notice.content}</p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {notice.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {notice.createdAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    조회 {notice.views}회
                  </span>
                </div>
              </div>

              {isHeadquarterAdmin && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNotice(notice);
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
                      handleDeleteNotice(notice.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredNotices.length === 0 && (
        <Card className="p-12">
          <div className="text-center text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>검색 결과가 없습니다.</p>
          </div>
        </Card>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
          이전
        </Button>
        <div className="text-gray-500">
          {currentPage} / {totalPages}
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          다음
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Create/Edit Modal */}
      <Dialog
        open={isCreateModalOpen || isEditMode}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateModalOpen(false);
            setIsEditMode(false);
            setSelectedNotice(null);
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "공지사항 수정" : "공지사항 작성"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">제목</label>
              <Input
                placeholder="공지사항 제목을 입력하세요"
                value={isEditMode ? selectedNotice?.title : newNotice.title}
                onChange={(e) =>
                  isEditMode
                    ? setSelectedNotice({ ...selectedNotice!, title: e.target.value })
                    : setNewNotice({ ...newNotice, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">유형</label>
              <Select
                value={isEditMode ? selectedNotice?.type : newNotice.type}
                onValueChange={(value) =>
                  isEditMode
                    ? setSelectedNotice({
                        ...selectedNotice!,
                        type: value as Notice["type"],
                      })
                    : setNewNotice({ ...newNotice, type: value as Notice["type"] })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="일반 공지">일반 공지</SelectItem>
                  <SelectItem value="긴급 공지">긴급 공지</SelectItem>
                  <SelectItem value="위생 가이드">위생 가이드</SelectItem>
                  <SelectItem value="운영 지침">운영 지침</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">내용</label>
              <Textarea
                placeholder="공지사항 내용을 입력하세요"
                rows={10}
                value={isEditMode ? selectedNotice?.content : newNotice.content}
                onChange={(e) =>
                  isEditMode
                    ? setSelectedNotice({ ...selectedNotice!, content: e.target.value })
                    : setNewNotice({ ...newNotice, content: e.target.value })
                }
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPinned"
                checked={isEditMode ? selectedNotice?.isPinned : newNotice.isPinned}
                onChange={(e) =>
                  isEditMode
                    ? setSelectedNotice({
                        ...selectedNotice!,
                        isPinned: e.target.checked,
                      })
                    : setNewNotice({ ...newNotice, isPinned: e.target.checked })
                }
                className="w-4 h-4"
              />
              <label htmlFor="isPinned" className="text-sm text-gray-700">
                상단 고정
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateModalOpen(false);
                setIsEditMode(false);
                setSelectedNotice(null);
              }}
            >
              취소
            </Button>
            <Button onClick={isEditMode ? handleEditNotice : handleCreateNotice}>
              {isEditMode ? "수정" : "작성"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog
        open={selectedNotice !== null && !isEditMode}
        onOpenChange={() => setSelectedNotice(null)}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                {selectedNotice?.isPinned && (
                  <Pin className="w-4 h-4 text-purple-600 fill-purple-600" />
                )}
                <Badge className={getTypeColor(selectedNotice?.type || "")}>
                  {selectedNotice?.type}
                </Badge>
              </div>
              <DialogTitle className="text-2xl">{selectedNotice?.title}</DialogTitle>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {selectedNotice?.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {selectedNotice?.createdAt}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  조회 {selectedNotice?.views}회
                </span>
              </div>
            </div>
          </DialogHeader>

          <div className="mt-6">
            <div className="prose max-w-none">
              <p className="whitespace-pre-wrap text-gray-700">{selectedNotice?.content}</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedNotice(null)}>
              닫기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}