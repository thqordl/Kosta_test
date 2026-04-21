<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>운영지원 - 문의사항</title>
  <style>
    body { margin: 0; font-family: "Malgun Gothic", sans-serif; background: #f3f4f6; color: #111827; }
    .wrap {
    width: 100%; max-width: none; margin: 0; }
    .head { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; padding: 8px 0 14px; }
    .title { margin: 0; font-size: 34px; letter-spacing: -0.03em; font-weight: 900; }
    .sub { margin: 8px 0 0; font-size: 15px; color: #6b7280; }
    .add-btn { height: 44px; padding: 0 18px; border: 0; border-radius: 10px; background: #00853d; color: #fff; display: inline-flex; align-items: center; gap: 8px; font-size: 16px; font-weight: 700; cursor: pointer; text-decoration: none; }
    .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 12px; }
    .stat { background: #fff; border: 1px solid #d7e8df; border-radius: 16px; padding: 16px; display: flex; align-items: center; justify-content: space-between; }
    .stat .k { font-size: 13px; color: #6b7280; }
    .stat .v { margin-top: 5px; font-size: 28px; font-weight: 900; }
    .ico { width: 42px; height: 42px; border-radius: 12px; display: grid; place-items: center; font-size: 20px; }
    .i-blue { background: #dbeafe; color: #2563eb; }
    .i-yellow { background: #fef3c7; color: #b45309; }
    .i-green { background: #dcfce7; color: #16a34a; }

    .filter { background: #fff; border: 1px solid #d7e8df; border-radius: 16px; padding: 14px; margin-bottom: 12px; }
    .filter-row { display: grid; grid-template-columns: 1fr 220px 220px; gap: 10px; }
    .input,
    .select { width: 100%; height: 46px; box-sizing: border-box; border: 0; border-radius: 10px; background: #f3f4f6; color: #374151; padding: 0 14px; font-size: 14px; }

    .list { display: grid; gap: 12px; }
    .item { background: #fff; border: 1px solid #d7e8df; border-radius: 16px; padding: 16px; }
    .item-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
    .chips { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 6px; }
    .chip { height: 26px; padding: 0 10px; border-radius: 999px; font-size: 13px; font-weight: 700; display: inline-flex; align-items: center; }
    .c-red { background: #fee2e2; color: #dc2626; }
    .c-purple { background: #f3e8ff; color: #7c3aed; }
    .c-blue { background: #dbeafe; color: #2563eb; }
    .c-orange { background: #ffedd5; color: #c2410c; }
    .c-green { background: #dcfce7; color: #15803d; }
    .item-title { margin: 0; font-size: 20px; font-weight: 900; letter-spacing: -0.02em; }
    .item-title a { color: inherit; text-decoration: none; }
    .item-body { margin-top: 8px; font-size: 14px; color: #4b5563; line-height: 1.4; }
    .actions { display: flex; gap: 8px; }
    .act { width: 42px; height: 42px; border: 1px solid #d1d5db; border-radius: 10px; background: #f9fafb; text-decoration: none; color: #111827; font-size: 20px; display: grid; place-items: center; }
    .act.del { color: #dc2626; }
    .item-foot { margin-top: 12px; display: flex; align-items: center; justify-content: space-between; color: #6b7280; font-size: 13px; }

    .inquiry-dim { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.55); z-index: 1500; display: grid; place-items: center; padding: 16px; box-sizing: border-box; }
    .inquiry-dim.hidden { display: none; }
    .inquiry-modal { width: min(760px, 100%); background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.22); }
    .inquiry-m-body { padding: 16px 20px 18px; }
    .inquiry-m-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 8px; }
    .inquiry-pin { color: #7c3aed; font-size: 18px; margin-right: 4px; }
    .inquiry-modal-tag { height: 24px; padding: 0 10px; border-radius: 999px; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; }
    .close-inquiry { border: 0; background: transparent; color: #6b7280; font-size: 22px; line-height: 1; cursor: pointer; }
    .inquiry-m-title { margin: 4px 0 8px; font-size: 24px; font-weight: 900; letter-spacing: -0.02em; }
    .inquiry-meta { display: flex; gap: 14px; flex-wrap: wrap; color: #6b7280; font-size: 13px; margin-bottom: 14px; }
    .inquiry-content { font-size: 14px; line-height: 1.48; color: #374151; white-space: pre-line; }
    .inquiry-m-foot { display: flex; justify-content: flex-end; margin-top: 14px; gap: 8px; }
    .inquiry-btn { height: 38px; border: 1px solid #d1d5db; border-radius: 10px; background: #f9fafb; color: #111827; padding: 0 16px; font-size: 14px; display: inline-flex; align-items: center; cursor: pointer; }

    .modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.34); z-index: 1500; display: none; align-items: center; justify-content: center; padding: 16px; box-sizing: border-box; }
    .modal-overlay.open { display: flex; }
    .modal-frame { width: min(820px, 100%); height: min(92vh, 920px); border: 0; border-radius: 16px; background: transparent; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.22); }
    .modal-close { position: absolute; top: 18px; right: 18px; width: 36px; height: 36px; border: 0; border-radius: 999px; background: #fff; color: #374151; font-size: 22px; line-height: 36px; cursor: pointer; z-index: 1501; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12); }

    body.modal-open { overflow: hidden; }

    @media (max-width: 1200px) {
      .title { font-size: 34px; }
      .add-btn { font-size: 16px; }
      .stat .k { font-size: 13px; }
      .stat .v { font-size: 28px; }
      .input, .select { font-size: 14px; }
      .chip { font-size: 13px; height: 26px; }
      .item-title { font-size: 20px; }
      .item-body { font-size: 14px; }
      .item-foot { font-size: 13px; }
    }
    @media (max-width: 900px) {
      .stats { grid-template-columns: repeat(2, 1fr); }
      .filter-row { grid-template-columns: 1fr; }
    }
    @media (max-width: 760px) {
      .title { font-size: 28px; }
      .sub { font-size: 14px; }
      .stats { grid-template-columns: 1fr; }
      .item-top { flex-direction: column; }
      .actions { align-self: flex-end; }
      .inquiry-m-title { font-size: 22px; }
      .inquiry-modal { width: 100%; }
      .inquiry-dim { padding: 8px; }
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
            <h1 class="title">문의사항</h1>
            <p class="sub">본사에 문의사항이나 건의사항을 전달할 수 있습니다.</p>
          </div>
          <a id="openInquiryModal" class="add-btn" href="#">＋ 문의하기</a>
        </div>

        <section class="stats">
          <article class="stat"><div><div class="k">전체 문의</div><div class="v">3건</div></div><div class="ico i-blue">💬</div></article>
          <article class="stat"><div><div class="k">대기 중</div><div class="v" style="color:#b45309;">1건</div></div><div class="ico i-yellow">🕒</div></article>
          <article class="stat"><div><div class="k">처리 중</div><div class="v" style="color:#2563eb;">1건</div></div><div class="ico i-blue">◔</div></article>
          <article class="stat"><div><div class="k">답변 완료</div><div class="v" style="color:#16a34a;">1건</div></div><div class="ico i-green">✓</div></article>
        </section>

        <section class="filter">
          <div class="filter-row">
            <input class="input" type="text" placeholder="제목 또는 내용으로 검색..." />
            <select class="select"><option>전체</option><option>설비 문의</option><option>재고 문의</option><option>운영 건의</option><option>인사 문의</option><option>기타</option></select>
            <select class="select"><option>전체</option><option>대기 중</option><option>처리 중</option><option>답변 완료</option></select>
          </div>
        </section>

        <section class="list">
          <article class="item">
            <div class="item-top">
              <div style="flex:1; min-width:0;">
                <div class="chips">
                  <span class="chip c-red">긴급</span>
                  <span class="chip c-purple">설비 문의</span>
                  <span class="chip c-blue">처리 중</span>
                  <h2 class="item-title"><a class="open-detail-modal" href="/branch/support/inquiry/inquiry_detail.jsp">냉장고 고장으로 긴급 수리 요청</a></h2>
                </div>
                <div class="item-body">오늘 아침 출근하여 확인한 결과 주방 냉장고가 작동하지 않는 것을 발견했습니다. 온도가 15도까지 올라가 있어 일부 식재료의 폐기가 불가피할 것으로 보입니다. 긴급 수리를 요청드리며, 수리 기사 방문 일정을 알려주시기 바랍니다. 또한 폐기 처리된 식재료에 대한 보상 절차도 안내 부탁드립니다.</div>
              </div>
              <div class="actions">
                <a class="act open-edit-modal" href="/branch/support/inquiry/inquiry_edit.jsp" data-title="냉장고 고장으로 긴급 수리 요청" data-category="설비 문의" data-urgency="긴급" data-content="오늘 아침 출근하여 확인한 결과 주방 냉장고가 작동하지 않는 것을 발견했습니다. 온도가 15도까지 올라가 있어 일부 식재료의 폐기가 불가피할 것으로 보입니다. 긴급 수리를 요청드리며, 수리 기사 방문 일정을 알려주시기 바랍니다. 또한 폐기 처리된 식재료에 대한 보상 절차도 안내 부탁드립니다.">✎</a>
                <a class="act del" href="#">🗑</a>
              </div>
            </div>
            <div class="item-foot"><span>🗓 2026-03-29 08:30</span><span>답변 1개</span></div>
          </article>

          <article class="item">
            <div class="item-top">
              <div style="flex:1; min-width:0;">
                <div class="chips">
                  <span class="chip c-orange">재고 문의</span>
                  <span class="chip c-green">답변 완료</span>
                  <h2 class="item-title">신메뉴 재료 발주 수량 조정 건의</h2>
                </div>
                <div class="item-body">4월 신메뉴 출시를 앞두고 재료 발주 수량에 대해 건의드립니다. 저희 지점은 젊은 고객층이 많아 신메뉴에 대한 수요가 높을 것으로 예상됩니다. 현재 배정된 수량보다 30% 정도 추가 발주가 필요할 것 같습니다. 검토 부탁드립니다.</div>
              </div>
              <div class="actions">
                <a class="act open-edit-modal" href="/branch/support/inquiry/inquiry_edit.jsp" data-title="신메뉴 재료 발주 수량 조정 건의" data-category="재고 문의" data-urgency="일반" data-content="4월 신메뉴 출시를 앞두고 재료 발주 수량에 대해 건의드립니다. 저희 지점은 젊은 고객층이 많아 신메뉴에 대한 수요가 높을 것으로 예상됩니다. 현재 배정된 수량보다 30% 정도 추가 발주가 필요할 것 같습니다. 검토 부탁드립니다.">✎</a>
                <a class="act del" href="#">🗑</a>
              </div>
            </div>
            <div class="item-foot"><span>🗓 2026-03-28 16:20</span><span>답변 1개</span></div>
          </article>

          <article class="item">
            <div class="item-top">
              <div style="flex:1; min-width:0;">
                <div class="chips">
                  <span class="chip c-purple">설비 문의</span>
                  <span class="chip c-yellow" style="background:#fef3c7; color:#b45309;">대기 중</span>
                  <h2 class="item-title">매장 리모델링 일정 문의</h2>
                </div>
                <div class="item-body">매장 노후화로 인해 리모델링이 필요한 상황입니다. 특히 고객 좌석과 주방 설비 교체가 시급합니다. 올해 리모델링 일정이 있는지, 있다면 언제쯤 가능한지 문의드립니다.</div>
              </div>
              <div class="actions">
                <a class="act open-edit-modal" href="/branch/support/inquiry/inquiry_edit.jsp" data-title="매장 리모델링 일정 문의" data-category="설비 문의" data-urgency="일반" data-content="매장 노후화로 인해 리모델링이 필요한 상황입니다. 특히 고객 좌석과 주방 설비 교체가 시급합니다. 올해 리모델링 일정이 있는지, 있다면 언제쯤 가능한지 문의드립니다.">✎</a>
                <a class="act del" href="#">🗑</a>
              </div>
            </div>
            <div class="item-foot"><span>🗓 2026-03-27 14:10</span><span>답변 0개</span></div>
          </article>
        </section>
      </div>
    </main>
  </div>
</div>

<div id="detailInquiryModal" class="modal-overlay" aria-hidden="true">
  <button class="modal-close" type="button" aria-label="닫기" id="closeDetailInquiryModal">×</button>
  <iframe class="modal-frame" src="about:blank" title="문의사항 상세" id="detailInquiryFrame"></iframe>
</div>

<div id="inquiryDetailModal" class="inquiry-dim hidden" aria-hidden="true">
  <section class="inquiry-modal" role="dialog" aria-modal="true" aria-label="문의하기" onclick="event.stopPropagation();">
    <div class="inquiry-m-body">
      <div class="inquiry-m-top">
        <div><span class="inquiry-pin">📌</span><span id="inquiryModalTag" class="inquiry-modal-tag c-purple">문의하기</span></div>
        <button id="closeInquiryModalX" class="close-inquiry" type="button" aria-label="닫기">×</button>
      </div>
      <h2 id="inquiryModalTitle" class="inquiry-m-title">문의하기</h2>
      <div class="inquiry-meta">
        <span>👤 본사 운영지원팀</span>
        <span>🗓 새 문의 등록</span>
        <span>👁 작성 전</span>
      </div>
      <div class="field"><label>제목</label><input id="inquiryTitleInput" class="input" type="text" placeholder="문의 제목을 입력하세요" /></div>
      <div class="field"><label>카테고리</label><select id="inquiryCategoryInput" class="select"><option></option><option>설비 문의</option><option>재고 문의</option><option>운영 건의</option><option>인사 문의</option><option>기타</option></select></div>
      <div class="field"><label>긴급도</label><select id="inquiryUrgencyInput" class="select"><option>일반</option><option>긴급</option></select></div>
      <div class="field" style="margin-bottom:0;"><label>내용</label><textarea id="inquiryContentInput" class="select" style="height:180px; padding-top:10px; resize:none;" placeholder="문의 내용을 입력하세요"></textarea></div>
      <div class="inquiry-m-foot"><button id="closeInquiryModalBtn" class="inquiry-btn" type="button">닫기</button><button id="submitInquiryModal" class="inquiry-btn" type="button">등록</button></div>
    </div>
  </section>
</div>

<div id="editInquiryModalDim" class="dim hidden" aria-hidden="true">
  <section class="modal" role="dialog" aria-modal="true" aria-label="문의사항 수정" onclick="event.stopPropagation();">
    <div class="m-head">
      <div class="m-head-row">
        <div>
          <h2 class="m-title">문의사항 수정</h2>
          <p class="m-subtitle">기존 문의 내용을 수정하세요</p>
        </div>
        <button id="closeEditModalX" class="x" type="button" aria-label="닫기">×</button>
      </div>
    </div>
    <div class="m-body">
      <div class="field"><label>제목</label><input id="editInquiryTitle" class="m-input" type="text" /></div>
      <div class="field"><label>카테고리</label><select id="editInquiryCategory" class="m-select"><option>설비 문의</option><option>재고 문의</option><option>운영 건의</option><option>인사 문의</option><option>기타</option></select></div>
      <div class="field"><label>긴급도</label><select id="editInquiryUrgency" class="m-select"><option>일반</option><option>긴급</option></select></div>
      <div class="field" style="margin-bottom:0;"><label>내용</label><textarea id="editInquiryContent" class="m-area" placeholder="문의 내용을 입력하세요"></textarea></div>
    </div>
    <div class="m-foot">
      <button id="closeEditModalCancel" class="btn" type="button">취소</button>
      <button id="submitEditModal" class="btn green" type="button">수정</button>
    </div>
  </section>
</div>

<script>
  (function () {
    var openBtn = document.getElementById('openInquiryModal');
    var inquiryDim = document.getElementById('inquiryDetailModal');
    var closeInquiryBtnX = document.getElementById('closeInquiryModalX');
    var closeInquiryBtn = document.getElementById('closeInquiryModalBtn');
    var submitInquiryBtn = document.getElementById('submitInquiryModal');
    var inquiryTitleInput = document.getElementById('inquiryTitleInput');
    var inquiryCategoryInput = document.getElementById('inquiryCategoryInput');
    var inquiryUrgencyInput = document.getElementById('inquiryUrgencyInput');
    var inquiryContentInput = document.getElementById('inquiryContentInput');
    var editDim = document.getElementById('editInquiryModalDim');
    var closeEditBtnX = document.getElementById('closeEditModalX');
    var closeEditBtnCancel = document.getElementById('closeEditModalCancel');
    var submitEditBtn = document.getElementById('submitEditModal');
    var editOpenButtons = document.querySelectorAll('.open-edit-modal');
    var detailOpenButtons = document.querySelectorAll('.open-detail-modal');
    var editTitleInput = document.getElementById('editInquiryTitle');
    var editCategorySelect = document.getElementById('editInquiryCategory');
    var editUrgencySelect = document.getElementById('editInquiryUrgency');
    var editContentInput = document.getElementById('editInquiryContent');
    var detailOverlay = document.getElementById('detailInquiryModal');
    var detailFrame = document.getElementById('detailInquiryFrame');
    var closeDetailBtn = document.getElementById('closeDetailInquiryModal');

    if (!openBtn || !inquiryDim || !editDim || !detailOverlay || !detailFrame) return;

    function openInquiryModal() {
      inquiryDim.classList.remove('hidden');
      inquiryDim.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    }

    function closeInquiryModal() {
      inquiryDim.classList.add('hidden');
      inquiryDim.setAttribute('aria-hidden', 'true');
      if (editDim.classList.contains('hidden')) {
        document.body.classList.remove('modal-open');
      }
    }

    function openEditModal(sourceButton) {
      if (sourceButton && editTitleInput && editCategorySelect && editUrgencySelect && editContentInput) {
        editTitleInput.value = sourceButton.getAttribute('data-title') || '';
        editCategorySelect.value = sourceButton.getAttribute('data-category') || '기타';
        editUrgencySelect.value = sourceButton.getAttribute('data-urgency') || '일반';
        editContentInput.value = sourceButton.getAttribute('data-content') || '';
      }
      editDim.classList.remove('hidden');
      editDim.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    }

    function closeEditModal() {
      editDim.classList.add('hidden');
      editDim.setAttribute('aria-hidden', 'true');
      if (inquiryDim.classList.contains('hidden')) {
        document.body.classList.remove('modal-open');
      }
    }

    function openDetailModal(sourceButton) {
      var href = sourceButton ? sourceButton.getAttribute('href') : '/branch/support/inquiry/inquiry_detail.jsp';
      detailFrame.src = href || '/branch/support/inquiry/inquiry_detail.jsp';
      detailOverlay.classList.add('open');
      detailOverlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    }

    function closeDetailModal() {
      detailOverlay.classList.remove('open');
      detailOverlay.setAttribute('aria-hidden', 'true');
      detailFrame.src = 'about:blank';
      if (inquiryDim.classList.contains('hidden') && editDim.classList.contains('hidden')) {
        document.body.classList.remove('modal-open');
      }
    }

    openBtn.addEventListener('click', function (event) {
      event.preventDefault();
      openInquiryModal();
    });

    for (var i = 0; i < editOpenButtons.length; i += 1) {
      editOpenButtons[i].addEventListener('click', function (event) {
        event.preventDefault();
        openEditModal(event.currentTarget);
      });
    }

    for (var j = 0; j < detailOpenButtons.length; j += 1) {
      detailOpenButtons[j].addEventListener('click', function (event) {
        event.preventDefault();
        openDetailModal(event.currentTarget);
      });
    }

    inquiryDim.addEventListener('click', closeInquiryModal);
    editDim.addEventListener('click', closeEditModal);
    detailOverlay.addEventListener('click', function (event) {
      if (event.target === detailOverlay) {
        closeDetailModal();
      }
    });
    if (closeInquiryBtnX) closeInquiryBtnX.addEventListener('click', closeInquiryModal);
    if (closeInquiryBtn) closeInquiryBtn.addEventListener('click', closeInquiryModal);
    if (submitInquiryBtn) submitInquiryBtn.addEventListener('click', closeInquiryModal);
    if (closeEditBtnX) closeEditBtnX.addEventListener('click', closeEditModal);
    if (closeEditBtnCancel) closeEditBtnCancel.addEventListener('click', closeEditModal);
    if (submitEditBtn) submitEditBtn.addEventListener('click', closeEditModal);
    if (closeDetailBtn) closeDetailBtn.addEventListener('click', closeDetailModal);

    window.addEventListener('message', function (event) {
      if (event.data && event.data.type === 'close-inquiry-detail-modal') {
        closeDetailModal();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        if (!inquiryDim.classList.contains('hidden')) {
          closeInquiryModal();
        }
        if (!editDim.classList.contains('hidden')) {
          closeEditModal();
        }
        if (detailOverlay.classList.contains('open')) {
          closeDetailModal();
        }
      }
    });
  })();
</script>
</body>
</html>
