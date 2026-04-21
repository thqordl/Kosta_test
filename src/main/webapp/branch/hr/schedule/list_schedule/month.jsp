<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>직원 일정 관리 - 월간 목록</title>
  <style>
    body { margin: 0; font-family: "Malgun Gothic", sans-serif; background: #f3f4f6; color: #111827; }
    .wrap {
    width: 100%; max-width: none; margin: 0; }
    .head { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; padding: 8px 0 14px; }
    .title { margin: 0; font-size: 34px; letter-spacing: -0.03em; }
    .sub { margin: 8px 0 0; font-size: 17px; color: #6b7280; }
    .add-btn { height: 44px; padding: 0 18px; border: 0; border-radius: 12px; background: #00853d; color: #fff; display: inline-flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 700; cursor: pointer; }
    .ico-16 { width: 16px; height: 16px; display: block; }

    .notice { background: #f3ecff; border: 1px solid #e5d5ff; border-radius: 14px; padding: 14px 16px; display: flex; align-items: flex-start; gap: 10px; color: #7c3aed; font-size: 14px; margin-bottom: 12px; }
    .notice p { margin: 0; line-height: 1.45; }

    .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 12px; }
    .card { background: #fff; border: 1px solid #d1d5db; border-radius: 14px; padding: 14px; display: flex; align-items: center; gap: 12px; }
    .icon-box { width: 48px; height: 48px; border-radius: 12px; display: grid; place-items: center; }
    .b1 { background: #dbeafe; color: #2563eb; } .b2 { background: #dcfce7; color: #16a34a; }
    .b3 { background: #f3e8ff; color: #9333ea; } .b4 { background: #fef3c7; color: #ca8a04; }
    .k { font-size: 14px; color: #6b7280; } .v { margin-top: 2px; font-size: 30px; font-weight: 800; }

    .panel { background: #fff; border: 1px solid #d1d5db; border-radius: 14px; padding: 12px; margin-bottom: 12px; }
    .panel-head { display: inline-flex; align-items: center; gap: 8px; color: #374151; font-size: 18px; font-weight: 700; margin-bottom: 10px; }
    .filter-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
    .field label { display: block; margin-bottom: 6px; color: #374151; font-size: 15px; font-weight: 700; }
    .input { width: 100%; height: 44px; box-sizing: border-box; border: 1px solid #cbd5e1; border-radius: 12px; padding: 0 14px; font-size: 15px; }

    .cal-wrap { background: #fff; border: 1px solid #d1d5db; border-radius: 14px; padding: 12px; }
    .cal-top { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
    .cal-nav { display: inline-flex; align-items: center; gap: 10px; }
    .nav-btn { width: 38px; height: 38px; border: 0; border-radius: 10px; background: #fff; cursor: pointer; }
    .date-label { font-size: 28px; font-weight: 800; letter-spacing: -0.02em; }
    .today { height: 40px; padding: 0 14px; border: 1px solid #cbd5e1; border-radius: 12px; background: #fff; font-size: 14px; }
    .view-tabs a { text-decoration: none; width: 40px; height: 40px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-left: 6px; font-weight: 700; color: #4b5563; background: #f3f4f6; font-size: 15px; }
    .view-tabs a.active { background: #0a8b43; color: #fff; }

    .legend { margin-top: 12px; display: flex; flex-wrap: wrap; gap: 16px; color: #4b5563; font-size: 14px; }
    .dot { width: 11px; height: 11px; border-radius: 999px; display: inline-block; margin-right: 6px; }

    .month-grid { margin-top: 12px; border: 1px solid #d1d5db; border-radius: 12px; overflow: hidden; }
    .week-head, .week-row { display: grid; grid-template-columns: repeat(7, 1fr); }
    .week-head div { background: #f8fafc; text-align: center; padding: 8px 0; font-size: 14px; font-weight: 700; color: #374151; border-right: 1px solid #e5e7eb; }
    .week-head div:last-child { border-right: 0; }
    .week-row .cell { min-height: 100px; border-top: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; padding: 8px; font-size: 15px; color: #111827; }
    .week-row .cell:last-child { border-right: 0; }
    .sun { color: #dc2626; } .sat { color: #2563eb; }
    .out { color: #9ca3af; background: #f8fafc; }
    .picked { display: inline-flex; width: 28px; height: 28px; border-radius: 999px; align-items: center; justify-content: center; background: #2563eb; color: #fff; font-size: 14px; font-weight: 700; }

    .evt { margin-top: 6px; border-radius: 6px; padding: 4px 6px; font-size: 11px; background: #2f7ded; color: #fff; }
    .evt .line1 { font-weight: 700; }
    .evt .line2 { opacity: 0.95; }

    @media (max-width: 760px) {
      .title { font-size: 28px; } .sub { font-size: 14px; }
      .filter-grid { grid-template-columns: 1fr; }
      .stats { grid-template-columns: 1fr; }
      .date-label { font-size: 20px; }
      .month-grid { overflow-x: auto; }
      .week-head, .week-row { min-width: 760px; }
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
          <div><h1 class="title">직원 일정 관리</h1><p class="sub">모든 매장 및 본사 직원의 일정을 통합 관리합니다</p></div>
          <button class="add-btn" type="button"><img class="ico-16" src="<%= request.getContextPath() %>/branch/icons/hr/plus.svg" alt="추가" />일정 추가</button>
        </div>

        <div class="notice"><img class="ico-16" src="<%= request.getContextPath() %>/branch/icons/hr/info.svg" alt="안내" /><p><strong>본사관리자 전용 기능</strong><br />모든 매장 및 본사의 직원 일정을 조회하고 관리할 수 있습니다.</p></div>

        <section class="stats">
          <article class="card"><div class="icon-box b1"><img class="ico-16" src="<%= request.getContextPath() %>/branch/icons/hr/calendar.svg" alt="전체" /></div><div><div class="k">총 일정</div><div class="v">4</div></div></article>
          <article class="card"><div class="icon-box b2"><img class="ico-16" src="<%= request.getContextPath() %>/branch/icons/hr/clock.svg" alt="근무" /></div><div><div class="k">근무 일정</div><div class="v">2</div></div></article>
          <article class="card"><div class="icon-box b3"><img class="ico-16" src="<%= request.getContextPath() %>/branch/icons/hr/file.svg" alt="회의" /></div><div><div class="k">회의/교육</div><div class="v">1</div></div></article>
          <article class="card"><div class="icon-box b4"><img class="ico-16" src="<%= request.getContextPath() %>/branch/icons/hr/map-pin.svg" alt="휴가" /></div><div><div class="k">휴가/출장</div><div class="v">1</div></div></article>
        </section>

        <section class="panel">
          <div class="panel-head"><img class="ico-16" src="<%= request.getContextPath() %>/branch/icons/hr/filter.svg" alt="필터" />필터</div>
          <div class="filter-grid">
            <div class="field"><label>매장</label><input class="input" type="text" /></div>
            <div class="field"><label>직원</label><input class="input" type="text" /></div>
            <div class="field"><label>근무 유형</label><input class="input" type="text" /></div>
          </div>
        </section>

        <section class="cal-wrap">
          <div class="cal-top">
            <div class="cal-nav"><button class="nav-btn" type="button"><img class="ico-16" src="<%= request.getContextPath() %>/branch/icons/hr/chevron-left.svg" alt="이전" /></button><div class="date-label">2026년 04월</div><button class="nav-btn" type="button"><img class="ico-16" src="<%= request.getContextPath() %>/branch/icons/hr/chevron-right.svg" alt="다음" /></button><button class="today" type="button">오늘</button></div>
            <div class="view-tabs"><a class="active" href="<%= request.getContextPath() %>/branch/hr/schedule/list_schedule/month.jsp">월</a><a href="<%= request.getContextPath() %>/branch/hr/schedule/list_schedule/week.jsp">주</a><a href="<%= request.getContextPath() %>/branch/hr/schedule/list_schedule/day.jsp">일</a></div>
          </div>

          <div class="legend">
            <span><i class="dot" style="background:#3b82f6"></i>근무</span>
            <span><i class="dot" style="background:#22c55e"></i>휴가</span>
            <span><i class="dot" style="background:#a855f7"></i>교육</span>
            <span><i class="dot" style="background:#f97316"></i>회의</span>
            <span><i class="dot" style="background:#ef4444"></i>출장</span>
            <span><i class="dot" style="background:#6b7280"></i>기타</span>
          </div>

          <div class="month-grid">
            <div class="week-head"><div class="sun">일</div><div>월</div><div>화</div><div>수</div><div>목</div><div>금</div><div class="sat">토</div></div>
            <div class="week-row"><div class="cell out">29</div><div class="cell out">30</div><div class="cell out">31</div><div class="cell">1<div class="evt"><div class="line1">김지점</div><div class="line2">14:00-22:00</div></div></div><div class="cell">2</div><div class="cell">3<div class="evt"><div class="line1">김지점</div><div class="line2">14:00-22:00</div></div></div><div class="cell sat">4</div></div>
            <div class="week-row"><div class="cell sun">5</div><div class="cell">6</div><div class="cell">7</div><div class="cell">8<div class="evt"><div class="line1">김지점</div><div class="line2">14:00-22:00</div></div></div><div class="cell">9</div><div class="cell">10<div class="evt"><div class="line1">김지점</div><div class="line2">14:00-22:00</div></div></div><div class="cell sat">11</div></div>
            <div class="week-row"><div class="cell sun">12</div><div class="cell">13</div><div class="cell">14</div><div class="cell">15<div class="evt"><div class="line1">김지점</div><div class="line2">14:00-22:00</div></div></div><div class="cell">16</div><div class="cell"><span class="picked">17</span><div class="evt"><div class="line1">김지점</div><div class="line2">14:00-22:00</div></div></div><div class="cell sat">18</div></div>
            <div class="week-row"><div class="cell sun">19</div><div class="cell">20</div><div class="cell">21</div><div class="cell">22<div class="evt"><div class="line1">김지점</div><div class="line2">14:00-22:00</div></div></div><div class="cell">23</div><div class="cell">24<div class="evt"><div class="line1">김지점</div><div class="line2">14:00-22:00</div></div></div><div class="cell sat">25</div></div>
            <div class="week-row"><div class="cell sun">26</div><div class="cell">27</div><div class="cell">28</div><div class="cell">29<div class="evt"><div class="line1">김지점</div><div class="line2">14:00-22:00</div></div></div><div class="cell">30</div><div class="cell out">1</div><div class="cell out">2</div></div>
          </div>
        </section>
      </div>
    </main>
  </div>
</div>
</body>
</html>