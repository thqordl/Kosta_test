<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>매출 순위 - ZERO LOSS 본사 관리 시스템</title>
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
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900">매출 순위</h2>
                        <p class="text-gray-500 mt-1">메뉴별, 시간대별 매출 랭킹을 확인하세요</p>
                    </div>

                    <!-- 필터 카드 -->
                    <div class="bg-white rounded-lg border border-gray-200 p-4">
                        <div class="flex flex-wrap items-center gap-4">
                            <!-- 기간 설정 -->
                            <div class="flex items-center gap-2">
                                <i class="fas fa-calendar w-4 h-4 text-gray-500"></i>
                                <span class="text-sm font-medium text-gray-700">기간:</span>
                                <select id="periodFilter" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                                    <option selected>이번 달</option>
                                    <option>지난 달</option>
                                    <option>1분기</option>
                                    <option>2분기</option>
                                    <option>3분기</option>
                                    <option>4분기</option>
                                    <option>상반기</option>
                                    <option>하반기</option>
                                    <option>올해</option>
                                </select>
                            </div>

                            <!-- Divider -->
                            <div class="h-8 w-px bg-gray-300"></div>

                            <!-- 정렬 기준 -->
                            <div class="flex items-center gap-2">
                                <i class="fas fa-chart-line w-4 h-4 text-gray-500"></i>
                                <span class="text-sm font-medium text-gray-700">정렬:</span>
                                <div class="flex gap-2">
                                    <button onclick="setSortBy('sales')" class="px-3 py-2 rounded-lg border border-[#00853D] bg-[#00853D]/5 text-[#00853D] text-sm font-medium transition-all sortBtn" data-sort="sales">
                                        총매출액 순
                                    </button>
                                    <button onclick="setSortBy('orders')" class="px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:border-gray-300 text-sm font-medium transition-all sortBtn" data-sort="orders">
                                        총 주문 건수 순
                                    </button>
                                    <button onclick="setSortBy('avgPrice')" class="px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:border-gray-300 text-sm font-medium transition-all sortBtn" data-sort="avgPrice">
                                        객단가 순
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 뷰 모드 선택 -->
                    <div class="flex gap-3">
                        <button onclick="setViewMode('menus')" class="px-4 py-2 rounded-lg font-medium transition-all bg-[#00853D] text-white viewModeBtn" data-mode="menus">
                            <i class="fas fa-trophy mr-2"></i>메뉴별 랭킹
                        </button>
                        <button onclick="setViewMode('timeDate')" class="px-4 py-2 rounded-lg font-medium transition-all bg-gray-100 text-gray-700 hover:bg-gray-200 viewModeBtn" data-mode="timeDate">
                            <i class="fas fa-clock mr-2"></i>일자/시간대별 랭킹
                        </button>
                    </div>

                    <!-- 콘텐츠 영역 -->
                    <div id="contentArea">
                        <!-- 메뉴별 랭킹 뷰 (기본) -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <!-- 베스트셀러 TOP 10 -->
                            <div class="bg-white rounded-lg border border-gray-200 p-4">
                                <div class="flex items-center gap-2 mb-3">
                                    <i class="fas fa-trophy w-4 h-4 text-[#00853D]"></i>
                                    <h3 class="text-base font-semibold text-gray-900">베스트셀러 (효자 메뉴) TOP 10</h3>
                                    <span class="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                        프로모션 추천
                                    </span>
                                </div>
                                <div class="space-y-1.5" id="bestMenusList"></div>
                            </div>

                            <!-- 워스트셀러 BOTTOM 10 -->
                            <div class="bg-white rounded-lg border border-orange-200 p-4">
                                <div class="flex items-center gap-2 mb-3">
                                    <i class="fas fa-chart-line w-4 h-4 text-orange-600"></i>
                                    <h3 class="text-base font-semibold text-orange-900">워스트셀러 (단종 고려) BOTTOM 10</h3>
                                    <span class="ml-auto text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                                        주문 검토
                                    </span>
                                </div>
                                <div class="space-y-1.5" id="worstMenusList"></div>
                            </div>
                        </div>
                    </div>

                    <!-- 상세 정보 -->
                    <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div class="flex items-center gap-2">
                            <i class="fas fa-info-circle w-5 h-5 text-blue-600"></i>
                            <p class="text-sm text-blue-900">
                                <span class="font-semibold">매출 순위</span>는 메뉴별 베스트셀러와 워스트셀러, 최고 매출 시간대와 요일을 분석합니다. 프로모션 전략 수립과 메뉴 관리에 활용하세요.
                            </p>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    </div>

    <script>
        // Mock 데이터
        // 베스트셀러 TOP 10
        const bestMenus = [
            { id: "bm1", rank: 1, name: "이탈리안 비엠티", category: "샌드위치", sales: 3450000, orders: 245, avgPrice: 14082 },
            { id: "bm2", rank: 2, name: "로티세리 치킨", category: "샌드위치", sales: 2870000, orders: 215, avgPrice: 13349 },
            { id: "bm3", rank: 3, name: "터키 베이컨 아보카도", category: "샌드위치", sales: 2340000, orders: 172, avgPrice: 13605 },
            { id: "bm4", rank: 4, name: "써브웨이 클럽", category: "샌드위치", sales: 2030000, orders: 150, avgPrice: 13533 },
            { id: "bm5", rank: 5, name: "스파이시 이탈리안", category: "샌드위치", sales: 1780000, orders: 131, avgPrice: 13588 },
            { id: "bm6", rank: 6, name: "치킨 샐러드", category: "샐러드", sales: 1450000, orders: 116, avgPrice: 12500 },
            { id: "bm7", rank: 7, name: "터키 샐러드", category: "샐러드", sales: 1230000, orders: 101, avgPrice: 12178 },
            { id: "bm8", rank: 8, name: "참치 샐러드", category: "샐러드", sales: 1010000, orders: 85, avgPrice: 11882 },
            { id: "bm9", rank: 9, name: "쿠키 세트", category: "사이드", sales: 980000, orders: 195, avgPrice: 5026 },
            { id: "bm10", rank: 10, name: "음료 세트", category: "사이드", sales: 850000, orders: 213, avgPrice: 3991 }
        ];

        // 워스트셀러 BOTTOM 10
        const worstMenus = [
            { id: "wm1", rank: 41, name: "베지 디럭스", category: "샌드위치", sales: 85000, orders: 7, avgPrice: 12143 },
            { id: "wm2", rank: 42, name: "에그마요 샌드위치", category: "샌드위치", sales: 78000, orders: 6, avgPrice: 13000 },
            { id: "wm3", rank: 43, name: "할라피뇨 샌드위치", category: "샌드위치", sales: 68000, orders: 5, avgPrice: 13600 },
            { id: "wm4", rank: 44, name: "스테이크 샐러드", category: "샐러드", sales: 52000, orders: 4, avgPrice: 13000 },
            { id: "wm5", rank: 45, name: "새우 샐러드", category: "샐러드", sales: 38000, orders: 3, avgPrice: 12667 },
            { id: "wm6", rank: 46, name: "올리브 샌드위치", category: "샌드위치", sales: 26000, orders: 2, avgPrice: 13000 },
            { id: "wm7", rank: 47, name: "비프 샐러드", category: "샐러드", sales: 13000, orders: 1, avgPrice: 13000 },
            { id: "wm8", rank: 48, name: "피클 칩스", category: "사이드", sales: 9500, orders: 2, avgPrice: 4750 },
            { id: "wm9", rank: 49, name: "크림 수프", category: "사이드", sales: 5000, orders: 1, avgPrice: 5000 },
            { id: "wm10", rank: 50, name: "치아바타 샌드위치", category: "샌드위치", sales: 0, orders: 0, avgPrice: 0 }
        ];

        // 최고 매출 요일/시간대
        const topDayTimeSlots = [
            { id: "dt1", rank: 1, day: "금요일", timeSlot: "12:00-13:00", sales: 880000, orders: 65 },
            { id: "dt2", rank: 2, day: "토요일", timeSlot: "18:00-19:00", sales: 820000, orders: 61 },
            { id: "dt3", rank: 3, day: "금요일", timeSlot: "18:00-19:00", sales: 790000, orders: 59 },
            { id: "dt4", rank: 4, day: "목요일", timeSlot: "12:00-13:00", sales: 765000, orders: 56 },
            { id: "dt5", rank: 5, day: "토요일", timeSlot: "12:00-13:00", sales: 740000, orders: 54 }
        ];

        // 최고 매출일
        const topDates = [
            { id: "td1", rank: 1, date: "2026-03-15", day: "토요일", sales: 1850000, orders: 145, note: "화이트데이 프로모션" },
            { id: "td2", rank: 2, date: "2026-03-22", day: "토요일", sales: 1780000, orders: 138, note: "주말 특가" },
            { id: "td3", rank: 3, date: "2026-03-08", day: "토요일", sales: 1720000, orders: 132, note: "3월 프로모션" },
            { id: "td4", rank: 4, date: "2026-03-29", day: "토요일", sales: 1690000, orders: 128, note: "월말 세일" },
            { id: "td5", rank: 5, date: "2026-03-01", day: "토요일", sales: 1650000, orders: 125, note: "월초 특가" }
        ];

        let currentSortBy = 'sales';
        let currentViewMode = 'menus';

        // 포맷 함수
        function formatCurrency(value) {
            return "₩" + value.toLocaleString();
        }

        // 정렬 기준 설정
        function setSortBy(sortType) {
            currentSortBy = sortType;
            document.querySelectorAll('.sortBtn').forEach(btn => {
                if (btn.dataset.sort === sortType) {
                    btn.classList.remove('border-gray-200', 'text-gray-700', 'hover:border-gray-300');
                    btn.classList.add('border-[#00853D]', 'bg-[#00853D]/5', 'text-[#00853D]');
                } else {
                    btn.classList.remove('border-[#00853D]', 'bg-[#00853D]/5', 'text-[#00853D]');
                    btn.classList.add('border-gray-200', 'text-gray-700', 'hover:border-gray-300');
                }
            });
            renderContent();
        }

        // 뷰 모드 설정
        function setViewMode(mode) {
            currentViewMode = mode;
            document.querySelectorAll('.viewModeBtn').forEach(btn => {
                if (btn.dataset.mode === mode) {
                    btn.classList.remove('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
                    btn.classList.add('bg-[#00853D]', 'text-white');
                } else {
                    btn.classList.remove('bg-[#00853D]', 'text-white');
                    btn.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
                }
            });
            renderContent();
        }

        // 콘텐츠 렌더링
        function renderContent() {
            const contentArea = document.getElementById("contentArea");

            if (currentViewMode === 'menus') {
                renderMenusView();
            } else if (currentViewMode === 'timeDate') {
                renderTimeDateView();
            }
        }

        // 메뉴별 뷰
        function renderMenusView() {
            const bestMenusHtml = bestMenus.map(menu => {
                return "<div class=\"flex items-center justify-between p-2 rounded-lg border border-gray-200 hover:border-[#00853D] hover:bg-[#00853D]/5 transition-all\">" +
                    "<div class=\"flex items-center gap-2 flex-1\">" +
                    "<span class=\"font-bold text-[#00853D] text-sm w-5\">" + menu.rank + "</span>" +
                    "<div class=\"flex-1\">" +
                    "<h3 class=\"font-semibold text-sm text-gray-900\">" + menu.name + "</h3>" +
                    "<p class=\"text-xs text-gray-500\">" + menu.category + " · " + menu.orders + "건 판매</p>" +
                    "</div>" +
                    "</div>" +
                    "<div class=\"text-right\">" +
                    "<p class=\"font-bold text-sm text-gray-900\">" + formatCurrency(menu.sales) + "</p>" +
                    "</div>" +
                    "</div>";
            }).join("");

            const worstMenusHtml = worstMenus.map(menu => {
                return "<div class=\"flex items-center justify-between p-2 rounded-lg border border-orange-200 bg-orange-50/30 hover:bg-orange-50 transition-all\">" +
                    "<div class=\"flex items-center gap-2 flex-1\">" +
                    "<span class=\"font-bold text-orange-600 text-sm w-5\">" + menu.rank + "</span>" +
                    "<div class=\"flex-1\">" +
                    "<h3 class=\"font-semibold text-sm text-gray-900\">" + menu.name + "</h3>" +
                    "<p class=\"text-xs text-gray-500\">" + menu.category + " · " + menu.orders + "건만 판매</p>" +
                    "</div>" +
                    "</div>" +
                    "<div class=\"text-right\">" +
                    "<p class=\"font-bold text-sm text-orange-600\">" + formatCurrency(menu.sales) + "</p>" +
                    "</div>" +
                    "</div>";
            }).join("");

            document.getElementById("bestMenusList").innerHTML = bestMenusHtml;
            document.getElementById("worstMenusList").innerHTML = worstMenusHtml;
        }

        // 시간대/일자 뷰
        function renderTimeDateView() {
            const contentArea = document.getElementById("contentArea");

            const slotTableRows = topDayTimeSlots.map(slot => {
                return "<tr class=\"border-b border-gray-100 hover:bg-gray-50\">" +
                    "<td class=\"px-2 py-2\">" +
                    "<span class=\"inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#00853D]/10 text-[#00853D] text-xs font-bold\">" + slot.rank + "</span>" +
                    "</td>" +
                    "<td class=\"px-2 py-2 font-semibold text-sm text-gray-900\">" + slot.day + "</td>" +
                    "<td class=\"px-2 py-2 text-sm text-gray-900\">" + slot.timeSlot + "</td>" +
                    "<td class=\"px-2 py-2 text-right font-bold text-sm text-gray-900\">" + formatCurrency(slot.sales) + "</td>" +
                    "<td class=\"px-2 py-2 text-right text-sm text-gray-600\">" + slot.orders + "건</td>" +
                    "</tr>";
            }).join("");

            const dateTableRows = topDates.map(date => {
                const badge = date.rank === 1 ? "🥇" : (date.rank === 2 ? "🥈" : (date.rank === 3 ? "🥉" : date.rank));
                return "<tr class=\"border-b border-gray-100 hover:bg-gray-50\">" +
                    "<td class=\"px-2 py-2\">" +
                    "<span class=\"inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FFD100]/20 text-sm font-bold\">" + badge + "</span>" +
                    "</td>" +
                    "<td class=\"px-2 py-2 text-xs text-gray-900\">" + date.date + "</td>" +
                    "<td class=\"px-2 py-2 font-semibold text-sm text-gray-900\">" + date.day + "</td>" +
                    "<td class=\"px-2 py-2 text-right font-bold text-sm text-gray-900\">" + formatCurrency(date.sales) + "</td>" +
                    "<td class=\"px-2 py-2 text-right text-sm text-gray-600\">" + date.orders + "건</td>" +
                    "<td class=\"px-2 py-2\">" +
                    "<span class=\"inline-block px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full\">" + date.note + "</span>" +
                    "</td>" +
                    "</tr>";
            }).join("");

            contentArea.innerHTML = 
                "<div class=\"grid grid-cols-1 lg:grid-cols-2 gap-6\">" +
                "<div class=\"bg-white rounded-lg border border-gray-200 p-4\">" +
                "<div class=\"flex items-center gap-2 mb-3\">" +
                "<i class=\"fas fa-clock w-4 h-4 text-[#00853D]\"></i>" +
                "<h2 class=\"text-base font-semibold text-gray-900\">최고 매출 요일/시간대 순위</h2>" +
                "<span class=\"ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium\">알바생 스케줄 참고</span>" +
                "</div>" +
                "<div class=\"overflow-x-auto\">" +
                "<table class=\"w-full\">" +
                "<thead class=\"bg-gray-50 border-b border-gray-200\">" +
                "<tr>" +
                "<th class=\"px-2 py-2 text-left text-xs font-semibold text-gray-900\">순위</th>" +
                "<th class=\"px-2 py-2 text-left text-xs font-semibold text-gray-900\">요일</th>" +
                "<th class=\"px-2 py-2 text-left text-xs font-semibold text-gray-900\">시간대</th>" +
                "<th class=\"px-2 py-2 text-right text-xs font-semibold text-gray-900\">매출액</th>" +
                "<th class=\"px-2 py-2 text-right text-xs font-semibold text-gray-900\">주문수</th>" +
                "</tr>" +
                "</thead>" +
                "<tbody class=\"divide-y divide-gray-200\">" + slotTableRows + "</tbody>" +
                "</table>" +
                "</div>" +
                "</div>" +
                "<div class=\"bg-white rounded-lg border border-gray-200 p-4\">" +
                "<div class=\"flex items-center gap-2 mb-3\">" +
                "<i class=\"fas fa-calendar w-4 h-4 text-[#FFD100]\"></i>" +
                "<h2 class=\"text-base font-semibold text-gray-900\">최고 매출일 Top 5</h2>" +
                "</div>" +
                "<div class=\"overflow-x-auto\">" +
                "<table class=\"w-full\">" +
                "<thead class=\"bg-gray-50 border-b border-gray-200\">" +
                "<tr>" +
                "<th class=\"px-2 py-2 text-left text-xs font-semibold text-gray-900\">순위</th>" +
                "<th class=\"px-2 py-2 text-left text-xs font-semibold text-gray-900\">날짜</th>" +
                "<th class=\"px-2 py-2 text-left text-xs font-semibold text-gray-900\">요일</th>" +
                "<th class=\"px-2 py-2 text-right text-xs font-semibold text-gray-900\">매출액</th>" +
                "<th class=\"px-2 py-2 text-right text-xs font-semibold text-gray-900\">주문수</th>" +
                "<th class=\"px-2 py-2 text-left text-xs font-semibold text-gray-900\">비고</th>" +
                "</tr>" +
                "</thead>" +
                "<tbody class=\"divide-y divide-gray-200\">" + dateTableRows + "</tbody>" +
                "</table>" +
                "</div>" +
                "</div>" +
                "</div>";
        }

        // 사이드바 토글
        function toggleSidebar() {
            const sidebar = document.getElementById("sidebar");
            const backdrop = document.getElementById("sidebarBackdrop");
            
            if (sidebar.classList.contains("-translate-x-full")) {
                sidebar.classList.remove("-translate-x-full");
                backdrop.classList.remove("hidden");
            } else {
                sidebar.classList.add("-translate-x-full");
                backdrop.classList.add("hidden");
            }
        }

        // 메뉴 토글
        function toggleMenu(button) {
            const submenu = button.nextElementSibling;
            const chevron = button.querySelector("i.fa-chevron-right") || button.querySelector("i.fa-chevron-down");
            
            submenu.classList.toggle("hidden");
            if (chevron) {
                if (submenu.classList.contains("hidden")) {
                    chevron.classList.remove("fa-chevron-down");
                    chevron.classList.add("fa-chevron-right");
                } else {
                    chevron.classList.add("fa-chevron-down");
                    chevron.classList.remove("fa-chevron-right");
                }
            }
        }

        // 사용자 메뉴 토글
        function toggleUserMenu() {
            const userMenu = document.getElementById("userMenu");
            userMenu.classList.toggle("hidden");
        }

        // 사용자 메뉴 외부 클릭시 닫기
        document.addEventListener("click", function(e) {
            const userMenuBtn = document.getElementById("userMenuBtn");
            const userMenu = document.getElementById("userMenu");
            
            if (!userMenuBtn.contains(e.target) && !userMenu.contains(e.target)) {
                userMenu.classList.add("hidden");
            }
        });

        // 사이드바 배경 클릭시 닫기
        document.getElementById("sidebarBackdrop").addEventListener("click", toggleSidebar);

        // 로그아웃 함수
        function logout() {
            alert("로그아웃 되었습니다.");
            window.location.href = "<%= request.getContextPath() %>/common/login.jsp";
        }

        // 초기 렌더링
        renderContent();
    </script>
</body>
</html>


