<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>입고 이력</title>
    <style>
        body { margin: 0; font-family: "Malgun Gothic", sans-serif; background: #f4f7fb; color: #111827; }
        .wrap {
    width: 100%; max-width: none; margin: 0; }
        .page-head { padding: 18px 0 16px; }
        .page-title { margin: 0; font-size: 30px; line-height: 1.15; font-weight: 800; letter-spacing: -0.03em; }
        .page-sub { margin: 8px 0 0; font-size: 15px; color: #6b7280; }

        .toolbar { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; padding: 14px; box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04); }
        .search-box { flex: 1 1 380px; min-width: 280px; position: relative; }
        .search-box input { width: 100%; box-sizing: border-box; height: 40px; padding: 0 14px 0 40px; border: 1px solid #d6dae3; border-radius: 10px; font-size: 14px; background: #fff; }
        .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #9aa3af; font-size: 16px; width: 16px; height: 16px; display: block; }
        .date-box { width: 150px; position: relative; }
        .date-box input { width: 100%; box-sizing: border-box; height: 40px; padding: 0 12px 0 38px; border: 1px solid #d6dae3; border-radius: 10px; font-size: 14px; background: #fff; }
        .date-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #9aa3af; font-size: 15px; width: 14px; height: 14px; display: block; }
        .range-sep { color: #9ca3af; font-weight: 700; }
        .status-select { width: 135px; height: 40px; box-sizing: border-box; padding: 0 12px; border: 1px solid #d6dae3; border-radius: 10px; background: #fff; font-size: 14px; }
        .excel-btn { height: 40px; padding: 0 18px; border: 0; border-radius: 10px; background: #16a34a; color: #fff; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; cursor: pointer; }
        .excel-icon { width: 14px; height: 14px; display: block; }
        .excel-btn:hover { background: #15803d; }

        .summary { margin-top: 14px; background: #eef4ff; border: 1px solid #c7d7fe; border-radius: 14px; padding: 16px 18px; display: flex; justify-content: space-between; align-items: center; gap: 12px; color: #1d4ed8; }
        .summary-left { display: flex; align-items: center; gap: 10px; font-weight: 700; }
        .summary-icon { width: 16px; height: 16px; display: block; }
        .summary-right { font-weight: 700; }

        .table-card { margin-top: 18px; background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05); }
        .table-wrap { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 18px 18px; border-bottom: 1px solid #edf0f5; text-align: left; font-size: 14px; }
        th { background: #fafbfc; color: #4b5563; font-weight: 700; }
        tbody tr:hover { background: #fbfdff; }
        .link { color: #2f6bff; font-weight: 700; text-decoration: none; }
        .right { text-align: right; }
        .center { text-align: center; }
        .badge { display: inline-flex; align-items: center; padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; }
        .badge-ok { background: #d1fae5; color: #047857; }
        .badge-warn { background: #ffedd5; color: #c2410c; }
        .badge-cancel { background: #e5e7eb; color: #4b5563; }
        .empty-state { padding: 48px 24px; text-align: center; color: #6b7280; }
        .pagination { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 14px 18px; border-top: 1px solid #edf0f5; }
        .page-info { font-size: 13px; color: #6b7280; }
        .pager { display: flex; align-items: center; gap: 8px; }
        .pager button { width: 36px; height: 36px; border-radius: 10px; border: 1px solid #d6dae3; background: #fff; cursor: pointer; }
        .pager button:disabled { opacity: 0.5; cursor: not-allowed; }
        .pager span { min-width: 110px; text-align: center; font-size: 14px; color: #374151; font-weight: 700; }

        @media (max-width: 960px) {
            .toolbar { align-items: stretch; }
            .date-box, .status-select { width: 100%; }
            .summary { flex-direction: column; align-items: flex-start; }
        }
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
    <div class="page-head">
        <h1 class="page-title">입고 이력</h1>
        <p class="page-sub">과거 입고 내역을 조회하고 관리합니다</p>
    </div>

    <div class="toolbar">
        <div class="search-box">
            <img class="search-icon" src="<%= request.getContextPath() %>/branch/icons/receipt/search.svg" alt="검색" />
            <input type="text" placeholder="입고번호, 발주번호, 공급처 검색..." />
        </div>
        <div class="date-box">
            <img class="date-icon" src="<%= request.getContextPath() %>/branch/icons/receipt/calendar.svg" alt="시작일" />
            <input type="date" value="2024-03-01" />
        </div>
        <span class="range-sep">~</span>
        <div class="date-box">
            <img class="date-icon" src="<%= request.getContextPath() %>/branch/icons/receipt/calendar.svg" alt="종료일" />
            <input type="date" value="2024-03-29" />
        </div>
        <select class="status-select">
            <option value="all">전체 상태</option>
            <option value="입고완료">입고완료</option>
            <option value="부분입고">부분입고</option>
            <option value="취소됨">취소됨</option>
        </select>
        <button class="excel-btn" type="button"><img class="excel-icon" src="<%= request.getContextPath() %>/branch/icons/receipt/download.svg" alt="엑셀" />엑셀</button>
    </div>

    <div class="summary">
        <div class="summary-left"><img class="summary-icon" src="<%= request.getContextPath() %>/branch/icons/receipt/list.svg" alt="요약" />총 8건의 입고 이력</div>
        <div class="summary-right">총 금액: 15,700,000원</div>
    </div>

    <div class="table-card">
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>입고번호</th>
                        <th>발주번호</th>
                        <th>입고일</th>
                        <th class="center">상태</th>
                        <th class="center">품목 수</th>
                        <th class="right">총 금액</th>
                        <th>처리자</th>
                        <th>비고</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><a class="link" href="<%= request.getContextPath() %>/branch/receipt/processing.jsp">RCV-2024-0315</a></td>
                        <td>ORD-2024-0312</td>
                        <td>2024-03-15</td>
                        <td class="center"><span class="badge badge-ok">입고완료</span></td>
                        <td class="center">25개</td>
                        <td class="right">2,500,000원</td>
                        <td>김지점</td>
                        <td>정상 입고</td>
                    </tr>
                    <tr>
                        <td><a class="link" href="<%= request.getContextPath() %>/branch/receipt/processing.jsp">RCV-2024-0314</a></td>
                        <td>ORD-2024-0311</td>
                        <td>2024-03-14</td>
                        <td class="center"><span class="badge badge-ok">입고완료</span></td>
                        <td class="center">18개</td>
                        <td class="right">1,800,000원</td>
                        <td>이매니저</td>
                        <td>정상 입고</td>
                    </tr>
                    <tr>
                        <td><a class="link" href="<%= request.getContextPath() %>/branch/receipt/processing.jsp">RCV-2024-0313</a></td>
                        <td>ORD-2024-0310</td>
                        <td>2024-03-13</td>
                        <td class="center"><span class="badge badge-warn">부분입고</span></td>
                        <td class="center">15개</td>
                        <td class="right">1,200,000원</td>
                        <td>김지점</td>
                        <td>일부 품목 지연</td>
                    </tr>
                    <tr>
                        <td><a class="link" href="<%= request.getContextPath() %>/branch/receipt/processing.jsp">RCV-2024-0312</a></td>
                        <td>ORD-2024-0309</td>
                        <td>2024-03-12</td>
                        <td class="center"><span class="badge badge-ok">입고완료</span></td>
                        <td class="center">30개</td>
                        <td class="right">3,200,000원</td>
                        <td>이매니저</td>
                        <td>정상 입고</td>
                    </tr>
                    <tr>
                        <td><a class="link" href="<%= request.getContextPath() %>/branch/receipt/processing.jsp">RCV-2024-0311</a></td>
                        <td>ORD-2024-0308</td>
                        <td>2024-03-11</td>
                        <td class="center"><span class="badge badge-ok">입고완료</span></td>
                        <td class="center">22개</td>
                        <td class="right">2,200,000원</td>
                        <td>김지점</td>
                        <td>정상 입고</td>
                    </tr>
                    <tr>
                        <td><a class="link" href="<%= request.getContextPath() %>/branch/receipt/processing.jsp">RCV-2024-0310</a></td>
                        <td>ORD-2024-0307</td>
                        <td>2024-03-10</td>
                        <td class="center"><span class="badge badge-cancel">취소됨</span></td>
                        <td class="center">0개</td>
                        <td class="right">0원</td>
                        <td>시스템</td>
                        <td>발주 취소로 인한 입고 취소</td>
                    </tr>
                    <tr>
                        <td><a class="link" href="<%= request.getContextPath() %>/branch/receipt/processing.jsp">RCV-2024-0309</a></td>
                        <td>ORD-2024-0306</td>
                        <td>2024-03-09</td>
                        <td class="center"><span class="badge badge-ok">입고완료</span></td>
                        <td class="center">20개</td>
                        <td class="right">2,000,000원</td>
                        <td>이매니저</td>
                        <td>정상 입고</td>
                    </tr>
                    <tr>
                        <td><a class="link" href="<%= request.getContextPath() %>/branch/receipt/processing.jsp">RCV-2024-0308</a></td>
                        <td>ORD-2024-0305</td>
                        <td>2024-03-08</td>
                        <td class="center"><span class="badge badge-ok">입고완료</span></td>
                        <td class="center">28개</td>
                        <td class="right">2,800,000원</td>
                        <td>김지점</td>
                        <td>정상 입고</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="pagination">
            <div class="page-info">전체 8건 중 1-8건 표시</div>
            <div class="pager">
                <button type="button" disabled>‹</button>
                <span>페이지 1 / 1</span>
                <button type="button" disabled>›</button>
            </div>
        </div>
    </div>
</div>
</main>
</div>
</div>
</body>
</html>
