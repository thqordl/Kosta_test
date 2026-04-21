<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
String uri = request.getRequestURI();

boolean homeActive = uri.endsWith("/branch/main/home.jsp");

boolean stockGroup = uri.contains("/branch/stock/");
boolean stockStatusActive = uri.endsWith("/branch/stock/stock.jsp");
boolean stockChangeActive = uri.contains("/branch/stock/stock_change");

boolean receiptGroup = uri.contains("/branch/receipt/");
boolean receiptHistoryActive = uri.endsWith("/branch/receipt/history.jsp");
boolean receiptProcessingActive = uri.endsWith("/branch/receipt/processing.jsp");

boolean orderGroup = uri.contains("/branch/purchase_order/");
boolean orderHistoryActive = uri.contains("/branch/purchase_order/history");
boolean orderCreateActive = uri.contains("/branch/purchase_order/create");

boolean salesGroup = uri.contains("/branch/sales/");
boolean salesDetailActive = uri.contains("/branch/sales/branch_sales/");
boolean salesRankActive = uri.contains("/branch/sales/sales_rank/");

boolean swapActive = uri.contains("/branch/swap/");
boolean recipeActive = uri.contains("/branch/recipe/");

boolean hrGroup = uri.contains("/branch/hr/");
boolean hrEmployeeActive = uri.contains("/branch/hr/employee/");
boolean hrScheduleActive = uri.contains("/branch/hr/schedule/") || uri.contains("/branch/hr/list_schedule/");

