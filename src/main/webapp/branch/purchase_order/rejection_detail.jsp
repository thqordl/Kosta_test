<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>발주서 상세 정보 - 반려</title>
    <style>
        body { margin: 0; font-family: "Malgun Gothic", sans-serif; background: transparent; }
        .overlay { min-height: 100vh; background: transparent; display: flex; align-items: center; justify-content: center; padding: 16px; box-sizing: border-box; }
        .modal { width: min(700px, 100%); background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 22px 24px; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.22); }

        .head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
        .title { margin: 0; font-size: 24px; font-weight: 800; color: #111827; letter-spacing: -0.02em; }
        .order-no { margin-top: 6px; font-size: 14px; color: #64748b; }
        .close { border: 0; background: transparent; color: #94a3b8; text-decoration: none; font-size: 24px; line-height: 1; }

        .summary { margin-top: 18px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px 20px; }
        .label { font-size: 14px; color: #475569; font-weight: 700; }
        .value { margin-top: 6px; font-size: 20px; color: #111827; font-weight: 800; }
        .value.blue { color: #2563eb; }
        .status { margin-top: 6px; display: inline-flex; align-items: center; gap: 6px; height: 26px; padding: 0 10px; border-radius: 999px; background: #fee2e2; color: #dc2626; font-size: 13px; font-weight: 700; }

        .reason-box { margin-top: 18px; border: 1px solid #fecaca; border-radius: 12px; background: #fff1f2; padding: 14px; }
        .reason-title { display: flex; align-items: center; gap: 8px; margin: 0; color: #b91c1c; font-size: 18px; font-weight: 800; }
        .reason-text { margin: 8px 0 0 34px; color: #dc2626; font-size: 14px; }

        .actions { margin-top: 20px; display: grid; grid-template-columns: 1fr; }
        .btn-close { height: 42px; border-radius: 10px; border: 1px solid #d1d5db; background: #f9fafb; color: #374151; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; }

        @media (max-width: 900px) {
            .title { font-size: 24px; }
            .order-no { font-size: 14px; }
            .label { font-size: 13px; }
            .value { font-size: 22px; }
            .status { font-size: 12px; height: 24px; }
            .reason-title { font-size: 20px; }
            .reason-text { font-size: 13px; margin-left: 0; }
            .btn-close { font-size: 13px; height: 40px; }
            .close { font-size: 22px; }
        }
        @media (max-width: 560px) {
            .modal { padding: 16px; }
            .title { font-size: 22px; }
            .order-no { font-size: 15px; }
            .summary { grid-template-columns: 1fr; gap: 10px; }
            .label { font-size: 14px; }
            .value { font-size: 20px; }
            .status { font-size: 12px; }
            .reason-title { font-size: 18px; }
            .reason-text { font-size: 14px; }
            .btn-close { font-size: 14px; height: 40px; }
            .close { font-size: 22px; }
        }
    </style>
</head>
<body>
<div class="overlay">
    <section class="modal" role="dialog" aria-modal="true" aria-label="발주서 상세 정보">
        <div class="head">
            <div>
                <h1 class="title">발주서 상세 정보</h1>
                <div class="order-no">PO-2026-0327-002</div>
            </div>
            <a class="close" href="/branch/purchase_order/history3.jsp" aria-label="닫기">×</a>
        </div>

        <div class="summary">
            <div>
                <div class="label">작성 일시</div>
                <div class="value">2026-03-27 11:00</div>
            </div>
            <div>
                <div class="label">상태</div>
                <span class="status">⊗ 반려</span>
            </div>
            <div>
                <div class="label">품목 수</div>
                <div class="value">4개</div>
            </div>
            <div>
                <div class="label">총 요청 수량</div>
                <div class="value blue">180</div>
            </div>
        </div>

        <div class="reason-box">
            <h2 class="reason-title">❗ 반려 사유</h2>
            <p class="reason-text">일부 품목의 요청 수량이 안전 재고의 3배를 초과합니다.</p>
        </div>

        <div class="actions">
            <a class="btn-close" href="/branch/purchase_order/history3.jsp">닫기</a>
        </div>
    </section>
</div>
<script>
    (function () {
        function closePopupOrFallback() {
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({ type: 'close-purchase-popup' }, '*');
            }
        }

        var closeElements = document.querySelectorAll('.close, .btn-close');
        for (var i = 0; i < closeElements.length; i += 1) {
            closeElements[i].addEventListener('click', function (event) {
                event.preventDefault();
                closePopupOrFallback();
            });
        }
    })();
</script>
</body>
</html>
