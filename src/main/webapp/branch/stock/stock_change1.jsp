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
		.badge { display: inline-block; padding: 3px 8px; border-radius: 999px; font-size: 11px; font-weight: 700; }
		.badge-in { background: #dcfce7; color: #166534; }
		.badge-disposal { background: #fee2e2; color: #b91c1c; }
		.summary { font-size: 12px; color: #6b7280; text-align: center; padding: 12px 18px 18px; }
		.disposal-banner { margin-top: 18px; padding: 16px; border-radius: 14px; background: linear-gradient(135deg, #fff7ed, #fff); border: 1px solid #fed7aa; display: flex; justify-content: space-between; align-items: center; gap: 14px; }
		.disposal-title { margin: 0; font-size: 18px; font-weight: 700; color: #9a3412; }
		.disposal-text { margin: 6px 0 0; color: #7c2d12; font-size: 13px; }
		.disposal-actions { display: flex; gap: 10px; flex-wrap: wrap; }
		.modal-overlay { display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.55); z-index: 1000; }
		.modal-overlay.show { display: flex; align-items: center; justify-content: center; }
		.modal { width: min(560px, calc(100vw - 32px)); background: #fff; border-radius: 16px; padding: 22px; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.22); }
		.modal-head { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
		.modal-icon { width: 42px; height: 42px; border-radius: 12px; display: grid; place-items: center; background: #fff7ed; color: #ea580c; font-size: 22px; }
		.modal-title { margin: 0; font-size: 20px; font-weight: 700; color: #111827; }
		.modal-sub { margin: 4px 0 0; font-size: 13px; color: #6b7280; }
		.form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
		.field { margin-top: 14px; }
		.field.full { grid-column: 1 / -1; }
		.field label { display: block; margin-bottom: 6px; font-size: 13px; font-weight: 600; color: #374151; }
		.field input, .field select, .field textarea { width: 100%; box-sizing: border-box; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 10px; }
		.actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 18px; }
		.cancel { background: #e5e7eb; color: #111827; }
		.save { background: #ea580c; color: #fff; }
		@media (max-width: 1000px) { .top-cards, .filter-row { grid-template-columns: repeat(2, minmax(0, 1fr)); } .disposal-banner { flex-direction: column; align-items: stretch; } }
		@media (max-width: 640px) { .top-cards, .filter-row, .form-grid { grid-template-columns: 1fr; } .tab { min-width: 0; } }
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
			<a class="tab" href="/branch/stock/stock_change.jsp">재고 이력</a>
			<a class="tab disposal active" href="/branch/stock/stock_change1.jsp">재고 폐기 처리</a>
		</div>
	</div>

	<div class="section">
		<div class="disposal-banner">
			<div>
				<h2 class="disposal-title">재고 폐기 처리</h2>
				<p class="disposal-text">지점장 계정에서 확인하는 폐기 대상 품목과 폐기 등록 폼입니다.</p>
			</div>
			<div class="disposal-actions">
				<button class="btn btn-danger" id="openDisposalBtn">폐기 처리 등록</button>
				<a class="btn btn-primary" href="/branch/stock/stock_change.jsp">재고 이력 보기</a>
			</div>
		</div>

		<div class="filter-row">
			<div><label class="filter-label">시작일</label><input class="filter-input" type="date" value="2026-03-20" /></div>
			<div><label class="filter-label">종료일</label><input class="filter-input" type="date" value="2026-03-29" /></div>
			<div><label class="filter-label">카테고리</label><select class="filter-select"><option>전체</option><option>단백질</option><option>야채</option><option>소스</option></select></div>
			<div><label class="filter-label">상품명</label><select class="filter-select"><option>전체</option><option>소고기 패티</option><option>양상추</option><option>랜치 소스</option></select></div>
		</div>

		<div class="panel">
			<div class="panel-head">
				<h2 class="panel-title">재고 폐기 처리 목록</h2>
				<p class="panel-sub">유통기한 만료, 품질 불량, 배송 파손으로 폐기된 품목입니다.</p>
			</div>
			<div class="table-wrap">
				<table>
					<thead>
						<tr>
							<th>재고 번호</th>
							<th>시각</th>
							<th>재료명</th>
							<th>카테고리</th>
							<th class="right">폐기 수량</th>
							<th>폐기 사유</th>
							<th>상세 사유</th>
							<th>처리자</th>
							<th>상태</th>
						</tr>
					</thead>
					<tbody>
						<tr><td>INV-2024-001</td><td>2026-03-28 14:30</td><td>소고기 패티</td><td>단백질</td><td class="right"><strong>10개</strong></td><td><span class="badge badge-disposal">유통기한 만료</span></td><td>유통기한 초과로 인한 폐기</td><td>김철수</td><td><span class="badge badge-in">완료</span></td></tr>
						<tr><td>INV-2024-003</td><td>2026-03-27 11:20</td><td>양상추</td><td>야채</td><td class="right"><strong>3kg</strong></td><td><span class="badge badge-disposal">품질 불량</span></td><td>변색 및 신선도 저하</td><td>이영희</td><td><span class="badge badge-in">완료</span></td></tr>
						<tr><td>INV-2024-002</td><td>2026-03-26 16:45</td><td>랜치 소스</td><td>소스</td><td class="right"><strong>2L</strong></td><td><span class="badge badge-disposal">유통기한 만료</span></td><td>유통기한 초과</td><td>김철수</td><td><span class="badge badge-in">완료</span></td></tr>
						<tr><td>INV-2024-005</td><td>2026-03-25 10:15</td><td>토마토</td><td>야채</td><td class="right"><strong>5kg</strong></td><td><span class="badge badge-disposal">품질 불량</span></td><td>곰팡이 발생</td><td>박민수</td><td><span class="badge badge-in">완료</span></td></tr>
						<tr><td>INV-2024-007</td><td>2026-03-24 09:30</td><td>허니오트 빵</td><td>빵류</td><td class="right"><strong>20개</strong></td><td><span class="badge badge-disposal">기타</span></td><td>배송 중 파손</td><td>이영희</td><td><span class="badge badge-in">완료</span></td></tr>
					</tbody>
				</table>
			</div>
			<div class="summary">2026-03-20 ~ 2026-03-29 기간 동안 5건의 폐기 처리가 등록되었습니다.</div>
		</div>
	</div>
</div>
</main>
</div>
</div>

<div class="modal-overlay" id="disposalModal">
	<div class="modal" role="dialog" aria-modal="true" aria-labelledby="disposalModalTitle">
		<div class="modal-head">
			<div class="modal-icon">🗑️</div>
			<div>
				<h3 class="modal-title" id="disposalModalTitle">폐기 처리 등록</h3>
				<p class="modal-sub">폐기할 품목과 사유를 입력하세요.</p>
			</div>
		</div>

		<div class="form-grid">
			<div class="field">
				<label>품목명</label>
				<select>
					<option>양상추</option>
					<option>감자</option>
					<option>생크림</option>
				</select>
			</div>
			<div class="field">
				<label>폐기 수량</label>
				<input type="number" value="3" />
			</div>
			<div class="field">
				<label>단위</label>
				<select>
					<option>kg</option>
					<option>개</option>
					<option>L</option>
				</select>
			</div>
			<div class="field">
				<label>폐기 일시</label>
				<input type="datetime-local" value="2026-03-29T12:40" />
			</div>
			<div class="field full">
				<label>폐기 사유</label>
				<textarea rows="4">유통기한 경과</textarea>
			</div>
		</div>

		<div class="actions">
			<button type="button" class="btn cancel" id="closeDisposalBtn">취소</button>
			<a class="btn save" href="/branch/stock/disposal_registration.jsp">폐기 등록</a>
		</div>
	</div>
</div>

<script>
document.getElementById('openDisposalBtn').addEventListener('click', function () {
	document.getElementById('disposalModal').classList.add('show');
});
document.getElementById('closeDisposalBtn').addEventListener('click', function () {
	document.getElementById('disposalModal').classList.remove('show');
});
document.getElementById('disposalModal').addEventListener('click', function (event) {
	if (event.target === this) {
		this.classList.remove('show');
	}
});
</script>
</body>
</html>
