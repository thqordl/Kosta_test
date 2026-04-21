import { useMemo } from "react";
import { 
  Users, 
  UserCheck,
  UserPlus,
  UserMinus,
  TrendingUp,
  Briefcase
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const stats = [
  {
    id: "st1",
    name: "전체 직원 수",
    value: "324명",
    change: "+12명 (전월 대비)",
    trend: "up",
    icon: Users,
    color: "blue",
  },
  {
    id: "st2",
    name: "재직 중",
    value: "318명",
    change: "98.1%",
    trend: "up",
    icon: UserCheck,
    color: "green",
  },
  {
    id: "st3",
    name: "신규 입사",
    value: "15명",
    change: "이번 달",
    trend: "up",
    icon: UserPlus,
    color: "purple",
  },
  {
    id: "st4",
    name: "퇴사",
    value: "3명",
    change: "이번 달",
    trend: "down",
    icon: UserMinus,
    color: "red",
  },
];

const branchEmployeeData = [
  { id: "be1", branch: "강남점", total: 18, manager: 2, staff: 12, partTime: 4 },
  { id: "be2", branch: "홍대점", total: 16, manager: 2, staff: 10, partTime: 4 },
  { id: "be3", branch: "잠실점", total: 15, manager: 2, staff: 9, partTime: 4 },
  { id: "be4", branch: "판교점", total: 14, manager: 2, staff: 9, partTime: 3 },
  { id: "be5", branch: "여의도점", total: 13, manager: 1, staff: 9, partTime: 3 },
  { id: "be6", branch: "본사", total: 45, manager: 8, staff: 35, partTime: 2 },
];

const roleDistributionData = [
  { id: "rd1", name: "본사관리자", value: 5, count: 8 },
  { id: "rd2", name: "지점장", value: 15, count: 24 },
  { id: "rd3", name: "지점매니저", value: 20, count: 32 },
  { id: "rd4", name: "직원", value: 45, count: 215 },
  { id: "rd5", name: "아르바이트생", value: 15, count: 45 },
];

const monthlyTrendData = [
  { id: "mt1", month: "1월", total: 305, hired: 8, resigned: 5 },
  { id: "mt2", month: "2월", total: 312, hired: 10, resigned: 3 },
  { id: "mt3", month: "3월", total: 324, hired: 15, resigned: 3 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"];

const recentActivities = [
  { 
    id: "ra1", 
    type: "입사", 
    employee: "김신입", 
    branch: "강남점", 
    role: "직원", 
    date: "2026-03-26",
    icon: UserPlus,
    color: "green"
  },
  { 
    id: "ra2", 
    type: "입사", 
    employee: "이직원", 
    branch: "홍대점", 
    role: "직원", 
    date: "2026-03-25",
    icon: UserPlus,
    color: "green"
  },
  { 
    id: "ra3", 
    type: "퇴사", 
    employee: "박퇴사", 
    branch: "잠실점", 
    role: "아르바이트생", 
    date: "2026-03-24",
    icon: UserMinus,
    color: "red"
  },
  { 
    id: "ra4", 
    type: "입사", 
    employee: "최매니저", 
    branch: "판교점", 
    role: "지점매니저", 
    date: "2026-03-23",
    icon: UserPlus,
    color: "green"
  },
  { 
    id: "ra5", 
    type: "입사", 
    employee: "정직원", 
    branch: "여의도점", 
    role: "직원", 
    date: "2026-03-22",
    icon: UserPlus,
    color: "green"
  },
];

const upcomingAnniversaries = [
  { id: "an1", name: "김베테랑", branch: "강남점", role: "지점장", years: 5, date: "2026-04-01" },
  { id: "an2", name: "이오래", branch: "본사", role: "본사관리자", years: 10, date: "2026-04-05" },
  { id: "an3", name: "박장기", branch: "홍대점", role: "직원", years: 3, date: "2026-04-08" },
  { id: "an4", name: "최근속", branch: "잠실점", role: "지점매니저", years: 2, date: "2026-04-12" },
];

export function HRDashboard() {
  const branchChartData = useMemo(() => branchEmployeeData, []);
  const roleChartData = useMemo(() => roleDistributionData, []);
  const trendChartData = useMemo(() => monthlyTrendData, []);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">인사 및 권한 관리 대시보드</h2>
        <p className="text-gray-500 mt-1">전사 인력 현황과 조직 구성을 확인하세요</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: "bg-blue-100 text-blue-600",
            green: "bg-green-100 text-green-600",
            purple: "bg-purple-100 text-purple-600",
            red: "bg-red-100 text-red-600",
          }[stat.color];

          return (
            <div key={stat.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-lg ${colorClasses} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.name}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branch employee distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">지점별 인원 구성</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={branchChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="branch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="manager" stackId="a" fill="#3b82f6" name="매니저" key="manager-bar" />
              <Bar dataKey="staff" stackId="a" fill="#10b981" name="직원" key="staff-bar" />
              <Bar dataKey="partTime" stackId="a" fill="#f59e0b" name="아르바이트" key="parttime-bar" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Role distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">직급별 분포</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} (${value}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {roleChartData.map((entry, index) => (
                  <Cell key={`cell-${entry.id}-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">월별 인력 변동 추이</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} name="총 인원" key="total-line" />
              <Line type="monotone" dataKey="hired" stroke="#10b981" strokeWidth={2} name="입사" key="hired-line" />
              <Line type="monotone" dataKey="resigned" stroke="#ef4444" strokeWidth={2} name="퇴사" key="resigned-line" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent activities */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 인사 이동</h3>
        <div className="space-y-3">
          {recentActivities.map((activity) => {
            const Icon = activity.icon;
            const colorClasses = activity.color === "green" 
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600";

            return (
              <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 rounded-lg ${colorClasses} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2">
                  <div>
                    <p className="text-xs text-gray-500">구분</p>
                    <p className="font-medium text-gray-900">{activity.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">이름</p>
                    <p className="font-medium text-gray-900">{activity.employee}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">소속</p>
                    <p className="font-medium text-gray-900">{activity.branch} · {activity.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">일자</p>
                    <p className="font-medium text-gray-900">{activity.date}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Branch employee details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">지점별 인원 상세</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">지점명</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">총 인원</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">매니저</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">직원</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">아르바이트</th>
              </tr>
            </thead>
            <tbody>
              {branchEmployeeData.map((branch) => (
                <tr key={branch.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{branch.branch}</td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">{branch.total}명</td>
                  <td className="py-3 px-4 text-right text-gray-600">{branch.manager}명</td>
                  <td className="py-3 px-4 text-right text-gray-600">{branch.staff}명</td>
                  <td className="py-3 px-4 text-right text-gray-600">{branch.partTime}명</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming anniversaries */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">다가오는 근속 기념일</h3>
        <div className="space-y-3">
          {upcomingAnniversaries.map((anniversary) => (
            <div key={anniversary.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{anniversary.name}</p>
                  <p className="text-sm text-gray-500">
                    {anniversary.branch} · {anniversary.role} · {anniversary.years}주년
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{anniversary.date}</p>
                <p className="text-xs text-gray-500">근속 {anniversary.years}년</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}