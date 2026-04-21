<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>문의사항 - 상세</title>
  <style>
    body { margin: 0; font-family: "Malgun Gothic", sans-serif; background: transparent; color: #111827; }
    .wrap {
    width: 100%; max-width: none; margin: 0; }
    .head { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; padding: 8px 0 14px; }
    .title { margin: 0; font-size: 34px; letter-spacing: -0.03em; font-weight: 900; }
    .sub { margin: 8px 0 0; font-size: 15px; color: #6b7280; }
    .add-btn { height: 44px; padding: 0 18px; border: 0; border-radius: 10px; background: #00853d; color: #fff; display: inline-flex; align-items: center; gap: 8px; font-size: 16px; font-weight: 700; text-decoration: none; }
    .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 12px; }
    .stat { background: #fff; border: 1px solid #d7e8df; border-radius: 16px; padding: 16px; }
    .k { font-size: 13px; color: #6b7280; }
    .v { margin-top: 5px; font-size: 28px; font-weight: 900; }
    .filter { background: #fff; border: 1px solid #d7e8df; border-radius: 16px; padding: 14px; margin-bottom: 12px; }
    .filter-row { display: grid; grid-template-columns: 1fr 220px 220px; gap: 10px; }
    .input, .select { width: 100%; height: 46px; box-sizing: border-box; border: 0; border-radius: 10px; background: #f3f4f6; color: #374151; padding: 0 14px; font-size: 14px; }
    .item { background: #fff; border: 1px solid #d7e8df; border-radius: 16px; padding: 16px; margin-bottom: 12px; min-height: 132px; }

    .dim { position: fixed; inset: 0; background: transparent; z-index: 1200; display: grid; place-items: center; padding: 16px; box-sizing: border-box; }
    .modal { width: min(780px, 100%); background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.22); }
    .m-head { padding: 14px 20px 10px; border-bottom: 1px solid #e5e7eb; }
    .head-top { display: flex; align-items: center; justify-content: space-between; }
    .chips { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 8px; }
    .chip { height: 26px; padding: 0 10px; border-radius: 999px; font-size: 13px; font-weight: 700; display: inline-flex; align-items: center; }
    .c-red { background: #fee2e2; color: #dc2626; }
    .c-purple { background: #f3e8ff; color: #7c3aed; }
    .c-blue { background: #dbeafe; color: #2563eb; }
    .m-title { margin: 0; font-size: 28px; font-weight: 900; letter-spacing: -0.02em; }
    .date { margin-top: 8px; font-size: 13px; color: #6b7280; }
    .x { width: 32px; height: 32px; border: 0; border-radius: 999px; background: transparent; color: #6b7280; text-decoration: none; font-size: 22px; line-height: 32px; text-align: center; cursor: pointer; }

    .m-body { padding: 14px 20px 16px; }
    .origin { background: #f3f4f6; border-radius: 12px; padding: 16px; font-size: 14px; color: #4b5563; line-height: 1.45; white-space: pre-line; }
    .sec-title { margin: 16px 0 10px; font-size: 24px; font-weight: 900; }
    .reply { border-left: 4px solid #3b82f6; background: #eff6ff; border-radius: 10px; padding: 12px 14px; }
    .reply-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; }
    .reply-top strong { font-size: 14px; }
    .reply-top span { font-size: 12px; color: #6b7280; }
    .reply p { margin: 0; font-size: 14px; color: #4b5563; line-height: 1.45; }

    .write { margin-top: 14px; padding-top: 12px; border-top: 1px solid #d7e8df; }
    .write-title { margin: 0 0 8px; font-size: 24px; font-weight: 900; }
    .area { width: 100%; height: 66px; box-sizing: border-box; border: 0; border-radius: 10px; background: #f3f4f6; color: #374151; padding: 12px; font-size: 14px; resize: none; }
    .m-foot { margin-top: 10px; display: flex; justify-content: flex-end; gap: 8px; }
    .btn { height: 36px; padding: 0 16px; border-radius: 10px; border: 1px solid #d1d5db; background: #f9fafb; color: #374151; font-size: 14px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; }
    .btn.green { background: #7ecaa4; border-color: #7ecaa4; color: #fff; }

    @media (max-width: 1200px) {
      .title { font-size: 34px; }
      .add-btn { font-size: 16px; }
      .k { font-size: 13px; }
      .v { font-size: 28px; }
      .input, .select { font-size: 14px; }
      .chip { font-size: 13px; height: 26px; }
      .m-title { font-size: 28px; }
      .date, .reply-top strong, .area, .btn { font-size: 14px; }
      .origin, .reply p { font-size: 14px; }
      .sec-title, .write-title { font-size: 24px; }
      .reply-top span { font-size: 12px; }
    }
    @media (max-width: 900px) {
      .stats { grid-template-columns: repeat(2, 1fr); }
      .filter-row { grid-template-columns: 1fr; }
    }
    @media (max-width: 760px) {
      .title { font-size: 28px; }
      .sub { font-size: 14px; }
      .stats { grid-template-columns: 1fr; }
      .sec-title, .write-title { font-size: 20px; }
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
        <div class="head"><div><h1 class="title">문의사항</h1><p class="sub">본사에 문의사항이나 건의사항을 전달할 수 있습니다.</p></div><a class="add-btn" href="/branch/support/inquiry/create_inquiry.jsp">＋ 문의하기</a></div>
        <section class="stats"><article class="stat"><div class="k">전체 문의</div><div class="v">3건</div></article><article class="stat"><div class="k">대기 중</div><div class="v" style="color:#b45309;">1건</div></article><article class="stat"><div class="k">처리 중</div><div class="v" style="color:#2563eb;">1건</div></article><article class="stat"><div class="k">답변 완료</div><div class="v" style="color:#16a34a;">1건</div></article></section>
        <section class="filter"><div class="filter-row"><input class="input" type="text" placeholder="제목 또는 내용으로 검색..." /><select class="select"><option>전체</option></select><select class="select"><option>전체</option></select></div></section>
        <div class="item"></div><div class="item"></div><div class="item"></div>
      </div>
    </main>
  </div>
</div>

<div class="dim">
  <section class="modal" role="dialog" aria-modal="true" aria-label="문의사항 상세">
    <div class="m-head">
      <div class="head-top">
        <div class="chips"><span class="chip c-red">긴급</span><span class="chip c-purple">설비 문의</span><span class="chip c-blue">처리 중</span></div>
        <button class="x" type="button" id="closeDetailInquiryBtn" aria-label="닫기">×</button>
      </div>
      <h2 class="m-title">냉장고 고장으로 긴급 수리 요청</h2>
      <div class="date">🗓 2026-03-29 08:30</div>
    </div>

    <div class="m-body">
      <div class="origin">오늘 아침 출근하여 확인한 결과 주방 냉장고가 작동하지 않는
것을 발견했습니다. 온도가 15도까지 올라가 있어 일부 식재료
의 폐기가 불가피할 것으로 보입니다.

긴급 수리를 요청드리며, 수리 기사 방문 일정을 알려주시기 바
랍니다. 또한 폐기 처리된 식재료에 대한 보상 절차도 안내 부탁
드립니다.</div>

      <h3 class="sec-title">답변 (1)</h3>
      <div class="reply">
        <div class="reply-top"><strong>본사 시설관리팀 (본사관리자)</strong><span>2026-03-29 09:15</span></div>
        <p>긴급 수리 요청 접수했습니다. 오늘 오후 2시에 수리 기사가 방문
할 예정입니다. 폐기 식재료 목록과 사진을 시스템에 등록해주시
면 보상 절차를 진행하겠습니다.</p>
      </div>

      <div class="write">
        <h3 class="write-title">답변 작성</h3>
        <textarea class="area" placeholder="추가 문의나 답변을 입력하세요..."></textarea>
        <div class="m-foot"><button class="btn" type="button" id="closeDetailInquiryBtn2">닫기</button><button class="btn green" type="button">✈ 답변 전송</button></div>
      </div>
    </div>
  </section>
</div>

  <script>
    (function () {
      function closePage() {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ type: 'close-inquiry-detail-modal' }, '*');
          return;
        }
        if (window.history.length > 1) {
          window.history.back();
          return;
        }
        window.location.href = '/branch/support/inquiry/main.jsp';
      }

      var closeBtn = document.getElementById('closeDetailInquiryBtn');
      var closeBtn2 = document.getElementById('closeDetailInquiryBtn2');
      if (closeBtn) closeBtn.addEventListener('click', closePage);
      if (closeBtn2) closeBtn2.addEventListener('click', closePage);
    })();
  </script>
</body>
</html>
