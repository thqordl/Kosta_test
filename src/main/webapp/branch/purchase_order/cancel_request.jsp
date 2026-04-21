<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>발주 취소 요청</title>
    <style>
        body { margin: 0; font-family: "Malgun Gothic", sans-serif; background: transparent; }
        .overlay { min-height: 100vh; background: transparent; display: flex; align-items: center; justify-content: center; padding: 16px; box-sizing: border-box; }
        .modal { width: min(560px, 100%); background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 22px; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.22); }

        .head { display: flex; align-items: center; gap: 12px; }
        .icon { width: 56px; height: 56px; border-radius: 50%; background: #fee2e2; color: #dc2626; display: grid; place-items: center; font-size: 34px; line-height: 1; }
        .title { margin: 0; font-size: 24px; font-weight: 900; color: #111827; letter-spacing: -0.02em; }
        .order-no { margin: 4px 0 0; font-size: 13px; color: #64748b; }

        .field { margin-top: 18px; }
        .field label { display: block; font-size: 14px; color: #1f2937; margin-bottom: 10px; }
        .field label .req { color: #ef4444; }
        .field textarea { width: 100%; min-height: 156px; box-sizing: border-box; border: 1px solid #d1d5db; border-radius: 12px; background: #f9fafb; padding: 14px; font-size: 14px; color: #334155; resize: vertical; }
        .field textarea::placeholder { color: #8f98a7; }

        .notice { margin-top: 16px; border: 1px solid #fde68a; background: #fffbeb; border-radius: 12px; padding: 12px 14px; color: #b45309; font-size: 12px; line-height: 1.35; }

        .actions { margin-top: 18px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .btn { height: 48px; border-radius: 12px; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; font-size: 17px; font-weight: 700; }
        .btn-close { border: 1px solid #d1d5db; background: #f9fafb; color: #374151; }
        .btn-submit { border: 0; background: #ff000c; color: #fff; }

        @media (max-width: 780px) {
            .title { font-size: 22px; }
            .order-no { font-size: 12px; }
            .field label { font-size: 14px; }
            .field textarea { font-size: 14px; min-height: 130px; }
            .notice { font-size: 12px; }
        }
        @media (max-width: 560px) {
            .modal { padding: 16px; }
            .icon { width: 44px; height: 44px; font-size: 24px; }
            .title { font-size: 20px; }
            .order-no { font-size: 14px; }
            .field { margin-top: 14px; }
            .field label { font-size: 14px; }
            .field textarea { font-size: 14px; min-height: 100px; }
            .notice { font-size: 12px; }
            .actions { grid-template-columns: 1fr; }
            .btn { height: 40px; font-size: 14px; }
        }
    </style>
</head>
<body>
<div class="overlay">
    <section class="modal" role="dialog" aria-modal="true" aria-label="발주 취소 요청">
        <div class="head">
            <div class="icon">×</div>
            <div>
                <h1 class="title">발주 취소 요청</h1>
                <p class="order-no">PO-2026-0329-001</p>
            </div>
        </div>

        <div class="field">
            <label>취소 사유 <span class="req">*</span></label>
            <textarea placeholder="취소 사유를 입력해주세요..."></textarea>
        </div>

        <div class="notice"><strong>안내:</strong> 취소 요청이 본사로 전송되며, 승인 시 해당 발주서는 취소됩니다.</div>

        <div class="actions">
            <a class="btn btn-close" href="/branch/purchase_order/history1.jsp">닫기</a>
            <a class="btn btn-submit" href="/branch/purchase_order/history1.jsp">취소 요청</a>
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

        var closeElements = document.querySelectorAll('.btn-close, .btn-submit');
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
