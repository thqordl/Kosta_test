<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>문의 게시판 - ZERO LOSS 본사 관리 시스템</title>
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
        .inquiry-item {
            transition: all 0.3s ease;
        }
        .inquiry-item:hover {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .urgent-inquiry {
            border-left: 4px solid #dc2626;
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
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900">문의 게시판 관리</h1>
                        <p class="text-gray-500 mt-2">직영점의 문의사항 및 건의사항을 확인하고 답변할 수 있습니다.</p>
                    </div>

                    <!-- Statistics Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="bg-white rounded-lg border border-gray-200 p-6">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-comments w-6 h-6 text-blue-600"></i>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-gray-900">5건</p>
                                    <p class="text-sm text-gray-500">전체 문의</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg border border-gray-200 p-6">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-clock w-6 h-6 text-yellow-600"></i>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-yellow-600">2건</p>
                                    <p class="text-sm text-gray-500">대기 중</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg border border-gray-200 p-6">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-hourglass-half w-6 h-6 text-blue-600"></i>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-blue-600">1건</p>
                                    <p class="text-sm text-gray-500">처리 중</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg border border-gray-200 p-6">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-check-circle w-6 h-6 text-green-600"></i>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-green-600">2건</p>
                                    <p class="text-sm text-gray-500">답변 완료</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Search and Filter -->
                    <div class="bg-white rounded-lg border border-gray-200 p-6">
                        <div class="space-y-4">
                            <div class="flex flex-col lg:flex-row gap-4">
                                <div class="flex-1 relative">
                                    <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                    <input type="text" id="searchInput" placeholder="제목, 내용, 지점명으로 검색..." class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00853D]" onkeyup="filterInquiries()">
                                </div>
                                <select id="categoryFilter" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00853D]" onchange="filterInquiries()">
                                    <option value="all">전체 카테고리</option>
                                    <option value="설비 문의">설비 문의</option>
                                    <option value="재고 문의">재고 문의</option>
                                    <option value="운영 건의">운영 건의</option>
                                    <option value="인사 문의">인사 문의</option>
                                    <option value="기타">기타</option>
                                </select>
                                <select id="statusFilter" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00853D]" onchange="filterInquiries()">
                                    <option value="all">전체 상태</option>
                                    <option value="대기 중">대기 중</option>
                                    <option value="처리 중">처리 중</option>
                                    <option value="답변 완료">답변 완료</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Inquiries List -->
                    <div id="inquiriesList" class="space-y-4">
                        <!-- Inquiries will be rendered here by JavaScript -->
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

    <!-- Detail Modal -->
    <div id="detailModal" class="fixed inset-0 bg-black bg-opacity-50 z-40 modal-hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-3 flex-wrap">
                        <span id="detailPriority" class="hidden inline-block px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded">긴급</span>
                        <span id="detailCategory" class="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded"></span>
                        <span id="detailStatus" class="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded"></span>
                    </div>
                    <h2 id="detailTitle" class="text-2xl font-bold text-gray-900"></h2>
                    <div class="flex items-center gap-4 text-sm text-gray-500 mt-3 flex-wrap">
                        <span>
                            <i class="fas fa-building w-4 h-4 inline mr-1"></i>
                            <span id="detailBranch"></span>
                        </span>
                        <span>
                            <i class="fas fa-user w-4 h-4 inline mr-1"></i>
                            <span id="detailAuthor"></span>
                        </span>
                        <span>
                            <i class="fas fa-calendar w-4 h-4 inline mr-1"></i>
                            <span id="detailDate"></span>
                        </span>
                    </div>
                </div>
                <button onclick="closeDetailModal()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times w-6 h-6"></i>
                </button>
            </div>

            <div class="p-6 space-y-6">
                <!-- Original Inquiry -->
                <div class="bg-gray-50 rounded-lg p-6">
                    <p id="detailContent" class="whitespace-pre-wrap text-gray-700"></p>
                </div>

                <!-- Replies -->
                <div id="repliesContainer" class="space-y-4">
                    <!-- Replies will be rendered here -->
                </div>

                <!-- Reply Input -->
                <div class="space-y-3 pt-4 border-t">
                    <h3 class="font-bold text-lg">답변 작성</h3>
                    <textarea id="replyInput" placeholder="답변을 입력하세요..." rows="5" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00853D] font-sans"></textarea>
                    <div class="flex justify-end gap-3">
                        <button onclick="closeDetailModal()" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">닫기</button>
                        <button onclick="sendReply()" class="px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F]">
                            <i class="fas fa-paper-plane w-4 h-4 inline mr-2"></i>답변 전송
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            initializeInquiries();
        });

        var mockInquiries = [
            {
                id: 'INQ001',
                title: '냉장고 고장으로 긴급 수리 요청',
                content: '오늘 아침 출근하여 확인한 결과 주방 냉장고가 작동하지 않는 것을 발견했습니다. 온도가 15도까지 올라가 있어 일부 식재료의 폐기가 불가피할 것으로 보입니다.\n\n긴급 수리를 요청드리며, 수리 기사 방문 일정을 알려주시기 바랍니다. 또한 폐기 처리된 식재료에 대한 보상 절차도 안내 부탁드립니다.',
                category: '설비 문의',
                status: '처리 중',
                branch: '강남본점',
                author: '김지점장',
                authorRole: '지점장',
                createdAt: '2026-03-29 08:30',
                priority: '긴급',
                replies: [
                    {
                        id: 'REP001',
                        author: '본사 시설관리팀',
                        authorRole: '본사관리자',
                        content: '긴급 수리 요청 접수했습니다. 오늘 오후 2시에 수리 기사가 방문할 예정입니다. 폐기 식재료 목록과 사진을 시스템에 등록해주시면 보상 절차를 진행하겠습니다.',
                        createdAt: '2026-03-29 09:15'
                    }
                ]
            },
            {
                id: 'INQ002',
                title: '신메뉴 재료 발주 수량 조정 건의',
                content: '4월 신메뉴 출시를 앞두고 재료 발주 수량에 대해 건의드립니다.\n\n홍대점은 젊은 고객층이 많아 신메뉴에 대한 수요가 높을 것으로 예상됩니다. 현재 배정된 수량보다 30% 정도 추가 발주가 필요할 것 같습니다.\n\n검토 부탁드립니다.',
                category: '재고 문의',
                status: '답변 완료',
                branch: '홍대점',
                author: '이지점장',
                authorRole: '지점장',
                createdAt: '2026-03-28 16:20',
                priority: '일반',
                replies: [
                    {
                        id: 'REP002',
                        author: '본사 발주관리팀',
                        authorRole: '본사관리자',
                        content: '신메뉴 재료 추가 발주 건의 검토했습니다. 홍대점의 지난 3개월 매출 추이를 분석한 결과, 제안하신 내용이 타당하다고 판단됩니다. 발주 수량 20% 증량 승인합니다. 시스템에서 확인해주세요.',
                        createdAt: '2026-03-28 18:30'
                    },
                    {
                        id: 'REP003',
                        author: '이지점장',
                        authorRole: '지점장',
                        content: '신속한 검토와 승인 감사합니다. 확인했습니다!',
                        createdAt: '2026-03-28 19:00'
                    }
                ]
            },
            {
                id: 'INQ003',
                title: '매장 리모델링 일정 문의',
                content: '매장 노후화로 인해 리모델링이 필요한 상황입니다. 특히 고객 좌석과 주방 설비 교체가 시급합니다.\n\n올해 리모델링 일정이 있는지, 있다면 언제쯤 가능한지 문의드립니다.',
                category: '설비 문의',
                status: '대기 중',
                branch: '수원점',
                author: '박지점장',
                authorRole: '지점장',
                createdAt: '2026-03-27 14:10',
                priority: '일반',
                replies: []
            },
            {
                id: 'INQ004',
                title: '근무 시간 조정 관련 문의',
                content: '최근 직원들의 근무 시간 조정 요청이 많아지고 있습니다. 특히 대학생 아르바이트의 경우 학기 중 근무 시간 조정이 필요한 상황입니다.\n\n탄력 근무제 도입이 가능한지 문의드립니다.',
                category: '인사 문의',
                status: '답변 완료',
                branch: '부산해운대점',
                author: '최지점장',
                authorRole: '지점장',
                createdAt: '2026-03-26 11:30',
                priority: '일반',
                replies: [
                    {
                        id: 'REP004',
                        author: '본사 인사팀',
                        authorRole: '본사관리자',
                        content: '탄력 근무제 관련 문의 답변드립니다. 현재 본사 차원에서 탄력 근무제 도입을 검토 중입니다. 다만 매장 운영 특성상 최소 인원 확보가 필요하므로, 지점별 상황에 맞춰 유연하게 운영하시기 바랍니다. 자세한 가이드라인은 4월 중 배포 예정입니다.',
                        createdAt: '2026-03-27 09:00'
                    }
                ]
            },
            {
                id: 'INQ005',
                title: '주차 공간 부족 문제 해결 방안 건의',
                content: '매장 앞 주차 공간이 부족하여 고객 불만이 증가하고 있습니다. 근처 공영 주차장과 제휴를 맺거나, 발레파킹 서비스 도입을 건의드립니다.',
                category: '운영 건의',
                status: '대기 중',
                branch: '대구동성로점',
                author: '정지점장',
                authorRole: '지점장',
                createdAt: '2026-03-25 15:45',
                priority: '일반',
                replies: []
            }
        ];

        var currentPage = 1;
        var itemsPerPage = 8;
        var selectedInquiryId = null;

        function initializeInquiries() {
            renderInquiries();
        }

        function getCategoryColor(category) {
            var colors = {
                '설비 문의': 'bg-purple-100 text-purple-800',
                '재고 문의': 'bg-orange-100 text-orange-800',
                '운영 건의': 'bg-blue-100 text-blue-800',
                '인사 문의': 'bg-green-100 text-green-800',
                '기타': 'bg-gray-100 text-gray-800'
            };
            return colors[category] || 'bg-gray-100 text-gray-800';
        }

        function getStatusColor(status) {
            var colors = {
                '대기 중': 'bg-yellow-100 text-yellow-800',
                '처리 중': 'bg-blue-100 text-blue-800',
                '답변 완료': 'bg-green-100 text-green-800'
            };
            return colors[status] || 'bg-gray-100 text-gray-800';
        }

        function filterAndSortInquiries() {
            var searchTerm = document.getElementById('searchInput').value.toLowerCase();
            var category = document.getElementById('categoryFilter').value;
            var status = document.getElementById('statusFilter').value;

            var filtered = mockInquiries.filter(function(inquiry) {
                var matchesSearch = inquiry.title.toLowerCase().indexOf(searchTerm) !== -1 || 
                                   inquiry.content.toLowerCase().indexOf(searchTerm) !== -1 ||
                                   inquiry.branch.toLowerCase().indexOf(searchTerm) !== -1;
                var matchesCategory = category === 'all' || inquiry.category === category;
                var matchesStatus = status === 'all' || inquiry.status === status;
                return matchesSearch && matchesCategory && matchesStatus;
            });

            filtered.sort(function(a, b) {
                if (a.priority === '긴급' && b.priority !== '긴급') return -1;
                if (a.priority !== '긴급' && b.priority === '긴급') return 1;
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });

            return filtered;
        }

        function renderInquiries() {
            var filtered = filterAndSortInquiries();
            var totalPages = Math.ceil(filtered.length / itemsPerPage);

            if (currentPage > totalPages) {
                currentPage = totalPages || 1;
            }

            var start = (currentPage - 1) * itemsPerPage;
            var currentInquiries = filtered.slice(start, start + itemsPerPage);

            var inquiriesHtml = '';
            if (currentInquiries.length === 0) {
                inquiriesHtml = '<div class="bg-white rounded-lg border border-gray-200 p-12 text-center"><i class="fas fa-search w-12 h-12 text-gray-400 mx-auto mb-4 block"></i><p class="text-gray-500">검색 결과가 없습니다.</p></div>';
            } else {
                currentInquiries.forEach(function(inquiry) {
                    var urgentClass = inquiry.priority === '긴급' ? 'urgent-inquiry' : '';
                    var categoryClass = getCategoryColor(inquiry.category);
                    var statusClass = getStatusColor(inquiry.status);
                    var priorityHtml = inquiry.priority === '긴급' ? '<span class="inline-block px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded mr-2">긴급</span>' : '';

                    inquiriesHtml += '<div class="bg-white rounded-lg border border-gray-200 p-6 inquiry-item cursor-pointer ' + urgentClass + '" onclick="viewInquiry(\'' + inquiry.id + '\')">' +
                        '<div class="space-y-3">' +
                        '<div class="flex items-start justify-between gap-4">' +
                        '<div class="flex-1 space-y-2">' +
                        '<div class="flex items-center gap-2 flex-wrap">' +
                        priorityHtml +
                        '<span class="inline-block px-3 py-1 text-sm font-medium rounded ' + categoryClass + '">' + inquiry.category + '</span>' +
                        '<span class="inline-block px-3 py-1 text-sm font-medium rounded ' + statusClass + '">' + inquiry.status + '</span>' +
                        '<h3 class="font-bold text-lg text-gray-900">' + inquiry.title + '</h3>' +
                        '</div>' +
                        '<p class="text-gray-600 line-clamp-2">' + inquiry.content + '</p>' +
                        '</div>' +
                        '</div>' +
                        '<div class="flex items-center justify-between flex-wrap">' +
                        '<div class="flex items-center gap-4 text-sm text-gray-500">' +
                        '<span><i class="fas fa-building w-4 h-4 inline mr-1"></i>' + inquiry.branch + ' - ' + inquiry.author + '</span>' +
                        '<span><i class="fas fa-calendar w-4 h-4 inline mr-1"></i>' + inquiry.createdAt + '</span>' +
                        '</div>' +
                        '<div class="flex items-center gap-2 text-sm text-gray-500">' +
                        '<i class="fas fa-comments w-4 h-4"></i>' +
                        '<span>답변 ' + inquiry.replies.length + '개</span>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                });
            }

            document.getElementById('inquiriesList').innerHTML = inquiriesHtml;

            var prevBtn = document.getElementById('prevBtn');
            var nextBtn = document.getElementById('nextBtn');
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === totalPages || totalPages === 0;

            document.getElementById('pageInfo').innerText = (totalPages === 0 ? 0 : currentPage) + ' / ' + totalPages;
        }

        function filterInquiries() {
            currentPage = 1;
            renderInquiries();
        }

        function previousPage() {
            if (currentPage > 1) {
                currentPage--;
                renderInquiries();
                window.scrollTo(0, 0);
            }
        }

        function nextPage() {
            var filtered = filterAndSortInquiries();
            var totalPages = Math.ceil(filtered.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderInquiries();
                window.scrollTo(0, 0);
            }
        }

        function viewInquiry(inquiryId) {
            var inquiry = mockInquiries.find(function(i) { return i.id === inquiryId; });
            if (inquiry) {
                selectedInquiryId = inquiryId;

                document.getElementById('detailTitle').innerText = inquiry.title;
                document.getElementById('detailContent').innerText = inquiry.content;
                document.getElementById('detailBranch').innerText = inquiry.branch;
                document.getElementById('detailAuthor').innerText = inquiry.author + ' (' + inquiry.authorRole + ')';
                document.getElementById('detailDate').innerText = inquiry.createdAt;

                var categorySpan = document.getElementById('detailCategory');
                categorySpan.className = 'inline-block px-3 py-1 text-sm font-medium rounded ' + getCategoryColor(inquiry.category);
                categorySpan.innerText = inquiry.category;

                var statusSpan = document.getElementById('detailStatus');
                statusSpan.className = 'inline-block px-3 py-1 text-sm font-medium rounded ' + getStatusColor(inquiry.status);
                statusSpan.innerText = inquiry.status;

                var prioritySpan = document.getElementById('detailPriority');
                if (inquiry.priority === '긴급') {
                    prioritySpan.classList.remove('hidden');
                } else {
                    prioritySpan.classList.add('hidden');
                }

                var repliesHtml = '';
                if (inquiry.replies.length > 0) {
                    repliesHtml = '<div class="space-y-4"><h3 class="font-bold text-lg">답변 (' + inquiry.replies.length + ')</h3>';
                    inquiry.replies.forEach(function(reply) {
                        var bgClass = reply.authorRole === '본사관리자' ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50';
                        repliesHtml += '<div class="rounded-lg p-4 ' + bgClass + '">' +
                            '<div class="flex items-center justify-between mb-2">' +
                            '<span class="font-medium text-sm">' + reply.author + ' (' + reply.authorRole + ')</span>' +
                            '<span class="text-xs text-gray-500">' + reply.createdAt + '</span>' +
                            '</div>' +
                            '<p class="text-gray-700 whitespace-pre-wrap">' + reply.content + '</p>' +
                            '</div>';
                    });
                    repliesHtml += '</div>';
                }
                document.getElementById('repliesContainer').innerHTML = repliesHtml;

                document.getElementById('replyInput').value = '';
                document.getElementById('detailModal').classList.remove('modal-hidden');
            }
        }

        function closeDetailModal() {
            document.getElementById('detailModal').classList.add('modal-hidden');
            selectedInquiryId = null;
        }

        function sendReply() {
            var replyContent = document.getElementById('replyInput').value.trim();
            if (!replyContent) {
                alert('답변을 입력해주세요.');
                return;
            }

            var inquiry = mockInquiries.find(function(i) { return i.id === selectedInquiryId; });
            if (inquiry) {
                var newReply = {
                    id: 'REP' + Date.now(),
                    author: '본사관리자',
                    authorRole: '본사관리자',
                    content: replyContent,
                    createdAt: new Date().toLocaleString('ko-KR').split(',')[0].replace(/\./g, '-') + ' ' + new Date().toLocaleTimeString('ko-KR', {hour: '2-digit', minute: '2-digit'})
                };

                inquiry.replies.push(newReply);
                inquiry.status = '답변 완료';

                console.log('답변이 저장되었습니다:', newReply);
                alert('답변이 저장되었습니다.');

                viewInquiry(selectedInquiryId);
                document.getElementById('replyInput').value = '';
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

