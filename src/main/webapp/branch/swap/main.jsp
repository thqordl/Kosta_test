<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>재고 교환/요청</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;800&display=swap" rel="stylesheet">
  <style>
    :root{--line:#d1d5db;--bg:#f3f4f6;--text:#111827;--muted:#6b7280;--blue:#2563eb;--green:#16a34a;--purple:#9333ea;--orange:#f97316;}
    *{box-sizing:border-box;}body{margin:0;font-family:"Noto Sans KR","Malgun Gothic",sans-serif;background:var(--bg);color:var(--text);} .wrap{
    width: 100%;max-width: none;margin: 0;padding:24px;}
    .title{font-size:40px;font-weight:800;letter-spacing:-0.8px;margin:0;} .sub{font-size:20px;color:var(--muted);margin:8px 0 0;}
    .stats{margin-top:18px;display:grid;grid-template-columns:repeat(4,1fr);gap:12px;} .stat{background:#fff;border:1px solid var(--line);border-radius:14px;padding:14px 16px;display:flex;align-items:center;gap:10px;} .stat .n{font-size:30px;font-weight:800;line-height:1;} .stat .l{font-size:14px;color:#6b7280;margin-top:4px;}
    .stat-ico{display:inline-grid;place-items:center;width:32px;height:32px;border-radius:10px;flex:0 0 auto;} .stat-ico svg{width:18px;height:18px;display:block;}
    .s1{background:#dbeafe;color:#2563eb;} .s2{background:#dcfce7;color:#16a34a;} .s3{background:#f3e8ff;color:#9333ea;} .s4{background:#ffedd5;color:#f97316;}
    .stat-text{display:flex;flex-direction:column;min-width:0;}
    .tabs{margin-top:14px;background:#fff;border:1px solid var(--line);border-radius:14px;padding:8px;display:grid;grid-template-columns:repeat(4,1fr);gap:8px;}
    .tab{height:46px;border-radius:12px;text-decoration:none;color:#374151;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:700;gap:8px;padding:0 14px;border:1px solid transparent;background:#f8fafc;transition:background .15s ease,color .15s ease,border-color .15s ease,transform .15s ease;} .tab:hover{transform:translateY(-1px);border-color:#dbe3ef;background:#fff;} .tab.active{background:var(--blue);color:#fff;border-color:var(--blue);}
    .tab-ico{width:18px;height:18px;display:block;flex:0 0 auto;}
    .tab.active .tab-ico{filter:brightness(0) invert(1);}
    .tab .badge{background:#e5e7eb;color:#374151;border-radius:999px;padding:2px 8px;font-size:12px;font-weight:700;} .tab.active .badge{background:#1d4ed8;color:#fff;}
    .panel{margin-top:14px;background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden;}
    .panel-head{padding:16px 20px;border-bottom:1px solid #e5e7eb;} .panel-title{font-size:28px;font-weight:800;margin:0;} .panel-sub{font-size:15px;color:var(--muted);margin-top:4px;}
    .form{padding:18px 20px;display:grid;grid-template-columns:1.2fr 1.2fr 1fr;gap:12px;align-items:end;} .label{font-size:14px;font-weight:700;color:#374151;display:block;margin-bottom:6px;}
    .req{color:#ef4444;} .input{width:100%;height:44px;border:1px solid #cfd6dd;border-radius:12px;padding:0 12px;font-size:14px;background:#fff;color:#111827;} .split{display:grid;grid-template-columns:1fr 64px;gap:8px;} .unit{height:44px;border-radius:12px;background:#f3f4f6;color:#6b7280;display:grid;place-items:center;font-size:14px;font-weight:700;border:1px solid #e5e7eb;}
    .actions{grid-column:1/-1;display:flex;justify-content:flex-end;} .search-btn{height:42px;padding:0 18px;border:none;border-radius:10px;background:#2563eb;color:#fff;font-size:14px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:8px;} .search-btn-ico{width:16px;height:16px;display:block;filter:brightness(0) invert(1);}
    @media (max-width:1280px){.title{font-size:40px}.sub{font-size:24px}.tab{font-size:16px;height:44px}.panel-title{font-size:32px}.panel-sub{font-size:20px}.label{font-size:14px}.input,.unit{font-size:14px;height:42px}.stats{grid-template-columns:repeat(2,1fr)}.stat .n{font-size:28px}.stat .l{font-size:13px}}
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
        <h1 class="title">재고 교환/요청</h1>
        <p class="sub">지점 간 재고를 교환하고 요청을 관리하세요</p>

        <section class="stats">
          <article class="stat">
            <div class="stat-ico s1" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>
            </div>
            <div class="stat-text"><span class="n">1건</span><div class="l">보낸 요청 (대기중)</div></div>
          </article>
          <article class="stat">
            <div class="stat-ico s2" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18"/><path d="M5 7v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7"/><path d="M8 7V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/></svg>
            </div>
            <div class="stat-text"><span class="n">2건</span><div class="l">받은 요청 (대기중)</div></div>
          </article>
          <article class="stat">
            <div class="stat-ico s3" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M7 6h7a4 4 0 0 1 0 8H7"/><path d="M7 14V6"/><path d="M17 18H7"/></svg>
            </div>
            <div class="stat-text"><span class="n">3건</span><div class="l">전체 교환 내역</div></div>
          </article>
          <article class="stat">
            <div class="stat-ico s4" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s6-4.35 6-10a6 6 0 0 0-12 0c0 5.65 6 10 6 10z"/><circle cx="12" cy="11" r="2.2"/></svg>
            </div>
            <div class="stat-text"><span class="n">5개</span><div class="l">주변 지점</div></div>
          </article>
        </section>

        <nav class="tabs" aria-label="재고교환 탭">
          <a class="tab active" href="<%= request.getContextPath() %>/branch/swap/main.jsp"><img class="tab-ico" src="<%= request.getContextPath() %>/branch/icons/swap/map-search.svg" alt="">재고 조회 및 요청</a>
          <a class="tab" href="<%= request.getContextPath() %>/branch/swap/send_request.jsp"><img class="tab-ico" src="<%= request.getContextPath() %>/branch/icons/swap/send.svg" alt="">보낸 요청 <span class="badge">1</span></a>
          <a class="tab" href="<%= request.getContextPath() %>/branch/swap/received_request.jsp"><img class="tab-ico" src="<%= request.getContextPath() %>/branch/icons/swap/inbox.svg" alt="">받은 요청 <span class="badge">2</span></a>
          <a class="tab" href="<%= request.getContextPath() %>/branch/swap/swap_history.jsp"><img class="tab-ico" src="<%= request.getContextPath() %>/branch/icons/hr/clock.svg" alt="">교환 내역</a>
        </nav>

        <section class="panel">
          <div class="panel-head">
            <h2 class="panel-title">주변 지점 재고 조회</h2>
          </div>
          <form class="form" id="searchForm">
            <div>
              <label class="label" for="item">필요한 품목 <span class="req">*</span></label>
              <select class="input" id="item" name="item" required>
                <option value="">품목 선택</option>
                <option value="소고기 패티">소고기 패티</option>
                <option value="치킨 패티">치킨 패티</option>
                <option value="양상추">양상추</option>
                <option value="토마토">토마토</option>
                <option value="감자">감자</option>
                <option value="양파">양파</option>
              </select>
            </div>
            <div>
              <label class="label" for="qty">필요 수량 <span class="req">*</span></label>
              <div class="split">
                <input class="input" id="qty" name="qty" type="number" min="1" placeholder="수량" required>
                <div class="unit">단위</div>
              </div>
            </div>
            <div>
              <label class="label" for="dist">최대 거리 (km)</label>
              <input class="input" id="dist" name="dist" type="number" min="1" value="10">
            </div>
            <div class="actions">
              <button class="search-btn" type="submit"><img class="search-btn-ico" src="<%= request.getContextPath() %>/branch/icons/swap/map-search.svg" alt="">재고 조회</button>
            </div>
          </form>
        </section>
      </div>
    </main>
  </div>
</div>
<script>
(function(){
  var form = document.getElementById('searchForm');
  form.addEventListener('submit', function(e){ e.preventDefault(); go(); });
  function go(){
    var item = encodeURIComponent(document.getElementById('item').value || '소고기 패티');
    var qty = encodeURIComponent(document.getElementById('qty').value || '1');
    var dist = encodeURIComponent(document.getElementById('dist').value || '10');
    window.location.href = (window.__ZEROLOSS_CP || '') + '/branch/swap/check_stock.jsp?item=' + item + '&qty=' + qty + '&dist=' + dist;
  }
})();
</script>
</body>
</html>
