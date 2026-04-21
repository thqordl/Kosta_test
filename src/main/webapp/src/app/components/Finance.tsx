import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, CreditCard, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "수입" | "지출";
}

const transactions: Transaction[] = [
  { id: "1", date: "2026-03-26", description: "제품 판매 - 주식회사 ABC", category: "매출", amount: 12500000, type: "수입" },
  { id: "2", date: "2026-03-26", description: "사무실 임대료", category: "운영비", amount: -3500000, type: "지출" },
  { id: "3", date: "2026-03-25", description: "급여 지급", category: "인건비", amount: -42000000, type: "지출" },
  { id: "4", date: "2026-03-25", description: "제품 판매 - 글로벌 트레이드", category: "매출", amount: 15700000, type: "수입" },
  { id: "5", date: "2026-03-24", description: "재료 구매", category: "원가", amount: -8500000, type: "지출" },
  { id: "6", date: "2026-03-24", description: "제품 판매 - 비즈니스 파트너스", category: "매출", amount: 9800000, type: "수입" },
  { id: "7", date: "2026-03-23", description: "마케팅 비용", category: "마케팅", amount: -2800000, type: "지출" },
  { id: "8", date: "2026-03-23", description: "제품 판매 - 스마트 시스템즈", category: "매출", amount: 7500000, type: "수입" },
];

const monthlyData = [
  { month: "10월", revenue: 180000000, expenses: 120000000, profit: 60000000 },
  { month: "11월", revenue: 195000000, expenses: 125000000, profit: 70000000 },
  { month: "12월", revenue: 210000000, expenses: 135000000, profit: 75000000 },
  { month: "1월", revenue: 188000000, expenses: 128000000, profit: 60000000 },
  { month: "2월", revenue: 205000000, expenses: 132000000, profit: 73000000 },
  { month: "3월", revenue: 245000000, expenses: 145000000, profit: 100000000 },
];

const expenseCategories = [
  { id: "exp1", name: "인건비", value: 42 },
  { id: "exp2", name: "운영비", value: 15 },
  { id: "exp3", name: "재료비", value: 28 },
  { id: "exp4", name: "마케팅", value: 8 },
  { id: "exp5", name: "기타", value: 7 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"];

export function Finance() {
  const [filterType, setFilterType] = useState("전체");

  const filteredTransactions = transactions.filter((t) => 
    filterType === "전체" || t.type === filterType
  );

  const totalRevenue = transactions.filter(t => t.type === "수입").reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(transactions.filter(t => t.type === "지출").reduce((sum, t) => sum + t.amount, 0));
  const netProfit = totalRevenue - totalExpenses;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">회계관리</h2>
        <p className="text-gray-500 mt-1">재무 현황과 거래 내역을 확인하세요</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">총 수입</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₩{(totalRevenue / 1000000).toFixed(1)}M</p>
              <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
                <TrendingUp className="w-4 h-4" />
                <span>+12.5%</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <ArrowDownRight className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">총 지출</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₩{(totalExpenses / 1000000).toFixed(1)}M</p>
              <div className="flex items-center gap-1 text-sm text-red-600 mt-2">
                <TrendingDown className="w-4 h-4" />
                <span>-5.2%</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">순이익</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₩{(netProfit / 1000000).toFixed(1)}M</p>
              <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
                <TrendingUp className="w-4 h-4" />
                <span>+18.3%</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">월별 수입/지출</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => `₩${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="revenue" fill="#10b981" name="수입" />
              <Bar dataKey="expenses" fill="#ef4444" name="지출" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expense breakdown */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">지출 카테고리 분포</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseCategories}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {expenseCategories.map((entry) => (
                  <Cell key={entry.id} fill={COLORS[expenseCategories.indexOf(entry) % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">최근 거래 내역</h3>
            <div className="flex gap-2">
              {["전체", "수입", "지출"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filterType === type
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    transaction.type === "수입" 
                      ? "bg-green-100 text-green-600" 
                      : "bg-red-100 text-red-600"
                  }`}>
                    {transaction.type === "수입" ? (
                      <ArrowDownRight className="w-6 h-6" />
                    ) : (
                      <ArrowUpRight className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-gray-500">{transaction.date}</span>
                      <span className="text-sm px-2 py-1 bg-gray-100 rounded text-gray-600">
                        {transaction.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`text-xl font-bold ${
                  transaction.type === "수입" ? "text-green-600" : "text-red-600"
                }`}>
                  {transaction.type === "수입" ? "+" : ""}₩{Math.abs(transaction.amount).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}