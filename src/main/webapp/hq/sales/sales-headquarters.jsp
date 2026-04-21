<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>본사 매출 조회 - ZERO LOSS 본사 관리 시스템</title>
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
                        <h2 class="text-3xl font-bold text-gray-900">본사 매출 조회</h2>
                        <p class="text-gray-500 mt-1">본사 전체 매출 및 수익성을 분석하세요</p>
                    </div>

                    <!-- 검색 영역 -->
                    <div class="bg-white rounded-lg border border-gray-200 p-4">
                        <div class="flex flex-wrap items-center gap-3">
                            <!-- 필터 타입 버튼 -->
                            <div class="flex gap-2">
                                <button onclick="setFilterType('date')" class="px-3 py-2 rounded-lg border text-sm font-medium transition-all filterBtn" data-filter="date">
                                    날짜별
                                </button>
                                <button onclick="setFilterType('period')" class="px-3 py-2 rounded-lg border text-sm font-medium transition-all filterBtn" data-filter="period">
                                    기간별
                                </button>
                                <button onclick="setFilterType('menu')" class="px-3 py-2 rounded-lg border text-sm font-medium transition-all filterBtn" data-filter="menu">
                                    메뉴별
                                </button>
                            </div>

                            <!-- Divider -->
                            <div class="h-8 w-px bg-gray-300 hidden sm:block"></div>

                            <!-- 필터 입력 -->
                            <div class="flex gap-2 flex-wrap" id="filterInputs"></div>

                            <!-- 액션 버튼 -->
                            <div class="flex gap-2 ml-auto">
                                <button onclick="handleSearch()" class="flex items-center gap-2 px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F] transition-colors font-medium text-sm">
                                    <i class="fas fa-search"></i>
                                    검색
                                </button>
                                <button id="resetBtn" onclick="handleReset()" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm hidden">
                                    초기화
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- 요약 통계 -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <!-- 총 매출액 -->
                        <div class="bg-white rounded-lg border border-gray-200 p-5">
                            <div class="flex items-center gap-3 mb-2">
                                <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <i class="fas fa-dollar-sign w-5 h-5 text-blue-600"></i>
                                </div>
                            </div>
                            <p class="text-2xl font-bold text-gray-900">125.4M</p>
                            <p class="text-sm text-gray-500 mt-1">총 매출액</p>
                        </div>

                        <!-- 순이익 -->
                        <div class="bg-white rounded-lg border border-gray-200 p-5">
                            <div class="flex items-center gap-3 mb-2">
                                <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                    <i class="fas fa-chart-line w-5 h-5 text-green-600"></i>
                                </div>
                            </div>
                            <p class="text-2xl font-bold text-gray-900">48.2M</p>
                            <p class="text-sm text-gray-500 mt-1">순이익</p>
                        </div>

                        <!-- 이익률 -->
                        <div class="bg-white rounded-lg border border-gray-200 p-5">
                            <div class="flex items-center gap-3 mb-2">
                                <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <i class="fas fa-building w-5 h-5 text-purple-600"></i>
                                </div>
                            </div>
                            <p class="text-2xl font-bold text-gray-900">38.4%</p>
                            <p class="text-sm text-gray-500 mt-1">이익률</p>
                        </div>

                        <!-- 총 주문수 -->
                        <div class="bg-white rounded-lg border border-gray-200 p-5">
                            <div class="flex items-center gap-3 mb-2">
                                <div class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                                    <i class="fas fa-shopping-cart w-5 h-5 text-orange-600"></i>
                                </div>
                            </div>
                            <p class="text-2xl font-bold text-gray-900">8,234</p>
                            <p class="text-sm text-gray-500 mt-1">총 주문수</p>
                        </div>

                        <!-- 평균 주문액 -->
                        <div class="bg-white rounded-lg border border-gray-200 p-5">
                            <div class="flex items-center gap-3 mb-2">
                                <div class="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                                    <i class="fas fa-chart-line w-5 h-5 text-indigo-600"></i>
                                </div>
                            </div>
                            <p class="text-2xl font-bold text-gray-900">₩15,234</p>
                            <p class="text-sm text-gray-500 mt-1">평균 주문액</p>
                        </div>
                    </div>

                    <!-- 차트 영역 -->
                    <div class="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4" id="chartTitle">주간 본사 전체 매출 현황</h3>
                        <div id="chartPlaceholder" class="w-full h-96 flex items-center justify-center rounded-lg bg-gray-50 border border-gray-200">
                            <div class="text-center">
                                <i class="fas fa-chart-bar text-gray-300 text-4xl mb-2"></i>
                                <p class="text-gray-400">차트 영역</p>
                                <p class="text-sm text-gray-400 mt-1">(실제 환경에서는 Recharts로 렌더링)</p>
                            </div>
                        </div>
                    </div>

                    <!-- 상세 매출 내역 테이블 -->
                    <div id="dataTableSection" class="bg-white rounded-lg border border-gray-200 p-6 hidden">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">상세 매출 내역</h3>
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead class="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900">날짜</th>
                                        <th id="menuCol" class="px-4 py-3 text-left text-sm font-semibold text-gray-900 hidden">메뉴</th>
                                        <th class="px-4 py-3 text-right text-sm font-semibold text-gray-900">매출액</th>
                                        <th class="px-4 py-3 text-right text-sm font-semibold text-gray-900">순이익</th>
                                        <th class="px-4 py-3 text-right text-sm font-semibold text-gray-900">이익률</th>
                                        <th class="px-4 py-3 text-right text-sm font-semibold text-gray-900">주문수</th>
                                        <th class="px-4 py-3 text-right text-sm font-semibold text-gray-900">평균 주문액</th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody" class="divide-y divide-gray-200"></tbody>
                            </table>
                        </div>

                        <!-- 페이지네이션 -->
                        <div class="flex items-center justify-center gap-2 mt-6" id="paginationArea"></div>
                    </div>

                </div>
            </main>
        </div>
    </div>

    <script>
        // Mock 데이터
        const menuCategories = {
            "샌드위치": ["이탈리안 비엠티", "터키 베이컨 아보카도", "로티세리 치킨", "써브웨이 클럽", "스파이시 이탈리안"],
            "샐러드": ["터키 샐러드", "참치 샐러드", "치킨 샐러드", "베지 샐러드", "비엠티 샐러드"],
            "사이드": ["감자튀김", "치즈스틱", "쿠키", "음료", "칩"]
        };

        const todayStats = {
            totalSales: 125400000,
            totalOrders: 8234,
            avgOrderValue: 15234,
            totalProfit: 48210000,
            profitMargin: 38.4
        };

        let currentFilterType = 'date';
        let selectedDate = '2026-04-02';
        let startDate = '2026-03-26';
        let endDate = '2026-04-02';
        let selectedCategory = '샌드위치';
        let selectedMenu = '이탈리안 비엠티';
        let searched = false;
        let currentPage = 1;
        const itemsPerPage = 10;

        // 포맷 함수
        function formatCurrency(value) {
            return "₩" + value.toLocaleString();
        }

        // 필터 타입 설정
        function setFilterType(type) {
            currentFilterType = type;
            searched = false;
            currentPage = 1;
            document.querySelectorAll('.filterBtn').forEach(btn => {
                if (btn.dataset.filter === type) {
                    btn.classList.remove('border-gray-200', 'text-gray-700', 'hover:border-gray-300');
                    btn.classList.add('border-[#00853D]', 'bg-[#00853D]/5', 'text-[#00853D]');
                } else {
                    btn.classList.remove('border-[#00853D]', 'bg-[#00853D]/5', 'text-[#00853D]');
                    btn.classList.add('border-gray-200', 'text-gray-700', 'hover:border-gray-300');
                }
            });
            renderFilterInputs();
            updateChartTitle();
            document.getElementById("dataTableSection").classList.add("hidden");
            document.getElementById("resetBtn").classList.add("hidden");
        }

        // 필터 입력 렌더링
        function renderFilterInputs() {
            const container = document.getElementById("filterInputs");
            container.innerHTML = "";

            let html = "";
            if (currentFilterType === 'date') {
                html = "<input type='date' id='dateInput' value='" + selectedDate + "' onchange='selectedDate=this.value' class='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm'>";
            } else if (currentFilterType === 'period') {
                html = "<input type='date' id='startDateInput' value='" + startDate + "' onchange='startDate=this.value' class='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm'>" +
                       "<input type='date' id='endDateInput' value='" + endDate + "' onchange='endDate=this.value' class='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm'>";
            } else if (currentFilterType === 'menu') {
                const categories = Object.keys(menuCategories);
                html = "<select id='categorySelect' onchange='selectedCategory=this.value; selectedMenu=menuCategories[this.value][0]; renderFilterInputs();' class='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm'>";
                categories.forEach(cat => {
                    html += "<option value='" + cat + "' " + (cat === selectedCategory ? "selected" : "") + ">" + cat + "</option>";
                });
                html += "</select>";
                
                html += "<select id='menuSelect' onchange='selectedMenu=this.value' class='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm'>";
                menuCategories[selectedCategory].forEach(menu => {
                    html += "<option value='" + menu + "' " + (menu === selectedMenu ? "selected" : "") + ">" + menu + "</option>";
                });
                html += "</select>";
            }

            container.innerHTML = html;
        }

        // 차트 제목 업데이트
        function updateChartTitle() {
            const titleEl = document.getElementById("chartTitle");
            if (!searched) {
                titleEl.textContent = "주간 본사 전체 매출 현황";
            } else {
                if (currentFilterType === 'date') {
                    titleEl.textContent = selectedDate + " 기준 주간 본사 매출";
                } else if (currentFilterType === 'period') {
                    titleEl.textContent = startDate + " ~ " + endDate + " 기간별 본사 매출";
                } else if (currentFilterType === 'menu') {
                    titleEl.textContent = selectedCategory + " 카테고리 메뉴별 본사 매출";
                }
            }
        }

        // 검색 처리
        function handleSearch() {
            searched = true;
            currentPage = 1;
            document.getElementById("resetBtn").classList.remove("hidden");
            document.getElementById("dataTableSection").classList.remove("hidden");
            updateChartTitle();
            renderDataTable();
        }

        // 초기화
        function handleReset() {
            searched = false;
            currentPage = 1;
            selectedDate = '2026-04-02';
            startDate = '2026-03-26';
            endDate = '2026-04-02';
            selectedCategory = '샌드위치';
            selectedMenu = '이탈리안 비엠티';
            document.getElementById("resetBtn").classList.add("hidden");
            document.getElementById("dataTableSection").classList.add("hidden");
            renderFilterInputs();
            updateChartTitle();
        }

        // Mock 검색 결과 생성
        function generateSearchResults() {
            const base = [];
            for (let i = 0; i < 45; i++) {
                let dateStr = "2026-04-" + String((i % 30) + 1).padStart(2, '0');
                let sales = Math.floor(Math.random() * 20000000) + 100000000;
                let orders = Math.floor(Math.random() * 2000) + 6000;
                let profit = Math.floor(sales * 0.385);
                let margin = 38.5;
                let avgPrice = Math.floor(sales / orders);

                base.push({
                    id: "result-" + (i + 1),
                    date: dateStr,
                    menu: currentFilterType === 'menu' ? ['이탈리안 비엠티', '터키 샐러드', '치즈스틱'][i % 3] : '',
                    sales: sales,
                    profit: profit,
                    margin: margin,
                    orders: orders,
                    avgPrice: avgPrice
                });
            }
            return base;
        }

        // 데이터 테이블 렌더링
        function renderDataTable() {
            const results = generateSearchResults();
            const totalPages = Math.ceil(results.length / itemsPerPage);
            const startIdx = (currentPage - 1) * itemsPerPage;
            const paginatedResults = results.slice(startIdx, startIdx + itemsPerPage);

            const tbody = document.getElementById("tableBody");
            const menuCol = document.getElementById("menuCol");
            tbody.innerHTML = "";

            if (currentFilterType === 'menu') {
                menuCol.classList.remove("hidden");
            } else {
                menuCol.classList.add("hidden");
            }

            paginatedResults.forEach(result => {
                let row = "<tr class='hover:bg-gray-50'>";
                row += "<td class='px-4 py-3 text-sm text-gray-900'>" + result.date + "</td>";
                if (currentFilterType === 'menu') {
                    row += "<td class='px-4 py-3 text-sm text-gray-900'>" + result.menu + "</td>";
                }
                row += "<td class='px-4 py-3 text-sm text-right font-semibold text-gray-900'>" + formatCurrency(result.sales) + "</td>";
                row += "<td class='px-4 py-3 text-sm text-right text-green-600 font-semibold'>" + formatCurrency(result.profit) + "</td>";
                row += "<td class='px-4 py-3 text-sm text-right text-gray-900'>" + result.margin.toFixed(1) + "%</td>";
                row += "<td class='px-4 py-3 text-sm text-right text-gray-600'>" + result.orders.toLocaleString() + "건</td>";
                row += "<td class='px-4 py-3 text-sm text-right text-gray-600'>" + formatCurrency(result.avgPrice) + "</td>";
                row += "</tr>";
                tbody.innerHTML += row;
            });

            // 페이지네이션 렌더링
            renderPagination(totalPages);
        }

        // 페이지네이션 렌더링
        function renderPagination(totalPages) {
            const paginationArea = document.getElementById("paginationArea");
            paginationArea.innerHTML = "";

            const maxVisiblePages = 5;
            let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            if (endPage - startPage < maxVisiblePages - 1) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }

            // 이전 버튼
            let html = "<button onclick='changePage(" + Math.max(1, currentPage - 1) + ")' " + (currentPage === 1 ? "disabled" : "") + " class='p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'>";
            html += "<i class='fas fa-chevron-left w-4 h-4'></i></button>";

            if (startPage > 1) {
                html += "<button onclick='changePage(1)' class='px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100'>1</button>";
                if (startPage > 2) {
                    html += "<span class='px-2'>...</span>";
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                html += "<button onclick='changePage(" + i + ")' class=\"px-3 py-2 rounded-lg border transition-all " + 
                    (currentPage === i ? "bg-[#00853D] text-white border-[#00853D]" : "border-gray-300 hover:bg-gray-100") + 
                    "\">" + i + "</button>";
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    html += "<span class='px-2'>...</span>";
                }
                html += "<button onclick='changePage(" + totalPages + ")' class='px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100'>" + totalPages + "</button>";
            }

            // 다음 버튼
            html += "<button onclick='changePage(" + Math.min(totalPages, currentPage + 1) + ")' " + (currentPage === totalPages ? "disabled" : "") + " class='p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'>";
            html += "<i class='fas fa-chevron-right w-4 h-4'></i></button>";

            paginationArea.innerHTML = html;
        }

        // 페이지 변경
        function changePage(page) {
            currentPage = page;
            renderDataTable();
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

        // 외부 클릭시 메뉴 닫기
        document.addEventListener("click", function(e) {
            const userMenuBtn = document.getElementById("userMenuBtn");
            const userMenu = document.getElementById("userMenu");
            
            if (!userMenuBtn.contains(e.target) && !userMenu.contains(e.target)) {
                userMenu.classList.add("hidden");
            }
        });

        // 사이드바 배경 클릭시 닫기
        document.getElementById("sidebarBackdrop").addEventListener("click", toggleSidebar);

        // 로그아웃
        function logout() {
            alert("로그아웃 되었습니다.");
            window.location.href = "<%= request.getContextPath() %>/common/login.jsp";
        }

        // 초기화
        renderFilterInputs();
        setFilterType('date');
        document.querySelector('.filterBtn[data-filter="date"]').classList.add('border-[#00853D]', 'bg-[#00853D]/5', 'text-[#00853D]');
    </script>
</body>
</html>


