<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>재고 교환/요청 - 재고 조회</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
  <style>
    :root{--line:#d1d5db;--bg:#f3f4f6;--text:#111827;--muted:#6b7280;--blue:#2563eb;--green:#16a34a;--purple:#9333ea;--orange:#f97316;}
    *{box-sizing:border-box;}body{margin:0;font-family:"Noto Sans KR","Malgun Gothic",sans-serif;background:var(--bg);color:var(--text);} .wrap{
    width: 100%;max-width: none;margin: 0;padding:24px;}
    .title{font-size:40px;font-weight:800;letter-spacing:-0.8px;margin:0;} .sub{font-size:20px;color:var(--muted);margin:8px 0 0;}
    .stats{margin-top:18px;display:grid;grid-template-columns:repeat(4,1fr);gap:12px;} .stat{background:#fff;border:1px solid var(--line);border-radius:14px;padding:14px 16px;} .stat .n{font-size:30px;font-weight:800;margin-left:8px;} .stat .l{font-size:14px;color:#6b7280;margin-top:4px;}
    .icon{display:inline-grid;place-items:center;width:40px;height:40px;border-radius:12px;font-size:19px;font-weight:700;} .ico-img{width:20px;height:20px;display:block;} .i-blue{background:#dbeafe;color:#2563eb;} .i-green{background:#dcfce7;color:#16a34a;} .i-purple{background:#f3e8ff;color:#9333ea;} .i-orange{background:#ffedd5;color:#f97316;}
    .tabs{margin-top:14px;background:#fff;border:1px solid var(--line);border-radius:14px;padding:8px;display:grid;grid-template-columns:repeat(4,1fr);gap:8px;}
    .tab{height:46px;border-radius:12px;text-decoration:none;color:#374151;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:700;gap:8px;} .tab.active{background:var(--blue);color:#fff;}
    .tab-ico{width:16px;height:16px;display:block;} .tab.active .tab-ico{filter:brightness(0) invert(1);}
    .tab .badge{background:#e5e7eb;color:#374151;border-radius:999px;padding:2px 8px;font-size:12px;font-weight:700;} .tab.active .badge{background:#1d4ed8;color:#fff;}
    .panel{margin-top:14px;background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden;} .panel-head{padding:16px 20px;border-bottom:1px solid #e5e7eb;} .panel-title{font-size:28px;font-weight:800;margin:0;} .panel-sub{font-size:15px;color:var(--muted);margin-top:4px;}
    .form{padding:18px 20px;display:grid;grid-template-columns:1.2fr 1.2fr 1fr;gap:12px;align-items:end;} .label{font-size:14px;font-weight:700;color:#374151;display:block;margin-bottom:6px;}
    .req{color:#ef4444;} .input{width:100%;height:44px;border:1px solid #cfd6dd;border-radius:12px;padding:0 12px;font-size:14px;background:#fff;color:#111827;} .split{display:grid;grid-template-columns:1fr 64px;gap:8px;} .unit{height:44px;border-radius:12px;background:#f3f4f6;color:#6b7280;display:grid;place-items:center;font-size:14px;font-weight:700;border:1px solid #e5e7eb;}
    .map-box{margin-top:14px;background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden;} .map-head{padding:14px 18px;border-bottom:1px solid #e5e7eb;font-size:22px;font-weight:800;} .map-head small{font-size:14px;color:#6b7280;font-weight:600;} #map{height:320px;}
    .table-box{margin-top:14px;background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden;} .tb-head{padding:14px 18px;border-bottom:1px solid #e5e7eb;font-size:22px;font-weight:800;}
    table{width:100%;border-collapse:collapse;} th,td{padding:12px 16px;border-bottom:1px solid #e5e7eb;font-size:14px;} th{background:#f9fafb;color:#374151;font-weight:700;text-align:left;} td:nth-child(3),td:nth-child(4){text-align:center;}
    .ask{background:#2563eb;color:#fff;border:none;border-radius:10px;padding:8px 12px;font-size:13px;font-weight:700;cursor:pointer;}
    @media (max-width:1280px){.title{font-size:40px}.sub{font-size:24px}.tab{font-size:16px;height:44px}.panel-title,.map-head,.tb-head{font-size:24px}.map-head small{font-size:14px}.label{font-size:14px}.input,.unit{font-size:14px;height:42px}th,td{font-size:14px}.ask{font-size:13px;padding:8px 12px}.stats{grid-template-columns:repeat(2,1fr)}.stat .n{font-size:28px}.stat .l{font-size:13px}}
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
          <article class="stat"><span class="icon i-blue"><img class="ico-img" src="<%= request.getContextPath() %>/branch/icons/swap/send.svg" alt="보낸 요청"></span><span class="n">2건</span><div class="l">보낸 요청 (대기중)</div></article>
          <article class="stat"><span class="icon i-green"><img class="ico-img" src="<%= request.getContextPath() %>/branch/icons/swap/inbox.svg" alt="받은 요청"></span><span class="n">2건</span><div class="l">받은 요청 (대기중)</div></article>
          <article class="stat"><span class="icon i-purple"><img class="ico-img" src="<%= request.getContextPath() %>/branch/icons/swap/swap.svg" alt="교환 내역"></span><span class="n">3건</span><div class="l">전체 교환 내역</div></article>
          <article class="stat"><span class="icon i-orange"><img class="ico-img" src="<%= request.getContextPath() %>/branch/icons/swap/marker.svg" alt="주변 지점"></span><span class="n">5개</span><div class="l">주변 지점</div></article>
        </section>

        <nav class="tabs">
          <a class="tab active" href="<%= request.getContextPath() %>/branch/swap/main.jsp"><img class="tab-ico" src="<%= request.getContextPath() %>/branch/icons/swap/map-search.svg" alt="">재고 조회 및 요청</a>
          <a class="tab" href="<%= request.getContextPath() %>/branch/swap/send_request.jsp"><img class="tab-ico" src="<%= request.getContextPath() %>/branch/icons/swap/send.svg" alt="">보낸 요청 <span class="badge">2</span></a>
          <a class="tab" href="<%= request.getContextPath() %>/branch/swap/received_request.jsp"><img class="tab-ico" src="<%= request.getContextPath() %>/branch/icons/swap/inbox.svg" alt="">받은 요청 <span class="badge">2</span></a>
          <a class="tab" href="<%= request.getContextPath() %>/branch/swap/swap_history.jsp"><img class="tab-ico" src="<%= request.getContextPath() %>/branch/icons/swap/history.svg" alt="">교환 내역</a>
        </nav>

        <section class="panel">
          <div class="panel-head"><h2 class="panel-title">주변 지점 재고 조회</h2></div>
          <div class="form">
            <div><label class="label">필요한 품목 <span class="req">*</span></label><input class="input" id="item"></div>
            <div><label class="label">필요 수량 <span class="req">*</span></label><div class="split"><input class="input" id="qty"><div class="unit">개</div></div></div>
            <div><label class="label">최대 거리 (km)</label><input class="input" id="dist"></div>
          </div>
        </section>

        <section class="map-box">
          <div class="map-head">주변 지점 지도<small>(5개 지점 발견)</small></div>
          <div id="map"></div>
        </section>

        <section class="table-box">
          <div class="tb-head">상세 지점 정보</div>
          <table>
            <thead><tr><th>지점명</th><th>주소</th><th>거리</th><th style="text-align:center;">액션</th></tr></thead>
            <tbody>
              <tr><td>강남점</td><td>서울 강남구 테헤란로 123</td><td>2.5km</td><td><button class="ask" onclick="go('강남점','2.5km')">요청하기</button></td></tr>
              <tr><td>홍대점</td><td>서울 마포구 양화로 456</td><td>5.3km</td><td><button class="ask" onclick="go('홍대점','5.3km')">요청하기</button></td></tr>
              <tr><td>잠실점</td><td>서울 송파구 올림픽로 789</td><td>3.8km</td><td><button class="ask" onclick="go('잠실점','3.8km')">요청하기</button></td></tr>
              <tr><td>신촌점</td><td>서울 서대문구 신촌로 321</td><td>6.1km</td><td><button class="ask" onclick="go('신촌점','6.1km')">요청하기</button></td></tr>
              <tr><td>판교점</td><td>경기 성남시 분당구 판교역로 654</td><td>8.7km</td><td><button class="ask" onclick="go('판교점','8.7km')">요청하기</button></td></tr>
            </tbody>
          </table>
        </section>
      </div>
    </main>
  </div>
</div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
(function(){
  var p = new URLSearchParams(location.search);
  document.getElementById('item').value = p.get('item') || '소고기 패티';
  document.getElementById('qty').value = p.get('qty') || '1';
  document.getElementById('dist').value = p.get('dist') || '10';

  var map = L.map('map').setView([37.52, 127.02], 11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
  [[37.4979,127.0276,'강남점'],[37.5563,126.9239,'홍대점'],[37.5133,127.1028,'잠실점'],[37.5559,126.9368,'신촌점'],[37.3952,127.1112,'판교점']].forEach(function(m){L.marker([m[0],m[1]]).addTo(map).bindPopup(m[2]);});
})();
function go(branch, distance){
  var item = encodeURIComponent(document.getElementById('item').value || '소고기 패티');
  var qty = encodeURIComponent(document.getElementById('qty').value || '1');
  window.location.href=(window.__ZEROLOSS_CP || '') + '/branch/swap/request_stock_detail.jsp?branch='+encodeURIComponent(branch)+'&distance='+encodeURIComponent(distance)+'&item='+item+'&qty='+qty;
}
</script>
</body>
</html>
