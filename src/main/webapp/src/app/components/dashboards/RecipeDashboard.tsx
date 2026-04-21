import { useMemo } from "react";
import { 
  BookOpen, 
  TrendingUp,
  ChefHat,
  DollarSign,
  AlertCircle,
  CheckCircle2
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
    name: "총 레시피 수",
    value: "156개",
    change: "+8개 (이번 달)",
    trend: "up",
    icon: BookOpen,
    color: "blue",
  },
  {
    id: "st2",
    name: "활성 레시피",
    value: "142개",
    change: "91.0%",
    trend: "up",
    icon: CheckCircle2,
    color: "green",
  },
  {
    id: "st3",
    name: "평균 원가",
    value: "₩4,850",
    change: "+2.3%",
    trend: "up",
    icon: DollarSign,
    color: "orange",
  },
  {
    id: "st4",
    name: "원가 검토 필요",
    value: "12개",
    change: "수정 권장",
    trend: "warning",
    icon: AlertCircle,
    color: "yellow",
  },
];

const recipeCategoryData = [
  { id: "rc1", category: "메인 메뉴", count: 45, avgCost: 6500 },
  { id: "rc2", category: "사이드 메뉴", count: 32, avgCost: 3200 },
  { id: "rc3", category: "음료", count: 28, avgCost: 1800 },
  { id: "rc4", category: "디저트", count: 24, avgCost: 2400 },
  { id: "rc5", category: "세트 메뉴", count: 18, avgCost: 9800 },
  { id: "rc6", category: "시즌 메뉴", count: 9, avgCost: 7200 },
];

const recipeStatusData = [
  { id: "rs1", name: "활성", value: 91, count: 142 },
  { id: "rs2", name: "비활성", value: 5, count: 8 },
  { id: "rs3", name: "테스트 중", value: 3, count: 5 },
  { id: "rs4", name: "검토 중", value: 1, count: 1 },
];

const popularRecipesData = [
  { id: "pr1", month: "1월", orders: 34560 },
  { id: "pr2", month: "2월", orders: 38920 },
  { id: "pr3", month: "3월", orders: 42340 },
];

const COLORS = ["#10b981", "#ef4444", "#f59e0b", "#8b5cf6"];

const topRecipes = [
  { 
    id: "tr1", 
    name: "시그니처 버거", 
    cost: 6500, 
    price: 12000, 
    margin: 45.8, 
    orders: 15234,
    status: "활성",
    category: "메인 메뉴"
  },
  { 
    id: "tr2", 
    name: "치킨 샌드위치", 
    cost: 5200, 
    price: 9800, 
    margin: 46.9, 
    orders: 12456,
    status: "활성",
    category: "메인 메뉴"
  },
  { 
    id: "tr3", 
    name: "감자튀김 세트", 
    cost: 2800, 
    price: 4500, 
    margin: 37.8, 
    orders: 18923,
    status: "활성",
    category: "사이드 메뉴"
  },
  { 
    id: "tr4", 
    name: "아이스 아메리카노", 
    cost: 1200, 
    price: 4000, 
    margin: 70.0, 
    orders: 22145,
    status: "활성",
    category: "음료"
  },
  { 
    id: "tr5", 
    name: "콤보 세트", 
    cost: 9800, 
    price: 16000, 
    margin: 38.8, 
    orders: 8234,
    status: "활성",
    category: "세트 메뉴"
  },
];

const recentRecipes = [
  { id: "rr1", name: "스파이시 치킨 버거", addedDate: "2026-03-25", status: "테스트 중", cost: 7200 },
  { id: "rr2", name: "딸기 스무디", addedDate: "2026-03-22", status: "활성", cost: 3400 },
  { id: "rr3", name: "트러플 감자튀김", addedDate: "2026-03-20", status: "활성", cost: 4500 },
  { id: "rr4", name: "베이컨 치즈 버거", addedDate: "2026-03-18", status: "활성", cost: 8200 },
  { id: "rr5", name: "망고 스무디", addedDate: "2026-03-15", status: "활성", cost: 3600 },
];

