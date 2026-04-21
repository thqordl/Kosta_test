import { Link } from "react-router";
import { Home, AlertCircle } from "lucide-react";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-[#00853D] rounded-full flex items-center justify-center shadow-2xl">
              <AlertCircle className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-[#FFD100] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-[#00853D] font-bold text-lg">!</span>
            </div>
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-8xl font-bold mb-4 bg-gradient-to-r from-[#00853D] to-[#FFD100] bg-clip-text text-transparent">
          404
        </h1>

        {/* Error Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.<br />
          URL을 확인하시거나 홈으로 돌아가주세요.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-[#00853D] text-white px-8 py-3 rounded-lg hover:bg-[#006B2F] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Home className="w-5 h-5" />
            홈으로 돌아가기
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 bg-white text-[#00853D] px-8 py-3 rounded-lg border-2 border-[#00853D] hover:bg-[#00853D] hover:text-white transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            이전 페이지로
          </button>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Zero Loss ERP System
          </p>
        </div>
      </div>
    </div>
  );
}