<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>본사 물류창고 입고 - ZERO LOSS 본사 관리 시스템</title>
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
            <!-- 상단 헤더 -->
            <%@ include file="/hq/common/header.jspf" %>

            <!-- 페이지 콘텐츠 -->
            <main class="p-6">
                <!-- 헤더 -->
                <div class="mb-6 flex items-center justify-between">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900">본사 물류창고 입고</h2>
                        <p class="text-gray-500 mt-1">신규 입고를 등록하고 입고 이력을 관리하세요</p>
                    </div>
                    <button onclick="toggleReceiveForm()" class="flex items-center gap-2 px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F] font-medium transition-colors">
                        <i class="fas fa-plus w-5 h-5"></i>
                        신규 입고 등록
                    </button>
                </div>

                <!-- 신규 입고 등록 폼 -->
                <div id="receiveFormContainer" class="bg-white rounded-lg border border-gray-200 p-6 mb-6 hidden">
                    <h3 class="text-lg font-bold text-gray-900 mb-4">신규 입고 등록</h3>
                    <form onsubmit="handleReceive(event)">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            <!-- 공급사 -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">공급사 <span class="text-red-600">*</span></label>
                                <select id="formSupplier" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                                    <option value="">선택하세요</option>
                                    <option value="(주)프레시미트">(주)프레시미트</option>
                                    <option value="(주)유진유업">(주)유진유업</option>
                                    <option value="(주)신선농산">(주)신선농산</option>
                                    <option value="(주)베이커리월드">(주)베이커리월드</option>
                                    <option value="(주)글로벌푸드">(주)글로벌푸드</option>
                                    <option value="(주)한국식품">(주)한국식품</option>
                                </select>
                            </div>

                            <!-- 품목명 -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">품목명 <span class="text-red-600">*</span></label>
                                <select id="formItem" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                                    <option value="">선택하세요</option>
                                    <option value="MEAT-001">소고기 패티 (개)</option>
                                    <option value="DAIRY-001">생크림 (L)</option>
                                    <option value="VEG-001">감자 (kg)</option>
                                    <option value="VEG-002">양상추 (kg)</option>
                                    <option value="BREAD-001">버거빵 (개)</option>
                                    <option value="DAIRY-002">체다치즈 (장)</option>
                                    <option value="SAUCE-001">식용유 (L)</option>
                                    <option value="BEV-001">콜라 시럽 (L)</option>
                                </select>
                            </div>

                            <!-- 수량 -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">수량 <span class="text-red-600">*</span></label>
                                <input type="number" id="formQuantity" placeholder="수량 입력" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                            </div>

                            <!-- 단가 -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">단가 <span class="text-red-600">*</span></label>
                                <input type="number" id="formUnitPrice" placeholder="단가 입력" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                            </div>

                            <!-- 유통기한 -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">유통기한 <span class="text-red-600">*</span></label>
                                <input type="date" id="formExpiryDate" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                            </div>

                            <!-- 합계 -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">합계</label>
                                <div class="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
                                    <p class="text-sm font-semibold text-gray-900" id="totalAmount">₩0</p>
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-end gap-2">
                            <button type="button" onclick="toggleReceiveForm()" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors">취소</button>
                            <button type="submit" class="px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F] font-medium transition-colors">입고 등록</button>
                        </div>
                    </form>
                </div>

                <!-- 필터 -->
                <div class="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                        <!-- 공급사 선택 -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">공급사 선택</label>
                            <select id="filterSupplier" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                                <option value="전체">전체</option>
                                <option value="(주)프레시미트">(주)프레시미트</option>
                                <option value="(주)유진유업">(주)유진유업</option>
                                <option value="(주)신선농산">(주)신선농산</option>
                                <option value="(주)베이커리월드">(주)베이커리월드</option>
                                <option value="(주)글로벌푸드">(주)글로벌푸드</option>
                                <option value="(주)한국식품">(주)한국식품</option>
                            </select>
                        </div>

                        <!-- 카테고리 선택 -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">카테고리 선택</label>
                            <select id="filterCategory" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
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
                            <select id="filterItemName" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                                <option value="전체">전체</option>
                                <option value="소고기 패티">소고기 패티</option>
                                <option value="생크림">생크림</option>
                                <option value="감자">감자</option>
                                <option value="양상추">양상추</option>
                                <option value="버거빵">버거빵</option>
                                <option value="체다치즈">체다치즈</option>
                                <option value="식용유">식용유</option>
                                <option value="콜라 시럽">콜라 시럽</option>
                            </select>
                        </div>

                        <!-- 시작 날짜 -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">시작 날짜</label>
                            <input type="date" id="filterStartDate" value="2026-03-01" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                        </div>

                        <!-- 종료 날짜 -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">종료 날짜</label>
                            <input type="date" id="filterEndDate" value="2026-04-05" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                        </div>
                    </div>

                    <div class="flex items-center gap-2">
                        <button onclick="applyFilters()" class="px-6 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F] font-medium transition-colors">
                            조회하기
                        </button>
                        <button onclick="resetFilters()" class="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors">
                            초기화
                        </button>
                    </div>
                </div>

                <!-- 통계 -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div class="bg-white rounded-lg border border-gray-200 p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-600">조회 기간 입고액</p>
                                <p class="text-3xl font-bold text-[#00853D] mt-2" id="rangeTotal">₩0</p>
                            </div>
                            <i class="fas fa-box text-4xl text-[#00853D] opacity-20"></i>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg border border-gray-200 p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-600">조회 건수</p>
                                <p class="text-3xl font-bold text-blue-600 mt-2" id="totalRecords">0</p>
                            </div>
                            <i class="fas fa-list text-4xl text-blue-600 opacity-20"></i>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg border border-gray-200 p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-600">평균 입고가</p>
                                <p class="text-3xl font-bold text-purple-600 mt-2" id="avgPrice">₩0</p>
                            </div>
                            <i class="fas fa-chart-bar text-4xl text-purple-600 opacity-20"></i>
                        </div>
                    </div>
                </div>

                <!-- 입고 이력 테이블 -->
                <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th class="text-left py-4 px-6 text-sm font-semibold text-gray-900">날짜/시간</th>
                                    <th class="text-left py-4 px-6 text-sm font-semibold text-gray-900">공급사</th>
                                    <th class="text-left py-4 px-6 text-sm font-semibold text-gray-900">품목명</th>
                                    <th class="text-right py-4 px-6 text-sm font-semibold text-gray-900">수량</th>
                                    <th class="text-right py-4 px-6 text-sm font-semibold text-gray-900">단가</th>
                                    <th class="text-right py-4 px-6 text-sm font-semibold text-gray-900">합계</th>
                                    <th class="text-left py-4 px-6 text-sm font-semibold text-gray-900">유통기한</th>
                                    <th class="text-left py-4 px-6 text-sm font-semibold text-gray-900">담당자</th>
                                </tr>
                            </thead>
                            <tbody id="receiveTableBody">
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
            </main>
        </div>
    </div>

    <script>
        // 전역 상태
        let receiveHistory = [];
        let filteredRecords = [];
        let currentPage = 1;
        const ITEMS_PER_PAGE = 10;

        // Mock 데이터
        const mockReceiveHistory = [
            { id: "r1", date: "2026-03-29", time: "10:30", supplier: "(주)프레시미트", itemCode: "MEAT-001", itemName: "소고기 패티", category: "육류", quantity: 500, unit: "개", unitPrice: 25000, totalPrice: 12500000, expiryDate: "2026-04-15", handler: "김철수", status: "completed" },
            { id: "r2", date: "2026-03-29", time: "09:15", supplier: "(주)유진유업", itemCode: "DAIRY-001", itemName: "생크림", category: "유제품", quantity: 100, unit: "L", unitPrice: 30000, totalPrice: 3000000, expiryDate: "2026-04-20", handler: "이영희", status: "completed" },
            { id: "r3", date: "2026-03-28", time: "14:20", supplier: "(주)신선농산", itemCode: "VEG-001", itemName: "감자", category: "채소", quantity: 300, unit: "kg", unitPrice: 2500, totalPrice: 750000, expiryDate: "2026-04-28", handler: "박민수", status: "completed" },
            { id: "r4", date: "2026-03-28", time: "11:00", supplier: "(주)베이커리월드", itemCode: "BREAD-001", itemName: "버거빵", category: "빵류", quantity: 1000, unit: "개", unitPrice: 500, totalPrice: 500000, expiryDate: "2026-04-10", handler: "김철수", status: "completed" },
            { id: "r5", date: "2026-03-27", time: "16:45", supplier: "(주)신선농산", itemCode: "VEG-002", itemName: "양상추", category: "채소", quantity: 150, unit: "kg", unitPrice: 5000, totalPrice: 750000, expiryDate: "2026-04-05", handler: "이영희", status: "completed" },
            { id: "r6", date: "2026-03-26", time: "13:00", supplier: "(주)글로벌푸드", itemCode: "SAUCE-001", itemName: "식용유", category: "조미료", quantity: 50, unit: "L", unitPrice: 15000, totalPrice: 750000, expiryDate: "2026-08-20", handler: "박민수", status: "completed" },
            { id: "r7", date: "2026-03-25", time: "15:30", supplier: "(주)한국식품", itemCode: "BEV-001", itemName: "콜라 시럽", category: "음료", quantity: 80, unit: "L", unitPrice: 8000, totalPrice: 640000, expiryDate: "2026-07-15", handler: "김철수", status: "completed" },
            { id: "r8", date: "2026-03-24", time: "10:00", supplier: "(주)프레시미트", itemCode: "MEAT-001", itemName: "소고기 패티", category: "육류", quantity: 400, unit: "개", unitPrice: 25000, totalPrice: 10000000, expiryDate: "2026-04-10", handler: "이영희", status: "completed" },
            { id: "r9", date: "2026-03-23", time: "09:45", supplier: "(주)유진유업", itemCode: "DAIRY-002", itemName: "체다치즈", category: "유제품", quantity: 200, unit: "장", unitPrice: 3000, totalPrice: 600000, expiryDate: "2026-05-30", handler: "박민수", status: "completed" },
            { id: "r10", date: "2026-03-22", time: "14:15", supplier: "(주)신선농산", itemCode: "VEG-001", itemName: "감자", category: "채소", quantity: 250, unit: "kg", unitPrice: 2500, totalPrice: 625000, expiryDate: "2026-04-22", handler: "김철수", status: "completed" }
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

        // 신규 입고 등록 폼 토글
        function toggleReceiveForm() {
            const formContainer = document.getElementById('receiveFormContainer');
            formContainer.classList.toggle('hidden');
            
            if (!formContainer.classList.contains('hidden')) {
                document.getElementById('formSupplier').focus();
            }
        }

        // 입고 등록 처리
        function handleReceive(event) {
            event.preventDefault();
            
            const supplier = document.getElementById('formSupplier').value;
            const itemCode = document.getElementById('formItem').value;
            const quantity = parseInt(document.getElementById('formQuantity').value) || 0;
            const unitPrice = parseInt(document.getElementById('formUnitPrice').value) || 0;
            const expiryDate = document.getElementById('formExpiryDate').value;

            if (!supplier || !itemCode || !quantity || !unitPrice || !expiryDate) {
                alert('모든 필수 항목을 입력해주세요.');
                return;
            }

            const itemNames = { 'MEAT-001': '소고기 패티', 'DAIRY-001': '생크림', 'VEG-001': '감자', 'VEG-002': '양상추', 'BREAD-001': '버거빵', 'DAIRY-002': '체다치즈', 'SAUCE-001': '식용유', 'BEV-001': '콜라 시럽' };
            const categories = { 'MEAT-001': '육류', 'DAIRY-001': '유제품', 'VEG-001': '채소', 'VEG-002': '채소', 'BREAD-001': '빵류', 'DAIRY-002': '유제품', 'SAUCE-001': '조미료', 'BEV-001': '음료' };
            const units = { 'MEAT-001': '개', 'DAIRY-001': 'L', 'VEG-001': 'kg', 'VEG-002': 'kg', 'BREAD-001': '개', 'DAIRY-002': '장', 'SAUCE-001': 'L', 'BEV-001': 'L' };

            const now = new Date();
            const newRecord = {
                id: 'r' + Date.now(),
                date: now.toISOString().split('T')[0],
                time: now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0'),
                supplier: supplier,
                itemCode: itemCode,
                itemName: itemNames[itemCode],
                category: categories[itemCode],
                quantity: quantity,
                unit: units[itemCode],
                unitPrice: unitPrice,
                totalPrice: quantity * unitPrice,
                expiryDate: expiryDate,
                handler: '김철수',
                status: 'completed'
            };

            receiveHistory.unshift(newRecord);
            toggleReceiveForm();
            applyFilters();
            alert('입고 처리가 완료되었습니다.');
        }

        // 필터 적용
        function applyFilters() {
            const supplier = document.getElementById('filterSupplier').value;
            const category = document.getElementById('filterCategory').value;
            const itemName = document.getElementById('filterItemName').value;
            const startDate = document.getElementById('filterStartDate').value;
            const endDate = document.getElementById('filterEndDate').value;

            filteredRecords = receiveHistory.filter(record => {
                const matchSupplier = supplier === '전체' || record.supplier === supplier;
                const matchCategory = category === '전체' || record.category === category;
                const matchItemName = itemName === '전체' || record.itemName === itemName;
                const recordDate = new Date(record.date);
                const start = new Date(startDate);
                const end = new Date(endDate);
                const matchDate = recordDate >= start && recordDate <= end;
                return matchSupplier && matchCategory && matchItemName && matchDate;
            });

            currentPage = 1;
            renderTable();
            updateStats();
        }

        // 초기화
        function resetFilters() {
            document.getElementById('filterSupplier').value = '전체';
            document.getElementById('filterCategory').value = '전체';
            document.getElementById('filterItemName').value = '전체';
            document.getElementById('filterStartDate').value = '2026-03-01';
            document.getElementById('filterEndDate').value = '2026-04-05';
            
            applyFilters();
        }

        // 테이블 렌더링
        function renderTable() {
            const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);
            const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const currentItems = filteredRecords.slice(startIndex, endIndex);

            const tbody = document.getElementById('receiveTableBody');
            tbody.innerHTML = '';

            if (currentItems.length === 0) {
                tbody.innerHTML = '<tr><td colspan="8" class="py-12 text-center text-gray-500"><i class="fas fa-box w-12 h-12 mx-auto mb-3 text-gray-400"></i><p>조회 결과가 없습니다</p></td></tr>';
                document.getElementById('paginationContainer').classList.add('hidden');
                return;
            }

            currentItems.forEach(record => {
                const formattedUnitPrice = record.unitPrice.toLocaleString('ko-KR');
                const formattedTotal = record.totalPrice.toLocaleString('ko-KR');
                
                const tr = document.createElement('tr');
                tr.className = 'border-b border-gray-100 hover:bg-gray-50';
                tr.innerHTML = '<td class="py-4 px-6 text-sm text-gray-900">' + record.date + ' ' + record.time + '</td><td class="py-4 px-6 text-sm text-gray-900">' + record.supplier + '</td><td class="py-4 px-6 text-sm font-medium text-gray-900">' + record.itemName + '</td><td class="py-4 px-6 text-right text-sm text-gray-600">' + record.quantity + record.unit + '</td><td class="py-4 px-6 text-right text-sm text-gray-600">₩' + formattedUnitPrice + '</td><td class="py-4 px-6 text-right text-sm font-semibold text-[#00853D]">₩' + formattedTotal + '</td><td class="py-4 px-6 text-sm text-gray-600">' + record.expiryDate + '</td><td class="py-4 px-6 text-sm text-gray-600">' + record.handler + '</td>';
                tbody.appendChild(tr);
            });

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
            const endValue = Math.min(endIndex, filteredRecords.length);
            const totalItems = filteredRecords.length;
            paginationInfo.textContent = (startIndex + 1) + '-' + endValue + ' / ' + totalItems + '개';

            const pageButtons = document.getElementById('pageButtons');
            pageButtons.innerHTML = '';

            for (let page = 1; page <= totalPages; page++) {
                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
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

        // 이전/다음 페이지
        function previousPage() {
            if (currentPage > 1) goToPage(currentPage - 1);
        }

        function nextPage() {
            const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);
            if (currentPage < totalPages) goToPage(currentPage + 1);
        }

        // 통계 업데이트
        function updateStats() {
            const rangeTotal = filteredRecords.reduce((sum, r) => sum + r.totalPrice, 0);
            const avgPrice = filteredRecords.length > 0 ? Math.floor(rangeTotal / filteredRecords.length) : 0;
            
            document.getElementById('rangeTotal').textContent = '₩' + rangeTotal.toLocaleString('ko-KR');
            document.getElementById('totalRecords').textContent = filteredRecords.length;
            document.getElementById('avgPrice').textContent = '₩' + avgPrice.toLocaleString('ko-KR');
        }

        // 실시간 합계 계산
        document.getElementById('formQuantity').addEventListener('change', calculateTotal);
        document.getElementById('formUnitPrice').addEventListener('change', calculateTotal);

        function calculateTotal() {
            const quantity = parseInt(document.getElementById('formQuantity').value) || 0;
            const unitPrice = parseInt(document.getElementById('formUnitPrice').value) || 0;
            const total = quantity * unitPrice;
            document.getElementById('totalAmount').textContent = '₩' + total.toLocaleString('ko-KR');
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
            receiveHistory = mockReceiveHistory.slice();
            filteredRecords = receiveHistory.slice();
            renderTable();
            updateStats();
        });
    </script>
</body>
</html>


