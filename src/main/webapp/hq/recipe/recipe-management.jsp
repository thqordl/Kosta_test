<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>레시피 관리 - ZERO LOSS 본사 관리 시스템</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .sidebar-open .sidebar {
            transform: translateX(0);
        }
        .modal-hidden {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
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
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 class="text-3xl font-bold text-gray-900">레시피 관리</h2>
                            <p class="text-gray-500 mt-2">메뉴 레시피를 등록하고 관리하세요</p>
                        </div>
                        <button onclick="openCreateModal()" class="px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F] transition-colors flex items-center gap-2 text-sm whitespace-nowrap">
                            <i class="fas fa-plus w-4 h-4"></i> 신규 레시피 등록
                        </button>
                    </div>

                    <!-- 통계 -->
                    <div id="statsArea" class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <!-- 동적 생성 -->
                    </div>

                    <!-- 필터 섹션 -->
                    <div class="bg-white rounded-lg border border-gray-200 p-6">
                        <div class="space-y-4">
                            <!-- 카테고리 필터 -->
                            <div>
                                <label class="text-sm font-medium text-gray-700 mb-2 block">카테고리</label>
                                <div id="categoryFilters" class="flex flex-wrap gap-2">
                                    <!-- 동적 생성 -->
                                </div>
                            </div>

                            <!-- 검색 및 활성화 필터 -->
                            <div class="flex flex-col sm:flex-row gap-4">
                                <div class="flex-1 relative">
                                    <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                                    <input type="text" id="searchInput" placeholder="레시피명 검색..." onkeyup="applyFilters()" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                                </div>
                                <div class="flex gap-2">
                                    <button onclick="setActiveFilter('all')" id="filterAll" class="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-900 text-white">
                                        전체
                                    </button>
                                    <button onclick="setActiveFilter('active')" id="filterActive" class="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                                        활성화
                                    </button>
                                    <button onclick="setActiveFilter('inactive')" id="filterInactive" class="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                                        비활성화
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 레시피 그리드 -->
                    <div id="recipeGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <!-- 동적 생성 -->
                    </div>

                    <!-- 검색 결과 없음 -->
                    <div id="emptyState" class="bg-white rounded-lg border border-gray-200 p-12 text-center hidden">
                        <i class="fas fa-book w-16 h-16 text-gray-300 mx-auto mb-4"></i>
                        <p class="text-gray-500 text-lg mb-2">검색 결과가 없습니다</p>
                        <p class="text-gray-400 text-sm">다른 검색어나 필터를 시도해보세요</p>
                    </div>

                </div>
            </main>
        </div>
    </div>

    <!-- 레시피 상세 보기 모달 -->
    <div id="viewModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 modal-hidden">
        <div class="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 class="text-xl font-bold text-gray-900">레시피 상세</h3>
                <button onclick="closeModals()" class="text-gray-400 hover:text-gray-600 text-2xl" title="닫기">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div id="viewModalContent" class="p-6 space-y-6">
                <!-- 동적 생성 -->
            </div>

            <div class="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3 justify-end">
                <button onclick="closeModals()" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    닫기
                </button>
                <button onclick="openEditModal()" class="px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F]">
                    <i class="fas fa-edit"></i> 수정
                </button>
                <button onclick="deleteRecipeFromView()" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    <i class="fas fa-trash"></i> 삭제
                </button>
            </div>
        </div>
    </div>

    <!-- 신규/수정 레시피 모달 -->
    <div id="formModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 modal-hidden">
        <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 id="formModalTitle" class="text-xl font-bold text-gray-900">신규 레시피 등록</h3>
                <button onclick="closeFormModal()" class="text-gray-400 hover:text-gray-600 text-2xl" title="닫기">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="p-6 space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">레시피명</label>
                        <input type="text" id="formRecipeName" placeholder="레시피명" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                        <select id="formCategory" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                            <option value="">선택</option>
                            <option value="샌드위치">샌드위치</option>
                            <option value="샐러드">샐러드</option>
                            <option value="사이드">사이드</option>
                            <option value="음료">음료</option>
                            <option value="수프">수프</option>
                            <option value="디저트">디저트</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">설명</label>
                    <textarea id="formDescription" placeholder="설명" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm"></textarea>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">판매가</label>
                        <input type="number" id="formPrice" placeholder="판매가" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">원가</label>
                        <input type="number" id="formCost" placeholder="원가" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">조리 시간</label>
                        <input type="number" id="formPrepTime" placeholder="분" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">난이도</label>
                    <select id="formDifficulty" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                        <option value="쉬움">쉬움</option>
                        <option value="보통">보통</option>
                        <option value="어려움">어려움</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">조리법</label>
                    <textarea id="formInstructions" placeholder="예: 1. 빵을 반으로 자릅니다.\n2. 재료를 올립니다." rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm"></textarea>
                </div>

                <div>
                    <label class="flex items-center gap-2 text-sm">
                        <input type="checkbox" id="formIsActive" checked class="rounded border-gray-300">
                        <span class="text-gray-700">활성화</span>
                    </label>
                </div>
            </div>

            <div class="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3 justify-end">
                <button onclick="closeFormModal()" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    취소
                </button>
                <button onclick="saveRecipe()" class="px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F]">
                    저장
                </button>
            </div>
        </div>
    </div>

    <script>
        // Mock 데이터
        const mockRecipes = [
            {
                id: 'r1',
                name: '이탈리안 비엠티',
                category: '샌드위치',
                description: '살라미, 페퍼로니, 햄이 들어간 서브웨이 클래식',
                price: 7500,
                cost: 3200,
                image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop',
                isActive: true,
                prepTime: 5,
                difficulty: '쉬움',
                ingredients: [
                    { name: '허니오트 빵', quantity: 1, unit: '개' },
                    { name: '햄', quantity: 30, unit: 'g' },
                    { name: '살라미', quantity: 30, unit: 'g' },
                    { name: '페퍼로니', quantity: 30, unit: 'g' }
                ],
                instructions: '1. 빵을 반으로 자릅니다.\n2. 고기류를 빵 위에 올립니다.\n3. 야채를 올립니다.\n4. 소스를 뿌립니다.',
                createdAt: '2024-01-15'
            },
            {
                id: 'r2',
                name: '로티세리 치킨',
                category: '샌드위치',
                description: '오븐에 구운 부드러운 치킨 샌드위치',
                price: 8000,
                cost: 3500,
                image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop',
                isActive: true,
                prepTime: 6,
                difficulty: '쉬움',
                ingredients: [
                    { name: '위트 빵', quantity: 1, unit: '개' },
                    { name: '치킨 스트립', quantity: 80, unit: 'g' },
                    { name: '아메리칸 치즈', quantity: 2, unit: '장' }
                ],
                instructions: '1. 빵을 반으로 자릅니다.\n2. 치킨을 데웁니다.\n3. 야채와 치즈를 올립니다.\n4. 소스를 뿌립니다.',
                createdAt: '2024-01-10'
            },
            {
                id: 'r3',
                name: '참치 샌드위치',
                category: '샌드위치',
                description: '고소한 참치로 만든 샌드위치',
                price: 7000,
                cost: 2800,
                image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop',
                isActive: true,
                prepTime: 5,
                difficulty: '쉬움',
                ingredients: [
                    { name: '허니오트 빵', quantity: 1, unit: '개' },
                    { name: '참치', quantity: 80, unit: 'g' }
                ],
                instructions: '1. 빵을 반으로 자릅니다.\n2. 참치를 올립니다.\n3. 야채를 올립니다.\n4. 올리브 오일을 뿌립니다.',
                createdAt: '2024-01-20'
            },
            {
                id: 'r4',
                name: '초콜릿칩 쿠키',
                category: '디저트',
                description: '시그니처 초콜릿칩 쿠키',
                price: 2000,
                cost: 800,
                image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop',
                isActive: true,
                prepTime: 3,
                difficulty: '쉬움',
                ingredients: [
                    { name: '초콜릿칩 쿠키', quantity: 1, unit: '개' }
                ],
                instructions: '1. 쿠키를 포장합니다.',
                createdAt: '2024-02-01'
            },
            {
                id: 'r5',
                name: '베지 샌드위치',
                category: '샐러드',
                description: '신선한 야채로 만든 건강한 샌드위치',
                price: 6000,
                cost: 2000,
                image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop',
                isActive: false,
                prepTime: 4,
                difficulty: '쉬움',
                ingredients: [
                    { name: '위트 빵', quantity: 1, unit: '개' },
                    { name: '양상추', quantity: 40, unit: 'g' }
                ],
                instructions: '1. 빵을 반으로 자릅니다.\n2. 야채를 차례로 올립니다.\n3. 소스를 뿌립니다.',
                createdAt: '2024-01-25'
            }
        ];

        const categories = ['전체', '샌드위치', '샐러드', '사이드', '음료', '수프', '디저트'];
        let currentRecipes = mockRecipes.slice();
        let selectedCategory = '전체';
        let activeFilter = 'all';
        let selectedRecipeForView = null;

        // 초기화
        function init() {
            renderStats();
            renderCategoryFilters();
            renderRecipes();
        }

        // 통계 렌더링
        function renderStats() {
            var total = mockRecipes.length;
            var active = mockRecipes.filter(function(r) { return r.isActive; }).length;
            var inactive = mockRecipes.filter(function(r) { return !r.isActive; }).length;
            var avgCost = total > 0 ? Math.round(mockRecipes.reduce(function(sum, r) { return sum + r.cost; }, 0) / total) : 0;

            var html = '<div class="bg-white rounded-lg border border-gray-200 px-3 py-2">' +
                      '<div class="flex items-center gap-2">' +
                      '<div class="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">' +
                      '<i class="fas fa-book"></i>' +
                      '</div>' +
                      '<div>' +
                      '<p class="text-lg font-bold text-gray-900">' + total + '</p>' +
                      '<p class="text-xs text-gray-500">전체 레시피</p>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '<div class="bg-white rounded-lg border border-gray-200 px-3 py-2">' +
                      '<div class="flex items-center gap-2">' +
                      '<div class="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">' +
                      '<i class="fas fa-check"></i>' +
                      '</div>' +
                      '<div>' +
                      '<p class="text-lg font-bold text-gray-900">' + active + '</p>' +
                      '<p class="text-xs text-gray-500">활성화</p>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '<div class="bg-white rounded-lg border border-gray-200 px-3 py-2">' +
                      '<div class="flex items-center gap-2">' +
                      '<div class="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">' +
                      '<i class="fas fa-circle-xmark"></i>' +
                      '</div>' +
                      '<div>' +
                      '<p class="text-lg font-bold text-gray-900">' + inactive + '</p>' +
                      '<p class="text-xs text-gray-500">비활성화</p>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '<div class="bg-white rounded-lg border border-gray-200 px-3 py-2">' +
                      '<div class="flex items-center gap-2">' +
                      '<div class="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">' +
                      '<i class="fas fa-dollar-sign"></i>' +
                      '</div>' +
                      '<div>' +
                      '<p class="text-lg font-bold text-gray-900">₩' + avgCost.toLocaleString() + '</p>' +
                      '<p class="text-xs text-gray-500">평균 원가</p>' +
                      '</div>' +
                      '</div>' +
                      '</div>';

            document.getElementById('statsArea').innerHTML = html;
        }

        // 카테고리 필터 렌더링
        function renderCategoryFilters() {
            var html = categories.map(function(cat) {
                var isSelected = selectedCategory === cat;
                var btnClass = isSelected ? 'bg-[#00853D] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
                return '<button onclick="setCategory(' + '\'' + cat + '\'' + ')" class="px-4 py-2 rounded-lg text-sm font-medium transition-colors ' + btnClass + '">' + cat + '</button>';
            }).join('');
            document.getElementById('categoryFilters').innerHTML = html;
        }

        // 필터 적용
        function applyFilters() {
            var searchTerm = document.getElementById('searchInput').value.toLowerCase();
            
            currentRecipes = mockRecipes.filter(function(recipe) {
                var matchesCategory = selectedCategory === '전체' || recipe.category === selectedCategory;
                var matchesSearch = recipe.name.toLowerCase().includes(searchTerm);
                var matchesActive = activeFilter === 'all' || 
                                   (activeFilter === 'active' && recipe.isActive) ||
                                   (activeFilter === 'inactive' && !recipe.isActive);
                return matchesCategory && matchesSearch && matchesActive;
            });

            renderStats();
            renderRecipes();
        }

        // 레시피 렌더링
        function renderRecipes() {
            if (currentRecipes.length === 0) {
                document.getElementById('recipeGrid').innerHTML = '';
                document.getElementById('emptyState').classList.remove('hidden');
                return;
            }

            document.getElementById('emptyState').classList.add('hidden');

            var html = currentRecipes.map(function(recipe) {
                var statusBadge = recipe.isActive ? '<span class="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">활성화</span>' : 
                                 '<span class="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">비활성화</span>';
                var profitMargin = ((recipe.price - recipe.cost) / recipe.price * 100).toFixed(1);

                return '<div class="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onclick="viewRecipe(' + '\'' + recipe.id + '\'' + ')">' +
                       '<div class="relative h-48">' +
                       '<img src="' + recipe.image + '" alt="' + recipe.name + '" class="w-full h-full object-cover">' +
                       '<div class="absolute top-2 right-2">' + statusBadge + '</div>' +
                       '<div class="absolute top-2 left-2">' +
                       '<span class="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">' + recipe.category + '</span>' +
                       '</div>' +
                       '</div>' +
                       '<div class="p-4">' +
                       '<h3 class="font-semibold text-lg text-gray-900 mb-2">' + recipe.name + '</h3>' +
                       '<p class="text-sm text-gray-500 mb-3 line-clamp-2">' + recipe.description + '</p>' +
                       '<div class="flex items-center justify-between text-sm mb-3">' +
                       '<div><span class="text-gray-500">판매가</span><p class="font-semibold text-gray-900">₩' + recipe.price.toLocaleString() + '</p></div>' +
                       '<div><span class="text-gray-500">마진</span><p class="font-semibold text-green-600">' + profitMargin + '%</p></div>' +
                       '</div>' +
                       '<div class="flex items-center gap-3 text-xs text-gray-500">' +
                       '<div><i class="fas fa-clock"></i> ' + recipe.prepTime + '분</div>' +
                       '<div><i class="fas fa-box"></i> ' + recipe.ingredients.length + '개 재료</div>' +
                       '</div>' +
                       '</div>' +
                       '</div>';
            }).join('');

            document.getElementById('recipeGrid').innerHTML = html;
        }

        // 카테고리 설정
        function setCategory(cat) {
            selectedCategory = cat;
            renderCategoryFilters();
            applyFilters();
        }

        // 활성화 필터 설정
        function setActiveFilter(filter) {
            activeFilter = filter;
            var allBtn = document.getElementById('filterAll');
            var activeBtn = document.getElementById('filterActive');
            var inactiveBtn = document.getElementById('filterInactive');

            allBtn.classList.remove('bg-gray-900', 'text-white');
            activeBtn.classList.remove('bg-green-600', 'text-white');
            inactiveBtn.classList.remove('bg-orange-600', 'text-white');

            allBtn.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
            activeBtn.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
            inactiveBtn.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');

            if (filter === 'all') {
                allBtn.classList.remove('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
                allBtn.classList.add('bg-gray-900', 'text-white');
            } else if (filter === 'active') {
                activeBtn.classList.remove('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
                activeBtn.classList.add('bg-green-600', 'text-white');
            } else {
                inactiveBtn.classList.remove('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
                inactiveBtn.classList.add('bg-orange-600', 'text-white');
            }

            applyFilters();
        }

        // 레시피 보기
        function viewRecipe(recipeId) {
            selectedRecipeForView = currentRecipes.find(function(r) { return r.id === recipeId; });
            if (!selectedRecipeForView) {
                selectedRecipeForView = mockRecipes.find(function(r) { return r.id === recipeId; });
            }

            var profitMargin = ((selectedRecipeForView.price - selectedRecipeForView.cost) / selectedRecipeForView.price * 100).toFixed(1);
            var statusBadge = selectedRecipeForView.isActive ? '<span class="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">활성화</span>' : 
                             '<span class="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">비활성화</span>';

            var ingredientsList = selectedRecipeForView.ingredients.map(function(ing) {
                return '<tr class="border-b border-gray-200 hover:bg-gray-50"><td class="px-4 py-3 text-sm text-gray-900">' + ing.name + '</td><td class="px-4 py-3 text-sm text-gray-600 text-right">' + ing.quantity + ' ' + ing.unit + '</td></tr>';
            }).join('');

            var html = '<div class="grid grid-cols-1 md:grid-cols-2 gap-6">' +
                      '<div><img src="' + selectedRecipeForView.image + '" alt="' + selectedRecipeForView.name + '" class="w-full h-64 object-cover rounded-lg"></div>' +
                      '<div class="space-y-4">' +
                      '<div><span class="text-sm text-gray-500">레시피명</span><p class="text-2xl font-bold text-gray-900">' + selectedRecipeForView.name + '</p></div>' +
                      '<div><span class="text-sm text-gray-500">카테고리</span><p class="text-lg text-gray-900">' + selectedRecipeForView.category + '</p></div>' +
                      '<div><span class="text-sm text-gray-500">설명</span><p class="text-gray-700">' + selectedRecipeForView.description + '</p></div>' +
                      '<div class="flex items-center gap-2"><span class="text-sm text-gray-500">상태</span>' + statusBadge + '</div>' +
                      '</div>' +
                      '</div>' +
                      '<div class="grid grid-cols-3 gap-4">' +
                      '<div class="bg-blue-50 rounded-lg p-4"><p class="text-sm text-blue-600 mb-1">판매가</p><p class="text-2xl font-bold text-blue-700">₩' + selectedRecipeForView.price.toLocaleString() + '</p></div>' +
                      '<div class="bg-orange-50 rounded-lg p-4"><p class="text-sm text-orange-600 mb-1">원가</p><p class="text-2xl font-bold text-orange-700">₩' + selectedRecipeForView.cost.toLocaleString() + '</p></div>' +
                      '<div class="bg-green-50 rounded-lg p-4"><p class="text-sm text-green-600 mb-1">마진율</p><p class="text-2xl font-bold text-green-700">' + profitMargin + '%</p></div>' +
                      '</div>' +
                      '<div class="grid grid-cols-2 gap-4">' +
                      '<div><span class="text-sm text-gray-500">조리 시간</span><p class="text-lg font-semibold text-gray-900">' + selectedRecipeForView.prepTime + '분</p></div>' +
                      '<div><span class="text-sm text-gray-500">난이도</span><p class="text-lg font-semibold text-gray-900">' + selectedRecipeForView.difficulty + '</p></div>' +
                      '</div>' +
                      '<div><h4 class="font-semibold text-gray-900 mb-3">필요 재료</h4>' +
                      '<div class="bg-gray-50 rounded-lg overflow-hidden"><table class="w-full"><thead class="bg-gray-100"><tr><th class="px-4 py-2 text-left text-xs font-semibold text-gray-700">재료명</th><th class="px-4 py-2 text-right text-xs font-semibold text-gray-700">수량</th></tr></thead><tbody>' + ingredientsList + '</tbody></table></div></div>' +
                      '<div><h4 class="font-semibold text-gray-900 mb-2">조리법</h4><p class="text-gray-700 whitespace-pre-line">' + selectedRecipeForView.instructions + '</p></div>';

            document.getElementById('viewModalContent').innerHTML = html;
            document.getElementById('viewModal').classList.remove('modal-hidden');
        }

        // 모달 닫기
        function closeModals() {
            console.log('closeModals 함수 호출됨');
            var modal = document.getElementById('viewModal');
            modal.classList.add('modal-hidden');
            selectedRecipeForView = null;
        }

        // 배경 클릭으로 모달 닫기
        function closeModalsOnBackdrop(event) {
            console.log('closeModalsOnBackdrop 호출됨, event.target:', event.target.id);
            if (event.target.id === 'viewModal') {
                closeModals();
            }
        }

        // 폼 필드 초기화
        function clearFormFields() {
            document.getElementById('formRecipeName').value = '';
            document.getElementById('formCategory').value = '';
            document.getElementById('formDescription').value = '';
            document.getElementById('formPrice').value = '';
            document.getElementById('formCost').value = '';
            document.getElementById('formPrepTime').value = '';
            document.getElementById('formDifficulty').value = '쉬움';
            document.getElementById('formInstructions').value = '';
            document.getElementById('formIsActive').checked = true;
        }

        // 폼 모달 닫기
        function closeFormModal() {
            var formModal = document.getElementById('formModal');
            formModal.classList.add('modal-hidden');
            selectedRecipeForEdit = null;
            clearFormFields();
        }

        // 모달이 클릭되면 안 닫히도록
        document.addEventListener('DOMContentLoaded', function() {
            var viewModal = document.getElementById('viewModal');
            var formModal = document.getElementById('formModal');
            var viewModalContent = viewModal.querySelector('.bg-white');
            var formModalContent = formModal.querySelector('.bg-white');
            
            // 상세 보기 모달 - 배경 클릭 감지
            viewModal.addEventListener('click', function(event) {
                if (event.target === viewModal) {
                    closeModals();
                }
            });
            
            // 상세 보기 모달 - 내부 클릭은 전파 중단
            viewModalContent.addEventListener('click', function(event) {
                event.stopPropagation();
            });

            // 폼 모달 - 배경 클릭 감지
            formModal.addEventListener('click', function(event) {
                if (event.target === formModal) {
                    closeFormModal();
                }
            });
            
            // 폼 모달 - 내부 클릭은 전파 중단
            formModalContent.addEventListener('click', function(event) {
                event.stopPropagation();
            });
        });

        // ESC 키로 모달 닫기
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                var viewModal = document.getElementById('viewModal');
                var formModal = document.getElementById('formModal');
                if (!viewModal.classList.contains('modal-hidden')) {
                    closeModals();
                }
                if (!formModal.classList.contains('modal-hidden')) {
                    closeFormModal();
                }
            }
        });

        var selectedRecipeForEdit = null;

        // 신규 레시피 모달 열기
        function openCreateModal() {
            selectedRecipeForEdit = null;
            clearFormFields();
            document.getElementById('formModalTitle').innerText = '신규 레시피 등록';
            document.getElementById('formModal').classList.remove('modal-hidden');
        }

        // 수정 모달 열기
        function openEditModal() {
            if (!selectedRecipeForView) {
                alert('선택된 레시피가 없습니다.');
                return;
            }
            selectedRecipeForEdit = selectedRecipeForView;
            loadRecipeToForm(selectedRecipeForEdit);
            document.getElementById('formModalTitle').innerText = '레시피 수정';
            closeModals();
            document.getElementById('formModal').classList.remove('modal-hidden');
        }

        // 레시피 데이터를 폼에 로드
        function loadRecipeToForm(recipe) {
            document.getElementById('formRecipeName').value = recipe.name;
            document.getElementById('formCategory').value = recipe.category;
            document.getElementById('formDescription').value = recipe.description;
            document.getElementById('formPrice').value = recipe.price;
            document.getElementById('formCost').value = recipe.cost;
            document.getElementById('formPrepTime').value = recipe.prepTime;
            document.getElementById('formDifficulty').value = recipe.difficulty;
            document.getElementById('formInstructions').value = recipe.instructions;
            document.getElementById('formIsActive').checked = recipe.isActive;
        }

        // 레시피 저장
        function saveRecipe() {
            var name = document.getElementById('formRecipeName').value.trim();
            var category = document.getElementById('formCategory').value;
            var description = document.getElementById('formDescription').value.trim();
            var price = parseInt(document.getElementById('formPrice').value);
            var cost = parseInt(document.getElementById('formCost').value);
            var prepTime = parseInt(document.getElementById('formPrepTime').value);
            var difficulty = document.getElementById('formDifficulty').value;
            var instructions = document.getElementById('formInstructions').value.trim();
            var isActive = document.getElementById('formIsActive').checked;

            // 검증
            if (!name || !category || !description || !price || !cost || !prepTime || !instructions) {
                alert('모든 필수 항목을 입력해주세요.');
                return;
            }

            if (isNaN(price) || isNaN(cost) || isNaN(prepTime)) {
                alert('가격과 시간은 숫자로 입력해주세요.');
                return;
            }

            if (selectedRecipeForEdit) {
                // 수정
                selectedRecipeForEdit.name = name;
                selectedRecipeForEdit.category = category;
                selectedRecipeForEdit.description = description;
                selectedRecipeForEdit.price = price;
                selectedRecipeForEdit.cost = cost;
                selectedRecipeForEdit.prepTime = prepTime;
                selectedRecipeForEdit.difficulty = difficulty;
                selectedRecipeForEdit.instructions = instructions;
                selectedRecipeForEdit.isActive = isActive;
                alert('레시피가 수정되었습니다.');
            } else {
                // 신규
                var newRecipe = {
                    id: 'r' + (mockRecipes.length + 1),
                    name: name,
                    category: category,
                    description: description,
                    price: price,
                    cost: cost,
                    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop',
                    isActive: isActive,
                    prepTime: prepTime,
                    difficulty: difficulty,
                    ingredients: [{ name: '기본 재료', quantity: 1, unit: '개' }],
                    instructions: instructions,
                    createdAt: new Date().toISOString().split('T')[0]
                };
                mockRecipes.push(newRecipe);
                alert('레시피가 등록되었습니다.');
            }

            closeFormModal();
            applyFilters();
        }

        // 레시피 삭제
        function deleteRecipeFromView() {
            if (confirm('이 레시피를 삭제하시겠습니까?')) {
                mockRecipes = mockRecipes.filter(function(r) { return r.id !== selectedRecipeForView.id; });
                currentRecipes = currentRecipes.filter(function(r) { return r.id !== selectedRecipeForView.id; });
                renderStats();
                renderCategoryFilters();
                renderRecipes();
                closeModals();
                alert('레시피가 삭제되었습니다.');
            }
        }

        // 사이드바 토글
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
        init();
    </script>
</body>
</html>