export function RecipeDashboard() {
  const categoryChartData = useMemo(() => recipeCategoryData, []);
  const statusChartData = useMemo(() => recipeStatusData, []);
  const popularChartData = useMemo(() => popularRecipesData, []);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">레시피 관리 대시보드</h2>
        <p className="text-gray-500 mt-1">메뉴 레시피 및 원가 현황을 확인하세요</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: "bg-blue-100 text-blue-600",
            green: "bg-green-100 text-green-600",
            orange: "bg-orange-100 text-orange-600",
            yellow: "bg-yellow-100 text-yellow-600",
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
        {/* Category and cost */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">카테고리별 레시피 수 및 평균 원가</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryChartData}>
              <CartesianGrid key="grid" strokeDasharray="3 3" />
              <XAxis key="xaxis" dataKey="category" />
              <YAxis key="left-axis" yAxisId="left" orientation="left" stroke="#3b82f6" />
              <YAxis key="right-axis" yAxisId="right" orientation="right" stroke="#10b981" />
              <Tooltip key="tooltip" />
              <Legend key="legend" />
              <Bar key="count-bar" yAxisId="left" dataKey="count" fill="#3b82f6" name="레시피 수" />
              <Bar key="avgCost-bar" yAxisId="right" dataKey="avgCost" fill="#10b981" name="평균 원가 (원)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recipe status distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">레시피 상태 분포</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                key="pie"
                data={statusChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} (${value}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusChartData.map((entry, index) => (
                  <Cell key={`cell-${entry.id}-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip key="tooltip-pie" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Popular recipes trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">월별 메뉴 주문 추이</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={popularChartData}>
              <CartesianGrid key="grid-line" strokeDasharray="3 3" />
              <XAxis key="xaxis-line" dataKey="month" />
              <YAxis key="yaxis-line" />
              <Tooltip key="tooltip-line" />
              <Legend key="legend-line" />
              <Line key="orders-line" type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} name="총 주문 건수" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top recipes by profit margin */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">인기 레시피 TOP 5</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">순위</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">메뉴명</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">카테고리</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">원가</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">판매가</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">마진율</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">주문 건수</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">상태</th>
              </tr>
            </thead>
            <tbody>
              {topRecipes.map((recipe, index) => (
                <tr key={recipe.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                      index === 0 ? "bg-yellow-100 text-yellow-700" :
                      index === 1 ? "bg-gray-100 text-gray-700" :
                      index === 2 ? "bg-orange-100 text-orange-700" :
                      "bg-blue-50 text-blue-700"
                    }`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900">{recipe.name}</td>
                  <td className="py-3 px-4 text-gray-600">{recipe.category}</td>
                  <td className="py-3 px-4 text-right text-gray-900">₩{recipe.cost.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-gray-900">₩{recipe.price.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-semibold ${
                      recipe.margin >= 50 ? "text-green-600" :
                      recipe.margin >= 40 ? "text-blue-600" :
                      "text-orange-600"
                    }`}>
                      {recipe.margin}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">{recipe.orders.toLocaleString()}건</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      {recipe.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recently added recipes */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 등록된 레시피</h3>
        <div className="space-y-3">
          {recentRecipes.map((recipe) => (
            <div key={recipe.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{recipe.name}</p>
                  <p className="text-sm text-gray-500">등록일: {recipe.addedDate} · 원가: ₩{recipe.cost.toLocaleString()}</p>
                </div>
              </div>
              <span className={`inline-block px-3 py-1 text-xs rounded-full ${
                recipe.status === "활성" ? "bg-green-100 text-green-700" :
                recipe.status === "테스트 중" ? "bg-yellow-100 text-yellow-700" :
                "bg-gray-100 text-gray-700"
              }`}>
                {recipe.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}