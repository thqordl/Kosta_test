<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>문의사항 - 문의하기</title>
    <style>
        body { margin: 0; font-family: "Malgun Gothic", sans-serif; background: transparent; }
        .overlay { min-height: 100vh; background: transparent; display: flex; align-items: center; justify-content: center; padding: 16px; box-sizing: border-box; }
        .modal { width: min(760px, 100%); height: min(92vh, 920px); background: #fff; border-radius: 16px; display: flex; flex-direction: column; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.22); }

        .modal-head { padding: 18px 22px 12px; border-bottom: 1px solid #e5e7eb; background: #fff; }
        .head-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
        .title { margin: 0; font-size: 24px; line-height: 1.1; font-weight: 900; color: #111827; letter-spacing: -0.02em; }
        .subtitle { margin: 8px 0 0; font-size: 14px; color: #6b7280; }
        .close-x { border: 0; background: transparent; color: #9aa3af; font-size: 24px; line-height: 1; cursor: pointer; }

        .modal-body { flex: 1; overflow: auto; padding: 16px 18px 18px; }
        .field { margin-bottom: 12px; }
        .field label { display: block; margin-bottom: 6px; font-size: 14px; color: #374151; font-weight: 700; }
        .input, .select, .area { width: 100%; box-sizing: border-box; border: 0; border-radius: 10px; background: #f3f4f6; padding: 0 12px; color: #374151; font-size: 14px; }
        .input, .select { height: 40px; }
        .area { height: 180px; padding-top: 10px; resize: none; }

        .modal-foot { border-top: 1px solid #e5e7eb; background: #fff; padding: 16px 18px; display: flex; justify-content: flex-end; gap: 8px; }
        .btn { height: 42px; min-width: 84px; padding: 0 18px; border-radius: 10px; border: 1px solid #d1d5db; background: #f9fafb; color: #374151; font-size: 14px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; }
        .btn.green { background: #00853d; border-color: #00853d; color: #fff; }

        @media (max-width: 760px) {
            .overlay { padding: 8px; }
            .modal { width: 100%; height: 96vh; }
            .title { font-size: 20px; }
            .subtitle { font-size: 13px; }
            .btn { height: 40px; font-size: 14px; }
        }
    </style>
</head>
<body>
<div class="overlay">
    <section class="modal" role="dialog" aria-modal="true" aria-label="문의하기">
        <div class="modal-head">
            <div class="head-row">
                <div>
                    <h1 class="title">문의하기</h1>
                    <p class="subtitle">문의 제목과 내용을 입력하세요</p>
                </div>
                <button class="close-x" type="button" aria-label="닫기" id="closeInquiryBtn">×</button>
            </div>
        </div>

        <div class="modal-body">
            <div class="field"><label>제목</label><input class="input" type="text" placeholder="문의 제목을 입력하세요" /></div>
            <div class="field"><label>카테고리</label><select class="select"><option></option><option>설비 문의</option><option>재고 문의</option><option>운영 건의</option><option>인사 문의</option><option>기타</option></select></div>
            <div class="field"><label>긴급도</label><select class="select"><option>일반</option><option>긴급</option></select></div>
            <div class="field" style="margin-bottom:0;"><label>내용</label><textarea class="area" placeholder="문의 내용을 입력하세요"></textarea></div>
        </div>

        <div class="modal-foot">
            <button class="btn" type="button" id="cancelInquiryBtn">취소</button>
            <button class="btn green" type="button" id="submitInquiryBtn">등록</button>
        </div>
    </section>
</div>
<script>
    (function () {
        function closePage() {
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({ type: 'close-inquiry-popup' }, '*');
                return;
            }
            window.location.href = (window.__ZEROLOSS_CP || '') + '/branch/support/inquiry/main.jsp';
        }

        var closeBtn = document.getElementById('closeInquiryBtn');
        var cancelBtn = document.getElementById('cancelInquiryBtn');
        var submitBtn = document.getElementById('submitInquiryBtn');

        if (closeBtn) closeBtn.addEventListener('click', closePage);
        if (cancelBtn) cancelBtn.addEventListener('click', closePage);
        if (submitBtn) submitBtn.addEventListener('click', closePage);
    })();
</script>
</body>
</html>