boolean supportGroup = uri.contains("/branch/support/");
boolean noticeActive = uri.contains("/branch/support/notice/");
boolean inquiryActive = uri.contains("/branch/support/inquiry/");
%>
<div id="sidebarBackdrop" class="fixed inset-0 bg-black bg-opacity-50 z-20 hidden lg:hidden"></div>

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

    <nav class="p-4 space-y-1">
        <a href="<%= request.getContextPath() %>/branch/main/home.jsp" class="flex items-center gap-3 px-3 py-2.5 rounded-lg <%= homeActive ? "bg-[#00853D] text-white font-medium" : "text-gray-700 hover:bg-gray-100" %> transition-colors">
            <i class="fas fa-home w-5 h-5"></i>
            <span class="text-sm">홈</span>
        </a>

        <button onclick="toggleMenu(this)" class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg <%= stockGroup ? "bg-gray-100 text-gray-700" : "text-gray-700 hover:bg-gray-100" %> transition-colors">
            <div class="flex items-center gap-3">
                <i class="fas fa-warehouse w-5 h-5"></i>
                <span class="text-sm">재고관리</span>
            </div>
            <i class="fas <%= stockGroup ? "fa-chevron-down" : "fa-chevron-right" %> w-4 h-4"></i>
        </button>
        <div class="submenu <%= stockGroup ? "" : "hidden" %> ml-4 mt-1 space-y-1">
            <a href="<%= request.getContextPath() %>/branch/stock/stock.jsp" class="block px-4 py-2 rounded-lg text-sm <%= stockStatusActive ? "bg-[#00853D] text-white font-medium" : "text-gray-600 hover:bg-gray-100" %>">재고 현황</a>
            <a href="<%= request.getContextPath() %>/branch/stock/stock_change.jsp" class="block px-4 py-2 rounded-lg text-sm <%= stockChangeActive ? "bg-[#00853D] text-white font-medium" : "text-gray-600 hover:bg-gray-100" %>">재고 변동</a>
        </div>

        <button onclick="toggleMenu(this)" class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg <%= receiptGroup ? "bg-gray-100 text-gray-700" : "text-gray-700 hover:bg-gray-100" %> transition-colors">
            <div class="flex items-center gap-3">
                <i class="fas fa-box-open w-5 h-5"></i>
                <span class="text-sm">입고 관리</span>
            </div>
            <i class="fas <%= receiptGroup ? "fa-chevron-down" : "fa-chevron-right" %> w-4 h-4"></i>
        </button>
        <div class="submenu <%= receiptGroup ? "" : "hidden" %> ml-4 mt-1 space-y-1">
            <a href="<%= request.getContextPath() %>/branch/receipt/history.jsp" class="block px-4 py-2 rounded-lg text-sm <%= receiptHistoryActive ? "bg-[#00853D] text-white font-medium" : "text-gray-600 hover:bg-gray-100" %>">입고 이력</a>
            <a href="<%= request.getContextPath() %>/branch/receipt/processing.jsp" class="block px-4 py-2 rounded-lg text-sm <%= receiptProcessingActive ? "bg-[#00853D] text-white font-medium" : "text-gray-600 hover:bg-gray-100" %>">입고 처리</a>
        </div>

        <button onclick="toggleMenu(this)" class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg <%= orderGroup ? "bg-gray-100 text-gray-700" : "text-gray-700 hover:bg-gray-100" %> transition-colors">
            <div class="flex items-center gap-3">
                <i class="fas fa-file-invoice w-5 h-5"></i>
                <span class="text-sm">발주 관리</span>
            </div>
            <i class="fas <%= orderGroup ? "fa-chevron-down" : "fa-chevron-right" %> w-4 h-4"></i>
        </button>
        <div class="submenu <%= orderGroup ? "" : "hidden" %> ml-4 mt-1 space-y-1">
            <a href="<%= request.getContextPath() %>/branch/purchase_order/history.jsp" class="block px-4 py-2 rounded-lg text-sm <%= orderHistoryActive ? "bg-[#00853D] text-white font-medium" : "text-gray-600 hover:bg-gray-100" %>">발주 내역</a>
            <a href="<%= request.getContextPath() %>/branch/purchase_order/create.jsp" class="block px-4 py-2 rounded-lg text-sm <%= orderCreateActive ? "bg-[#00853D] text-white font-medium" : "text-gray-600 hover:bg-gray-100" %>">발주서 작성</a>
        </div>

        <button onclick="toggleMenu(this)" class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg <%= salesGroup ? "bg-gray-100 text-gray-700" : "text-gray-700 hover:bg-gray-100" %> transition-colors">
            <div class="flex items-center gap-3">
                <i class="fas fa-arrow-trend-up w-5 h-5"></i>
                <span class="text-sm">매출 관리</span>
            </div>
            <i class="fas <%= salesGroup ? "fa-chevron-down" : "fa-chevron-right" %> w-4 h-4"></i>
        </button>
        <div class="submenu <%= salesGroup ? "" : "hidden" %> ml-4 mt-1 space-y-1">
            <a href="<%= request.getContextPath() %>/branch/sales/branch_sales/main.jsp" class="block px-4 py-2 rounded-lg text-sm <%= salesDetailActive ? "bg-[#00853D] text-white font-medium" : "text-gray-600 hover:bg-gray-100" %>">매출 조회</a>
            <a href="<%= request.getContextPath() %>/branch/sales/sales_rank/menu_rank.jsp" class="block px-4 py-2 rounded-lg text-sm <%= salesRankActive ? "bg-[#00853D] text-white font-medium" : "text-gray-600 hover:bg-gray-100" %>">매출 순위</a>
        </div>

        <a href="<%= request.getContextPath() %>/branch/swap/main.jsp" class="flex items-center gap-3 px-3 py-2.5 rounded-lg <%= swapActive ? "bg-[#00853D] text-white font-medium" : "text-gray-700 hover:bg-gray-100" %> transition-colors">
            <i class="fas fa-right-left w-5 h-5"></i>
            <span class="text-sm">재고 교환/요청</span>
        </a>

        <a href="<%= request.getContextPath() %>/branch/recipe/main.jsp" class="flex items-center gap-3 px-3 py-2.5 rounded-lg <%= recipeActive ? "bg-[#00853D] text-white font-medium" : "text-gray-700 hover:bg-gray-100" %> transition-colors">
            <i class="fas fa-book w-5 h-5"></i>
            <span class="text-sm">레시피 관리</span>
        </a>

        <button onclick="toggleMenu(this)" class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg <%= hrGroup ? "bg-gray-100 text-gray-700" : "text-gray-700 hover:bg-gray-100" %> transition-colors">
            <div class="flex items-center gap-3">
                <i class="fas fa-users w-5 h-5"></i>
                <span class="text-sm">직원관리</span>
            </div>
            <i class="fas <%= hrGroup ? "fa-chevron-down" : "fa-chevron-right" %> w-4 h-4"></i>
        </button>
        <div class="submenu <%= hrGroup ? "" : "hidden" %> ml-4 mt-1 space-y-1">
            <a href="<%= request.getContextPath() %>/branch/hr/employee/main.jsp" class="block px-4 py-2 rounded-lg text-sm <%= hrEmployeeActive ? "bg-[#00853D] text-white font-medium" : "text-gray-600 hover:bg-gray-100" %>">직원 정보 조회</a>
            <a href="<%= request.getContextPath() %>/branch/hr/schedule/main.jsp" class="block px-4 py-2 rounded-lg text-sm <%= hrScheduleActive ? "bg-[#00853D] text-white font-medium" : "text-gray-600 hover:bg-gray-100" %>">일정관리</a>
        </div>

        <button onclick="toggleMenu(this)" class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg <%= supportGroup ? "bg-gray-100 text-gray-700" : "text-gray-700 hover:bg-gray-100" %> transition-colors">
            <div class="flex items-center gap-3">
                <i class="fas fa-store w-5 h-5"></i>
                <span class="text-sm">운영지원</span>
            </div>
            <i class="fas <%= supportGroup ? "fa-chevron-down" : "fa-chevron-right" %> w-4 h-4"></i>
        </button>
        <div class="submenu <%= supportGroup ? "" : "hidden" %> ml-4 mt-1 space-y-1">
            <a href="<%= request.getContextPath() %>/branch/support/notice/main.jsp" class="block px-4 py-2 rounded-lg text-sm <%= noticeActive ? "bg-[#00853D] text-white font-medium" : "text-gray-600 hover:bg-gray-100" %>">공지사항</a>
            <a href="<%= request.getContextPath() %>/branch/support/inquiry/main.jsp" class="block px-4 py-2 rounded-lg text-sm <%= inquiryActive ? "bg-[#00853D] text-white font-medium" : "text-gray-600 hover:bg-gray-100" %>">문의사항</a>
        </div>
    </nav>
</aside>

<script>
function toggleMenu(button) {
    const submenu = button.nextElementSibling;
    if (!submenu) {
        return;
    }

    submenu.classList.toggle("hidden");

    const icon = button.querySelector(".fa-chevron-right, .fa-chevron-down");
    if (icon) {
        if (submenu.classList.contains("hidden")) {
            icon.classList.remove("fa-chevron-down");
            icon.classList.add("fa-chevron-right");
        } else {
            icon.classList.remove("fa-chevron-right");
            icon.classList.add("fa-chevron-down");
        }
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const backdrop = document.getElementById("sidebarBackdrop");

    if (!sidebar || !backdrop) {
        return;
    }

    sidebar.classList.toggle("-translate-x-full");
    backdrop.classList.toggle("hidden");
}

document.addEventListener("DOMContentLoaded", function() {
    const backdrop = document.getElementById("sidebarBackdrop");
    if (!backdrop) {
        return;
    }

    backdrop.addEventListener("click", function() {
        const sidebar = document.getElementById("sidebar");
        if (!sidebar) {
            return;
        }

        sidebar.classList.add("-translate-x-full");
        backdrop.classList.add("hidden");
    });
});
</script>
