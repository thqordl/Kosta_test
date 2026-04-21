<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>직영점 매출 조회 - ZERO LOSS 본사 관리 시스템</title>
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
                        <h2 class="text-3xl font-bold text-gray-900">매출 상세 조회</h2>
                        <p class="text-gray-500 mt-1">다양한 조건으로 매출을 상세하게 분석하세요</p>
                    </div>

                    <!-- 필터 카드 -->
                    <div class="bg-white rounded-lg border border-gray-200 p-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <!-- 조회 유형 -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">조회 유형</label>
                                <select id="viewType" onchange="handleViewTypeChange()" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                                    <option value="period">기간별</option>
                                    <option value="branch">지점별</option>
                                    <option value="menu">메뉴별</option>
                                    <option value="hourly">시간대별</option>
                                    <option value="daily">날짜별</option>
                                </select>
                            </div>

                            <!-- 기간 -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">기간</label>
                                <select id="dateRange" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                                    <option value="today">오늘</option>
                                    <option value="week">이번 주</option>
                                    <option value="month" selected>이번 달</option>
                                    <option value="quarter">이번 분기</option>
                                    <option value="year">올해</option>
                                    <option value="custom">직접 선택</option>
                                </select>
                            </div>

                            <!-- 지점 -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">지점</label>
                                <select id="branchFilter" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                                    <option value="all">전체 지점</option>
                                    <option value="gangnam">강남지점</option>
                                    <option value="seocho">서초지점</option>
                                    <option value="songpa">송파지점</option>
                                    <option value="jongno">종로지점</option>
                                    <option value="mapo">마포지점</option>
                                </select>
                            </div>

                            <!-- 메뉴 -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">메뉴</label>
                                <select id="menuFilter" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                                    <option value="all">전체 메뉴</option>
                                    <option value="burger1">시그니처 버거</option>
                                    <option value="burger2">치즈 버거</option>
                                    <option value="chicken1">치킨 샌드위치</option>
                                    <option value="side1">감자튀김 세트</option>
                                    <option value="drink1">아이스 아메리카노</option>
                                </select>
                            </div>
                        </div>

                        <div class="mt-4 flex gap-2">
                            <button onclick="handleSearch()" class="px-6 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F] transition-colors font-medium">
                                <i class="fas fa-filter mr-2"></i>필터 적용
                            </button>
                            <button onclick="handleDownload()" class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                                <i class="fas fa-download mr-2"></i>엑셀 다운로드
                            </button>
                        </div>
                    </div>

                    <!-- 요약 통계 카드 -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="bg-white rounded-lg border border-gray-200 p-6">
                            <div class="text-sm text-gray-500">총 매출</div>
                            <div class="text-2xl font-bold mt-1">₩156,700,000</div>
                            <div class="text-sm text-green-600 mt-1"><i class="fas fa-arrow-up mr-1"></i>12.3%</div>
                        </div>
                        <div class="bg-white rounded-lg border border-gray-200 p-6">
                            <div class="text-sm text-gray-500">총 주문 건수</div>
                            <div class="text-2xl font-bold mt-1">4,264건</div>
                            <div class="text-sm text-green-600 mt-1"><i class="fas fa-arrow-up mr-1"></i>8.7%</div>
                        </div>
                        <div class="bg-white rounded-lg border border-gray-200 p-6">
                            <div class="text-sm text-gray-500">평균 주문액</div>
                            <div class="text-2xl font-bold mt-1">₩36,750</div>
                            <div class="text-sm text-green-600 mt-1"><i class="fas fa-arrow-up mr-1"></i>3.2%</div>
                        </div>
                        <div class="bg-white rounded-lg border border-gray-200 p-6">
                            <div class="text-sm text-gray-500">활성 지점 수</div>
                            <div class="text-2xl font-bold mt-1">5개</div>
                            <div class="text-sm text-gray-600 mt-1">전체 지점</div>
                        </div>
                    </div>

                    <!-- 콘텐츠 영역 -->
                    <div id="contentArea">
                        <!-- 기간별 매출 (기본 뷰) -->
                        <div class="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 class="text-lg font-semibold text-gray-900 mb-4">기간별 매출 추이</h3>
                            <div class="h-96 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
                                <div class="text-center">
                                    <i class="fas fa-chart-line w-12 h-12 text-gray-400 mx-auto mb-2"></i>
                                    <p class="text-gray-500">차트 영역 (Recharts 라이브러리 사용 시)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 상세 정보 -->
                    <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div class="flex items-center gap-2">
                            <i class="fas fa-info-circle w-5 h-5 text-blue-600"></i>
                            <p class="text-sm text-blue-900">
                                <span class="font-semibold">직영점 매출 조회</span>는 다양한 조건으로 매출을 상세하게 분석합니다. 조회 유형(기간/지점/메뉴/시간대/날짜)과 기간을 선택하여 필요한 데이터를 조회하세요.
                            </p>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    </div>

    <script>
        // Mock 데이터
        const periodData = [
            { period: "1주차", sales: 38500000, orders: 1045 },
            { period: "2주차", sales: 41200000, orders: 1123 },
            { period: "3주차", sales: 39800000, orders: 1087 },
            { period: "4주차", sales: 42100000, orders: 1156 }
        ];

        const branchData = [
            { branch: "강남지점", sales: 45600000, orders: 1245, avgOrder: 36627 },
            { branch: "서초지점", sales: 38900000, orders: 1087, avgOrder: 35793 },
            { branch: "송파지점", sales: 42300000, orders: 1156, avgOrder: 36591 },
            { branch: "종로지점", sales: 35200000, orders: 978, avgOrder: 35991 },
            { branch: "마포지점", sales: 39800000, orders: 1098, avgOrder: 36248 }
        ];

        const menuData = [
            { name: "시그니처 버거", sales: 48500000, percentage: 31 },
            { name: "치킨 샌드위치", sales: 32400000, percentage: 21 },
            { name: "감자튀김 세트", sales: 28600000, percentage: 18 },
            { name: "아이스 아메리카노", sales: 24800000, percentage: 16 },
            { name: "콤보 세트", sales: 21500000, percentage: 14 }
        ];

        const hourlyData = [
            { time: "06-09시", sales: 4200000, orders: 145 },
            { time: "09-12시", sales: 12800000, orders: 378 },
            { time: "12-15시", sales: 28500000, orders: 756 },
            { time: "15-18시", sales: 16700000, orders: 445 },
            { time: "18-21시", sales: 24300000, orders: 623 },
            { time: "21-24시", sales: 9200000, orders: 234 }
        ];

        const dailyData = [
            { date: "3/22", sales: 15200000, orders: 412 },
            { date: "3/23", sales: 16800000, orders: 445 },
            { date: "3/24", sales: 15900000, orders: 428 },
            { date: "3/25", sales: 17500000, orders: 467 },
            { date: "3/26", sales: 18200000, orders: 489 },
            { date: "3/27", sales: 16900000, orders: 451 },
            { date: "3/28", sales: 17100000, orders: 458 }
        ];

        // 조회 유형 변경
        function handleViewTypeChange() {
            const viewType = document.getElementById("viewType").value;
            renderContent(viewType);
        }

        // 콘텐츠 렌더링
        function renderContent(viewType) {
            const contentArea = document.getElementById("contentArea");
            let html = "";

            switch (viewType) {
                case "period":
                    html = renderPeriodView();
                    break;
                case "branch":
                    html = renderBranchView();
                    break;
                case "menu":
                    html = renderMenuView();
                    break;
                case "hourly":
                    html = renderHourlyView();
                    break;
                case "daily":
                    html = renderDailyView();
                    break;
            }

            contentArea.innerHTML = html;
        }

        // 기간별 뷰
        function renderPeriodView() {
            let tableRows = "";
            for (let i = 0; i < periodData.length; i++) {
                const row = periodData[i];
                tableRows += "<tr class=\"border-b border-gray-100 hover:bg-gray-50\">";
                tableRows += "<td class=\"py-3 px-4\">" + row.period + "</td>";
                tableRows += "<td class=\"py-3 px-4 text-right font-semibold\">₩" + row.sales.toLocaleString() + "</td>";
                tableRows += "<td class=\"py-3 px-4 text-right\">" + row.orders.toLocaleString() + "건</td>";
                tableRows += "</tr>";
            }

            return "<div class=\"bg-white rounded-lg border border-gray-200 p-6\"><h3 class=\"text-lg font-semibold text-gray-900 mb-4\">기간별 매출 추이</h3><div class=\"h-96 bg-gray-50 rounded-lg flex items-center justify-center mb-6\"><div class=\"text-center\"><i class=\"fas fa-chart-line w-12 h-12 text-gray-400 mx-auto mb-2\"></i><p class=\"text-gray-500\">꺾은선 차트 (기간별 매출액)</p></div></div><div class=\"overflow-x-auto\"><table class=\"w-full\"><thead><tr class=\"border-b border-gray-200 bg-gray-50\"><th class=\"text-left py-3 px-4 text-sm font-semibold\">기간</th><th class=\"text-right py-3 px-4 text-sm font-semibold\">매출액</th><th class=\"text-right py-3 px-4 text-sm font-semibold\">주문 건수</th></tr></thead><tbody>" + tableRows + "</tbody></table></div></div>";
        }

        // 지점별 뷰
        function renderBranchView() {
            let tableRows = "";
            for (let i = 0; i < branchData.length; i++) {
                const row = branchData[i];
                tableRows += "<tr class=\"border-b border-gray-100 hover:bg-gray-50\">";
                tableRows += "<td class=\"py-3 px-4 font-medium\">" + row.branch + "</td>";
                tableRows += "<td class=\"py-3 px-4 text-right font-semibold\">₩" + row.sales.toLocaleString() + "</td>";
                tableRows += "<td class=\"py-3 px-4 text-right\">" + row.orders.toLocaleString() + "건</td>";
                tableRows += "<td class=\"py-3 px-4 text-right\">₩" + row.avgOrder.toLocaleString() + "</td>";
                tableRows += "</tr>";
            }

            return "<div class=\"bg-white rounded-lg border border-gray-200 p-6\"><h3 class=\"text-lg font-semibold text-gray-900 mb-4\">지점별 매출 현황</h3><div class=\"h-96 bg-gray-50 rounded-lg flex items-center justify-center mb-6\"><div class=\"text-center\"><i class=\"fas fa-chart-bar w-12 h-12 text-gray-400 mx-auto mb-2\"></i><p class=\"text-gray-500\">막대 차트 (지점별 매출액)</p></div></div><div class=\"overflow-x-auto\"><table class=\"w-full\"><thead><tr class=\"border-b border-gray-200 bg-gray-50\"><th class=\"text-left py-3 px-4 text-sm font-semibold\">지점명</th><th class=\"text-right py-3 px-4 text-sm font-semibold\">총 매출</th><th class=\"text-right py-3 px-4 text-sm font-semibold\">주문 건수</th><th class=\"text-right py-3 px-4 text-sm font-semibold\">평균 주문액</th></tr></thead><tbody>" + tableRows + "</tbody></table></div></div>";
        }

        // 메뉴별 뷰
        function renderMenuView() {
            let tableRows = "";
            let legendHtml = "";
            for (let i = 0; i < menuData.length; i++) {
                const row = menuData[i];
                tableRows += "<tr class=\"border-b border-gray-100 hover:bg-gray-50\">";
                tableRows += "<td class=\"py-3 px-4 font-medium\">" + row.name + "</td>";
                tableRows += "<td class=\"py-3 px-4 text-right font-semibold\">₩" + row.sales.toLocaleString() + "</td>";
                tableRows += "<td class=\"py-3 px-4\"><div class=\"w-full bg-gray-200 rounded-full h-2\"><div class=\"h-2 rounded-full bg-[#00853D]\" style=\"width:" + row.percentage + "%\"></div></div></td>";
                tableRows += "<td class=\"py-3 px-4 text-right\">" + row.percentage + "%</td>";
                tableRows += "</tr>";
            }

            return "<div class=\"grid grid-cols-1 lg:grid-cols-2 gap-6\"><div class=\"bg-white rounded-lg border border-gray-200 p-6\"><h3 class=\"text-lg font-semibold text-gray-900 mb-4\">메뉴별 매출 비중</h3><div class=\"h-96 bg-gray-50 rounded-lg flex items-center justify-center\"><div class=\"text-center\"><i class=\"fas fa-chart-pie w-12 h-12 text-gray-400 mx-auto mb-2\"></i><p class=\"text-gray-500\">원형 차트 (메뉴별 비율)</p></div></div></div><div class=\"bg-white rounded-lg border border-gray-200 p-6\"><h3 class=\"text-lg font-semibold text-gray-900 mb-4\">메뉴별 매출 상세</h3><div class=\"overflow-x-auto\"><table class=\"w-full\"><thead><tr class=\"border-b border-gray-200 bg-gray-50\"><th class=\"text-left py-3 px-4 text-sm font-semibold\">메뉴명</th><th class=\"text-right py-3 px-4 text-sm font-semibold\">매출액</th><th class=\"text-center py-3 px-4 text-sm font-semibold\">비중</th><th class=\"text-right py-3 px-4 text-sm font-semibold\">비율</th></tr></thead><tbody>" + tableRows + "</tbody></table></div></div></div>";
        }

        // 시간대별 뷰
        function renderHourlyView() {
            let tableRows = "";
            let cardRows = "";
            for (let i = 0; i < hourlyData.length; i++) {
                const row = hourlyData[i];
                tableRows += "<tr class=\"border-b border-gray-100 hover:bg-gray-50\">";
                tableRows += "<td class=\"py-3 px-4 font-medium\">" + row.time + "</td>";
                tableRows += "<td class=\"py-3 px-4 text-right font-semibold\">₩" + row.sales.toLocaleString() + "</td>";
                tableRows += "<td class=\"py-3 px-4 text-right\">" + row.orders.toLocaleString() + "건</td>";
                tableRows += "</tr>";

                cardRows += "<div class=\"border border-gray-200 rounded-lg p-4\">";
                cardRows += "<div class=\"text-sm text-gray-500\">" + row.time + "</div>";
                cardRows += "<div class=\"text-xl font-bold mt-1\">₩" + (row.sales / 1000000).toFixed(1) + "M</div>";
                cardRows += "<div class=\"text-sm text-gray-600 mt-1\">" + row.orders.toLocaleString() + "건</div>";
                cardRows += "</div>";
            }

            return "<div class=\"bg-white rounded-lg border border-gray-200 p-6\"><h3 class=\"text-lg font-semibold text-gray-900 mb-4\">시간대별 매출 분석</h3><div class=\"h-96 bg-gray-50 rounded-lg flex items-center justify-center mb-6\"><div class=\"text-center\"><i class=\"fas fa-chart-bar w-12 h-12 text-gray-400 mx-auto mb-2\"></i><p class=\"text-gray-500\">막대 차트 (시간대별 매출액)</p></div></div><div class=\"grid grid-cols-2 md:grid-cols-3 gap-4 mb-6\">" + cardRows + "</div><div class=\"overflow-x-auto\"><table class=\"w-full\"><thead><tr class=\"border-b border-gray-200 bg-gray-50\"><th class=\"text-left py-3 px-4 text-sm font-semibold\">시간대</th><th class=\"text-right py-3 px-4 text-sm font-semibold\">매출액</th><th class=\"text-right py-3 px-4 text-sm font-semibold\">주문 건수</th></tr></thead><tbody>" + tableRows + "</tbody></table></div></div>";
        }

        // 날짜별 뷰
        function renderDailyView() {
            let tableRows = "";
            for (let i = 0; i < dailyData.length; i++) {
                const row = dailyData[i];
                tableRows += "<tr class=\"border-b border-gray-100 hover:bg-gray-50\">";
                tableRows += "<td class=\"py-3 px-4 font-medium\">" + row.date + "</td>";
                tableRows += "<td class=\"py-3 px-4 text-right font-semibold\">₩" + row.sales.toLocaleString() + "</td>";
                tableRows += "<td class=\"py-3 px-4 text-right\">" + row.orders.toLocaleString() + "건</td>";
                tableRows += "</tr>";
            }

            return "<div class=\"bg-white rounded-lg border border-gray-200 p-6\"><h3 class=\"text-lg font-semibold text-gray-900 mb-4\">날짜별 매출 추이</h3><div class=\"h-96 bg-gray-50 rounded-lg flex items-center justify-center mb-6\"><div class=\"text-center\"><i class=\"fas fa-chart-line w-12 h-12 text-gray-400 mx-auto mb-2\"></i><p class=\"text-gray-500\">꺾은선 차트 (날짜별 매출액 + 주문수)</p></div></div><div class=\"overflow-x-auto\"><table class=\"w-full\"><thead><tr class=\"border-b border-gray-200 bg-gray-50\"><th class=\"text-left py-3 px-4 text-sm font-semibold\">날짜</th><th class=\"text-right py-3 px-4 text-sm font-semibold\">매출액</th><th class=\"text-right py-3 px-4 text-sm font-semibold\">주문 건수</th></tr></thead><tbody>" + tableRows + "</tbody></table></div></div>";
        }

        // 필터 적용
        function handleSearch() {
            alert("필터가 적용되었습니다.");
        }

        // 엑셀 다운로드
        function handleDownload() {
            alert("엑셀 다운로드가 시작되었습니다.");
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
    </script>
</body>
</html>


