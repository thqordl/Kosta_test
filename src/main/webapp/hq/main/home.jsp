<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ZERO LOSS 본사 관리 시스템</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .sidebar-open .sidebar {
            transform: translateX(0);
        }
    </style>
</head>
<body class="bg-gray-50">
    <div class="min-h-screen">
        <!-- 모바일 사이드바 배경 -->
        <div id="sidebarBackdrop" class="fixed inset-0 bg-black bg-opacity-50 z-20 hidden lg:hidden"></div>

        <!-- 사이드바 -->
        <aside id="sidebar" class="fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-30 transform -translate-x-full transition-transform duration-200 lg:translate-x-0 overflow-y-auto">
            <div class="p-6 border-b border-gray-200">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-[#00853D] rounded-full flex items-center justify-center">
                        <span class="text-white font-bold text-xl">분</span>
                    </div>
                    <div>
                        <h1 class="text-xl font-bold text-gray-900">Zero Loss</h1>
                        <p class="text-xs text-gray-500">ERP</p>
                    </div>
                </div>
            </div>

            <%@ include file="/hq/common/sidebar.jspf" %>
        </aside>

        <!-- 메인 콘텐츠 -->
        <div class="lg:pl-64">
            <!-- 헤더 -->
            <%@ include file="/hq/common/header.jspf" %>

            <!-- 페이지 콘텐츠 -->
            <main class="p-6">
                <!-- 메인 컨테이너 -->
                <div class="space-y-6">
        
        <!-- 페이지 헤더 -->
        <div class="bg-gradient-to-r from-[#00853D] to-[#00A94F] rounded-xl p-8 text-white shadow-lg">
            <div class="flex items-center gap-3 mb-3">
                <div class="w-12 h-12 bg-[#FFD100] rounded-lg flex items-center justify-center">
                    <span class="text-[#00853D] font-bold text-2xl">S</span>
                </div>
                <div>
                    <h2 class="text-3xl font-bold">ZERO LOSS 본사 관리 시스템</h2>
                    <p class="text-white/90 mt-1">전국 직영점을 통합 관리하는 본사 관리자 포털에 오신 것을 환영합니다</p>
                </div>
            </div>
        </div>

        <!-- 빠른 통계 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- 통계 카드 1: 전체 직영점 -->
            <div class="bg-white rounded-lg border-2 border-[#00853D]/10 p-6 hover:border-[#00853D]/30 transition-all shadow-sm hover:shadow-md">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 rounded-lg bg-[#00853D] text-white flex items-center justify-center shadow-md">
                        <i class="fas fa-store text-lg"></i>
                    </div>
                </div>
                <div>
                    <p class="text-2xl font-bold text-gray-900">24개</p>
                    <p class="text-sm text-gray-600 mt-1">전체 직영점</p>
                    <p class="text-xs text-gray-500 mt-2">+2개 (이번 분기)</p>
                </div>
            </div>

            <!-- 통계 카드 2: 전사 매출 -->
            <div class="bg-white rounded-lg border-2 border-[#00853D]/10 p-6 hover:border-[#00853D]/30 transition-all shadow-sm hover:shadow-md">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 rounded-lg bg-[#FFD100] text-[#00853D] flex items-center justify-center shadow-md">
                        <i class="fas fa-arrow-trend-up text-lg"></i>
                    </div>
                </div>
                <div>
                    <p class="text-2xl font-bold text-gray-900">₩2,450,000,000</p>
                    <p class="text-sm text-gray-600 mt-1">전사 매출 (월)</p>
                    <p class="text-xs text-gray-500 mt-2">+15.3% (전월 대비)</p>
                </div>
            </div>

            <!-- 통계 카드 3: 총 재고 가치 -->
            <div class="bg-white rounded-lg border-2 border-[#00853D]/10 p-6 hover:border-[#00853D]/30 transition-all shadow-sm hover:shadow-md">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 rounded-lg bg-[#006B2F] text-white flex items-center justify-center shadow-md">
                        <i class="fas fa-box text-lg"></i>
                    </div>
                </div>
                <div>
                    <p class="text-2xl font-bold text-gray-900">₩456,000,000</p>
                    <p class="text-sm text-gray-600 mt-1">총 재고 가치</p>
                    <p class="text-xs text-gray-500 mt-2">-3.2% (전월 대비)</p>
                </div>
            </div>

            <!-- 통계 카드 4: 총 직원 수 -->
            <div class="bg-white rounded-lg border-2 border-[#00853D]/10 p-6 hover:border-[#00853D]/30 transition-all shadow-sm hover:shadow-md">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 rounded-lg bg-[#00A94F] text-white flex items-center justify-center shadow-md">
                        <i class="fas fa-users text-lg"></i>
                    </div>
                </div>
                <div>
                    <p class="text-2xl font-bold text-gray-900">324명</p>
                    <p class="text-sm text-gray-600 mt-1">총 직원 수</p>
                    <p class="text-xs text-gray-500 mt-2">+12명 (전월 대비)</p>
                </div>
            </div>
        </div>

        <!-- 관리 모듈 -->
        <div>
            <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div class="w-1 h-6 bg-[#00853D] rounded-full"></div>
                관리 모듈
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <!-- 모듈 1: 직영점 통합 관리 -->
                <div class="border-2 rounded-xl p-6 bg-[#00853D]/5 border-[#00853D]/20 hover:border-[#00853D]/40 hover:bg-[#00853D]/10 transition-all shadow-sm hover:shadow-md">
                    <div class="flex items-start justify-between mb-3">
                        <div class="w-12 h-12 bg-[#00853D] rounded-lg flex items-center justify-center text-white shadow-md">
                            <i class="fas fa-store text-lg"></i>
                        </div>
                        <a href="#" class="text-sm text-[#00853D] hover:text-[#006B2F] flex items-center gap-1 font-medium">
                            <i class="fas fa-chart-bar"></i>
                            대시보드
                        </a>
                    </div>
                    <h4 class="text-lg font-bold text-gray-900 mb-2">직영점 통합 관리</h4>
                    <p class="text-sm text-gray-600 mb-4">전국 직영점의 영업 현황과 실시간 매출을 통합 관리합니다</p>
                    <a href="#" class="inline-flex items-center gap-2 text-sm font-medium text-[#00853D] hover:text-[#006B2F] hover:gap-3 transition-all">
                        바로가기
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>

                <!-- 모듈 2: 매출 관리 -->
                <div class="border-2 rounded-xl p-6 bg-[#FFD100]/10 border-[#FFD100]/30 hover:border-[#FFD100]/50 hover:bg-[#FFD100]/20 transition-all shadow-sm hover:shadow-md">
                    <div class="flex items-start justify-between mb-3">
                        <div class="w-12 h-12 bg-[#FFD100] rounded-lg flex items-center justify-center text-[#00853D] shadow-md">
                            <i class="fas fa-arrow-trend-up text-lg"></i>
                        </div>
                        <a href="#" class="text-sm text-[#00853D] hover:text-[#006B2F] flex items-center gap-1 font-medium">
                            <i class="fas fa-chart-bar"></i>
                            대시보드
                        </a>
                    </div>
                    <h4 class="text-lg font-bold text-gray-900 mb-2">매출 관리</h4>
                    <p class="text-sm text-gray-600 mb-4">전체 지점의 실시간 매출 조회 및 기간별 매출 분석</p>
                    <a href="#" class="inline-flex items-center gap-2 text-sm font-medium text-[#00853D] hover:text-[#006B2F] hover:gap-3 transition-all">
                        바로가기
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>

                <!-- 모듈 3: 발주 관리 -->
                <div class="border-2 rounded-xl p-6 bg-[#00853D]/5 border-[#00853D]/20 hover:border-[#00853D]/40 hover:bg-[#00853D]/10 transition-all shadow-sm hover:shadow-md">
                    <div class="flex items-start justify-between mb-3">
                        <div class="w-12 h-12 bg-[#00853D] rounded-lg flex items-center justify-center text-white shadow-md">
                            <i class="fas fa-box text-lg"></i>
                        </div>
                        <a href="#" class="text-sm text-[#00853D] hover:text-[#006B2F] flex items-center gap-1 font-medium">
                            <i class="fas fa-chart-bar"></i>
                            대시보드
                        </a>
                    </div>
                    <h4 class="text-lg font-bold text-gray-900 mb-2">발주 관리</h4>
                    <p class="text-sm text-gray-600 mb-4">지점 발주 요청 취합, 승인/반려 및 품목별 수량 설정</p>
                    <a href="#" class="inline-flex items-center gap-2 text-sm font-medium text-[#00853D] hover:text-[#006B2F] hover:gap-3 transition-all">
                        바로가기
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>

                <!-- 모듈 4: 배송 관리 -->
                <div class="border-2 rounded-xl p-6 bg-[#006B2F]/5 border-[#006B2F]/20 hover:border-[#006B2F]/40 hover:bg-[#006B2F]/10 transition-all shadow-sm hover:shadow-md">
                    <div class="flex items-start justify-between mb-3">
                        <div class="w-12 h-12 bg-[#006B2F] rounded-lg flex items-center justify-center text-white shadow-md">
                            <i class="fas fa-truck text-lg"></i>
                        </div>
                        <a href="#" class="text-sm text-[#00853D] hover:text-[#006B2F] flex items-center gap-1 font-medium">
                            <i class="fas fa-chart-bar"></i>
                            대시보드
                        </a>
                    </div>
                    <h4 class="text-lg font-bold text-gray-900 mb-2">배송 관리</h4>
                    <p class="text-sm text-gray-600 mb-4">배송 상태 통합 트래킹 및 반품 처리</p>
                    <a href="#" class="inline-flex items-center gap-2 text-sm font-medium text-[#00853D] hover:text-[#006B2F] hover:gap-3 transition-all">
                        바로가기
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>

                <!-- 모듈 5: 재고 관리 -->
                <div class="border-2 rounded-xl p-6 bg-[#00A94F]/5 border-[#00A94F]/20 hover:border-[#00A94F]/40 hover:bg-[#00A94F]/10 transition-all shadow-sm hover:shadow-md">
                    <div class="flex items-start justify-between mb-3">
                        <div class="w-12 h-12 bg-[#00A94F] rounded-lg flex items-center justify-center text-white shadow-md">
                            <i class="fas fa-warehouse text-lg"></i>
                        </div>
                        <a href="#" class="text-sm text-[#00853D] hover:text-[#006B2F] flex items-center gap-1 font-medium">
                            <i class="fas fa-chart-bar"></i>
                            대시보드
                        </a>
                    </div>
                    <h4 class="text-lg font-bold text-gray-900 mb-2">재고 관리</h4>
                    <p class="text-sm text-gray-600 mb-4">전지점 품목 통합 조회 및 본사 물류창고 관리</p>
                    <a href="#" class="inline-flex items-center gap-2 text-sm font-medium text-[#00853D] hover:text-[#006B2F] hover:gap-3 transition-all">
                        바로가기
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>

                <!-- 모듈 6: 레시피 관리 -->
                <div class="border-2 rounded-xl p-6 bg-[#FFD100]/10 border-[#FFD100]/30 hover:border-[#FFD100]/50 hover:bg-[#FFD100]/20 transition-all shadow-sm hover:shadow-md">
                    <div class="flex items-start justify-between mb-3">
                        <div class="w-12 h-12 bg-[#FFD100] rounded-lg flex items-center justify-center text-[#00853D] shadow-md">
                            <i class="fas fa-book text-lg"></i>
                        </div>
                        <a href="#" class="text-sm text-[#00853D] hover:text-[#006B2F] flex items-center gap-1 font-medium">
                            <i class="fas fa-chart-bar"></i>
                            대시보드
                        </a>
                    </div>
                    <h4 class="text-lg font-bold text-gray-900 mb-2">레시피 관리</h4>
                    <p class="text-sm text-gray-600 mb-4">신규 레시피 등록, 수정 및 원가 분석</p>
                    <a href="#" class="inline-flex items-center gap-2 text-sm font-medium text-[#00853D] hover:text-[#006B2F] hover:gap-3 transition-all">
                        바로가기
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>

                <!-- 모듈 7: 인사 및 권한 관리 -->
                <div class="border-2 rounded-xl p-6 bg-[#00853D]/5 border-[#00853D]/20 hover:border-[#00853D]/40 hover:bg-[#00853D]/10 transition-all shadow-sm hover:shadow-md">
                    <div class="flex items-start justify-between mb-3">
                        <div class="w-12 h-12 bg-[#00853D] rounded-lg flex items-center justify-center text-white shadow-md">
                            <i class="fas fa-users text-lg"></i>
                        </div>
                        <a href="#" class="text-sm text-[#00853D] hover:text-[#006B2F] flex items-center gap-1 font-medium">
                            <i class="fas fa-chart-bar"></i>
                            대시보드
                        </a>
                    </div>
                    <h4 class="text-lg font-bold text-gray-900 mb-2">인사 및 권한 관리</h4>
                    <p class="text-sm text-gray-600 mb-4">본사 및 지점별 직원 정보, 계정 발급 및 권한 관리</p>
                    <a href="#" class="inline-flex items-center gap-2 text-sm font-medium text-[#00853D] hover:text-[#006B2F] hover:gap-3 transition-all">
                        바로가기
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>

            </div>
        </div>

        <!-- 하단 섹션: 최근 알림 & TOP 5 점 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <!-- 최근 알림 -->
            <div class="bg-white rounded-xl border-2 border-[#00853D]/10 p-6 shadow-sm">
                <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div class="w-1 h-5 bg-[#00853D] rounded-full"></div>
                    최근 알림
                </h3>
                <div class="space-y-3">
                    <!-- 알림 1: 경고 -->
                    <div class="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div class="w-8 h-8 rounded-lg bg-[#FFD100]/20 text-[#F5C400] flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-triangle-exclamation text-sm"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm text-gray-900">강남점 재고 부족 알림 (김치 외 3품목)</p>
                            <p class="text-xs text-gray-500 mt-1">10분 전</p>
                        </div>
                    </div>

                    <!-- 알림 2: 성공 -->
                    <div class="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div class="w-8 h-8 rounded-lg bg-[#00853D]/10 text-[#00853D] flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-circle-check text-sm"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm text-gray-900">이번 주 전사 매출 목표 120% 달성</p>
                            <p class="text-xs text-gray-500 mt-1">1시간 전</p>
                        </div>
                    </div>

                    <!-- 알림 3: 정보 -->
                    <div class="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div class="w-8 h-8 rounded-lg bg-[#00A94F]/10 text-[#00A94F] flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-info-circle text-sm"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm text-gray-900">5개 지점 발주 요청 승인 대기 중</p>
                            <p class="text-xs text-gray-500 mt-1">2시간 전</p>
                        </div>
                    </div>

                    <!-- 알림 4: 경고 -->
                    <div class="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div class="w-8 h-8 rounded-lg bg-[#FFD100]/20 text-[#F5C400] flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-triangle-exclamation text-sm"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm text-gray-900">부산 해운대점 배송 지연 발생</p>
                            <p class="text-xs text-gray-500 mt-1">3시간 전</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 이번 달 TOP 5 점 -->
            <div class="bg-white rounded-xl border-2 border-[#00853D]/10 p-6 shadow-sm">
                <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div class="w-1 h-5 bg-[#00853D] rounded-full"></div>
                    이번 달 TOP 5 점
                </h3>
                <div class="space-y-3">
                    <!-- 1위 -->
                    <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-sm bg-[#FFD100] text-[#00853D]">
                                1
                            </div>
                            <div>
                                <p class="font-medium text-gray-900">강남점</p>
                                <p class="text-sm text-gray-500">매출: ₩125,000,000</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-1 text-[#00853D]">
                            <i class="fas fa-arrow-trend-up text-sm"></i>
                            <span class="text-sm font-medium">+18.5%</span>
                        </div>
                    </div>

                    <!-- 2위 -->
                    <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-sm bg-[#00A94F] text-white">
                                2
                            </div>
                            <div>
                                <p class="font-medium text-gray-900">홍대점</p>
                                <p class="text-sm text-gray-500">매출: ₩118,000,000</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-1 text-[#00853D]">
                            <i class="fas fa-arrow-trend-up text-sm"></i>
                            <span class="text-sm font-medium">+15.2%</span>
                        </div>
                    </div>

                    <!-- 3위 -->
                    <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-sm bg-[#00853D] text-white">
                                3
                            </div>
                            <div>
                                <p class="font-medium text-gray-900">잠실점</p>
                                <p class="text-sm text-gray-500">매출: ₩112,000,000</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-1 text-[#00853D]">
                            <i class="fas fa-arrow-trend-up text-sm"></i>
                            <span class="text-sm font-medium">+12.8%</span>
                        </div>
                    </div>

                    <!-- 4위 -->
                    <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-sm bg-[#006B2F] text-white">
                                4
                            </div>
                            <div>
                                <p class="font-medium text-gray-900">판교점</p>
                                <p class="text-sm text-gray-500">매출: ₩108,000,000</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-1 text-[#00853D]">
                            <i class="fas fa-arrow-trend-up text-sm"></i>
                            <span class="text-sm font-medium">+16.3%</span>
                        </div>
                    </div>

                    <!-- 5위 -->
                    <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-sm bg-[#006B2F] text-white">
                                5
                            </div>
                            <div>
                                <p class="font-medium text-gray-900">여의도점</p>
                                <p class="text-sm text-gray-500">매출: ₩95,000,000</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-1 text-[#00853D]">
                            <i class="fas fa-arrow-trend-up text-sm"></i>
                            <span class="text-sm font-medium">+9.5%</span>
                        </div>
                    </div>
                </div>
            </div>

                </div>

            </main>
        </div>
    </div>

    <script>
        // 사이드바 토글
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const backdrop = document.getElementById('sidebarBackdrop');
            
            if (sidebar.classList.contains('-translate-x-full')) {
                sidebar.classList.remove('-translate-x-full');
                backdrop.classList.remove('hidden');
            } else {
                sidebar.classList.add('-translate-x-full');
                backdrop.classList.add('hidden');
            }
        }

        // 메뉴 토글
        function toggleMenu(button) {
            const submenu = button.nextElementSibling;
            const chevron = button.querySelector('i.fa-chevron-right');
            
            submenu.classList.toggle('hidden');
            if (chevron) {
                if (submenu.classList.contains('hidden')) {
                    chevron.classList.remove('fa-chevron-down');
                    chevron.classList.add('fa-chevron-right');
                } else {
                    chevron.classList.add('fa-chevron-down');
                    chevron.classList.remove('fa-chevron-right');
                }
            }
        }

        // 사용자 메뉴 토글
        function toggleUserMenu() {
            const userMenu = document.getElementById('userMenu');
            userMenu.classList.toggle('hidden');
        }

        // 사용자 메뉴 외부 클릭시 닫기
        document.addEventListener('click', (e) => {
            const userMenuBtn = document.getElementById('userMenuBtn');
            const userMenu = document.getElementById('userMenu');
            
            if (!userMenuBtn.contains(e.target) && !userMenu.contains(e.target)) {
                userMenu.classList.add('hidden');
            }
        });

        // 사이드바 배경 클릭시 닫기
        document.getElementById('sidebarBackdrop').addEventListener('click', toggleSidebar);

        // 로그아웃 함수
        function logout() {
            alert('로그아웃 되었습니다');
            window.location.href = '<%= request.getContextPath() %>/common/login.jsp';
        }
    </script>
</body>
</html>


