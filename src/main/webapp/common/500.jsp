<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>500 - 서버 오류</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50 px-4">
        <div class="max-w-md w-full text-center">
            <!-- 에러 아이콘 -->
            <div class="mb-8 flex justify-center">
                <div class="relative">
                    <div class="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center shadow-2xl">
                        <i class="fas fa-times-circle text-white text-5xl"></i>
                    </div>
                    <div class="absolute -top-2 -right-2 w-12 h-12 bg-[#FFD100] rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <span class="text-red-500 font-bold text-lg">!</span>
                    </div>
                </div>
            </div>

            <!-- 에러 코드 -->
            <h1 class="text-8xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                500
            </h1>

            <!-- 에러 메시지 -->
            <h2 class="text-2xl font-bold text-gray-800 mb-3">
                서버 오류가 발생했습니다
            </h2>
            <p class="text-gray-600 mb-4 leading-relaxed">
                일시적인 문제가 발생했습니다.<br />
                잠시 후 다시 시도해주세요.
            </p>

            <!-- 에러 상세 정보 (개발 환경에서만) -->
            <%
                Exception exception = (Exception) request.getAttribute("javax.servlet.error.exception");
                if (exception != null && "development".equals(application.getInitParameter("env"))) {
            %>
            <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                <p class="text-xs font-mono text-red-700 break-all">
                    <%= exception.getMessage() %>
                </p>
            </div>
            <% } %>

            <!-- 액션 버튼 -->
            <div class="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                <button onclick="location.reload()" class="flex items-center justify-center gap-2 bg-[#00853D] text-white px-8 py-3 rounded-lg hover:bg-[#006B2F] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <i class="fas fa-sync text-lg"></i>
                    새로고침
                </button>
                <a href="index.jsp" class="flex items-center justify-center gap-2 bg-white text-[#00853D] px-8 py-3 rounded-lg border-2 border-[#00853D] hover:bg-[#00853D] hover:text-white transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <i class="fas fa-home text-lg"></i>
                    홈으로 돌아가기
                </a>
            </div>

            <!-- 도움말 -->
            <div class="bg-white border border-gray-200 rounded-lg p-4 mb-8">
                <h3 class="font-semibold text-gray-800 mb-2">문제가 지속되나요?</h3>
                <ul class="text-sm text-gray-600 text-left space-y-1">
                    <li>• 브라우저 캐시를 삭제해보세요</li>
                    <li>• 네트워크 연결을 확인해보세요</li>
                    <li>• 시스템 관리자에게 문의하세요</li>
                </ul>
            </div>

            <!-- 푸터 -->
            <div class="pt-8 border-t border-gray-200">
                <p class="text-sm text-gray-500">
                    Zero Loss ERP System
                </p>
            </div>
        </div>
    </div>
</body>
</html>
