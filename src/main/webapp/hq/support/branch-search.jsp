<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>직영점 조회 - ZERO LOSS 본사 관리 시스템</title>
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
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900">직영점 조회</h2>
                        <p class="text-gray-500 mt-2">전국 직영점을 지역별로 검색하고 상세 정보를 확인할 수 있습니다.</p>
                    </div>

                    <!-- 통계 -->
                    <div id="statsArea" class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <!-- 동적 생성 -->
                    </div>

                    <!-- 필터 섹션 -->
                    <div class="bg-white rounded-lg border border-gray-200 p-6">
                        <div class="space-y-4">
                            <!-- 검색 -->
                            <div class="flex-1 relative">
                                <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                                <input type="text" id="searchInput" placeholder="지점명, 주소, 지점장명으로 검색..." onkeyup="applyFilters()" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                            </div>

                            <!-- 지역 필터 -->
                            <div>
                                <label class="text-sm font-medium text-gray-700 mb-2 block">지역</label>
                                <div id="regionFilters" class="flex flex-wrap gap-2">
                                    <!-- 동적 생성 -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 직영점 그리드 -->
                    <div id="branchGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <!-- 동적 생성 -->
                    </div>

                    <!-- 검색 결과 없음 -->
                    <div id="emptyState" class="bg-white rounded-lg border border-gray-200 p-12 text-center hidden">
                        <i class="fas fa-search w-16 h-16 text-gray-300 mx-auto mb-4"></i>
                        <p class="text-gray-500 text-lg mb-2">검색 결과가 없습니다</p>
                        <p class="text-gray-400 text-sm">다른 검색어나 필터를 시도해보세요</p>
                    </div>

                    <!-- 페이지네이션 -->
                    <div id="paginationArea">
                        <!-- 동적 생성 -->
                    </div>

                </div>
            </main>
        </div>
    </div>

    <!-- 상세 정보 모달 -->
    <div id="detailModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 modal-hidden">
        <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 id="detailModalTitle" class="text-xl font-bold text-gray-900">직영점 상세 정보</h3>
                <button onclick="closeDetailModal()" class="text-gray-400 hover:text-gray-600 text-2xl" title="닫기">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div id="detailModalContent" class="p-6 space-y-6">
                <!-- 동적 생성 -->
            </div>

            <div class="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3 justify-end">
                <button onclick="closeDetailModal()" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    닫기
                </button>
            </div>
        </div>
    </div>

    <script>
        // Mock 데이터
        const mockBranches = [
            {
                id: 'BR001',
                name: '강남본점',
                region: '서울',
                address: '서울특별시 강남구 테헤란로 123',
                detailedAddress: '제로빌딩 1층',
                phone: '02-1234-5678',
                manager: '김지점',
                managerPhone: '010-1234-5678',
                openingHours: '평일 09:00-22:00 / 주말 10:00-21:00',
                status: '정상 운영',
                latitude: 37.5012,
                longitude: 127.0396,
                employeeCount: 12,
                monthlyRevenue: 45000000
            },
            {
                id: 'BR002',
                name: '홍대점',
                region: '서울',
                address: '서울특별시 마포구 홍익로 45',
                detailedAddress: '홍대프라자 2층',
                phone: '02-2345-6789',
                manager: '이지점',
                managerPhone: '010-2345-6789',
                openingHours: '매일 10:00-23:00',
                status: '정상 운영',
                latitude: 37.5547,
                longitude: 126.9245,
                employeeCount: 10,
                monthlyRevenue: 38000000
            },
            {
                id: 'BR003',
                name: '수원점',
                region: '경기',
                address: '경기도 수원시 영통구 광교중앙로 89',
                detailedAddress: '광교타워 1층',
                phone: '031-1234-5678',
                manager: '박지점',
                managerPhone: '010-3456-7890',
                openingHours: '평일 09:00-22:00 / 주말 10:00-21:00',
                status: '정상 운영',
                latitude: 37.2844,
                longitude: 127.0443,
                employeeCount: 9,
                monthlyRevenue: 32000000
            },
            {
                id: 'BR004',
                name: '부산해운대점',
                region: '부산',
                address: '부산광역시 해운대구 해운대해변로 264',
                detailedAddress: '해운대타워 1층',
                phone: '051-1234-5678',
                manager: '최지점',
                managerPhone: '010-4567-8901',
                openingHours: '매일 08:00-23:00',
                status: '정상 운영',
                latitude: 35.1587,
                longitude: 129.1603,
                employeeCount: 11,
                monthlyRevenue: 40000000
            },
            {
                id: 'BR005',
                name: '대구동성로점',
                region: '대구',
                address: '대구광역시 중구 동성로2가 82',
                detailedAddress: '동성빌딩 1층',
                phone: '053-1234-5678',
                manager: '정지점',
                managerPhone: '010-5678-9012',
                openingHours: '평일 09:00-22:00 / 주말 10:00-21:00',
                status: '점검 중',
                latitude: 35.8687,
                longitude: 128.5931,
                employeeCount: 8,
                monthlyRevenue: 28000000
            },
            {
                id: 'BR006',
                name: '인천구월점',
                region: '인천',
                address: '인천광역시 남동구 구월로 123',
                detailedAddress: '구월프라자 1층',
                phone: '032-1234-5678',
                manager: '강지점',
                managerPhone: '010-6789-0123',
                openingHours: '매일 09:00-22:00',
                status: '정상 운영',
                latitude: 37.4615,
                longitude: 126.7323,
                employeeCount: 10,
                monthlyRevenue: 35000000
            }
        ];

        const regions = ['전체', '서울', '경기', '인천', '대전', '대구', '부산', '광주', '강원', '충청', '전라', '경상', '제주'];
        let currentBranches = mockBranches.slice();
        let selectedRegion = '전체';
        let currentPage = 1;
        var itemsPerPage = 9;
        let selectedBranchForDetail = null;

        // 초기화
        function init() {
            renderStats();
            renderRegionFilters();
            applyFilters();
        }

        // 통계 렌더링
        function renderStats() {
            var total = mockBranches.length;
            var operating = mockBranches.filter(function(b) { return b.status === '정상 운영'; }).length;
            var checking = mockBranches.filter(function(b) { return b.status === '점검 중'; }).length;
            var totalEmployees = 0;
            for (var i = 0; i < mockBranches.length; i++) {
                totalEmployees = totalEmployees + mockBranches[i].employeeCount;
            }

            var html = '<div class="bg-white rounded-lg border border-gray-200 px-3 py-2">' +
                      '<div class="flex items-center gap-2">' +
                      '<div class="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">' +
                      '<i class="fas fa-map-marker-alt"></i>' +
                      '</div>' +
                      '<div>' +
                      '<p class="text-lg font-bold text-gray-900">' + total + '개</p>' +
                      '<p class="text-xs text-gray-500">전체 직영점</p>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '<div class="bg-white rounded-lg border border-gray-200 px-3 py-2">' +
                      '<div class="flex items-center gap-2">' +
                      '<div class="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">' +
                      '<i class="fas fa-check-circle"></i>' +
                      '</div>' +
                      '<div>' +
                      '<p class="text-lg font-bold text-green-600">' + operating + '개</p>' +
                      '<p class="text-xs text-gray-500">정상 운영 중</p>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '<div class="bg-white rounded-lg border border-gray-200 px-3 py-2">' +
                      '<div class="flex items-center gap-2">' +
                      '<div class="w-8 h-8 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center">' +
                      '<i class="fas fa-wrench"></i>' +
                      '</div>' +
                      '<div>' +
                      '<p class="text-lg font-bold text-yellow-600">' + checking + '개</p>' +
                      '<p class="text-xs text-gray-500">점검 중</p>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '<div class="bg-white rounded-lg border border-gray-200 px-3 py-2">' +
                      '<div class="flex items-center gap-2">' +
                      '<div class="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">' +
                      '<i class="fas fa-users"></i>' +
                      '</div>' +
                      '<div>' +
                      '<p class="text-lg font-bold text-purple-600">' + totalEmployees + '명</p>' +
                      '<p class="text-xs text-gray-500">총 직원 수</p>' +
                      '</div>' +
                      '</div>' +
                      '</div>';

            document.getElementById('statsArea').innerHTML = html;
        }

        // 지역 필터 렌더링
        function renderRegionFilters() {
            var html = regions.map(function(region) {
                var isSelected = selectedRegion === region;
                var btnClass = isSelected ? 'bg-[#00853D] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
                return '<button onclick="setRegion(' + '\'' + region + '\'' + ')" class="px-4 py-2 rounded-lg text-sm font-medium transition-colors ' + btnClass + '">' + region + '</button>';
            }).join('');
            document.getElementById('regionFilters').innerHTML = html;
        }

        // 필터 적용
        function applyFilters() {
            var searchTerm = document.getElementById('searchInput').value.toLowerCase();
            
            currentBranches = mockBranches.filter(function(branch) {
                var matchesSearch = branch.name.toLowerCase().includes(searchTerm) || 
                                   branch.address.toLowerCase().includes(searchTerm) ||
                                   branch.manager.toLowerCase().includes(searchTerm);
                var matchesRegion = selectedRegion === '전체' || branch.region === selectedRegion;
                return matchesSearch && matchesRegion;
            });

            currentPage = 1;
            renderBranches();
            renderPagination();
        }

        // 직영점 렌더링
        function renderBranches() {
            if (currentBranches.length === 0) {
                document.getElementById('branchGrid').innerHTML = '';
                document.getElementById('emptyState').classList.remove('hidden');
                return;
            }

            document.getElementById('emptyState').classList.add('hidden');

            var startIdx = (currentPage - 1) * itemsPerPage;
            var endIdx = startIdx + itemsPerPage;
            var paginatedBranches = currentBranches.slice(startIdx, endIdx);

            var html = paginatedBranches.map(function(branch) {
                var statusClass = '';
                var statusColor = '';
                if (branch.status === '정상 운영') {
                    statusClass = 'bg-green-100 text-green-700';
                } else if (branch.status === '점검 중') {
                    statusClass = 'bg-yellow-100 text-yellow-700';
                } else {
                    statusClass = 'bg-red-100 text-red-700';
                }

                return '<div class="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer" onclick="viewBranchDetail(' + '\'' + branch.id + '\'' + ')">' +
                       '<div class="flex items-start justify-between mb-4">' +
                       '<div>' +
                       '<h3 class="font-bold text-lg text-gray-900">' + branch.name + '</h3>' +
                       '<p class="text-sm text-gray-500">' + branch.id + '</p>' +
                       '</div>' +
                       '<span class="px-3 py-1 rounded-full text-xs font-medium ' + statusClass + '">' + branch.status + '</span>' +
                       '</div>' +
                       '<div class="space-y-2 mb-4">' +
                       '<div class="flex items-start gap-2 text-sm">' +
                       '<i class="fas fa-map-marker-alt w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0"></i>' +
                       '<span class="text-gray-600">' + branch.address + '</span>' +
                       '</div>' +
                       '<div class="flex items-center gap-2 text-sm">' +
                       '<i class="fas fa-phone w-4 h-4 text-gray-400"></i>' +
                       '<span class="text-gray-600">' + branch.phone + '</span>' +
                       '</div>' +
                       '<div class="flex items-center gap-2 text-sm">' +
                       '<i class="fas fa-user-tie w-4 h-4 text-gray-400"></i>' +
                       '<span class="text-gray-600">지점장: ' + branch.manager + '</span>' +
                       '</div>' +
                       '</div>' +
                       '<div class="pt-4 border-t border-gray-200 flex justify-between text-sm">' +
                       '<span class="text-gray-500">직원 ' + branch.employeeCount + '명</span>' +
                       '<span class="text-blue-600 font-medium">월 ' + (branch.monthlyRevenue / 10000).toLocaleString() + '만원</span>' +
                       '</div>' +
                       '</div>';
            }).join('');

            document.getElementById('branchGrid').innerHTML = html;
        }

        // 페이지네이션 렌더링
        function renderPagination() {
            var totalPages = Math.ceil(currentBranches.length / itemsPerPage);
            
            if (totalPages <= 1) {
                document.getElementById('paginationArea').innerHTML = '';
                return;
            }

            var html = '<div class="flex items-center justify-center gap-2">' +
                      '<button onclick="setPage(Math.max(1, ' + currentPage + ' - 1))" class="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 ' + (currentPage === 1 ? 'disabled opacity-50 cursor-not-allowed' : '') + '">' +
                      '<i class="fas fa-chevron-left w-4 h-4"></i>' +
                      '</button>';

            for (var i = 1; i <= totalPages; i++) {
                if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                    var btnClass = currentPage === i ? 'bg-[#00853D] text-white border-[#00853D]' : 'border-gray-300 hover:bg-gray-100';
                    html += '<button onclick="setPage(' + i + ')" class="px-3 py-2 rounded-lg border transition-all ' + btnClass + '">' + i + '</button>';
                } else if (i === 2 || i === totalPages - 1) {
                    html += '<span class="px-2">...</span>';
                }
            }

            html += '<button onclick="setPage(Math.min(' + totalPages + ', ' + currentPage + ' + 1))" class="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 ' + (currentPage === totalPages ? 'disabled opacity-50 cursor-not-allowed' : '') + '">' +
                   '<i class="fas fa-chevron-right w-4 h-4"></i>' +
                   '</button>' +
                   '</div>';

            document.getElementById('paginationArea').innerHTML = html;
        }

        // 지역 설정
        function setRegion(region) {
            selectedRegion = region;
            renderRegionFilters();
            applyFilters();
        }

        // 페이지 설정
        function setPage(page) {
            currentPage = page;
            renderBranches();
            renderPagination();
        }

        // 직영점 상세 정보 보기
        function viewBranchDetail(branchId) {
            selectedBranchForDetail = mockBranches.find(function(b) { return b.id === branchId; });
            
            if (!selectedBranchForDetail) {
                alert('지점 정보를 찾을 수 없습니다.');
                return;
            }

            var statusClass = '';
            if (selectedBranchForDetail.status === '정상 운영') {
                statusClass = 'bg-green-100 text-green-700';
            } else if (selectedBranchForDetail.status === '점검 중') {
                statusClass = 'bg-yellow-100 text-yellow-700';
            } else {
                statusClass = 'bg-red-100 text-red-700';
            }

            var html = '<div class="grid grid-cols-2 gap-4">' +
                      '<div>' +
                      '<p class="text-sm text-gray-500 mb-1">지점 코드</p>' +
                      '<p class="font-medium">' + selectedBranchForDetail.id + '</p>' +
                      '</div>' +
                      '<div>' +
                      '<p class="text-sm text-gray-500 mb-1">지역</p>' +
                      '<p class="font-medium">' + selectedBranchForDetail.region + '</p>' +
                      '</div>' +
                      '</div>' +
                      '<div>' +
                      '<p class="text-sm text-gray-500 mb-1">주소</p>' +
                      '<p class="font-medium">' + selectedBranchForDetail.address + '</p>' +
                      '<p class="text-sm text-gray-600 mt-1">' + selectedBranchForDetail.detailedAddress + '</p>' +
                      '</div>' +
                      '<div class="grid grid-cols-2 gap-4">' +
                      '<div>' +
                      '<p class="text-sm text-gray-500 mb-1">전화번호</p>' +
                      '<p class="font-medium">' + selectedBranchForDetail.phone + '</p>' +
                      '</div>' +
                      '<div>' +
                      '<p class="text-sm text-gray-500 mb-1">위치 좌표</p>' +
                      '<p class="font-medium text-sm">' + selectedBranchForDetail.latitude + ', ' + selectedBranchForDetail.longitude + '</p>' +
                      '</div>' +
                      '</div>' +
                      '<div>' +
                      '<p class="text-sm text-gray-500 mb-1">영업 시간</p>' +
                      '<p class="font-medium">' + selectedBranchForDetail.openingHours + '</p>' +
                      '</div>' +
                      '<div>' +
                      '<p class="text-sm text-gray-500 mb-1">상태</p>' +
                      '<span class="px-3 py-1 rounded-full text-xs font-medium ' + statusClass + '">' + selectedBranchForDetail.status + '</span>' +
                      '</div>' +
                      '<div class="grid grid-cols-2 gap-4">' +
                      '<div>' +
                      '<p class="text-sm text-gray-500 mb-1">지점장</p>' +
                      '<p class="font-medium">' + selectedBranchForDetail.manager + '</p>' +
                      '<p class="text-sm text-gray-600 mt-1">' + selectedBranchForDetail.managerPhone + '</p>' +
                      '</div>' +
                      '<div>' +
                      '<p class="text-sm text-gray-500 mb-1">직원 수</p>' +
                      '<p class="font-medium">' + selectedBranchForDetail.employeeCount + '명</p>' +
                      '</div>' +
                      '</div>' +
                      '<div class="bg-blue-50 rounded-lg p-4">' +
                      '<p class="text-sm text-blue-600 mb-1">월 매출</p>' +
                      '<p class="text-2xl font-bold text-blue-700">₩' + selectedBranchForDetail.monthlyRevenue.toLocaleString() + '</p>' +
                      '</div>';

            document.getElementById('detailModalTitle').innerText = selectedBranchForDetail.name + ' 상세 정보';
            document.getElementById('detailModalContent').innerHTML = html;
            document.getElementById('detailModal').classList.remove('modal-hidden');
        }

        // 상세 정보 모달 닫기
        function closeDetailModal() {
            document.getElementById('detailModal').classList.add('modal-hidden');
            selectedBranchForDetail = null;
        }

        // 모달 배경 클릭으로 닫기
        document.addEventListener('DOMContentLoaded', function() {
            var modal = document.getElementById('detailModal');
            var modalContent = modal.querySelector('.bg-white');
            
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    closeDetailModal();
                }
            });
            
            modalContent.addEventListener('click', function(event) {
                event.stopPropagation();
            });
        });

        // ESC 키로 모달 닫기
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                var modal = document.getElementById('detailModal');
                if (!modal.classList.contains('modal-hidden')) {
                    closeDetailModal();
                }
            }
        });

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


