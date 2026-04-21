<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>지점재고 현황 - ZERO LOSS 본사 관리 시스템</title>
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
                    <h2 class="text-3xl font-bold text-gray-900">지점재고 현황</h2>
                    <p class="text-gray-500 mt-1">모든 지점의 재고 현황을 조회하세요</p>
                </div>

                <!-- 필터 -->
                <div class="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <!-- 지점 선택 -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">지점 선택</label>
                            <select id="branchSelect" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                                <option value="전체">전체</option>
                                <option value="강남점">강남점</option>
                                <option value="홍대점">홍대점</option>
                                <option value="신촌점">신촌점</option>
                                <option value="이대점">이대점</option>
                                <option value="본사 물류창고">본사 물류창고</option>
                            </select>
                        </div>

                        <!-- 카테고리 선택 -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">카테고리 선택</label>
                            <select id="categorySelect" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                                <option value="전체">전체</option>
                                <option value="육류">육류</option>
                                <option value="채소">채소</option>
                                <option value="유제품">유제품</option>
                                <option value="빵류">빵류</option>
                                <option value="음료">음료</option>
                                <option value="조미료">조미료</option>
                            </select>
                        </div>

                        <!-- 품목명 선택 -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">품목명 선택</label>
                            <select id="itemNameSelect" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                                <option value="전체">전체</option>
                                <option value="소고기 패티">소고기 패티</option>
                                <option value="감자">감자</option>
                                <option value="생크림">생크림</option>
                                <option value="양상추">양상추</option>
                                <option value="버거빵">버거빵</option>
                                <option value="체다치즈">체다치즈</option>
                                <option value="식용유">식용유</option>
                                <option value="콜라 시럽">콜라 시럽</option>
                            </select>
                        </div>

                        <!-- 검색 -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">검색어</label>
                            <div class="relative">
                                <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"></i>
                                <input type="text" id="searchInput" placeholder="품목명, 코드..." class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-2">
                        <button onclick="handleSearch()" class="px-6 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F] font-medium transition-colors">
                            조회하기
                        </button>
                        <button onclick="handleReset()" class="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors">
                            초기화
                        </button>
                    </div>
                </div>

                <!-- 탭 -->
                <div id="tabsContainer" class="bg-white rounded-lg border border-gray-200 hidden mb-6">
                    <div class="flex border-b border-gray-200">
                        <button onclick="setActiveTab('all')" class="flex-1 px-6 py-4 font-semibold transition-colors tab-btn active" data-tab="all">
                            전체 재고 (<span id="totalCount">0</span>)
                        </button>
                        <button onclick="setActiveTab('expiring')" class="flex-1 px-6 py-4 font-semibold transition-colors tab-btn" data-tab="expiring">
                            유통기한 임박 (0)
                        </button>
                        <button onclick="setActiveTab('low')" class="flex-1 px-6 py-4 font-semibold transition-colors tab-btn" data-tab="low">
                            안전재고 미달 (<span id="lowCount">0</span>)
                        </button>
                    </div>
                </div>

                <!-- 재고 리스트 -->
                <div id="inventoryTableContainer" class="bg-white rounded-lg border border-gray-200 overflow-hidden hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th class="text-left py-4 px-6 text-sm font-semibold text-gray-900">지점</th>
                                    <th class="text-left py-4 px-6 text-sm font-semibold text-gray-900">품목코드</th>
                                    <th class="text-left py-4 px-6 text-sm font-semibold text-gray-900">품목명</th>
                                    <th class="text-left py-4 px-6 text-sm font-semibold text-gray-900">카테고리</th>
                                    <th class="text-right py-4 px-6 text-sm font-semibold text-gray-900">현재 재고</th>
                                    <th class="text-right py-4 px-6 text-sm font-semibold text-gray-900">안전 재고</th>
                                    <th class="text-center py-4 px-6 text-sm font-semibold text-gray-900">상태</th>
                                    <th class="text-left py-4 px-6 text-sm font-semibold text-gray-900">최종 업데이트</th>
                                </tr>
                            </thead>
                            <tbody id="inventoryTableBody">
                                <!-- 동적으로 생성됨 -->
                            </tbody>
                        </table>
                    </div>

                    <!-- 페이지네이션 -->
                    <div id="paginationContainer" class="px-6 py-4 border-t border-gray-200 flex items-center justify-between hidden">
                        <div id="paginationInfo" class="text-sm text-gray-600">
                            <!-- 동적으로 생성됨 -->
                        </div>

                        <div class="flex items-center gap-2">
                            <button onclick="previousPage()" id="prevBtn" class="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                <i class="fas fa-chevron-left w-5 h-5"></i>
                            </button>

                            <div id="pageButtons" class="flex items-center gap-1">
                                <!-- 동적으로 생성됨 -->
                            </div>

                            <button onclick="nextPage()" id="nextBtn" class="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                <i class="fas fa-chevron-right w-5 h-5"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 초기 상태 메시지 -->
                <div id="initialStateContainer" class="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <i class="fas fa-box w-16 h-16 mx-auto mb-4 text-gray-300"></i>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">조회 조건을 선택하세요</h3>
                    <p class="text-gray-500">
                        지점, 카테고리, 품목명을 선택하거나 검색어를 입력한 후 '조회하기' 버튼을 클릭하세요
                    </p>
                </div>
            </main>
        </div>
    </div>

    <script>
        // 전역 상태
        let allData = [];
        let filteredData = [];
        let currentPage = 1;
        const ITEMS_PER_PAGE = 10;
        let activeTab = 'all';
        let hasSearched = false;

        // Mock 데이터
        const mockItemStocks = [
            {
                id: "1",
                itemCode: "MEAT-001",
                itemName: "소고기 패티",
                category: "육류",
                unit: "개",
                safetyStock: 50,
                status: "low",
                lastUpdated: "2026-04-01 09:30",
                branches: [
                    { branch: "강남점", quantity: 45, status: "low" },
                    { branch: "홍대점", quantity: 32, status: "low" },
                    { branch: "신촌점", quantity: 38, status: "low" },
                    { branch: "이대점", quantity: 42, status: "low" },
                    { branch: "본사 물류창고", quantity: 250, status: "normal" },
                ]
            },
            {
                id: "1-out",
                itemCode: "MEAT-001",
                itemName: "소고기 패티",
                category: "육류",
                unit: "개",
                safetyStock: 50,
                status: "out",
                lastUpdated: "2026-04-01 09:30",
                branches: [
                    { branch: "압구정점", quantity: 0, status: "out" }
                ]
            },
            {
                id: "2",
                itemCode: "VEG-001",
                itemName: "감자",
                category: "채소",
                unit: "kg",
                safetyStock: 50,
                status: "low",
                lastUpdated: "2026-04-01 10:15",
                branches: [
                    { branch: "강남점", quantity: 15, status: "low" },
                    { branch: "홍대점", quantity: 22, status: "low" },
                    { branch: "신촌점", quantity: 28, status: "low" },
                    { branch: "이대점", quantity: 25, status: "low" },
                    { branch: "본사 물류창고", quantity: 180, status: "normal" },
                ]
            },
            {
                id: "3",
                itemCode: "DAIRY-001",
                itemName: "생크림",
                category: "유제품",
                unit: "L",
                safetyStock: 15,
                status: "low",
                lastUpdated: "2026-04-01 08:45",
                branches: [
                    { branch: "강남점", quantity: 12, status: "low" },
                    { branch: "홍대점", quantity: 13, status: "low" },
                    { branch: "신촌점", quantity: 14, status: "low" },
                    { branch: "이대점", quantity: 11, status: "low" },
                    { branch: "본사 물류창고", quantity: 65, status: "normal" },
                ]
            },
            {
                id: "4",
                itemCode: "VEG-002",
                itemName: "양상추",
                category: "채소",
                unit: "kg",
                safetyStock: 20,
                status: "low",
                lastUpdated: "2026-04-01 11:20",
                branches: [
                    { branch: "강남점", quantity: 8, status: "low" },
                    { branch: "홍대점", quantity: 10, status: "low" },
                    { branch: "신촌점", quantity: 12, status: "low" },
                    { branch: "이대점", quantity: 9, status: "low" },
                    { branch: "본사 물류창고", quantity: 85, status: "normal" },
                ]
            },
            {
                id: "5",
                itemCode: "BREAD-001",
                itemName: "버거빵",
                category: "빵류",
                unit: "개",
                safetyStock: 150,
                status: "low",
                lastUpdated: "2026-04-01 07:30",
                branches: [
                    { branch: "강남점", quantity: 80, status: "low" },
                    { branch: "홍대점", quantity: 120, status: "low" },
                    { branch: "신촌점", quantity: 135, status: "low" },
                    { branch: "이대점", quantity: 145, status: "low" },
                    { branch: "본사 물류창고", quantity: 650, status: "normal" },
                ]
            },
            {
                id: "6",
                itemCode: "DAIRY-002",
                itemName: "체다치즈",
                category: "유제품",
                unit: "장",
                safetyStock: 25,
                status: "normal",
                lastUpdated: "2026-04-01 09:00",
                branches: [
                    { branch: "강남점", quantity: 30, status: "normal" },
                    { branch: "홍대점", quantity: 27, status: "normal" },
                    { branch: "신촌점", quantity: 28, status: "normal" },
                    { branch: "이대점", quantity: 26, status: "normal" },
                    { branch: "본사 물류창고", quantity: 150, status: "normal" },
                ]
            },
            {
                id: "7",
                itemCode: "SAUCE-001",
                itemName: "식용유",
                category: "조미료",
                unit: "L",
                safetyStock: 15,
                status: "normal",
                lastUpdated: "2026-04-01 10:30",
                branches: [
                    { branch: "강남점", quantity: 18, status: "normal" },
                    { branch: "홍대점", quantity: 16, status: "normal" },
                    { branch: "신촌점", quantity: 17, status: "normal" },
                    { branch: "이대점", quantity: 14, status: "low" },
                    { branch: "본사 물류창고", quantity: 75, status: "normal" },
                ]
            },
            {
                id: "8",
                itemCode: "BEV-001",
                itemName: "콜라 시럽",
                category: "음료",
                unit: "L",
                safetyStock: 10,
                status: "normal",
                lastUpdated: "2026-04-01 08:15",
                branches: [
                    { branch: "강남점", quantity: 12, status: "normal" },
                    { branch: "홍대점", quantity: 11, status: "normal" },
                    { branch: "신촌점", quantity: 10, status: "normal" },
                    { branch: "이대점", quantity: 9, status: "low" },
                    { branch: "본사 물류창고", quantity: 45, status: "normal" },
                ]
            }
        ];

        // 사이드바 토글
        function toggleSidebar() {
            const body = document.body;
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

        // 데이터 평탄화
        function flattenData() {
            allData = [];
            mockItemStocks.forEach(item => {
                item.branches
                    .filter(branch => branch.branch !== '본사 물류창고')
                    .forEach(branch => {
                        allData.push({
                            id: item.id,
                            itemCode: item.itemCode,
                            itemName: item.itemName,
                            category: item.category,
                            unit: item.unit,
                            safetyStock: item.safetyStock,
                            currentStock: branch.quantity,
                            status: branch.status,
                            lastUpdated: item.lastUpdated,
                            branchName: branch.branch
                        });
                    });
            });
        }

        // 필터링 아래로
        function applyFilters() {
            const searchQuery = document.getElementById('searchInput').value.toLowerCase();
            const selectedBranch = document.getElementById('branchSelect').value;
            const selectedCategory = document.getElementById('categorySelect').value;
            const selectedItemName = document.getElementById('itemNameSelect').value;

            filteredData = allData.filter(item => {
                const matchesSearch = !searchQuery || 
                    item.itemName.toLowerCase().includes(searchQuery) ||
                    item.itemCode.toLowerCase().includes(searchQuery) ||
                    item.branchName.includes(searchQuery);
                
                const matchesBranch = selectedBranch === '전체' || item.branchName === selectedBranch;
                const matchesCategory = selectedCategory === '전체' || item.category === selectedCategory;
                const matchesItemName = selectedItemName === '전체' || item.itemName === selectedItemName;

                let matchesTab = true;
                if (activeTab === 'low') {
                    matchesTab = item.status === 'low' || item.status === 'out';
                } else if (activeTab === 'expiring') {
                    matchesTab = false; // Mock 데이터에선 없음
                }

                return matchesSearch && matchesBranch && matchesCategory && matchesItemName && matchesTab;
            });
        }

        // 조회하기
        function handleSearch() {
            flattenData();
            applyFilters();
            hasSearched = true;
            currentPage = 1;
            activeTab = 'all';
            
            updateUI();
        }

        // 초기화
        function handleReset() {
            document.getElementById('searchInput').value = '';
            document.getElementById('branchSelect').value = '전체';
            document.getElementById('categorySelect').value = '전체';
            document.getElementById('itemNameSelect').value = '전체';
            
            hasSearched = false;
            currentPage = 1;
            activeTab = 'all';
            filteredData = [];
            allData = [];
            
            updateUI();
        }

        // 탭 변경
        function setActiveTab(tab) {
            activeTab = tab;
            currentPage = 1;
            applyFilters();
            renderTable();
            updateTabButtons();
        }

        // UI 업데이트
        function updateUI() {
            const initialState = document.getElementById('initialStateContainer');
            const tabsContainer = document.getElementById('tabsContainer');
            const tableContainer = document.getElementById('inventoryTableContainer');

            if (hasSearched) {
                initialState.classList.add('hidden');
                tabsContainer.classList.remove('hidden');
                tableContainer.classList.remove('hidden');
                
                updateStats();
                renderTable();
                updateTabButtons();
            } else {
                initialState.classList.remove('hidden');
                tabsContainer.classList.add('hidden');
                tableContainer.classList.add('hidden');
            }
        }

        // 통계 업데이트
        function updateStats() {
            const total = filteredData.length;
            const low = filteredData.filter(i => i.status === 'low' || i.status === 'out').length;
            
            document.getElementById('totalCount').textContent = total;
            document.getElementById('lowCount').textContent = low;
        }

        // 테이블 렌더링
        function renderTable() {
            const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
            const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const currentItems = filteredData.slice(startIndex, endIndex);

            const tbody = document.getElementById('inventoryTableBody');
            tbody.innerHTML = '';

            if (currentItems.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="8" class="py-12 text-center text-gray-500">
                            <i class="fas fa-box w-12 h-12 mx-auto mb-3 text-gray-400"></i>
                            <p>검색 결과가 없습니다</p>
                        </td>
                    </tr>
                `;
                document.getElementById('paginationContainer').classList.add('hidden');
                return;
            }

            currentItems.forEach(item => {
                const statusBadge = getStatusBadge(item.status);
                const statusColorClass = item.status === 'normal' ? 'text-green-600' :
                                        item.status === 'low' ? 'text-yellow-600' :
                                        'text-red-600';
                
                const tr = document.createElement('tr');
                tr.className = 'border-b border-gray-100 hover:bg-gray-50';
                tr.innerHTML = `
                    <td class="py-4 px-6">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                            ` + item.branchName + `
                        </span>
                    </td>
                    <td class="py-4 px-6 font-mono text-sm text-gray-600">` + item.itemCode + `</td>
                    <td class="py-4 px-6 font-medium text-gray-900">` + item.itemName + `</td>
                    <td class="py-4 px-6">
                        <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            ` + item.category + `
                        </span>
                    </td>
                    <td class="py-4 px-6 text-right">
                        <span class="font-semibold ` + statusColorClass + `">
                            ` + item.currentStock + item.unit + `
                        </span>
                    </td>
                    <td class="py-4 px-6 text-right text-gray-600">
                        ` + item.safetyStock + item.unit + `
                    </td>
                    <td class="py-4 px-6 text-center">` + statusBadge + `</td>
                    <td class="py-4 px-6 text-sm text-gray-500">` + item.lastUpdated + `</td>
                `;
                tbody.appendChild(tr);
            });

            // 페이지네이션 업데이트
            updatePagination(totalPages, startIndex, endIndex);
        }

        // 페이지네이션 업데이트
        function updatePagination(totalPages, startIndex, endIndex) {
            const paginationContainer = document.getElementById('paginationContainer');
            const paginationInfo = document.getElementById('paginationInfo');
            
            if (totalPages <= 1) {
                paginationContainer.classList.add('hidden');
                return;
            }

            paginationContainer.classList.remove('hidden');
            const endValue = Math.min(endIndex, filteredData.length);
            const totalItems = filteredData.length;
            paginationInfo.textContent = (startIndex + 1) + '-' + endValue + ' / ' + totalItems + '개';

            const pageButtons = document.getElementById('pageButtons');
            pageButtons.innerHTML = '';

            for (let page = 1; page <= totalPages; page++) {
                if (page === 1 || page === totalPages || 
                    (page >= currentPage - 1 && page <= currentPage + 1)) {
                    const btn = document.createElement('button');
                    btn.className = page === currentPage 
                        ? 'min-w-[40px] px-3 py-2 rounded-lg text-sm font-medium bg-[#00853D] text-white'
                        : 'min-w-[40px] px-3 py-2 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 text-gray-700';
                    btn.textContent = page;
                    btn.onclick = () => goToPage(page);
                    pageButtons.appendChild(btn);
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                    const span = document.createElement('span');
                    span.className = 'px-2 text-gray-400';
                    span.textContent = '...';
                    pageButtons.appendChild(span);
                }
            }

            document.getElementById('prevBtn').disabled = currentPage === 1;
            document.getElementById('nextBtn').disabled = currentPage === totalPages;
        }

        // 페이지 이동
        function goToPage(page) {
            currentPage = page;
            renderTable();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // 이전 페이지
        function previousPage() {
            if (currentPage > 1) {
                goToPage(currentPage - 1);
            }
        }

        // 다음 페이지
        function nextPage() {
            const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
            if (currentPage < totalPages) {
                goToPage(currentPage + 1);
            }
        }

        // 탭 버튼 업데이트
        function updateTabButtons() {
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active', 'text-[#00853D]', 'border-b-2', 'border-[#00853D]', 'bg-green-50');
                btn.classList.add('text-gray-500', 'hover:text-gray-700', 'hover:bg-gray-50');
            });

            const activeBtn = document.querySelector(`[data-tab="${activeTab}"]`);
            if (activeBtn) {
                activeBtn.classList.add('active', 'text-[#00853D]', 'border-b-2', 'border-[#00853D]', 'bg-green-50');
                activeBtn.classList.remove('text-gray-500', 'hover:text-gray-700', 'hover:bg-gray-50');
            }
        }

        // 상태 배지
        function getStatusBadge(status) {
            switch (status) {
                case 'normal':
                    return '<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"><i class="fas fa-check-circle w-3 h-3"></i> 정상</span>';
                case 'low':
                    return '<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700"><i class="fas fa-exclamation-triangle w-3 h-3"></i> 부족</span>';
                case 'out':
                    return '<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700"><i class="fas fa-box w-3 h-3"></i> 품절</span>';
                default:
                    return '';
            }
        }

        // 엔터 키 처리
        document.getElementById('searchInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });

        // 사용자 메뉴 외부 클릭 시 닫기
        document.addEventListener('click', function(e) {
            const userMenu = document.getElementById('userMenu');
            if (!e.target.closest('button[onclick="toggleUserMenu()"]') && 
                !e.target.closest('#userMenu')) {
                userMenu.classList.add('hidden');
            }
        });
    </script>
</body>
</html>


