<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>발주 요청 취합 및 조회 - ZERO LOSS 본사 관리 시스템</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
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
            <!-- 상단 헤더 -->
            <%@ include file="/hq/common/header.jspf" %>

            <!-- 페이지 콘텐츠 -->
            <main class="p-6">
                <!-- 헤더 -->
                <div class="mb-6">
                    <h2 class="text-3xl font-bold text-gray-900">발주 요청 취합 및 조회</h2>
                    <p class="text-gray-500 mt-1">전체 지점의 발주 요청을 통합 관리하세요</p>
                </div>

                <!-- 필터 섹션 -->
                <div class="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <h3 class="font-semibold text-gray-900 mb-4">필터 조건</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">지점 선택</label>
                            <select id="branchFilter" onchange="applyFilters()" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <option value="">전체</option>
                                <option value="강남점">강남점</option>
                                <option value="홍대점">홍대점</option>
                                <option value="신촌점">신촌점</option>
                                <option value="이대점">이대점</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">일자 범위 선택</label>
                            <div class="flex gap-2">
                                <input type="date" id="startDate" value="2026-03-25" onchange="applyFilters()" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <span class="flex items-center text-gray-500">~</span>
                                <input type="date" id="endDate" value="2026-03-29" onchange="applyFilters()" class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">상태 필터</label>
                            <select id="statusFilter" onchange="applyFilters()" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <option value="all">전체</option>
                                <option value="pending">대기</option>
                                <option value="approved">승인</option>
                                <option value="rejected">반려</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- 통계 카드 -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-white rounded-lg border border-yellow-200 p-4 bg-yellow-50">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-xs text-yellow-600 mb-1">대기 (승인필요)</p>
                                <p class="text-2xl font-bold text-yellow-600" id="pendingCount">0</p>
                            </div>
                            <div class="w-12 h-12 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center text-lg">
                                <i class="fas fa-hourglass-half w-6 h-6"></i>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg border border-green-200 p-4 bg-green-50">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-xs text-green-600 mb-1">승인 (처리완료)</p>
                                <p class="text-2xl font-bold text-green-600" id="approvedCount">0</p>
                            </div>
                            <div class="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center text-lg">
                                <i class="fas fa-check-circle w-6 h-6"></i>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg border border-red-200 p-4 bg-red-50">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-xs text-red-600 mb-1">반려 (재검토)</p>
                                <p class="text-2xl font-bold text-red-600" id="rejectedCount">0</p>
                            </div>
                            <div class="w-12 h-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center text-lg">
                                <i class="fas fa-circle-xmark w-6 h-6"></i>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg border border-blue-200 p-4 bg-blue-50">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-xs text-blue-600 mb-1">전체 발주 요청</p>
                                <p class="text-2xl font-bold text-blue-600" id="totalCount">0</p>
                            </div>
                            <div class="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-lg">
                                <i class="fas fa-file-lines w-6 h-6"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 발주 요청 목록 테이블 -->
                <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h3 class="font-semibold text-gray-900">발주 요청/이력</h3>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th class="text-left py-3 px-6 text-sm font-semibold text-gray-900">발주서 번호</th>
                                    <th class="text-left py-3 px-6 text-sm font-semibold text-gray-900">요청 지점</th>
                                    <th class="text-left py-3 px-6 text-sm font-semibold text-gray-900">요청 일시</th>
                                    <th class="text-right py-3 px-6 text-sm font-semibold text-gray-900">품목 수</th>
                                    <th class="text-right py-3 px-6 text-sm font-semibold text-gray-900">총 수량</th>
                                    <th class="text-center py-3 px-6 text-sm font-semibold text-gray-900">상태</th>
                                    <th class="text-center py-3 px-6 text-sm font-semibold text-gray-900">조회</th>
                                </tr>
                            </thead>
                            <tbody id="orderTableBody">
                                <!-- 동적 생성 -->
                            </tbody>
                        </table>
                    </div>

                    <div id="emptyState" class="py-12 text-center hidden">
                        <i class="fas fa-folder-open w-16 h-16 text-gray-300 mx-auto mb-4" style="display: block;"></i>
                        <p class="text-gray-500 text-lg mb-2">발주 요청이 없습니다</p>
                        <p class="text-gray-400 text-sm">선택한 필터 조건에 해당하는 발주가 없습니다</p>
                    </div>

                    <!-- 페이지네이션 -->
                    <div id="pagination" class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between hidden">
                        <button onclick="previousPage()" class="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50" id="prevBtn">
                            <i class="fas fa-chevron-left w-4 h-4"></i>
                            이전
                        </button>
                        <p class="text-sm text-gray-500"><span id="currentPageNum">1</span> / <span id="totalPageNum">1</span></p>
                        <button onclick="nextPage()" class="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50" id="nextBtn">
                            다음
                            <i class="fas fa-chevron-right w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <!-- 상세 정보 모달 -->
    <div id="detailModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h3 class="text-xl font-bold text-gray-900">발주서 상세 정보</h3>
                    <p class="text-sm text-gray-500 mt-1" id="detailOrderNumber"></p>
                </div>
                <button onclick="closeDetailModal()" class="text-gray-400 hover:text-gray-600 text-lg">
                    <i class="fas fa-times w-6 h-6"></i>
                </button>
            </div>

            <div class="space-y-4 mb-6">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">요청 지점</label>
                        <p class="font-semibold text-gray-900" id="detailBranch"></p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">요청 일시</label>
                        <p class="text-gray-900" id="detailDate"></p>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">품목 수</label>
                        <p class="text-lg font-semibold text-gray-900" id="detailItemCount"></p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">총 요청 수량</label>
                        <p class="text-lg font-semibold text-blue-600" id="detailTotalQty"></p>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-2">상태</label>
                    <div id="detailStatus"></div>
                </div>
            </div>

            <div id="itemsTable" class="hidden">
                <h4 class="font-semibold text-gray-900 mb-3">발주 품목 상세</h4>
                <div class="border border-gray-200 rounded-lg overflow-hidden">
                    <table class="w-full">
                        <thead class="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th class="text-left py-3 px-4 text-sm font-semibold text-gray-900">품목명</th>
                                <th class="text-right py-3 px-4 text-sm font-semibold text-gray-900">요청 수량</th>
                                <th class="text-right py-3 px-4 text-sm font-semibold text-gray-900">현재 재고</th>
                            </tr>
                        </thead>
                        <tbody id="itemsTableBody">
                            <!-- 동적 생성 -->
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="mt-6">
                <button onclick="closeDetailModal()" class="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    닫기
                </button>
            </div>
        </div>
    </div>

    <script>
        // 전역 상태
        let allOrders = [];
        let filteredOrders = [];
        let currentPage = 1;
        const itemsPerPage = 10;

        // Mock 데이터
        const mockOrders = [
            { id: '1', orderNumber: 'PO-2026-0329-001', branch: '강남점', date: '2026-03-29 10:30', status: 'pending', itemCount: 4, totalQty: 185, items: [
                { itemName: '소고기 패티', requestedQty: 55, unit: '개', currentStock: 45, safetyStock: 50 },
                { itemName: '감자', requestedQty: 85, unit: 'kg', currentStock: 15, safetyStock: 50 },
                { itemName: '생크림', requestedQty: 18, unit: 'L', currentStock: 12, safetyStock: 15 },
                { itemName: '양상추', requestedQty: 27, unit: 'kg', currentStock: 8, safetyStock: 20 }
            ]},
            { id: '2', orderNumber: 'PO-2026-0329-002', branch: '홍대점', date: '2026-03-29 09:15', status: 'pending', itemCount: 3, totalQty: 120, items: [
                { itemName: '버거빵', requestedQty: 80, unit: '개', currentStock: 120, safetyStock: 150 },
                { itemName: '체다치즈', requestedQty: 25, unit: '장', currentStock: 28, safetyStock: 25 },
                { itemName: '식용유', requestedQty: 15, unit: 'L', currentStock: 16, safetyStock: 15 }
            ]},
            { id: '3', orderNumber: 'PO-2026-0329-003', branch: '신촌점', date: '2026-03-29 08:45', status: 'pending', itemCount: 5, totalQty: 210, items: [
                { itemName: '소고기 패티', requestedQty: 45, unit: '개', currentStock: 30, safetyStock: 50 },
                { itemName: '토마토', requestedQty: 20, unit: 'kg', currentStock: 8, safetyStock: 15 },
                { itemName: '버거빵', requestedQty: 50, unit: '개', currentStock: 100, safetyStock: 120 },
                { itemName: '감자', requestedQty: 60, unit: 'kg', currentStock: 20, safetyStock: 50 },
                { itemName: '체다치즈', requestedQty: 35, unit: '장', currentStock: 15, safetyStock: 25 }
            ]},
            { id: '4', orderNumber: 'PO-2026-0328-001', branch: '강남점', date: '2026-03-28 14:20', status: 'approved', itemCount: 5, totalQty: 250, items: [
                { itemName: '버거빵', requestedQty: 80, unit: '개', currentStock: 120, safetyStock: 150 },
                { itemName: '소고기 패티', requestedQty: 60, unit: '개', currentStock: 50, safetyStock: 50 },
                { itemName: '감자', requestedQty: 55, unit: 'kg', currentStock: 25, safetyStock: 50 },
                { itemName: '생크림', requestedQty: 30, unit: 'L', currentStock: 20, safetyStock: 15 },
                { itemName: '양상추', requestedQty: 25, unit: 'kg', currentStock: 10, safetyStock: 20 }
            ]},
            { id: '5', orderNumber: 'PO-2026-0328-002', branch: '이대점', date: '2026-03-28 11:30', status: 'approved', itemCount: 4, totalQty: 180, items: [
                { itemName: '버거빵', requestedQty: 70, unit: '개', currentStock: 110, safetyStock: 150 },
                { itemName: '체다치즈', requestedQty: 40, unit: '장', currentStock: 35, safetyStock: 25 },
                { itemName: '생크림', requestedQty: 25, unit: 'L', currentStock: 18, safetyStock: 15 },
                { itemName: '식용유', requestedQty: 45, unit: 'L', currentStock: 30, safetyStock: 15 }
            ]},
            { id: '6', orderNumber: 'PO-2026-0327-001', branch: '홍대점', date: '2026-03-27 16:45', status: 'approved', itemCount: 6, totalQty: 310, items: [
                { itemName: '버거빵', requestedQty: 100, unit: '개', currentStock: 130, safetyStock: 150 },
                { itemName: '소고기 패티', requestedQty: 80, unit: '개', currentStock: 60, safetyStock: 50 },
                { itemName: '감자', requestedQty: 70, unit: 'kg', currentStock: 30, safetyStock: 50 },
                { itemName: '체다치즈', requestedQty: 30, unit: '장', currentStock: 25, safetyStock: 25 },
                { itemName: '생크림', requestedQty: 20, unit: 'L', currentStock: 15, safetyStock: 15 },
                { itemName: '식용유', requestedQty: 10, unit: 'L', currentStock: 12, safetyStock: 15 }
            ]},
            { id: '7', orderNumber: 'PO-2026-0327-002', branch: '신촌점', date: '2026-03-27 11:00', status: 'rejected', itemCount: 4, totalQty: 180, items: [
                { itemName: '버거빵', requestedQty: 60, unit: '개', currentStock: 90, safetyStock: 150 },
                { itemName: '소고기 패티', requestedQty: 50, unit: '개', currentStock: 35, safetyStock: 50 },
                { itemName: '감자', requestedQty: 40, unit: 'kg', currentStock: 15, safetyStock: 50 },
                { itemName: '체다치즈', requestedQty: 30, unit: '장', currentStock: 20, safetyStock: 25 }
            ]}
        ];

        // 사이드바 토글
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const backdrop = document.getElementById('sidebarBackdrop');
            const menuIcon = document.getElementById('menuIcon');
            
            sidebar.classList.toggle('-translate-x-full');
            backdrop.classList.toggle('hidden');
            
            if (backdrop.classList.contains('hidden')) {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            } else {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            }
        }

        // 메뉴 토글
        function toggleMenu(button) {
            const submenu = button.nextElementSibling;
            const icon = button.querySelector('i:last-child');
            
            if (submenu && submenu.classList.contains('submenu')) {
                submenu.classList.toggle('hidden');
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-right');
            }
        }

        // 사용자 메뉴 토글
        function toggleUserMenu() {
            document.getElementById('userMenu').classList.toggle('hidden');
        }

        // 로그아웃
        function logout() {
            alert('로그아웃되었습니다.');
            window.location.href = '<%= request.getContextPath() %>/common/login.jsp';
        }

        // 백드롭 클릭 시 사이드바 닫기
        document.getElementById('sidebarBackdrop').addEventListener('click', toggleSidebar);

        // 상태 배지 생성
        function getStatusBadge(status) {
            if (status === 'pending') {
                return '<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700"><i class="fas fa-hourglass-half w-3 h-3"></i>대기</span>';
            } else if (status === 'approved') {
                return '<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"><i class="fas fa-check-circle w-3 h-3"></i>승인</span>';
            } else if (status === 'rejected') {
                return '<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700"><i class="fas fa-circle-xmark w-3 h-3"></i>반려</span>';
            }
        }

        // 필터 적용
        function applyFilters() {
            const branch = document.getElementById('branchFilter').value;
            const status = document.getElementById('statusFilter').value;
            const startDate = new Date(document.getElementById('startDate').value);
            const endDate = new Date(document.getElementById('endDate').value);

            filteredOrders = allOrders.filter(function(order) {
                const orderDate = new Date(order.date.split(' ')[0]);
                const matchBranch = !branch || order.branch === branch;
                const matchStatus = status === 'all' || order.status === status;
                const matchDate = orderDate >= startDate && orderDate <= endDate;
                return matchBranch && matchStatus && matchDate;
            });

            currentPage = 1;
            updateStatistics();
            renderTable();
        }

        // 통계 업데이트
        function updateStatistics() {
            const pending = allOrders.filter(function(o) { return o.status === 'pending'; }).length;
            const approved = allOrders.filter(function(o) { return o.status === 'approved'; }).length;
            const rejected = allOrders.filter(function(o) { return o.status === 'rejected'; }).length;
            
            document.getElementById('pendingCount').textContent = pending;
            document.getElementById('approvedCount').textContent = approved;
            document.getElementById('rejectedCount').textContent = rejected;
            document.getElementById('totalCount').textContent = allOrders.length;
        }

        // 테이블 렌더링
        function renderTable() {
            const tbody = document.getElementById('orderTableBody');
            const emptyState = document.getElementById('emptyState');
            const pagination = document.getElementById('pagination');
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const pageOrders = filteredOrders.slice(start, end);

            tbody.innerHTML = '';

            if (filteredOrders.length === 0) {
                emptyState.classList.remove('hidden');
                pagination.classList.add('hidden');
                return;
            }

            emptyState.classList.add('hidden');

            pageOrders.forEach(function(order) {
                const tr = document.createElement('tr');
                tr.className = 'border-b border-gray-100 hover:bg-gray-50';
                if (order.status === 'pending') tr.className += ' bg-yellow-50';
                if (order.status === 'rejected') tr.className += ' bg-red-50';

                const rowHTML = '<td class="py-4 px-6 font-mono text-sm text-blue-600">' + order.orderNumber + '</td>' +
                    '<td class="py-4 px-6 font-medium text-gray-900"><i class="fas fa-map-pin w-4 h-4 text-gray-400 mr-2"></i>' + order.branch + '</td>' +
                    '<td class="py-4 px-6 text-gray-700"><i class="fas fa-calendar w-4 h-4 text-gray-400 mr-2"></i>' + order.date + '</td>' +
                    '<td class="py-4 px-6 text-right font-semibold text-gray-900">' + order.itemCount + '개</td>' +
                    '<td class="py-4 px-6 text-right font-semibold text-blue-600">' + order.totalQty + '</td>' +
                    '<td class="py-4 px-6 text-center">' + getStatusBadge(order.status) + '</td>' +
                    '<td class="py-4 px-6 text-center"><button onclick="showDetailModal(\'' + order.id + '\')" class="inline-flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><i class="fas fa-eye w-4 h-4"></i>조회</button></td>';

                tr.innerHTML = rowHTML;
                tbody.appendChild(tr);
            });

            // 페이지네이션 업데이트
            const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
            if (totalPages > 1) {
                pagination.classList.remove('hidden');
                document.getElementById('currentPageNum').textContent = currentPage;
                document.getElementById('totalPageNum').textContent = totalPages;
                document.getElementById('prevBtn').disabled = currentPage === 1;
                document.getElementById('nextBtn').disabled = currentPage === totalPages;
            } else {
                pagination.classList.add('hidden');
            }
        }

        // 페이지네이션
        function previousPage() {
            if (currentPage > 1) {
                currentPage--;
                renderTable();
                window.scrollTo(0, 0);
            }
        }

        function nextPage() {
            const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderTable();
                window.scrollTo(0, 0);
            }
        }

        // 상세 정보 모달 표시
        function showDetailModal(orderId) {
            const order = allOrders.find(function(o) { return o.id === orderId; });
            if (!order) return;

            document.getElementById('detailOrderNumber').textContent = order.orderNumber;
            document.getElementById('detailBranch').textContent = order.branch;
            document.getElementById('detailDate').textContent = order.date;
            document.getElementById('detailItemCount').textContent = order.itemCount + '개';
            document.getElementById('detailTotalQty').textContent = order.totalQty;
            document.getElementById('detailStatus').innerHTML = getStatusBadge(order.status);

            if (order.items && order.items.length > 0) {
                const itemsTableBody = document.getElementById('itemsTableBody');
                itemsTableBody.innerHTML = '';

                order.items.forEach(function(item) {
                    const tr = document.createElement('tr');
                    tr.className = 'border-t border-gray-100';
                    
                    const stockColor = item.currentStock < item.safetyStock ? 'text-red-600' : 'text-green-600';
                    const html = '<td class="py-3 px-4 text-gray-900">' + item.itemName + '</td>' +
                        '<td class="py-3 px-4 text-right font-semibold text-blue-600">' + item.requestedQty + item.unit + '</td>' +
                        '<td class="py-3 px-4 text-right font-semibold ' + stockColor + '">' + item.currentStock + item.unit + '</td>';
                    
                    tr.innerHTML = html;
                    itemsTableBody.appendChild(tr);
                });

                document.getElementById('itemsTable').classList.remove('hidden');
            } else {
                document.getElementById('itemsTable').classList.add('hidden');
            }

            document.getElementById('detailModal').classList.remove('hidden');
        }

        // 상세 정보 모달 닫기
        function closeDetailModal() {
            document.getElementById('detailModal').classList.add('hidden');
        }

        // 모달 외부 클릭 시 닫기
        document.getElementById('detailModal').addEventListener('click', function(e) {
            if (e.target === this) closeDetailModal();
        });

        // 사용자 메뉴 외부 클릭 시 닫기
        document.addEventListener('click', function(e) {
            const userMenu = document.getElementById('userMenu');
            if (!e.target.closest('button[onclick="toggleUserMenu()"]') && 
                !e.target.closest('#userMenu')) {
                userMenu.classList.add('hidden');
            }
        });

        // 초기화
        window.addEventListener('DOMContentLoaded', function() {
            allOrders = mockOrders;
            filteredOrders = allOrders;
            updateStatistics();
            renderTable();
        });
    </script>
</body>
</html>


