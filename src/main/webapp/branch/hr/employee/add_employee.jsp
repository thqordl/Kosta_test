<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>신규 직원 등록</title>
  <style>
    body { margin: 0; font-family: "Malgun Gothic", sans-serif; background: transparent; color: #111827; }
    .overlay { min-height: 100vh; background: transparent; display: grid; place-items: center; padding: 16px; box-sizing: border-box; }
    .modal { width: min(760px, 100%); background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.22); }
    .head { height: 70px; padding: 0 18px; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: space-between; }
    .title { margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.03em; color: #111827; }
    .close-btn { width: 34px; height: 34px; border: 0; border-radius: 999px; background: transparent; cursor: pointer; }
    .close-btn img { width: 19px; height: 19px; display: block; margin: 0 auto; opacity: 0.65; }

    .body { padding: 18px 22px 20px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 14px; }
    .field label { display: block; margin-bottom: 7px; font-size: 15px; font-weight: 700; color: #374151; }
    .field label .req { color: #ef4444; }
    .input,
    .select { width: 100%; height: 48px; box-sizing: border-box; border: 1px solid #cbd5e1; border-radius: 12px; padding: 0 12px; font-size: 14px; color: #111827; background: #fff; }
    .input::placeholder { color: #9ca3af; }

    .foot { border-top: 1px solid #e5e7eb; padding: 14px 22px; display: flex; justify-content: flex-end; gap: 10px; }
    .btn { height: 46px; min-width: 84px; padding: 0 18px; border-radius: 12px; border: 1px solid #d1d5db; background: #f9fafb; color: #374151; font-size: 14px; font-weight: 700; cursor: pointer; }
    .btn.primary { border-color: #0a8b43; background: #0a8b43; color: #fff; }

    @media (max-width: 980px) {
      .title { font-size: 26px; }
      .input, .select { font-size: 14px; }
      .btn { font-size: 14px; }
    }
    @media (max-width: 760px) {
      .grid { grid-template-columns: 1fr; }
      .title { font-size: 24px; }
      .input, .select { height: 44px; font-size: 16px; border-radius: 10px; }
      .btn { height: 42px; font-size: 16px; border-radius: 10px; }
    }
  </style>
</head>
<body>
  <div class="overlay">
    <section class="modal">
      <header class="head">
        <h1 class="title">신규 직원 등록</h1>
        <button class="close-btn" type="button" aria-label="닫기" onclick="closePage();">
          <img src="<%= request.getContextPath() %>/branch/icons/hr/x.svg" alt="닫기" />
        </button>
      </header>

      <div class="body">
        <div class="grid">
          <div class="field">
            <label>이름</label>
            <input class="input" type="text" placeholder="홍길동" />
          </div>
          <div class="field">
            <label>사번</label>
            <input class="input" type="text" placeholder="EMP-007" />
          </div>
          <div class="field">
            <label>소속</label>
            <select class="select"><option>본사</option><option>강남점</option><option>신촌점</option><option>홍대점</option></select>
          </div>
          <div class="field">
            <label>부서</label>
            <select class="select"><option>관리팀</option><option>영업팀</option><option>물류팀</option></select>
          </div>
          <div class="field">
            <label>직급</label>
            <select class="select"><option>아르바이트</option><option>직원</option><option>매니저</option><option>지점장</option><option>대리</option><option>과장</option><option>부장</option></select>
          </div>
          <div class="field">
            <label>역할</label>
            <select class="select"><option>지점매니저</option><option>지점장</option><option>본사관리자</option></select>
          </div>
          <div class="field">
            <label>연락처</label>
            <input class="input" type="tel" placeholder="010-0000-0000" />
          </div>
          <div class="field">
            <label>이메일</label>
            <input class="input" type="email" placeholder="example@zeroloss.com" />
          </div>
          <div class="field">
            <label>입사일</label>
            <input class="input" type="text" placeholder="연도-월-일" />
          </div>
          <div class="field">
            <label>상태</label>
            <select class="select"><option>재직</option><option>휴직</option><option>퇴사</option></select>
          </div>
        </div>
      </div>

      <footer class="foot">
        <button class="btn" type="button" onclick="closePage();">취소</button>
        <button class="btn primary" type="button">등록</button>
      </footer>
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
      window.location.href = (window.__ZEROLOSS_CP || '') + "/branch/hr/employee/main.jsp";
    }
  </script>
</body>
</html>
