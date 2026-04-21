<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - 페이지를 찾을 수 없습니다</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 px-4">
        <div class="max-w-md w-full text-center">
            <!-- 에러 아이콘 -->
            <div class="mb-8 flex justify-center">
                <div class="relative">
                    <div class="w-32 h-32 bg-[#00853D] rounded-full flex items-center justify-center shadow-2xl">
                        <i class="fas fa-exclamation-circle text-white text-5xl"></i>
                    </div>
                    <div class="absolute -top-2 -right-2 w-12 h-12 bg-[#FFD100] rounded-full flex items-center justify-center shadow-lg">
                        <span class="text-[#00853D] font-bold text-lg">!</span>
                    </div>
                </div>
            </div>

            <!-- 에러 코드 -->
            <h1 class="text-8xl font-bold mb-4 bg-gradient-to-r from-[#00853D] to-[#FFD100] bg-clip-text text-transparent">
                404
            </h1>

            <!-- 에러 메시지 -->
            <h2 class="text-2xl font-bold text-gray-800 mb-3">
                페이지를 찾을 수 없습니다
            </h2>
            <p class="text-gray-600 mb-8 leading-relaxed">
                요청하신 페이지가 존재하지 않거나 이동되었습니다.<br />
                URL을 확인하시거나 홈으로 돌아가주세요.
            </p>

            <!-- 액션 버튼 -->
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="index.jsp" class="flex items-center justify-center gap-2 bg-[#00853D] text-white px-8 py-3 rounded-lg hover:bg-[#006B2F] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <i class="fas fa-home text-lg"></i>
                    홈으로 돌아가기
                </a>
                <button onclick="window.history.back()" class="flex items-center justify-center gap-2 bg-white text-[#00853D] px-8 py-3 rounded-lg border-2 border-[#00853D] hover:bg-[#00853D] hover:text-white transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <i class="fas fa-arrow-left text-lg"></i>
                    이전 페이지로
                </button>
            </div>

            <!-- 푸터 -->
            <div class="mt-12 pt-8 border-t border-gray-200">
                <p class="text-sm text-gray-500">
                    Zero Loss ERP System
                </p>
            </div>
        </div>
    </div>
</body>
</html>
