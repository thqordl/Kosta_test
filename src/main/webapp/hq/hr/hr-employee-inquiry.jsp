<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>본사 및 지점별 직원 정보 통합 조회 - ZERO LOSS 본사 관리 시스템</title>
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
                            <h2 class="text-3xl font-bold text-gray-900">본사 및 지점별 직원 정보 통합 조회</h2>
                            <p class="text-gray-500 mt-1">전체 직원 정보를 통합하여 관리하세요</p>
                        </div>
                        <button onclick="showAddModal()" class="flex items-center gap-2 bg-[#00853D] text-white px-4 py-2.5 rounded-lg hover:bg-[#006B2F] transition-colors">
                            <i class="fas fa-user-plus w-5 h-5"></i>
                            <span>신규 직원 등록</span>
                        </button>
                    </div>

                    <!-- 통계 카드 -->
                    <div id="statsArea" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <!-- 동적 생성 -->
                    </div>

                    <!-- 필터 섹션 -->
                    <div class="bg-white rounded-lg border border-gray-200 p-6">
                        <div class="space-y-4">
                            <!-- 검색 -->
                            <div class="relative">
                                <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                                <input type="text" id="searchInput" placeholder="이름, 연락처, 이메일로 검색..." onkeyup="applyFilters()" class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                            </div>

                            <!-- 필터 -->
                            <div class="flex flex-wrap gap-6">
                                <!-- 지점 필터 -->
                                <div>
                                    <div class="flex items-center gap-2 mb-2">
                                        <i class="fas fa-filter w-5 h-5 text-gray-500"></i>
                                        <label class="text-sm font-medium text-gray-700">소속:</label>
                                    </div>
                                    <div id="branchFilters" class="flex flex-wrap gap-2">
                                        <!-- 동적 생성 -->
                                    </div>
                                </div>

                                <!-- 상태 필터 -->
                                <div>
                                    <label class="text-sm font-medium text-gray-700 mb-2 block">상태:</label>
                                    <div id="statusFilters" class="flex flex-wrap gap-2">
                                        <!-- 동적 생성 -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 직원 테이블 -->
                    <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <table class="w-full">
                            <thead class="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">소속</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">직급</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연락처</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                                </tr>
                            </thead>
                            <tbody id="employeeTableBody">
                                <!-- 동적 생성 -->
                            </tbody>
                        </table>
                    </div>

                    <!-- 페이지네이션 -->
                    <div id="paginationArea" class="flex items-center justify-between">
                        <!-- 동적 생성 -->
                    </div>

                </div>
            </main>
        </div>
    </div>

    <!-- 직원 상세정보 모달 -->
    <div id="detailModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 modal-hidden">
        <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 class="text-xl font-bold text-gray-900">직원 상세 정보</h3>
                <button onclick="closeDetailModal()" class="text-gray-400 hover:text-gray-600 text-2xl" title="닫기">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div id="detailModalContent" class="p-6 space-y-6">
                <!-- 동적 생성 -->
            </div>

            <div class="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <button onclick="closeDetailModal()" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    닫기
                </button>
                <button onclick="editEmployeeFromModal()" class="px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F]">
                    정보 수정
                </button>
            </div>
        </div>
    </div>

    <!-- 신규 직원 등록 모달 -->
    <div id="addModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 modal-hidden">
        <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 class="text-xl font-bold text-gray-900">신규 직원 등록</h3>
                <button onclick="closeAddModal()" class="text-gray-400 hover:text-gray-600 text-2xl" title="닫기">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="p-6 space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">이름</label>
                        <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent" placeholder="홍길동">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">사번</label>
                        <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent" placeholder="EMP-007">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">소속</label>
                        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                            <option>본사</option>
                            <option>강남점</option>
                            <option>신촌점</option>
                            <option>홍대점</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">부서</label>
                        <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent" placeholder="영업팀">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">직급</label>
                        <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent" placeholder="대리">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">입사일</label>
                        <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                        <input type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent" placeholder="010-0000-0000">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                        <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent" placeholder="user@zeroloss.com">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">권한</label>
                        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                            <option>본사관리자</option>
                            <option>지점장</option>
                            <option>지점매니저</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">상태</label>
                        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                            <option>재직</option>
                            <option>휴직</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <button onclick="closeAddModal()" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    취소
                </button>
                <button onclick="saveEmployee()" class="px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F]">
                    저장
                </button>
            </div>
        </div>
    </div>

    <script>
        // Mock 데이터
        var mockEmployees = [
            {
                id: '1',
                name: '김철수',
                branch: '본사',
                position: '부장',
                phone: '010-1234-5678',
                status: '재직',
                email: 'kim@zeroloss.com',
                role: '본사관리자',
                joinDate: '2020-01-15',
                employeeNumber: 'EMP-001',
                department: '관리팀',
                workHistory: [
                    { period: '2023-01 ~ 현재', position: '부장', branch: '본사' },
                    { period: '2020-01 ~ 2022-12', position: '과장', branch: '본사' }
                ],
                schedule: {
                    currentWeek: '월~금 09:00-18:00',
                    totalHours: 40
                }
            },
            {
                id: '2',
                name: '이영희',
                branch: '강남점',
                position: '지점장',
                phone: '010-2345-6789',
                status: '재직',
                email: 'lee@zeroloss.com',
                role: '지점장',
                joinDate: '2021-03-20',
                employeeNumber: 'EMP-002',
                department: '영업팀',
                workHistory: [
                    { period: '2023-01 ~ 현재', position: '지점장', branch: '강남점' },
                    { period: '2021-03 ~ 2022-12', position: '매니저', branch: '강남점' }
                ],
                schedule: {
                    currentWeek: '월~토 08:00-17:00',
                    totalHours: 54
                }
            },
            {
                id: '3',
                name: '박민수',
                branch: '신촌점',
                position: '매니저',
                phone: '010-3456-7890',
                status: '재직',
                email: 'park@zeroloss.com',
                role: '지점매니저',
                joinDate: '2022-06-01',
                employeeNumber: 'EMP-003',
                department: '영업팀',
                workHistory: [
                    { period: '2023-06 ~ 현재', position: '매니저', branch: '신촌점' },
                    { period: '2022-06 ~ 2023-05', position: '직원', branch: '신촌점' }
                ],
                schedule: {
                    currentWeek: '월~금 10:00-19:00',
                    totalHours: 45
                }
            },
            {
                id: '4',
                name: '정수연',
                branch: '홍대점',
                position: '직원',
                phone: '010-4567-8901',
                status: '재직',
                email: 'jung@zeroloss.com',
                role: '지점매니저',
                joinDate: '2023-01-10',
                employeeNumber: 'EMP-004',
                department: '영업팀',
                workHistory: [
                    { period: '2023-01 ~ 현재', position: '직원', branch: '홍대점' }
                ],
                schedule: {
                    currentWeek: '월,수,금 09:00-18:00',
                    totalHours: 27
                }
            },
            {
                id: '5',
                name: '최동욱',
                branch: '본사',
                position: '과장',
                phone: '010-5678-9012',
                status: '휴직',
                email: 'choi@zeroloss.com',
                role: '본사관리자',
                joinDate: '2019-08-15',
                employeeNumber: 'EMP-005',
                department: '물류팀',
                workHistory: [
                    { period: '2022-01 ~ 현재', position: '과장', branch: '본사' },
                    { period: '2019-08 ~ 2021-12', position: '대리', branch: '본사' }
                ],
                schedule: {
                    currentWeek: '휴직 중',
                    totalHours: 0
                }
            },
            {
                id: '6',
                name: '강지현',
                branch: '강남점',
                position: '아르바이트',
                phone: '010-6789-0123',
                status: '재직',
                email: 'kang@zeroloss.com',
                role: '지점매니저',
                joinDate: '2024-02-01',
                employeeNumber: 'EMP-006',
                department: '영업팀',
                workHistory: [
                    { period: '2024-02 ~ 현재', position: '아르바이트', branch: '강남점' }
                ],
                schedule: {
                    currentWeek: '주말 10:00-16:00',
                    totalHours: 12
                }
            }
        ];

        var branches = ['전체', '본사', '강남점', '신촌점', '홍대점', '건대점', '이태원점'];
        var statuses = ['전체', '재직', '휴직', '퇴사'];
        var selectedBranch = '전체';
        var selectedStatus = '전체';
        var currentPage = 1;
        var itemsPerPage = 8;
        var filteredEmployees = mockEmployees.slice();

        // 페이지 초기화
        function init() {
            renderStats();
            renderBranchFilters();
            renderStatusFilters();
            applyFilters();
        }

        // 통계 렌더링
        function renderStats() {
            var totalEmployees = mockEmployees.filter(function(e) { return e.status === '재직'; }).length;
            var totalBranches = new Set();
            for (var i = 0; i < mockEmployees.length; i++) {
                totalBranches.add(mockEmployees[i].branch);
            }
            var newEmployeesThisMonth = mockEmployees.filter(function(e) { return e.joinDate.indexOf('2024-03') === 0; }).length;

            var html = '<div class="bg-white rounded-lg border border-gray-200 p-6">' +
                      '<div class="flex items-center gap-4">' +
                      '<div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">' +
                      '<i class="fas fa-users w-6 h-6 text-green-600"></i>' +
                      '</div>' +
                      '<div>' +
                      '<p class="text-sm text-gray-500">총 재직 인원</p>' +
                      '<p class="text-3xl font-bold text-gray-900 mt-1">' + totalEmployees + '</p>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '<div class="bg-white rounded-lg border border-gray-200 p-6">' +
                      '<div class="flex items-center gap-4">' +
                      '<div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">' +
                      '<i class="fas fa-building w-6 h-6 text-blue-600"></i>' +
                      '</div>' +
                      '<div>' +
                      '<p class="text-sm text-gray-500">전체 소속</p>' +
                      '<p class="text-3xl font-bold text-gray-900 mt-1">' + totalBranches.size + '</p>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '<div class="bg-white rounded-lg border border-gray-200 p-6">' +
                      '<div class="flex items-center gap-4">' +
                      '<div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">' +
                      '<i class="fas fa-user-plus w-6 h-6 text-yellow-600"></i>' +
                      '</div>' +
                      '<div>' +
                      '<p class="text-sm text-gray-500">이번 달 신규</p>' +
                      '<p class="text-3xl font-bold text-gray-900 mt-1">' + newEmployeesThisMonth + '</p>' +
                      '</div>' +
                      '</div>' +
                      '</div>';

            document.getElementById('statsArea').innerHTML = html;
        }

        // 지점 필터 렌더링
        function renderBranchFilters() {
            var html = branches.map(function(branch) {
                var isSelected = selectedBranch === branch;
                var btnClass = isSelected ? 'bg-[#00853D] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
                return '<button onclick="setBranch(' + '\'' + branch + '\'' + ')" class="px-3 py-1.5 rounded-lg text-sm transition-colors ' + btnClass + '">' + branch + '</button>';
            }).join('');
            document.getElementById('branchFilters').innerHTML = html;
        }

        // 상태 필터 렌더링
        function renderStatusFilters() {
            var html = statuses.map(function(status) {
                var isSelected = selectedStatus === status;
                var btnClass = isSelected ? 'bg-[#00853D] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
                return '<button onclick="setStatus(' + '\'' + status + '\'' + ')" class="px-3 py-1.5 rounded-lg text-sm transition-colors ' + btnClass + '">' + status + '</button>';
            }).join('');
            document.getElementById('statusFilters').innerHTML = html;
        }

        // 지점 선택
        function setBranch(branch) {
            selectedBranch = branch;
            renderBranchFilters();
            applyFilters();
        }

        // 상태 선택
        function setStatus(status) {
            selectedStatus = status;
            renderStatusFilters();
            applyFilters();
        }

        // 필터 적용
        function applyFilters() {
            var searchTerm = document.getElementById('searchInput').value.toLowerCase();

            filteredEmployees = mockEmployees.filter(function(emp) {
                var matchesSearch = emp.name.toLowerCase().indexOf(searchTerm) !== -1 ||
                                   emp.phone.indexOf(searchTerm) !== -1 ||
                                   emp.email.toLowerCase().indexOf(searchTerm) !== -1;
                var matchesBranch = selectedBranch === '전체' || emp.branch === selectedBranch;
                var matchesStatus = selectedStatus === '전체' || emp.status === selectedStatus;
                return matchesSearch && matchesBranch && matchesStatus;
            });

            currentPage = 1;
            renderEmployees();
            renderPagination();
        }

        // 직원 렌더링
        function renderEmployees() {
            var startIdx = (currentPage - 1) * itemsPerPage;
            var endIdx = startIdx + itemsPerPage;
            var paginatedEmployees = filteredEmployees.slice(startIdx, endIdx);

            if (paginatedEmployees.length === 0) {
                document.getElementById('employeeTableBody').innerHTML = '<tr><td colspan="6" class="px-6 py-8 text-center text-gray-500">검색 결과가 없습니다</td></tr>';
                return;
            }

            var html = paginatedEmployees.map(function(emp) {
                var statusClass = '';
                if (emp.status === '재직') {
                    statusClass = 'bg-green-100 text-green-700';
                } else if (emp.status === '휴직') {
                    statusClass = 'bg-yellow-100 text-yellow-700';
                } else {
                    statusClass = 'bg-red-100 text-red-700';
                }

                return '<tr class="border-b border-gray-200 hover:bg-gray-50">' +
                       '<td class="px-6 py-4 whitespace-nowrap">' +
                       '<div class="flex items-center gap-3">' +
                       '<div class="w-10 h-10 rounded-full bg-[#00853D] flex items-center justify-center text-white font-semibold">' +
                       emp.name.charAt(0) +
                       '</div>' +
                       '<div>' +
                       '<div class="font-medium text-gray-900">' + emp.name + '</div>' +
                       '<div class="text-sm text-gray-500">' + emp.employeeNumber + '</div>' +
                       '</div>' +
                       '</div>' +
                       '</td>' +
                       '<td class="px-6 py-4 whitespace-nowrap">' +
                       '<div class="text-sm text-gray-900">' + emp.branch + '</div>' +
                       '<div class="text-sm text-gray-500">' + emp.department + '</div>' +
                       '</td>' +
                       '<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">' + emp.position + '</td>' +
                       '<td class="px-6 py-4 whitespace-nowrap">' +
                       '<div class="text-sm text-gray-900">' + emp.phone + '</div>' +
                       '<div class="text-sm text-gray-500">' + emp.email + '</div>' +
                       '</td>' +
                       '<td class="px-6 py-4 whitespace-nowrap">' +
                       '<span class="inline-flex px-2.5 py-1 text-xs font-medium rounded-full ' + statusClass + '">' + emp.status + '</span>' +
                       '</td>' +
                       '<td class="px-6 py-4 whitespace-nowrap">' +
                       '<div class="flex items-center gap-2">' +
                       '<button onclick="viewEmployeeDetail(' + '\'' + emp.id + '\'' + ')" class="text-blue-600 hover:text-blue-700 text-sm font-medium">' +
                       '상세보기' +
                       '</button>' +
                       '<span class="text-gray-300">|</span>' +
                       '<button onclick="editEmployee(' + '\'' + emp.id + '\'' + ')" class="text-green-600 hover:text-green-700">' +
                       '<i class="fas fa-edit w-4 h-4"></i>' +
                       '</button>' +
                       '<button onclick="deleteEmployee(' + '\'' + emp.id + '\'' + ')" class="text-red-600 hover:text-red-700">' +
                       '<i class="fas fa-trash w-4 h-4"></i>' +
                       '</button>' +
                       '</div>' +
                       '</td>' +
                       '</tr>';
            }).join('');

            document.getElementById('employeeTableBody').innerHTML = html;
        }

        // 페이지네이션 렌더링
        function renderPagination() {
            var totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
            var html = '<div class="flex items-center gap-2">' +
                      '<button onclick="previousPage()" class="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50" ' + (currentPage === 1 ? 'disabled' : '') + '>' +
                      '이전' +
                      '</button>';

            for (var i = 1; i <= totalPages; i++) {
                if (i === currentPage) {
                    html += '<button class="px-3 py-2 bg-[#00853D] text-white rounded-lg">' + i + '</button>';
                } else {
                    html += '<button onclick="goToPage(' + i + ')" class="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">' + i + '</button>';
                }
            }

            html += '<button onclick="nextPage()" class="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50" ' + (currentPage === totalPages ? 'disabled' : '') + '>' +
                   '다음' +
                   '</button>' +
                   '<span class="text-sm text-gray-500 ml-auto">' + currentPage + ' / ' + totalPages + ' 페이지</span>' +
                   '</div>';

            document.getElementById('paginationArea').innerHTML = html;
        }

        // 페이지 이동
        function goToPage(page) {
            currentPage = page;
            renderEmployees();
            renderPagination();
        }

        function previousPage() {
            if (currentPage > 1) {
                currentPage--;
                renderEmployees();
                renderPagination();
            }
        }

        function nextPage() {
            var totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderEmployees();
                renderPagination();
            }
        }

        // 직원 상세정보 보기
        function viewEmployeeDetail(employeeId) {
            var employee = mockEmployees.find(function(emp) { return emp.id === employeeId; });
            if (!employee) return;

            var statusClass = '';
            if (employee.status === '재직') {
                statusClass = 'bg-green-100 text-green-700';
            } else if (employee.status === '휴직') {
                statusClass = 'bg-yellow-100 text-yellow-700';
            } else {
                statusClass = 'bg-red-100 text-red-700';
            }

            var workHistoryHtml = employee.workHistory.map(function(history) {
                return '<div class="flex items-start gap-3">' +
                       '<div class="w-2 h-2 bg-[#00853D] rounded-full mt-2"></div>' +
                       '<div>' +
                       '<p class="font-medium text-gray-900">' + history.position + '</p>' +
                       '<p class="text-sm text-gray-600">' + history.branch + ' • ' + history.period + '</p>' +
                       '</div>' +
                       '</div>';
            }).join('');

            var html = '<div>' +
                      '<div class="flex items-center gap-2 mb-4">' +
                      '<i class="fas fa-user w-5 h-5 text-gray-700"></i>' +
                      '<h4 class="text-lg font-semibold text-gray-900">기본 정보</h4>' +
                      '</div>' +
                      '<div class="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4">' +
                      '<div><p class="text-sm text-gray-500">이름</p><p class="font-medium text-gray-900">' + employee.name + '</p></div>' +
                      '<div><p class="text-sm text-gray-500">사번</p><p class="font-medium text-gray-900">' + employee.employeeNumber + '</p></div>' +
                      '<div><p class="text-sm text-gray-500">소속</p><p class="font-medium text-gray-900">' + employee.branch + '</p></div>' +
                      '<div><p class="text-sm text-gray-500">부서</p><p class="font-medium text-gray-900">' + employee.department + '</p></div>' +
                      '<div><p class="text-sm text-gray-500">직급</p><p class="font-medium text-gray-900">' + employee.position + '</p></div>' +
                      '<div><p class="text-sm text-gray-500">입사일</p><p class="font-medium text-gray-900">' + employee.joinDate + '</p></div>' +
                      '<div><p class="text-sm text-gray-500">연락처</p><p class="font-medium text-gray-900">' + employee.phone + '</p></div>' +
                      '<div><p class="text-sm text-gray-500">이메일</p><p class="font-medium text-gray-900">' + employee.email + '</p></div>' +
                      '<div><p class="text-sm text-gray-500">상태</p><span class="inline-flex px-2.5 py-1 text-xs font-medium rounded-full ' + statusClass + '">' + employee.status + '</span></div>' +
                      '</div>' +
                      '</div>' +
                      '<div>' +
                      '<div class="flex items-center gap-2 mb-4">' +
                      '<i class="fas fa-shield w-5 h-5 text-gray-700"></i>' +
                      '<h4 class="text-lg font-semibold text-gray-900">역할 및 권한</h4>' +
                      '</div>' +
                      '<div class="bg-gray-50 rounded-lg p-4">' +
                      '<div class="flex items-center justify-between">' +
                      '<div><p class="text-sm text-gray-500">시스템 권한</p><p class="font-medium text-gray-900">' + employee.role + '</p></div>' +
                      '<span class="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg">' + (employee.role === '본사관리자' ? '전체 권한' : '지점 권한') + '</span>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '<div>' +
                      '<div class="flex items-center gap-2 mb-4">' +
                      '<i class="fas fa-history w-5 h-5 text-gray-700"></i>' +
                      '<h4 class="text-lg font-semibold text-gray-900">근무 이력 요약</h4>' +
                      '</div>' +
                      '<div class="bg-gray-50 rounded-lg p-4 space-y-3">' +
                      workHistoryHtml +
                      '</div>' +
                      '</div>' +
                      '<div>' +
                      '<div class="flex items-center gap-2 mb-4">' +
                      '<i class="fas fa-calendar w-5 h-5 text-gray-700"></i>' +
                      '<h4 class="text-lg font-semibold text-gray-900">현재 스케줄 요약</h4>' +
                      '</div>' +
                      '<div class="bg-gray-50 rounded-lg p-4">' +
                      '<div class="grid grid-cols-2 gap-4">' +
                      '<div><p class="text-sm text-gray-500">이번 주 근무</p><p class="font-medium text-gray-900">' + employee.schedule.currentWeek + '</p></div>' +
                      '<div><p class="text-sm text-gray-500">주간 근무 시간</p><p class="font-medium text-gray-900">' + employee.schedule.totalHours + '시간</p></div>' +
                      '</div>' +
                      '</div>' +
                      '</div>';

            document.getElementById('detailModalContent').innerHTML = html;
            document.getElementById('detailModal').classList.remove('modal-hidden');
        }

        // 직원 수정
        function editEmployee(employeeId) {
            alert('직원 정보 수정 기능이 준비 중입니다.');
        }

        // 직원 삭제
        function deleteEmployee(employeeId) {
            var employee = mockEmployees.find(function(emp) { return emp.id === employeeId; });
            if (employee && confirm(employee.name + ' 직원을 정말 삭제하시겠습니까?')) {
                mockEmployees = mockEmployees.filter(function(emp) { return emp.id !== employeeId; });
                applyFilters();
                alert('직원이 삭제되었습니다.');
            }
        }

        // 상세정보 모달 닫기
        function closeDetailModal() {
            document.getElementById('detailModal').classList.add('modal-hidden');
        }

        // 신규 직원 모달 열기
        function showAddModal() {
            document.getElementById('addModal').classList.remove('modal-hidden');
        }

        // 신규 직원 모달 닫기
        function closeAddModal() {
            document.getElementById('addModal').classList.add('modal-hidden');
        }

        // 신규 직원 저장
        function saveEmployee() {
            alert('신규 직원이 등록되었습니다.');
            closeAddModal();
        }

        // 직원 정보 수정 (상세정보 모달에서)
        function editEmployeeFromModal() {
            alert('직원 정보 수정 페이지로 이동합니다.');
        }

        // 사이드바 토글
        function toggleMenu(element) {
            var submenu = element.nextElementSibling;
            if (submenu && submenu.classList.contains('submenu')) {
                submenu.classList.toggle('hidden');
                element.querySelector('i:last-child').style.transform = submenu.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(90deg)';
            }
        }

        function toggleSidebar() {
            var sidebar = document.getElementById('sidebar');
            var backdrop = document.getElementById('sidebarBackdrop');
            sidebar.classList.toggle('-translate-x-full');
            backdrop.classList.toggle('hidden');
        }

        function toggleUserMenu() {
            var userMenu = document.getElementById('userMenu');
            userMenu.classList.toggle('hidden');
        }

        function logout() {
            alert('로그아웃 되었습니다.');
        }

        // 초기화
        init();
    </script>
</body>
</html>

