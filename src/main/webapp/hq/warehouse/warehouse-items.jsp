<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>물류창고 내 품목 - ZERO LOSS 본사 관리 시스템</title>
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
                <!-- 헤더 + 액션 버튼 -->
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900">물류창고 내 품목</h2>
                        <p class="text-gray-500 mt-1">전체 품목 마스터를 관리하세요</p>
                    </div>
                    <button onclick="handleNewItem()" class="flex items-center gap-2 px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F] transition-colors">
                        <i class="fas fa-plus w-5 h-5"></i>
                        신규 품목 등록
                    </button>
                </div>

                <!-- 필터 -->
                <div class="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">카테고리 선택</label>
                            <select id="filterCategory" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent" onchange="updateItemNames(); filterItems();">
                                <option value="전체">전체</option>
                                <option value="단백질">단백질</option>
                                <option value="야채">야채</option>
                                <option value="치즈">치즈</option>
                                <option value="빵류">빵류</option>
                                <option value="소스">소스</option>
                                <option value="음료">음료</option>
                                <option value="쿠키">쿠키</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">재료명 선택</label>
                            <select id="filterItemName" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent" onchange="filterItems();">
                                <option value="전체">전체</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">품목 검색</label>
                            <div class="relative">
                                <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                                <input type="text" id="searchQuery" placeholder="품목명 또는 품목코드 입력..." class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent" onkeyup="filterItems();">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 통계 -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-white rounded-lg border border-gray-200 p-4">
                        <div class="flex items-center gap-2">
                            <div class="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                                <i class="fas fa-box w-5 h-5"></i>
                            </div>
                            <div>
                                <p class="text-xl font-bold text-gray-900" id="totalCount">0개</p>
                                <p class="text-xs text-gray-500">전체 품목</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg border border-gray-200 p-4">
                        <div class="flex items-center gap-2">
                            <div class="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                                <i class="fas fa-check-circle w-5 h-5"></i>
                            </div>
                            <div>
                                <p class="text-xl font-bold text-green-600" id="activeCount">0개</p>
                                <p class="text-xs text-gray-500">활성 품목</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg border border-gray-200 p-4">
                        <div class="flex items-center gap-2">
                            <div class="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                                <i class="fas fa-box w-5 h-5"></i>
                            </div>
                            <div>
                                <p class="text-xl font-bold text-gray-600" id="inactiveCount">0개</p>
                                <p class="text-xs text-gray-500">비활성 품목</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg border border-gray-200 p-4">
                        <div class="flex items-center gap-2">
                            <div class="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                                <i class="fas fa-filter w-5 h-5"></i>
                            </div>
                            <div>
                                <p class="text-xl font-bold text-purple-600" id="categoryCount">7개</p>
                                <p class="text-xs text-gray-500">카테고리</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 품목 테이블 -->
                <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h3 class="font-semibold text-lg text-gray-900">물류창고 내 품목 리스트</h3>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th class="text-left py-4 px-6 text-sm font-semibold text-gray-900">품목코드</th>
                                    <th class="text-left py-4 px-6 text-sm font-semibold text-gray-900">품목명</th>
                                    <th class="text-left py-4 px-6 text-sm font-semibold text-gray-900">카테고리</th>
                                    <th class="text-right py-4 px-6 text-sm font-semibold text-gray-900">매입 단가</th>
                                    <th class="text-right py-4 px-6 text-sm font-semibold text-gray-900">안전 재고</th>
                                    <th class="text-left py-4 px-6 text-sm font-semibold text-gray-900">공급사</th>
                                    <th class="text-center py-4 px-6 text-sm font-semibold text-gray-900">상태</th>
                                    <th class="text-center py-4 px-6 text-sm font-semibold text-gray-900">관리</th>
                                </tr>
                            </thead>
                            <tbody id="itemsTableBody">
                                <!-- 동적으로 생성됨 -->
                            </tbody>
                        </table>
                    </div>

                    <div id="emptyState" class="hidden py-12 text-center">
                        <i class="fas fa-box w-16 h-16 text-gray-300 mx-auto mb-4" style="display: block;"></i>
                        <p class="text-gray-500 text-lg mb-2">검색 결과가 없습니다</p>
                        <p class="text-gray-400 text-sm">다른 검색어나 카테고리를 선택해보세요</p>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <!-- 상세 정보 모달 -->
    <div id="detailModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold text-gray-900">품목 상세 정보</h3>
                <button onclick="closeDetailModal()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times w-6 h-6"></i>
                </button>
            </div>

            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">품목코드</label>
                        <p class="font-mono text-lg text-gray-900" id="detailItemCode"></p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">품목명</label>
                        <p class="text-lg font-semibold text-gray-900" id="detailItemName"></p>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">카테고리</label>
                        <span class="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full" id="detailCategory"></span>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">단위</label>
                        <p class="text-gray-900" id="detailUnit"></p>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">매입 단가</label>
                        <p class="text-lg font-semibold text-gray-900" id="detailPrice"></p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">안전 재고</label>
                        <p class="text-lg font-semibold text-gray-900" id="detailSafetyStock"></p>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">공급사</label>
                        <p class="text-gray-900" id="detailSupplier"></p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">유통기한</label>
                        <p class="text-gray-900" id="detailShelfLife"></p>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">보관 방식</label>
                    <p class="text-gray-900" id="detailStorageMethod"></p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-1">설명</label>
                    <p class="text-gray-900" id="detailDescription"></p>
                </div>
            </div>

            <div class="flex gap-3 mt-6">
                <button onclick="editFromDetail()" class="flex-1 px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F] transition-colors">
                    수정
                </button>
                <button onclick="closeDetailModal()" class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    닫기
                </button>
            </div>
        </div>
    </div>

    <!-- 수정/신규 등록 모달 -->
    <div id="editModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold text-gray-900" id="editTitle"></h3>
                <button onclick="closeEditModal()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times w-6 h-6"></i>
                </button>
            </div>

            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">품목코드 <span class="text-red-500">*</span></label>
                        <input type="text" id="editItemCode" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">품목명 <span class="text-red-500">*</span></label>
                        <input type="text" id="editItemName" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                        <select id="editCategory" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                            <option value="단백질">단백질</option>
                            <option value="야채">야채</option>
                            <option value="치즈">치즈</option>
                            <option value="빵류">빵류</option>
                            <option value="소스">소스</option>
                            <option value="음료">음료</option>
                            <option value="쿠키">쿠키</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">단위</label>
                        <input type="text" id="editUnit" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">매입 단가</label>
                        <input type="number" id="editPrice" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">안전 재고</label>
                        <input type="number" id="editSafetyStock" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">공급사</label>
                        <input type="text" id="editSupplier" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">유통기한 (일)</label>
                        <input type="number" id="editShelfLife" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">보관 방식</label>
                    <input type="text" id="editStorageMethod" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">설명</label>
                    <textarea id="editDescription" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent" rows="3"></textarea>
                </div>
            </div>

            <div class="flex gap-3 mt-6">
                <button onclick="closeEditModal()" class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    취소
                </button>
                <button onclick="handleSave()" class="flex-1 px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F] transition-colors" id="saveButton">
                    등록
                </button>
            </div>
        </div>
    </div>

    <script>
        // 전역 상태
        let items = [];
        let filteredItems = [];
        let selectedItem = null;
        let isNewItem = false;

        // Mock 데이터
        const mockItems = [
            { id: "1", itemCode: "PROTEIN-001", itemName: "치킨 스트립", category: "단백질", unit: "kg", unitPrice: 18000, safetyStock: 50, description: "서브웨이 전용 치킨 스트립", supplier: "(주)프레시미트", shelfLife: 15, storageMethod: "냉장 (0-4°C)", status: "active" },
            { id: "2", itemCode: "PROTEIN-002", itemName: "참치", category: "단백질", unit: "kg", unitPrice: 25000, safetyStock: 30, description: "참치 샌드위치용 참치", supplier: "(주)오션푸드", shelfLife: 20, storageMethod: "냉장 (1-5°C)", status: "active" },
            { id: "3", itemCode: "VEG-001", itemName: "양상추", category: "야채", unit: "kg", unitPrice: 5000, safetyStock: 50, description: "신선한 양상추", supplier: "(주)신선농산", shelfLife: 7, storageMethod: "냉장 (2-5°C)", status: "active" },
            { id: "4", itemCode: "VEG-002", itemName: "토마토", category: "야채", unit: "kg", unitPrice: 4500, safetyStock: 30, description: "완숙 토마토", supplier: "(주)신선농산", shelfLife: 10, storageMethod: "냉장 (5-10°C)", status: "active" },
            { id: "5", itemCode: "BREAD-001", itemName: "허니오트 빵", category: "빵류", unit: "개", unitPrice: 500, safetyStock: 150, description: "시그니처 허니오트 빵", supplier: "(주)베이커리월드", shelfLife: 14, storageMethod: "실온 보관", status: "active" },
            { id: "6", itemCode: "CHEESE-001", itemName: "아메리칸 치즈", category: "치즈", unit: "kg", unitPrice: 18000, safetyStock: 25, description: "슬라이스 아메리칸 치즈", supplier: "(주)유진유업", shelfLife: 21, storageMethod: "냉장 (1-5°C)", status: "active" },
            { id: "7", itemCode: "SAUCE-001", itemName: "랜치 소스", category: "소스", unit: "L", unitPrice: 12000, safetyStock: 15, description: "서브웨이 시그니처 랜치 소스", supplier: "(주)글로벌푸드", shelfLife: 90, storageMethod: "냉장 (1-5°C)", status: "active" },
            { id: "8", itemCode: "VEG-003", itemName: "오이", category: "야채", unit: "kg", unitPrice: 3500, safetyStock: 40, description: "신선한 오이", supplier: "(주)신선농산", shelfLife: 14, storageMethod: "냉장 (5-10°C)", status: "active" },
            { id: "9", itemCode: "SAUCE-002", itemName: "스위트 어니언 소스", category: "소스", unit: "L", unitPrice: 13000, safetyStock: 15, description: "인기 스위트 어니언 소스", supplier: "(주)글로벌푸드", shelfLife: 90, storageMethod: "냉장 (1-5°C)", status: "active" },
            { id: "10", itemCode: "BREAD-002", itemName: "위트 빵", category: "빵류", unit: "개", unitPrice: 500, safetyStock: 120, description: "통밀 빵", supplier: "(주)베이커리월드", shelfLife: 14, storageMethod: "실온 보관", status: "active" },
            { id: "11", itemCode: "PROTEIN-003", itemName: "햄", category: "단백질", unit: "kg", unitPrice: 20000, safetyStock: 40, description: "슬라이스 햄", supplier: "(주)프레시미트", shelfLife: 20, storageMethod: "냉장 (0-4°C)", status: "active" },
            { id: "12", itemCode: "VEG-004", itemName: "피망", category: "야채", unit: "kg", unitPrice: 4000, safetyStock: 30, description: "신선한 피망", supplier: "(주)신선농산", shelfLife: 10, storageMethod: "냉장 (5-10°C)", status: "active" },
            { id: "13", itemCode: "COOKIE-001", itemName: "초콜릿칩 쿠키", category: "쿠키", unit: "개", unitPrice: 1500, safetyStock: 100, description: "서브웨이 시그니처 쿠키", supplier: "(주)베이커리월드", shelfLife: 60, storageMethod: "실온 보관", status: "active" },
            { id: "14", itemCode: "DRINK-001", itemName: "탄산음료", category: "음료", unit: "박스", unitPrice: 15000, safetyStock: 20, description: "330ml 캔 음료 (24개입)", supplier: "(주)음료유통", shelfLife: 180, storageMethod: "실온 보관", status: "active" },
            { id: "15", itemCode: "SAUCE-003", itemName: "올리브 오일", category: "소스", unit: "L", unitPrice: 15000, safetyStock: 10, description: "엑스트라 버진 올리브 오일", supplier: "(주)글로벌푸드", shelfLife: 365, storageMethod: "실온 보관", status: "active" }
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

        // 재료명 필터 업데이트
        function updateItemNames() {
            const selectedCategory = document.getElementById('filterCategory').value;
            const itemNameSelect = document.getElementById('filterItemName');
            const uniqueNames = ['전체'];
            
            items.forEach(item => {
                if (selectedCategory === '전체' || item.category === selectedCategory) {
                    if (!uniqueNames.includes(item.itemName)) {
                        uniqueNames.push(item.itemName);
                    }
                }
            });

            itemNameSelect.innerHTML = '';
            uniqueNames.forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                itemNameSelect.appendChild(option);
            });
        }

        // 항목 필터링
        function filterItems() {
            const searchQuery = document.getElementById('searchQuery').value.toLowerCase();
            const categoryFilter = document.getElementById('filterCategory').value;
            const itemNameFilter = document.getElementById('filterItemName').value;

            filteredItems = items.filter(item => {
                const matchesSearch = item.itemName.toLowerCase().includes(searchQuery) || item.itemCode.toLowerCase().includes(searchQuery);
                const matchesCategory = categoryFilter === '전체' || item.category === categoryFilter;
                const matchesItemName = itemNameFilter === '전체' || item.itemName === itemNameFilter;
                return matchesSearch && matchesCategory && matchesItemName;
            });

            renderTable();
        }

        // 테이블 렌더링
        function renderTable() {
            const tbody = document.getElementById('itemsTableBody');
            const emptyState = document.getElementById('emptyState');
            tbody.innerHTML = '';

            if (filteredItems.length === 0) {
                emptyState.classList.remove('hidden');
                return;
            } else {
                emptyState.classList.add('hidden');
            }

            filteredItems.forEach(item => {
                const tr = document.createElement('tr');
                tr.className = 'border-b border-gray-100 hover:bg-gray-50 cursor-pointer';
                tr.onclick = function() { viewDetail(item); };

                const statusBadge = item.status === 'active' 
                    ? '<i class="fas fa-check-circle w-3 h-3"></i>활성'
                    : '비활성';
                const statusClass = item.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700';

                const priceFormatted = item.unitPrice.toLocaleString();
                const safetyStockFormatted = item.safetyStock + item.unit;

                tr.innerHTML = '<td class="py-4 px-6 font-mono text-sm text-gray-600">' + item.itemCode + '</td><td class="py-4 px-6 font-medium text-gray-900">' + item.itemName + '</td><td class="py-4 px-6"><span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">' + item.category + '</span></td><td class="py-4 px-6 text-right text-gray-900">₩' + priceFormatted + '</td><td class="py-4 px-6 text-right font-semibold text-gray-900">' + safetyStockFormatted + '</td><td class="py-4 px-6 text-gray-700">' + item.supplier + '</td><td class="py-4 px-6 text-center"><span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ' + statusClass + '">' + statusBadge + '</span></td><td class="py-4 px-6 text-center"><button class="inline-flex items-center gap-1 px-3 py-1 text-[#00853D] hover:text-[#006B2F] hover:bg-green-50 rounded-lg transition-colors" onclick="event.stopPropagation(); editItem(event);" data-item-id="' + item.id + '"><i class="fas fa-edit w-4 h-4"></i>수정</button></td>';

                tbody.appendChild(tr);
            });

            updateStats();
        }

        // 통계 업데이트
        function updateStats() {
            const total = items.length;
            const active = items.filter(i => i.status === 'active').length;
            const inactive = items.filter(i => i.status === 'inactive').length;

            document.getElementById('totalCount').textContent = total + '개';
            document.getElementById('activeCount').textContent = active + '개';
            document.getElementById('inactiveCount').textContent = inactive + '개';
            document.getElementById('categoryCount').textContent = '7개';
        }

        // 상세 보기
        function viewDetail(item) {
            selectedItem = item;
            document.getElementById('detailItemCode').textContent = item.itemCode;
            document.getElementById('detailItemName').textContent = item.itemName;
            document.getElementById('detailCategory').textContent = item.category;
            document.getElementById('detailUnit').textContent = item.unit;
            document.getElementById('detailPrice').textContent = '₩' + item.unitPrice.toLocaleString();
            document.getElementById('detailSafetyStock').textContent = item.safetyStock + item.unit;
            document.getElementById('detailSupplier').textContent = item.supplier;
            document.getElementById('detailShelfLife').textContent = item.shelfLife + '일';
            document.getElementById('detailStorageMethod').textContent = item.storageMethod;
            document.getElementById('detailDescription').textContent = item.description;
            document.getElementById('detailModal').classList.remove('hidden');
        }

        // 상세 모달 닫기
        function closeDetailModal() {
            document.getElementById('detailModal').classList.add('hidden');
        }

        // 상세 모달에서 수정
        function editFromDetail() {
            closeDetailModal();
            editItem(null, selectedItem);
        }

        // 수정 폼 열기
        function editItem(event, item) {
            if (!item) {
                const itemId = event.currentTarget.dataset.itemId;
                item = items.find(i => i.id === itemId);
            }

            selectedItem = item;
            isNewItem = false;

            document.getElementById('editTitle').textContent = '품목 정보 수정';
            document.getElementById('saveButton').textContent = '저장';
            
            document.getElementById('editItemCode').value = item.itemCode;
            document.getElementById('editItemCode').disabled = true;
            document.getElementById('editItemName').value = item.itemName;
            document.getElementById('editCategory').value = item.category;
            document.getElementById('editUnit').value = item.unit;
            document.getElementById('editPrice').value = item.unitPrice;
            document.getElementById('editSafetyStock').value = item.safetyStock;
            document.getElementById('editSupplier').value = item.supplier;
            document.getElementById('editShelfLife').value = item.shelfLife;
            document.getElementById('editStorageMethod').value = item.storageMethod;
            document.getElementById('editDescription').value = item.description;

            document.getElementById('editModal').classList.remove('hidden');
        }

        // 신규 품목 등록
        function handleNewItem() {
            isNewItem = true;
            selectedItem = null;

            document.getElementById('editTitle').textContent = '신규 품목 등록';
            document.getElementById('saveButton').textContent = '등록';
            
            document.getElementById('editItemCode').value = '';
            document.getElementById('editItemCode').disabled = false;
            document.getElementById('editItemName').value = '';
            document.getElementById('editCategory').value = '단백질';
            document.getElementById('editUnit').value = 'kg';
            document.getElementById('editPrice').value = '';
            document.getElementById('editSafetyStock').value = '';
            document.getElementById('editSupplier').value = '';
            document.getElementById('editShelfLife').value = '';
            document.getElementById('editStorageMethod').value = '';
            document.getElementById('editDescription').value = '';

            document.getElementById('editModal').classList.remove('hidden');
        }

        // 저장
        function handleSave() {
            const itemCode = document.getElementById('editItemCode').value.trim();
            const itemName = document.getElementById('editItemName').value.trim();

            if (!itemCode || !itemName) {
                alert('필수 항목을 모두 입력해주세요.');
                return;
            }

            if (isNewItem) {
                const newItem = {
                    id: 'item' + Date.now(),
                    itemCode: itemCode,
                    itemName: itemName,
                    category: document.getElementById('editCategory').value,
                    unit: document.getElementById('editUnit').value,
                    unitPrice: Number(document.getElementById('editPrice').value),
                    safetyStock: Number(document.getElementById('editSafetyStock').value),
                    supplier: document.getElementById('editSupplier').value,
                    shelfLife: Number(document.getElementById('editShelfLife').value),
                    storageMethod: document.getElementById('editStorageMethod').value,
                    description: document.getElementById('editDescription').value,
                    status: 'active'
                };
                items.unshift(newItem);
                alert('새 품목이 등록되었습니다.');
            } else {
                selectedItem.itemName = itemName;
                selectedItem.category = document.getElementById('editCategory').value;
                selectedItem.unit = document.getElementById('editUnit').value;
                selectedItem.unitPrice = Number(document.getElementById('editPrice').value);
                selectedItem.safetyStock = Number(document.getElementById('editSafetyStock').value);
                selectedItem.supplier = document.getElementById('editSupplier').value;
                selectedItem.shelfLife = Number(document.getElementById('editShelfLife').value);
                selectedItem.storageMethod = document.getElementById('editStorageMethod').value;
                selectedItem.description = document.getElementById('editDescription').value;
                alert('품목 정보가 수정되었습니다.');
            }

            closeEditModal();
            filterItems();
        }

        // 수정 모달 닫기
        function closeEditModal() {
            document.getElementById('editModal').classList.add('hidden');
        }

        // 모달 외부 클릭 시 닫기
        document.getElementById('detailModal').addEventListener('click', function(e) {
            if (e.target === this) closeDetailModal();
        });

        document.getElementById('editModal').addEventListener('click', function(e) {
            if (e.target === this) closeEditModal();
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
            items = mockItems.slice();
            updateItemNames();
            filterItems();
        });
    </script>
</body>
</html>


