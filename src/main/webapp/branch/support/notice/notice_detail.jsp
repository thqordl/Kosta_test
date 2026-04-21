<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>운영지원 - 공지사항 상세</title>
  <style>
    body { margin: 0; font-family: "Malgun Gothic", sans-serif; background: #f3f4f6; color: #111827; }
    .wrap {
    width: 100%; max-width: none; margin: 0; }
    .head { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; padding: 8px 0 14px; }
    .title { margin: 0; font-size: 34px; letter-spacing: -0.03em; font-weight: 900; }
    .sub { margin: 8px 0 0; font-size: 15px; color: #6b7280; }

    .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 12px; }
    .stat { background: #fff; border: 1px solid #d7e8df; border-radius: 16px; padding: 14px 16px; display: flex; align-items: center; gap: 10px; }
    .stat-ico { width: 36px; height: 36px; border-radius: 11px; display: grid; place-items: center; font-size: 16px; }
    .i-blue { background: #dbeafe; color: #2563eb; }
    .i-red { background: #fee2e2; color: #dc2626; }
    .i-purple { background: #f3e8ff; color: #7c3aed; }
    .i-green { background: #dcfce7; color: #16a34a; }
    .stat .v { font-size: 28px; font-weight: 900; line-height: 1; }
    .stat .k { margin-top: 2px; font-size: 13px; color: #6b7280; }

    .filter { background: #fff; border: 1px solid #d7e8df; border-radius: 16px; padding: 14px; margin-bottom: 12px; }
    .filter-row { display: flex; align-items: center; gap: 10px; }
    .search { flex: 1; height: 48px; border: 0; border-radius: 12px; background: #f3f4f6; color: #374151; padding: 0 16px; font-size: 14px; box-sizing: border-box; }
    .chip { height: 34px; border: 1px solid #c9d4ce; border-radius: 10px; background: #fff; color: #374151; padding: 0 14px; font-size: 13px; font-weight: 700; }
    .chip.active { border-color: #00853d; background: #00853d; color: #fff; }

    .list-space { display: grid; gap: 12px; }
    .ghost-item { background: #fff; border: 1px solid #d7e8df; border-radius: 16px; min-height: 132px; }

    .dim { position: fixed; inset: 0; background: rgba(17, 24, 39, 0.56); z-index: 1200; display: grid; place-items: center; padding: 16px; box-sizing: border-box; }
    .modal { width: min(760px, 100%); background: #fff; border: 1px solid #d1d5db; border-radius: 12px; box-shadow: 0 28px 58px rgba(15, 23, 42, 0.28); }
    .m-body { padding: 14px 20px 18px; }
    .m-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 8px; }
    .pin { color: #7c3aed; font-size: 18px; margin-right: 4px; }
    .tag { height: 24px; padding: 0 10px; border-radius: 999px; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; background: #fee2e2; color: #dc2626; }
    .close { border: 0; background: transparent; color: #6b7280; font-size: 22px; text-decoration: none; line-height: 1; }
    .m-title { margin: 4px 0 8px; font-size: 28px; font-weight: 900; letter-spacing: -0.02em; }
    .meta { display: flex; gap: 14px; flex-wrap: wrap; color: #6b7280; font-size: 13px; margin-bottom: 14px; }
    .content { font-size: 14px; line-height: 1.48; color: #374151; white-space: pre-line; }
    .m-foot { display: flex; justify-content: flex-end; margin-top: 14px; }
    .btn { height: 38px; border: 1px solid #d1d5db; border-radius: 10px; background: #f9fafb; color: #111827; padding: 0 16px; font-size: 14px; text-decoration: none; display: inline-flex; align-items: center; }

    @media (max-width: 1200px) {
      .title { font-size: 34px; }
      .sub { font-size: 15px; }
      .stat .v { font-size: 28px; }
      .stat .k { font-size: 13px; }
      .search { font-size: 14px; }
      .chip { font-size: 13px; height: 34px; }
      .tag { font-size: 12px; height: 24px; }
      .m-title { font-size: 28px; }
      .meta { font-size: 13px; }
      .content { font-size: 14px; }
      .btn { font-size: 14px; }
    }
    @media (max-width: 900px) {
      .stats { grid-template-columns: repeat(2, 1fr); }
      .filter-row { flex-wrap: wrap; }
    }
    @media (max-width: 760px) {
      .title { font-size: 28px; }
      .sub { font-size: 14px; }
      .stats { grid-template-columns: 1fr; }
      .m-title { font-size: 22px; }
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
        <div class="head">
          <div>
            <h1 class="title">공지사항</h1>
            <p class="sub">본사에서 등록한 공지사항을 확인하세요.</p>
          </div>
        </div>

        <section class="stats">
          <article class="stat"><div class="stat-ico i-blue">🔔</div><div><div class="v">5건</div><div class="k">전체 공지</div></div></article>
          <article class="stat"><div class="stat-ico i-red">⦿</div><div><div class="v" style="color:#dc2626;">1건</div><div class="k">긴급 공지</div></div></article>
          <article class="stat"><div class="stat-ico i-purple">📌</div><div><div class="v" style="color:#7c3aed;">2건</div><div class="k">고정 공지</div></div></article>
          <article class="stat"><div class="stat-ico i-green">👁</div><div><div class="v" style="color:#16a34a;">104회</div><div class="k">평균 조회수</div></div></article>
        </section>

        <section class="filter">
          <div class="filter-row">
            <input class="search" type="text" placeholder="제목 또는 내용으로 검색..." />
            <button class="chip active" type="button">전체</button>
            <button class="chip" type="button">긴급 공지</button>
            <button class="chip" type="button">일반 공지</button>
            <button class="chip" type="button">위생 가이드</button>
            <button class="chip" type="button">운영 지침</button>
          </div>
        </section>

        <section class="list-space">
          <div class="ghost-item"></div>
          <div class="ghost-item"></div>
          <div class="ghost-item"></div>
        </section>
      </div>
    </main>
  </div>
</div>

<div class="dim">
  <section class="modal" role="dialog" aria-modal="true" aria-label="공지사항 상세">
    <div class="m-body">
      <div class="m-top">
        <div><span class="pin">📌</span><span class="tag">긴급 공지</span></div>
        <a class="close" href="/branch/support/notice/main.jsp" aria-label="닫기">×</a>
      </div>
      <h2 class="m-title">[긴급] 식품 안전 관리 강화 안내</h2>
      <div class="meta"><span>👤 본사 품질관리팀</span><span>🗓 2026-03-29 09:00</span><span>👁 조회 145회</span></div>
      <div class="content">최근 식품 안전 관리 점검 결과, 일부 지점에서 유통기한 관리가 미흡한 사례가 발견되었습니다. 모든 지점은 즉시 재고 점검을 실시하고, 유통기한이 임박한 제품은 즉시 폐기 처리 바랍니다.

특히 다음 사항을 준수해주시기 바랍니다:
1. 매일 오전 재고 점검 실시
2. 유통기한 7일 이내 제품 별도 관리
3. 폐기 처리 시 시스템 즉시 입력

문의사항은 본사 품질관리팀으로 연락 바랍니다.</div>
      <div class="m-foot"><a class="btn" href="/branch/support/notice/main.jsp">닫기</a></div>
    </div>
  </section>
</div>
</body>
</html>
