<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>매출 순위 - 메뉴별 랭킹</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --green:#00853d; --line:#d1d5db; --bg:#f3f4f6; --text:#111827; --muted:#6b7280; --orange:#f97316; }
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

        .grid{margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:16px;}
        .panel{background:#fff;border:1px solid var(--line);border-radius:16px;padding:14px;}
        .panel.orange{border-color:#f6c8a7;}
        .panel-head{display:flex;align-items:center;gap:8px;margin-bottom:10px;}
        .panel-title{font-size:24px;font-weight:800;letter-spacing:-0.2px;}
        .badge{margin-left:auto;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:700;}
        .badge.green{background:#dcfce7;color:#15803d;}
        .badge.orange{background:#ffedd5;color:#c2410c;}

        .rank-list{display:flex;flex-direction:column;gap:6px;}
        .rank-item{display:flex;align-items:center;gap:10px;padding:9px 10px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;}
        .panel.orange .rank-item{border-color:#f6c8a7;background:#fffdf9;}
        .rank-no{width:24px;font-size:18px;font-weight:800;color:#16a34a;text-align:center;}
        .panel.orange .rank-no{color:#ea580c;}
        .item-main{flex:1;min-width:0;}
        .item-name{font-size:20px;font-weight:800;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .item-meta{margin-top:1px;font-size:14px;color:var(--muted);}
        .item-sales{font-size:22px;font-weight:800;white-space:nowrap;color:#111827;}
        .panel.orange .item-sales{color:#ea580c;}

        @media (max-width:1280px){
            .head h1{font-size:32px;} .panel-title{font-size:22px;} .item-name{font-size:18px;} .item-meta{font-size:14px;} .item-sales{font-size:22px;}
            .rank-no{font-size:18px;} .head p{font-size:16px;}
        }
        @media (max-width:960px){ .grid{grid-template-columns:1fr;} .wrap{padding:16px;} }
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
        <button class="sort-btn active" data-sort="sales" type="button">총매출액 순</button>
        <button class="sort-btn" data-sort="orders" type="button">총 주문 건수 순</button>
        <button class="sort-btn" data-sort="avgPrice" type="button">객단가 순</button>
    </section>

    <nav class="view-tabs" aria-label="랭킹 화면 전환">
        <a class="view-tab active" href="/branch/sales/sales_rank/menu_rank.jsp">메뉴별 랭킹</a>
        <a class="view-tab" href="/branch/sales/sales_rank/period_rank.jsp">일자/시간대별 랭킹</a>
    </nav>

    <section class="grid">
        <article class="panel">
            <div class="panel-head">
                <div class="panel-title">베스트셀러 (효자 메뉴) TOP 10</div>
                <span class="badge green">프로모션 추천</span>
            </div>
            <div class="rank-list" id="bestList"></div>
        </article>

        <article class="panel orange">
            <div class="panel-head">
                <div class="panel-title" style="color:#9a3412;">워스트셀러 (단종 고려) BOTTOM 10</div>
                <span class="badge orange">주문 검토</span>
            </div>
            <div class="rank-list" id="worstList"></div>
        </article>
    </section>
</div>
</main>
</div>
</div>
<script>
(function () {
    var bestMenus = [
        { rank: 1, name: '이탈리안 비엠티', category: '샌드위치', sales: 3450000, orders: 245, avgPrice: 14082 },
        { rank: 2, name: '로티세리 치킨', category: '샌드위치', sales: 2870000, orders: 215, avgPrice: 13349 },
        { rank: 3, name: '터키 베이컨 아보카도', category: '샌드위치', sales: 2340000, orders: 172, avgPrice: 13605 },
        { rank: 4, name: '써브웨이 클럽', category: '샌드위치', sales: 2030000, orders: 150, avgPrice: 13533 },
        { rank: 5, name: '스파이시 이탈리안', category: '샌드위치', sales: 1780000, orders: 131, avgPrice: 13588 },
        { rank: 6, name: '치킨 샐러드', category: '샐러드', sales: 1450000, orders: 116, avgPrice: 12500 },
        { rank: 7, name: '터키 샐러드', category: '샐러드', sales: 1230000, orders: 101, avgPrice: 12178 },
        { rank: 8, name: '참치 샐러드', category: '샐러드', sales: 1010000, orders: 85, avgPrice: 11882 },
        { rank: 9, name: '쿠키 세트', category: '사이드', sales: 980000, orders: 195, avgPrice: 5026 },
        { rank: 10, name: '음료 세트', category: '사이드', sales: 850000, orders: 213, avgPrice: 3991 }
    ];

    var worstMenus = [
        { rank: 41, name: '베지 디럭스', category: '샌드위치', sales: 85000, orders: 7, avgPrice: 12143 },
        { rank: 42, name: '에그마요 샌드위치', category: '샌드위치', sales: 78000, orders: 6, avgPrice: 13000 },
        { rank: 43, name: '할라피뇨 샌드위치', category: '샌드위치', sales: 68000, orders: 5, avgPrice: 13600 },
        { rank: 44, name: '스테이크 샐러드', category: '샐러드', sales: 52000, orders: 4, avgPrice: 13000 },
        { rank: 45, name: '새우 샐러드', category: '샐러드', sales: 38000, orders: 3, avgPrice: 12667 },
        { rank: 46, name: '올리브 샌드위치', category: '샌드위치', sales: 26000, orders: 2, avgPrice: 13000 },
        { rank: 47, name: '비프 샐러드', category: '샐러드', sales: 13000, orders: 1, avgPrice: 13000 },
        { rank: 48, name: '피클 칩스', category: '사이드', sales: 9500, orders: 2, avgPrice: 4750 },
        { rank: 49, name: '크림 수프', category: '사이드', sales: 5000, orders: 1, avgPrice: 5000 },
        { rank: 50, name: '치아바타 샌드위치', category: '샌드위치', sales: 0, orders: 0, avgPrice: 0 }
    ];

    var bestList = document.getElementById('bestList');
    var worstList = document.getElementById('worstList');
    var sortButtons = Array.prototype.slice.call(document.querySelectorAll('.sort-btn'));

    function won(n) { return '₩' + n.toLocaleString('ko-KR'); }

    function renderList(container, list, isWorst) {
        container.innerHTML = list.map(function (item) {
            return '<div class="rank-item">' +
                '<div class="rank-no">' + item.rank + '</div>' +
                '<div class="item-main">' +
                    '<div class="item-name">' + item.name + '</div>' +
                    '<div class="item-meta">' + item.category + ' · ' + item.orders + '건' + (isWorst ? '만' : '') + ' 판매</div>' +
                '</div>' +
                '<div class="item-sales">' + won(item.sales) + '</div>' +
            '</div>';
        }).join('');
    }

    function sortBy(type) {
        sortButtons.forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-sort') === type); });
        var sortedBest = bestMenus.slice().sort(function (a, b) { return b[type] - a[type]; });
        var sortedWorst = worstMenus.slice().sort(function (a, b) { return a[type] - b[type]; });
        renderList(bestList, sortedBest, false);
        renderList(worstList, sortedWorst, true);
    }

    sortButtons.forEach(function (btn) {
        btn.addEventListener('click', function () { sortBy(btn.getAttribute('data-sort')); });
    });

    sortBy('sales');
})();
</script>
</body>
</html>
