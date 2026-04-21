<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>지점 손실 관리 - ZERO LOSS 본사 관리 시스템</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .sidebar-open .sidebar {
            transform: translateX(0);
        }
        .sidebar-open #sidebarBackdrop {
            display: block;
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

            <!-- 사용자 정보 -->
            <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
                <a href="#" class="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors">
                    <div class="w-10 h-10 rounded-full bg-[#00853D] flex items-center justify-center text-white font-semibold">
                        본
                    </div>
                    <div class="flex-1">
                        <p class="text-sm font-medium text-gray-900">본사관리자</p>
                        <p class="text-xs text-gray-500">admin</p>
                    </div>
                </a>
            </div>
        </aside>

        <!-- 메인 콘텐츠 -->
        <div class="lg:pl-64">
            <!-- 상단 헤더 -->
            <%@ include file="/hq/common/header.jspf" %>

            <!-- 페이지 콘텐츠 -->
            <main class="p-6">
                <!-- 헤더 -->
                <div class="mb-6">
                    <h2 class="text-3xl font-bold text-gray-900">지점 손실 관리</h2>
                    <p class="text-gray-500 mt-1">유통기한 임박 상품 및 손실 기록을 관리하세요</p>
                </div>

                <!-- 필터 -->
                <div class="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <!-- 지점 선택 -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">지점 선택</label>
                            <select id="branchSelect" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                                <option value="전체">전체</option>
                                <option value="본사 물류창고">본사 물류창고</option>
                                <option value="강남점">강남점</option>
                                <option value="홍대점">홍대점</option>
                                <option value="신촌점">신촌점</option>
                                <option value="이대점">이대점</option>
                            </select>
                        </div>

                        <!-- 시작 날짜 -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">시작 날짜</label>
                            <input type="date" id="startDate" value="2026-03-01" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                        </div>

                        <!-- 종료 날짜 -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">종료 날짜</label>
                            <input type="date" id="endDate" value="2026-04-05" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                        </div>
                    </div>

                    <div class="flex items-center gap-2">
                        <button onclick="handleFilter()" class="px-6 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F] font-medium transition-colors">
                            조회하기
                        </button>
                        <button onclick="handleReset()" class="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors">
                            초기화
                        </button>
                    </div>
                </div>

                <!-- 탭 -->
                <div class="flex gap-4 mb-6 border-b border-gray-200">
                    <button onclick="setActiveTab('expiry')" class="pb-3 px-4 font-semibold border-b-2 tab-btn active" data-tab="expiry">
                        <i class="fas fa-hourglass-end w-4 h-4 mr-2"></i>유통기한 임박 (<span id="expiryCount">0</span>)
                    </button>
                    <button onclick="setActiveTab('disposal')" class="pb-3 px-4 font-semibold border-b-2 tab-btn" data-tab="disposal">
                        <i class="fas fa-trash w-4 h-4 mr-2"></i>손실 기록 (<span id="disposalCount">0</span>)
                    </button>
                </div>

                <!-- 탭 1: 유통기한 임박 -->
                <div id="expiryTab" class="tab-content active">
                    <!-- 통계 카드 -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div class="bg-white rounded-lg border border-gray-200 p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-gray-600">긴급</p>
                                    <p class="text-3xl font-bold text-red-600" id="urgentCount">0</p>
                                </div>
                                <i class="fas fa-exclamation-circle text-red-600 text-4xl opacity-20"></i>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg border border-gray-200 p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-gray-600">주의</p>
                                    <p class="text-3xl font-bold text-yellow-600" id="warningCount">0</p>
                                </div>
                                <i class="fas fa-exclamation-triangle text-yellow-600 text-4xl opacity-20"></i>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg border border-gray-200 p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-gray-600">전체</p>
                                    <p class="text-3xl font-bold text-blue-600" id="totalExpiryCount">0</p>
                                </div>
                                <i class="fas fa-box text-blue-600 text-4xl opacity-20"></i>
                            </div>
                        </div>
                    </div>

                    <!-- 지점별 재고 현황 -->
                    <div id="branchListContainer" class="space-y-4">
                        <!-- 동적으로 생성됨 -->
                    </div>
                </div>

                <!-- 탭 2: 손실 기록 -->
                <div id="disposalTab" class="tab-content hidden">
                    <!-- 통계 카드 -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div class="bg-white rounded-lg border border-gray-200 p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-gray-600">총 손실액</p>
                                    <p class="text-3xl font-bold text-red-600" id="totalAmount">0원</p>
                                </div>
                                <i class="fas fa-dollar-sign text-red-600 text-4xl opacity-20"></i>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg border border-gray-200 p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-gray-600">기록 건수</p>
                                    <p class="text-3xl font-bold text-blue-600" id="disposalRecordCount">0</p>
                                </div>
                                <i class="fas fa-list text-blue-600 text-4xl opacity-20"></i>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg border border-gray-200 p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-gray-600">주요 사유</p>
                                    <p class="text-lg font-bold text-gray-900" id="topReason">-</p>
                                </div>
                                <i class="fas fa-chart-pie text-gray-600 text-4xl opacity-20"></i>
                            </div>
                        </div>
                    </div>

                    <!-- 테이블 -->
                    <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead class="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th class="text-left py-4 px-6 text-sm font-semibold text-gray-900">날짜</th>
                                        <th class="text-left py-4 px-6 text-sm font-semibold text-gray-900">지점</th>
                                        <th class="text-left py-4 px-6 text-sm font-semibold text-gray-900">품목명</th>
                                        <th class="text-right py-4 px-6 text-sm font-semibold text-gray-900">수량</th>
                                        <th class="text-right py-4 px-6 text-sm font-semibold text-gray-900">손실액</th>
                                        <th class="text-left py-4 px-6 text-sm font-semibold text-gray-900">사유</th>
                                    </tr>
                                </thead>
                                <tbody id="disposalTableBody">
                                    <!-- 동적으로 생성됨 -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <script>
        // 전역 상태
        let allExpiryData = [];
        let filteredExpiryData = [];
        let allDisposalData = [];
        let filteredDisposalData = [];
        let activeTab = 'expiry';

        // Mock 유통기한 임박 데이터
        const mockExpiryItems = [
            { id: "1", branch: "강남점", itemName: "소고기 패티", itemCode: "MEAT-001", category: "육류", quantity: 45, unit: "개", receivedDate: "2026-03-20", expiryDate: "2026-03-30", daysLeft: 1, status: "urgent" },
            { id: "1-2", branch: "강남점", itemName: "소고기 패티", itemCode: "MEAT-001", category: "육류", quantity: 30, unit: "개", receivedDate: "2026-03-18", expiryDate: "2026-03-29", daysLeft: 0, status: "urgent" },
            { id: "2", branch: "강남점", itemName: "생크림", itemCode: "DAIRY-001", category: "유제품", quantity: 12, unit: "L", receivedDate: "2026-03-25", expiryDate: "2026-03-31", daysLeft: 2, status: "urgent" },
            { id: "3", branch: "홍대점", itemName: "소고기 패티", itemCode: "MEAT-001", category: "육류", quantity: 38, unit: "개", receivedDate: "2026-03-20", expiryDate: "2026-03-30", daysLeft: 1, status: "urgent" },
            { id: "3-2", branch: "홍대점", itemName: "소고기 패티", itemCode: "MEAT-001", category: "육류", quantity: 25, unit: "개", receivedDate: "2026-03-22", expiryDate: "2026-04-01", daysLeft: 3, status: "warning" },
            { id: "4", branch: "본사 물류창고", itemName: "체다치즈", itemCode: "DAIRY-002", category: "유제품", quantity: 50, unit: "장", receivedDate: "2026-03-24", expiryDate: "2026-03-31", daysLeft: 2, status: "urgent" },
            { id: "4-2", branch: "본사 물류창고", itemName: "체다치즈", itemCode: "DAIRY-002", category: "유제품", quantity: 35, unit: "장", receivedDate: "2026-03-23", expiryDate: "2026-03-30", daysLeft: 1, status: "urgent" },
            { id: "5", branch: "신촌점", itemName: "양상추", itemCode: "VEG-002", category: "채소", quantity: 8, unit: "kg", receivedDate: "2026-03-26", expiryDate: "2026-04-01", daysLeft: 3, status: "warning" },
            { id: "5-2", branch: "신촌점", itemName: "양상추", itemCode: "VEG-002", category: "채소", quantity: 6, unit: "kg", receivedDate: "2026-03-27", expiryDate: "2026-04-03", daysLeft: 5, status: "warning" },
            { id: "6", branch: "이대점", itemName: "토마토", itemCode: "VEG-003", category: "채소", quantity: 15, unit: "kg", receivedDate: "2026-03-25", expiryDate: "2026-04-02", daysLeft: 4, status: "warning" },
            { id: "7", branch: "강남점", itemName: "양상추", itemCode: "VEG-002", category: "채소", quantity: 10, unit: "kg", receivedDate: "2026-03-26", expiryDate: "2026-04-02", daysLeft: 4, status: "warning" },
            { id: "8", branch: "홍대점", itemName: "토마토", itemCode: "VEG-003", category: "채소", quantity: 12, unit: "kg", receivedDate: "2026-03-24", expiryDate: "2026-04-03", daysLeft: 5, status: "warning" },
            { id: "9", branch: "신촌점", itemName: "버거빵", itemCode: "BREAD-001", category: "빵류", quantity: 165, unit: "개", receivedDate: "2026-03-23", expiryDate: "2026-04-05", daysLeft: 7, status: "warning" },
            { id: "9-2", branch: "신촌점", itemName: "버거빵", itemCode: "BREAD-001", category: "빵류", quantity: 120, unit: "개", receivedDate: "2026-03-24", expiryDate: "2026-04-06", daysLeft: 8, status: "normal" },
            { id: "10", branch: "본사 물류창고", itemName: "생크림", itemCode: "DAIRY-001", category: "유제품", quantity: 65, unit: "L", receivedDate: "2026-03-22", expiryDate: "2026-04-06", daysLeft: 8, status: "normal" }
        ];

        // Mock 손실 기록 데이터
        const mockDisposalRecords = [
            { id: "1", date: "2026-04-04", branch: "강남점", itemName: "소고기 패티", quantity: 25, unit: "개", amount: 625000, reason: "유통기한 만료" },
            { id: "2", date: "2026-04-03", branch: "홍대점", itemName: "생크림", quantity: 8, unit: "L", amount: 240000, reason: "유통기한 만료" },
            { id: "3", date: "2026-04-03", branch: "강남점", itemName: "양상추", quantity: 12, unit: "kg", amount: 180000, reason: "품질 불량" },
            { id: "4", date: "2026-04-02", branch: "신촌점", itemName: "토마토", quantity: 15, unit: "kg", amount: 300000, reason: "유통기한 만료" },
            { id: "5", date: "2026-04-02", branch: "이대점", itemName: "체다치즈", quantity: 20, unit: "장", amount: 500000, reason: "품질 불량" },
            { id: "6", date: "2026-04-01", branch: "강남점", itemName: "버거빵", quantity: 50, unit: "개", amount: 250000, reason: "유통기한 만료" },
            { id: "7", date: "2026-04-01", branch: "홍대점", itemName: "소고기 패티", quantity: 18, unit: "개", amount: 450000, reason: "파손/손상" },
            { id: "8", date: "2026-03-31", branch: "신촌점", itemName: "생크림", quantity: 6, unit: "L", amount: 180000, reason: "유통기한 만료" },
            { id: "9", date: "2026-03-30", branch: "강남점", itemName: "양상추", quantity: 10, unit: "kg", amount: 150000, reason: "품질 불량" },
            { id: "10", date: "2026-03-29", branch: "이대점", itemName: "토마토", quantity: 12, unit: "kg", amount: 240000, reason: "유통기한 만료" }
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

        // 사이드바 메뉴 닫기
        function closeSidebar() {
            document.getElementById('sidebar').classList.add('-translate-x-full');
            document.getElementById('sidebarBackdrop').classList.add('hidden');
            document.getElementById('menuIcon').classList.remove('fa-xmark');
            document.getElementById('menuIcon').classList.add('fa-bars');
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
        document.getElementById('sidebarBackdrop').addEventListener('click', closeSidebar);

        // 탭 변경
        function setActiveTab(tab) {
            activeTab = tab;
            
            // 탭 버튼 스타일 업데이트
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active', 'text-[#00853D]', 'border-b-2', 'border-[#00853D]');
                btn.classList.add('text-gray-500');
            });
            
            const activeBtn = document.querySelector('[data-tab="' + tab + '"]');
            if (activeBtn) {
                activeBtn.classList.add('active', 'text-[#00853D]', 'border-b-2', 'border-[#00853D]');
                activeBtn.classList.remove('text-gray-500');
            }

            // 탭 콘텐츠 표시
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('hidden');
                content.classList.remove('active');
            });
            
            const activeContent = document.getElementById(tab + 'Tab');
            if (activeContent) {
                activeContent.classList.remove('hidden');
                activeContent.classList.add('active');
            }

            if (tab === 'expiry') {
                renderExpiryTab();
            } else if (tab === 'disposal') {
                renderDisposalTab();
            }
        }

        // 필터링
        function handleFilter() {
            const selectedBranch = document.getElementById('branchSelect').value;
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;

            // 유통기한 필터
            filteredExpiryData = mockExpiryItems.filter(item => {
                const matchesBranch = selectedBranch === '전체' || item.branch === selectedBranch;
                const expiryDate = new Date(item.expiryDate);
                const start = new Date(startDate);
                const end = new Date(endDate);
                const matchesDate = expiryDate >= start && expiryDate <= end;
                return matchesBranch && matchesDate;
            });

            // 손실 기록 필터
            filteredDisposalData = mockDisposalRecords.filter(record => {
                const matchesBranch = selectedBranch === '전체' || record.branch === selectedBranch;
                const recordDate = new Date(record.date);
                const start = new Date(startDate);
                const end = new Date(endDate);
                const matchesDate = recordDate >= start && recordDate <= end;
                return matchesBranch && matchesDate;
            });

            // 정렬
            filteredExpiryData.sort((a, b) => {
                if (a.daysLeft !== b.daysLeft) {
                    return a.daysLeft - b.daysLeft;
                }
                return a.branch.localeCompare(b.branch);
            });

            if (activeTab === 'expiry') {
                renderExpiryTab();
            } else if (activeTab === 'disposal') {
                renderDisposalTab();
            }
        }

        // 초기화
        function handleReset() {
            document.getElementById('branchSelect').value = '전체';
            document.getElementById('startDate').value = '2026-03-01';
            document.getElementById('endDate').value = '2026-04-05';
            
            filteredExpiryData = mockExpiryItems.slice();
            filteredDisposalData = mockDisposalRecords.slice();
            
            if (activeTab === 'expiry') {
                renderExpiryTab();
            } else if (activeTab === 'disposal') {
                renderDisposalTab();
            }
        }

        // 유통기한 임박 탭 렌더링
        function renderExpiryTab() {
            const urgentCount = filteredExpiryData.filter(i => i.daysLeft <= 2).length;
            const warningCount = filteredExpiryData.filter(i => i.daysLeft > 2 && i.daysLeft <= 7).length;
            const totalCount = filteredExpiryData.length;

            document.getElementById('expiryCount').textContent = totalCount;
            document.getElementById('urgentCount').textContent = urgentCount;
            document.getElementById('warningCount').textContent = warningCount;
            document.getElementById('totalExpiryCount').textContent = totalCount;

            // 지점별 그룹핑
            const branchGroups = {};
            filteredExpiryData.forEach(item => {
                if (!branchGroups[item.branch]) {
                    branchGroups[item.branch] = [];
                }
                branchGroups[item.branch].push(item);
            });

            // 지점별 카드 렌더링
            const branchListContainer = document.getElementById('branchListContainer');
            branchListContainer.innerHTML = '';

            Object.keys(branchGroups).sort().forEach(branch => {
                const items = branchGroups[branch];
                const urgentItems = items.filter(i => i.daysLeft <= 2).length;
                const warningItems = items.filter(i => i.daysLeft > 2 && i.daysLeft <= 7).length;

                let branchCardHtml = '<div class="p-6 border-b border-gray-200 bg-gray-50"><div class="flex items-center justify-between"><h3 class="font-semibold text-gray-900">' + branch + '</h3><div class="flex gap-2"><span class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">긴급: ' + urgentItems + '</span><span class="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">주의: ' + warningItems + '</span></div></div></div><div class="overflow-x-auto"><table class="w-full"><thead class="bg-gray-50 border-b border-gray-200"><tr><th class="text-left py-3 px-4 text-sm font-semibold text-gray-900">품목명</th><th class="text-left py-3 px-4 text-sm font-semibold text-gray-900">수신일</th><th class="text-left py-3 px-4 text-sm font-semibold text-gray-900">유통기한</th><th class="text-center py-3 px-4 text-sm font-semibold text-gray-900">남은 일수</th><th class="text-right py-3 px-4 text-sm font-semibold text-gray-900">재고</th></tr></thead><tbody>';

                items.forEach(item => {
                    const daysLeftClass = item.daysLeft <= 2 ? 'text-red-600 font-semibold' : item.daysLeft <= 7 ? 'text-yellow-600 font-semibold' : 'text-green-600';
                    const statusBadge = item.daysLeft <= 2 ? '<span class="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">긴급</span>' : item.daysLeft <= 7 ? '<span class="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">주의</span>' : '<span class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">정상</span>';
                    
                    branchCardHtml += '<tr class="border-b border-gray-100 hover:bg-gray-50"><td class="py-3 px-4 text-sm text-gray-900">' + item.itemName + '</td><td class="py-3 px-4 text-sm text-gray-600">' + item.receivedDate + '</td><td class="py-3 px-4 text-sm text-gray-600">' + item.expiryDate + '</td><td class="py-3 px-4 text-center">' + statusBadge + '<span class="block text-sm ' + daysLeftClass + ' mt-1">' + item.daysLeft + '일</span></td><td class="py-3 px-4 text-right text-sm font-medium text-gray-900">' + item.quantity + item.unit + '</td></tr>';
                });

                branchCardHtml += '</tbody></table></div>';
                
                const branchCard = document.createElement('div');
                branchCard.className = 'bg-white rounded-lg border border-gray-200 overflow-hidden';
                branchCard.innerHTML = branchCardHtml;
                branchListContainer.appendChild(branchCard);
            });

            if (branchListContainer.innerHTML === '') {
                branchListContainer.innerHTML = '<div class="bg-white rounded-lg border border-gray-200 p-12 text-center"><i class="fas fa-box w-16 h-16 mx-auto mb-4 text-gray-300"></i><h3 class="text-lg font-semibold text-gray-900 mb-2">데이터 없음</h3><p class="text-gray-500">조건에 맞는 유통기한 임박 상품이 없습니다</p></div>';
            }
        }

        // 손실 기록 탭 렌더링
        function renderDisposalTab() {
            const totalAmount = filteredDisposalData.reduce((sum, r) => sum + r.amount, 0);
            const disposalCount = filteredDisposalData.length;
            
            // 손실 사유별 통계
            const reasonStats = {};
            filteredDisposalData.forEach(r => {
                reasonStats[r.reason] = (reasonStats[r.reason] || 0) + 1;
            });

            const topReason = Object.entries(reasonStats).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';
            const formattedAmount = totalAmount.toLocaleString('ko-KR');

            document.getElementById('disposalCount').textContent = disposalCount;
            document.getElementById('totalAmount').textContent = formattedAmount + '원';
            document.getElementById('disposalRecordCount').textContent = disposalCount;
            document.getElementById('topReason').textContent = topReason;

            // 테이블 렌더링
            const tbody = document.getElementById('disposalTableBody');
            tbody.innerHTML = '';

            if (filteredDisposalData.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" class="py-12 text-center text-gray-500"><i class="fas fa-box w-12 h-12 mx-auto mb-3 text-gray-400"></i><p>손실 기록이 없습니다</p></td></tr>';
                return;
            }

            filteredDisposalData.forEach(record => {
                const reasonColorClass = record.reason === '유통기한 만료' ? 'bg-red-100 text-red-700' : record.reason === '품질 불량' ? 'bg-yellow-100 text-yellow-700' : 'bg-orange-100 text-orange-700';
                const tr = document.createElement('tr');
                tr.className = 'border-b border-gray-100 hover:bg-gray-50';
                
                const amount = record.amount.toLocaleString('ko-KR');
                tr.innerHTML = '<td class="py-4 px-6 text-sm text-gray-900">' + record.date + '</td><td class="py-4 px-6 text-sm"><span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">' + record.branch + '</span></td><td class="py-4 px-6 text-sm font-medium text-gray-900">' + record.itemName + '</td><td class="py-4 px-6 text-right text-sm text-gray-600">' + record.quantity + record.unit + '</td><td class="py-4 px-6 text-right text-sm font-semibold text-red-600">' + amount + '원</td><td class="py-4 px-6 text-sm"><span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium ' + reasonColorClass + '">' + record.reason + '</span></td>';
                
                tbody.appendChild(tr);
            });
        }

        // 사용자 메뉴 외부 클릭 시 닫기
        document.addEventListener('click', function(e) {
            const userMenu = document.getElementById('userMenu');
            if (!e.target.closest('button[onclick="toggleUserMenu()"]') && 
                !e.target.closest('#userMenu')) {
                userMenu.classList.add('hidden');
            }
        });

        // 초기 로드
        window.addEventListener('DOMContentLoaded', function() {
            filteredExpiryData = mockExpiryItems.slice();
            filteredDisposalData = mockDisposalRecords.slice();
            renderExpiryTab();
        });
    </script>
</body>
</html>


