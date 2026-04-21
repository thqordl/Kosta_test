<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>재고 교환/요청 - 보낸 요청</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;800&display=swap" rel="stylesheet">
  <style>
    :root{--line:#d1d5db;--bg:#f3f4f6;--text:#111827;--muted:#6b7280;--blue:#2563eb;--green:#16a34a;--purple:#9333ea;--orange:#f97316;}
    *{box-sizing:border-box;}body{margin:0;font-family:"Noto Sans KR","Malgun Gothic",sans-serif;background:var(--bg);color:var(--text);} .wrap{
    width: 100%;max-width: none;margin: 0;padding:24px;}
    .title{font-size:40px;font-weight:800;letter-spacing:-0.8px;margin:0;} .sub{font-size:20px;color:var(--muted);margin:8px 0 0;}
    .stats{margin-top:18px;display:grid;grid-template-columns:repeat(4,1fr);gap:12px;} .stat{background:#fff;border:1px solid var(--line);border-radius:14px;padding:14px 16px;display:flex;align-items:center;gap:10px;} .stat .n{font-size:30px;font-weight:800;line-height:1;} .stat .l{font-size:14px;color:#6b7280;margin-top:4px;}
    .stat-ico{display:inline-grid;place-items:center;width:32px;height:32px;border-radius:10px;flex:0 0 auto;} .stat-ico svg{width:18px;height:18px;display:block;} .s1{background:#dbeafe;color:#2563eb;} .s2{background:#dcfce7;color:#16a34a;} .s3{background:#f3e8ff;color:#9333ea;} .s4{background:#ffedd5;color:#f97316;} .stat-text{display:flex;flex-direction:column;min-width:0;}
    .tabs{margin-top:14px;background:#fff;border:1px solid var(--line);border-radius:14px;padding:8px;display:grid;grid-template-columns:repeat(4,1fr);gap:8px;}
    .tab{height:46px;border-radius:12px;text-decoration:none;color:#374151;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:700;gap:8px;} .tab.active{background:var(--blue);color:#fff;}
    .tab-ico{width:16px;height:16px;display:block;} .tab.active .tab-ico{filter:brightness(0) invert(1);}
    .tab .badge{background:#e5e7eb;color:#374151;border-radius:999px;padding:2px 8px;font-size:12px;font-weight:700;} .tab.active .badge{background:#1d4ed8;color:#fff;}
    .panel{margin-top:14px;background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden;} .panel-head{padding:16px 20px;border-bottom:1px solid #e5e7eb;} .panel-title{font-size:28px;font-weight:800;margin:0;} .panel-sub{font-size:15px;color:var(--muted);margin-top:4px;}
    table{width:100%;border-collapse:collapse;} th,td{padding:12px 16px;border-bottom:1px solid #e5e7eb;font-size:14px;} th{background:#f9fafb;text-align:left;color:#374151;font-weight:700;} td:nth-child(4),th:nth-child(4){text-align:right;}
    .badge-state{display:inline-block;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:700;} .pending{background:#fef3c7;color:#b45309;} .approved{background:#dcfce7;color:#15803d;}
    @media (max-width:1280px){.title{font-size:40px}.sub{font-size:24px}.tab{font-size:16px;height:44px}.panel-title{font-size:24px}.panel-sub{font-size:16px}th,td{font-size:14px}.badge-state{font-size:12px}.stats{grid-template-columns:repeat(2,1fr)}.stat .n{font-size:28px}.stat .l{font-size:13px}}
  </style>
  <%@ include file="/branch/common/layout/layout_head.jsp" %>
</head>
<body>
<div class="zl-app"><%@ include file="/branch/common/layout/sidebar.jsp" %><div class="zl-content"><%@ include file="/branch/common/layout/topbar.jsp" %>
<main class="zl-page"><div class="wrap">
  <h1 class="title">재고 교환/요청</h1><p class="sub">지점 간 재고를 교환하고 요청을 관리하세요</p>
  <section class="stats">
    <article class="stat"><div class="stat-ico s1" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg></div><div class="stat-text"><span class="n">2건</span><div class="l">보낸 요청 (대기중)</div></div></article>
    <article class="stat"><div class="stat-ico s2" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18"/><path d="M5 7v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7"/><path d="M8 7V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/></svg></div><div class="stat-text"><span class="n">2건</span><div class="l">받은 요청 (대기중)</div></div></article>
    <article class="stat"><div class="stat-ico s3" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M7 6h7a4 4 0 0 1 0 8H7"/><path d="M7 14V6"/><path d="M17 18H7"/></svg></div><div class="stat-text"><span class="n">3건</span><div class="l">전체 교환 내역</div></div></article>
    <article class="stat"><div class="stat-ico s4" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s6-4.35 6-10a6 6 0 0 0-12 0c0 5.65 6 10 6 10z"/><circle cx="12" cy="11" r="2.2"/></svg></div><div class="stat-text"><span class="n">5개</span><div class="l">주변 지점</div></div></article>
  </section>
  <nav class="tabs">
    <a class="tab" href="<%= request.getContextPath() %>/branch/swap/main.jsp"><img class="tab-ico" src="<%= request.getContextPath() %>/branch/icons/swap/map-search.svg" alt="">재고 조회 및 요청</a>
    <a class="tab active" href="<%= request.getContextPath() %>/branch/swap/send_request.jsp"><img class="tab-ico" src="<%= request.getContextPath() %>/branch/icons/swap/send.svg" alt="">보낸 요청 <span class="badge">2</span></a>
    <a class="tab" href="<%= request.getContextPath() %>/branch/swap/received_request.jsp"><img class="tab-ico" src="<%= request.getContextPath() %>/branch/icons/swap/inbox.svg" alt="">받은 요청 <span class="badge">2</span></a>
    <a class="tab" href="<%= request.getContextPath() %>/branch/swap/swap_history.jsp"><img class="tab-ico" src="<%= request.getContextPath() %>/branch/icons/swap/history.svg" alt="">교환 내역</a>
  </nav>
  <section class="panel">
    <div class="panel-head"><h2 class="panel-title">보낸 요청</h2><div class="panel-sub">내가 다른 지점에 요청한 내역입니다</div></div>
    <table>
      <thead><tr><th>요청일시</th><th>받는 지점</th><th>품목</th><th>수량</th><th>상태</th><th>응답일시</th></tr></thead>
      <tbody>
        <tr><td>2026. 04. 15. 오전 01:51</td><td>신촌점</td><td>소고기 패티</td><td>1개</td><td><span class="badge-state pending">대기중</span></td><td>-</td></tr>
        <tr><td>2026-04-03 10:30</td><td>강남점</td><td>소고기 패티</td><td>20개</td><td><span class="badge-state pending">대기중</span></td><td>-</td></tr>
        <tr><td>2026-04-02 14:20</td><td>홍대점</td><td>양상추</td><td>5kg</td><td><span class="badge-state approved">승인됨</span></td><td>2026-04-02 15:45</td></tr>
      </tbody>
    </table>
  </section>
</div></main></div></div>
</body>
</html>
