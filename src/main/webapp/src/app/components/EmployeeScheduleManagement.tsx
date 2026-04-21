import { useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  X,
  Clock,
  MapPin,
  FileText,
  AlertCircle,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks,
  addDays,
  subDays,
  getDay,
  startOfDay,
  endOfDay,
} from "date-fns";
import { ko } from "date-fns/locale";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type ViewMode = "month" | "week" | "day";

interface Employee {
  id: string;
  name: string;
  branch: string;
  position: string;
  color: string;
}

interface ScheduleEvent {
  id: string;
  employeeId: string;
  employeeName: string;
  branch: string;
  type: "근무" | "휴가" | "교육" | "회의" | "출장";
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  location?: string;
  notes?: string;
}

const mockEmployees: Employee[] = [
  { id: "1", name: "김관리자", branch: "본사", position: "부장", color: "bg-purple-600" },
  { id: "2", name: "이과장", branch: "본사", position: "과장", color: "bg-indigo-600" },
  { id: "3", name: "박대리", branch: "본사", position: "대리", color: "bg-blue-600" },
  { id: "11", name: "최차장", branch: "본사", position: "차장", color: "bg-violet-600" },
  { id: "12", name: "강직원", branch: "본사", position: "직원", color: "bg-slate-600" },
  { id: "4", name: "최지점장", branch: "강남점", position: "지점장", color: "bg-green-600" },
  { id: "5", name: "정매니저", branch: "강남점", position: "매니저", color: "bg-emerald-600" },
  { id: "6", name: "한직원", branch: "강남점", position: "직원", color: "bg-teal-600" },
  { id: "7", name: "송지점장", branch: "신촌점", position: "지점장", color: "bg-cyan-600" },
  { id: "8", name: "윤매니저", branch: "신촌점", position: "매니저", color: "bg-sky-600" },
  { id: "9", name: "강지점장", branch: "홍대점", position: "지점장", color: "bg-orange-600" },
  { id: "10", name: "조매니저", branch: "홍대점", position: "매니저", color: "bg-amber-600" },
];

const SCHEDULE_COLORS = {
  근무: "bg-blue-500",
  휴가: "bg-green-500",
  교육: "bg-purple-500",
  회의: "bg-orange-500",
  출장: "bg-red-500",
};

const initialEvents: ScheduleEvent[] = [
  {
    id: "1",
    employeeId: "1",
    employeeName: "김관리자",
    branch: "본사",
    type: "근무",
    title: "정규 근무",
    date: new Date(2024, 3, 1),
    startTime: "09:00",
    endTime: "18:00",
    location: "본사",
  },
  {
    id: "2",
    employeeId: "2",
    employeeName: "이과장",
    branch: "본사",
    type: "회의",
    title: "분기 회의",
    date: new Date(2024, 3, 1),
    startTime: "14:00",
    endTime: "16:00",
    location: "본사 회의실",
  },
  {
    id: "3",
    employeeId: "4",
    employeeName: "최지점장",
    branch: "강남점",
    type: "근무",
    title: "오픈 근무",
    date: new Date(2024, 3, 1),
    startTime: "08:00",
    endTime: "17:00",
    location: "강남점",
  },
  {
    id: "4",
    employeeId: "5",
    employeeName: "정매니저",
    branch: "강남점",
    type: "휴가",
    title: "연차",
    date: new Date(2024, 3, 2),
    startTime: "00:00",
    endTime: "23:59",
    location: "강남점",
    notes: "개인 사유",
  },
];

interface DraggableEventProps {
  event: ScheduleEvent;
  employee: Employee | undefined;
  onClick: () => void;
  onHoverChange: (hovering: boolean) => void;
}

