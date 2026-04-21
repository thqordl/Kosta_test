<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>품목별 발주 수량 설정 - ZERO LOSS 본사 관리 시스템</title>
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
                        <h2 class="text-3xl font-bold text-gray-900">품목별 발주 수량 설정</h2>
                        <p class="text-gray-500 mt-1">품목별 발주 제한을 설정하여 과다 발주를 방지하세요</p>
                    </div>

                    <!-- 발주 제한 설정 리스트 카드 -->
                    <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h3 class="font-semibold text-lg text-gray-900">발주 제한 설정 리스트</h3>
                            <p class="text-sm text-gray-500 mt-1">수정 아이콘을 클릭하여 수량을 변경하세요</p>
                        </div>

                        <!-- 카테고리 및 품목명 필터 -->
                        <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">카테고리 선택</label>
                                    <select id="categoryFilter" onchange="handleCategoryChange()" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        <option value="전체">전체</option>
                                        <option value="육류">육류</option>
                                        <option value="채소">채소</option>
                                        <option value="유제품">유제품</option>
                                        <option value="빵류">빵류</option>
                                        <option value="음료">음료</option>
                                        <option value="조미료">조미료</option>
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">재료명 선택</label>
                                    <select id="itemFilter" onchange="handleItemChange()" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        <option value="전체">전체</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- 테이블 -->
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead class="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th class="text-left py-3 px-6 text-sm font-semibold text-gray-900">품목코드</th>
                                        <th class="text-left py-3 px-6 text-sm font-semibold text-gray-900">품목명</th>
                                        <th class="text-left py-3 px-6 text-sm font-semibold text-gray-900">카테고리</th>
                                        <th class="text-center py-3 px-6 text-sm font-semibold text-gray-900">최소 수량</th>
                                        <th class="text-center py-3 px-6 text-sm font-semibold text-gray-900">최대 수량</th>
                                        <th class="text-center py-3 px-6 text-sm font-semibold text-gray-900">상태</th>
                                        <th class="text-center py-3 px-6 text-sm font-semibold text-gray-900">작업</th>
                                    </tr>
                                </thead>
                                <tbody id="itemTableBody">
                                    <!-- 테이블 행이 여기에 생성됨 -->
                                </tbody>
                            </table>
                        </div>

                        <!-- 페이지네이션 -->
                        <div id="paginationContainer" class="flex justify-between items-center px-6 py-4 border-t border-gray-200 hidden">
                            <button onclick="previousPage()" id="prevBtn" class="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
                                <i class="fas fa-chevron-left w-4 h-4"></i>
                                이전
                            </button>
                            <div class="text-sm text-gray-500">
                                <span id="pageInfo">1 / 1</span>
                            </div>
                            <button onclick="nextPage()" id="nextBtn" class="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
                                다음
                                <i class="fas fa-chevron-right w-4 h-4"></i>
                            </button>
                        </div>
                    </div>

                    <!-- 요약 정보 -->
                    <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div class="flex items-center gap-2">
                            <i class="fas fa-box w-5 h-5 text-blue-600"></i>
                            <p class="text-sm text-blue-900">
                                총 <span class="font-semibold" id="totalItemsCount">0개 품목</span>의
                                발주 제한이 설정되어 있습니다. 제한을 초과하는 발주 요청은 자동으로
                                본사 승인이 필요합니다.
                            </p>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    </div>

    <script>
        // Mock 데이터
        const mockItemLimits = [
            { id: "1", itemCode: "MEAT-001", itemName: "소고기 패티", category: "육류", unit: "개", minQty: 20, maxQty: 150, currentLimit: "정상" },
            { id: "2", itemCode: "VEG-001", itemName: "감자", category: "채소", unit: "kg", minQty: 30, maxQty: 200, currentLimit: "정상" },
            { id: "3", itemCode: "DAIRY-001", itemName: "생크림", category: "유제품", unit: "L", minQty: 10, maxQty: 50, currentLimit: "정상" },
            { id: "4", itemCode: "VEG-002", itemName: "양상추", category: "채소", unit: "kg", minQty: 15, maxQty: 80, currentLimit: "정상" },
            { id: "5", itemCode: "BREAD-001", itemName: "버거빵", category: "빵류", unit: "개", minQty: 100, maxQty: 500, currentLimit: "정상" },
            { id: "6", itemCode: "DAIRY-002", itemName: "체다치즈", category: "유제품", unit: "장", minQty: 20, maxQty: 100, currentLimit: "정상" },
            { id: "7", itemCode: "SAUCE-001", itemName: "식용유", category: "조미료", unit: "L", minQty: 10, maxQty: 50, currentLimit: "정상" },
            { id: "8", itemCode: "BEV-001", itemName: "콜라 시럽", category: "음료", unit: "L", minQty: 8, maxQty: 40, currentLimit: "정상" }
        ];

        const categories = ["전체", "육류", "채소", "유제품", "빵류", "음료", "조미료"];

        // 상태 관리
        let items = mockItemLimits;
        let selectedCategory = "전체";
        let selectedItemName = "전체";
        let editingId = null;
        let currentPage = 1;
        const itemsPerPage = 10;

        // 초기화
        function initialize() {
            renderTable();
            updateItemFilter();
        }

        // 카테고리 변경 처리
        function handleCategoryChange() {
            selectedCategory = document.getElementById("categoryFilter").value;
            selectedItemName = "전체";
            currentPage = 1;
            updateItemFilter();
            renderTable();
        }

        // 품목명 변경 처리
        function handleItemChange() {
            selectedItemName = document.getElementById("itemFilter").value;
            currentPage = 1;
            renderTable();
        }

        // 품목명 필터 업데이트
        function updateItemFilter() {
            const itemFilter = document.getElementById("itemFilter");
            const filteredItems = items.filter(function(item) {
                if (selectedCategory === "전체") {
                    return true;
                }
                return item.category === selectedCategory;
            });

            const uniqueNames = ["전체"];
            const seenNames = {};
            for (let i = 0; i < filteredItems.length; i++) {
                const name = filteredItems[i].itemName;
                if (!seenNames[name]) {
                    uniqueNames.push(name);
                    seenNames[name] = true;
                }
            }

            itemFilter.innerHTML = "";
            for (let i = 0; i < uniqueNames.length; i++) {
                const option = document.createElement("option");
                option.value = uniqueNames[i];
                option.textContent = uniqueNames[i];
                itemFilter.appendChild(option);
            }
        }

        // 필터링된 아이템 가져오기
        function getFilteredItems() {
            return items.filter(function(item) {
                const matchesCategory = selectedCategory === "전체" || item.category === selectedCategory;
                const matchesItemName = selectedItemName === "전체" || item.itemName === selectedItemName;
                return matchesCategory && matchesItemName;
            });
        }

        // 테이블 렌더링
        function renderTable() {
            const filteredItems = getFilteredItems();
            const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const currentItems = filteredItems.slice(startIndex, endIndex);

            const tableBody = document.getElementById("itemTableBody");
            tableBody.innerHTML = "";

            for (let i = 0; i < currentItems.length; i++) {
                const item = currentItems[i];
                const isEditing = editingId === item.id;
                let html = "<tr class=\"border-b border-gray-100 hover:bg-gray-50\">";
                html += "<td class=\"py-4 px-6 font-mono text-sm text-gray-600\">" + item.itemCode + "</td>";
                html += "<td class=\"py-4 px-6 font-medium text-gray-900\">" + item.itemName + "</td>";
                html += "<td class=\"py-4 px-6\"><span class=\"px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full\">" + item.category + "</span></td>";
                
                if (isEditing) {
                    html += "<td class=\"py-4 px-6\"><div class=\"flex items-center justify-center gap-2\"><input type=\"number\" id=\"minQty_" + item.id + "\" value=\"" + item.minQty + "\" min=\"0\" class=\"w-20 px-3 py-2 border border-gray-300 rounded-lg text-center font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent\"><span class=\"text-gray-600\">" + item.unit + "</span></div></td>";
                    html += "<td class=\"py-4 px-6\"><div class=\"flex items-center justify-center gap-2\"><input type=\"number\" id=\"maxQty_" + item.id + "\" value=\"" + item.maxQty + "\" min=\"0\" class=\"w-20 px-3 py-2 border border-gray-300 rounded-lg text-center font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent\"><span class=\"text-gray-600\">" + item.unit + "</span></div></td>";
                } else {
                    html += "<td class=\"py-4 px-6\"><div class=\"text-center font-semibold text-gray-900\">" + item.minQty + item.unit + "</div></td>";
                    html += "<td class=\"py-4 px-6\"><div class=\"text-center font-semibold text-gray-900\">" + item.maxQty + item.unit + "</div></td>";
                }
                
                html += "<td class=\"py-4 px-6 text-center\"><span class=\"inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700\"><i class=\"fas fa-check-circle w-3 h-3\"></i>" + item.currentLimit + "</span></td>";
                
                if (isEditing) {
                    html += "<td class=\"py-4 px-6 text-center\"><button onclick=\"handleSave('" + item.id + "')\" class=\"inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors\"><i class=\"fas fa-save w-4 h-4\"></i>저장</button></td>";
                } else {
                    html += "<td class=\"py-4 px-6 text-center\"><button onclick=\"handleEdit('" + item.id + "')\" class=\"inline-flex items-center gap-1 px-3 py-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors\"><i class=\"fas fa-edit w-4 h-4\"></i>수정</button></td>";
                }
                
                html += "</tr>";
                const row = document.createElement("tr");
                row.innerHTML = html;
                tableBody.appendChild(row);
            }

            // 페이지네이션 업데이트
            updatePagination(totalPages, filteredItems.length);

            // 총 품목 수 업데이트
            document.getElementById("totalItemsCount").textContent = filteredItems.length + "개 품목";
        }

        // 페이지네이션 업데이트
        function updatePagination(totalPages, itemCount) {
            const paginationContainer = document.getElementById("paginationContainer");
            if (itemCount > itemsPerPage) {
                paginationContainer.classList.remove("hidden");
            } else {
                paginationContainer.classList.add("hidden");
            }

            document.getElementById("pageInfo").textContent = currentPage + " / " + totalPages;
            document.getElementById("prevBtn").disabled = currentPage === 1;
            document.getElementById("nextBtn").disabled = currentPage === totalPages;
        }

        // 이전 페이지
        function previousPage() {
            if (currentPage > 1) {
                currentPage = currentPage - 1;
                renderTable();
            }
        }

        // 다음 페이지
        function nextPage() {
            const filteredItems = getFilteredItems();
            const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage = currentPage + 1;
                renderTable();
            }
        }

        // 수정 처리
        function handleEdit(id) {
            editingId = id;
            renderTable();
        }

        // 저장 처리
        function handleSave(id) {
            const newMinQty = parseInt(document.getElementById("minQty_" + id).value);
            const newMaxQty = parseInt(document.getElementById("maxQty_" + id).value);

            if (newMinQty >= newMaxQty) {
                alert("최소 수량은 최대 수량보다 작아야 합니다.");
                return;
            }

            for (let i = 0; i < items.length; i++) {
                if (items[i].id === id) {
                    items[i].minQty = newMinQty;
                    items[i].maxQty = newMaxQty;
                    break;
                }
            }

            editingId = null;
            alert("발주 제한 설정이 저장되었습니다.");
            renderTable();
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
            const chevron = button.querySelector("i.fa-chevron-right");
            
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

        // 페이지 로드시 초기화
        initialize();
    </script>
</body>
</html>


