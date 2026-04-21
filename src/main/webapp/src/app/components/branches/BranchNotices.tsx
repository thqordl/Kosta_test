import { useState } from "react";
import { Plus, Send, FileText, Calendar } from "lucide-react";

export function BranchNotices() {
  const [showAddModal, setShowAddModal] = useState(false);

  const notices = [
    {
      id: 1,
      title: "신메뉴 출시 안내 - 봄 시즌 한정 메뉴",
      content: "3월 신메뉴가 출시됩니다. 직원 교육 및 레시피 숙지 부탁드립니다.",
      date: "2026-03-25",
      author: "본사",
      type: "중요",
      reads: 45,
    },
    {
      id: 2,
      title: "재고 관리 프로세스 변경 공지",
      content: "4월 1일부터 재고 관리 시스템이 변경됩니다.",
      date: "2026-03-22",
      author: "본사",
      type: "일반",
      reads: 38,
    },
    {
      id: 3,
      title: "영업시간 변경 가이드라인",
      content: "봄 시즌 성수기 대응을 위한 영업시간 조정 가이드입니다.",
      date: "2026-03-20",
      author: "본사",
      type: "가이드",
      reads: 42,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">운영 가이드 및 공지사항 배포</h2>
          <p className="text-gray-500 mt-1">전체 지점에 공지사항을 전달하세요</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          공지사항 작성
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <FileText className="w-8 h-8 text-blue-600 mb-2" />
          <p className="text-sm text-gray-600">총 공지사항</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">24</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <Send className="w-8 h-8 text-green-600 mb-2" />
          <p className="text-sm text-gray-600">이번 달 발송</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">8</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <Calendar className="w-8 h-8 text-purple-600 mb-2" />
          <p className="text-sm text-gray-600">평균 확인률</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">94%</p>
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {notices.map((notice) => (
          <div key={notice.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    notice.type === "중요"
                      ? "bg-red-100 text-red-700"
                      : notice.type === "가이드"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {notice.type}
                  </span>
                  <span className="text-xs text-gray-500">{notice.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{notice.title}</h3>
                <p className="text-gray-600 mb-3">{notice.content}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>작성: {notice.author}</span>
                  <span>•</span>
                  <span>확인: {notice.reads}개 지점</span>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                상세보기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
