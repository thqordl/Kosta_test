<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>직원 정보 수정</title>
  <style>
    body { margin: 0; font-family: "Malgun Gothic", sans-serif; background: #03050a; }
    .overlay { min-height: 100vh; background: rgba(0, 0, 0, 0.84); display: grid; place-items: center; padding: 16px; box-sizing: border-box; }
    .modal { width: min(760px, 100%); background: #fff; border-radius: 12px; overflow: hidden; border: 1px solid #d1d5db; }
    .head { height: 70px; display: flex; align-items: center; justify-content: space-between; padding: 0 18px; border-bottom: 1px solid #e5e7eb; }
    .head h1 { margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.03em; color: #111827; }
    .close { width: 34px; height: 34px; border: 0; background: transparent; cursor: pointer; padding: 0; }
    .close img { width: 19px; height: 19px; display: block; margin: 0 auto; opacity: 0.65; }
    .body { padding: 18px 22px 20px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 14px; }
    .field label { display: block; font-size: 15px; font-weight: 700; color: #374151; margin-bottom: 7px; }
    .input, .select { width: 100%; height: 48px; box-sizing: border-box; border: 1px solid #cbd5e1; border-radius: 12px; padding: 0 12px; font-size: 14px; color: #111827; background: #fff; }
    .foot { border-top: 1px solid #e5e7eb; padding: 14px 22px; display: flex; justify-content: flex-end; gap: 10px; }
    .btn { height: 46px; min-width: 84px; border-radius: 12px; padding: 0 18px; font-size: 14px; font-weight: 700; cursor: pointer; }
    .btn-cancel { border: 1px solid #cbd5e1; background: #fff; color: #374151; }
    .btn-save { border: 1px solid #0a8b43; background: #0a8b43; color: #fff; }
    .input::placeholder { color: #9ca3af; }

    @media (max-width: 980px) {
      .head h1 { font-size: 26px; }
      .input, .select { font-size: 14px; }
      .btn { font-size: 14px; }
    }
    @media (max-width: 760px) {
      .grid { grid-template-columns: 1fr; }
      .head h1 { font-size: 24px; }
      .input, .select { height: 44px; font-size: 14px; border-radius: 10px; }
      .btn { height: 42px; font-size: 14px; border-radius: 10px; padding: 0 18px; }
    }
  </style>
</head>
<body>
  <div class="overlay">
    <section class="modal">
      <div class="head">
        <h1>직원 정보 수정</h1>
        <button class="close" type="button" aria-label="닫기" onclick="closePage();"><img src="<%= request.getContextPath() %>/branch/icons/hr/x.svg" alt="닫기" /></button>
      </div>
      <div class="body">
        <div class="grid">
          <div class="field"><label>이름</label><input class="input" type="text" value="김철수" /></div>
          <div class="field"><label>사번</label><input class="input" type="text" value="EMP-001" /></div>
          <div class="field"><label>소속</label><select class="select"><option>본사</option><option selected>강남점</option><option>신촌점</option></select></div>
          <div class="field"><label>부서</label><select class="select"><option>영업팀</option><option>관리팀</option><option>물류팀</option></select></div>
          <div class="field"><label>직급</label><select class="select"><option>직원</option><option>매니저</option><option>지점장</option></select></div>
          <div class="field"><label>역할</label><select class="select"><option>지점매니저</option><option>지점장</option><option>본사관리자</option></select></div>
          <div class="field"><label>연락처</label><input class="input" type="text" value="010-1234-5678" /></div>
          <div class="field"><label>이메일</label><input class="input" type="text" value="kim@zeroloss.com" /></div>
          <div class="field"><label>입사일</label><input class="input" type="text" value="2024-01-15" /></div>
          <div class="field"><label>상태</label><select class="select"><option selected>재직</option><option>휴직</option><option>퇴사</option></select></div>
        </div>
      </div>
      <div class="foot">
        <button class="btn btn-cancel" type="button" onclick="closePage();">취소</button>
        <button class="btn btn-save" type="button">저장</button>
      </div>
    </section>
  </div>

  <script>
    function closePage() {
      if (window.history.length > 1) {
        window.history.back();
        return;
      }
      window.location.href = (window.__ZEROLOSS_CP || '') + "/branch/hr/employee/main.jsp";
    }
  </script>
</body>
</html>
