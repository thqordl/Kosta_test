<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>직원 일정 관리 - ZERO LOSS 본사 관리 시스템</title>
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
	    .calendar-grid {
	        display: grid;
	        grid-template-columns: repeat(7, 1fr);
	        gap: 0;
	    }
	    .day-cell {
	        border: 1px solid #e5e7eb;
	        padding: 8px;
	        overflow: hidden;
	        overflow-y: auto;
	    }
	    .day-cell.other-month {
	        background-color: #f9fafb;
	    }
	    .day-cell.today {
	        background-color: #eff6ff;
	        border-left: 3px solid #3b82f6;
	    }
	    .day-header {
	        text-align: center;
	        padding: 12px 8px;
	        font-weight: 600;
	        border-bottom: 2px solid #e5e7eb;
	        background-color: #f3f4f6;
	        font-size: 14px;
	        color: #374151;
	    }
	    .schedule-event {
	        font-size: 12px;
	        padding: 6px;
	        margin-bottom: 4px;
	        border-radius: 4px;
	        color: white;
	        cursor: pointer;
	        transition: opacity 0.2s;
	    }
	    .schedule-event:hover {
	        opacity: 0.9;
	    }
	    .type-근무 { background-color: #3b82f6; }
	    .type-휴가 { background-color: #10b981; }
	    .type-교육 { background-color: #a855f7; }
	    .type-회의 { background-color: #f97316; }
	    .type-출장 { background-color: #ef4444; }
	
	    /* 수정 모달 전용 */
	    .modal-input,
	    .modal-select,
	    .modal-textarea {
	        width: 100%;
	        border: 1px solid #d1d5db;
	        border-radius: 0.5rem;
	        padding: 0.625rem 0.875rem;
	        font-size: 0.875rem;
	        outline: none;
	        transition: all 0.2s;
	        background: #fff;
	    }
	    .modal-input:focus,
	    .modal-select:focus,
	    .modal-textarea:focus {
	        border-color: #00853D;
	        box-shadow: 0 0 0 3px rgba(0, 133, 61, 0.12);
	    }
	    .modal-textarea {
	        min-height: 96px;
	        resize: none;
	    }
	    .modal-readonly {
	        background-color: #f3f4f6;
	        color: #6b7280;
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
                            <h2 class="text-3xl font-bold text-gray-900">직원 일정 관리</h2>
                            <p class="text-gray-500 mt-1">모든 매장 및 본사 직원의 일정을 통합 관리합니다</p>
                        </div>
                        <button onclick="showAddModal()" class="flex items-center gap-2 bg-[#00853D] text-white px-4 py-2.5 rounded-lg hover:bg-[#006B2F] transition-colors">
                            <i class="fas fa-plus w-5 h-5"></i>
                            <span>일정 추가</span>
                        </button>
                    </div>

                    <!-- 본사관리자 전용 공지 -->
                    <div class="bg-purple-50 border border-purple-200 rounded-lg p-3 flex items-start gap-3">
                        <i class="fas fa-circle-info w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5"></i>
                        <div class="text-xs text-purple-800">
                            <p class="font-medium">본사관리자 전용 기능</p>
                            <p class="mt-1">모든 매장 및 본사의 직원 일정을 조회하고 관리할 수 있습니다.</p>
                        </div>
                    </div>

                    <!-- 통계 카드 -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="bg-white rounded-lg border border-gray-200 p-4">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-calendar w-6 h-6 text-blue-600"></i>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">총 일정</p>
                                    <p class="text-2xl font-bold text-gray-900 mt-1" id="totalSchedules">0</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg border border-gray-200 p-4">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-clock w-6 h-6 text-green-600"></i>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">근무 일정</p>
                                    <p class="text-2xl font-bold text-gray-900 mt-1" id="scheduleWork">0</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg border border-gray-200 p-4">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-file-alt w-6 h-6 text-purple-600"></i>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">회의/교육</p>
                                    <p class="text-2xl font-bold text-gray-900 mt-1" id="scheduleMeetings">0</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg border border-gray-200 p-4">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-map-pin w-6 h-6 text-yellow-600"></i>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">휴가/출장</p>
                                    <p class="text-2xl font-bold text-gray-900 mt-1" id="scheduleTimeoff">0</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 필터 -->
                    <div class="bg-white rounded-lg border border-gray-200 p-6">
                        <div class="space-y-4">
                            <div class="flex items-center gap-2 mb-4">
                                <i class="fas fa-filter w-5 h-5 text-gray-500"></i>
                                <span class="text-sm font-medium text-gray-700">필터</span>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">매장</label>
                                    <select id="branchFilter" onchange="applyFilters()" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                                        <option value="전체">전체</option>
                                        <option value="본사">본사</option>
                                        <option value="강남점">강남점</option>
                                        <option value="신촌점">신촌점</option>
                                        <option value="홍대점">홍대점</option>
                                        <option value="건대점">건대점</option>
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">직원</label>
                                    <select id="employeeFilter" onchange="applyFilters()" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                                        <option value="전체">전체</option>
                                        <option value="1">김관리자 (본사)</option>
                                        <option value="2">이과장 (본사)</option>
                                        <option value="3">박대리 (본사)</option>
                                        <option value="4">최지점장 (강남점)</option>
                                        <option value="5">정매니저 (강남점)</option>
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">근무 유형</label>
                                    <select id="typeFilter" onchange="applyFilters()" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm">
                                        <option value="전체">전체</option>
                                        <option value="근무">근무</option>
                                        <option value="휴가">휴가</option>
                                        <option value="교육">교육</option>
                                        <option value="회의">회의</option>
                                        <option value="출장">출장</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 캘린더 컨트롤 -->
                    <div class="bg-white rounded-lg border border-gray-200 p-4">
                        <div class="flex items-center justify-between mb-6">
                            <div class="flex items-center gap-4">
                                <button onclick="previousPeriod()" class="p-2 rounded-lg hover:bg-gray-100">
                                    <i class="fas fa-chevron-left w-5 h-5"></i>
                                </button>
                                <h3 id="monthTitle" class="text-lg font-semibold text-gray-900 min-w-64 text-center">2024년 4월</h3>
                                <button onclick="nextPeriod()" class="p-2 rounded-lg hover:bg-gray-100">
                                    <i class="fas fa-chevron-right w-5 h-5"></i>
                                </button>
                            </div>
                            <div class="flex items-center gap-2">
                                <button onclick="setViewMode('month')" id="monthViewBtn" class="px-4 py-2 rounded-lg text-sm transition-colors bg-[#00853D] text-white font-medium">월</button>
                                <button onclick="setViewMode('week')" id="weekViewBtn" class="px-4 py-2 rounded-lg text-sm transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">주</button>
                                <button onclick="setViewMode('day')" id="dayViewBtn" class="px-4 py-2 rounded-lg text-sm transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">일</button>
                                <button onclick="goToday()" class="ml-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">오늘</button>
                            </div>
                        </div>

                        <!-- 캘린더 범례 -->
                        <div class="flex items-center gap-6 mb-4 flex-wrap text-sm">
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span class="text-gray-600">근무</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span class="text-gray-600">휴가</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 bg-purple-500 rounded-full"></div>
                                <span class="text-gray-600">교육</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 bg-orange-500 rounded-full"></div>
                                <span class="text-gray-600">회의</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span class="text-gray-600">출장</span>
                            </div>
                        </div>

                        <!-- 캘린더 그리드 -->
                        <div class="border border-gray-200 rounded-lg overflow-hidden">
                            <!-- 요일 헤더 -->
                            <div id="dayHeaders" class="calendar-grid gap-0 bg-gray-50">
                                <div class="day-header">일</div>
                                <div class="day-header">월</div>
                                <div class="day-header">화</div>
                                <div class="day-header">수</div>
                                <div class="day-header">목</div>
                                <div class="day-header">금</div>
                                <div class="day-header">토</div>
                            </div>

                            <!-- 캘린더 셀 -->
                            <div id="calendarContainer" class="calendar-grid gap-0">
                                <!-- 동적으로 생성됨 -->
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <!-- 일정 추가 모달 -->
    <div id="addModal" class="modal-hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="if(event.target === this) closeAddModal()">
        <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
            <div class="border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 bg-white">
                <h3 class="text-lg font-bold text-gray-900">일정 추가</h3>
                <button onclick="closeAddModal()" class="text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times w-5 h-5"></i>
                </button>
            </div>

            <div class="p-6 space-y-6">
                <!-- 직원 및 매장 선택 -->
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            직원 선택 <span class="text-red-500">*</span>
                        </label>
                        <select id="positionSelect" onchange="updateEmployeeCheckboxes()" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent mb-3">
                            <option value="">직급을 먼저 선택하세요</option>
                            <option value="부장">부장</option>
                            <option value="과장">과장</option>
                            <option value="차장">차장</option>
                            <option value="대리">대리</option>
                            <option value="지점장">지점장</option>
                            <option value="매니저">매니저</option>
                            <option value="직원">직원</option>
                        </select>
                        <div id="employeeCheckboxes" class="border border-gray-300 rounded-lg p-3 max-h-48 overflow-y-auto bg-gray-50 hidden">
                            <div class="space-y-2" id="employeeList"></div>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">직급을 선택하면 해당 직급의 직원이 표시됩니다</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            매장 선택 <span class="text-red-500">*</span>
                        </label>
                        <select id="branchSelect" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                            <option value="">매장을 선택하세요</option>
                            <option value="본사">본사</option>
                            <option value="강남점">강남점</option>
                            <option value="신촌점">신촌점</option>
                            <option value="홍대점">홍대점</option>
                            <option value="건대점">건대점</option>
                        </select>
                    </div>
                </div>

                <!-- 날짜 및 근무 유형 -->
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            날짜 <span class="text-red-500">*</span>
                        </label>
                        <input type="date" id="scheduleDate" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            근무 유형 <span class="text-red-500">*</span>
                        </label>
                        <select id="scheduleType" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                            <option value="근무">근무</option>
                            <option value="휴가">휴가</option>
                            <option value="교육">교육</option>
                            <option value="회의">회의</option>
                            <option value="출장">출장</option>
                        </select>
                    </div>
                </div>

                <!-- 근무 시간 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        근무 시간 <span class="text-red-500">*</span>
                    </label>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">시작 시간</label>
                            <input type="time" id="startTime" value="09:00" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">종료 시간</label>
                            <input type="time" id="endTime" value="18:00" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                        </div>
                    </div>
                </div>

                <!-- 반복 여부 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">반복 여부</label>
                    <div class="space-y-2">
                        <label class="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-[#00853D] cursor-pointer transition-colors">
                            <input type="radio" name="repeat" value="none" checked class="w-4 h-4 text-[#00853D] focus:ring-[#00853D]">
                            <span class="text-sm text-gray-700">반복 없음</span>
                        </label>

                        <label class="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-[#00853D] cursor-pointer transition-colors">
                            <input type="radio" name="repeat" value="weekly" class="w-4 h-4 text-[#00853D] focus:ring-[#00853D]">
                            <span class="text-sm text-gray-700">매주 반복</span>
                        </label>

                        <label class="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-[#00853D] cursor-pointer transition-colors">
                            <input type="radio" name="repeat" value="biweekly" class="w-4 h-4 text-[#00853D] focus:ring-[#00853D]">
                            <span class="text-sm text-gray-700">격주 반복</span>
                        </label>

                        <label class="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-[#00853D] cursor-pointer transition-colors">
                            <input type="radio" name="repeat" value="monthly" class="w-4 h-4 text-[#00853D] focus:ring-[#00853D]">
                            <span class="text-sm text-gray-700">월별 반복</span>
                        </label>
                    </div>
                </div>

                <!-- 근무 역할 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">근무 역할</label>
                    <select id="role" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent">
                        <option value="">선택하세요</option>
                        <option value="매장 관리">매장 관리</option>
                        <option value="주방">주방</option>
                        <option value="홀 서빙">홀 서빙</option>
                        <option value="카운터">카운터</option>
                        <option value="배달">배달</option>
                        <option value="재고 관리">재고 관리</option>
                        <option value="청소">청소</option>
                        <option value="교육 진행">교육 진행</option>
                    </select>
                </div>

                <!-- 메모 -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">메모</label>
                    <textarea id="notes" placeholder="추가 정보나 특이사항을 입력하세요..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853D] focus:border-transparent text-sm" rows="4"></textarea>
                </div>

                <!-- 안내 메시지 -->
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
                    <i class="fas fa-circle-info w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"></i>
                    <div class="text-sm text-blue-800">
                        <p class="font-medium">일정 추가 안내</p>
                        <ul class="mt-1 space-y-0.5 text-xs">
                            <li>• 필수 항목(*)은 반드시 입력해야 합니다</li>
                            <li>• 반복 일정 선택 시 해당 기간 동안 자동으로 생성됩니다</li>
                            <li>• 휴게 시간은 전체 근무 시간에서 제외됩니다</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="border-t border-gray-200 px-6 py-4 flex justify-between items-center sticky bottom-0 bg-white">
                <div class="text-sm text-gray-500">
                    <span class="text-red-500">*</span> 필수 입력 항목
                </div>
                <div class="flex gap-3">
                    <button onclick="closeAddModal()" class="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                        취소
                    </button>
                    <button onclick="saveSchedule()" class="px-5 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F] transition-colors text-sm">
                        일정 추가
                    </button>
                </div>
            </div>
        </div>
    </div>
    
	<!-- 일정 수정 모달 -->
	<div id="editModal" class="modal-hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="if(event.target === this) closeEditModal()">
	    <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
	        <div class="border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 bg-white">
	            <h3 class="text-lg font-bold text-gray-900">일정 수정</h3>
	            <button type="button" onclick="closeEditModal()" class="text-gray-400 hover:text-gray-600">
	                <i class="fas fa-times w-5 h-5"></i>
	            </button>
	        </div>
	
	        <div class="p-6 space-y-6">
	            <input type="hidden" id="editScheduleId">
	
	            <!-- 직원 및 매장 -->
	            <div class="grid grid-cols-2 gap-4">
	                <div>
	                    <label class="block text-sm font-medium text-gray-700 mb-2">직원</label>
	                    <input type="text" id="editEmployeeName" class="modal-input modal-readonly" readonly>
	                </div>
	
	                <div>
	                    <label class="block text-sm font-medium text-gray-700 mb-2">매장</label>
	                    <select id="editBranch" class="modal-select">
	                        <option value="">매장을 선택하세요</option>
	                        <option value="본사">본사</option>
	                        <option value="강남점">강남점</option>
	                        <option value="신촌점">신촌점</option>
	                        <option value="홍대점">홍대점</option>
	                        <option value="건대점">건대점</option>
	                    </select>
	                </div>
	            </div>
	
	            <!-- 날짜 및 근무 유형 -->
	            <div class="grid grid-cols-2 gap-4">
	                <div>
	                    <label class="block text-sm font-medium text-gray-700 mb-2">날짜</label>
	                    <input type="date" id="editDate" class="modal-input modal-readonly" readonly>
	                </div>
	
	                <div>
	                    <label class="block text-sm font-medium text-gray-700 mb-2">근무 유형</label>
	                    <select id="editScheduleType" class="modal-select">
	                        <option value="근무">근무</option>
	                        <option value="휴가">휴가</option>
	                        <option value="교육">교육</option>
	                        <option value="회의">회의</option>
	                        <option value="출장">출장</option>
	                    </select>
	                </div>
	            </div>
	
	            <!-- 근무 시간 -->
	            <div>
	                <label class="block text-sm font-medium text-gray-700 mb-2">근무 시간</label>
	                <div class="grid grid-cols-2 gap-4">
	                    <div>
	                        <label class="block text-xs text-gray-500 mb-1">시작 시간</label>
	                        <input type="time" id="editStartTime" class="modal-input">
	                    </div>
	                    <div>
	                        <label class="block text-xs text-gray-500 mb-1">종료 시간</label>
	                        <input type="time" id="editEndTime" class="modal-input">
	                    </div>
	                </div>
	            </div>
	
	            <!-- 반복 여부 -->
	            <div>
	                <label class="block text-sm font-medium text-gray-700 mb-2">반복 여부</label>
	                <div class="space-y-2">
	                    <label class="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-[#00853D] cursor-pointer transition-colors">
	                        <input type="radio" name="editRepeat" value="none" class="w-4 h-4 text-[#00853D] focus:ring-[#00853D]">
	                        <span class="text-sm text-gray-700">반복 없음</span>
	                    </label>
	
	                    <label class="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-[#00853D] cursor-pointer transition-colors">
	                        <input type="radio" name="editRepeat" value="weekly" class="w-4 h-4 text-[#00853D] focus:ring-[#00853D]">
	                        <span class="text-sm text-gray-700">매주 반복</span>
	                    </label>
	
	                    <label class="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-[#00853D] cursor-pointer transition-colors">
	                        <input type="radio" name="editRepeat" value="biweekly" class="w-4 h-4 text-[#00853D] focus:ring-[#00853D]">
	                        <span class="text-sm text-gray-700">격주 반복</span>
	                    </label>
	
	                    <label class="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-[#00853D] cursor-pointer transition-colors">
	                        <input type="radio" name="editRepeat" value="monthly" class="w-4 h-4 text-[#00853D] focus:ring-[#00853D]">
	                        <span class="text-sm text-gray-700">월별 반복</span>
	                    </label>
	                </div>
	            </div>
	
	            <!-- 근무 역할 -->
	            <div>
	                <label class="block text-sm font-medium text-gray-700 mb-2">근무 역할</label>
	                <select id="editRole" class="modal-select">
	                    <option value="">선택하세요</option>
	                    <option value="매장 관리">매장 관리</option>
	                    <option value="주방">주방</option>
	                    <option value="홀 서빙">홀 서빙</option>
	                    <option value="카운터">카운터</option>
	                    <option value="배달">배달</option>
	                    <option value="재고 관리">재고 관리</option>
	                    <option value="청소">청소</option>
	                    <option value="교육 진행">교육 진행</option>
	                </select>
	            </div>
	
	            <!-- 메모 -->
	            <div>
	                <label class="block text-sm font-medium text-gray-700 mb-2">메모</label>
	                <textarea id="editNotes" class="modal-textarea" placeholder="추가 정보나 특이사항을 입력하세요..."></textarea>
	            </div>
	        </div>
	
	        <div class="border-t border-gray-200 px-6 py-4 flex justify-between items-center sticky bottom-0 bg-white">
	            <button type="button" onclick="deleteSchedule()" class="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">
	                <i class="fas fa-trash-alt"></i>
	                삭제
	            </button>
	
	            <div class="flex gap-3">
	                <button type="button" onclick="closeEditModal()" class="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm">
	                    취소
	                </button>
	                <button type="button" onclick="updateSchedule()" class="px-5 py-2 bg-[#00853D] text-white rounded-lg hover:bg-[#006B2F] transition-colors text-sm">
	                    저장
	                </button>
	            </div>
	        </div>
	    </div>
	</div>

    <script>
        // 직원 데이터 (React와 동일)
        var employees = [
            { id: '1', name: '김관리자', branch: '본사', position: '부장' },
            { id: '2', name: '이과장', branch: '본사', position: '과장' },
            { id: '3', name: '박대리', branch: '본사', position: '대리' },
            { id: '11', name: '최차장', branch: '본사', position: '차장' },
            { id: '12', name: '강직원', branch: '본사', position: '직원' },
            { id: '4', name: '최지점장', branch: '강남점', position: '지점장' },
            { id: '5', name: '정매니저', branch: '강남점', position: '매니저' },
            { id: '6', name: '한직원', branch: '강남점', position: '직원' },
            { id: '7', name: '송지점장', branch: '신촌점', position: '지점장' },
            { id: '8', name: '윤매니저', branch: '신촌점', position: '매니저' },
            { id: '9', name: '강지점장', branch: '홍대점', position: '지점장' },
            { id: '10', name: '조매니저', branch: '홍대점', position: '매니저' },
        ];

        // Mock 데이터
        var schedules = [
            { id: '1', employee: '김관리자', employeeId: '1', branch: '본사', type: '근무', title: '정규 근무', date: '2024-04-01', startTime: '09:00', endTime: '18:00', location: '본사', notes: '' },
            { id: '2', employee: '이과장', employeeId: '2', branch: '본사', type: '회의', title: '분기 회의', date: '2024-04-01', startTime: '14:00', endTime: '16:00', location: '본사 회의실', notes: '' },
            { id: '3', employee: '최지점장', employeeId: '4', branch: '강남점', type: '근무', title: '오픈 근무', date: '2024-04-01', startTime: '08:00', endTime: '17:00', location: '강남점', notes: '' },
            { id: '4', employee: '정매니저', employeeId: '5', branch: '강남점', type: '휴가', title: '연차', date: '2024-04-02', startTime: '00:00', endTime: '23:59', location: '강남점', notes: '개인 사유' },
        ];

        var currentDate = new Date(2024, 3, 1); // 2024년 4월
        var viewMode = 'month';
        var selectedEmployees = [];

        // 초기화
        window.addEventListener('DOMContentLoaded', function() {
            renderCalendar();
            updateStats();
        });

        // 직급 선택에 따른 직원 체크박스 업데이트
        function updateEmployeeCheckboxes() {
            var position = document.getElementById('positionSelect').value;
            var container = document.getElementById('employeeCheckboxes');
            var list = document.getElementById('employeeList');

            if (!position) {
                container.classList.add('hidden');
                list.innerHTML = '';
                return;
            }

            var filtered = employees.filter(function(e) { return e.position === position; });
            var html = '';

            for (var i = 0; i < filtered.length; i++) {
                var emp = filtered[i];
                html += '<label class="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">';
                html += '  <input type="checkbox" value="' + emp.id + '" class="w-4 h-4 text-[#00853D] border-gray-300 rounded focus:ring-[#00853D]" onchange="updateSelectedEmployees()">';
                html += '  <div class="flex items-center gap-2 flex-1">';
                html += '    <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">';
                html += emp.name.charAt(0);
                html += '    </div>';
                html += '    <div class="text-sm">';
                html += '      <span class="font-medium text-gray-900">' + emp.name + '</span>';
                html += '      <span class="text-gray-500 ml-1">(' + emp.branch + ')</span>';
                html += '    </div>';
                html += '  </div>';
                html += '</label>';
            }

            if (filtered.length === 0) {
                html = '<p class="text-sm text-gray-500 text-center py-4">해당 직급의 직원이 없습니다</p>';
            }

            list.innerHTML = html;
            container.classList.remove('hidden');
        }

        // 선택된 직원 업데이트
        function updateSelectedEmployees() {
            var checkboxes = document.querySelectorAll('#employeeList input[type="checkbox"]:checked');
            selectedEmployees = [];
            for (var i = 0; i < checkboxes.length; i++) {
                selectedEmployees.push(checkboxes[i].value);
            }
        }

        // 뷰 모드 설정
        function setViewMode(mode) {
            viewMode = mode;
            document.getElementById('monthViewBtn').classList.remove('bg-[#00853D]', 'text-white', 'font-medium');
            document.getElementById('monthViewBtn').classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
            document.getElementById('weekViewBtn').classList.remove('bg-[#00853D]', 'text-white', 'font-medium');
            document.getElementById('weekViewBtn').classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
            document.getElementById('dayViewBtn').classList.remove('bg-[#00853D]', 'text-white', 'font-medium');
            document.getElementById('dayViewBtn').classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');

            var btn = document.getElementById(mode + 'ViewBtn');
            btn.classList.remove('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
            btn.classList.add('bg-[#00853D]', 'text-white', 'font-medium');

            renderCalendar();
        }

        // 이전 기간
        function previousPeriod() {
            if (viewMode === 'month') {
                currentDate.setMonth(currentDate.getMonth() - 1);
            } else if (viewMode === 'week') {
                currentDate.setDate(currentDate.getDate() - 7);
            } else {
                currentDate.setDate(currentDate.getDate() - 1);
            }
            renderCalendar();
        }

        // 다음 기간
        function nextPeriod() {
            if (viewMode === 'month') {
                currentDate.setMonth(currentDate.getMonth() + 1);
            } else if (viewMode === 'week') {
                currentDate.setDate(currentDate.getDate() + 7);
            } else {
                currentDate.setDate(currentDate.getDate() + 1);
            }
            renderCalendar();
        }

        // 오늘로 이동
        function goToday() {
            currentDate = new Date();
            renderCalendar();
        }

        // 캘린더 렌더링
        function renderCalendar() {
            var year = currentDate.getFullYear();
            var month = currentDate.getMonth();
            var date = currentDate.getDate();

            // 제목 업데이트
            if (viewMode === 'month') {
                document.getElementById('monthTitle').textContent = year + '년 ' + (month + 1) + '월';
            } else if (viewMode === 'week') {
                var weekStart = new Date(currentDate);
                weekStart.setDate(date - weekStart.getDay());
                var weekEnd = new Date(weekStart);
                weekEnd.setDate(weekEnd.getDate() + 6);
                var startStr = (weekStart.getMonth() + 1) + '월 ' + weekStart.getDate() + '일';
                var endStr = (weekEnd.getMonth() + 1) + '월 ' + weekEnd.getDate() + '일';
                document.getElementById('monthTitle').textContent = startStr + ' - ' + endStr;
            } else {
                document.getElementById('monthTitle').textContent = year + '년 ' + (month + 1) + '월 ' + date + '일';
            }

            // 요일 헤더 처리 - week 뷰일 때 요일별로 표시
            var dayHeaders = document.getElementById('dayHeaders');
            if (viewMode === 'day') {
                dayHeaders.className = 'calendar-grid gap-0 bg-gray-50';
                dayHeaders.innerHTML = '<div class="day-header">' + ['일', '월', '화', '수', '목', '금', '토'][currentDate.getDay()] + '</div>';
            } else if (viewMode === 'week') {
                dayHeaders.className = 'calendar-grid gap-0 bg-gray-50';
                // week 뷰일 때 주의 날짜 헤더
                var weekStart = new Date(currentDate);
                weekStart.setDate(date - weekStart.getDay());
                var weekDays = [];
                for (var k = 0; k < 7; k++) {
                    var d = new Date(weekStart);
                    d.setDate(d.getDate() + k);
                    weekDays.push(['일', '월', '화', '수', '목', '금', '토'][d.getDay()] + ' ' + d.getDate());
                }
                dayHeaders.innerHTML = '<div class="day-header">' + weekDays.join('</div><div class="day-header">') + '</div>';
            } else {
                // month 뷰
                dayHeaders.className = 'calendar-grid gap-0 bg-gray-50';
                dayHeaders.innerHTML = '<div class="day-header">일</div><div class="day-header">월</div><div class="day-header">화</div><div class="day-header">수</div><div class="day-header">목</div><div class="day-header">금</div><div class="day-header">토</div>';
            }

            // 캘린더 셀 생성
            var days = [];
            if (viewMode === 'month') {
                var firstDay = new Date(year, month, 1);
                var lastDay = new Date(year, month + 1, 0);
                var prevLastDay = new Date(year, month, 0);
                var startDay = firstDay.getDay();

                // 이전 달
                for (var i = startDay - 1; i >= 0; i--) {
                    var d = prevLastDay.getDate() - i;
                    days.push({ day: d, currentMonth: false, date: new Date(year, month - 1, d) });
                }

                // 현월
                for (var d = 1; d <= lastDay.getDate(); d++) {
                    days.push({ day: d, currentMonth: true, date: new Date(year, month, d) });
                }

                // 다음 달
                var remaining = 42 - days.length;
                for (var d = 1; d <= remaining; d++) {
                    days.push({ day: d, currentMonth: false, date: new Date(year, month + 1, d) });
                }
            } else if (viewMode === 'week') {
                var weekStart = new Date(currentDate);
                weekStart.setDate(date - weekStart.getDay());
                for (var i = 0; i < 7; i++) {
                    var d = new Date(weekStart);
                    d.setDate(d.getDate() + i);
                    days.push({ day: d.getDate(), currentMonth: d.getMonth() === month, date: d });
                }
            } else {
                // day 뷰
                days.push({ day: date, currentMonth: true, date: new Date(year, month, date) });
            }

            // HTML 생성
            var html = '';
            var minHeight = viewMode === 'day' ? '300px' : (viewMode === 'week' ? '150px' : '120px');
            
            for (var i = 0; i < days.length; i++) {
                var dayObj = days[i];
                var dateStr = dayObj.date.getFullYear() + '-' + 
                              String(dayObj.date.getMonth() + 1).padStart(2, '0') + '-' + 
                              String(dayObj.date.getDate()).padStart(2, '0');
                var daySchedules = schedules.filter(function(s) { return s.date === dateStr; });
                var isToday = new Date().toLocaleDateString() === dayObj.date.toLocaleDateString();
                var cellClass = 'day-cell p-2 cursor-pointer hover:bg-blue-50 ' + 
                               (dayObj.currentMonth ? '' : 'other-month ') + 
                               (isToday ? 'today' : '');

                html += '<div class="' + cellClass + '" style="min-height: ' + minHeight + ';" onclick="selectDateForModal(\'' + dateStr + '\')">';
                html += '  <div class="text-xs font-medium mb-1 text-gray-900">' + dayObj.day + '</div>';

                var maxEvents = viewMode === 'month' ? 3 : (viewMode === 'week' ? 5 : 20);
                for (var j = 0; j < Math.min(daySchedules.length, maxEvents); j++) {
                    var s = daySchedules[j];
                    var empName = s.employee.substring(0, 3);
                    html += '  <div class="schedule-event type-' + s.type + '" onclick="event.stopPropagation(); viewSchedule(\'' + s.id + '\')" title="' + s.employee + ' - ' + s.type + '">';
                    html += '<span class="text-xs font-semibold">' + empName + '</span> <span class="text-xs">' + s.type + '</span>';
                    html += '</div>';
                }

                if (daySchedules.length > maxEvents) {
                    html += '  <div class="text-xs text-gray-600 text-center font-medium mt-1">+' + (daySchedules.length - maxEvents) + '개 더보기</div>';
                }

                html += '</div>';
            }

            var container = document.getElementById('calendarContainer');
            container.className = viewMode === 'day' ? 'calendar-grid gap-0' : 'calendar-grid gap-0';
            container.innerHTML = html;
            
            // 캘린더 그리드 다시 정렬
            container.style.gridTemplateColumns = viewMode === 'day' ? '1fr' : 'repeat(7, 1fr)';
            dayHeaders.style.gridTemplateColumns = viewMode === 'day' ? '1fr' : 'repeat(7, 1fr)';
        }

        // 달력에서 날짜 선택
        function selectDateForModal(dateStr) {
		    showAddModal(dateStr);
		}

        // 통계 업데이트
        function updateStats() {
            var total = schedules.length;
            var work = schedules.filter(function(s) { return s.type === '근무'; }).length;
            var meetings = schedules.filter(function(s) { return s.type === '회의' || s.type === '교육'; }).length;
            var timeoff = schedules.filter(function(s) { return s.type === '휴가' || s.type === '출장'; }).length;

            document.getElementById('totalSchedules').textContent = total;
            document.getElementById('scheduleWork').textContent = work;
            document.getElementById('scheduleMeetings').textContent = meetings;
            document.getElementById('scheduleTimeoff').textContent = timeoff;
        }

        // 필터 적용
        function applyFilters() {
            renderCalendar();
            updateStats();
        }

        // 모달 열기/닫기
        function showAddModal(selectedDate) {
		    document.getElementById('positionSelect').value = '';
		    document.getElementById('employeeCheckboxes').classList.add('hidden');
		    document.getElementById('employeeList').innerHTML = '';
		    document.getElementById('branchSelect').value = '';
		    document.getElementById('scheduleDate').value = selectedDate || new Date().toISOString().split('T')[0];
		    document.getElementById('scheduleType').value = '근무';
		    document.getElementById('startTime').value = '09:00';
		    document.getElementById('endTime').value = '18:00';
		    document.getElementById('role').value = '';
		    document.getElementById('notes').value = '';
		
		    document.querySelector('input[name="repeat"][value="none"]').checked = true;
		
		    document.getElementById('addModal').classList.remove('modal-hidden');
		}

        function closeAddModal() {
            document.getElementById('addModal').classList.add('modal-hidden');
        }

        // 일정 저장
        function saveSchedule() {
            var checkboxes = document.querySelectorAll('#employeeCheckboxes input[type="checkbox"]:checked');
            var date = document.getElementById('scheduleDate').value;
            var type = document.getElementById('scheduleType').value;
            var startTime = document.getElementById('startTime').value;
            var endTime = document.getElementById('endTime').value;
            var role = document.getElementById('role').value;
            var notes = document.getElementById('notes').value;

            if (checkboxes.length === 0 || !date || !type || !startTime || !endTime) {
                alert('필수 항목을 모두 입력하세요.');
                return;
            }

            // 선택된 모든 직원에 대해 일정 추가
            for (var i = 0; i < checkboxes.length; i++) {
                var empId = checkboxes[i].value;
                var emp = employees.find(function(e) { return e.id === empId; });
                if (emp) {
                    var newEvent = {
                        id: String(Math.random()),
                        employee: emp.name,
                        employeeId: empId,
                        branch: emp.branch,
                        type: type,
                        title: type,
                        date: date,
                        startTime: startTime,
                        endTime: endTime,
                        role: role,
                        notes: notes
                    };
                    schedules.push(newEvent);
                }
            }

            alert('일정이 추가되었습니다.');
            closeAddModal();
            renderCalendar();
            updateStats();
            document.getElementById('positionSelect').value = '';
            document.getElementById('employeeCheckboxes').classList.add('hidden');
            document.getElementById('employeeList').innerHTML = '';
            document.getElementById('role').value = '';
            selectedEmployees = [];
        }

        // 일정 조회
        function viewSchedule(id) {
		    var schedule = schedules.find(function(s) { return s.id === id; });
		    if (!schedule) return;
		
		    document.getElementById('editScheduleId').value = schedule.id;
		    document.getElementById('editEmployeeName').value = schedule.employee || '';
		    document.getElementById('editBranch').value = schedule.branch || '';
		    document.getElementById('editDate').value = schedule.date || '';
		    document.getElementById('editScheduleType').value = schedule.type || '근무';
		    document.getElementById('editStartTime').value = schedule.startTime || '';
		    document.getElementById('editEndTime').value = schedule.endTime || '';
		    document.getElementById('editRole').value = schedule.role || '';
		    document.getElementById('editNotes').value = schedule.notes || '';
		    
		    var repeatValue = schedule.repeat || 'none';
		    var repeatRadio = document.querySelector('input[name="editRepeat"][value="' + repeatValue + '"]');
		    if (repeatRadio) {
		        repeatRadio.checked = true;
		    }
		
		    document.getElementById('editModal').classList.remove('modal-hidden');
		}
        
        // 일정 수정 닫기
        function closeEditModal() {
            document.getElementById('editModal').classList.add('modal-hidden');
        }
		
        // 일정 수정
		function updateSchedule() {
		    var scheduleId = document.getElementById('editScheduleId').value;
		    var branch = document.getElementById('editBranch').value;
		    var type = document.getElementById('editScheduleType').value;
		    var startTime = document.getElementById('editStartTime').value;
		    var endTime = document.getElementById('editEndTime').value;
		    var repeat = document.querySelector('input[name="editRepeat"]:checked') ? document.querySelector('input[name="editRepeat"]:checked').value : 'none';
		    var role = document.getElementById('editRole').value;
		    var notes = document.getElementById('editNotes').value;
		
		    if (!branch || !type || !startTime || !endTime) {
		        alert('필수 항목을 모두 입력하세요.');
		        return;
		    }
		
		    var schedule = schedules.find(function(s) { return s.id === scheduleId; });
		    if (!schedule) {
		        alert('수정할 일정을 찾을 수 없습니다.');
		        return;
		    }
		
		    schedule.branch = branch;
		    schedule.type = type;
		    schedule.startTime = startTime;
		    schedule.endTime = endTime;
		    schedule.repeat = repeat;
		    schedule.role = role;
		    schedule.notes = notes;
		
		    alert('일정이 수정되었습니다.');
		    closeEditModal();
		    renderCalendar();
		    updateStats();
		}

        // 일정 삭제
        function deleteSchedule() {
            var scheduleId = document.getElementById('editScheduleId').value;

            if (!confirm('이 일정을 삭제하시겠습니까?')) {
                return;
            }

            schedules = schedules.filter(function(s) {
                return s.id !== scheduleId;
            });

            alert('일정이 삭제되었습니다.');
            closeEditModal();
            renderCalendar();
            updateStats();
        }

        // 사이드바 메뉴 토글
        function toggleMenu(button) {
            var submenu = button.nextElementSibling;
            if (submenu && submenu.classList.contains('submenu')) {
                submenu.classList.toggle('hidden');
                var arrow = button.querySelector('i:last-child');
                arrow.classList.toggle('fa-chevron-right');
                arrow.classList.toggle('fa-chevron-down');
            }
        }

        // 사이드바 토글
        function toggleSidebar() {
            var sidebar = document.getElementById('sidebar');
            var backdrop = document.getElementById('sidebarBackdrop');
            sidebar.classList.toggle('-translate-x-full');
            backdrop.classList.toggle('hidden');
        }

        // 사용자 메뉴 토글
        function toggleUserMenu() {
            var userMenu = document.getElementById('userMenu');
            userMenu.classList.toggle('hidden');
        }

        // 로그아웃
        function logout() {
            alert('로그아웃 되었습니다.');
        }
    </script>
</body>
</html>

