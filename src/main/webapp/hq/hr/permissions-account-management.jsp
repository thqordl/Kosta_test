<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>직영점 계정 발급/삭제 및 권한 부여 - ZERO LOSS 본사 관리 시스템</title>
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
                            <h3 class="text-3xl font-bold text-gray-900">직영점 계정 발급/삭제 및 권한 부여</h3>
                            <p class="text-gray-500 mt-1">직영점 계정을 통합 관리하고 권한을 설정하세요</p>
                        </div>
                        <button onclick="showAddModal()" class="flex items-center gap-2 bg-[#00853D] text-white px-4 py-2.5 rounded-lg hover:bg-[#006B2F] transition-colors">
                            <i class="fas fa-user-plus w-5 h-5"></i>
                            <span>계정 추가</span>
                        </button>
                    </div>

                    <!-- 본사관리자 전용 공지 -->
                    <div class="bg-purple-50 border border-purple-200 rounded-lg p-3 flex items-start gap-3">
                        <i class="fas fa-circle-info w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5"></i>
                        <div class="text-xs text-purple-800">
                            <p class="font-medium">본사관리자 전용 기능</p>
                            <p class="mt-1">이 페이지는 본사관리자 권한을 가진 사용자만 접근할 수 있습니다.</p>
                        </div>
                    </div>

                    <!-- 통계 카드 -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="bg-white rounded-lg border border-gray-200 p-4">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-shield w-6 h-6 text-blue-600"></i>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">전체 계정</p>
                                    <p class="text-2xl font-bold text-gray-900 mt-1" id="totalCount">0</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg border border-gray-200 p-4">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-circle-check w-6 h-6 text-green-600"></i>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">활성 계정</p>
                                    <p class="text-2xl font-bold text-gray-900 mt-1" id="activeCount">0</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg border border-gray-200 p-4">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-circle-xmark w-6 h-6 text-red-600"></i>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">비활성 계정</p>
                                    <p class="text-2xl font-bold text-gray-900 mt-1" id="inactiveCount">0</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 검색 및 필터 -->
                    <div class="bg-white rounded-lg border border-gray-200 p-6">
                        <div class="space-y-4">
                            <!-- 검색 -->
                            <div class="relative">
                                <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"></i>
                                <input type="text" id="searchInput" onkeyup="applyFilters()" placeholder="이름, 아이디, 소속 매장으로 검색..." class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                            </div>

                            <!-- 필터 -->
                            <div class="flex flex-wrap gap-6">
                                <!-- 소속 매장 필터 -->
                                <div>
                                    <div class="flex items-center gap-2 mb-2">
                                        <i class="fas fa-filter w-5 h-5 text-gray-500"></i>
                                        <label class="text-sm font-medium text-gray-700">소속 매장:</label>
                                    </div>
                                    <div id="branchFilterContainer" class="flex gap-2 flex-wrap">
                                        <!-- 동적으로 생성됨 -->
                                    </div>
                                </div>

                                <!-- 역할 필터 -->
                                <div>
                                    <label class="text-sm font-medium text-gray-700 mb-2 block">역할:</label>
                                    <div id="roleFilterContainer" class="flex gap-2 flex-wrap">
                                        <!-- 동적으로 생성됨 -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 계정 테이블 -->
                    <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead class="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">아이디</th>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">소속 매장</th>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">역할</th>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                                    </tr>
                                </thead>
                                <tbody id="accountTableBody" class="bg-white divide-y divide-gray-200">
                                    <!-- 동적으로 생성됨 -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <!-- Add Account Modal -->
    <div id="addModal" class="modal-hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="if(event.target === this) closeAddModal()">
        <div class="bg-white rounded-lg max-w-sm w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
            <div class="border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 bg-white">
                <h3 class="text-lg font-bold text-gray-900">계정 추가</h3>
                <button onclick="closeAddModal()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times w-5 h-5"></i>
                </button>
            </div>

            <div class="p-6 space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">이름</label>
                    <input type="text" placeholder="홍길동" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">아이디</label>
                    <input type="text" placeholder="user_id" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                    <input type="password" placeholder="••••••••" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">소속 매장</label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                        <option value="">선택하세요</option>
                        <option>본사</option>
                        <option>강남점</option>
                        <option>신촌점</option>
                        <option>홍대점</option>
                        <option>건대점</option>
                        <option>이태원점</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">역할</label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                        <option value="">선택하세요</option>
                        <option>본사관리자</option>
                        <option>지점장</option>
                    </select>
                </div>

                <div class="flex items-center gap-2">
                    <input type="checkbox" id="isActiveAdd" checked class="w-4 h-4 text-[#00853D] border-gray-300 rounded focus:ring-[#00853D]">
                    <label for="isActiveAdd" class="text-sm text-gray-700">계정 활성화</label>
                </div>
            </div>

            <div class="border-t border-gray-200 px-6 py-3 flex justify-end gap-3 sticky bottom-0 bg-white">
                <button onclick="closeAddModal()" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
                    취소
                </button>
                <button onclick="saveAccount()" class="px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F] text-sm">
                    추가
                </button>
            </div>
        </div>
    </div>

    <!-- Edit Account Modal -->
    <div id="editModal" class="modal-hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="if(event.target === this) closeEditModal()">
        <div class="bg-white rounded-lg max-w-sm w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
            <div class="border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 bg-white">
                <h3 class="text-lg font-bold text-gray-900">권한 변경</h3>
                <button onclick="closeEditModal()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times w-5 h-5"></i>
                </button>
            </div>

            <div class="p-6 space-y-4">
                <div id="editAccountInfo" class="bg-gray-50 rounded-lg p-3">
                    <!-- 동적으로 생성됨 -->
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">역할 변경</label>
                    <select id="editRoleSelect" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                        <option>본사관리자</option>
                        <option>지점장</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">소속 매장</label>
                    <select id="editBranchSelect" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                        <option>본사</option>
                        <option>강남점</option>
                        <option>신촌점</option>
                        <option>홍대점</option>
                        <option>건대점</option>
                        <option>이태원점</option>
                    </select>
                </div>

                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
                    <i class="fas fa-triangle-exclamation w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5"></i>
                    <p class="text-xs text-yellow-800">역할 변경 시 해당 계정의 접근 권한이 즉시 변경됩니다.</p>
                </div>
            </div>

            <div class="border-t border-gray-200 px-6 py-3 flex justify-end gap-3 sticky bottom-0 bg-white">
                <button onclick="closeEditModal()" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
                    취소
                </button>
                <button onclick="updateAccount()" class="px-4 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F] text-sm">
                    저장
                </button>
            </div>
        </div>
    </div>

    <script>
        // Mock 데이터
        var accounts = [
            {
                id: '1',
                name: '김관리자',
                username: 'admin',
                branch: '본사',
                role: '본사관리자',
                isActive: true,
                createdDate: '2020-01-15',
                lastLogin: '2024-03-31 09:00'
            },
            {
                id: '2',
                name: '이지점장',
                username: 'gangnam_manager',
                branch: '강남점',
                role: '지점장',
                isActive: true,
                createdDate: '2021-03-20',
                lastLogin: '2024-03-31 08:30'
            },
            {
                id: '3',
                name: '박지점장',
                username: 'seocho_manager',
                branch: '서초점',
                role: '지점장',
                isActive: true,
                createdDate: '2021-06-10',
                lastLogin: '2024-03-30 17:00'
            },
            {
                id: '4',
                name: '최지점장',
                username: 'hongdae_manager',
                branch: '홍대점',
                role: '지점장',
                isActive: false,
                createdDate: '2023-01-10',
                lastLogin: '2024-03-25 17:00'
            },
            {
                id: '5',
                name: '정매니저',
                username: 'gangnam_staff',
                branch: '강남점',
                role: '지점장',
                isActive: true,
                createdDate: '2023-05-15',
                lastLogin: '2024-03-31 07:45'
            },
            {
                id: '6',
                name: '김지점장',
                username: 'gundae_manager',
                branch: '건대점',
                role: '지점장',
                isActive: true,
                createdDate: '2022-09-01',
                lastLogin: '2024-03-31 08:15'
            }
        ];

        var branches = ['전체', '본사', '강남점', '신촌점', '홍대점', '건대점', '이태원점'];
        var roles = ['전체', '본사관리자', '지점장'];
        var selectedBranch = '전체';
        var selectedRole = '전체';
        var selectedAccount = null;

        // 초기화
        window.addEventListener('DOMContentLoaded', function() {
            renderBranchFilters();
            renderRoleFilters();
            renderAccounts();
            updateStats();
            setupSidebarToggle();
        });

        function setupSidebarToggle() {
            var sidebarToggle = document.getElementById('mobileMenuBtn');
            var sidebar = document.getElementById('sidebar');
            var backdrop = document.getElementById('sidebarBackdrop');

            if (sidebarToggle) {
                sidebarToggle.addEventListener('click', function() {
                    toggleSidebar();
                });
            }

            if (backdrop) {
                backdrop.addEventListener('click', function() {
                    sidebar.classList.add('-translate-x-full');
                    backdrop.classList.add('hidden');
                });
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
            alert('로그아웃되었습니다.');
        }

        function toggleMenu(button) {
            var submenu = button.nextElementSibling;
            if (submenu && submenu.classList.contains('submenu')) {
                submenu.classList.toggle('hidden');
                var arrow = button.querySelector('i:last-child');
                arrow.classList.toggle('fa-chevron-right');
                arrow.classList.toggle('fa-chevron-down');
            }
        }

        function renderBranchFilters() {
            var container = document.getElementById('branchFilterContainer');
            container.innerHTML = branches.map(function(branch) {
                var isSelected = selectedBranch === branch;
                return '<button onclick="setBranch(\'' + branch + '\')" class="px-3 py-1 rounded-lg text-xs transition-colors whitespace-nowrap ' + 
                    (isSelected ? 'bg-[#00853D] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200') + '">' + branch + '</button>';
            }).join('');
        }

        function renderRoleFilters() {
            var container = document.getElementById('roleFilterContainer');
            container.innerHTML = roles.map(function(role) {
                var isSelected = selectedRole === role;
                return '<button onclick="setRole(\'' + role + '\')" class="px-3 py-1 rounded-lg text-xs transition-colors whitespace-nowrap ' + 
                    (isSelected ? 'bg-[#00853D] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200') + '">' + role + '</button>';
            }).join('');
        }

        function setBranch(branch) {
            selectedBranch = branch;
            renderBranchFilters();
            applyFilters();
        }

        function setRole(role) {
            selectedRole = role;
            renderRoleFilters();
            applyFilters();
        }

        function applyFilters() {
            renderAccounts();
        }

        function renderAccounts() {
            var searchTerm = document.getElementById('searchInput').value.toLowerCase();
            var filtered = accounts.filter(function(account) {
                var matchesSearch = account.name.toLowerCase().includes(searchTerm) || 
                                   account.username.toLowerCase().includes(searchTerm) || 
                                   account.branch.toLowerCase().includes(searchTerm);
                var matchesBranch = selectedBranch === '전체' || account.branch === selectedBranch;
                var matchesRole = selectedRole === '전체' || account.role === selectedRole;
                return matchesSearch && matchesBranch && matchesRole;
            });

            var tbody = document.getElementById('accountTableBody');
            if (filtered.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" class="px-6 py-8 text-center text-gray-500">검색 결과가 없습니다.</td></tr>';
                return;
            }

            tbody.innerHTML = filtered.map(function(account) {
                var roleColor = account.role === '본사관리자' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700';
                var statusColor = account.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
                var statusText = account.isActive ? '활성' : '비활성';
                return '<tr class="hover:bg-gray-50">' +
                    '<td class="px-4 py-3 whitespace-nowrap">' +
                        '<div class="flex items-center gap-3">' +
                            '<div class="w-8 h-8 rounded-full bg-[#00853D] flex items-center justify-center text-white font-semibold text-xs">' + account.name.charAt(0) + '</div>' +
                            '<div>' +
                                '<div class="font-medium text-gray-900 text-sm">' + account.name + '</div>' +
                                '<div class="text-xs text-gray-500">가입: ' + account.createdDate + '</div>' +
                            '</div>' +
                        '</div>' +
                    '</td>' +
                    '<td class="px-4 py-3 whitespace-nowrap">' +
                        '<div class="text-sm text-gray-900">' + account.username + '</div>' +
                        (account.lastLogin ? '<div class="text-xs text-gray-500">' + account.lastLogin + '</div>' : '') +
                    '</td>' +
                    '<td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">' + account.branch + '</td>' +
                    '<td class="px-4 py-3 whitespace-nowrap">' +
                        '<span class="inline-flex px-2 py-0.5 text-xs font-medium rounded-full ' + roleColor + '">' + account.role + '</span>' +
                    '</td>' +
                    '<td class="px-4 py-3 whitespace-nowrap">' +
                        '<button onclick="toggleActive(\'' + account.id + '\')" class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-lg transition-colors ' + statusColor + '">' +
                            '<i class="fas fa-circle ' + (account.isActive ? 'text-green-600' : 'text-red-600') + '"></i>' + statusText +
                        '</button>' +
                    '</td>' +
                    '<td class="px-4 py-3 whitespace-nowrap">' +
                        '<div class="flex items-center gap-2">' +
                            '<button onclick="editAccountModal(\'' + account.id + '\')" class="text-blue-600 hover:text-blue-700" title="권한 변경">' +
                                '<i class="fas fa-edit w-4 h-4"></i>' +
                            '</button>' +
                            '<span class="text-gray-300 text-xs">|</span>' +
                            '<button onclick="deleteAccount(\'' + account.id + '\')" class="text-red-600 hover:text-red-700" title="계정 삭제">' +
                                '<i class="fas fa-trash w-4 h-4"></i>' +
                            '</button>' +
                        '</div>' +
                    '</td>' +
                '</tr>';
            }).join('');
        }

        function updateStats() {
            var total = accounts.length;
            var active = accounts.filter(function(a) { return a.isActive; }).length;
            var inactive = total - active;

            document.getElementById('totalCount').textContent = total;
            document.getElementById('activeCount').textContent = active;
            document.getElementById('inactiveCount').textContent = inactive;
        }

        function toggleActive(accountId) {
            var account = accounts.find(function(a) { return a.id === accountId; });
            if (account) {
                account.isActive = !account.isActive;
                renderAccounts();
                updateStats();
            }
        }

        function deleteAccount(accountId) {
            var account = accounts.find(function(a) { return a.id === accountId; });
            if (account && confirm(account.name + ' (' + account.username + ') 계정을 정말 삭제하시겠습니까?')) {
                accounts = accounts.filter(function(a) { return a.id !== accountId; });
                alert('계정이 삭제되었습니다.');
                renderAccounts();
                updateStats();
            }
        }

        function showAddModal() {
            var modal = document.getElementById('addModal');
            modal.classList.remove('modal-hidden');
        }

        function closeAddModal() {
            var modal = document.getElementById('addModal');
            modal.classList.add('modal-hidden');
        }

        function saveAccount() {
            alert('계정이 추가되었습니다.');
            closeAddModal();
        }

        function editAccountModal(accountId) {
            selectedAccount = accounts.find(function(a) { return a.id === accountId; });
            if (selectedAccount) {
                var info = '<div class="flex items-center gap-2 mb-2">' +
                    '<div class="w-8 h-8 rounded-full bg-[#00853D] flex items-center justify-center text-white font-semibold text-xs">' + selectedAccount.name.charAt(0) + '</div>' +
                    '<div>' +
                        '<div class="font-medium text-gray-900 text-sm">' + selectedAccount.name + '</div>' +
                        '<div class="text-xs text-gray-500">' + selectedAccount.username + '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="text-xs text-gray-600">' +
                        '<p>소속: ' + selectedAccount.branch + '</p>' +
                    '</div>';
                document.getElementById('editAccountInfo').innerHTML = info;
                document.getElementById('editRoleSelect').value = selectedAccount.role;
                document.getElementById('editBranchSelect').value = selectedAccount.branch;
                var modal = document.getElementById('editModal');
                modal.classList.remove('modal-hidden');
            }
        }

        function closeEditModal() {
            var modal = document.getElementById('editModal');
            modal.classList.add('modal-hidden');
        }

        function updateAccount() {
            if (selectedAccount) {
                selectedAccount.role = document.getElementById('editRoleSelect').value;
                selectedAccount.branch = document.getElementById('editBranchSelect').value;
                alert('권한이 변경되었습니다.');
                closeEditModal();
                renderAccounts();
                updateStats();
            }
        }
    </script>
</body>
</html>

