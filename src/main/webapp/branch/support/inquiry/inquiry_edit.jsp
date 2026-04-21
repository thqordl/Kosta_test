<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>문의사항 - 수정</title>
  <style>
    body { margin: 0; font-family: "Malgun Gothic", sans-serif; background: #f3f4f6; color: #111827; }
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

    .dim { position: fixed; inset: 0; background: rgba(17, 24, 39, 0.56); z-index: 1200; display: grid; place-items: center; padding: 16px; box-sizing: border-box; }
    .modal { width: min(760px, 100%); background: #fff; border: 1px solid #d1d5db; border-radius: 12px; overflow: hidden; box-shadow: 0 28px 58px rgba(15, 23, 42, 0.28); }
    .m-head { height: 66px; padding: 0 20px; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: space-between; }
    .m-title { margin: 0; font-size: 28px; font-weight: 900; letter-spacing: -0.02em; }
    .x { width: 32px; height: 32px; border: 0; border-radius: 999px; background: transparent; color: #6b7280; text-decoration: none; font-size: 22px; line-height: 32px; text-align: center; }
    .m-body { padding: 16px 24px 18px; }
    .field { margin-bottom: 12px; }
    .field label { display: block; margin-bottom: 6px; font-size: 14px; color: #374151; font-weight: 700; }
    .m-input, .m-select, .m-area { width: 100%; box-sizing: border-box; border: 0; border-radius: 10px; background: #f3f4f6; padding: 0 12px; color: #374151; font-size: 14px; }
    .m-input, .m-select { height: 40px; }
    .m-area { height: 138px; padding-top: 10px; resize: none; }
    .m-foot { border-top: 1px solid #e5e7eb; padding: 12px 24px; display: flex; justify-content: flex-end; gap: 8px; }
    .btn { height: 36px; padding: 0 16px; border-radius: 10px; border: 1px solid #d1d5db; background: #fff; color: #111827; font-size: 14px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; }
    .btn.green { background: #00853d; border-color: #00853d; color: #fff; }

    @media (max-width: 1200px) {
      .title { font-size: 34px; }
      .add-btn { font-size: 16px; }
      .k { font-size: 13px; }
      .v { font-size: 28px; }
      .input, .select { font-size: 14px; }
      .m-title { font-size: 28px; }
      .field label, .m-input, .m-select, .m-area, .btn { font-size: 14px; }
    }
    @media (max-width: 900px) {
      .stats { grid-template-columns: repeat(2, 1fr); }
      .filter-row { grid-template-columns: 1fr; }
    }
    @media (max-width: 760px) {
      .title { font-size: 28px; }
      .sub { font-size: 14px; }
      .stats { grid-template-columns: 1fr; }
      .m-title { font-size: 24px; }
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
  <section class="modal" role="dialog" aria-modal="true" aria-label="문의사항 수정">
    <div class="m-head">
      <h2 class="m-title">문의사항 수정</h2>
      <a class="x" href="/branch/support/inquiry/main.jsp">×</a>
    </div>
    <div class="m-body">
      <div class="field"><label>제목</label><input class="m-input" type="text" value="냉장고 고장으로 긴급 수리 요청" /></div>
      <div class="field"><label>카테고리</label><select class="m-select"><option selected>설비 문의</option><option>재고 문의</option><option>운영 건의</option><option>인사 문의</option><option>기타</option></select></div>
      <div class="field"><label>긴급도</label><select class="m-select"><option>일반</option><option selected>긴급</option></select></div>
      <div class="field" style="margin-bottom:0;"><label>내용</label><textarea class="m-area" placeholder="문의 내용을 입력하세요"></textarea></div>
    </div>
    <div class="m-foot"><a class="btn" href="/branch/support/inquiry/main.jsp">취소</a><a class="btn green" href="/branch/support/inquiry/main.jsp">수정</a></div>
  </section>
</div>
</body>
</html>
