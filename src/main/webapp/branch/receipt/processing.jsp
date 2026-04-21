<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>입고 처리</title>
    <style>
        body { margin: 0; font-family: "Malgun Gothic", sans-serif; background: #f4f7fb; color: #111827; }
        .wrap {
    width: 100%; max-width: none; margin: 0; }
        .page-head { padding: 18px 0 10px; display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
        .page-title { margin: 0; font-size: 30px; line-height: 1.15; font-weight: 800; letter-spacing: -0.03em; }
        .page-sub { margin: 8px 0 0; font-size: 15px; color: #6b7280; }
        .history-link { display: inline-flex; align-items: center; height: 40px; padding: 0 16px; border: 1px solid #d6dae3; border-radius: 12px; background: #fff; color: #111827; font-weight: 700; text-decoration: none; }
        .history-link:hover { background: #f9fafb; }

        .order-list { margin-top: 14px; display: grid; gap: 14px; }
        .order-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05); }
        .order-card.open { border-color: #dbe5ff; }
        .order-head { width: 100%; border: 0; background: #fff; padding: 18px 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px; cursor: pointer; text-align: left; }
        .order-left { display: flex; align-items: center; gap: 14px; min-width: 0; }
        .icon-box { width: 52px; height: 52px; border-radius: 14px; background: #dbeafe; display: grid; place-items: center; color: #2563eb; font-size: 22px; flex: 0 0 52px; }
        .icon-img { width: 24px; height: 24px; display: block; }
        .order-meta { min-width: 0; }
        .order-line1 { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .order-id { font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
        .status-pill { display: inline-flex; align-items: center; padding: 5px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; }
        .status-wait { background: #fff4b8; color: #b45309; }
        .status-partial { background: #ffedd5; color: #c2410c; }
        .discrepancy { display: inline-flex; align-items: center; gap: 6px; color: #ea580c; font-size: 13px; font-weight: 700; }
        .discrepancy-icon { width: 14px; height: 14px; display: block; }
        .order-line2 { margin-top: 8px; display: flex; gap: 18px; flex-wrap: wrap; color: #6b7280; font-size: 14px; }
        .chev { color: #9ca3af; font-size: 18px; }
        .chev-icon { width: 18px; height: 18px; display: block; }

        .order-body { border-top: 1px solid #edf0f5; padding: 18px 20px 20px; }
        .section-title { margin: 0 0 14px; font-size: 18px; font-weight: 800; }
        .items-table { width: 100%; border-collapse: collapse; }
        .items-table th, .items-table td { padding: 13px 14px; border-bottom: 1px solid #edf0f5; font-size: 14px; text-align: left; }
        .items-table th { background: #fafbfc; color: #4b5563; font-weight: 700; }
        .items-table input[type="number"], .items-table input[type="text"] { width: 100%; box-sizing: border-box; height: 40px; padding: 0 12px; border: 1px solid #d6dae3; border-radius: 10px; font-size: 14px; }
        .items-table input.qty-warn { border-color: #fb923c; background: #fff7ed; }
        .history-toggle { margin-top: 18px; color: #334155; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; cursor: pointer; }
        .history-toggle-icon { width: 14px; height: 14px; display: block; }
        .history-panel { margin-top: 14px; padding: 14px 16px; border: 1px solid #e5e7eb; border-radius: 12px; background: #fafbfc; display: none; }
        .history-item { display: flex; align-items: center; gap: 12px; padding: 8px 0; font-size: 14px; color: #374151; }
        .dot { width: 8px; height: 8px; border-radius: 999px; background: #2563eb; }

        .actions { margin-top: 20px; display: flex; justify-content: flex-end; gap: 12px; }
        .btn { height: 42px; padding: 0 18px; border-radius: 12px; font-weight: 700; border: 0; cursor: pointer; }
        .btn-cancel { background: #fff; border: 1px solid #d6dae3; color: #111827; }
        .btn-confirm { background: #2563eb; color: #fff; display: inline-flex; align-items: center; gap: 8px; }
        .btn-icon { width: 14px; height: 14px; display: block; }

        .toast { position: fixed; top: 18px; right: 18px; z-index: 1000; background: #fff; border: 1px solid #dbe5ff; border-left: 4px solid #2563eb; box-shadow: 0 12px 28px rgba(15, 23, 42, 0.14); border-radius: 12px; padding: 14px 16px; display: none; max-width: 360px; }
        .toast.show { display: block; }
        .toast strong { display: block; margin-bottom: 4px; }

        @media (max-width: 960px) {
            .page-head { flex-direction: column; }
            .order-head { align-items: flex-start; }
            .order-left { align-items: flex-start; }
        }
        @media (max-width: 720px) {
            .items-table, .items-table thead, .items-table tbody, .items-table th, .items-table td, .items-table tr { display: block; width: 100%; }
            .items-table thead { display: none; }
            .items-table tr { padding: 12px 0; border-bottom: 1px solid #edf0f5; }
            .items-table td { border: 0; padding: 6px 0; }
            .items-table td::before { content: attr(data-label); display: block; font-size: 12px; color: #6b7280; margin-bottom: 4px; font-weight: 700; }
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
        <div>
            <h1 class="page-title">입고 처리</h1>
            <p class="page-sub">입고 대기 중인 물품을 확인하고 입고를 확정합니다</p>
        </div>
        <a class="history-link" href="<%= request.getContextPath() %>/branch/receipt/history.jsp">입고 이력</a>
    </div>

    <div class="order-list">
        <div class="order-card open" id="order-RCV-001">
            <button class="order-head" type="button" data-target="body-RCV-001">
                <div class="order-left">
                    <div class="icon-box"><img class="icon-img" src="<%= request.getContextPath() %>/branch/icons/receipt/package.svg" alt="입고" /></div>
                    <div class="order-meta">
                        <div class="order-line1">
                            <span class="order-id">RCV-001</span>
                            <span class="status-pill status-wait">입고대기</span>
                            <span class="discrepancy"><img class="discrepancy-icon" src="<%= request.getContextPath() %>/branch/icons/receipt/alert-triangle.svg" alt="경고" />수량 불일치</span>
                        </div>
                        <div class="order-line2">
                            <span>발주번호: ORD-2024-001</span>
                            <span>입고 예정일: 2024-03-29</span>
                            <span>공급처: 본사 물류센터</span>
                        </div>
                    </div>
                </div>
                <span class="chev"><img class="chev-icon" src="<%= request.getContextPath() %>/branch/icons/receipt/chevron-up.svg" alt="접기" /></span>
            </button>

            <div class="order-body" id="body-RCV-001">
                <h2 class="section-title">입고 품목</h2>
                <table class="items-table">
                    <thead>
                        <tr>
                            <th>품목명</th>
                            <th>카테고리</th>
                            <th class="center">발주 수량</th>
                            <th class="center">입고 수량</th>
                            <th>유통기한</th>
                            <th>비고</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="품목명">아메리카노 원두</td>
                            <td data-label="카테고리">원두</td>
                            <td data-label="발주 수량" class="center">50 kg</td>
                            <td data-label="입고 수량" class="center"><input type="number" value="50" /></td>
                            <td data-label="유통기한">2024-06-29</td>
                            <td data-label="비고"><input type="text" placeholder="비고 입력" /></td>
                        </tr>
                        <tr>
                            <td data-label="품목명">우유 (1L)</td>
                            <td data-label="카테고리">유제품</td>
                            <td data-label="발주 수량" class="center">100 개</td>
                            <td data-label="입고 수량" class="center"><input class="qty-warn" type="number" value="98" /></td>
                            <td data-label="유통기한">2024-04-05</td>
                            <td data-label="비고"><input type="text" value="2개 파손" /></td>
                        </tr>
                        <tr>
                            <td data-label="품목명">설탕</td>
                            <td data-label="카테고리">부재료</td>
                            <td data-label="발주 수량" class="center">20 kg</td>
                            <td data-label="입고 수량" class="center"><input type="number" value="20" /></td>
                            <td data-label="유통기한">2025-03-29</td>
                            <td data-label="비고"><input type="text" placeholder="비고 입력" /></td>
                        </tr>
                    </tbody>
                </table>

                <div class="history-toggle" data-history-target="history-RCV-001"><img class="history-toggle-icon" src="<%= request.getContextPath() %>/branch/icons/receipt/clock.svg" alt="이력" />상태 변경 이력 보기</div>
                <div class="history-panel" id="history-RCV-001">
                    <div class="history-item"><span class="dot"></span><span><strong>발주 완료</strong> · 2024-03-28 10:30 · 김지점</span></div>
                    <div class="history-item"><span class="dot"></span><span><strong>배송 중</strong> · 2024-03-28 14:00 · 본사시스템</span></div>
                    <div class="history-item"><span class="dot"></span><span><strong>입고 대기</strong> · 2024-03-29 08:00 · 본사시스템</span></div>
                </div>

                <div class="actions">
                    <button class="btn btn-cancel" type="button">취소</button>
                    <button class="btn btn-confirm" type="button"><img class="btn-icon" src="<%= request.getContextPath() %>/branch/icons/receipt/check.svg" alt="확정" />입고 확정</button>
                </div>
            </div>
        </div>

        <div class="order-card" id="order-RCV-002">
            <button class="order-head" type="button" data-target="body-RCV-002">
                <div class="order-left">
                    <div class="icon-box"><img class="icon-img" src="<%= request.getContextPath() %>/branch/icons/receipt/package.svg" alt="입고" /></div>
                    <div class="order-meta">
                        <div class="order-line1">
                            <span class="order-id">RCV-002</span>
                            <span class="status-pill status-wait">입고대기</span>
                        </div>
                        <div class="order-line2">
                            <span>발주번호: ORD-2024-002</span>
                            <span>입고 예정일: 2024-03-29</span>
                            <span>공급처: 본사 물류센터</span>
                        </div>
                    </div>
                </div>
                <span class="chev"><img class="chev-icon" src="<%= request.getContextPath() %>/branch/icons/receipt/chevron-down.svg" alt="펼치기" /></span>
            </button>

            <div class="order-body" id="body-RCV-002" style="display:none;">
                <h2 class="section-title">입고 품목</h2>
                <table class="items-table">
                    <thead>
                        <tr>
                            <th>품목명</th>
                            <th>카테고리</th>
                            <th class="center">발주 수량</th>
                            <th class="center">입고 수량</th>
                            <th>유통기한</th>
                            <th>비고</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="품목명">테이크아웃 컵 (12oz)</td>
                            <td data-label="카테고리">포장용품</td>
                            <td data-label="발주 수량" class="center">1000 개</td>
                            <td data-label="입고 수량" class="center"><input type="number" value="1000" /></td>
                            <td data-label="유통기한">-</td>
                            <td data-label="비고"><input type="text" placeholder="비고 입력" /></td>
                        </tr>
                        <tr>
                            <td data-label="품목명">빨대</td>
                            <td data-label="카테고리">포장용품</td>
                            <td data-label="발주 수량" class="center">500 개</td>
                            <td data-label="입고 수량" class="center"><input type="number" value="500" /></td>
                            <td data-label="유통기한">-</td>
                            <td data-label="비고"><input type="text" placeholder="비고 입력" /></td>
                        </tr>
                    </tbody>
                </table>

                <div class="history-toggle" data-history-target="history-RCV-002"><img class="history-toggle-icon" src="<%= request.getContextPath() %>/branch/icons/receipt/clock.svg" alt="이력" />상태 변경 이력 보기</div>
                <div class="history-panel" id="history-RCV-002">
                    <div class="history-item"><span class="dot"></span><span><strong>발주 완료</strong> · 2024-03-27 10:30 · 김지점</span></div>
                    <div class="history-item"><span class="dot"></span><span><strong>입고 대기</strong> · 2024-03-29 08:00 · 본사시스템</span></div>
                </div>

                <div class="actions">
                    <button class="btn btn-cancel" type="button">취소</button>
                    <button class="btn btn-confirm" type="button"><img class="btn-icon" src="<%= request.getContextPath() %>/branch/icons/receipt/check.svg" alt="확정" />입고 확정</button>
                </div>
            </div>
        </div>
    </div>
</div>
</main>
</div>
</div>

<div class="toast" id="toastBox"><strong>입고가 완료되었습니다.</strong><span>재고가 자동으로 반영되었습니다.</span></div>

<script>
(function () {
    document.querySelectorAll('.order-head').forEach(function (button) {
        button.addEventListener('click', function () {
            var targetId = this.getAttribute('data-target');
            var body = document.getElementById(targetId);
            var card = this.closest('.order-card');
            if (!body || !card) return;
            var isOpen = body.style.display !== 'none';
            body.style.display = isOpen ? 'none' : 'block';
            card.classList.toggle('open', !isOpen);
            var chevIcon = this.querySelector('.chev-icon');
            if (chevIcon) {
                chevIcon.src = isOpen ? '/branch/icons/receipt/chevron-down.svg' : '/branch/icons/receipt/chevron-up.svg';
                chevIcon.alt = isOpen ? '펼치기' : '접기';
            }
        });
    });

    document.querySelectorAll('.history-toggle').forEach(function (button) {
        button.addEventListener('click', function () {
            var target = document.getElementById(this.getAttribute('data-history-target'));
            if (target) {
                target.style.display = target.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    function showToast() {
        var toast = document.getElementById('toastBox');
        if (!toast) return;
        toast.classList.add('show');
        setTimeout(function () { toast.classList.remove('show'); }, 2800);
    }

    document.querySelectorAll('.btn-confirm').forEach(function (button) {
        button.addEventListener('click', showToast);
    });
})();
</script>
</body>
</html>
