import { Link, useNavigate } from "react-router";
import { Home, RefreshCw, XCircle } from "lucide-react";
import { useEffect } from "react";

interface ServerErrorProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

export function ServerError({ error, resetErrorBoundary }: ServerErrorProps) {
  const navigate = useNavigate();

  useEffect(() => {
    // 에러 로깅 (실제 환경에서는 서버로 전송)
    if (error) {
      console.error("Server Error:", error);
    }
  }, [error]);

  const handleRefresh = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50 px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center shadow-2xl">
              <XCircle className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-[#FFD100] rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-red-500 font-bold text-lg">!</span>
            </div>
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-8xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          500
        </h1>

        {/* Error Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          서버 오류가 발생했습니다
        </h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          일시적인 문제가 발생했습니다.<br />
          잠시 후 다시 시도해주세요.
        </p>

        {/* Error Details (Dev mode) */}
        {error && process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <p className="text-xs font-mono text-red-700 break-all">
              {error.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <button
            onClick={handleRefresh}
            className="flex items-center justify-center gap-2 bg-[#00853D] text-white px-8 py-3 rounded-lg hover:bg-[#006B2F] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <RefreshCw className="w-5 h-5" />
            새로고침
          </button>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-white text-[#00853D] px-8 py-3 rounded-lg border-2 border-[#00853D] hover:bg-[#00853D] hover:text-white transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Home className="w-5 h-5" />
            홈으로 돌아가기
          </Link>
        </div>

        {/* Help Text */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-gray-800 mb-2">문제가 지속되나요?</h3>
          <ul className="text-sm text-gray-600 text-left space-y-1">
            <li>• 브라우저 캐시를 삭제해보세요</li>
            <li>• 네트워크 연결을 확인해보세요</li>
            <li>• 시스템 관리자에게 문의하세요</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Zero Loss ERP System
          </p>
        </div>
      </div>
    </div>
  );
}
