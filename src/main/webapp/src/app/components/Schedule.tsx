import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Plus, X, AlertCircle, Filter } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from "date-fns";
import { ko } from "date-fns/locale";
import { useAuth } from "../contexts/AuthContext";

interface Employee {
  id: string;
  name: string;
  branch: string;
  position: string;
}

interface ScheduleEvent {
  id: string;
  employeeId: string;
  employeeName: string;
  type: "근무" | "휴가" | "교육" | "회의" | "출장";
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  breakTime?: string;
  role?: string;
  notes?: string;
}

const SCHEDULE_COLORS = {
  근무: "bg-blue-500",
  휴가: "bg-green-500",
  교육: "bg-purple-500",
  회의: "bg-orange-500",
  출장: "bg-red-500",
};

// 지점 직원만 (예: 강남점)
const branchEmployees: Employee[] = [
  { id: "1", name: "김지점장", branch: "강남점", position: "지점장" },
  { id: "2", name: "이매니저", branch: "강남점", position: "매니저" },
  { id: "3", name: "박직원", branch: "강남점", position: "직원" },
  { id: "4", name: "최알바", branch: "강남점", position: "아르바이트" },
];

const initialEvents: ScheduleEvent[] = [
  {
    id: "1",
    employeeId: "1",
    employeeName: "김지점장",
    type: "근무",
    title: "오픈 근무",
    date: new Date(2024, 3, 1),
    startTime: "08:00",
    endTime: "17:00",
    breakTime: "1시간",
    role: "매장 관리",
  },
  {
    id: "2",
    employeeId: "2",
    employeeName: "이매니저",
    type: "근무",
    title: "미들 근무",
    date: new Date(2024, 3, 1),
    startTime: "14:00",
    endTime: "22:00",
    breakTime: "1시간",
    role: "카운터",
  },
];

