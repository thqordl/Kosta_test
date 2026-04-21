import { useState } from "react";
import { Search, Plus, Filter, X, Edit2, Trash2, Building, User, Shield, Calendar, History } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface Employee {
  id: string;
  name: string;
  branch: string; // 소속
  position: string; // 직급
  phone: string; // 연락처
  status: "재직" | "휴직" | "퇴사";
  email: string;
  role: string; // 역할 및 권한
  joinDate: string;
  employeeNumber: string;
  department: string;
  workHistory: Array<{
    period: string;
    position: string;
    branch: string;
  }>;
  schedule: {
    currentWeek: string;
    totalHours: number;
  };
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "김철수",
    branch: "본사",
    position: "부장",
    phone: "010-1234-5678",
    status: "재직",
    email: "kim@zeroloss.com",
    role: "본사관리자",
    joinDate: "2020-01-15",
    employeeNumber: "EMP-001",
    department: "관리팀",
    workHistory: [
      { period: "2023-01 ~ 현재", position: "부장", branch: "본사" },
      { period: "2020-01 ~ 2022-12", position: "과장", branch: "본사" },
    ],
    schedule: {
      currentWeek: "월~금 09:00-18:00",
      totalHours: 40,
    },
  },
  {
    id: "2",
    name: "이영희",
    branch: "강남점",
    position: "지점장",
    phone: "010-2345-6789",
    status: "재직",
    email: "lee@zeroloss.com",
    role: "지점장",
    joinDate: "2021-03-20",
    employeeNumber: "EMP-002",
    department: "영업팀",
    workHistory: [
      { period: "2023-01 ~ 현재", position: "지점장", branch: "강남점" },
      { period: "2021-03 ~ 2022-12", position: "매니저", branch: "강남점" },
    ],
    schedule: {
      currentWeek: "월~토 08:00-17:00",
      totalHours: 54,
    },
  },
  {
    id: "3",
    name: "박민수",
    branch: "신촌점",
    position: "매니저",
    phone: "010-3456-7890",
    status: "재직",
    email: "park@zeroloss.com",
    role: "지점매니저",
    joinDate: "2022-06-01",
    employeeNumber: "EMP-003",
    department: "영업팀",
    workHistory: [
      { period: "2023-06 ~ 현재", position: "매니저", branch: "신촌점" },
      { period: "2022-06 ~ 2023-05", position: "직원", branch: "신촌점" },
    ],
    schedule: {
      currentWeek: "월~금 10:00-19:00",
      totalHours: 45,
    },
  },
  {
    id: "4",
    name: "정수연",
    branch: "홍대점",
    position: "직원",
    phone: "010-4567-8901",
    status: "재직",
    email: "jung@zeroloss.com",
    role: "지점매니저",
    joinDate: "2023-01-10",
    employeeNumber: "EMP-004",
    department: "영업팀",
    workHistory: [
      { period: "2023-01 ~ 현재", position: "직원", branch: "홍대점" },
    ],
    schedule: {
      currentWeek: "월,수,금 09:00-18:00",
      totalHours: 27,
    },
  },
  {
    id: "5",
    name: "최동욱",
    branch: "본사",
    position: "과장",
    phone: "010-5678-9012",
    status: "휴직",
    email: "choi@zeroloss.com",
    role: "본사관리자",
    joinDate: "2019-08-15",
    employeeNumber: "EMP-005",
    department: "물류팀",
    workHistory: [
      { period: "2022-01 ~ 현재", position: "과장", branch: "본사" },
      { period: "2019-08 ~ 2021-12", position: "대리", branch: "본사" },
    ],
    schedule: {
      currentWeek: "휴직 중",
      totalHours: 0,
    },
  },
  {
    id: "6",
    name: "강지현",
    branch: "강남점",
    position: "아르바이트",
    phone: "010-6789-0123",
    status: "재직",
    email: "kang@zeroloss.com",
    role: "지점매니저",
    joinDate: "2024-02-01",
    employeeNumber: "EMP-006",
    department: "영업팀",
    workHistory: [
      { period: "2024-02 ~ 현재", position: "아르바이트", branch: "강남점" },
    ],
    schedule: {
      currentWeek: "주말 10:00-16:00",
      totalHours: 12,
    },
  },
];

