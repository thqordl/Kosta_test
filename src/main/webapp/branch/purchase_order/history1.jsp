<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>발주 내역 - 전송</title>
    <style>
        body { margin: 0; font-family: "Malgun Gothic", sans-serif; background: #f4f7fb; color: #111827; }
        .wrap {
    width: 100%; max-width: none; margin: 0; }
        .page-head { padding: 18px 0 14px; }
        .page-title { margin: 0; font-size: 30px; line-height: 1.15; font-weight: 800; letter-spacing: -0.03em; }
        .page-sub { margin: 8px 0 0; font-size: 15px; color: #6b7280; }

        .filter-card { margin-top: 10px; background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; padding: 14px 16px; box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04); }
        .filter-head { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; color: #111827; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        .filter-line { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .field label { display: block; font-size: 14px; font-weight: 700; color: #374151; margin-bottom: 8px; }
        .date-input { position: relative; }
        .date-input input { width: 100%; box-sizing: border-box; height: 40px; border: 1px solid #d5dae4; border-radius: 10px; padding: 0 14px 0 40px; font-size: 14px; color: #111827; background: #fff; }
        .date-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #9aa3af; font-size: 18px; }

        .table-card { margin-top: 18px; background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05); }
        .tabs { display: grid; grid-template-columns: repeat(4, 1fr); border-bottom: 1px solid #e6eaf0; }
        .tab-link { height: 52px; display: flex; align-items: center; justify-content: center; text-decoration: none; background: #fff; font-size: 16px; font-weight: 700; color: #6b7280; }
        .tab-link.sent { color: #2563eb; }
        .tab-link.approved { color: #16a34a; }
        .tab-link.rejected { color: #ef4444; }
        .tab-link.active { background: #edf3ff; box-shadow: inset 0 -2px 0 #4f7dff; }

        .table-wrap { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 14px 16px; border-bottom: 1px solid #edf0f5; text-align: left; font-size: 14px; }
        th { background: #fafbfc; color: #1f2937; font-weight: 800; }
        .mono-link { color: #2563eb; font-weight: 800; text-decoration: none; letter-spacing: 0.02em; }
        .value-strong { font-weight: 800; }
        .value-blue { color: #2563eb; font-weight: 800; }
        .center { text-align: center; }
        .right { text-align: right; }
        .status { display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; }
        .status.sent { background: #e8f0ff; color: #2563eb; }
        .work { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; text-decoration: none; margin-right: 10px; }
        .work.view { color: #2563eb; }
        .work.cancel { color: #ef4444; }

        .purchase-popup-overlay { position: fixed; inset: 0; z-index: 3000; background: rgba(0, 0, 0, 0.72); display: none; align-items: center; justify-content: center; padding: 18px; box-sizing: border-box; }
        .purchase-popup-overlay.active { display: flex; }
        .purchase-popup-frame { width: min(980px, 100%); height: min(94vh, 920px); border: 0; border-radius: 14px; background: transparent; }

        @media (max-width: 980px) {
            .page-title { font-size: 26px; }
            .filter-head { font-size: 16px; }
            .filter-line { grid-template-columns: 1fr; }
            .tab-link { font-size: 14px; height: 46px; }
            th, td { font-size: 13px; padding: 12px; }
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
        <h1 class="page-title">발주 내역</h1>
        <p class="page-sub">전체 발주 내역을 상태별로 확인하세요</p>
    </div>

    <div class="filter-card">
        <div class="filter-head">⌄ 일자 범위</div>
        <div class="filter-line">
            <div class="field">
                <label>시작일</label>
                <div class="date-input">
                    <span class="date-icon">📅</span>
                    <input type="date" value="2026-03-01" />
                </div>
            </div>
            <div class="field">
                <label>종료일</label>
                <div class="date-input">
                    <span class="date-icon">📅</span>
                    <input type="date" value="2026-03-31" />
                </div>
            </div>
        </div>
    </div>

    <div class="table-card">
        <div class="tabs">
            <a class="tab-link" href="/branch/purchase_order/history.jsp">전체 (5)</a>
            <a class="tab-link sent active" href="/branch/purchase_order/history1.jsp">전송 (2)</a>
            <a class="tab-link approved" href="/branch/purchase_order/history2.jsp">승인 (2)</a>
            <a class="tab-link rejected" href="/branch/purchase_order/history3.jsp">반려 (1)</a>
        </div>
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>발주서 번호</th>
                        <th>작성 일시</th>
                        <th class="right">품목 수</th>
                        <th class="right">총 수량</th>
                        <th class="center">상태</th>
                        <th class="center">작업</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><a class="mono-link open-purchase-popup" href="/branch/purchase_order/request_detail.jsp">PO-2026-0329-001</a></td>
                        <td>📅 2026-03-29 10:30</td>
                        <td class="right value-strong">4개</td>
                        <td class="right value-blue">185</td>
                        <td class="center"><span class="status sent">✈ 전송</span></td>
                        <td class="center">
                            <a class="work view open-purchase-popup" href="/branch/purchase_order/request_detail.jsp">◎ 상세</a>
                            <a class="work cancel open-purchase-popup" href="/branch/purchase_order/cancel_request.jsp">✕ 취소</a>
                        </td>
                    </tr>
                    <tr>
                        <td><a class="mono-link open-purchase-popup" href="/branch/purchase_order/request_detail.jsp">PO-2026-0329-002</a></td>
                        <td>📅 2026-03-29 09:15</td>
                        <td class="right value-strong">3개</td>
                        <td class="right value-blue">120</td>
                        <td class="center"><span class="status sent">✈ 전송</span></td>
                        <td class="center">
                            <a class="work view open-purchase-popup" href="/branch/purchase_order/request_detail.jsp">◎ 상세</a>
                            <a class="work cancel open-purchase-popup" href="/branch/purchase_order/cancel_request.jsp">✕ 취소</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</main>
</div>
</div>
<div id="purchasePopupOverlay" class="purchase-popup-overlay" aria-hidden="true">
        <iframe id="purchasePopupFrame" class="purchase-popup-frame" title="발주 팝업"></iframe>
</div>
<script>
    (function () {
        var overlay = document.getElementById('purchasePopupOverlay');
        var frame = document.getElementById('purchasePopupFrame');
        var triggers = document.querySelectorAll('.open-purchase-popup');

        function openPopup(url) {
            if (!overlay || !frame || !url) return;
            frame.src = url;
            overlay.classList.add('active');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closePopup() {
            if (!overlay || !frame) return;
            overlay.classList.remove('active');
            overlay.setAttribute('aria-hidden', 'true');
            frame.src = '';
            document.body.style.overflow = '';
        }

        for (var i = 0; i < triggers.length; i += 1) {
            triggers[i].addEventListener('click', function (event) {
                event.preventDefault();
                openPopup(this.getAttribute('href'));
            });
        }

        if (overlay) {
            overlay.addEventListener('click', function (event) {
                if (event.target === overlay) closePopup();
            });
        }

        window.addEventListener('message', function (event) {
            if (event.data && event.data.type === 'close-purchase-popup') {
                closePopup();
            }
        });
    })();
</script>
</body>
</html>