export function Schedule() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<ScheduleEvent[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [employeeFilter, setEmployeeFilter] = useState("전체");
  const [typeFilter, setTypeFilter] = useState("전체");
  const [selectedPosition, setSelectedPosition] = useState<string>("");

  const userBranch = user?.branch || "강남점"; // 현재 사용자의 지점

  const types = ["전체", "근무", "휴가", "교육", "회의", "출장"];

  // 해당 지점 직원만 필터링
  const filteredEvents = events.filter((event) => {
    if (employeeFilter !== "전체" && event.employeeId !== employeeFilter) return false;
    if (typeFilter !== "전체" && event.type !== typeFilter) return false;
    return true;
  });

  const getEventsForDay = (day: Date) => {
    return filteredEvents.filter((event) => isSameDay(event.date, day));
  };

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDeleteEvent = () => {
    if (selectedEvent && confirm("이 일정을 삭제하시겠습니까?")) {
      setEvents(events.filter((e) => e.id !== selectedEvent.id));
      setShowEventModal(false);
      setSelectedEvent(null);
    }
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">직원 일정 관리</h2>
          <p className="text-gray-500 mt-1">{userBranch} 직원 일정을 관리합니다</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#00853D] text-white px-4 py-2.5 rounded-lg hover:bg-[#006B2F] transition-colors"
        >
          <Plus className="w-5 h-5" />
          일정 추가
        </button>
      </div>

      {/* Branch Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-medium">지점 전용 일정 관리</p>
          <p className="mt-1">{userBranch}에 소속된 직원의 일정만 조회 및 관리할 수 있습니다.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">필터</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">직원</label>
              <select
                value={employeeFilter}
                onChange={(e) => setEmployeeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
              >
                <option value="전체">전체</option>
                {branchEmployees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.position})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">근무 유형</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-900">
              {format(currentDate, "yyyy년 MM월", { locale: ko })}
            </h2>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={handleToday}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              오늘
            </button>
          </div>
        </div>

        {/* Calendar Legend */}
        <div className="flex items-center gap-6 mb-4 flex-wrap">
          {Object.entries(SCHEDULE_COLORS).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${color}`}></div>
              <span className="text-sm text-gray-600">{type}</span>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 bg-gray-50">
            {["일", "월", "화", "수", "목", "금", "토"].map((day, idx) => (
              <div
                key={day}
                className={`p-3 text-center text-sm font-medium ${
                  idx === 0 ? "text-red-600" : idx === 6 ? "text-blue-600" : "text-gray-700"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, idx) => {
              const dayEvents = getEventsForDay(day);
              const isToday = isSameDay(day, new Date());
              const isCurrentMonth = isSameMonth(day, currentDate);

              return (
                <div
                  key={idx}
                  className={`min-h-[120px] p-2 border-t border-r border-gray-200 ${
                    !isCurrentMonth ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <div
                    className={`text-sm font-medium mb-2 ${
                      isToday
                        ? "bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center"
                        : !isCurrentMonth
                        ? "text-gray-400"
                        : idx % 7 === 0
                        ? "text-red-600"
                        : idx % 7 === 6
                        ? "text-blue-600"
                        : "text-gray-900"
                    }`}
                  >
                    {format(day, "d")}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowEventModal(true);
                        }}
                        className={`${SCHEDULE_COLORS[event.type]} text-white text-xs p-1.5 rounded cursor-pointer hover:opacity-80 transition-opacity`}
                      >
                        <div className="font-medium truncate">{event.employeeName}</div>
                        <div className="truncate">{event.title}</div>
                        <div className="text-[10px]">
                          {event.startTime}-{event.endTime}
                        </div>
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-gray-600 text-center">
                        +{dayEvents.length - 3} 더보기
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">일정 상세</h3>
              <button
                onClick={() => {
                  setShowEventModal(false);
                  setSelectedEvent(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">직원</label>
                <p className="text-gray-900">{selectedEvent.employeeName}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">일정 유형</label>
                <span
                  className={`inline-flex px-3 py-1 text-sm rounded-full ${
                    SCHEDULE_COLORS[selectedEvent.type]
                  } text-white`}
                >
                  {selectedEvent.type}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">제목</label>
                <p className="text-gray-900">{selectedEvent.title}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">날짜</label>
                <p className="text-gray-900">
                  {format(selectedEvent.date, "yyyy년 MM월 dd일 (E)", { locale: ko })}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">시간</label>
                <p className="text-gray-900">
                  {selectedEvent.startTime} - {selectedEvent.endTime}
                </p>
              </div>

              {selectedEvent.breakTime && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">휴게 시간</label>
                  <p className="text-gray-900">{selectedEvent.breakTime}</p>
                </div>
              )}

              {selectedEvent.role && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">근무 역할</label>
                  <p className="text-gray-900">{selectedEvent.role}</p>
                </div>
              )}

              {selectedEvent.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">메모</label>
                  <p className="text-gray-900">{selectedEvent.notes}</p>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={handleDeleteEvent}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
              >
                삭제
              </button>
              <button
                onClick={() => setShowEventModal(false)}
                className="px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F]"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">일정 추가</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* 필수 항목 */}
              <div className="border-b border-gray-200 pb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">필수 정보</h4>
                
                <div className="space-y-4">
                  {/* 직원 선택 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      직원 선택 <span className="text-red-500">*</span>
                    </label>
                    {/* 직급 선택 */}
                    <select 
                      value={selectedPosition}
                      onChange={(e) => setSelectedPosition(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent mb-3"
                    >
                      <option value="">직급을 먼저 선택하세요</option>
                      <option value="지점장">지점장</option>
                      <option value="매니저">매니저</option>
                      <option value="직원">직원</option>
                      <option value="아르바이트">아르바이트</option>
                    </select>
                    
                    {/* 직급별 직원 체크박스 */}
                    {selectedPosition && (
                      <div className="border border-gray-300 rounded-lg p-3 max-h-48 overflow-y-auto">
                        <div className="space-y-2">
                          {branchEmployees
                            .filter((emp) => emp.position === selectedPosition)
                            .map((emp) => (
                              <label
                                key={emp.id}
                                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  value={emp.id}
                                  className="w-4 h-4 text-[#00853D] border-gray-300 rounded focus:ring-[#00853D]"
                                />
                                <span className="text-sm font-medium text-gray-900">{emp.name}</span>
                              </label>
                            ))}
                          {branchEmployees.filter((emp) => emp.position === selectedPosition).length === 0 && (
                            <p className="text-sm text-gray-500 text-center py-4">
                              해당 직급의 직원이 없습니다
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedPosition ? "여러 직원을 선택하여 일괄 등록할 수 있습니다" : "직급을 선택하면 해당 직급의 직원이 표시됩니다"}
                    </p>
                  </div>

                  {/* 매장 (고정) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">매장</label>
                    <input
                      type="text"
                      value={userBranch}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                    />
                  </div>

                  {/* 날짜 및 근무 유형 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        날짜 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        근무 유형 <span className="text-red-500">*</span>
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                        {Object.keys(SCHEDULE_COLORS).map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 근무 시간 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      근무 시간 <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">시작 시간</label>
                        <input
                          type="time"
                          defaultValue="09:00"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">종료 시간</label>
                        <input
                          type="time"
                          defaultValue="18:00"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 추가 옵션 */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-4">추가 옵션</h4>
                
                <div className="space-y-4">
                  {/* 반복 여부 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">반복 여부</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#00853D] cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="repeat"
                          value="none"
                          defaultChecked
                          className="w-4 h-4 text-[#00853D] focus:ring-[#00853D]"
                        />
                        <span className="text-sm text-gray-700">반복 없음</span>
                      </label>

                      <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#00853D] cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="repeat"
                          value="weekly"
                          className="w-4 h-4 text-[#00853D] focus:ring-[#00853D]"
                        />
                        <span className="text-sm text-gray-700">매주 반복</span>
                      </label>

                      <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#00853D] cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="repeat"
                          value="monthly"
                          className="w-4 h-4 text-[#00853D] focus:ring-[#00853D]"
                        />
                        <span className="text-sm text-gray-700">매월 반복</span>
                      </label>
                    </div>
                  </div>

                  {/* 휴게 시간 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">휴게 시간</label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-[#00853D] hover:bg-green-50 transition-colors text-sm"
                      >
                        30분
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 border-2 border-[#00853D] bg-green-50 rounded-lg text-sm font-medium text-[#00853D]"
                      >
                        1시간
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-[#00853D] hover:bg-green-50 transition-colors text-sm"
                      >
                        1.5시간
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="또는 직접 입력 (예: 45분)"
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm"
                    />
                  </div>

                  {/* 근무 역할 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">근무 역할</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                      <option value="">선택하세요</option>
                      <option value="매장 관리">매장 관리</option>
                      <option value="주방">주방</option>
                      <option value="홀 서빙">홀 서빙</option>
                      <option value="카운터">카운터</option>
                      <option value="배달">배달</option>
                      <option value="재고 관리">재고 관리</option>
                      <option value="청소">청소</option>
                    </select>
                  </div>

                  {/* 메모 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">메모</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent resize-none"
                      placeholder="추가 정보나 특이사항을 입력하세요..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                <span className="text-red-500">*</span> 필수 입력 항목
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    alert("일정이 추가되었습니다.");
                    setShowAddModal(false);
                  }}
                  className="px-5 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F] transition-colors"
                >
                  일정 추가
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}