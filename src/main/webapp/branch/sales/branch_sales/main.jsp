<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>매출 조회 - 메인</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --green:#00853d; --line:#d8dbe0; --bg:#f3f4f6; --txt:#111827; }
        * { box-sizing:border-box; }
        body { margin:0; font-family:"Noto Sans KR","Malgun Gothic",sans-serif; background:var(--bg); color:var(--txt); }
        .wrap {
    width: 100%; max-width: none; margin: 0; padding:28px 24px 36px; }
        .head h1 { margin:0; font-size:26px; letter-spacing:-0.3px; }
        .head p { margin:8px 0 0; color:#6b7280; font-size:16px; letter-spacing:-0.1px; }
        .search-panel { margin-top:24px; border:1px solid var(--line); border-radius:18px; background:#fff; box-shadow:0 1px 2px rgba(15,23,42,0.05); padding:18px; }
        .filters { display:flex; flex-wrap:wrap; align-items:center; gap:12px; }
        .modes { display:flex; align-items:center; gap:10px; }
        .modes::after { content:""; width:1px; height:42px; background:#d1d5db; margin-left:4px; }
        .mode { height:38px; border-radius:12px; border:1px solid #d1d5db; background:#f9fafb; color:#374151; font-size:14px; font-weight:700; padding:0 16px; cursor:pointer; }
        .mode.active { border-color:var(--green); color:var(--green); background:#ecf8f1; }
        .filter-inputs { display:flex; align-items:center; gap:10px; }
        .filter-inputs input, .filter-inputs select { height:38px; min-width:220px; border-radius:12px; border:1px solid #d1d5db; background:#fff; color:#1f2937; padding:0 13px; font-size:13px; }
        .search { margin-left:auto; height:38px; border-radius:12px; border:1px solid var(--green); background:var(--green); color:#fff; padding:0 18px; font-size:14px; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:8px; }
        .search .icon { font-size:14px; }
        .summary-title { margin:24px 0 12px; font-size:23px; letter-spacing:-0.2px; }
        .stats { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
        .stat { border:1px solid var(--line); border-radius:16px; background:#fff; padding:20px 22px; box-shadow:0 1px 2px rgba(15,23,42,0.04); }
        .stat .meta { display:flex; align-items:flex-start; justify-content:space-between; gap:10px; }
        .stat em { font-style:normal; color:#6b7280; font-size:14px; }
        .stat strong { display:block; margin-top:8px; font-size:26px; letter-spacing:-0.2px; }
        .icon-chip { width:40px; height:40px; border-radius:10px; display:grid; place-items:center; font-size:18px; font-weight:700; }
        .chip-money { background:#e7f4ec; color:#11894a; }
        .chip-order { background:#f8f0da; color:#c08b00; }
        .chip-trend { background:#e8edf6; color:#2563eb; }
        .chip-menu { background:#eaf3ec; color:#b07a00; }
        .is-hidden { display:none !important; }
        @media (max-width:1280px){ .head h1{font-size:28px;} .head p{font-size:17px;} .summary-title{font-size:24px;} .stat em{font-size:13px;} .stat strong{font-size:26px;} .mode{font-size:14px;} .search{font-size:14px;} }
        @media (max-width:1024px){ .stats{grid-template-columns:repeat(2,1fr);} .search{margin-left:0;} }
        @media (max-width:760px){ .wrap{padding:16px;} .head h1{font-size:26px;} .head p{font-size:15px;} .summary-title{font-size:22px;} .stats{grid-template-columns:1fr;} .modes{flex-wrap:wrap;} .modes::after{display:none;} .mode{font-size:13px;padding:0 12px;height:36px;} .filter-inputs input,.filter-inputs select{min-width:180px;height:36px;font-size:13px;} .search{height:36px;font-size:13px;} .stat em{font-size:13px;} .stat strong{font-size:24px;} }
    </style>

<%@ include file="/branch/common/layout/layout_head.jsp" %>
</head>
<body>
<div class="zl-app">
<%@ include file="/branch/common/layout/sidebar.jsp" %>
<div class="zl-content">
<%@ include file="/branch/common/layout/topbar.jsp" %>
<main class="zl-page">
<div class="wrap">
    <header class="head">
        <h1>매출 조회</h1>
        <p>강남지점의 매출 데이터를 다양한 방식으로 조회하세요</p>
    </header>

    <section class="search-panel">
        <div class="filters">
            <div class="modes" role="tablist" aria-label="조회 유형">
                <button class="mode active" type="button" data-mode="date" data-target="<%= request.getContextPath() %>/branch/sales/branch_sales/sales_daily.jsp">날짜별</button>
                <button class="mode" type="button" data-mode="period" data-target="<%= request.getContextPath() %>/branch/sales/branch_sales/sales_period.jsp">기간별</button>
                <button class="mode" type="button" data-mode="time" data-target="<%= request.getContextPath() %>/branch/sales/branch_sales/sales_hourly.jsp">시간대별</button>
                <button class="mode" type="button" data-mode="menu" data-target="<%= request.getContextPath() %>/branch/sales/branch_sales/sales_menu.jsp">메뉴별</button>
            </div>
            <div class="filter-inputs" id="date-inputs">
                <input type="date" value="2026-04-19" aria-label="조회일">
            </div>
            <div class="filter-inputs is-hidden" id="period-inputs">
                <input type="date" value="2026-04-01" aria-label="시작일">
                <input type="date" value="2026-04-19" aria-label="종료일">
            </div>
            <div class="filter-inputs is-hidden" id="time-inputs">
                <select aria-label="시간대 선택">
                    <option>06:00-07:00</option><option>07:00-08:00</option><option>08:00-09:00</option><option>09:00-10:00</option>
                    <option>10:00-11:00</option><option>11:00-12:00</option><option selected>12:00-13:00</option><option>13:00-14:00</option>
                    <option>14:00-15:00</option><option>15:00-16:00</option><option>16:00-17:00</option><option>17:00-18:00</option>
                    <option>18:00-19:00</option><option>19:00-20:00</option><option>20:00-21:00</option><option>21:00-22:00</option>
                </select>
            </div>
            <div class="filter-inputs is-hidden" id="menu-inputs">
                <select aria-label="카테고리 선택">
                    <option selected>샌드위치</option><option>샐러드</option><option>사이드</option>
                </select>
                <select aria-label="메뉴 선택">
                    <option selected>이탈리안 비엠티</option><option>터키 베이컨 아보카도</option><option>로티세리 치킨</option>
                </select>
            </div>

            <button class="search" id="searchButton" type="button"><span class="icon">🔍</span>검색</button>
        </div>
    </section>

    <h2 class="summary-title">오늘의 매출 요약</h2>
    <section class="stats" aria-label="매출 요약 카드">
        <article class="stat">
            <div class="meta"><em>총 매출</em><span class="icon-chip chip-money">$</span></div>
            <strong>₩3,420,000</strong>
        </article>
        <article class="stat">
            <div class="meta"><em>총 주문수</em><span class="icon-chip chip-order">🛒</span></div>
            <strong>198건</strong>
        </article>
        <article class="stat">
            <div class="meta"><em>평균 객단가</em><span class="icon-chip chip-trend">↗</span></div>
            <strong>₩17,272</strong>
        </article>
        <article class="stat">
            <div class="meta"><em>인기 메뉴</em><span class="icon-chip chip-menu">🏆</span></div>
            <strong>이탈리안 비엠티</strong>
        </article>
    </section>
</div>
</main>
</div>
</div>
<script>
(function () {
    var modes = Array.prototype.slice.call(document.querySelectorAll('.mode'));
    var searchButton = document.getElementById('searchButton');
    var inputBlocks = {
        date: document.getElementById('date-inputs'),
        period: document.getElementById('period-inputs'),
        time: document.getElementById('time-inputs'),
        menu: document.getElementById('menu-inputs')
    };
    var selectedTarget = '<%= request.getContextPath() %>/branch/sales/branch_sales/sales_daily.jsp';

    function applyMode(mode, target) {
        modes.forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
        });

        Object.keys(inputBlocks).forEach(function (key) {
            var el = inputBlocks[key];
            if (!el) return;
            el.classList.toggle('is-hidden', key !== mode);
        });

        selectedTarget = target;
    }

    modes.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var mode = btn.getAttribute('data-mode');
            var target = btn.getAttribute('data-target');
            if (!mode || !target) return;
            applyMode(mode, target);
        });
    });

    searchButton.addEventListener('click', function () {
        window.location.href = selectedTarget;
    });
})();
</script>
</body>
</html>
