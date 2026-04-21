<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>공지사항 - ZERO LOSS 본사 관리 시스템</title>
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
        .notice-item {
            transition: all 0.3s ease;
        }
        .notice-item:hover {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
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

        <!-- Main Content -->
        <div class="lg:ml-64">
            <!-- 헤더 -->
            <%@ include file="/hq/common/header.jspf" %>

            <!-- Content Area -->
            <main class="p-6">
                <div class="space-y-6">
                    <!-- Page Header -->
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="text-3xl font-bold text-gray-900">공지사항 관리</h1>
                            <p class="text-gray-500 mt-2">전체 지점에 공지사항을 작성하고 관리할 수 있습니다.</p>
                        </div>
                        <button onclick="openCreateModal()" class="flex items-center gap-2 bg-[#00853D] text-white px-4 py-2 rounded-lg hover:bg-[#006B2F] transition-colors">
                            <i class="fas fa-plus w-4 h-4"></i>
                            <span>공지사항 작성</span>
                        </button>
                    </div>

                    <!-- Statistics Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="bg-white rounded-lg border border-gray-200 p-6">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-bell w-6 h-6 text-blue-600"></i>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-gray-900">5건</p>
                                    <p class="text-sm text-gray-500">전체 공지</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg border border-gray-200 p-6">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-exclamation-circle w-6 h-6 text-red-600"></i>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-red-600">2건</p>
                                    <p class="text-sm text-gray-500">긴급 공지</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg border border-gray-200 p-6">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-thumbtack w-6 h-6 text-purple-600"></i>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-purple-600">2건</p>
                                    <p class="text-sm text-gray-500">고정 공지</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg border border-gray-200 p-6">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-eye w-6 h-6 text-green-600"></i>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-green-600">104회</p>
                                    <p class="text-sm text-gray-500">평균 조회수</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Search and Filter -->
                    <div class="bg-white rounded-lg border border-gray-200 p-6">
                        <div class="flex flex-col lg:flex-row gap-4">
                            <div class="flex-1 relative">
                                <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                <input type="text" id="searchInput" placeholder="제목 또는 내용으로 검색..." class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00853D]" onkeyup="filterNotices()">
                            </div>
                            <div class="flex gap-2 flex-wrap lg:flex-nowrap">
                                <button onclick="setTypeFilter('all')" class="px-4 py-2 bg-[#00853D] text-white rounded-lg text-sm font-medium type-filter-btn active" data-type="all">전체</button>
                                <button onclick="setTypeFilter('긴급 공지')" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 type-filter-btn" data-type="긴급 공지">긴급 공지</button>
                                <button onclick="setTypeFilter('일반 공지')" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 type-filter-btn" data-type="일반 공지">일반 공지</button>
                                <button onclick="setTypeFilter('위생 가이드')" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 type-filter-btn" data-type="위생 가이드">위생 가이드</button>
                                <button onclick="setTypeFilter('운영 지침')" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 type-filter-btn" data-type="운영 지침">운영 지침</button>
                            </div>
                        </div>
                    </div>

                    <!-- Notices List -->
                    <div id="noticesList" class="space-y-4">
                        <!-- Notices will be rendered here by JavaScript -->
                    </div>

                    <!-- Pagination -->
                    <div class="flex items-center justify-between">
                        <button onclick="previousPage()" class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" id="prevBtn">
                            <i class="fas fa-chevron-left w-4 h-4"></i>
                            <span>이전</span>
                        </button>
                        <div class="text-gray-600">
                            <span id="pageInfo"></span>
                        </div>
                        <button onclick="nextPage()" class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" id="nextBtn">
                            <span>다음</span>
                            <i class="fas fa-chevron-right w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <!-- View Modal -->
    <div id="viewModal" class="fixed inset-0 bg-black bg-opacity-50 z-40 modal-hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-3">
                        <span id="viewNoticePin" class="hidden text-purple-600">
                            <i class="fas fa-thumbtack"></i>
                        </span>
                        <span id="viewNoticeType" class="inline-block px-3 py-1 rounded text-sm font-medium"></span>
                    </div>
                    <h2 id="viewNoticeTitle" class="text-2xl font-bold text-gray-900"></h2>
                    <div class="flex items-center gap-4 text-sm text-gray-500 mt-4">
                        <span>
                            <i class="fas fa-user w-4 h-4 inline mr-1"></i>
                            <span id="viewNoticeAuthor"></span>
                        </span>
                        <span>
                            <i class="fas fa-calendar w-4 h-4 inline mr-1"></i>
                            <span id="viewNoticeDate"></span>
                        </span>
                        <span>
                            <i class="fas fa-eye w-4 h-4 inline mr-1"></i>
                            조회 <span id="viewNoticeViews"></span>회
                        </span>
                    </div>
                </div>
                <button onclick="closeViewModal()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times w-6 h-6"></i>
                </button>
            </div>

            <div class="p-6">
                <p id="viewNoticeContent" class="whitespace-pre-wrap text-gray-700"></p>
            </div>

            <div class="border-t border-gray-200 p-6 flex justify-end gap-3">
                <button onclick="closeViewModal()" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">닫기</button>
            </div>
        </div>
    </div>

    <!-- Create/Edit Modal -->
    <div id="createModal" class="fixed inset-0 bg-black bg-opacity-50 z-40 modal-hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <h2 id="modalTitle" class="text-xl font-bold text-gray-900">공지사항 작성</h2>
                <button onclick="closeCreateModal()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times w-6 h-6"></i>
                </button>
            </div>

            <div class="p-6 space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">제목</label>
                    <input type="text" id="noticeTitle" placeholder="공지사항 제목을 입력하세요" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00853D]">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">유형</label>
                    <select id="noticeType" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00853D]">
                        <option value="일반 공지">일반 공지</option>
                        <option value="긴급 공지">긴급 공지</option>
                        <option value="위생 가이드">위생 가이드</option>
                        <option value="운영 지침">운영 지침</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">내용</label>
                    <textarea id="noticeContent" placeholder="공지사항 내용을 입력하세요" rows="10" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00853D] font-sans"></textarea>
                </div>

                <div class="flex items-center gap-2">
                    <input type="checkbox" id="isPinned" class="w-4 h-4 border-gray-300 rounded">
                    <label for="isPinned" class="text-sm font-medium text-gray-700">상단 고정</label>
                </div>
            </div>

            <div class="border-t border-gray-200 p-6 flex justify-end gap-3">
                <button onclick="closeCreateModal()" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">취소</button>
                <button onclick="saveNotice()" class="px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F]">작성</button>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            initializeNotices();
        });

        var mockNotices = [
            {
                id: 'N001',
                title: '[긴급] 식품 안전 관리 강화 안내',
                content: '최근 식품 안전 관리 점검 결과, 일부 지점에서 유통기한 관리가 미흡한 사례가 발견되었습니다. 모든 지점은 즉시 재고 점검을 실시하고, 유통기한이 임박한 제품은 즉시 폐기 처리 바랍니다.\n\n특히 다음 사항을 준수해주시기 바랍니다:\n1. 매일 오전 재고 점검 실시\n2. 유통기한 7일 이내 제품 별도 관리\n3. 폐기 처리 시 시스템 즉시 입력\n\n문의사항은 본사 품질관리팀으로 연락 바랍니다.',
                type: '긴급 공지',
                author: '본사 품질관리팀',
                createdAt: '2026-03-29 09:00',
                isPinned: true,
                views: 145,
                targetBranches: ['전체']
            },
            {
                id: 'N002',
                title: '4월 신메뉴 출시 안내 및 레시피 교육 일정',
                content: '4월 1일부터 신메뉴 3종이 출시됩니다. 각 지점은 레시피 교육을 필수로 이수해주시기 바랍니다.\n\n신메뉴:\n- 프리미엄 불고기버거\n- 매콤 치즈 치킨버거\n- 시그니처 샐러드\n\n교육 일정은 별도 공지 예정입니다.',
                type: '운영 지침',
                author: '본사 메뉴개발팀',
                createdAt: '2026-03-28 14:30',
                isPinned: true,
                views: 98,
                targetBranches: ['전체']
            },
            {
                id: 'N003',
                title: '주방 위생 관리 체크리스트 업데이트',
                content: '주방 위생 관리 체크리스트가 업데이트되었습니다. 새로운 체크리스트는 시스템에서 다운로드 가능합니다.\n\n주요 변경사항:\n- 조리 기구 소독 주기 변경 (4시간 → 3시간)\n- 냉장고/냉동고 온도 체크 주기 강화\n- 바닥 청소 시간 추가',
                type: '위생 가이드',
                author: '본사 위생관리팀',
                createdAt: '2026-03-27 10:15',
                isPinned: false,
                views: 76,
                targetBranches: ['전체']
            },
            {
                id: 'N004',
                title: '2026년 1분기 우수 지점 선정 결과',
                content: '2026년 1분기 우수 지점 선정 결과를 안내드립니다.\n\n최우수 지점: 강남본점\n우수 지점: 홍대점, 부산해운대점\n\n수상 지점에는 포상금이 지급되며, 우수 사례는 전 지점에 공유될 예정입니다.',
                type: '일반 공지',
                author: '본사 경영지원팀',
                createdAt: '2026-03-26 16:00',
                isPinned: false,
                views: 112,
                targetBranches: ['전체']
            },
            {
                id: 'N005',
                title: '손 씻기 및 개인위생 관리 강화',
                content: '모든 직원은 다음 위생 수칙을 철저히 준수해주시기 바랍니다:\n\n1. 출근 시 손 씻기 필수\n2. 조리 전/후 손 소독\n3. 장갑 착용 의무화\n4. 두발 및 복장 규정 준수\n\n위반 시 경고 조치됩니다.',
                type: '위생 가이드',
                author: '본사 위생관리팀',
                createdAt: '2026-03-25 11:20',
                isPinned: false,
                views: 89,
                targetBranches: ['전체']
            }
        ];

        var currentPage = 1;
        var itemsPerPage = 8;
        var currentTypeFilter = 'all';

        function initializeNotices() {
            renderNotices();
        }

        function getTypeColor(type) {
            if (type === '긴급 공지') {
                return 'bg-red-100 text-red-800';
            } else if (type === '위생 가이드') {
                return 'bg-blue-100 text-blue-800';
            } else if (type === '운영 지침') {
                return 'bg-purple-100 text-purple-800';
            }
            return 'bg-gray-100 text-gray-800';
        }

        function filterAndSortNotices() {
            var searchTerm = document.getElementById('searchInput').value.toLowerCase();
            var filtered = mockNotices.filter(function(notice) {
                var matchesSearch = notice.title.toLowerCase().indexOf(searchTerm) !== -1 || notice.content.toLowerCase().indexOf(searchTerm) !== -1;
                var matchesType = currentTypeFilter === 'all' || notice.type === currentTypeFilter;
                return matchesSearch && matchesType;
            });

            filtered.sort(function(a, b) {
                if (a.isPinned && !b.isPinned) return -1;
                if (!a.isPinned && b.isPinned) return 1;
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });

            return filtered;
        }

        function renderNotices() {
            var filtered = filterAndSortNotices();
            var totalPages = Math.ceil(filtered.length / itemsPerPage);
            
            if (currentPage > totalPages) {
                currentPage = totalPages || 1;
            }

            var start = (currentPage - 1) * itemsPerPage;
            var currentNotices = filtered.slice(start, start + itemsPerPage);

            var noticesHtml = '';
            if (currentNotices.length === 0) {
                noticesHtml = '<div class="bg-white rounded-lg border border-gray-200 p-12 text-center"><i class="fas fa-search w-12 h-12 text-gray-400 mx-auto mb-4 block"></i><p class="text-gray-500">검색 결과가 없습니다.</p></div>';
            } else {
                currentNotices.forEach(function(notice) {
                    var pinHtml = notice.isPinned ? '<i class="fas fa-thumbtack text-purple-600 mr-2"></i>' : '';
                    var typeClass = getTypeColor(notice.type);
                    noticesHtml += '<div class="bg-white rounded-lg border border-gray-200 p-6 notice-item cursor-pointer hover:shadow-lg transition-shadow" onclick="viewNotice(\'' + notice.id + '\')">' +
                        '<div class="flex items-start justify-between gap-4">' +
                        '<div class="flex-1 space-y-2">' +
                        '<div class="flex items-center gap-2 flex-wrap">' +
                        pinHtml +
                        '<span class="inline-block px-3 py-1 rounded text-sm font-medium ' + typeClass + '">' + notice.type + '</span>' +
                        '<h3 class="font-bold text-lg text-gray-900">' + notice.title + '</h3>' +
                        '</div>' +
                        '<p class="text-gray-600 line-clamp-2">' + notice.content + '</p>' +
                        '<div class="flex items-center gap-4 text-sm text-gray-500">' +
                        '<span><i class="fas fa-user w-4 h-4 inline mr-1"></i>' + notice.author + '</span>' +
                        '<span><i class="fas fa-calendar w-4 h-4 inline mr-1"></i>' + notice.createdAt + '</span>' +
                        '<span><i class="fas fa-eye w-4 h-4 inline mr-1"></i>조회 ' + notice.views + '회</span>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                });
            }

            document.getElementById('noticesList').innerHTML = noticesHtml;

            var prevBtn = document.getElementById('prevBtn');
            var nextBtn = document.getElementById('nextBtn');
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === totalPages || totalPages === 0;

            document.getElementById('pageInfo').innerText = (totalPages === 0 ? 0 : currentPage) + ' / ' + totalPages;
        }

        function filterNotices() {
            currentPage = 1;
            renderNotices();
        }

        function setTypeFilter(type) {
            currentTypeFilter = type;
            currentPage = 1;

            var btns = document.querySelectorAll('.type-filter-btn');
            btns.forEach(function(btn) {
                btn.classList.remove('bg-[#00853D]', 'text-white');
                btn.classList.add('border', 'border-gray-300', 'text-gray-700', 'hover:bg-gray-50');
            });

            event.target.classList.remove('border', 'border-gray-300', 'text-gray-700', 'hover:bg-gray-50');
            event.target.classList.add('bg-[#00853D]', 'text-white');

            renderNotices();
        }

        function previousPage() {
            if (currentPage > 1) {
                currentPage--;
                renderNotices();
                window.scrollTo(0, 0);
            }
        }

        function nextPage() {
            var filtered = filterAndSortNotices();
            var totalPages = Math.ceil(filtered.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderNotices();
                window.scrollTo(0, 0);
            }
        }

        function viewNotice(noticeId) {
            var notice = mockNotices.find(function(n) { return n.id === noticeId; });
            if (notice) {
                document.getElementById('viewNoticeTitle').innerText = notice.title;
                document.getElementById('viewNoticeContent').innerText = notice.content;
                document.getElementById('viewNoticeAuthor').innerText = notice.author;
                document.getElementById('viewNoticeDate').innerText = notice.createdAt;
                document.getElementById('viewNoticeViews').innerText = notice.views.toString();
                
                var typeSpan = document.getElementById('viewNoticeType');
                typeSpan.className = 'inline-block px-3 py-1 rounded text-sm font-medium ' + getTypeColor(notice.type);
                typeSpan.innerText = notice.type;

                var pinSpan = document.getElementById('viewNoticePin');
                if (notice.isPinned) {
                    pinSpan.classList.remove('hidden');
                } else {
                    pinSpan.classList.add('hidden');
                }

                document.getElementById('viewModal').classList.remove('modal-hidden');
            }
        }

        function closeViewModal() {
            document.getElementById('viewModal').classList.add('modal-hidden');
        }

        function openCreateModal() {
            document.getElementById('modalTitle').innerText = '공지사항 작성';
            document.getElementById('noticeTitle').value = '';
            document.getElementById('noticeType').value = '일반 공지';
            document.getElementById('noticeContent').value = '';
            document.getElementById('isPinned').checked = false;
            document.getElementById('createModal').classList.remove('modal-hidden');
        }

        function closeCreateModal() {
            document.getElementById('createModal').classList.add('modal-hidden');
        }

        function saveNotice() {
            var title = document.getElementById('noticeTitle').value.trim();
            var type = document.getElementById('noticeType').value;
            var content = document.getElementById('noticeContent').value.trim();
            var isPinned = document.getElementById('isPinned').checked;

            if (!title || !content) {
                alert('제목과 내용을 입력해주세요.');
                return;
            }

            console.log('공지사항 저장:', {
                title: title,
                type: type,
                content: content,
                isPinned: isPinned
            });

            alert('공지사항이 저장되었습니다.');
            closeCreateModal();
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

        function toggleSidebar() {
            var sidebar = document.getElementById('sidebar');
            var backdrop = document.getElementById('sidebarBackdrop');

            sidebar.classList.toggle('-translate-x-full');
            backdrop.classList.toggle('hidden');

            backdrop.addEventListener('click', function() {
                sidebar.classList.add('-translate-x-full');
                backdrop.classList.add('hidden');
            });
        }
    </script>
</body>
</html>

