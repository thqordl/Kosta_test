<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>일정 추가</title>
  <style>
    body { margin: 0; font-family: "Malgun Gothic", sans-serif; background: transparent; color: #111827; }
    .overlay { min-height: 100vh; background: transparent; display: flex; align-items: center; justify-content: center; padding: 16px; box-sizing: border-box; }
    .modal { width: min(940px, 100%); height: min(95vh, 1700px); background: #fff; border-radius: 16px; display: flex; flex-direction: column; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.22); }

    .modal-head { padding: 18px 22px 12px; border-bottom: 1px solid #e5e7eb; background: #fff; }
    .head-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
    .title { margin: 0; font-size: 24px; line-height: 1.1; font-weight: 900; color: #111827; letter-spacing: -0.02em; }
    .subtitle { margin: 8px 0 0; font-size: 14px; color: #6b7280; }
    .close-x { border: 0; background: transparent; color: #9aa3af; font-size: 24px; line-height: 1; cursor: pointer; }

    .body { flex: 1; overflow: auto; padding: 16px 18px 18px; }
    .sec { padding-bottom: 16px; margin-bottom: 16px; border-bottom: 1px solid #e5e7eb; }
    .sec:last-child { border-bottom: 0; margin-bottom: 0; }
    .sec h3 { margin: 0 0 14px; font-size: 18px; font-weight: 800; }

    .label { display: block; margin-bottom: 7px; font-size: 14px; color: #374151; font-weight: 700; }
    .label .req { color: #ef4444; }
    .hint { margin: 8px 0 0; font-size: 12px; color: #9ca3af; }

    .input, .select, .textarea { width: 100%; box-sizing: border-box; border: 1px solid #cbd5e1; border-radius: 12px; padding: 0 12px; font-size: 14px; color: #111827; background: #fff; }
    .input, .select { height: 48px; }
    .textarea { min-height: 92px; resize: vertical; padding-top: 10px; }
    .input::placeholder, .textarea::placeholder { color: #9ca3af; }
    .readonly { background: #f3f4f6; color: #6b7280; }

    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

    .repeat-stack button { width: 100%; height: 44px; margin-bottom: 8px; border: 1px solid #d1d5db; border-radius: 10px; background: #fff; font-size: 14px; text-align: left; padding: 0 16px; }
    .repeat-stack button:last-child { margin-bottom: 0; }

    .break-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 10px; }
    .break-grid button { height: 44px; border: 1px solid #cbd5e1; border-radius: 10px; background: #fff; font-size: 14px; }
    .break-grid button.active { border-color: #059669; background: #ecfdf5; color: #047857; font-weight: 700; }

    .foot { border-top: 1px solid #e5e7eb; background: #fff; padding: 16px 18px; display: flex; justify-content: space-between; align-items: center; }
    .note { color: #6b7280; font-size: 12px; }
    .btns { display: flex; gap: 10px; }
    .btn { height: 46px; min-width: 84px; padding: 0 18px; border-radius: 12px; border: 1px solid #d1d5db; background: #f9fafb; font-size: 14px; font-weight: 700; cursor: pointer; }
    .btn.green { background: #0a8b43; border-color: #0a8b43; color: #fff; }

    .tiny { display: block; margin-bottom: 6px; color: #6b7280; font-size: 12px; font-weight: 600; }

    @media (max-width: 980px) {
      .title { font-size: 24px; }
      .sec h3 { font-size: 18px; }
      .label, .input, .select, .textarea, .repeat-stack button, .break-grid button, .btn { font-size: 14px; }
      .hint, .note, .tiny { font-size: 12px; }
    }
    @media (max-width: 760px) {
      .title { font-size: 24px; }
      .grid-2, .break-grid { grid-template-columns: 1fr; }
      .sec h3 { font-size: 20px; }
      .label, .input, .select, .textarea, .repeat-stack button, .break-grid button, .btn { font-size: 14px; }
      .hint, .note, .tiny { font-size: 12px; }
      .input, .select { height: 44px; }
      .modal { width: 100%; height: 96vh; }
      .overlay { padding: 8px; }
    }
  </style>
</head>
<body>
<div class="overlay">
  <section class="modal">
    <div class="modal-head">
      <div class="head-row">
        <div>
          <h1 class="title">일정 추가</h1>
          <p class="subtitle">직원 일정을 입력하세요</p>
        </div>
        <button class="close-x" type="button" aria-label="닫기"><img src="<%= request.getContextPath() %>/branch/icons/hr/x.svg" alt="닫기" /></button>
      </div>
    </div>

    <div class="body">
      <section class="sec">
        <h3>필수 정보</h3>

        <div style="margin-bottom: 12px;">
          <label class="label">직원 선택 <span class="req">*</span></label>
          <input class="input" type="text" />
          <p class="hint">직급을 선택하면 해당 직급의 직원이 표시됩니다</p>
        </div>

        <div style="margin-bottom: 12px;">
          <label class="label">매장</label>
          <input class="input readonly" type="text" value="강남지점" readonly />
        </div>

        <div class="grid-2" style="margin-bottom: 12px;">
          <div>
            <label class="label">날짜 <span class="req">*</span></label>
            <input class="input" type="text" />
          </div>
          <div>
            <label class="label">근무 유형 <span class="req">*</span></label>
            <input class="input" type="text" />
          </div>
        </div>

        <div class="grid-2">
          <div>
            <label class="label">근무 시간 <span class="req">*</span></label>
            <span class="tiny">시작 시간</span>
            <input class="input" type="text" />
          </div>
          <div>
            <label class="label" style="visibility: hidden;">근무 시간</label>
            <span class="tiny">종료 시간</span>
            <input class="input" type="text" />
          </div>
        </div>
      </section>

      <section class="sec">
        <h3>추가 옵션</h3>

        <div style="margin-bottom: 12px;">
          <label class="label">반복 여부</label>
          <div class="repeat-stack">
            <button type="button">반복 없음</button>
            <button type="button">매주 반복</button>
            <button type="button">매일 반복</button>
          </div>
        </div>

        <div style="margin-bottom: 12px;">
          <label class="label">휴게 시간</label>
          <div class="break-grid">
            <button type="button">30분</button>
            <button class="active" type="button">1시간</button>
            <button type="button">1.5시간</button>
          </div>
          <input class="input" type="text" placeholder="또는 직접 입력 (예: 45분)" />
        </div>

        <div style="margin-bottom: 12px;">
          <label class="label">근무 역할</label>
          <input class="input" type="text" />
        </div>

        <div>
          <label class="label">메모</label>
          <textarea class="textarea" placeholder="추가 정보나 특이사항을 입력하세요..."></textarea>
        </div>
      </section>
    </div>

    <div class="foot">
      <div class="note">* 필수 입력 항목</div>
      <div class="btns">
        <button class="btn" type="button" id="cancelCreateScheduleBtn">취소</button>
        <button class="btn green" type="button" id="submitCreateScheduleBtn">일정 추가</button>
      </div>
    </div>
  </section>
</div>

<script>
  function closePage() {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: "close-hr-modal" }, "*");
      return;
    }
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.href = (window.__ZEROLOSS_CP || '') + "/branch/hr/schedule/main.jsp";
  }

  document.querySelector(".close-x")?.addEventListener("click", closePage);
  document.getElementById("cancelCreateScheduleBtn")?.addEventListener("click", closePage);
  document.getElementById("submitCreateScheduleBtn")?.addEventListener("click", () => {
    alert("일정이 추가되었습니다.");
    closePage();
  });
</script>
</body>
</html>
