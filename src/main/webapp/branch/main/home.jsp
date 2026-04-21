<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>지점장 홈</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<%@ include file="/branch/common/layout/layout_head.jsp" %>
</head>
<body class="bg-gray-50">
<div class="zl-app">
<%@ include file="/branch/common/layout/sidebar.jsp" %>
<div class="zl-content">
<%@ include file="/branch/common/layout/topbar.jsp" %>
<main class="zl-page">
<div class="p-6">
    <!-- 페이지 헤더 -->
    <div class="bg-gradient-to-r from-[#00853D] to-[#00A94F] rounded-xl p-8 text-white shadow-lg mb-6">
        <div class="flex items-center gap-3 mb-3">
            <div class="w-12 h-12 bg-[#FFD100] rounded-lg flex items-center justify-center">
                <span class="text-[#00853D] font-bold text-2xl">분</span>
            </div>
            <div>
                <h2 class="text-3xl font-bold">지점장 관리 대시보드</h2>
                <p class="text-white/90 mt-1">강남지점 | 2026년 4월 20일</p>
            </div>
        </div>
    </div>

    <!-- 빠른 통계 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <!-- 통계 카드 1: 오늘 매출 -->
        <div class="bg-white rounded-lg border-2 border-[#00853D]/10 p-6 hover:border-[#00853D]/30 transition-all shadow-sm hover:shadow-md">
            <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-lg bg-[#00853D] text-white flex items-center justify-center shadow-md">
                    <i class="fas fa-chart-line text-lg"></i>
                </div>
            </div>
            <div>
                <p class="text-2xl font-bold text-gray-900">₩3,400,000</p>
                <p class="text-sm text-gray-600 mt-1">오늘 매출</p>
                <p class="text-xs text-gray-500 mt-2">+12.5% (어제 대비)</p>
            </div>
        </div>

        <!-- 통계 카드 2: 주문 건수 -->
        <div class="bg-white rounded-lg border-2 border-[#00853D]/10 p-6 hover:border-[#00853D]/30 transition-all shadow-sm hover:shadow-md">
            <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-lg bg-[#FFD100] text-[#00853D] flex items-center justify-center shadow-md">
                    <i class="fas fa-shopping-cart text-lg"></i>
                </div>
            </div>
            <div>
                <p class="text-2xl font-bold text-gray-900">201건</p>
                <p class="text-sm text-gray-600 mt-1">주문 건수</p>
                <p class="text-xs text-gray-500 mt-2">+8개 (어제 대비)</p>
            </div>
        </div>

        <!-- 통계 카드 3: 재고 현황 -->
        <div class="bg-white rounded-lg border-2 border-[#00853D]/10 p-6 hover:border-[#00853D]/30 transition-all shadow-sm hover:shadow-md">
            <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-lg bg-[#006B2F] text-white flex items-center justify-center shadow-md">
                    <i class="fas fa-box text-lg"></i>
                </div>
            </div>
            <div>
                <p class="text-2xl font-bold text-gray-900">85%</p>
                <p class="text-sm text-gray-600 mt-1">재고 현황</p>
                <p class="text-xs text-gray-500 mt-2">-2% (지난주 대비)</p>
            </div>
        </div>

        <!-- 통계 카드 4: 알림 -->
        <div class="bg-white rounded-lg border-2 border-[#00853D]/10 p-6 hover:border-[#00853D]/30 transition-all shadow-sm hover:shadow-md">
            <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-lg bg-[#00A94F] text-white flex items-center justify-center shadow-md">
                    <i class="fas fa-bell text-lg"></i>
                </div>
            </div>
            <div>
                <p class="text-2xl font-bold text-gray-900">3건</p>
                <p class="text-sm text-gray-600 mt-1">대기 중인 알림</p>
                <p class="text-xs text-gray-500 mt-2">2건 긴급</p>
            </div>
        </div>
    </div>

    <!-- 빠른 작업 -->
    <div class="mb-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div class="w-1 h-6 bg-[#00853D] rounded-full"></div>
            빠른 작업
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <!-- 작업 1: 발주서 작성 -->
            <div class="border-2 rounded-xl p-6 bg-[#00853D]/5 border-[#00853D]/20 hover:border-[#00853D]/40 hover:bg-[#00853D]/10 transition-all shadow-sm hover:shadow-md">
                <div class="flex items-start justify-between mb-3">
                    <div class="w-12 h-12 bg-[#00853D] rounded-lg flex items-center justify-center text-white shadow-md">
                        <i class="fas fa-file-invoice text-lg"></i>
                    </div>
                </div>
                <h4 class="text-lg font-bold text-gray-900 mb-2">발주서 작성</h4>
                <p class="text-sm text-gray-600 mb-4">새로운 발주 요청 생성</p>
                <a href="/branch/purchase_order/create.jsp" class="inline-flex items-center gap-2 text-sm font-medium text-[#00853D] hover:text-[#006B2F] hover:gap-3 transition-all">
                    바로가기
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>

            <!-- 작업 2: 재고 현황 -->
            <div class="border-2 rounded-xl p-6 bg-[#FFD100]/10 border-[#FFD100]/30 hover:border-[#FFD100]/50 hover:bg-[#FFD100]/20 transition-all shadow-sm hover:shadow-md">
                <div class="flex items-start justify-between mb-3">
                    <div class="w-12 h-12 bg-[#FFD100] rounded-lg flex items-center justify-center text-[#00853D] shadow-md">
                        <i class="fas fa-warehouse text-lg"></i>
                    </div>
                </div>
                <h4 class="text-lg font-bold text-gray-900 mb-2">재고 현황</h4>
                <p class="text-sm text-gray-600 mb-4">실시간 재고 확인</p>
                <a href="/branch/stock/stock.jsp" class="inline-flex items-center gap-2 text-sm font-medium text-[#00853D] hover:text-[#006B2F] hover:gap-3 transition-all">
                    바로가기
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>

            <!-- 작업 3: 재고 교환 요청 -->
            <div class="border-2 rounded-xl p-6 bg-[#006B2F]/5 border-[#006B2F]/20 hover:border-[#006B2F]/40 hover:bg-[#006B2F]/10 transition-all shadow-sm hover:shadow-md">
                <div class="flex items-start justify-between mb-3">
                    <div class="w-12 h-12 bg-[#006B2F] rounded-lg flex items-center justify-center text-white shadow-md">
                        <i class="fas fa-arrows-split-up-and-left text-lg"></i>
                    </div>
                </div>
                <h4 class="text-lg font-bold text-gray-900 mb-2">재고 교환</h4>
                <p class="text-sm text-gray-600 mb-4">주변 지점에 재고 지원 요청</p>
                <a href="/branch/swap/main.jsp" class="inline-flex items-center gap-2 text-sm font-medium text-[#00853D] hover:text-[#006B2F] hover:gap-3 transition-all">
                    바로가기
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>

            <!-- 작업 4: 매출 조회 -->
            <div class="border-2 rounded-xl p-6 bg-[#00A94F]/5 border-[#00A94F]/20 hover:border-[#00A94F]/40 hover:bg-[#00A94F]/10 transition-all shadow-sm hover:shadow-md">
                <div class="flex items-start justify-between mb-3">
                    <div class="w-12 h-12 bg-[#00A94F] rounded-lg flex items-center justify-center text-white shadow-md">
                        <i class="fas fa-chart-bar text-lg"></i>
                    </div>
                </div>
                <h4 class="text-lg font-bold text-gray-900 mb-2">매출 조회</h4>
                <p class="text-sm text-gray-600 mb-4">오늘 매출 상세 분석</p>
                <a href="/branch/sales/branch_sales/main.jsp" class="inline-flex items-center gap-2 text-sm font-medium text-[#00853D] hover:text-[#006B2F] hover:gap-3 transition-all">
                    바로가기
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>

        </div>
    </div>

    <!-- 처리 대기 & 일정 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        <!-- 처리 대기 -->
        <div class="bg-white rounded-xl border-2 border-[#00853D]/10 p-6 shadow-sm">
            <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div class="w-1 h-5 bg-[#00853D] rounded-full"></div>
                처리 대기
            </h3>
            <div class="space-y-3">
                <!-- 항목 1 -->
                <a href="/branch/purchase_order/history.jsp" class="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div class="flex items-center gap-3 flex-1">
                        <div class="w-8 h-8 rounded-lg bg-[#00853D]/10 text-[#00853D] flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-clock text-sm"></i>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-900">발주 승인 대기 중</p>
                            <p class="text-xs text-gray-500 mt-1">총 2건</p>
                        </div>
                    </div>
                    <span class="inline-flex items-center justify-center min-w-6 h-6 rounded-full bg-[#00853D] text-white text-xs font-bold">2</span>
                </a>

                <!-- 항목 2 -->
                <a href="/branch/swap/received_request.jsp" class="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div class="flex items-center gap-3 flex-1">
                        <div class="w-8 h-8 rounded-lg bg-[#FFD100]/20 text-[#F5C400] flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-exchange text-sm"></i>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-900">재고 교환 요청</p>
                            <p class="text-xs text-gray-500 mt-1">총 3건</p>
                        </div>
                    </div>
                    <span class="inline-flex items-center justify-center min-w-6 h-6 rounded-full bg-[#FFD100] text-[#00853D] text-xs font-bold">3</span>
                </a>

                <!-- 항목 3 -->
                <a href="/branch/hr/schedule/main.jsp" class="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div class="flex items-center gap-3 flex-1">
                        <div class="w-8 h-8 rounded-lg bg-[#00A94F]/10 text-[#00A94F] flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-calendar text-sm"></i>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-900">직원 근무표 승인</p>
                            <p class="text-xs text-gray-500 mt-1">총 1건</p>
                        </div>
                    </div>
                    <span class="inline-flex items-center justify-center min-w-6 h-6 rounded-full bg-[#00A94F] text-white text-xs font-bold">1</span>
                </a>
            </div>
        </div>

        <!-- 오늘 일정 -->
        <div class="bg-white rounded-xl border-2 border-[#00853D]/10 p-6 shadow-sm">
            <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div class="w-1 h-5 bg-[#00853D] rounded-full"></div>
                오늘 일정
            </h3>
            <div class="space-y-3">
                <!-- 일정 1 -->
                <div class="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <div class="text-sm font-bold text-[#00853D] min-w-12">09:00</div>
                    <div class="flex-1">
                        <p class="text-sm text-gray-900">개점 준비</p>
                        <p class="text-xs text-gray-500 mt-1">점포 오픈 준비</p>
                    </div>
                </div>

                <!-- 일정 2 -->
                <div class="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <div class="text-sm font-bold text-[#00853D] min-w-12">11:00</div>
                    <div class="flex-1">
                        <p class="text-sm text-gray-900">재고 확인</p>
                        <p class="text-xs text-gray-500 mt-1">일일 재고 체크</p>
                    </div>
                </div>

                <!-- 일정 3 -->
                <div class="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <div class="text-sm font-bold text-[#00853D] min-w-12">14:00</div>
                    <div class="flex-1">
                        <p class="text-sm text-gray-900">본사 미팅</p>
                        <p class="text-xs text-gray-500 mt-1">영상회의</p>
                    </div>
                </div>

                <!-- 일정 4 -->
                <div class="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <div class="text-sm font-bold text-[#00853D] min-w-12">17:00</div>
                    <div class="flex-1">
                        <p class="text-sm text-gray-900">마감 정산</p>
                        <p class="text-xs text-gray-500 mt-1">일매출 정산</p>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- 최근 공지사항 -->
    <div class="bg-white rounded-xl border-2 border-[#00853D]/10 p-6 shadow-sm">
        <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div class="w-1 h-5 bg-[#00853D] rounded-full"></div>
            최근 공지사항
        </h3>
        <div class="space-y-3">
            <!-- 공지 1 -->
            <a href="/branch/support/notice/main.jsp" class="flex items-start justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div class="flex items-start gap-3 flex-1">
                    <div class="w-8 h-8 rounded-lg bg-[#00853D]/10 text-[#00853D] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i class="fas fa-bullhorn text-sm"></i>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#00853D] text-white">공지</span>
                            <p class="text-sm font-medium text-gray-900">3월 재고 조사 안내</p>
                        </div>
                        <p class="text-xs text-gray-500 mt-2">전점포 일제 재고 조사를 실시합니다</p>
                    </div>
                </div>
                <div class="text-xs text-gray-500 ml-2">2026-03-29</div>
            </a>

            <!-- 공지 2 -->
            <a href="/branch/support/notice/main.jsp" class="flex items-start justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div class="flex items-start gap-3 flex-1">
                    <div class="w-8 h-8 rounded-lg bg-[#00853D]/10 text-[#00853D] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i class="fas fa-star text-sm"></i>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFD100] text-[#00853D]">신소식</span>
                            <p class="text-sm font-medium text-gray-900">신메뉴 출시 예정 (4월)</p>
                        </div>
                        <p class="text-xs text-gray-500 mt-2">인기 신메뉴 3종류가 순차 출시됩니다</p>
                    </div>
                </div>
                <div class="text-xs text-gray-500 ml-2">2026-03-28</div>
            </a>

            <!-- 공지 3 -->
            <a href="/branch/support/notice/main.jsp" class="flex items-start justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div class="flex items-start gap-3 flex-1">
                    <div class="w-8 h-8 rounded-lg bg-[#00A94F]/10 text-[#00A94F] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i class="fas fa-megaphone text-sm"></i>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#00A94F] text-white">안내</span>
                            <p class="text-sm font-medium text-gray-900">봄 시즌 프로모션 시작</p>
                        </div>
                        <p class="text-xs text-gray-500 mt-2">4월부터 봄 시즌 할인 프로모션이 진행됩니다</p>
                    </div>
                </div>
                <div class="text-xs text-gray-500 ml-2">2026-03-27</div>
            </a>
        </div>
    </div>

</div>
</main>
</div>
</div>
</body>
</html>
