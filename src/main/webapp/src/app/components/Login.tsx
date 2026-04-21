import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { Lock, User, AlertCircle } from "lucide-react";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        navigate("/");
      } else {
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (err) {
      setError("로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E8F5E9] flex items-center justify-center p-4">
      {/* Login form container */}
      <div className="max-w-md w-full">
        {/* Main card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-[#00853D]/20">
          {/* Header section */}
          <div className="p-8 text-center">
            {/* Logo */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00853D] rounded-full mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            
            {/* Brand title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Zero Loss</h1>
          </div>

          {/* Form section */}
          <div className="px-8 pb-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  아이디
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D]/20 focus:border-[#00853D] transition-all outline-none"
                    placeholder="비밀번호를 입력해주세요"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  비밀번호
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D]/20 focus:border-[#00853D] transition-all outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00853D] text-white py-3 rounded-lg font-medium hover:bg-[#006B2F] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {loading ? "로그인 중..." : "로그인"}
              </button>
            </form>

            {/* Demo accounts section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center mb-3">
                데모 계정
              </p>
              
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">본사관리자</span>
                  <span className="font-mono text-gray-500">admin / admin123</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">지점장</span>
                  <span className="font-mono text-gray-500">manager1 / manager123</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">지점매니저</span>
                  <span className="font-mono text-gray-500">manager2 / manager123</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}