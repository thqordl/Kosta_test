<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>매출 조회 - 메뉴별</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --green:#00853d; --line:#d1d5db; --bg:#f3f4f6; --text:#111827; }
        *{box-sizing:border-box;} body{margin:0;background:var(--bg);font-family:"Noto Sans KR","Malgun Gothic",sans-serif;color:var(--text);}
        .wrap{
    width: 100%;max-width: none;margin: 0;padding:28px 24px 36px;}
        .head h1{margin:0;font-size:34px;letter-spacing:-0.5px;} .head p{margin:8px 0 0;font-size:22px;color:#6b7280;letter-spacing:-0.2px;}
        .card{margin-top:20px;background:#fff;border:1px solid var(--line);border-radius:18px;box-shadow:0 1px 2px rgba(15,23,42,.05);}
        .toolbar{padding:16px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
        .tab{height:38px;border:1px solid #d1d5db;border-radius:10px;background:#f9fafb;color:#374151;padding:0 14px;font-size:14px;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;}
        .tab.active{color:var(--green);border-color:var(--green);background:#ecf8f1;}
        .divider{width:1px;height:34px;background:#d1d5db;margin:0 2px;}
        .input{height:38px;border:1px solid #cfd6dd;border-radius:10px;padding:0 12px;font-size:13px;color:#374151;background:#fff;min-width:170px;}
        .spacer{flex:1;}
        .btn{height:38px;border-radius:10px;padding:0 16px;border:1px solid transparent;cursor:pointer;font-size:14px;font-weight:700;}
        .btn.search{background:var(--green);color:#fff;} .btn.reset{background:#f3f4f6;color:#374151;border-color:#e5e7eb;}
        .section{margin-top:18px;padding:16px 18px 20px;}
        .chart-wrap{border:1px solid #d9dee5;border-radius:16px;padding:20px;}
        .chart-title{font-size:28px;font-weight:700;margin-bottom:14px;}
        .chart-area{position:relative;height:360px;border-left:1px solid #9ca3af;border-bottom:1px solid #9ca3af;margin-left:170px;margin-right:8px;}
        .grid-line{position:absolute;top:0;bottom:0;border-left:1px dashed #d1d5db;}
        .x-label{position:absolute;bottom:-30px;transform:translateX(-50%);font-size:12px;color:#6b7280;white-space:nowrap;}
        .rows{position:absolute;left:0;right:0;top:10px;bottom:10px;display:grid;grid-template-rows:repeat(5,1fr);gap:10px;align-content:center;}
        .row{display:flex;align-items:center;gap:10px;}
        .y-name{position:absolute;left:-150px;width:140px;text-align:right;font-size:13px;color:#6b7280;}
        .hbar{height:42px;background:#00853d;}
        .legend{text-align:center;margin-top:26px;color:#00853d;font-size:18px;font-weight:700;}
        .legend::before{content:"";display:inline-block;width:16px;height:16px;background:#00853d;margin-right:8px;vertical-align:middle;}
        .result-card{margin-top:18px;border:1px solid #d9dee5;border-radius:16px;overflow:hidden;}
        .result-head{padding:18px 20px;font-size:28px;font-weight:700;border-bottom:1px solid #e5e7eb;}
        table{width:100%;border-collapse:collapse;} th,td{padding:14px 18px;border-bottom:1px solid #e5e7eb;font-size:16px;text-align:right;} th{background:#f9fafb;color:#6b7280;font-weight:700;} th:first-child,td:first-child{text-align:left;} th:nth-child(2),td:nth-child(2),th:nth-child(3),td:nth-child(3){text-align:left;}
        .pager{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;font-size:14px;color:#6b7280;}
        .pages{display:flex;gap:8px;align-items:center;} .p{width:34px;height:34px;border:1px solid #d1d5db;border-radius:12px;background:#fff;color:#374151;display:grid;place-items:center;font-size:14px;font-weight:700;} .p.active{background:#00853d;color:#fff;border-color:#00853d;}
        @media (max-width:1280px){.head h1{font-size:34px}.head p{font-size:24px}.tab{font-size:14px}.input{font-size:14px}.chart-title,.result-head{font-size:28px}th,td{font-size:16px}.legend{font-size:18px}.y-name{font-size:12px;left:-120px;width:112px}.x-label{font-size:12px}.pager{font-size:14px}.p{width:34px;height:34px;font-size:14px}}
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
    <header class="head"><h1>매출 조회</h1><p>강남지점의 매출 데이터를 다양한 방식으로 조회하세요</p></header>

    <section class="card">
        <div class="toolbar">
            <a class="tab" href="/branch/sales/branch_sales/sales_daily.jsp">날짜별</a>
            <a class="tab" href="/branch/sales/branch_sales/sales_period.jsp">기간별</a>
            <a class="tab" href="/branch/sales/branch_sales/sales_hourly.jsp">시간대별</a>
            <a class="tab active" href="/branch/sales/branch_sales/sales_menu.jsp">메뉴별</a>
            <div class="divider"></div>
            <select id="category" class="input"></select>
            <select id="menu" class="input"></select>
            <div class="spacer"></div>
            <button class="btn search" id="searchBtn" type="button">검색</button>
            <button class="btn reset" id="resetBtn" type="button">초기화</button>
        </div>
    </section>

    <section class="section">
        <div class="chart-wrap">
            <div class="chart-title" id="chartTitle">샌드위치 카테고리 메뉴별 비교</div>
            <div class="chart-area" id="chartArea"></div>
            <div class="legend">매출</div>
        </div>

        <div class="result-card">
            <div class="result-head">검색 결과 (23건)</div>
            <table>
                <thead><tr><th>번호</th><th>날짜</th><th>메뉴명</th><th>매출액</th><th>주문수</th><th>평균 객단가</th></tr></thead>
                <tbody id="resultBody"></tbody>
            </table>
            <div class="pager"><span id="pageInfo">페이지 1 / 3</span><div class="pages" id="pages"></div></div>
        </div>
    </section>
</div>
</main>
</div>
</div>
<script>
(function () {
    var itemsPerPage = 10;
    var currentPage = 1;
    var categorySel = document.getElementById('category');
    var menuSel = document.getElementById('menu');
    var chartArea = document.getElementById('chartArea');
    var chartTitle = document.getElementById('chartTitle');
    var resultBody = document.getElementById('resultBody');
    var pages = document.getElementById('pages');
    var pageInfo = document.getElementById('pageInfo');

    var menuCategories = {
        '샌드위치': ['이탈리안 비엠티', '터키 베이컨 아보카도', '로티세리 치킨', '써브웨이 클럽', '스파이시 이탈리안'],
        '샐러드': ['터키 샐러드', '참치 샐러드', '치킨 샐러드', '베지 샐러드', '비엠티 샐러드'],
        '사이드': ['감자튀김', '치즈스틱', '쿠키', '음료', '칩']
    };

    function won(v){ return '₩' + v.toLocaleString('ko-KR'); }
    function seed(s){ return s.split('').reduce(function(a,c){ return (a*37 + c.charCodeAt(0)) % 9973; },23); }

    function initOptions(){
        categorySel.innerHTML = Object.keys(menuCategories).map(function(c){ return '<option value="'+c+'">'+c+'</option>'; }).join('');
        syncMenus();
    }
    function syncMenus(){
        var menus = menuCategories[categorySel.value];
        menuSel.innerHTML = menus.map(function(m){ return '<option value="'+m+'">'+m+'</option>'; }).join('');
    }

    function menuData(category, selectedMenu){
        var s = seed(category + selectedMenu);
        return menuCategories[category].map(function(name, i){
            var base = 700000 + ((s + i*71) % 700000);
            if (name === selectedMenu) base = Math.round(base * 1.1);
            return { name:name, sales:base };
        }).sort(function(a,b){ return b.sales - a.sales; });
    }

    function buildResults(category){
        var cycle = menuCategories[category];
        var s = seed(category + menuSel.value);
        return Array.from({length:23}, function(_, i){
            var day = String(i + 1).padStart(2,'0');
            var sales = 2000000 + ((s + i * 43) % 500000);
            var orders = 100 + ((s + i * 13) % 50);
            var menu = cycle[i % cycle.length];
            return { no:i+1, date:'2026-04-' + day, menu:menu, sales:sales, orders:orders, avg:Math.floor(sales/orders) };
        });
    }

    function renderChart(data){
        chartArea.innerHTML = '';
        var xTicks = [0, 350000, 700000, 1050000, 1400000];
        xTicks.forEach(function(t){
            var x = (t / 1400000) * 100;
            var line = document.createElement('div'); line.className='grid-line'; line.style.left = x + '%'; chartArea.appendChild(line);
            var xl = document.createElement('div'); xl.className='x-label'; xl.style.left = x + '%'; xl.textContent = Math.round(t/1000) + 'K'; chartArea.appendChild(xl);
        });

        var rows = document.createElement('div'); rows.className = 'rows';
        data.forEach(function(d){
            var row = document.createElement('div'); row.className = 'row';
            var name = document.createElement('div'); name.className='y-name'; name.textContent = d.name;
            var bar = document.createElement('div'); bar.className='hbar'; bar.style.width = Math.round((d.sales / 1400000) * 100) + '%';
            row.appendChild(name); row.appendChild(bar); rows.appendChild(row);
        });
        chartArea.appendChild(rows);
    }

    function renderTable(all){
        var totalPages = Math.ceil(all.length / itemsPerPage);
        var start = (currentPage - 1) * itemsPerPage;
        var rows = all.slice(start, start + itemsPerPage);
        resultBody.innerHTML = rows.map(function(r){
            return '<tr><td>' + r.no + '</td><td>' + r.date + '</td><td>' + r.menu + '</td><td>' + won(r.sales) + '</td><td>' + r.orders + '건</td><td>' + won(r.avg) + '</td></tr>';
        }).join('');
        pageInfo.textContent = '페이지 ' + currentPage + ' / ' + totalPages;
        pages.innerHTML = '';
        ['<', '1', '2', '3', '>'].forEach(function(t){
            var b = document.createElement('button'); b.type='button'; b.className='p' + (String(currentPage)===t ? ' active' : ''); b.textContent=t;
            b.addEventListener('click', function(){ if(t==='<') currentPage=Math.max(1,currentPage-1); else if(t==='>') currentPage=Math.min(totalPages,currentPage+1); else currentPage=Number(t); renderTable(all); });
            pages.appendChild(b);
        });
    }

    function render(){
        var category = categorySel.value;
        var menu = menuSel.value;
        chartTitle.textContent = category + ' 카테고리 메뉴별 비교';
        renderChart(menuData(category, menu));
        renderTable(buildResults(category));
    }

    categorySel.addEventListener('change', function(){ syncMenus(); currentPage=1; render(); });
    document.getElementById('searchBtn').addEventListener('click', function(){ currentPage=1; render(); });
    document.getElementById('resetBtn').addEventListener('click', function(){ categorySel.value='샌드위치'; syncMenus(); currentPage=1; render(); });

    initOptions();
    render();
})();
</script>
</body>
</html>