export function HR() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [branchFilter, setBranchFilter] = useState("전체");
  const [statusFilter, setStatusFilter] = useState("전체");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // 지점 계정 여부 확인
  const isBranchUser = user?.role === "지점장" || user?.role === "지점매니저";
  const userBranch = user?.branch || "";

  // 지점 계정인 경우 해당 지점 직원만, 본사는 전체 조회
  const availableEmployees = isBranchUser 
    ? mockEmployees.filter(emp => emp.branch === userBranch)
    : mockEmployees;

  const branches = isBranchUser 
    ? ["전체", userBranch] 
    : ["전체", "본사", "강남점", "신촌점", "홍대점", "건대점", "이태원점"];
  const statuses = ["전체", "재직", "휴직", "퇴사"];

  const filteredEmployees = availableEmployees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.phone.includes(searchTerm) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = branchFilter === "전체" || emp.branch === branchFilter;
    const matchesStatus = statusFilter === "전체" || emp.status === statusFilter;
    return matchesSearch && matchesBranch && matchesStatus;
  });

  const totalEmployees = availableEmployees.filter((emp) => emp.status === "재직").length;
  const totalBranches = isBranchUser ? 1 : new Set(availableEmployees.map((emp) => emp.branch)).size;
  const newEmployeesThisMonth = availableEmployees.filter(
    (emp) => emp.joinDate.startsWith("2024-03")
  ).length;

  const handleViewDetail = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowDetailModal(true);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleDelete = (employee: Employee) => {
    if (confirm(`${employee.name} 직원을 정말 삭제하시겠습니까?`)) {
      // 삭제 로직 구현
      alert("직원이 삭제되었습니다.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">본사 및 지점별 직원 정보 통합 조회</h2>
          <p className="text-gray-500 mt-1">전체 직원 정보를 통합하여 관리하세요</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#00853D] text-white px-4 py-2.5 rounded-lg hover:bg-[#006B2F] transition-colors"
        >
          <Plus className="w-5 h-5" />
          신규 직원 등록
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">총 재직 인원</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalEmployees}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">전체 소속</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalBranches}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">이번 달 신규</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{newEmployeesThisMonth}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="이름, 연락처, 이메일로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">소속:</span>
              <div className="flex gap-2 overflow-x-auto">
                {branches.map((branch) => (
                  <button
                    key={branch}
                    onClick={() => setBranchFilter(branch)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors whitespace-nowrap ${
                      branchFilter === branch
                        ? "bg-[#00853D] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {branch}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">상태:</span>
              <div className="flex gap-2">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors whitespace-nowrap ${
                      statusFilter === status
                        ? "bg-[#00853D] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Employee List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  이름
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  소속
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  직급
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  연락처
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#00853D] flex items-center justify-center text-white font-semibold">
                        {employee.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.employeeNumber}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.branch}</div>
                    <div className="text-sm text-gray-500">{employee.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.phone}</div>
                    <div className="text-sm text-gray-500">{employee.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                        employee.status === "재직"
                          ? "bg-green-100 text-green-700"
                          : employee.status === "휴직"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetail(employee)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        상세보기
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => handleEdit(employee)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(employee)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">직원 상세 정보</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* 기본 정보 */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-gray-700" />
                  <h4 className="text-lg font-semibold text-gray-900">기본 정보</h4>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">이름</p>
                    <p className="font-medium text-gray-900">{selectedEmployee.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">사번</p>
                    <p className="font-medium text-gray-900">{selectedEmployee.employeeNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">소속</p>
                    <p className="font-medium text-gray-900">{selectedEmployee.branch}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">부서</p>
                    <p className="font-medium text-gray-900">{selectedEmployee.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">직급</p>
                    <p className="font-medium text-gray-900">{selectedEmployee.position}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">입사일</p>
                    <p className="font-medium text-gray-900">{selectedEmployee.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">연락처</p>
                    <p className="font-medium text-gray-900">{selectedEmployee.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">이메일</p>
                    <p className="font-medium text-gray-900">{selectedEmployee.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">상태</p>
                    <span
                      className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                        selectedEmployee.status === "재직"
                          ? "bg-green-100 text-green-700"
                          : selectedEmployee.status === "휴직"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {selectedEmployee.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* 역할 및 권한 */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-gray-700" />
                  <h4 className="text-lg font-semibold text-gray-900">역할 및 권한</h4>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">시스템 권한</p>
                      <p className="font-medium text-gray-900">{selectedEmployee.role}</p>
                    </div>
                    <span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg">
                      {selectedEmployee.role === "본사관리자" ? "전체 권한" : "지점 권한"}
                    </span>
                  </div>
                </div>
              </div>

              {/* 근무 이력 요약 */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <History className="w-5 h-5 text-gray-700" />
                  <h4 className="text-lg font-semibold text-gray-900">근무 이력 요약</h4>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  {selectedEmployee.workHistory.map((history, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#00853D] rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-900">{history.position}</p>
                        <p className="text-sm text-gray-600">
                          {history.branch} • {history.period}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 현재 스케줄 요약 */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-gray-700" />
                  <h4 className="text-lg font-semibold text-gray-900">현재 스케줄 요약</h4>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">이번 주 근무</p>
                      <p className="font-medium text-gray-900">{selectedEmployee.schedule.currentWeek}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">주간 근무 시간</p>
                      <p className="font-medium text-gray-900">{selectedEmployee.schedule.totalHours}시간</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                닫기
              </button>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  handleEdit(selectedEmployee);
                }}
                className="px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F]"
              >
                정보 수정
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">신규 직원 등록</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">사번</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                    placeholder="EMP-007"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">소속</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                    <option>본사</option>
                    <option>강남점</option>
                    <option>신촌점</option>
                    <option>홍대점</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">부서</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                    <option>관리팀</option>
                    <option>영업팀</option>
                    <option>물류팀</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">직급</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                    <option>아르바이트</option>
                    <option>직원</option>
                    <option>매니저</option>
                    <option>지점장</option>
                    <option>대리</option>
                    <option>과장</option>
                    <option>부장</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">역할</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                    <option>지점매니저</option>
                    <option>지점장</option>
                    <option>본사관리자</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                    placeholder="010-0000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                    placeholder="example@zeroloss.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">입사일</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                    <option>재직</option>
                    <option>휴직</option>
                    <option>퇴사</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={() => {
                  alert("직원이 등록되었습니다.");
                  setShowAddModal(false);
                }}
                className="px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F]"
              >
                등록
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {showEditModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">직원 정보 수정</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                  <input
                    type="text"
                    defaultValue={selectedEmployee.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">사번</label>
                  <input
                    type="text"
                    defaultValue={selectedEmployee.employeeNumber}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">소속</label>
                  <select
                    defaultValue={selectedEmployee.branch}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                  >
                    <option>본사</option>
                    <option>강남점</option>
                    <option>신촌점</option>
                    <option>홍대점</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">부서</label>
                  <select
                    defaultValue={selectedEmployee.department}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                  >
                    <option>관리팀</option>
                    <option>영업팀</option>
                    <option>물류팀</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">직급</label>
                  <select
                    defaultValue={selectedEmployee.position}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                  >
                    <option>아르바이트</option>
                    <option>직원</option>
                    <option>매니저</option>
                    <option>지점장</option>
                    <option>대리</option>
                    <option>과장</option>
                    <option>부장</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">역할</label>
                  <select
                    defaultValue={selectedEmployee.role}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                  >
                    <option>지점매니저</option>
                    <option>지점장</option>
                    <option>본사관리자</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                  <input
                    type="tel"
                    defaultValue={selectedEmployee.phone}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                  <input
                    type="email"
                    defaultValue={selectedEmployee.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">입사일</label>
                  <input
                    type="date"
                    defaultValue={selectedEmployee.joinDate}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                  <select
                    defaultValue={selectedEmployee.status}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                  >
                    <option>재직</option>
                    <option>휴직</option>
                    <option>퇴사</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={() => {
                  alert("직원 정보가 수정되었습니다.");
                  setShowEditModal(false);
                }}
                className="px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F]"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}