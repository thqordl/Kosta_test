<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>기사/차량 관리 - ZERO LOSS 본사 관리 시스템</title>
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
                <div class="space-y-6">
                    
                    <!-- 페이지 헤더 -->
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900">기사/차량 관리</h2>
                        <p class="text-gray-500 mt-2">배송 업무를 수행하는 기사와 차량 정보를 관리하세요</p>
                    </div>

                    <!-- 검색 -->
                    <div class="bg-white rounded-lg border border-gray-200 p-6">
                        <input type="text" id="searchInput" placeholder="기사명, 전화번호, 차량번호로 검색..." onkeyup="applySearch()" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                    </div>

                    <!-- 탭 네비게이션 -->
                    <div class="flex gap-2 border-b border-gray-200">
                        <button onclick="switchTab('drivers')" id="driversTabBtn" class="px-4 py-3 border-b-2 border-[#00853D] text-[#00853D] font-medium text-sm flex items-center gap-2">
                            <i class="fas fa-user w-4 h-4"></i> 배송 기사
                        </button>
                        <button onclick="switchTab('vehicles')" id="vehiclesTabBtn" class="px-4 py-3 border-b-2 border-transparent text-gray-600 font-medium text-sm flex items-center gap-2 hover:text-gray-900">
                            <i class="fas fa-truck w-4 h-4"></i> 차량
                        </button>
                    </div>

                    <!-- 기사 탭 -->
                    <div id="driversTab" class="space-y-6">
                        <!-- 통계 및 버튼 -->
                        <div class="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
                            <div id="driverStatsArea" class="flex gap-3 flex-1">
                                <!-- 동적 생성 -->
                            </div>
                            <button onclick="addDriver()" class="px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F] transition-colors flex items-center gap-2 text-sm whitespace-nowrap">
                                <i class="fas fa-plus w-4 h-4"></i> 기사 추가
                            </button>
                        </div>

                        <!-- 기사 리스트 -->
                        <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <div class="bg-gray-50 border-b border-gray-200">
                                <div class="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-semibold text-gray-700">
                                    <div class="col-span-2">이름</div>
                                    <div class="col-span-2">전화번호</div>
                                    <div class="col-span-2">담당 권역</div>
                                    <div class="col-span-2">배차 차량</div>
                                    <div class="col-span-2 text-center">상태</div>
                                    <div class="col-span-2 text-center">액션</div>
                                </div>
                            </div>
                            <div id="driversListBody" class="divide-y divide-gray-200">
                                <!-- 동적 생성 -->
                            </div>
                        </div>

                        <!-- 페이지네이션 -->
                        <div id="driversPaginationArea" class="flex items-center justify-center gap-2"></div>
                    </div>

                    <!-- 차량 탭 -->
                    <div id="vehiclesTab" class="space-y-6 hidden">
                        <!-- 통계 및 버튼 -->
                        <div class="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
                            <div id="vehicleStatsArea" class="flex gap-3 flex-1">
                                <!-- 동적 생성 -->
                            </div>
                            <button onclick="addVehicle()" class="px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F] transition-colors flex items-center gap-2 text-sm whitespace-nowrap">
                                <i class="fas fa-plus w-4 h-4"></i> 차량 추가
                            </button>
                        </div>

                        <!-- 차량 리스트 -->
                        <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <div class="bg-gray-50 border-b border-gray-200">
                                <div class="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-semibold text-gray-700">
                                    <div class="col-span-2">차량번호</div>
                                    <div class="col-span-1 text-center">크기</div>
                                    <div class="col-span-2">온도</div>
                                    <div class="col-span-2">배차 기사</div>
                                    <div class="col-span-1 text-center">상태</div>
                                    <div class="col-span-1 text-center">주행거리</div>
                                    <div class="col-span-2 text-center">액션</div>
                                </div>
                            </div>
                            <div id="vehiclesListBody" class="divide-y divide-gray-200">
                                <!-- 동적 생성 -->
                            </div>
                        </div>

                        <!-- 페이지네이션 -->
                        <div id="vehiclesPaginationArea" class="flex items-center justify-center gap-2"></div>
                    </div>

                </div>
            </main>
        </div>
    </div>

    <script>
        // Mock 데이터
        const mockDrivers = [
            { id: 'DRV001', name: '김배송', phone: '010-1234-5678', region: '서울/경기권', status: '배송 중', assignedVehicle: '12가3456', totalDeliveries: 342 },
            { id: 'DRV002', name: '이운송', phone: '010-2345-6789', region: '서울/경기권', status: '대기', assignedVehicle: '34나5678', totalDeliveries: 285 },
            { id: 'DRV003', name: '박택배', phone: '010-3456-7890', region: '충청권', status: '대기', assignedVehicle: '56다7890', totalDeliveries: 421 },
            { id: 'DRV004', name: '최물류', phone: '010-4567-8901', region: '경상권', status: '배송 중', assignedVehicle: '78라9012', totalDeliveries: 198 },
            { id: 'DRV005', name: '정배달', phone: '010-5678-9012', region: '전라권', status: '휴무', totalDeliveries: 156 },
            { id: 'DRV006', name: '한운반', phone: '010-6789-0123', region: '서울/경기권', status: '대기', assignedVehicle: '90마1234', totalDeliveries: 267 },
            { id: 'DRV007', name: '송물류', phone: '010-7890-1234', region: '강원권', status: '배송 중', assignedVehicle: '12바3456', totalDeliveries: 189 },
            { id: 'DRV008', name: '강배송', phone: '010-8901-2345', region: '경상권', status: '대기', assignedVehicle: '34사5678', totalDeliveries: 312 },
            { id: 'DRV009', name: '윤운송', phone: '010-9012-3456', region: '전라권', status: '배송 중', totalDeliveries: 225 },
            { id: 'DRV010', name: '임택배', phone: '010-0123-4567', region: '충청권', status: '대기', assignedVehicle: '56아7890', totalDeliveries: 178 }
        ];

        const mockVehicles = [
            { id: 'VEH001', plateNo: '12가3456', type: '2.5톤', feature: '냉장', status: '배송 중', assignedDriver: '김배송', lastInspection: '2026-03-15', mileage: 45280 },
            { id: 'VEH002', plateNo: '34나5678', type: '1톤', feature: '냉동', status: '가용', assignedDriver: '이운송', lastInspection: '2026-03-20', mileage: 32150 },
            { id: 'VEH003', plateNo: '56다7890', type: '2.5톤', feature: '냉장/냉동', status: '가용', assignedDriver: '박택배', lastInspection: '2026-03-10', mileage: 58920 },
            { id: 'VEH004', plateNo: '78라9012', type: '1톤', feature: '냉장', status: '배송 중', assignedDriver: '최물류', lastInspection: '2026-03-25', mileage: 28340 },
            { id: 'VEH005', plateNo: '90마1234', type: '5톤', feature: '냉장/냉동', status: '점검 중', lastInspection: '2026-02-28', mileage: 72450 },
            { id: 'VEH006', plateNo: '12바3456', type: '2.5톤', feature: '냉장', status: '가용', assignedDriver: '송물류', lastInspection: '2026-03-18', mileage: 41230 },
            { id: 'VEH007', plateNo: '34사5678', type: '1톤', feature: '냉동', status: '배송 중', assignedDriver: '강배송', lastInspection: '2026-03-22', mileage: 36780 },
            { id: 'VEH008', plateNo: '56아7890', type: '2.5톤', feature: '냉장/냉동', status: '가용', assignedDriver: '임택배', lastInspection: '2026-03-12', mileage: 52340 },
            { id: 'VEH009', plateNo: '78자9012', type: '1톤', feature: '냉장', status: '점검 중', lastInspection: '2026-02-25', mileage: 64120 },
            { id: 'VEH010', plateNo: '90차1234', type: '5톤', feature: '냉장/냉동', status: '가용', lastInspection: '2026-03-08', mileage: 38560 }
        ];

        let currentTab = 'drivers';
        let searchTerm = '';
        let currentDriverPage = 1;
        let currentVehiclePage = 1;
        const itemsPerPage = 8;

        // 상태 색상
        function getDriverStatusColor(status) {
            var colorClass = status === '대기' ? 'bg-green-100 text-green-800' : (status === '배송 중' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800');
            return colorClass;
        }

        function getVehicleStatusColor(status) {
            var colorClass = status === '가용' ? 'bg-green-100 text-green-800' : (status === '배송 중' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800');
            return colorClass;
        }

        // 필터링
        function getFilteredDrivers() {
            return mockDrivers.filter(function(driver) {
                var term = searchTerm.toLowerCase();
                return driver.name.toLowerCase().includes(term) || driver.phone.includes(term) || driver.region.toLowerCase().includes(term);
            });
        }

        function getFilteredVehicles() {
            return mockVehicles.filter(function(vehicle) {
                var term = searchTerm.toLowerCase();
                return vehicle.plateNo.toLowerCase().includes(term) || (vehicle.assignedDriver && vehicle.assignedDriver.toLowerCase().includes(term));
            });
        }

        // 기사 통계
        function renderDriverStats() {
            var waiting = mockDrivers.filter(function(d) { return d.status === '대기'; }).length;
            var delivering = mockDrivers.filter(function(d) { return d.status === '배송 중'; }).length;
            var offDuty = mockDrivers.filter(function(d) { return d.status === '휴무'; }).length;

            var html = '<div class="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-2"><p class="text-xs text-gray-600">총 기사</p><p class="text-lg font-bold text-gray-900">' + mockDrivers.length + '</p></div>' +
                      '<div class="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-2"><p class="text-xs text-gray-600">대기 중</p><p class="text-lg font-bold text-green-600">' + waiting + '</p></div>' +
                      '<div class="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-2"><p class="text-xs text-gray-600">배송 중</p><p class="text-lg font-bold text-blue-600">' + delivering + '</p></div>' +
                      '<div class="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-2"><p class="text-xs text-gray-600">휴무</p><p class="text-lg font-bold text-gray-600">' + offDuty + '</p></div>';
            document.getElementById('driverStatsArea').innerHTML = html;
        }

        // 차량 통계
        function renderVehicleStats() {
            var available = mockVehicles.filter(function(v) { return v.status === '가용'; }).length;
            var delivering = mockVehicles.filter(function(v) { return v.status === '배송 중'; }).length;
            var inspection = mockVehicles.filter(function(v) { return v.status === '점검 중'; }).length;

            var html = '<div class="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-2"><p class="text-xs text-gray-600">총 차량</p><p class="text-lg font-bold text-gray-900">' + mockVehicles.length + '</p></div>' +
                      '<div class="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-2"><p class="text-xs text-gray-600">가용</p><p class="text-lg font-bold text-green-600">' + available + '</p></div>' +
                      '<div class="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-2"><p class="text-xs text-gray-600">배송 중</p><p class="text-lg font-bold text-blue-600">' + delivering + '</p></div>' +
                      '<div class="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-2"><p class="text-xs text-gray-600">점검 중</p><p class="text-lg font-bold text-yellow-600">' + inspection + '</p></div>';
            document.getElementById('vehicleStatsArea').innerHTML = html;
        }

        // 기사 리스트 렌더링
        function renderDrivers() {
            var filtered = getFilteredDrivers();
            var totalPages = Math.ceil(filtered.length / itemsPerPage);
            var startIdx = (currentDriverPage - 1) * itemsPerPage;
            var paginated = filtered.slice(startIdx, startIdx + itemsPerPage);

            var html = paginated.map(function(driver) {
                var statusColor = getDriverStatusColor(driver.status);
                var vehicle = driver.assignedVehicle ? '<span class="text-gray-900">' + driver.assignedVehicle + '</span>' : '<span class="text-gray-400">미배정</span>';
                
                return '<div class="grid grid-cols-12 gap-4 px-4 py-3 text-sm items-center hover:bg-gray-50">' +
                       '<div class="col-span-2 font-medium text-gray-900">' + driver.name + '</div>' +
                       '<div class="col-span-2 text-gray-600">' + driver.phone + '</div>' +
                       '<div class="col-span-2"><span class="inline-block px-2 py-1 text-xs border border-gray-300 rounded-lg">' + driver.region + '</span></div>' +
                       '<div class="col-span-2">' + vehicle + '</div>' +
                       '<div class="col-span-2 text-center"><span class="inline-block px-2 py-0.5 text-xs rounded-lg ' + statusColor + '">' + driver.status + '</span></div>' +
                       '<div class="col-span-2 text-center"><button onclick="editDriver(' + '\'' + driver.id + '\'' + ')" class="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100">수정</button></div>' +
                       '</div>';
            }).join('');

            document.getElementById('driversListBody').innerHTML = html || '<div class="px-4 py-8 text-center text-gray-500"><i class="fas fa-user-slash w-8 h-8 mx-auto mb-2 text-gray-400"></i><p>기사가 없습니다</p></div>';

            renderDriverPagination(totalPages);
        }

        // 차량 리스트 렌더링
        function renderVehicles() {
            var filtered = getFilteredVehicles();
            var totalPages = Math.ceil(filtered.length / itemsPerPage);
            var startIdx = (currentVehiclePage - 1) * itemsPerPage;
            var paginated = filtered.slice(startIdx, startIdx + itemsPerPage);

            var html = paginated.map(function(vehicle) {
                var statusColor = getVehicleStatusColor(vehicle.status);
                var driver = vehicle.assignedDriver ? '<span class="text-gray-900">' + vehicle.assignedDriver + '</span>' : '<span class="text-gray-400">미배정</span>';
                
                return '<div class="grid grid-cols-12 gap-4 px-4 py-3 text-sm items-center hover:bg-gray-50">' +
                       '<div class="col-span-2 font-medium text-gray-900">' + vehicle.plateNo + '</div>' +
                       '<div class="col-span-1 text-center text-gray-900">' + vehicle.type + '</div>' +
                       '<div class="col-span-2"><span class="inline-block px-2 py-0.5 text-xs border border-gray-300 rounded-lg">' + vehicle.feature + '</span></div>' +
                       '<div class="col-span-2">' + driver + '</div>' +
                       '<div class="col-span-1 text-center"><span class="inline-block px-2 py-0.5 text-xs rounded-lg ' + statusColor + '">' + vehicle.status + '</span></div>' +
                       '<div class="col-span-1 text-center text-gray-900">' + vehicle.mileage.toLocaleString() + 'km</div>' +
                       '<div class="col-span-2 text-center"><button onclick="editVehicle(' + '\'' + vehicle.id + '\'' + ')" class="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100">수정</button></div>' +
                       '</div>';
            }).join('');

            document.getElementById('vehiclesListBody').innerHTML = html || '<div class="px-4 py-8 text-center text-gray-500"><i class="fas fa-truck-slash w-8 h-8 mx-auto mb-2 text-gray-400"></i><p>차량이 없습니다</p></div>';

            renderVehiclePagination(totalPages);
        }

        // 페이지네이션 렌더링
        function renderDriverPagination(totalPages) {
            if (totalPages === 0) {
                document.getElementById('driversPaginationArea').innerHTML = '';
                return;
            }

            var maxVisiblePages = 5;
            var startPage = Math.max(1, currentDriverPage - Math.floor(maxVisiblePages / 2));
            var endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            if (endPage - startPage < maxVisiblePages - 1) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }

            var html = '<button onclick="changeDriverPage(' + Math.max(1, currentDriverPage - 1) + ')" ' + (currentDriverPage === 1 ? 'disabled' : '') + ' class="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"><i class="fas fa-chevron-left w-4 h-4"></i></button>';

            if (startPage > 1) {
                html += '<button onclick="changeDriverPage(1)" class="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">1</button>';
                if (startPage > 2) html += '<span class="px-2">...</span>';
            }

            for (var i = startPage; i <= endPage; i++) {
                var btnClass = currentDriverPage === i ? 'bg-[#00853D] text-white border-[#00853D]' : 'border-gray-300 hover:bg-gray-100';
                html += '<button onclick="changeDriverPage(' + i + ')" class="px-3 py-2 rounded-lg border transition-all ' + btnClass + '">' + i + '</button>';
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) html += '<span class="px-2">...</span>';
                html += '<button onclick="changeDriverPage(' + totalPages + ')" class="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">' + totalPages + '</button>';
            }

            html += '<button onclick="changeDriverPage(' + Math.min(totalPages, currentDriverPage + 1) + ')" ' + (currentDriverPage === totalPages ? 'disabled' : '') + ' class="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"><i class="fas fa-chevron-right w-4 h-4"></i></button>';

            document.getElementById('driversPaginationArea').innerHTML = html;
        }

        function renderVehiclePagination(totalPages) {
            if (totalPages === 0) {
                document.getElementById('vehiclesPaginationArea').innerHTML = '';
                return;
            }

            var maxVisiblePages = 5;
            var startPage = Math.max(1, currentVehiclePage - Math.floor(maxVisiblePages / 2));
            var endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            if (endPage - startPage < maxVisiblePages - 1) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }

            var html = '<button onclick="changeVehiclePage(' + Math.max(1, currentVehiclePage - 1) + ')" ' + (currentVehiclePage === 1 ? 'disabled' : '') + ' class="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"><i class="fas fa-chevron-left w-4 h-4"></i></button>';

            if (startPage > 1) {
                html += '<button onclick="changeVehiclePage(1)" class="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">1</button>';
                if (startPage > 2) html += '<span class="px-2">...</span>';
            }

            for (var i = startPage; i <= endPage; i++) {
                var btnClass = currentVehiclePage === i ? 'bg-[#00853D] text-white border-[#00853D]' : 'border-gray-300 hover:bg-gray-100';
                html += '<button onclick="changeVehiclePage(' + i + ')" class="px-3 py-2 rounded-lg border transition-all ' + btnClass + '">' + i + '</button>';
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) html += '<span class="px-2">...</span>';
                html += '<button onclick="changeVehiclePage(' + totalPages + ')" class="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">' + totalPages + '</button>';
            }

            html += '<button onclick="changeVehiclePage(' + Math.min(totalPages, currentVehiclePage + 1) + ')" ' + (currentVehiclePage === totalPages ? 'disabled' : '') + ' class="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"><i class="fas fa-chevron-right w-4 h-4"></i></button>';

            document.getElementById('vehiclesPaginationArea').innerHTML = html;
        }

        // 액션
        function switchTab(tab) {
            currentTab = tab;
            currentDriverPage = 1;
            currentVehiclePage = 1;

            if (tab === 'drivers') {
                document.getElementById('driversTab').classList.remove('hidden');
                document.getElementById('vehiclesTab').classList.add('hidden');
                document.getElementById('driversTabBtn').classList.add('border-[#00853D]', 'text-[#00853D]');
                document.getElementById('vehiclesTabBtn').classList.remove('border-[#00853D]', 'text-[#00853D]');
                renderDriverStats();
                renderDrivers();
            } else {
                document.getElementById('vehiclesTab').classList.remove('hidden');
                document.getElementById('driversTab').classList.add('hidden');
                document.getElementById('vehiclesTabBtn').classList.add('border-[#00853D]', 'text-[#00853D]');
                document.getElementById('driversTabBtn').classList.remove('border-[#00853D]', 'text-[#00853D]');
                renderVehicleStats();
                renderVehicles();
            }
        }

        function applySearch() {
            searchTerm = document.getElementById('searchInput').value;
            currentDriverPage = 1;
            currentVehiclePage = 1;
            renderDrivers();
            renderVehicles();
        }

        function changeDriverPage(page) {
            currentDriverPage = page;
            renderDrivers();
        }

        function changeVehiclePage(page) {
            currentVehiclePage = page;
            renderVehicles();
        }

        function addDriver() {
            alert('기사 추가 기능 (모달 필요)');
        }

        function addVehicle() {
            alert('차량 추가 기능 (모달 필요)');
        }

        function editDriver(driverId) {
            alert('기사 정보 수정: ' + driverId);
        }

        function editVehicle(vehicleId) {
            alert('차량 정보 수정: ' + vehicleId);
        }

        // 사이드바
        function toggleSidebar() {
            var sidebar = document.getElementById('sidebar');
            var backdrop = document.getElementById('sidebarBackdrop');
            
            if (sidebar.classList.contains('-translate-x-full')) {
                sidebar.classList.remove('-translate-x-full');
                backdrop.classList.remove('hidden');
            } else {
                sidebar.classList.add('-translate-x-full');
                backdrop.classList.add('hidden');
            }
        }

        function toggleMenu(button) {
            var submenu = button.nextElementSibling;
            var chevron = button.querySelector('i.fa-chevron-right') || button.querySelector('i.fa-chevron-down');
            
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

        function toggleUserMenu() {
            var userMenu = document.getElementById('userMenu');
            userMenu.classList.toggle('hidden');
        }

        document.addEventListener('click', function(e) {
            var userMenuBtn = document.getElementById('userMenuBtn');
            var userMenu = document.getElementById('userMenu');
            
            if (!userMenuBtn.contains(e.target) && !userMenu.contains(e.target)) {
                userMenu.classList.add('hidden');
            }
        });

        document.getElementById('sidebarBackdrop').addEventListener('click', toggleSidebar);

        function logout() {
            alert('로그아웃 되었습니다.');
            window.location.href = '<%= request.getContextPath() %>/common/login.jsp';
        }

        // 초기화
        switchTab('drivers');
    </script>
</body>
</html>


