<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>운영지원 - 공지사항</title>
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
    .filter-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .search { flex: 1; min-width: 220px; height: 48px; border: 0; border-radius: 12px; background: #f3f4f6; color: #374151; padding: 0 16px; font-size: 14px; box-sizing: border-box; }
    .chip { height: 34px; border: 1px solid #c9d4ce; border-radius: 10px; background: #fff; color: #374151; padding: 0 14px; font-size: 13px; font-weight: 700; cursor: pointer; }
    .chip.active { border-color: #00853d; background: #00853d; color: #fff; }

    .list { display: grid; gap: 12px; }
    .item { background: #fff; border: 1px solid #d7e8df; border-radius: 16px; padding: 16px 18px; }
    .item-top { display: flex; align-items: center; gap: 8px; margin-bottom: 7px; }
    .pin { color: #7c3aed; font-size: 18px; }
    .tag { height: 24px; padding: 0 10px; border-radius: 999px; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; }
    .t-red { background: #fee2e2; color: #dc2626; }
    .t-purple { background: #f3e8ff; color: #7c3aed; }
    .t-blue { background: #dbeafe; color: #2563eb; }
    .t-gray { background: #f3f4f6; color: #4b5563; }
    .item-title { margin: 0; font-size: 20px; font-weight: 900; letter-spacing: -0.02em; }
    .item-title a { color: inherit; text-decoration: none; }
    .item-body { margin-top: 8px; font-size: 14px; color: #4b5563; line-height: 1.38; }
    .item-foot { margin-top: 10px; display: flex; gap: 14px; flex-wrap: wrap; color: #6b7280; font-size: 13px; }

    .pager { margin-top: 14px; display: flex; align-items: center; justify-content: space-between; }
    .pager-btn { height: 36px; border: 1px solid #d1d5db; border-radius: 10px; background: #fff; color: #6b7280; padding: 0 12px; font-size: 14px; }
    .pager-no { font-size: 14px; color: #6b7280; }

    .notice-dim { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.55); z-index: 1400; display: grid; place-items: center; padding: 16px; box-sizing: border-box; }
    .notice-dim.hidden { display: none; }
    .notice-modal { width: min(760px, 100%); background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.22); }
    .notice-m-body { padding: 16px 20px 18px; }
    .notice-m-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 8px; }
    .notice-pin { color: #7c3aed; font-size: 18px; margin-right: 4px; }
    .notice-modal-tag { height: 24px; padding: 0 10px; border-radius: 999px; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; }
    .close-notice { border: 0; background: transparent; color: #6b7280; font-size: 22px; line-height: 1; cursor: pointer; }
    .notice-m-title { margin: 4px 0 8px; font-size: 24px; font-weight: 900; letter-spacing: -0.02em; }
    .notice-meta { display: flex; gap: 14px; flex-wrap: wrap; color: #6b7280; font-size: 13px; margin-bottom: 14px; }
    .notice-content { font-size: 14px; line-height: 1.48; color: #374151; white-space: pre-line; }
    .notice-m-foot { display: flex; justify-content: flex-end; margin-top: 14px; }
    .notice-btn { height: 38px; border: 1px solid #d1d5db; border-radius: 10px; background: #f9fafb; color: #111827; padding: 0 16px; font-size: 14px; display: inline-flex; align-items: center; cursor: pointer; }
    body.modal-open { overflow: hidden; }

    @media (max-width: 1200px) {
      .title { font-size: 34px; }
      .sub { font-size: 15px; }
      .stat .v { font-size: 28px; }
      .stat .k { font-size: 13px; }
      .search { font-size: 14px; }
      .chip { font-size: 13px; height: 34px; }
      .tag { font-size: 12px; height: 24px; }
      .item-title { font-size: 20px; }
      .item-body { font-size: 14px; }
      .item-foot { font-size: 13px; }
      .pager-btn, .pager-no { font-size: 14px; }
    }
    @media (max-width: 900px) {
      .stats { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 760px) {
      .title { font-size: 28px; }
      .sub { font-size: 14px; }
      .stats { grid-template-columns: 1fr; }
      .search { width: 100%; }
      .pager { gap: 8px; }
      .notice-m-title { font-size: 22px; }
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
            <button class="chip active" type="button" data-filter="all">전체</button>
            <button class="chip" type="button" data-filter="긴급 공지">긴급 공지</button>
            <button class="chip" type="button" data-filter="일반 공지">일반 공지</button>
            <button class="chip" type="button" data-filter="위생 가이드">위생 가이드</button>
            <button class="chip" type="button" data-filter="운영 지침">운영 지침</button>
          </div>
        </section>

        <section class="list">
          <article class="item" data-category="긴급 공지">
            <div class="item-top"><span class="pin">📌</span><span class="tag t-red">긴급 공지</span></div>
            <h2 class="item-title"><a class="open-notice-modal" href="/branch/support/notice/notice_detail.jsp" data-title="[긴급] 식품 안전 관리 강화 안내" data-category="긴급 공지" data-author="본사 품질관리팀" data-date="2026-03-29 09:00" data-views="145" data-content="최근 식품 안전 관리 점검 결과, 일부 지점에서 유통기한 관리가 미흡한 사례가 발견되었습니다. 모든 지점은 즉시 재고 점검을 실시하고, 유통기한이 임박한 제품은 즉시 폐기 처리 바랍니다.&#10;&#10;특히 다음 사항을 준수해주시기 바랍니다:&#10;1. 매일 오전 재고 점검 실시&#10;2. 유통기한 7일 이내 제품 별도 관리&#10;3. 폐기 처리 시 시스템 즉시 입력&#10;&#10;문의사항은 본사 품질관리팀으로 연락 바랍니다.">[긴급] 식품 안전 관리 강화 안내</a></h2>
            <div class="item-body">최근 식품 안전 관리 점검 결과, 일부 지점에서 유통기한 관리가 미흡한 사례가 발견되었습니다. 모든 지점은 즉시 재고 점검을 실시하고, 유통기한이 임박한 제품은 즉시 폐기 처리 바랍니다. 특히 다음 사항을 준수해주시기 바랍니다: 1. 매일 오전 재고 점검 실시 2. 유통기한 7일 이내 제품 별도 관리 3. 폐기 처리 시 시스템 즉시 입력 문의사항은 본사 품질관리팀으로 연락 바랍니다.</div>
            <div class="item-foot"><span>👤 본사 품질관리팀</span><span>🗓 2026-03-29 09:00</span><span>👁 조회 145회</span></div>
          </article>

          <article class="item" data-category="운영 지침">
            <div class="item-top"><span class="pin">📌</span><span class="tag t-purple">운영 지침</span></div>
            <h2 class="item-title"><a class="open-notice-modal" href="/branch/support/notice/notice_detail.jsp" data-title="4월 신메뉴 출시 안내 및 레시피 교육 일정" data-category="운영 지침" data-author="본사 메뉴개발팀" data-date="2026-03-28 14:30" data-views="98" data-content="4월 1일부터 신메뉴 3종이 출시됩니다. 각 지점은 레시피 교육을 필수로 이수해주시기 바랍니다.&#10;&#10;신메뉴:&#10;- 프리미엄 불고기버거&#10;- 매콤 치즈 치킨버거&#10;- 시그니처 샐러드&#10;&#10;교육 일정은 별도 공지 예정입니다.">4월 신메뉴 출시 안내 및 레시피 교육 일정</a></h2>
            <div class="item-body">4월 1일부터 신메뉴 3종이 출시됩니다. 각 지점은 레시피 교육을 필수로 이수해주시기 바랍니다. 신메뉴: - 프리미엄 불고기버거 - 매콤 치즈 치킨버거 - 시그니처 샐러드 교육 일정은 별도 공지 예정입니다.</div>
            <div class="item-foot"><span>👤 본사 메뉴개발팀</span><span>🗓 2026-03-28 14:30</span><span>👁 조회 98회</span></div>
          </article>

          <article class="item" data-category="위생 가이드">
            <div class="item-top"><span class="tag t-blue">위생 가이드</span></div>
            <h2 class="item-title"><a class="open-notice-modal" href="/branch/support/notice/notice_detail.jsp" data-title="주방 위생 관리 체크리스트 업데이트" data-category="위생 가이드" data-author="본사 위생관리팀" data-date="2026-03-27 10:15" data-views="76" data-content="주방 위생 관리 체크리스트가 업데이트되었습니다. 새로운 체크리스트는 시스템에서 다운로드 가능합니다.&#10;&#10;주요 변경사항:&#10;- 조리 기구 소독 주기 변경 (4시간 → 3시간)&#10;- 냉장고/냉동고 온도 체크 주기 강화&#10;- 바닥 청소 시간 추가">주방 위생 관리 체크리스트 업데이트</a></h2>
            <div class="item-body">주방 위생 관리 체크리스트가 업데이트되었습니다. 새로운 체크리스트는 시스템에서 다운로드 가능합니다. 주요 변경사항: - 조리 기구 소독 주기 변경 (4시간 → 3시간) - 냉장고/냉동고 온도 체크 주기 강화 - 바닥 청소 시간 추가</div>
            <div class="item-foot"><span>👤 본사 위생관리팀</span><span>🗓 2026-03-27 10:15</span><span>👁 조회 76회</span></div>
          </article>

          <article class="item" data-category="일반 공지">
            <div class="item-top"><span class="tag t-gray">일반 공지</span></div>
            <h2 class="item-title"><a class="open-notice-modal" href="/branch/support/notice/notice_detail.jsp" data-title="2026년 1분기 우수 지점 선정 결과" data-category="일반 공지" data-author="본사 경영지원팀" data-date="2026-03-26 16:00" data-views="112" data-content="2026년 1분기 우수 지점 선정 결과를 안내드립니다.&#10;&#10;최우수 지점: 강남본점&#10;우수 지점: 홍대점, 부산해운대점&#10;&#10;수상 지점에는 포상금이 지급되며, 우수 사례는 전 지점에 공유될 예정입니다.">2026년 1분기 우수 지점 선정 결과</a></h2>
            <div class="item-body">2026년 1분기 우수 지점 선정 결과를 안내드립니다. 최우수 지점: 강남본점 우수 지점: 홍대점, 부산해운대점 수상 지점에는 포상금이 지급되며, 우수 사례는 전 지점에 공유될 예정입니다.</div>
            <div class="item-foot"><span>👤 본사 경영지원팀</span><span>🗓 2026-03-26 16:00</span><span>👁 조회 112회</span></div>
          </article>

          <article class="item" data-category="위생 가이드">
            <div class="item-top"><span class="tag t-blue">위생 가이드</span></div>
            <h2 class="item-title"><a class="open-notice-modal" href="/branch/support/notice/notice_detail.jsp" data-title="손 씻기 및 개인위생 관리 강화" data-category="위생 가이드" data-author="본사 위생관리팀" data-date="2026-03-25 11:20" data-views="89" data-content="모든 직원은 다음 위생 수칙을 철저히 준수해주시기 바랍니다:&#10;1. 출근 시 손 씻기 필수&#10;2. 조리 전/후 손 소독&#10;3. 장갑 착용 의무화&#10;4. 두발 및 복장 규정 준수&#10;&#10;위반 시 경고 조치됩니다.">손 씻기 및 개인위생 관리 강화</a></h2>
            <div class="item-body">모든 직원은 다음 위생 수칙을 철저히 준수해주시기 바랍니다: 1. 출근 시 손 씻기 필수 2. 조리 전/후 손 소독 3. 장갑 착용 의무화 4. 두발 및 복장 규정 준수 위반 시 경고 조치됩니다.</div>
            <div class="item-foot"><span>👤 본사 위생관리팀</span><span>🗓 2026-03-25 11:20</span><span>👁 조회 89회</span></div>
          </article>
        </section>

        <div class="pager"><button class="pager-btn" disabled>‹ 이전</button><div class="pager-no">1 / 1</div><button class="pager-btn" disabled>다음 ›</button></div>
      </div>
    </main>
  </div>
</div>

<div id="noticeDetailModal" class="notice-dim hidden" aria-hidden="true">
  <section class="notice-modal" role="dialog" aria-modal="true" aria-label="공지사항 상세" onclick="event.stopPropagation();">
    <div class="notice-m-body">
      <div class="notice-m-top">
        <div><span class="notice-pin">📌</span><span id="noticeModalTag" class="notice-modal-tag"></span></div>
        <button id="closeNoticeModalX" class="close-notice" type="button" aria-label="닫기">×</button>
      </div>
      <h2 id="noticeModalTitle" class="notice-m-title"></h2>
      <div class="notice-meta"><span id="noticeModalAuthor"></span><span id="noticeModalDate"></span><span id="noticeModalViews"></span></div>
      <div id="noticeModalContent" class="notice-content"></div>
      <div class="notice-m-foot"><button id="closeNoticeModalBtn" class="notice-btn" type="button">닫기</button></div>
    </div>
  </section>
</div>

<script>
  (function () {
    var filterButtons = document.querySelectorAll('.filter .chip');
    var noticeItems = document.querySelectorAll('.list .item');
    var noticeLinks = document.querySelectorAll('.open-notice-modal');
    var detailModal = document.getElementById('noticeDetailModal');
    var detailCloseX = document.getElementById('closeNoticeModalX');
    var detailCloseBtn = document.getElementById('closeNoticeModalBtn');
    var modalTag = document.getElementById('noticeModalTag');
    var modalTitle = document.getElementById('noticeModalTitle');
    var modalAuthor = document.getElementById('noticeModalAuthor');
    var modalDate = document.getElementById('noticeModalDate');
    var modalViews = document.getElementById('noticeModalViews');
    var modalContent = document.getElementById('noticeModalContent');

    var categoryTagClassMap = {
      '긴급 공지': 't-red',
      '운영 지침': 't-purple',
      '위생 가이드': 't-blue',
      '일반 공지': 't-gray'
    };

    function applyFilter(filterValue) {
      for (var i = 0; i < noticeItems.length; i += 1) {
        var category = noticeItems[i].getAttribute('data-category');
        noticeItems[i].style.display = (filterValue === 'all' || category === filterValue) ? '' : 'none';
      }
    }

    for (var i = 0; i < filterButtons.length; i += 1) {
      filterButtons[i].addEventListener('click', function () {
        var selected = this.getAttribute('data-filter') || 'all';
        for (var j = 0; j < filterButtons.length; j += 1) {
          filterButtons[j].classList.remove('active');
        }
        this.classList.add('active');
        applyFilter(selected);
      });
    }

    function openDetailModal(linkElement) {
      if (!detailModal || !linkElement) return;
      var category = linkElement.getAttribute('data-category') || '일반 공지';
      var title = linkElement.getAttribute('data-title') || '';
      var author = linkElement.getAttribute('data-author') || '';
      var date = linkElement.getAttribute('data-date') || '';
      var views = linkElement.getAttribute('data-views') || '0';
      var content = linkElement.getAttribute('data-content') || '';
      var mappedClass = categoryTagClassMap[category] || 't-gray';

      if (modalTag) {
        modalTag.className = 'notice-modal-tag ' + mappedClass;
        modalTag.textContent = category;
      }
      if (modalTitle) modalTitle.textContent = title;
      if (modalAuthor) modalAuthor.textContent = '👤 ' + author;
      if (modalDate) modalDate.textContent = '🗓 ' + date;
      if (modalViews) modalViews.textContent = '👁 조회 ' + views + '회';
      if (modalContent) modalContent.textContent = content;

      detailModal.classList.remove('hidden');
      detailModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    }

    function closeDetailModal() {
      if (!detailModal) return;
      detailModal.classList.add('hidden');
      detailModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    }

    for (var k = 0; k < noticeLinks.length; k += 1) {
      noticeLinks[k].addEventListener('click', function (event) {
        event.preventDefault();
        openDetailModal(event.currentTarget);
      });
    }

    if (detailModal) detailModal.addEventListener('click', closeDetailModal);
    if (detailCloseX) detailCloseX.addEventListener('click', closeDetailModal);
    if (detailCloseBtn) detailCloseBtn.addEventListener('click', closeDetailModal);

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && detailModal && !detailModal.classList.contains('hidden')) {
        closeDetailModal();
      }
    });
  })();
</script>
</body>
</html>
