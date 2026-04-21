<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>폐기 기록</title>
    <style>
        .wrap {
    width: 100%; max-width: none; margin: 0; }
        .page-header { margin-bottom: 24px; }
        .page-title { margin: 0; font-size: 28px; font-weight: 700; color: #111827; }
        .page-sub { margin: 8px 0 0; color: #6b7280; font-size: 14px; }

        .stats { margin-top: 20px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
        .stat-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 14px; }
        .stat-label { font-size: 12px; color: #6b7280; }
        .stat-value { margin-top: 6px; font-size: 24px; font-weight: 700; color: #111827; }

        .controls { margin: 16px 0; display: flex; gap: 8px; flex-wrap: wrap; }
        .filter-select { padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 13px; background: #fff; cursor: pointer; }
        .search-input { flex: 1; min-width: 200px; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 13px; }

        .table-wrap { overflow-x: auto; margin-top: 16px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 10px 12px; border-bottom: 1px solid #e5e7eb; text-align: left; font-size: 13px; }
        th { background: #f9fafb; color: #374151; font-weight: 600; }
        td { color: #374151; }

        .reason-badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
        .reason-expired { background: #fee2e2; color: #b91c1c; }
        .reason-quality { background: #fed7aa; color: #b45309; }
        .reason-damage { background: #fce7f3; color: #be185d; }
        .reason-other { background: #e0e7ff; color: #3730a3; }

        .status-badge { display: inline-block; padding: 2px 6px; border-radius: 3px; font-size: 10px; font-weight: 600; background: #dcfce7; color: #166534; }

        .right { text-align: right; }
        .center { text-align: center; }
        .empty { text-align: center; padding: 20px; color: #6b7280; font-size: 13px; }

        @media (max-width: 1000px) {
            .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .controls { flex-direction: column; }
        }
        @media (max-width: 640px) {
            .stats { grid-template-columns: 1fr; }
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
        <h1 class="page-title">폐기 기록</h1>
        <p class="page-sub">처리된 폐기 내역을 확인합니다</p>
    </div>

    <div class="stats">
        <div class="stat-card"><div class="stat-label">총 폐기 건수</div><div class="stat-value" style="color:#b91c1c;">5</div></div>
        <div class="stat-card"><div class="stat-label">유통기한 만료</div><div class="stat-value" style="color:#dc2626;">3</div></div>
        <div class="stat-card"><div class="stat-label">품질 불량</div><div class="stat-value" style="color:#d97706;">2</div></div>
    </div>

    <div class="controls">
        <select class="filter-select">
            <option value="">폐기 사유 선택</option>
            <option value="expired">유통기한 만료</option>
            <option value="quality">품질 불량</option>
            <option value="damage">배송 파손</option>
            <option value="other">기타</option>
        </select>
        <input type="text" class="search-input" placeholder="재고번호 또는 상품명으로 검색" />
    </div>

    <div class="table-wrap">
        <table>
            <thead>
                <tr>
                    <th>폐기일</th>
                    <th>재고 번호</th>
                    <th>상품명</th>
                    <th>카테고리</th>
                    <th class="right">폐기량</th>
                    <th>폐기 사유</th>
                    <th>상세 사유</th>
                    <th>담당자</th>
                    <th>처리 상태</th>
                </tr>
            </thead>
            <tbody>
                <tr style="background:#fef2f2;">
                    <td>2026-03-28<br/>14:30</td>
                    <td>INV-2024-001</td>
                    <td>소고기 패티</td>
                    <td>단백질</td>
                    <td class="right"><strong>10개</strong></td>
                    <td><span class="reason-badge reason-expired">유통기한 만료</span></td>
                    <td>유통기한 초과</td>
                    <td>김철수</td>
                    <td><span class="status-badge">완료</span></td>
                </tr>
                <tr style="background:#fffbeb;">
                    <td>2026-03-27<br/>11:20</td>
                    <td>INV-2024-003</td>
                    <td>양상추</td>
                    <td>야채</td>
                    <td class="right"><strong>3kg</strong></td>
                    <td><span class="reason-badge reason-quality">품질 불량</span></td>
                    <td>변색 및 신선도 저하</td>
                    <td>이영희</td>
                    <td><span class="status-badge">완료</span></td>
                </tr>
                <tr style="background:#fef2f2;">
                    <td>2026-03-26<br/>16:45</td>
                    <td>INV-2024-002</td>
                    <td>랜치 소스</td>
                    <td>소스</td>
                    <td class="right"><strong>2L</strong></td>
                    <td><span class="reason-badge reason-expired">유통기한 만료</span></td>
                    <td>유통기한 초과</td>
                    <td>김철수</td>
                    <td><span class="status-badge">완료</span></td>
                </tr>
                <tr style="background:#fffbeb;">
                    <td>2026-03-25<br/>10:15</td>
                    <td>INV-2024-005</td>
                    <td>토마토</td>
                    <td>야채</td>
                    <td class="right"><strong>5kg</strong></td>
                    <td><span class="reason-badge reason-quality">품질 불량</span></td>
                    <td>곰팡이 발생</td>
                    <td>박민수</td>
                    <td><span class="status-badge">완료</span></td>
                </tr>
                <tr style="background:#fce7f3;">
                    <td>2026-03-24<br/>09:30</td>
                    <td>INV-2024-007</td>
                    <td>허니오트 빵</td>
                    <td>빵류</td>
                    <td class="right"><strong>20개</strong></td>
                    <td><span class="reason-badge reason-damage">배송 파손</span></td>
                    <td>배송 중 파손</td>
                    <td>이영희</td>
                    <td><span class="status-badge">완료</span></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</main>
</div>
</div>

<script>
document.querySelectorAll('.filter-select').forEach(select => {
    select.addEventListener('change', function() {
        // 필터링 로직은 실제 데이터 연동 시 구현
    });
});
</script>
