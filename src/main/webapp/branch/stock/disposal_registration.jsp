<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>폐기 처리 등록</title>
	<style>
		body { margin: 0; font-family: "Malgun Gothic", sans-serif; background: #fff7ed; }
		.wrap {
    width: 100%; max-width: none; margin: 0; padding: 24px; }
		.hero { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
		.hero-mark { width: 54px; height: 54px; border-radius: 16px; display: grid; place-items: center; background: #ffedd5; color: #c2410c; font-size: 24px; }
		h1 { margin: 0; font-size: 28px; color: #111827; }
		p { margin: 6px 0 0; color: #6b7280; }
		.card { background: #fff; border: 1px solid #fed7aa; border-radius: 18px; padding: 20px; box-shadow: 0 12px 30px rgba(234, 88, 12, 0.08); }
		.grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
		.field label { display: block; font-size: 13px; font-weight: 600; color: #4b5563; margin-bottom: 6px; }
		.field input, .field select, .field textarea { width: 100%; box-sizing: border-box; padding: 11px 12px; border: 1px solid #d1d5db; border-radius: 10px; background: #fff; }
		.field.full { grid-column: 1 / -1; }
		.actions { margin-top: 18px; display: flex; justify-content: flex-end; gap: 10px; }
		a, button { text-decoration: none; border: none; padding: 10px 14px; border-radius: 10px; font-weight: 700; cursor: pointer; }
		.cancel { background: #e5e7eb; color: #111827; }
		.save { background: #ea580c; color: #fff; }
		.hint { margin-top: 12px; font-size: 12px; color: #9a3412; }
		@media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }
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
	<div class="hero">
		<div class="hero-mark">🗑️</div>
		<div>
			<h1>폐기 처리 등록</h1>
			<p>유통기한 경과 또는 품질 문제 발생 시 폐기 내역을 등록하세요.</p>
		</div>
	</div>

	<div class="card">
		<div class="grid">
			<div class="field">
				<label>재고 번호</label>
				<input type="text" value="STK-2026-001" />
			</div>
			<div class="field">
				<label>품목명</label>
				<select>
					<option>양상추</option>
					<option>감자</option>
					<option>생크림</option>
					<option>소고기 패티</option>
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
		<div class="hint">등록 후 재고 이력과 폐기 처리 목록에 반영됩니다.</div>
		<div class="actions">
			<a class="cancel" href="/branch/stock/stock_change1.jsp">취소</a>
			<a class="save" href="/branch/stock/stock_change1.jsp">폐기 등록</a>
		</div>
	</div>
</div>
</main>
</div>
</div>
</body>
</html>
