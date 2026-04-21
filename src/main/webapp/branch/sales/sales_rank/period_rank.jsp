<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>매출 순위 - 일자/시간대 랭킹</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --green:#00853d; --line:#d1d5db; --bg:#f3f4f6; --text:#111827; --muted:#6b7280; }
        *{box-sizing:border-box;}
        body{margin:0;background:var(--bg);font-family:"Noto Sans KR","Malgun Gothic",sans-serif;color:var(--text);}
        .wrap{
    width: 100%;max-width: none;margin: 0;padding:28px 24px 36px;}
        .head h1{margin:0;font-size:32px;letter-spacing:-0.4px;}
        .head p{margin:8px 0 0;font-size:15px;color:var(--muted);}

        .filter-card{margin-top:18px;background:#fff;border:1px solid var(--line);border-radius:16px;padding:14px 16px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;}
        .label{font-size:14px;color:#374151;font-weight:700;display:inline-flex;align-items:center;gap:6px;}
        .select{height:38px;border:1px solid #cfd6dd;border-radius:10px;padding:0 12px;background:#fff;color:#374151;font-size:13px;}
        .vline{width:1px;height:30px;background:#d1d5db;}
        .sort-btn{height:38px;border:1px solid #d1d5db;border-radius:10px;padding:0 14px;background:#f9fafb;color:#374151;font-size:13px;font-weight:700;cursor:pointer;}
        .sort-btn.active{border-color:var(--green);color:var(--green);background:#ecf8f1;}

        .view-tabs{margin-top:14px;display:flex;gap:10px;}
        .view-tab{height:40px;padding:0 18px;border-radius:12px;text-decoration:none;display:inline-flex;align-items:center;font-weight:700;font-size:14px;background:#e5e7eb;color:#374151;}
        .view-tab.active{background:var(--green);color:#fff;}

        .grid{margin-top:14px;display:grid;grid-template-columns:1.08fr .92fr;gap:16px;}
        .panel{background:#fff;border:1px solid var(--line);border-radius:16px;padding:14px;}
        .panel-title-row{display:flex;align-items:center;gap:8px;margin-bottom:10px;}
        .panel-title{font-size:24px;font-weight:800;letter-spacing:-0.2px;}
        .badge{margin-left:auto;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:700;background:#dbeafe;color:#1d4ed8;}

        table{width:100%;border-collapse:collapse;}
        .table-sm th,.table-sm td{padding:9px 8px;border-bottom:1px solid #e5e7eb;font-size:16px;}
        .table-sm th{text-align:left;background:#f3f4f6;color:#374151;font-size:14px;}
        .table-sm td{text-align:left;}
        .table-sm td.r{text-align:right;}
        .rank-bubble{display:inline-flex;width:22px;height:22px;border-radius:999px;align-items:center;justify-content:center;background:#dcfce7;color:#15803d;font-size:12px;font-weight:800;}

        .chart-box{border:1px solid #e5e7eb;border-radius:12px;padding:8px 10px 10px;margin-top:2px;}
        .bar-chart{height:180px;display:grid;grid-template-columns:56px 1fr;gap:8px;}
        .y-axis{position:relative;display:flex;flex-direction:column;justify-content:space-between;padding-top:6px;padding-bottom:16px;font-size:12px;color:#6b7280;text-align:right;}
        .plot{position:relative;border-left:1px solid #9ca3af;border-bottom:1px solid #9ca3af;display:flex;align-items:flex-end;gap:8px;padding:0 6px;}
        .plot::before,.plot::after{content:"";position:absolute;left:0;right:0;border-top:1px dashed #d1d5db;}
        .plot::before{top:33%;}.plot::after{top:66%;}
        .bar{flex:1;background:#00853d;position:relative;min-width:36px;}
        .bar span{position:absolute;bottom:-22px;left:50%;transform:translateX(-50%);font-size:12px;color:#6b7280;white-space:nowrap;}

        .table-rank th,.table-rank td{padding:8px;border-bottom:1px solid #e5e7eb;font-size:16px;}
        .table-rank th{text-align:left;background:#f3f4f6;color:#374151;font-size:14px;}
        .table-rank td.r{text-align:right;}
        .medal{display:inline-flex;width:22px;height:22px;border-radius:999px;align-items:center;justify-content:center;background:#fef3c7;color:#111827;font-size:12px;font-weight:800;}
        .note{display:inline-block;padding:3px 9px;border-radius:999px;background:#dbeafe;color:#1d4ed8;font-size:12px;white-space:nowrap;}

        @media (max-width:1280px){
            .head h1{font-size:32px;} .panel-title{font-size:24px;} .table-sm th,.table-sm td{font-size:14px;} .table-sm th{font-size:13px;}
            .table-rank th,.table-rank td{font-size:14px;} .table-rank th{font-size:13px;} .medal{font-size:14px;width:24px;height:24px;} .head p{font-size:16px;}
            .rank-bubble{font-size:12px;width:22px;height:22px;}
        }
        @media (max-width:1024px){ .grid{grid-template-columns:1fr;} .wrap{padding:16px;} }
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
        <h1>매출 순위</h1>
        <p>강남지점 - 메뉴별, 시간대별 매출 랭킹을 확인하세요</p>
    </header>

    <section class="filter-card">
        <span class="label">📅 기간:</span>
        <select class="select" id="periodSelect">
            <option>이번 달</option>
            <option>지난 달</option>
            <option>1분기</option>
            <option>2분기</option>
            <option>올해</option>
        </select>
        <span class="vline"></span>
        <span class="label">↗ 정렬:</span>
        <button class="sort-btn" data-sort="sales" type="button">총매출액 순</button>
        <button class="sort-btn" data-sort="orders" type="button">총 주문 건수 순</button>
        <button class="sort-btn active" data-sort="avgPrice" type="button">객단가 순</button>
    </section>

    <nav class="view-tabs" aria-label="랭킹 화면 전환">
        <a class="view-tab" href="/branch/sales/sales_rank/menu_rank.jsp">메뉴별 랭킹</a>
        <a class="view-tab active" href="/branch/sales/sales_rank/period_rank.jsp">일자/시간대별 랭킹</a>
    </nav>

    <section class="grid">
        <article class="panel">
            <div class="panel-title-row">
                <div class="panel-title">최고 매출 요일/시간대 순위</div>
                <span class="badge">알바생 스케줄 참고</span>
            </div>
            <table class="table-sm">
                <thead>
                <tr><th style="width:70px;">순위</th><th>요일</th><th>시간대</th><th style="text-align:right;">매출액</th><th style="text-align:right;">주문수</th></tr>
                </thead>
                <tbody id="slotBody"></tbody>
            </table>
        </article>

        <article class="panel">
            <div class="panel-title-row" style="margin-bottom:8px;">
                <div class="panel-title">최고 매출일 Top 5</div>
            </div>

            <div class="chart-box">
                <div class="bar-chart">
                    <div class="y-axis" id="yTicks"></div>
                    <div class="plot" id="dateBars"></div>
                </div>
            </div>

            <table class="table-rank" style="margin-top:12px;">
                <thead>
                <tr><th style="width:52px;">순위</th><th>날짜</th><th>요일</th><th style="text-align:right;">매출액</th><th style="text-align:right;">주문수</th><th>비고</th></tr>
                </thead>
                <tbody id="dateBody"></tbody>
            </table>
        </article>
    </section>
</div>
</main>
</div>
</div>
<script>
(function () {
    var topDayTimeSlots = [
        { rank: 1, day: '금요일', timeSlot: '12:00-13:00', sales: 880000, orders: 65, avgPrice: 13538 },
        { rank: 2, day: '토요일', timeSlot: '18:00-19:00', sales: 820000, orders: 61, avgPrice: 13443 },
        { rank: 3, day: '금요일', timeSlot: '18:00-19:00', sales: 790000, orders: 59, avgPrice: 13390 },
        { rank: 4, day: '목요일', timeSlot: '12:00-13:00', sales: 765000, orders: 56, avgPrice: 13661 },
        { rank: 5, day: '토요일', timeSlot: '12:00-13:00', sales: 740000, orders: 54, avgPrice: 13704 }
    ];

    var topDates = [
        { rank: 1, date: '2026-03-15', day: '토요일', sales: 1850000, orders: 145, avgPrice: 12759, note: '화이트데이 프로모션' },
        { rank: 2, date: '2026-03-22', day: '토요일', sales: 1780000, orders: 138, avgPrice: 12899, note: '주말 특가' },
        { rank: 3, date: '2026-03-08', day: '토요일', sales: 1720000, orders: 132, avgPrice: 13030, note: '3월 프로모션' },
        { rank: 4, date: '2026-03-29', day: '토요일', sales: 1690000, orders: 128, avgPrice: 13203, note: '월말 세일' },
        { rank: 5, date: '2026-03-01', day: '토요일', sales: 1650000, orders: 125, avgPrice: 13200, note: '월초 특가' }
    ];

    var slotBody = document.getElementById('slotBody');
    var dateBody = document.getElementById('dateBody');
    var yTicks = document.getElementById('yTicks');
    var dateBars = document.getElementById('dateBars');
    var sortButtons = Array.prototype.slice.call(document.querySelectorAll('.sort-btn'));

    function won(n) { return '₩' + n.toLocaleString('ko-KR'); }

    function renderSlots(list) {
        slotBody.innerHTML = list.map(function (r) {
            return '<tr>' +
                '<td><span class="rank-bubble">' + r.rank + '</span></td>' +
                '<td style="font-weight:700;">' + r.day + '</td>' +
                '<td>' + r.timeSlot + '</td>' +
                '<td class="r" style="font-weight:800;">' + won(r.sales) + '</td>' +
                '<td class="r">' + r.orders + '건</td>' +
            '</tr>';
        }).join('');
    }

    function renderDates(list) {
        dateBody.innerHTML = list.map(function (d) {
            return '<tr>' +
                '<td><span class="medal">' + d.rank + '</span></td>' +
                '<td>' + d.date + '</td>' +
                '<td style="font-weight:700;">' + d.day + '</td>' +
                '<td class="r" style="font-weight:800;">' + won(d.sales) + '</td>' +
                '<td class="r">' + d.orders + '건</td>' +
                '<td><span class="note">' + d.note + '</span></td>' +
            '</tr>';
        }).join('');
    }

    function renderBars(list) {
        var max = Math.max.apply(null, list.map(function (d) { return d.sales; }));
        yTicks.innerHTML = ['2.0M','1.5M','1.0M','0.5M','0.0M'].map(function (t) { return '<span>' + t + '</span>'; }).join('');
        dateBars.innerHTML = list.map(function (d) {
            var h = Math.max(20, Math.round((d.sales / max) * 130));
            return '<div class="bar" style="height:' + h + 'px;"><span>' + d.date + '</span></div>';
        }).join('');
    }

    function applySort(type) {
        sortButtons.forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-sort') === type); });
        var slotSorted = topDayTimeSlots.slice().sort(function (a, b) { return b[type] - a[type]; });
        var dateSorted = topDates.slice().sort(function (a, b) { return b[type] - a[type]; });
        slotSorted.forEach(function (row, i) { row.rank = i + 1; });
        dateSorted.forEach(function (row, i) { row.rank = i + 1; });
        renderSlots(slotSorted);
        renderDates(dateSorted);
        renderBars(dateSorted);
    }

    sortButtons.forEach(function (btn) {
        btn.addEventListener('click', function () { applySort(btn.getAttribute('data-sort')); });
    });

    applySort('avgPrice');
})();
</script>
</body>
</html>
