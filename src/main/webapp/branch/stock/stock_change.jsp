<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>재고 변동</title>
	<style>
		body { margin: 0; font-family: "Malgun Gothic", sans-serif; background: #f3f4f6; }
		.wrap {
    width: 100%; max-width: none; margin: 0; }
		.page-header { margin-bottom: 22px; }
		.page-title { margin: 0; font-size: 28px; font-weight: 700; color: #111827; }
		.page-sub { margin: 8px 0 0; color: #6b7280; font-size: 14px; }

		.top-cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin: 18px 0; }
		.card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 14px; }
		.card-label { font-size: 12px; color: #6b7280; }
		.card-value { margin-top: 6px; font-size: 24px; font-weight: 700; color: #111827; }

		.tab-shell { background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; padding: 12px; }
		.tabs { display: flex; gap: 8px; flex-wrap: wrap; }
		.tab { flex: 1; min-width: 180px; text-decoration: none; padding: 12px 16px; border-radius: 10px; background: #eef2ff; color: #334155; font-weight: 700; text-align: center; }
		.tab.active { background: #2563eb; color: #fff; }
		.tab.disposal.active { background: #dc2626; }

		.toolbar { margin: 18px 0 14px; display: flex; gap: 10px; flex-wrap: wrap; }
		.btn { display: inline-flex; align-items: center; justify-content: center; padding: 10px 14px; border-radius: 10px; text-decoration: none; font-weight: 700; border: 0; cursor: pointer; }
		.btn-danger { background: #dc2626; color: #fff; }
		.btn-primary { background: #2563eb; color: #fff; }

		.panel { margin-top: 16px; background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; overflow: hidden; }
		.panel-head { padding: 16px 18px; border-bottom: 1px solid #eef2f7; }
		.panel-title { margin: 0; font-size: 18px; font-weight: 700; color: #111827; }
		.panel-sub { margin: 6px 0 0; font-size: 13px; color: #6b7280; }

		.filter-row { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin: 16px 0; }
		.filter-label { display: block; margin-bottom: 6px; font-size: 13px; font-weight: 600; color: #374151; }
		.filter-input, .filter-select { width: 100%; box-sizing: border-box; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 8px; background: #fff; }

		.table-wrap { overflow-x: auto; }
		table { width: 100%; border-collapse: collapse; }
		th, td { padding: 12px 14px; border-bottom: 1px solid #f1f5f9; text-align: left; font-size: 13px; }
		th { background: #f8fafc; color: #374151; }
		.right { text-align: right; }
		.center { text-align: center; }

		.badge { display: inline-block; padding: 3px 8px; border-radius: 999px; font-size: 11px; font-weight: 700; }
		.badge-in { background: #dcfce7; color: #166534; }
		.badge-out { background: #dbeafe; color: #1d4ed8; }
		.badge-disposal { background: #fee2e2; color: #b91c1c; }
		.badge-adjust { background: #fef3c7; color: #b45309; }
		.qty-plus { color: #16a34a; font-weight: 700; }
		.qty-minus { color: #dc2626; font-weight: 700; }

		.section { padding: 18px; }
		.summary { font-size: 12px; color: #6b7280; text-align: center; padding: 12px 18px 18px; }

		@media (max-width: 1000px) {
			.top-cards, .filter-row { grid-template-columns: repeat(2, minmax(0, 1fr)); }
		}
		@media (max-width: 640px) {
			.top-cards, .filter-row { grid-template-columns: 1fr; }
			.tab { min-width: 0; }
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
	<div class="page-header">
		<h1 class="page-title">재고 변동</h1>
		<p class="page-sub">재고 이력과 재고 폐기 처리를 확인합니다</p>
	</div>

	<div class="top-cards">
		<div class="card"><div class="card-label">오늘 입고</div><div class="card-value" style="color:#16a34a;">4건</div></div>
		<div class="card"><div class="card-label">오늘 출고</div><div class="card-value" style="color:#2563eb;">2건</div></div>
		<div class="card"><div class="card-label">오늘 폐기</div><div class="card-value" style="color:#dc2626;">3건</div></div>
	</div>

	<div class="tab-shell">
		<div class="tabs">
			<a class="tab active" href="/branch/stock/stock_change.jsp">재고 이력</a>
			<a class="tab disposal" href="/branch/stock/stock_change1.jsp">재고 폐기 처리</a>
		</div>
	</div>

	<div class="section">
		<div class="filter-row">
			<div><label class="filter-label">시작일</label><input class="filter-input" type="date" value="2026-03-20" /></div>
			<div><label class="filter-label">종료일</label><input class="filter-input" type="date" value="2026-03-29" /></div>
			<div><label class="filter-label">카테고리</label><select class="filter-select"><option>전체</option><option>단백질</option><option>야채</option><option>소스</option></select></div>
			<div><label class="filter-label">상품명</label><select class="filter-select"><option>전체</option><option>소고기 패티</option><option>양상추</option><option>랜치 소스</option></select></div>
		</div>

		<div class="panel">
			<div class="panel-head">
				<h2 class="panel-title">재고 이력</h2>
				<p class="panel-sub">지점장 계정에서 확인하는 최근 재고 입출고 및 폐기 이력입니다.</p>
			</div>
			<div class="table-wrap">
				<table>
					<thead>
						<tr>
							<th>재고 번호</th>
							<th>시각</th>
							<th>재료명</th>
							<th>유형</th>
							<th class="right">수량 변화</th>
							<th class="right">처리 후 수량</th>
							<th>처리자</th>
							<th>비고</th>
						</tr>
					</thead>
					<tbody>
						<tr><td>INV-2024-001</td><td>2026-03-29 09:30</td><td>소고기 패티</td><td><span class="badge badge-in">입고</span></td><td class="right"><span class="qty-plus">+50개</span></td><td class="right">95개</td><td>김철수</td><td>정기 발주 입고</td></tr>
						<tr><td>INV-2024-003</td><td>2026-03-29 12:15</td><td>양상추</td><td><span class="badge badge-out">출고</span></td><td class="right"><span class="qty-minus">-5kg</span></td><td class="right">8kg</td><td>박민수</td><td>점심 피크타임 사용</td></tr>
						<tr><td>INV-2024-001</td><td>2026-03-28 14:30</td><td>소고기 패티</td><td><span class="badge badge-disposal">폐기</span></td><td class="right"><span class="qty-minus">-10개</span></td><td class="right">45개</td><td>김철수</td><td>유통기한 만료</td></tr>
						<tr><td>INV-2024-007</td><td>2026-03-28 10:00</td><td>버거빵</td><td><span class="badge badge-in">입고</span></td><td class="right"><span class="qty-plus">+100개</span></td><td class="right">180개</td><td>이영희</td><td>긴급 발주 입고</td></tr>
						<tr><td>INV-2024-004</td><td>2026-03-27 15:30</td><td>체다치즈</td><td><span class="badge badge-adjust">조정</span></td><td class="right"><span class="qty-minus">-5장</span></td><td class="right">30장</td><td>이영희</td><td>재고 실사 후 조정</td></tr>
					</tbody>
				</table>
			</div>
			<div class="summary">2026-03-20 ~ 2026-03-29 기간 동안 10건의 재고 이력이 발생했습니다.</div>
		</div>
	</div>
</div>
</main>
</div>
</div>
</body>
</html>
