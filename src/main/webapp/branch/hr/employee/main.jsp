<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>직원 정보 조회</title>
  <style>
    body { margin: 0; font-family: "Malgun Gothic", sans-serif; background: #f3f4f6; color: #111827; }
    .wrap {
    width: 100%; max-width: none; margin: 0; }
    .head { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; padding: 8px 0 14px; }
    .title { margin: 0; font-size: 34px; letter-spacing: -0.03em; }
    .sub { margin: 8px 0 0; font-size: 17px; color: #6b7280; }
    .add-btn { height: 44px; padding: 0 18px; border: 0; border-radius: 12px; background: #00853d; color: #fff; display: inline-flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 700; cursor: pointer; text-decoration: none; }
    .ico-18 { width: 18px; height: 18px; display: block; }

    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 16px; }
    .card { background: #fff; border: 1px solid #d1d5db; border-radius: 14px; padding: 16px; display: flex; align-items: center; gap: 12px; }
    .icon-box { width: 52px; height: 52px; border-radius: 12px; display: grid; place-items: center; }
    .b1 { background: #dcfce7; color: #16a34a; }
    .b2 { background: #dbeafe; color: #2563eb; }
    .b3 { background: #fef3c7; color: #ca8a04; }
    .k { font-size: 14px; color: #6b7280; }
    .v { margin-top: 2px; font-size: 30px; font-weight: 800; }

    .filters { background: #fff; border: 1px solid #d1d5db; border-radius: 14px; padding: 14px; margin-bottom: 14px; }
    .search-row { position: relative; margin-bottom: 12px; }
    .search-row .ico { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); width: 18px; height: 18px; color: #9ca3af; }
    .search-input { width: 100%; height: 44px; box-sizing: border-box; border: 1px solid #cbd5e1; border-radius: 12px; padding: 0 14px 0 44px; font-size: 15px; }
    .chip-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; color: #374151; font-size: 15px; }
    .chip-row strong { font-weight: 700; }
    .chip { height: 34px; border: 0; border-radius: 10px; padding: 0 12px; font-size: 13px; background: #e5e7eb; color: #374151; }
    .chip.active { background: #0a8b43; color: #fff; }
    .chip:focus-visible { outline: 2px solid #0a8b43; outline-offset: 1px; }

    .table-wrap { background: #fff; border: 1px solid #d1d5db; border-radius: 14px; overflow: hidden; }
    .table { width: 100%; border-collapse: collapse; }
    .table thead { background: #f8fafc; }
    .table th { text-align: left; padding: 14px 16px; color: #6b7280; font-size: 14px; font-weight: 700; border-bottom: 1px solid #e5e7eb; }
    .table td { padding: 16px; font-size: 14px; color: #111827; border-bottom: 1px solid #eef2f7; }
    .empty { height: 220px; text-align: center; color: #9ca3af; font-size: 14px; }

    .modal-overlay { position: fixed; inset: 0; background: transparent; display: none; align-items: center; justify-content: center; padding: 16px; box-sizing: border-box; z-index: 2000; }
    .modal-overlay.open { display: flex; }
    .modal-frame { width: min(820px, 100%); height: min(92vh, 920px); border: 0; border-radius: 16px; background: transparent; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.22); }
    .modal-close { position: absolute; top: 18px; right: 18px; width: 36px; height: 36px; border: 0; border-radius: 999px; background: #fff; color: #374151; font-size: 22px; line-height: 36px; cursor: pointer; z-index: 2001; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12); }


    @media (max-width: 1200px) {
      .title { font-size: 30px; }
      .sub { font-size: 18px; }
      .add-btn { height: 44px; font-size: 16px; }
      .k { font-size: 14px; }
      .v { font-size: 28px; }
      .search-input, .chip-row, .table th, .table td { font-size: 15px; }
      .chip { font-size: 13px; }
    }
    @media (max-width: 760px) {
      .title { font-size: 28px; }
      .sub { font-size: 14px; }
      .stats { grid-template-columns: 1fr; }
      .table-wrap { overflow-x: auto; }
      .table { min-width: 720px; }
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
            <h1 class="title">본사 및 지점별 직원 정보 통합 조회</h1>
            <p class="sub">전체 직원 정보를 통합하여 관리하세요</p>
          </div>
          <button class="add-btn" id="openAddEmployeeModal" type="button"><img class="ico-18" src="<%= request.getContextPath() %>/branch/icons/hr/plus.svg" alt="추가" />신규 직원 등록</button>
        </div>

        <section class="stats">
          <article class="card"><div class="icon-box b1"><img class="ico-18" src="<%= request.getContextPath() %>/branch/icons/hr/user.svg" alt="직원" /></div><div><div class="k">총 재직 인원</div><div class="v">0</div></div></article>
          <article class="card"><div class="icon-box b2"><img class="ico-18" src="<%= request.getContextPath() %>/branch/icons/hr/building.svg" alt="소속" /></div><div><div class="k">전체 소속</div><div class="v">1</div></div></article>
          <article class="card"><div class="icon-box b3"><img class="ico-18" src="<%= request.getContextPath() %>/branch/icons/hr/plus.svg" alt="신규" /></div><div><div class="k">이번 달 신규</div><div class="v">0</div></div></article>
        </section>

        <section class="filters">
          <div class="search-row">
            <img class="ico" src="<%= request.getContextPath() %>/branch/icons/hr/search.svg" alt="검색" />
            <input class="search-input" type="text" placeholder="이름, 연락처, 이메일로 검색..." />
          </div>
          <div class="chip-row">
            <img class="ico-18" src="<%= request.getContextPath() %>/branch/icons/hr/filter.svg" alt="필터" />
            <strong>소속:</strong>
            <button class="chip active" data-group="branch" type="button">전체</button>
            <button class="chip" data-group="branch" type="button">강남지점</button>
            <strong>상태:</strong>
            <button class="chip active" data-group="status" type="button">전체</button>
            <button class="chip" data-group="status" type="button">재직</button>
            <button class="chip" data-group="status" type="button">휴직</button>
            <button class="chip" data-group="status" type="button">퇴사</button>
          </div>
        </section>

        <section class="table-wrap">
          <table class="table">
            <thead>
              <tr><th>이름</th><th>소속</th><th>직급</th><th>연락처</th><th>상태</th><th>관리</th></tr>
            </thead>
            <tbody>
              <tr><td class="empty" colspan="6"></td></tr>
            </tbody>
          </table>
        </section>
      </div>
    </main>
  </div>
</div>

<div id="addEmployeeModal" class="modal-overlay" aria-hidden="true">
  <button class="modal-close" type="button" aria-label="닫기" id="closeAddEmployeeModal">×</button>
  <iframe class="modal-frame" src="about:blank" title="신규 직원 등록" id="addEmployeeFrame"></iframe>
</div>

<script>
  (function () {
    var openBtn = document.getElementById("openAddEmployeeModal");
    var overlay = document.getElementById("addEmployeeModal");
    var closeBtn = document.getElementById("closeAddEmployeeModal");
    var frame = document.getElementById("addEmployeeFrame");
    var pageUrl = "<%= request.getContextPath() %>/branch/hr/employee/add_employee.jsp";

    function openModal() {
      frame.src = pageUrl;
      overlay.classList.add("open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      overlay.classList.remove("open");
      overlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      frame.src = "about:blank";
    }

    openBtn.addEventListener("click", openModal);
    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) {
        closeModal();
      }
    });

    window.addEventListener("message", function (event) {
      if (event.data && event.data.type === "close-hr-modal") {
        closeModal();
      }
    });

    var chips = document.querySelectorAll(".chip[data-group]");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var group = chip.getAttribute("data-group");
        if (!group) {
          return;
        }
        var groupChips = document.querySelectorAll('.chip[data-group="' + group + '"]');
        groupChips.forEach(function (btn) {
          btn.classList.remove("active");
        });
        chip.classList.add("active");
      });
    });
  })();
</script>
</body>
</html>
