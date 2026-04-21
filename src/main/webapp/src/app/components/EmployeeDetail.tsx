import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { ArrowLeft, Save, Phone, Mail, Calendar, Briefcase, MapPin, Edit, Trash2 } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  phone: string;
  email: string;
  position: string;
  joinDate: string;
  branch: string;
  status: "재직" | "휴직" | "퇴사";
  department: string;
}

const mockEmployee: Employee = {
  id: "1",
  name: "김철수",
  phone: "010-1234-5678",
  email: "kim@zeroloss.com",
  position: "직원",
  joinDate: "2024-01-15",
  branch: "강남지점",
  status: "재직",
  department: "영업팀",
};

export function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hasPermission } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [employee, setEmployee] = useState<Employee>(mockEmployee);
  const [formData, setFormData] = useState<Employee>(mockEmployee);

  const canEdit = hasPermission("hr", "canEdit");
  const canDelete = hasPermission("hr", "canDelete");

  const handleSave = () => {
    setEmployee(formData);
    setIsEditing(false);
    // TODO: API call to save employee data
  };

  const handleDelete = () => {
    if (confirm("정말 이 직원을 삭제하시겠습니까?")) {
      // TODO: API call to delete employee
      navigate("/hr");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/hr")}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">직원 상세 정보</h2>
            <p className="text-gray-500 mt-1">직원 정보를 관리하세요</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isEditing && canEdit && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Edit className="w-4 h-4" />
              수정
            </button>
          )}
          {canDelete && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <Trash2 className="w-4 h-4" />
              삭제
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold mb-4">
              {employee.name.charAt(0)}
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{employee.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{employee.position}</p>
            <span
              className={`inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full text-sm ${
                employee.status === "재직"
                  ? "bg-green-100 text-green-700"
                  : employee.status === "휴직"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {employee.status}
            </span>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{employee.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{employee.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{employee.branch}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">{employee.department}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">입사일: {employee.joinDate}</span>
            </div>
          </div>
        </div>

        {/* Details Form */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">상세 정보</h3>
          
          {isEditing ? (
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이름
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    연락처
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이메일
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    직급
                  </label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="직원">직원</option>
                    <option value="아르바이트">아르바이트</option>
                    <option value="지점매니저">지점매니저</option>
                    <option value="지점장">지점장</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    입사일
                  </label>
                  <input
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    부서
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    지점
                  </label>
                  <input
                    type="text"
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    상태
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "재직" | "휴직" | "퇴사" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="재직">재직</option>
                    <option value="휴직">휴직</option>
                    <option value="퇴사">퇴사</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Save className="w-4 h-4" />
                  저장
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(employee);
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  취소
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">이름</p>
                <p className="text-gray-900 font-medium mt-1">{employee.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">연락처</p>
                <p className="text-gray-900 font-medium mt-1">{employee.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">이메일</p>
                <p className="text-gray-900 font-medium mt-1">{employee.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">직급</p>
                <p className="text-gray-900 font-medium mt-1">{employee.position}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">입사일</p>
                <p className="text-gray-900 font-medium mt-1">{employee.joinDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">부서</p>
                <p className="text-gray-900 font-medium mt-1">{employee.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">지점</p>
                <p className="text-gray-900 font-medium mt-1">{employee.branch}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">상태</p>
                <p className="text-gray-900 font-medium mt-1">{employee.status}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
