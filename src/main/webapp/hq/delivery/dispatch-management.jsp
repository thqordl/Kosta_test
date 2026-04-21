<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>배차 관리 - ZERO LOSS 본사 관리 시스템</title>
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
                        <h2 class="text-3xl font-bold text-gray-900">배차 관리</h2>
                        <p class="text-gray-500 mt-2">발주 승인 건을 권역별로 그룹화하고 기사와 차량을 배정하세요</p>
                    </div>

                    <!-- 권역 필터 및 배차 생성 버튼 -->
                    <div class="bg-white rounded-lg border border-gray-200 p-6">
                        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div class="flex gap-2 flex-wrap" id="regionButtons">
                                <!-- 동적 생성 -->
                            </div>
                            <button onclick="openDispatchModal()" class="px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F] transition-colors flex items-center gap-2 text-sm whitespace-nowrap">
                                <i class="fas fa-plus w-4 h-4"></i>
                                배차 생성
                            </button>
                        </div>
                    </div>

                    <!-- 배차 대기 발주 건 -->
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">배차 대기 발주 건</h3>
                        <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <!-- 테이블 헤더 -->
                            <div class="bg-gray-50 border-b border-gray-200">
                                <div class="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-semibold text-gray-700">
                                    <div class="col-span-2">발주 번호</div>
                                    <div class="col-span-2">지점명</div>
                                    <div class="col-span-2">권역</div>
                                    <div class="col-span-1 text-center">품목 수</div>
                                    <div class="col-span-1 text-center">중량</div>
                                    <div class="col-span-2">온도 조건</div>
                                    <div class="col-span-1 text-center">우선순위</div>
                                    <div class="col-span-1 text-center">액션</div>
                                </div>
                            </div>
                            <!-- 테이블 바디 -->
                            <div id="orderListBody" class="divide-y divide-gray-200">
                                <!-- 동적 생성 -->
                            </div>
                        </div>
                        <!-- 페이지네이션 -->
                        <div id="paginationArea" class="flex items-center justify-center gap-2 mt-6"></div>
                    </div>

                    <!-- 배차 완료 건 -->
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">배차 완료 건</h3>
                        <div id="dispatchListContainer" class="space-y-3">
                            <!-- 동적 생성 -->
                        </div>
                    </div>

                </div>
            </main>
        </div>
    </div>

    <!-- 배차 생성 모달 -->
    <div id="dispatchModal" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4">
            <!-- 모달 헤더 -->
            <div class="border-b border-gray-200 p-6">
                <h3 class="text-xl font-bold text-gray-900">배차 생성</h3>
                <p class="text-sm text-gray-500 mt-1">기사와 차량을 선택하여 배차를 생성합니다</p>
            </div>

            <!-- 모달 바디 -->
            <div class="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                <div>
                    <label class="block text-sm font-medium text-gray-900 mb-2">기사 선택</label>
                    <select id="driverSelect" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                        <option value="">기사를 선택하세요</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-900 mb-2">차량 선택</label>
                    <select id="vehicleSelect" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                        <option value="">차량을 선택하세요</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-900 mb-2">배차 건</label>
                    <div id="dispatchOrdersInfo" class="p-3 bg-blue-50 rounded-lg border border-blue-200 text-sm text-blue-900">
                        선택된 발주가 없습니다
                    </div>
                </div>
            </div>

            <!-- 모달 푸터 -->
            <div class="border-t border-gray-200 p-6 flex gap-2 justify-end bg-gray-50">
                <button onclick="closeDispatchModal()" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm font-medium text-gray-700">
                    취소
                </button>
                <button onclick="createDispatch()" class="px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F] text-sm font-medium">
                    배차 생성
                </button>
            </div>
        </div>
    </div>

    <script>
        // Mock 데이터
        const mockOrders = [
            { id: "ORD001", orderNo: "PO-2026-0329-001", branch: "강남본점", region: "서울/경기권", itemCount: 25, weight: 350, requiresCold: true, requiresFrozen: false, priority: "일반", approvedAt: "2026-03-29 09:00" },
            { id: "ORD002", orderNo: "PO-2026-0329-002", branch: "홍대점", region: "서울/경기권", itemCount: 18, weight: 280, requiresCold: true, requiresFrozen: false, priority: "일반", approvedAt: "2026-03-29 09:15" },
            { id: "ORD003", orderNo: "PO-2026-0329-003", branch: "판교점", region: "서울/경기권", itemCount: 22, weight: 310, requiresCold: false, requiresFrozen: true, priority: "긴급", approvedAt: "2026-03-29 09:30" },
            { id: "ORD004", orderNo: "PO-2026-0329-004", branch: "대전점", region: "충청권", itemCount: 30, weight: 420, requiresCold: true, requiresFrozen: true, priority: "일반", approvedAt: "2026-03-29 09:45" },
            { id: "ORD005", orderNo: "PO-2026-0329-005", branch: "신촌점", region: "서울/경기권", itemCount: 20, weight: 290, requiresCold: true, requiresFrozen: false, priority: "일반", approvedAt: "2026-03-29 10:00" },
            { id: "ORD006", orderNo: "PO-2026-0329-006", branch: "인천점", region: "서울/경기권", itemCount: 28, weight: 380, requiresCold: false, requiresFrozen: true, priority: "일반", approvedAt: "2026-03-29 10:15" },
            { id: "ORD007", orderNo: "PO-2026-0329-007", branch: "부산점", region: "경상권", itemCount: 35, weight: 450, requiresCold: true, requiresFrozen: true, priority: "긴급", approvedAt: "2026-03-29 10:30" },
            { id: "ORD008", orderNo: "PO-2026-0329-008", branch: "광주점", region: "전라권", itemCount: 26, weight: 340, requiresCold: true, requiresFrozen: false, priority: "일반", approvedAt: "2026-03-29 10:45" },
            { id: "ORD009", orderNo: "PO-2026-0329-009", branch: "수원점", region: "서울/경기권", itemCount: 24, weight: 330, requiresCold: true, requiresFrozen: false, priority: "일반", approvedAt: "2026-03-29 11:00" },
            { id: "ORD010", orderNo: "PO-2026-0329-010", branch: "청주점", region: "충청권", itemCount: 19, weight: 270, requiresCold: false, requiresFrozen: true, priority: "일반", approvedAt: "2026-03-29 11:15" }
        ];

        const mockDrivers = [
            { id: "DRV001", name: "김배송", phone: "010-1234-5678", region: "서울/경기권", status: "대기" },
            { id: "DRV002", name: "이운송", phone: "010-2345-6789", region: "서울/경기권", status: "배송 중" },
            { id: "DRV003", name: "박택배", phone: "010-3456-7890", region: "충청권", status: "대기" }
        ];

        const mockVehicles = [
            { id: "VEH001", plateNo: "12가3456", type: "2.5톤", feature: "냉장", status: "가용" },
            { id: "VEH002", plateNo: "34나5678", type: "1톤", feature: "냉동", status: "배송 중" },
            { id: "VEH003", plateNo: "56다7890", type: "2.5톤", feature: "냉장/냉동", status: "가용" }
        ];

        const mockDispatches = [
            { id: "DISP001", dispatchNo: "DS-2026-0329-001", region: "서울/경기권", driver: mockDrivers[0], vehicle: mockVehicles[0], orders: [mockOrders[0], mockOrders[1]], totalWeight: 630, totalItems: 43, status: "출고 지시서 발행" }
        ];

        const regions = ["전체", "서울/경기권", "충청권", "경상권", "전라권", "강원권"];
        let selectedRegion = "전체";
        let currentPage = 1;
        const itemsPerPage = 8;

        // 상태 색상
        function getPriorityColor(priority) {
            return priority === "긴급" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800";
        }

        // 필터링된 발주 조회
        function getFilteredOrders() {
            return mockOrders.filter(function(order) {
                return selectedRegion === "전체" || order.region === selectedRegion;
            });
        }

        // 발주 목록 렌더링
        function renderOrders() {
            var filtered = getFilteredOrders();
            var totalPages = Math.ceil(filtered.length / itemsPerPage);
            var startIdx = (currentPage - 1) * itemsPerPage;
            var paginatedOrders = filtered.slice(startIdx, startIdx + itemsPerPage);

            var html = paginatedOrders.map(function(order) {
                var rowClass = order.priority === "긴급" ? "bg-red-50" : "";
                var coldBadge = order.requiresCold ? '<span class="inline-block px-2 py-0.5 text-xs border border-blue-300 rounded-lg bg-blue-50">냉장</span>' : '';
                var frozenBadge = order.requiresFrozen ? '<span class="inline-block px-2 py-0.5 text-xs border border-cyan-300 rounded-lg bg-cyan-50">냉동</span>' : '';
                var priorityColor = getPriorityColor(order.priority);

                return '<div class="grid grid-cols-12 gap-4 px-4 py-3 text-sm items-center hover:bg-gray-50 transition-colors ' + rowClass + '">' +
                       '<div class="col-span-2 font-medium text-gray-900">' + order.orderNo + '</div>' +
                       '<div class="col-span-2 text-gray-900">' + order.branch + '</div>' +
                       '<div class="col-span-2"><span class="inline-block px-2 py-1 text-xs border border-gray-300 rounded-lg">' + order.region + '</span></div>' +
                       '<div class="col-span-1 text-center text-gray-900">' + order.itemCount + '개</div>' +
                       '<div class="col-span-1 text-center text-gray-900">' + order.weight + 'kg</div>' +
                       '<div class="col-span-2 flex gap-1">' + coldBadge + frozenBadge + '</div>' +
                       '<div class="col-span-1 text-center"><span class="inline-block px-2 py-0.5 text-xs rounded-lg ' + priorityColor + '">' + order.priority + '</span></div>' +
                       '<div class="col-span-1 text-center"><button onclick="selectOrder(\'' + order.id + '\')" class="px-3 py-1 text-xs border border-gray-300 rounded-lg hover:bg-gray-100">선택</button></div>' +
                       '</div>';
            }).join('');

            document.getElementById("orderListBody").innerHTML = html;
            renderPagination(totalPages);
        }

        // 페이지네이션 렌더링
        function renderPagination(totalPages) {
            if (totalPages === 0) {
                document.getElementById("paginationArea").innerHTML = '';
                return;
            }

            var maxVisiblePages = 5;
            var startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            var endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            if (endPage - startPage < maxVisiblePages - 1) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }

            var html = '<button onclick="changePage(' + Math.max(1, currentPage - 1) + ')" ' + (currentPage === 1 ? 'disabled' : '') + ' class="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"><i class="fas fa-chevron-left w-4 h-4"></i></button>';

            if (startPage > 1) {
                html += '<button onclick="changePage(1)" class="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">1</button>';
                if (startPage > 2) html += '<span class="px-2">...</span>';
            }

            for (var i = startPage; i <= endPage; i++) {
                var btnClass = currentPage === i ? 'bg-[#00853D] text-white border-[#00853D]' : 'border-gray-300 hover:bg-gray-100';
                html += '<button onclick="changePage(' + i + ')" class="px-3 py-2 rounded-lg border transition-all ' + btnClass + '">' + i + '</button>';
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) html += '<span class="px-2">...</span>';
                html += '<button onclick="changePage(' + totalPages + ')" class="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">' + totalPages + '</button>';
            }

            html += '<button onclick="changePage(' + Math.min(totalPages, currentPage + 1) + ')" ' + (currentPage === totalPages ? 'disabled' : '') + ' class="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"><i class="fas fa-chevron-right w-4 h-4"></i></button>';

            document.getElementById("paginationArea").innerHTML = html;
        }

        // 배차 완료 건 렌더링
        function renderDispatches() {
            var html = mockDispatches.map(function(dispatch) {
                var driverInfo = '<div class="flex items-center gap-2"><i class="fas fa-user-circle w-5 h-5 text-gray-400"></i><div><p class="font-medium text-sm">' + dispatch.driver.name + '</p><p class="text-xs text-gray-500">' + dispatch.driver.phone + '</p></div></div>';
                var vehicleInfo = '<div class="flex items-center gap-2"><i class="fas fa-truck w-5 h-5 text-gray-400"></i><div><p class="font-medium text-sm">' + dispatch.vehicle.plateNo + '</p><p class="text-xs text-gray-500">' + dispatch.vehicle.type + ' ' + dispatch.vehicle.feature + '</p></div></div>';
                var ordersList = dispatch.orders.map(function(order) { return '<span class="inline-block px-2 py-0.5 text-xs border border-gray-300 rounded-lg">' + order.orderNo + '</span>'; }).join('');

                return '<div class="bg-white rounded-lg border border-gray-200 p-4">' +
                       '<div class="flex items-start justify-between mb-4">' +
                       '<div class="flex items-center gap-3">' +
                       '<div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"><i class="fas fa-check-circle w-5 h-5 text-green-600"></i></div>' +
                       '<div><h4 class="font-bold text-gray-900">' + dispatch.dispatchNo + '</h4><p class="text-xs text-gray-500">' + dispatch.region + '</p></div>' +
                       '</div>' +
                       '<span class="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-lg text-xs font-medium">' + dispatch.status + '</span>' +
                       '</div>' +
                       '<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">' +
                       '<div><p class="text-xs text-gray-500 mb-1">기사</p>' + driverInfo + '</div>' +
                       '<div><p class="text-xs text-gray-500 mb-1">차량</p>' + vehicleInfo + '</div>' +
                       '<div><p class="text-xs text-gray-500 mb-1">총 중량</p><p class="font-bold text-gray-900">' + dispatch.totalWeight + 'kg</p></div>' +
                       '<div><p class="text-xs text-gray-500 mb-1">품목 수</p><p class="font-bold text-gray-900">' + dispatch.totalItems + '개</p></div>' +
                       '</div>' +
                       '<div class="mt-4"><p class="text-xs text-gray-500 mb-2">배송 건</p><div class="flex flex-wrap gap-1.5">' + ordersList + '</div></div>' +
                       '</div>';
            }).join('');

            document.getElementById("dispatchListContainer").innerHTML = html || '<div class="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500"><i class="fas fa-inbox w-12 h-12 mx-auto mb-4 text-gray-400"></i><p>배차 완료 건이 없습니다</p></div>';
        }

        // 페이지 변경
        function changePage(page) {
            currentPage = page;
            renderOrders();
        }

        // 권역 선택
        function selectRegion(region) {
            selectedRegion = region;
            currentPage = 1;
            renderOrders();
            renderRegionButtons();
        }

        // 권역 버튼 렌더링
        function renderRegionButtons() {
            var html = regions.map(function(region) {
                var btnClass = selectedRegion === region ? 'bg-[#00853D] text-white border-[#00853D]' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100';
                return '<button onclick="selectRegion(\'' + region + '\')" class="px-3 py-2 rounded-lg border text-sm font-medium transition-colors ' + btnClass + '"><i class="fas fa-map-pin w-4 h-4 mr-1"></i>' + region + '</button>';
            }).join('');
            document.getElementById("regionButtons").innerHTML = html;
        }

        // 발주 선택
        function selectOrder(orderId) {
            alert("배차 생성 모달에서 선택한 발주를 추가하여 배차를 생성합니다. (기능 개발 필요)");
        }

        // 모달 열기
        function openDispatchModal() {
            document.getElementById("dispatchModal").classList.remove("hidden");
            var driverHtml = mockDrivers.filter(function(d) { return d.status === "대기"; }).map(function(d) { return '<option value="' + d.id + '">' + d.name + ' (' + d.phone + ')</option>'; }).join('');
            document.getElementById("driverSelect").innerHTML = '<option value="">기사를 선택하세요</option>' + driverHtml;
            
            var vehicleHtml = mockVehicles.filter(function(v) { return v.status === "가용"; }).map(function(v) { return '<option value="' + v.id + '">' + v.plateNo + ' (' + v.type + ' ' + v.feature + ')</option>'; }).join('');
            document.getElementById("vehicleSelect").innerHTML = '<option value="">차량을 선택하세요</option>' + vehicleHtml;
        }

        // 모달 닫기
        function closeDispatchModal() {
            document.getElementById("dispatchModal").classList.add("hidden");
        }

        // 배차 생성
        function createDispatch() {
            alert("배차가 생성되었습니다!");
            closeDispatchModal();
        }

        // 사이드바 토글
        function toggleSidebar() {
            var sidebar = document.getElementById("sidebar");
            var backdrop = document.getElementById("sidebarBackdrop");
            
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
            var submenu = button.nextElementSibling;
            var chevron = button.querySelector("i.fa-chevron-right") || button.querySelector("i.fa-chevron-down");
            
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
            var userMenu = document.getElementById("userMenu");
            userMenu.classList.toggle("hidden");
        }

        // 외부 클릭시 메뉴 닫기
        document.addEventListener("click", function(e) {
            var userMenuBtn = document.getElementById("userMenuBtn");
            var userMenu = document.getElementById("userMenu");
            
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

        // 모달 외부 클릭시 닫기
        document.getElementById("dispatchModal").addEventListener("click", function(e) {
            if (e.target === this) {
                closeDispatchModal();
            }
        });

        // 초기화
        renderRegionButtons();
        renderOrders();
        renderDispatches();
    </script>
</body>
</html>


