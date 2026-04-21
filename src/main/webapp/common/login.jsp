<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zero Loss - 로그인</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="min-h-screen bg-[#E8F5E9] flex items-center justify-center p-4">
        <!-- 로그인 폼 컨테이너 -->
        <div class="max-w-md w-full">
            <!-- 메인 카드 -->
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-[#00853D]/20">
                <!-- 헤더 섹션 -->
                <div class="p-8 text-center">
                    <!-- 로고 -->
                    <div class="inline-flex items-center justify-center w-16 h-16 bg-[#00853D] rounded-full mb-4">
                        <i class="fas fa-lock text-white text-2xl"></i>
                    </div>
                    
                    <!-- 브랜드 제목 -->
                    <h1 class="text-2xl font-bold text-gray-900 mb-1">Zero Loss</h1>
                </div>

                <!-- 폼 섹션 -->
                <div class="px-8 pb-8">
                    <%
                        String errorMsg = request.getParameter("error");
                        if (errorMsg != null && !errorMsg.isEmpty()) {
                    %>
                    <div class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                        <i class="fas fa-exclamation-circle text-red-600 flex-shrink-0 mt-0.5"></i>
                        <p class="text-sm text-red-800"><%= errorMsg %></p>
                    </div>
                    <% } %>

                    <form method="post" action="auth/login.jsp" class="space-y-4">
                        <div>
                            <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
                                아이디
                            </label>
                            <div class="relative">
                                <i class="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    required
                                    class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D]/20 focus:border-[#00853D] transition-all outline-none"
                                    placeholder="아이디를 입력해주세요"
                                />
                            </div>
                        </div>

                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                                비밀번호
                            </label>
                            <div class="relative">
                                <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D]/20 focus:border-[#00853D] transition-all outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            class="w-full bg-[#00853D] text-white py-3 rounded-lg font-medium hover:bg-[#006B2F] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                        >
                            로그인
                        </button>
                    </form>

                    <!-- 데모 계정 섹션 -->
                    <div class="mt-6 pt-6 border-t border-gray-200">
                        <p class="text-xs text-gray-500 text-center mb-3">
                            데모 계정
                        </p>
                        
                        <div class="space-y-1.5 text-xs">
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600">본사관리자</span>
                                <span class="font-mono text-gray-500">admin / admin123</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600">지점장</span>
                                <span class="font-mono text-gray-500">manager1 / manager123</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
