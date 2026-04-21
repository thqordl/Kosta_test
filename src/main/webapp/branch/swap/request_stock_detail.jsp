<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
  String branch = request.getParameter("branch") == null ? "신촌점" : request.getParameter("branch");
  String distance = request.getParameter("distance") == null ? "6.1km" : request.getParameter("distance");
  String item = request.getParameter("item") == null ? "소고기 패티" : request.getParameter("item");
  String qty = request.getParameter("qty") == null ? "1" : request.getParameter("qty");
%>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>재고 교환 요청 확인</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;800&display=swap" rel="stylesheet">
  <style>
    *{box-sizing:border-box;} body{margin:0;font-family:"Noto Sans KR","Malgun Gothic",sans-serif;background:rgba(0,0,0,.7);min-height:100vh;display:grid;place-items:center;padding:24px;}
    .modal{width:min(560px,100%);background:#fff;border-radius:16px;padding:22px;border:1px solid #e5e7eb;}
    .head{display:flex;gap:12px;align-items:center;} .ico{width:54px;height:54px;border-radius:14px;background:#dbeafe;color:#2563eb;display:grid;place-items:center;font-size:24px;font-weight:800;} .ico-img{width:24px;height:24px;display:block;}
    .ttl{font-size:28px;font-weight:800;color:#111827;margin:0;} .sub{font-size:14px;color:#6b7280;margin:2px 0 0;}
    .card{margin-top:14px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:12px;} .row{display:flex;justify-content:space-between;gap:12px;padding:6px 0;font-size:14px;} .k{color:#6b7280;} .v{font-weight:700;color:#111827;} .v.blue{color:#2563eb;}
    .alert{margin-top:14px;background:#fefce8;border:1px solid #fde68a;border-radius:12px;padding:11px 12px;font-size:13px;color:#92400e;}
    .actions{margin-top:16px;display:grid;grid-template-columns:1fr 1fr;gap:10px;} .btn{height:42px;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;} .cancel{background:#fff;border:1px solid #d1d5db;color:#374151;} .send{background:#2563eb;border:1px solid #2563eb;color:#fff;}
    @media (max-width:1280px){.ttl{font-size:24px}.sub{font-size:14px}.row{font-size:14px}.alert{font-size:13px}.btn{font-size:14px;height:42px}}
  </style>
</head>
<body>
  <section class="modal">
    <div class="head"><div class="ico"><img class="ico-img" src="<%= request.getContextPath() %>/branch/icons/swap/request.svg" alt="요청"></div><div><h1 class="ttl">재고 교환 요청</h1><p class="sub">요청 내용을 확인해주세요</p></div></div>
    <div class="card">
      <div class="row"><span class="k">받는 지점</span><span class="v"><%= branch %></span></div>
      <div class="row"><span class="k">거리</span><span class="v"><%= distance %></span></div>
      <div class="row"><span class="k">요청 품목</span><span class="v"><%= item %></span></div>
      <div class="row"><span class="k">요청 수량</span><span class="v blue"><%= qty %>개</span></div>
    </div>
    <div class="alert">요청을 보내면 상대 지점에서 승인/거절을 결정합니다.</div>
    <div class="actions">
      <button class="btn cancel" onclick="history.back()">취소</button>
      <button class="btn send" onclick="location.href='<%= request.getContextPath() %>/branch/swap/send_request.jsp'">요청 보내기</button>
    </div>
  </section>
</body>
</html>
