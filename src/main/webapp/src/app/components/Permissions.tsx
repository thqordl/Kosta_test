import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Shield, Search, Filter, Plus, Edit2, Trash2, X, Power, AlertCircle } from "lucide-react";
import { Navigate } from "react-router";

type Role = "본사관리자" | "지점장";

interface Account {
  id: string;
  name: string;
  username: string;
  branch: string; // 소속 매장
  role: Role; // 역할
  isActive: boolean; // 상태 (활성/비활성)
  createdDate: string;
  lastLogin?: string;
}

const mockAccounts: Account[] = [
  {
    id: "1",
    name: "김관리자",
    username: "admin",
    branch: "본사",
    role: "본사관리자",
    isActive: true,
    createdDate: "2020-01-15",
    lastLogin: "2024-03-31 09:00",
  },
  {
    id: "2",
    name: "이지점장",
    username: "gangnam_manager",
    branch: "강남점",
    role: "지점장",
    isActive: true,
    createdDate: "2021-03-20",
    lastLogin: "2024-03-31 08:30",
  },
  {
    id: "4",
    name: "최지점��",
    username: "hongdae_manager",
    branch: "홍대점",
    role: "지점장",
    isActive: false,
    createdDate: "2023-01-10",
    lastLogin: "2024-03-25 17:00",
  },
  {
    id: "5",
    name: "정매니저",
    username: "gangnam_staff",
    branch: "강남점",
    role: "지점매니저",
    isActive: true,
    createdDate: "2023-05-15",
    lastLogin: "2024-03-31 07:45",
  },
    name: "김지점장",
    username: "gundae_manager",
    branch: "건대점",
    role: "지점장",
    isActive: true,
    createdDate: "2022-09-01",
    lastLogin: "2024-03-31 08:15",
  },
];

export function Permissions() {
  const { canAccessModule, user } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [searchTerm, setSearchTerm] = useState("");
  const [branchFilter, setBranchFilter] = useState("전체");
  const [roleFilter, setRoleFilter] = useState("전체");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  // Check if user has admin permission
  if (user?.role !== "본사관리자") {
    return <Navigate to="/" replace />;
  }

  const branches = ["전체", "본사", "강남점", "신촌점", "홍대점", "건대점", "이태원점"];
  const roles: Array<"전체" | Role> = ["전체", "본사관리자", "지점장"];

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.branch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = branchFilter === "전체" || account.branch === branchFilter;
    const matchesRole = roleFilter === "전체" || account.role === roleFilter;
    return matchesSearch && matchesBranch && matchesRole;
  });

  const activeAccounts = accounts.filter((acc) => acc.isActive).length;
  const inactiveAccounts = accounts.filter((acc) => !acc.isActive).length;

  const handleToggleActive = (accountId: string) => {
    setAccounts(
      accounts.map((acc) =>
        acc.id === accountId ? { ...acc, isActive: !acc.isActive } : acc
      )
    );
  };

  const handleDelete = (account: Account) => {
    if (confirm(`${account.name} (${account.username}) 계정을 정말 삭제하시겠습니까?`)) {
      setAccounts(accounts.filter((acc) => acc.id !== account.id));
      alert("계정이 삭제되었습니다.");
    }
  };

  const handleEdit = (account: Account) => {
    setSelectedAccount(account);
    setShowEditModal(true);
  };

  const getRoleBadgeColor = (role: Role) => {
    switch (role) {
      case "본사관리자":
        return "bg-purple-100 text-purple-700";
      case "지점장":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">직영점 계정 발급/삭제 및 권한 부여</h2>
          <p className="text-gray-500 mt-1">직영점 계정을 통합 관리하고 권한을 설정하세요</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#00853D] text-white px-4 py-2.5 rounded-lg hover:bg-[#006B2F] transition-colors"
        >
          <Plus className="w-5 h-5" />
          계정 추가
        </button>
      </div>

      {/* Admin Only Notice */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-purple-800">
          <p className="font-medium">본사관리자 전용 기능</p>
          <p className="mt-1">이 페이지는 본사관리자 권한을 가진 사용자만 접근할 수 있습니다.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">전체 계정</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{accounts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Power className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">활성 계정</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{activeAccounts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Power className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">비활성 계정</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{inactiveAccounts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="이름, 아이디, 소속 매장으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">소속 매장:</span>
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
              <span className="text-sm font-medium text-gray-700">역할:</span>
              <div className="flex gap-2">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => setRoleFilter(role)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors whitespace-nowrap ${
                      roleFilter === role
                        ? "bg-[#00853D] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  이름
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  아이디
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  소속 매장
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  역할
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
              {filteredAccounts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              ) : (
                filteredAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#00853D] flex items-center justify-center text-white font-semibold">
                          {account.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{account.name}</div>
                          <div className="text-sm text-gray-500">
                            가입일: {account.createdDate}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{account.username}</div>
                      {account.lastLogin && (
                        <div className="text-xs text-gray-500">
                          최근 로그인: {account.lastLogin}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {account.branch}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(
                          account.role
                        )}`}
                      >
                        {account.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleActive(account.id)}
                        disabled={account.id === user?.id}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          account.isActive
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <Power className="w-3.5 h-3.5" />
                        {account.isActive ? "활성" : "비활성"}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(account)}
                          className="text-blue-600 hover:text-blue-700"
                          title="권한 변경"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(account)}
                          disabled={account.id === user?.id}
                          className="text-red-600 hover:text-red-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                          title="계정 삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Account Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">계정 추가</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                  placeholder="홍길동"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">아이디</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                  placeholder="user_id"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">소속 매장</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                  <option value="">선택하세요</option>
                  <option>본사</option>
                  <option>강남점</option>
                  <option>신촌점</option>
                  <option>홍대점</option>
                  <option>건대점</option>
                  <option>이태원점</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">역할</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                  <option value="">선택하세요</option>
                  <option>본사관리자</option>
                  <option>지점장</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  defaultChecked
                  className="w-4 h-4 text-[#00853D] border-gray-300 rounded focus:ring-[#00853D]"
                />
                <label htmlFor="isActive" className="text-sm text-gray-700">
                  계정 활성화
                </label>
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
                  alert("계정이 추가되었습니다.");
                  setShowAddModal(false);
                }}
                className="px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F]"
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Account Modal */}
      {showEditModal && selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">권한 변경</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#00853D] flex items-center justify-center text-white font-semibold">
                    {selectedAccount.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{selectedAccount.name}</div>
                    <div className="text-sm text-gray-500">{selectedAccount.username}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>소속: {selectedAccount.branch}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">역할 변경</label>
                <select
                  defaultValue={selectedAccount.role}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                >
                  <option>본사관리자</option>
                  <option>지점장</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">소속 매장</label>
                <select
                  defaultValue={selectedAccount.branch}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent"
                >
                  <option>본사</option>
                  <option>강남점</option>
                  <option>신촌점</option>
                  <option>홍대점</option>
                  <option>건대점</option>
                  <option>이태원점</option>
                </select>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800">
                  역할 변경 시 해당 계정의 접근 권한이 즉시 변경됩니다.
                </p>
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
                  alert("권한이 변경되었습니다.");
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
