<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>배송 조회 - ZERO LOSS 본사 관리 시스템</title>
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
                        <h2 class="text-3xl font-bold text-gray-900">배송 조회</h2>
                        <p class="text-gray-500 mt-2">본사 물류창고를 떠난 차량의 실시간 위치와 도착 예정 시간을 확인하세요</p>
                    </div>

                    <!-- 통계 카드 -->
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        <div class="bg-white rounded-lg border border-gray-200 p-4">
                            <p class="text-xs text-gray-600">총 배송 건</p>
                            <p class="text-2xl font-bold text-gray-900 mt-2">8</p>
                        </div>
                        <div class="bg-white rounded-lg border border-gray-200 p-4">
                            <p class="text-xs text-gray-600">배송 중</p>
                            <p class="text-2xl font-bold text-blue-600 mt-2">3</p>
                        </div>
                        <div class="bg-white rounded-lg border border-gray-200 p-4">
                            <p class="text-xs text-gray-600">지연 건</p>
                            <p class="text-2xl font-bold text-red-600 mt-2">1</p>
                        </div>
                        <div class="bg-white rounded-lg border border-gray-200 p-4">
                            <p class="text-xs text-gray-600">완료 건</p>
                            <p class="text-2xl font-bold text-purple-600 mt-2">1</p>
                        </div>
                    </div>

                    <!-- 필터 영역 -->
                    <div class="bg-white rounded-lg border border-gray-200 p-6">
                        <div class="flex flex-col md:flex-row gap-4">
                            <input type="text" id="searchInput" placeholder="배송번호, 기사명, 지점명으로 검색..." onkeyup="applyFilters()" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                            <select id="regionFilter" onchange="applyFilters()" class="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                                <option value="">권역 선택</option>
                                <option value="서울/경기권">서울/경기권</option>
                                <option value="충청권">충청권</option>
                                <option value="경상권">경상권</option>
                                <option value="전라권">전라권</option>
                                <option value="강원권">강원권</option>
                            </select>
                            <select id="statusFilter" onchange="applyFilters()" class="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                                <option value="">상태 선택</option>
                                <option value="출고 대기">출고 대기</option>
                                <option value="배송 중">배송 중</option>
                                <option value="지점 도착">지점 도착</option>
                                <option value="입고 완료">입고 완료</option>
                            </select>
                        </div>
                    </div>

                    <!-- 배송 리스트 -->
                    <div id="deliveryList" class="space-y-3"></div>

                    <!-- 페이지네이션 -->
                    <div id="paginationArea" class="flex items-center justify-center gap-2"></div>

                </div>
            </main>
        </div>
    </div>

    <script>
        // Mock 배송 데이터
        const allDeliveries = [
            {
                id: "DEL001",
                deliveryNo: "DL-2026-0329-001",
                driver: "김배송",
                driverPhone: "010-1234-5678",
                vehicle: "12가3456 (2.5톤 냉장)",
                region: "서울/경기권",
                branches: ["강남본점", "홍대점", "신촌점"],
                status: "배송 중",
                currentLocation: "서울 강남구 테헤란로",
                eta: "오후 2시 30분",
                progress: 65,
                departureTime: "오전 9:00",
                itemCount: 45,
                isDelayed: false
            },
            {
                id: "DEL002",
                deliveryNo: "DL-2026-0329-002",
                driver: "이운송",
                driverPhone: "010-2345-6789",
                vehicle: "34나5678 (1톤 냉동)",
                region: "서울/경기권",
                branches: ["판교점", "수원점"],
                status: "배송 중",
                currentLocation: "경기 성남시 분당구",
                eta: "오후 3시 15분",
                progress: 80,
                departureTime: "오전 8:30",
                itemCount: 32,
                isDelayed: true,
                delayReason: "교통 체증"
            },
            {
                id: "DEL003",
                deliveryNo: "DL-2026-0329-003",
                driver: "박택배",
                driverPhone: "010-3456-7890",
                vehicle: "56다7890 (2.5톤 냉장)",
                region: "충청권",
                branches: ["대전점", "청주점", "천안점"],
                status: "출고 대기",
                currentLocation: "본사 물류창고",
                eta: "오후 4시 00분",
                progress: 0,
                departureTime: "오후 1:00 예정",
                itemCount: 58,
                isDelayed: false
            },
            {
                id: "DEL004",
                deliveryNo: "DL-2026-0329-004",
                driver: "최물류",
                driverPhone: "010-4567-8901",
                vehicle: "78라9012 (1톤 냉장)",
                region: "경상권",
                branches: ["부산해운대점", "대구동성로점"],
                status: "지점 도착",
                currentLocation: "부산 해운대구",
                eta: "도착 완료",
                progress: 100,
                departureTime: "오전 7:00",
                itemCount: 38,
                isDelayed: false
            },
            {
                id: "DEL005",
                deliveryNo: "DL-2026-0329-005",
                driver: "정배달",
                driverPhone: "010-5678-9012",
                vehicle: "90마1234 (2.5톤 냉동)",
                region: "전라권",
                branches: ["광주점", "전주점"],
                status: "입고 완료",
                currentLocation: "광주 서구",
                eta: "입고 완료",
                progress: 100,
                departureTime: "오전 6:30",
                itemCount: 42,
                isDelayed: false
            },
            {
                id: "DEL006",
                deliveryNo: "DL-2026-0329-006",
                driver: "한운반",
                driverPhone: "010-6789-0123",
                vehicle: "12바3456 (2.5톤 냉장)",
                region: "서울/경기권",
                branches: ["인천점", "부천점"],
                status: "배송 중",
                currentLocation: "인천 남동구",
                eta: "오후 2시 00분",
                progress: 55,
                departureTime: "오전 9:30",
                itemCount: 40,
                isDelayed: false
            },
            {
                id: "DEL007",
                deliveryNo: "DL-2026-0329-007",
                driver: "송물류",
                driverPhone: "010-7890-1234",
                vehicle: "34사5678 (1톤 냉동)",
                region: "강원권",
                branches: ["춘천점", "원주점"],
                status: "출고 대기",
                currentLocation: "본사 물류창고",
                eta: "오후 5시 00분",
                progress: 0,
                departureTime: "오후 2:00 예정",
                itemCount: 35,
                isDelayed: false
            },
            {
                id: "DEL008",
                deliveryNo: "DL-2026-0329-008",
                driver: "강배송",
                driverPhone: "010-8901-2345",
                vehicle: "56아7890 (2.5톤 냉장)",
                region: "경상권",
                branches: ["울산점", "창원점"],
                status: "배송 중",
                currentLocation: "울산 남구",
                eta: "오후 3시 30분",
                progress: 70,
                departureTime: "오전 8:00",
                itemCount: 48,
                isDelayed: false
            }
        ];

        let currentPage = 1;
        const itemsPerPage = 5;

        // 상태 색상 가져오기
        function getStatusColor(status) {
            const colors = {
                "출고 대기": "bg-gray-100 text-gray-800",
                "배송 중": "bg-blue-100 text-blue-800",
                "지점 도착": "bg-green-100 text-green-800",
                "입고 완료": "bg-purple-100 text-purple-800"
            };
            return colors[status] || "bg-gray-100 text-gray-800";
        }

        // 필터 적용
        function applyFilters() {
            currentPage = 1;
            renderDeliveries();
        }

        // 배송 데이터 필터링
        function getFilteredDeliveries() {
            const searchTerm = document.getElementById("searchInput").value.toLowerCase();
            const regionFilter = document.getElementById("regionFilter").value;
            const statusFilter = document.getElementById("statusFilter").value;

            return allDeliveries.filter(delivery => {
                const matchesSearch = 
                    delivery.deliveryNo.toLowerCase().includes(searchTerm) ||
                    delivery.driver.toLowerCase().includes(searchTerm) ||
                    delivery.branches.some(b => b.toLowerCase().includes(searchTerm));
                const matchesRegion = !regionFilter || delivery.region === regionFilter;
                const matchesStatus = !statusFilter || delivery.status === statusFilter;
                return matchesSearch && matchesRegion && matchesStatus;
            });
        }

        // 배송 카드 렌더링
        function renderDeliveries() {
            const filtered = getFilteredDeliveries();
            const totalPages = Math.ceil(filtered.length / itemsPerPage);
            const startIdx = (currentPage - 1) * itemsPerPage;
            const paginatedDeliveries = filtered.slice(startIdx, startIdx + itemsPerPage);

            const listHtml = paginatedDeliveries.map(function(delivery) {
                const borderClass = delivery.isDelayed ? 'border-2 border-red-500 bg-red-50' : 'border-gray-200';
                const delayedIcon = delivery.isDelayed ? '<i class="fas fa-exclamation-triangle w-4 h-4 text-red-600"></i>' : '';
                const etaColor = delivery.isDelayed ? 'text-red-600' : 'text-blue-600';
                const statusColor = getStatusColor(delivery.status);
                const delayReason = delivery.isDelayed && delivery.delayReason ? '<span class="ml-2 text-red-600">(' + delivery.delayReason + ')</span>' : '';
                const branchesHtml = delivery.branches.map(function(branch) { 
                    return '<span class="inline-block px-2 py-0.5 text-xs border border-gray-300 rounded-lg">' + branch + '</span>'; 
                }).join('');

                return '<div class="bg-white rounded-lg border ' + borderClass + ' p-4">' +
                    '<div class="space-y-3">' +
                    '<div class="flex items-start justify-between">' +
                    '<div class="flex items-center gap-2">' +
                    '<div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">' +
                    '<i class="fas fa-truck w-5 h-5 text-blue-600"></i>' +
                    '</div>' +
                    '<div>' +
                    '<div class="flex items-center gap-2">' +
                    '<h3 class="font-bold text-base text-gray-900">' + delivery.deliveryNo + '</h3>' +
                    delayedIcon +
                    '</div>' +
                    '<p class="text-xs text-gray-500">' + delivery.region + '</p>' +
                    '</div>' +
                    '</div>' +
                    '<span class="inline-block px-4 py-1.5 rounded-lg font-semibold text-base ' + statusColor + '">' + delivery.status + '</span>' +
                    '</div>' +
                    '<div class="grid grid-cols-2 md:grid-cols-4 gap-3">' +
                    '<div>' +
                    '<p class="text-xs text-gray-500 mb-1">배송 기사</p>' +
                    '<p class="font-medium text-sm text-gray-900">' + delivery.driver + '</p>' +
                    '<div class="flex items-center gap-1 text-xs text-gray-600 mt-0.5">' +
                    '<i class="fas fa-phone w-3 h-3"></i>' +
                    delivery.driverPhone +
                    '</div>' +
                    '</div>' +
                    '<div>' +
                    '<p class="text-xs text-gray-500 mb-1">차량</p>' +
                    '<p class="font-medium text-sm text-gray-900">' + delivery.vehicle + '</p>' +
                    '</div>' +
                    '<div>' +
                    '<p class="text-xs text-gray-500 mb-1">출고 시간</p>' +
                    '<p class="font-medium text-sm text-gray-900">' + delivery.departureTime + '</p>' +
                    '</div>' +
                    '<div>' +
                    '<p class="text-xs text-gray-500 mb-1">도착 예정</p>' +
                    '<p class="font-bold text-sm ' + etaColor + '">' + delivery.eta + '</p>' +
                    '</div>' +
                    '</div>' +
                    '<div class="flex items-center gap-2 text-sm">' +
                    '<i class="fas fa-map-pin w-4 h-4 text-gray-400"></i>' +
                    '<span class="text-gray-600">현재 위치:</span>' +
                    '<span class="font-medium text-gray-900">' + delivery.currentLocation + '</span>' +
                    delayReason +
                    '</div>' +
                    '<div>' +
                    '<p class="text-xs text-gray-500 mb-1.5">배송 지점 (' + delivery.branches.length + ')</p>' +
                    '<div class="flex flex-wrap gap-1.5">' +
                    branchesHtml +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }).join('');

            document.getElementById("deliveryList").innerHTML = listHtml || 
                '<div class="bg-white rounded-lg border border-gray-200 p-12 text-center text-gray-500"><i class="fas fa-truck w-12 h-12 mx-auto mb-4 text-gray-400"></i><p>검색 결과가 없습니다.</p></div>';

            // 페이지네이션 렌더링
            renderPagination(totalPages);
        }

        // 페이지네이션 렌더링
        function renderPagination(totalPages) {
            if (totalPages === 0) {
                document.getElementById("paginationArea").innerHTML = '';
                return;
            }

            const maxVisiblePages = 5;
            let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            if (endPage - startPage < maxVisiblePages - 1) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }

            let html = '<button onclick="changePage(' + Math.max(1, currentPage - 1) + ')" ' + (currentPage === 1 ? 'disabled' : '') + ' class="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"><i class="fas fa-chevron-left w-4 h-4"></i></button>';

            if (startPage > 1) {
                html += '<button onclick="changePage(1)" class="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">1</button>';
                if (startPage > 2) html += '<span class="px-2">...</span>';
            }

            for (let i = startPage; i <= endPage; i++) {
                html += '<button onclick="changePage(' + i + ')" class="px-3 py-2 rounded-lg border transition-all ' + 
                    (currentPage === i ? 'bg-[#00853D] text-white border-[#00853D]' : 'border-gray-300 hover:bg-gray-100') + '">' + i + '</button>';
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) html += '<span class="px-2">...</span>';
                html += '<button onclick="changePage(' + totalPages + ')" class="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">' + totalPages + '</button>';
            }

            html += '<button onclick="changePage(' + Math.min(totalPages, currentPage + 1) + ')" ' + (currentPage === totalPages ? 'disabled' : '') + ' class="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"><i class="fas fa-chevron-right w-4 h-4"></i></button>';

            document.getElementById("paginationArea").innerHTML = html;
        }

        // 페이지 변경
        function changePage(page) {
            currentPage = page;
            renderDeliveries();
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
        renderDeliveries();
    </script>
</body>
</html>