function DraggableEvent({ event, employee, onClick, onHoverChange }: DraggableEventProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "SCHEDULE_EVENT",
    item: { event },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      className={`${SCHEDULE_COLORS[event.type]} text-white text-xs p-1.5 rounded cursor-move hover:opacity-90 transition-opacity ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center gap-1">
        <div
          className={`w-4 h-4 ${employee?.color} rounded-full flex items-center justify-center text-[9px] font-semibold`}
        >
          {event.employeeName.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">{event.employeeName}</div>
          <div className="truncate">{event.title}</div>
          <div className="text-[10px]">
            {event.startTime}-{event.endTime}
          </div>
        </div>
      </div>
    </div>
  );
}

interface DroppableDayProps {
  day: Date;
  children: React.ReactNode;
  onDrop: (event: ScheduleEvent, newDate: Date) => void;
  isCurrentMonth?: boolean;
  isToday?: boolean;
  dayIndex?: number;
}

function DroppableDay({
  day,
  children,
  onDrop,
  isCurrentMonth = true,
  isToday = false,
  dayIndex = 0,
}: DroppableDayProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "SCHEDULE_EVENT",
    drop: (item: { event: ScheduleEvent }) => {
      onDrop(item.event, day);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`min-h-[120px] p-2 border-t border-r border-gray-200 transition-colors ${
        !isCurrentMonth ? "bg-gray-50" : "bg-white"
      } ${isOver ? "bg-blue-50 border-blue-300" : ""}`}
    >
      <div
        className={`text-sm font-medium mb-2 ${
          isToday
            ? "bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center"
            : !isCurrentMonth
            ? "text-gray-400"
            : dayIndex % 7 === 0
            ? "text-red-600"
            : dayIndex % 7 === 6
            ? "text-blue-600"
            : "text-gray-900"
        }`}
      >
        {format(day, "d")}
      </div>
      {children}
    </div>
  );
}

export function EmployeeScheduleManagement() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [events, setEvents] = useState<ScheduleEvent[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<ScheduleEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string>("");

  // Filters
  const [branchFilter, setBranchFilter] = useState("전체");
  const [employeeFilter, setEmployeeFilter] = useState("전체");
  const [typeFilter, setTypeFilter] = useState("전체");

  // Check if user is admin
  if (user?.role !== "본사관리자") {
    return <Navigate to="/" replace />;
  }

  const branches = ["전체", "본사", "강남점", "신촌점", "홍대점", "건대점"];
  const types = ["전체", "근무", "휴가", "교육", "회의", "출장"];

  const filteredEmployees = mockEmployees.filter((emp) => {
    if (branchFilter !== "전체" && emp.branch !== branchFilter) return false;
    if (employeeFilter !== "전체" && emp.id !== employeeFilter) return false;
    return true;
  });

  const filteredEvents = events.filter((event) => {
    if (branchFilter !== "전체" && event.branch !== branchFilter) return false;
    if (employeeFilter !== "전체" && event.employeeId !== employeeFilter) return false;
    if (typeFilter !== "전체" && event.type !== typeFilter) return false;
    return true;
  });

  const getEventsForDay = (day: Date) => {
    return filteredEvents.filter((event) => isSameDay(event.date, day));
  };

  const getEmployeeById = (employeeId: string) => {
    return mockEmployees.find((e) => e.id === employeeId);
  };

  const handlePrevious = () => {
    if (viewMode === "month") setCurrentDate(subMonths(currentDate, 1));
    else if (viewMode === "week") setCurrentDate(subWeeks(currentDate, 1));
    else setCurrentDate(subDays(currentDate, 1));
  };

  const handleNext = () => {
    if (viewMode === "month") setCurrentDate(addMonths(currentDate, 1));
    else if (viewMode === "week") setCurrentDate(addWeeks(currentDate, 1));
    else setCurrentDate(addDays(currentDate, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleEventDrop = (event: ScheduleEvent, newDate: Date) => {
    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === event.id ? { ...e, date: newDate } : e
      )
    );
  };

  const handleDeleteEvent = () => {
    if (selectedEvent && confirm("이 일정을 삭제하시겠습니까?")) {
      setEvents(events.filter((e) => e.id !== selectedEvent.id));
      setShowEventModal(false);
      setSelectedEvent(null);
    }
  };

  // Get calendar days based on view mode
  const getCalendarDays = () => {
    if (viewMode === "month") {
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(currentDate);
      const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
      const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
      return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
    } else if (viewMode === "week") {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
      const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
      return eachDayOfInterval({ start: weekStart, end: weekEnd });
    } else {
      return [currentDate];
    }
  };

  const calendarDays = getCalendarDays();

  const getViewTitle = () => {
    if (viewMode === "month") {
      return format(currentDate, "yyyy년 MM월", { locale: ko });
    } else if (viewMode === "week") {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
      const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
      return `${format(weekStart, "MM월 dd일", { locale: ko })} - ${format(
        weekEnd,
        "MM월 dd일",
        { locale: ko }
      )}`;
    } else {
      return format(currentDate, "yyyy년 MM월 dd일 (E)", { locale: ko });
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">직원 일정 관리</h2>
            <p className="text-gray-500 mt-1">
              모든 매장 및 본사 직원의 일정을 통합 관리합니다
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#00853D] text-white px-4 py-2.5 rounded-lg hover:bg-[#006B2F] transition-colors"
          >
            <Plus className="w-5 h-5" />
            일정 추가
          </button>
        </div>

        {/* Admin Only Notice */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-purple-800">
            <p className="font-medium">본사관리자 전용 기능</p>
            <p className="mt-1">
              모든 매장 및 본사의 직원 일정을 조회하고 관리할 수 있습니다.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">총 일정</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {filteredEvents.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">근무 일정</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {filteredEvents.filter((e) => e.type === "근무").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">회의/교육</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {
                    filteredEvents.filter(
                      (e) => e.type === "회의" || e.type === "교육"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">휴가/출장</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {
                    filteredEvents.filter(
                      (e) => e.type === "휴가" || e.type === "출장"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">필터</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  매장
                </label>
                <select
                  value={branchFilter}
                  onChange={(e) => setBranchFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                >
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  직원
                </label>
                <select
                  value={employeeFilter}
                  onChange={(e) => setEmployeeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                >
                  <option value="전체">전체</option>
                  {filteredEmployees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.branch})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  근무 유형
                </label>
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
                onClick={handlePrevious}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-gray-900">{getViewTitle()}</h2>
              <button
                onClick={handleNext}
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

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("month")}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  viewMode === "month"
                    ? "bg-[#00853D] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                월
              </button>
              <button
                onClick={() => setViewMode("week")}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  viewMode === "week"
                    ? "bg-[#00853D] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                주
              </button>
              <button
                onClick={() => setViewMode("day")}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  viewMode === "day"
                    ? "bg-[#00853D] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                일
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
            <div className={`grid ${viewMode === "day" ? "grid-cols-1" : "grid-cols-7"} bg-gray-50`}>
              {viewMode === "day" ? (
                <div className="p-3 text-center text-sm font-medium text-gray-700">
                  {format(currentDate, "EEEE", { locale: ko })}
                </div>
              ) : (
                ["일", "월", "화", "수", "목", "금", "토"].map((day, idx) => (
                  <div
                    key={day}
                    className={`p-3 text-center text-sm font-medium ${
                      idx === 0
                        ? "text-red-600"
                        : idx === 6
                        ? "text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    {day}
                  </div>
                ))
              )}
            </div>

            {/* Calendar days */}
            <div className={`grid ${viewMode === "day" ? "grid-cols-1" : "grid-cols-7"}`}>
              {calendarDays.map((day, idx) => {
                const dayEvents = getEventsForDay(day);
                const isToday = isSameDay(day, new Date());
                const isCurrentMonth =
                  viewMode === "month" ? isSameMonth(day, currentDate) : true;

                return (
                  <DroppableDay
                    key={idx}
                    day={day}
                    onDrop={handleEventDrop}
                    isCurrentMonth={isCurrentMonth}
                    isToday={isToday}
                    dayIndex={idx}
                  >
                    <div className="space-y-1">
                      {dayEvents.slice(0, viewMode === "day" ? 20 : 3).map((event) => {
                        const employee = getEmployeeById(event.employeeId);
                        return (
                          <DraggableEvent
                            key={event.id}
                            event={event}
                            employee={employee}
                            onClick={() => {
                              setSelectedEvent(event);
                              setShowEventModal(true);
                            }}
                            onHoverChange={(hovering) => {
                              if (hovering) setHoveredEvent(event);
                              else setHoveredEvent(null);
                            }}
                          />
                        );
                      })}
                      {dayEvents.length > 3 && viewMode !== "day" && (
                        <div className="text-xs text-gray-600 text-center">
                          +{dayEvents.length - 3} 더보기
                        </div>
                      )}
                    </div>
                  </DroppableDay>
                );
              })}
            </div>
          </div>
        </div>

        {/* Hover Tooltip */}
        {hoveredEvent && (
          <div className="fixed pointer-events-none z-50 bg-gray-900 text-white p-3 rounded-lg shadow-lg max-w-xs">
            <div className="font-semibold">{hoveredEvent.employeeName}</div>
            <div className="text-sm">{hoveredEvent.title}</div>
            <div className="text-xs text-gray-300 mt-1">
              <div>소속: {hoveredEvent.branch}</div>
              <div>시간: {hoveredEvent.startTime} - {hoveredEvent.endTime}</div>
              {hoveredEvent.location && <div>장소: {hoveredEvent.location}</div>}
              {hoveredEvent.notes && <div>메모: {hoveredEvent.notes}</div>}
            </div>
          </div>
        )}

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
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    직원
                  </label>
                  <p className="text-gray-900">{selectedEvent.employeeName}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    소속
                  </label>
                  <p className="text-gray-900">{selectedEvent.branch}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    일정 유형
                  </label>
                  <span
                    className={`inline-flex px-3 py-1 text-sm rounded-full ${
                      SCHEDULE_COLORS[selectedEvent.type]
                    } text-white`}
                  >
                    {selectedEvent.type}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    제목
                  </label>
                  <p className="text-gray-900">{selectedEvent.title}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    날짜
                  </label>
                  <p className="text-gray-900">
                    {format(selectedEvent.date, "yyyy년 MM월 dd일 (E)", {
                      locale: ko,
                    })}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    시간
                  </label>
                  <p className="text-gray-900">
                    {selectedEvent.startTime} - {selectedEvent.endTime}
                  </p>
                </div>

                {selectedEvent.location && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      장소
                    </label>
                    <p className="text-gray-900">{selectedEvent.location}</p>
                  </div>
                )}

                {selectedEvent.notes && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      메모
                    </label>
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
                {/* 직원 및 매장 선택 */}
                <div className="grid grid-cols-2 gap-4">
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
                      <option value="부장">부장</option>
                      <option value="과장">과장</option>
                      <option value="차장">차장</option>
                      <option value="대리">대리</option>
                      <option value="지점장">지점장</option>
                      <option value="매니저">매니저</option>
                      <option value="직원">직원</option>
                    </select>
                    
                    {/* 직급별 직원 체크박스 */}
                    {selectedPosition && (
                      <div className="border border-gray-300 rounded-lg p-3 max-h-48 overflow-y-auto">
                        <div className="space-y-2">
                          {mockEmployees
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
                                <div className="flex items-center gap-2 flex-1">
                                  <div
                                    className={`w-6 h-6 ${emp.color} rounded-full flex items-center justify-center text-white text-xs font-semibold`}
                                  >
                                    {emp.name.charAt(0)}
                                  </div>
                                  <div className="text-sm">
                                    <span className="font-medium text-gray-900">{emp.name}</span>
                                    <span className="text-gray-500 ml-1">({emp.branch})</span>
                                  </div>
                                </div>
                              </label>
                            ))}
                          {mockEmployees.filter((emp) => emp.position === selectedPosition).length === 0 && (
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      매장 선택 <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                      <option value="">매장을 선택하세요</option>
                      <option value="본사">본사</option>
                      <option value="강남점">강남점</option>
                      <option value="신촌점">신촌점</option>
                      <option value="홍대점">홍대점</option>
                      <option value="건대점">건대점</option>
                      <option value="이태원점">이태원점</option>
                    </select>
                  </div>
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

                {/* 휴게 시간 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    휴게 시간
                  </label>
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

                {/* 반복 여부 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    반복 여부
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-[#00853D] cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="repeat"
                        value="none"
                        defaultChecked
                        className="w-4 h-4 text-[#00853D] focus:ring-[#00853D]"
                      />
                      <span className="text-sm text-gray-700">반복 없음</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-[#00853D] cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="repeat"
                        value="weekly"
                        className="w-4 h-4 text-[#00853D] focus:ring-[#00853D]"
                      />
                      <span className="text-sm text-gray-700">매주 반복</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-[#00853D] cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="repeat"
                        value="biweekly"
                        className="w-4 h-4 text-[#00853D] focus:ring-[#00853D]"
                      />
                      <span className="text-sm text-gray-700">격주 반복</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-[#00853D] cursor-pointer transition-colors">
                      <input
                        type="radio"
                        name="repeat"
                        value="monthly"
                        className="w-4 h-4 text-[#00853D] focus:ring-[#00853D]"
                      />
                      <span className="text-sm text-gray-700">매월 반복</span>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    * 반복 선택 시 이번 달 전체에 해당 일정이 자동으로 추가됩니다
                  </p>
                </div>

                {/* 근무 역할 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    근무 역할
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                    <option value="">선택하세요</option>
                    <option value="매장 관리">매장 관리</option>
                    <option value="주방">주방</option>
                    <option value="홀 서빙">홀 서빙</option>
                    <option value="카운터">카운터</option>
                    <option value="배달">배달</option>
                    <option value="재고 관리">재고 관리</option>
                    <option value="청소">청소</option>
                    <option value="교육 진행">교육 진행</option>
                  </select>
                </div>

                {/* 메모 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    메모
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent resize-none"
                    placeholder="추가 정보나 특이사항을 입력하세요..."
                  />
                </div>

                {/* 안내 메시지 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium">일정 추가 안내</p>
                    <ul className="mt-1 list-disc list-inside space-y-0.5 text-xs">
                      <li>필수 항목(*)은 반드시 입력해야 합니다</li>
                      <li>반복 일정 선택 시 해당 기간 동안 자동으로 생성됩니다</li>
                      <li>휴게 시간은 전체 근무 시간에서 제외됩니다</li>
                    </ul>
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
    </DndProvider>
  );
}