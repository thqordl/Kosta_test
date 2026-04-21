<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>재고 현황</title>
    <style>
        .wrap {
    width: 100%; max-width: none; margin: 0; }
        .page-header { margin-bottom: 24px; }
        .page-title { margin: 0; font-size: 28px; font-weight: 700; color: #111827; }
        .page-sub { margin: 8px 0 0; color: #6b7280; font-size: 14px; }

        .stats { margin-top: 20px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
        .stat-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 14px; }
        .stat-label { font-size: 12px; color: #6b7280; }
        .stat-value { margin-top: 6px; font-size: 24px; font-weight: 700; color: #111827; }

        .controls { margin: 16px 0; display: flex; gap: 8px; flex-wrap: wrap; }
        .filter-group { display: flex; gap: 8px; }
        .filter-select { padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 13px; background: #fff; cursor: pointer; }
        .search-input { flex: 1; min-width: 200px; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 13px; }

        .tab-shell { background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; padding: 12px; margin: 14px 0; }
        .tabs { display: flex; gap: 8px; flex-wrap: wrap; }
        .tab-btn {
            flex: 1;
            min-width: 180px;
            border: 0;
            background: #eef2ff;
            color: #334155;
            padding: 12px 16px;
            font-weight: 700;
            cursor: pointer;
            border-radius: 10px;
            font-size: 13px;
            text-align: center;
        }
        .tab-btn.active {
            background: #2563eb;
            color: #fff;
        }
        .tab-btn.expiring.active {
            background: #2563eb;
            color: #fff;
        }
        .tab-btn.lowstock.active {
            background: #2563eb;
            color: #fff;
        }
        .tab-content { display: none; }
        .tab-content.active { display: block; }

        .table-wrap { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { padding: 10px 12px; border-bottom: 1px solid #e5e7eb; text-align: left; font-size: 13px; }
        th { background: #f9fafb; color: #374151; font-weight: 600; }
        td { color: #374151; }
        .right { text-align: right; }
        .center { text-align: center; }

        .status-badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
        .status-critical { background: #fee2e2; color: #b91c1c; }
        .status-warning { background: #fef08a; color: #b45309; }
        .status-low { background: #fef3c7; color: #92400e; }
        .status-normal { background: #dcfce7; color: #166534; }

        .row-critical { background: #fef2f2; }
        .row-warning { background: #fffbeb; }
        .row-low { background: #f9fdf4; }

        .note { font-size: 11px; color: #999; margin-top: 2px; }
        .empty { text-align: center; padding: 20px; color: #6b7280; font-size: 13px; }

        @media (max-width: 1000px) {
            .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 640px) {
            .stats { grid-template-columns: 1fr; }
            .controls { flex-direction: column; }
            .filter-select { width: 100%; }
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
        <h1 class="page-title">재고 현황</h1>
        <p class="page-sub">현재 지점의 재고 상태를 확인합니다</p>
    </div>

    <div class="stats">
        <div class="stat-card"><div class="stat-label">유통기한 임박 (3일)</div><div class="stat-value" style="color:#dc2626;">2</div></div>
        <div class="stat-card"><div class="stat-label">유통기한 경고 (7일)</div><div class="stat-value" style="color:#d97706;">3</div></div>
        <div class="stat-card"><div class="stat-label">안전재고 미달</div><div class="stat-value" style="color:#b45309;">3</div></div>
        <div class="stat-card"><div class="stat-label">전체 재고</div><div class="stat-value">10</div></div>
    </div>

    <div class="controls">
        <select class="filter-select" id="categoryFilter">
            <option value="">카테고리 선택</option>
            <option value="단백질">단백질</option>
            <option value="야채">야채</option>
            <option value="치즈">치즈</option>
            <option value="빵류">빵류</option>
            <option value="소스">소스</option>
            <option value="쿠키">쿠키</option>
            <option value="음료">음료</option>
        </select>
        <select class="filter-select" id="itemFilter">
            <option value="">상품명 선택</option>
        </select>
        <input type="text" class="search-input" placeholder="재고번호 또는 상품명으로 검색" id="searchInput" />
    </div>

    <div class="tab-shell">
        <div class="tabs" role="tablist">
            <button class="tab-btn active" data-tab="all" role="tab">전체 (10)</button>
            <button class="tab-btn" data-tab="expiring" role="tab">유통기한 임박 (5)</button>
            <button class="tab-btn" data-tab="lowstock" role="tab">안전재고 미달 (3)</button>
        </div>
    </div>

    <div id="tab-all" class="tab-content active">
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>재고 번호</th>
                        <th>상품명</th>
                        <th>카테고리</th>
                        <th class="right">현재 수량</th>
                        <th class="right">안전재고</th>
                        <th>입고일</th>
                        <th>유통기한</th>
                        <th class="center">D-Day</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="row-critical">
                        <td>INV-2024-001</td>
                        <td>치킨 스트립</td>
                        <td>단백질</td>
                        <td class="right"><strong>45kg</strong></td>
                        <td class="right">50kg</td>
                        <td>2026-03-20</td>
                        <td style="color:#dc2626;"><strong>2026-03-30</strong></td>
                        <td class="center" style="color:#dc2626;"><strong>D-1</strong></td>
                        <td><span class="status-badge status-critical">긴급</span></td>
                    </tr>
                    <tr class="row-warning">
                        <td>INV-2024-002</td>
                        <td>랜치 소스</td>
                        <td>소스</td>
                        <td class="right"><strong>8L</strong></td>
                        <td class="right">15L</td>
                        <td>2026-03-25</td>
                        <td style="color:#d97706;"><strong>2026-03-31</strong></td>
                        <td class="center" style="color:#d97706;"><strong>D-2</strong></td>
                        <td><span class="status-badge status-critical">임박</span></td>
                    </tr>
                    <tr class="row-warning">
                        <td>INV-2024-003</td>
                        <td>양상추</td>
                        <td>야채</td>
                        <td class="right"><strong>8kg</strong></td>
                        <td class="right">20kg</td>
                        <td>2026-03-26</td>
                        <td style="color:#d97706;">2026-04-01</td>
                        <td class="center" style="color:#d97706;">D-3</td>
                        <td><span class="status-badge status-warning">경고</span></td>
                    </tr>
                    <tr class="">
                        <td>INV-2024-004</td>
                        <td>아메리칸 치즈</td>
                        <td>치즈</td>
                        <td class="right">30kg</td>
                        <td class="right">25kg</td>
                        <td>2026-03-24</td>
                        <td>2026-04-02</td>
                        <td class="center">D-4</td>
                        <td><span class="status-badge status-warning">경고</span></td>
                    </tr>
                    <tr class="">
                        <td>INV-2024-005</td>
                        <td>토마토</td>
                        <td>야채</td>
                        <td class="right">15kg</td>
                        <td class="right">10kg</td>
                        <td>2026-03-26</td>
                        <td>2026-04-03</td>
                        <td class="center">D-5</td>
                        <td><span class="status-badge status-normal">정상</span></td>
                    </tr>
                    <tr class="">
                        <td>INV-2024-006</td>
                        <td>허니오트 빵</td>
                        <td>빵류</td>
                        <td class="right">80개</td>
                        <td class="right">150개</td>
                        <td>2026-03-27</td>
                        <td>2026-04-05</td>
                        <td class="center">D-7</td>
                        <td><span class="status-badge status-low">저재고</span></td>
                    </tr>
                    <tr class="">
                        <td>INV-2024-007</td>
                        <td>탄산음료</td>
                        <td>음료</td>
                        <td class="right">3박스</td>
                        <td class="right">10박스</td>
                        <td>2026-02-15</td>
                        <td>2026-08-15</td>
                        <td class="center">D-139</td>
                        <td><span class="status-badge status-low">저재고</span></td>
                    </tr>
                    <tr class="">
                        <td>INV-2024-008</td>
                        <td>올리브 오일</td>
                        <td>소스</td>
                        <td class="right">5L</td>
                        <td class="right">15L</td>
                        <td>2026-03-01</td>
                        <td>2027-03-01</td>
                        <td class="center">D-337</td>
                        <td><span class="status-badge status-low">저재고</span></td>
                    </tr>
                    <tr class="">
                        <td>INV-2024-009</td>
                        <td>초콜릿칩 쿠키</td>
                        <td>쿠키</td>
                        <td class="right">120개</td>
                        <td class="right">100개</td>
                        <td>2026-03-10</td>
                        <td>2027-03-10</td>
                        <td class="center">D-346</td>
                        <td><span class="status-badge status-normal">정상</span></td>
                    </tr>
                    <tr class="">
                        <td>INV-2024-010</td>
                        <td>오이</td>
                        <td>야채</td>
                        <td class="right">15kg</td>
                        <td class="right">50kg</td>
                        <td>2026-03-15</td>
                        <td>2026-04-15</td>
                        <td class="center">D-17</td>
                        <td><span class="status-badge status-low">저재고</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div id="tab-expiring" class="tab-content" style="display:none;">
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>재고 번호</th>
                        <th>상품명</th>
                        <th>카테고리</th>
                        <th class="right">현재 수량</th>
                        <th class="right">안전재고</th>
                        <th>입고일</th>
                        <th>유통기한</th>
                        <th class="center">D-Day</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="row-critical">
                        <td>INV-2024-001</td>
                        <td>치킨 스트립</td>
                        <td>단백질</td>
                        <td class="right"><strong>45kg</strong></td>
                        <td class="right">50kg</td>
                        <td>2026-03-20</td>
                        <td style="color:#dc2626;"><strong>2026-03-30</strong></td>
                        <td class="center" style="color:#dc2626;"><strong>D-1</strong></td>
                        <td><span class="status-badge status-critical">긴급</span></td>
                    </tr>
                    <tr class="row-warning">
                        <td>INV-2024-002</td>
                        <td>랜치 소스</td>
                        <td>소스</td>
                        <td class="right"><strong>8L</strong></td>
                        <td class="right">15L</td>
                        <td>2026-03-25</td>
                        <td style="color:#d97706;"><strong>2026-03-31</strong></td>
                        <td class="center" style="color:#d97706;"><strong>D-2</strong></td>
                        <td><span class="status-badge status-critical">임박</span></td>
                    </tr>
                    <tr class="row-warning">
                        <td>INV-2024-003</td>
                        <td>양상추</td>
                        <td>야채</td>
                        <td class="right"><strong>8kg</strong></td>
                        <td class="right">20kg</td>
                        <td>2026-03-26</td>
                        <td style="color:#d97706;">2026-04-01</td>
                        <td class="center" style="color:#d97706;">D-3</td>
                        <td><span class="status-badge status-warning">경고</span></td>
                    </tr>
                    <tr class="">
                        <td>INV-2024-004</td>
                        <td>아메리칸 치즈</td>
                        <td>치즈</td>
                        <td class="right">30kg</td>
                        <td class="right">25kg</td>
                        <td>2026-03-24</td>
                        <td>2026-04-02</td>
                        <td class="center">D-4</td>
                        <td><span class="status-badge status-warning">경고</span></td>
                    </tr>
                    <tr class="">
                        <td>INV-2024-005</td>
                        <td>토마토</td>
                        <td>야채</td>
                        <td class="right">15kg</td>
                        <td class="right">10kg</td>
                        <td>2026-03-26</td>
                        <td>2026-04-03</td>
                        <td class="center">D-5</td>
                        <td><span class="status-badge status-normal">정상</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div id="tab-lowstock" class="tab-content" style="display:none;">
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>재고 번호</th>
                        <th>상품명</th>
                        <th>카테고리</th>
                        <th class="right">현재 수량</th>
                        <th class="right">안전재고</th>
                        <th>입고일</th>
                        <th>유통기한</th>
                        <th class="center">D-Day</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="row-low">
                        <td>INV-2024-006</td>
                        <td>허니오트 빵</td>
                        <td>빵류</td>
                        <td class="right">80개</td>
                        <td class="right">150개</td>
                        <td>2026-03-27</td>
                        <td>2026-04-05</td>
                        <td class="center">D-7</td>
                        <td><span class="status-badge status-low">저재고</span></td>
                    </tr>
                    <tr class="row-low">
                        <td>INV-2024-007</td>
                        <td>탄산음료</td>
                        <td>음료</td>
                        <td class="right">3박스</td>
                        <td class="right">10박스</td>
                        <td>2026-02-15</td>
                        <td>2026-08-15</td>
                        <td class="center">D-139</td>
                        <td><span class="status-badge status-low">저재고</span></td>
                    </tr>
                    <tr class="row-low">
                        <td>INV-2024-008</td>
                        <td>올리브 오일</td>
                        <td>소스</td>
                        <td class="right">5L</td>
                        <td class="right">15L</td>
                        <td>2026-03-01</td>
                        <td>2027-03-01</td>
                        <td class="center">D-337</td>
                        <td><span class="status-badge status-low">저재고</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <script>
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');
                document.getElementById('tab-' + tabName).style.display = 'block';
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    </script>
</div>
</main>
</div>
</div>
</body>
</html>

    <section class="section">
        <div class="tab-row" role="tablist" aria-label="재고 조회 탭">
            <button type="button" id="tab-all" class="tab-btn all active" data-tab="all" role="tab" aria-selected="true" style="background:#1e40af;border-color:#1e40af;color:#fff;">전체 재고</button>
            <button type="button" id="tab-expiring" class="tab-btn expiring" data-tab="expiring" role="tab" aria-selected="false" style="background:#fff;border-color:#d1d5db;color:#374151;">유통기한 임박</button>
            <button type="button" id="tab-lowstock" class="tab-btn low" data-tab="lowstock" role="tab" aria-selected="false" style="background:#fff;border-color:#d1d5db;color:#374151;">안전재고 미달</button>
        </div>

        <div style="margin:16px 0;display:flex;gap:8px;padding:0 14px;">
            <div style="flex:1;">
                <input type="text" placeholder="카테고리" style="width:100%;padding:8px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;" />
            </div>
            <div style="flex:1;">
                <input type="text" placeholder="제료명" style="width:100%;padding:8px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;" />
            </div>
        </div>

        <div id="panel-all" class="panel active" role="tabpanel" aria-labelledby="tab-all">
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>제고 번호</th><th>제료명</th><th>카테고리</th><th class="right">현재 수량</th><th>안전 재고</th><th>입고일</th><th>유통기한</th><th class="center">D-Day</th><th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="background:#fef2f2;"><td>INV-2024-001</td><td>치킨 스트립</td><td>단백질</td><td class="right" style="color:#dc2626;"><strong>45kg</strong><br/><span style="color:#999;font-size:12px;">(현재재고 미달)</span></td><td>50kg</td><td>2026-03-20</td><td style="color:#dc2626;"><strong>2026-03-30</strong></td><td class="center" style="color:#dc2626;"><strong>◉ D-1</strong></td><td><span style="color:#dc2626;">⚠ 긴급</span></td></tr>
                        <tr style="background:#fffbeb;"><td>INV-2024-002</td><td>렌지 소스</td><td>소스</td><td class="right" style="color:#d97706;"><strong>8L</strong><br/><span style="color:#999;font-size:12px;">(현재재고 미달)</span></td><td>15L</td><td>2026-03-25</td><td style="color:#d97706;"><strong>2026-03-31</strong></td><td class="center" style="color:#d97706;">◉ D-2</td><td><span style="color:#d97706;">⚠ 경고</span></td></tr>
                        <tr style="background:#fef2f2;"><td>INV-2024-003</td><td>양상추</td><td>아채</td><td class="right" style="color:#dc2626;"><strong>8kg</strong><br/><span style="color:#999;font-size:12px;">(현재재고 미달)</span></td><td>20kg</td><td>2026-03-26</td><td style="color:#dc2626;"><strong>2026-04-01</strong></td><td class="center" style="color:#dc2626;">◉ D-3</td><td><span style="color:#dc2626;">⚠ 긴급</span></td></tr>
                        <tr style="background:#fffbeb;"><td>INV-2024-004</td><td>아메라진 치즈</td><td>치즈</td><td class="right" style="color:#d97706;">30kg</td><td>25kg</td><td>2026-03-24</td><td style="color:#d97706;">2026-04-02</td><td class="center" style="color:#d97706;">◉ D-4</td><td><span style="color:#d97706;">⚠ 경고</span></td></tr>
                        <tr style="background:#fffbeb;"><td>INV-2024-007</td><td>뒤니오트 빵</td><td>빵류</td><td class="right" style="color:#d97706;"><strong>80개</strong><br/><span style="color:#999;font-size:12px;">(현재재고 미달)</span></td><td>150개</td><td>2026-03-27</td><td style="color:#d97706;">2026-04-05</td><td class="center" style="color:#d97706;">◉ D-7</td><td><span style="color:#d97706;">⚠ 경고</span></td></tr>
                        <tr><td>INV-2024-010</td><td>오이</td><td>아채</td><td class="right">15kg</td><td>50kg</td><td>2026-03-15</td><td>2026-04-15</td><td class="center">D-17</td><td><span style="color:#999;">비고</span></td></tr>
                        <tr><td>INV-2024-008</td><td>탄산음료</td><td>음료</td><td class="right">3박스</td><td>10박스</td><td>2026-02-15</td><td>2026-08-15</td><td class="center">D-139</td><td><span style="color:#999;">비고</span></td></tr>
                        <tr><td>INV-2024-009</td><td>올리브 오일</td><td>소스</td><td class="right">5L</td><td>15L</td><td>2026-03-01</td><td>2027-03-01</td><td class="center">D-337</td><td><span style="color:#999;">비고</span></td></tr>
                        <tr><td>INV-2024-005</td><td>토마토</td><td>아채</td><td class="right">15kg</td><td>10kg</td><td>2026-03-26</td><td>2026-04-03</td><td class="center">◉ D-5</td><td><span style="color:#d97706;">⚠ 경고</span></td></tr>
                        <tr><td>INV-2024-011</td><td>초콜릿 쿠키</td><td>쿠키</td><td class="right">120개</td><td>100개</td><td>2026-03-10</td><td>2027-03-10</td><td class="center">D-346</td><td><span style="color:#22c55e;">✓ 정상</span></td></tr>
                    </tbody>
                </table>
            </div>
            <div style="text-align:center;padding:12px;color:#6b7280;font-size:13px;">총 10개의 재고가 조회되었습니다.</div>
        </div>

        <div id="panel-expiring" class="panel" role="tabpanel" aria-labelledby="tab-expiring">
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>제고 번호</th><th>제료명</th><th>카테고리</th><th class="right">현재 수량</th><th>안전 재고</th><th>입고일</th><th>유통기한</th><th class="center">D-Day</th><th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="background:#fef2f2;"><td>INV-2024-001</td><td>치킨 스트립</td><td>단백질</td><td class="right" style="color:#dc2626;"><strong>45kg</strong><br/><span style="color:#999;font-size:12px;">(현재재고 미달)</span></td><td>50kg</td><td>2026-03-20</td><td style="color:#dc2626;"><strong>2026-03-30</strong></td><td class="center" style="color:#dc2626;"><strong>◉ D-1</strong></td><td><span style="color:#dc2626;">⚠ 긴급</span></td></tr>
                        <tr style="background:#fffbeb;"><td>INV-2024-002</td><td>렌지 소스</td><td>소스</td><td class="right" style="color:#d97706;"><strong>8L</strong><br/><span style="color:#999;font-size:12px;">(현재재고 미달)</span></td><td>15L</td><td>2026-03-25</td><td style="color:#d97706;"><strong>2026-03-31</strong></td><td class="center" style="color:#d97706;">◉ D-2</td><td><span style="color:#d97706;">⚠ 경고</span></td></tr>
                        <tr style="background:#fef2f2;"><td>INV-2024-003</td><td>양상추</td><td>아채</td><td class="right" style="color:#dc2626;"><strong>8kg</strong><br/><span style="color:#999;font-size:12px;">(현재재고 미달)</span></td><td>20kg</td><td>2026-03-26</td><td style="color:#dc2626;"><strong>2026-04-01</strong></td><td class="center" style="color:#dc2626;">◉ D-3</td><td><span style="color:#dc2626;">⚠ 긴급</span></td></tr>
                        <tr style="background:#fffbeb;"><td>INV-2024-004</td><td>아메라진 치즈</td><td>치즈</td><td class="right" style="color:#d97706;">30kg</td><td>25kg</td><td>2026-03-24</td><td style="color:#d97706;">2026-04-02</td><td class="center" style="color:#d97706;">◉ D-4</td><td><span style="color:#d97706;">⚠ 경고</span></td></tr>
                        <tr style="background:#fffbeb;"><td>INV-2024-007</td><td>뒤니오트 빵</td><td>빵류</td><td class="right" style="color:#d97706;"><strong>80개</strong><br/><span style="color:#999;font-size:12px;">(현재재고 미달)</span></td><td>150개</td><td>2026-03-27</td><td style="color:#d97706;">2026-04-05</td><td class="center" style="color:#d97706;">◉ D-7</td><td><span style="color:#d97706;">⚠ 경고</span></td></tr>
                        <tr style="background:#fffbeb;"><td>INV-2024-005</td><td>토마토</td><td>아채</td><td class="right">15kg</td><td>10kg</td><td>2026-03-26</td><td>2026-04-03</td><td class="center">◉ D-5</td><td><span style="color:#d97706;">⚠ 경고</span></td></tr>
                    </tbody>
                </table>
            </div>
            <div style="text-align:center;padding:12px;color:#6b7280;font-size:13px;">총 6개의 재고가 조회되었습니다.</div>
        </div>

        <div id="panel-lowstock" class="panel" role="tabpanel" aria-labelledby="tab-lowstock">
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>제고 번호</th><th>제료명</th><th>카테고리</th><th class="right">현재 수량</th><th>안전 재고</th><th>입고일</th><th>유통기한</th><th class="center">D-Day</th><th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="background:#fef2f2;"><td>INV-2024-001</td><td>치킨 스트립</td><td>단백질</td><td class="right" style="color:#dc2626;"><strong>45kg</strong><br/><span style="color:#999;font-size:12px;">(현재재고 미달)</span></td><td>50kg</td><td>2026-03-20</td><td style="color:#dc2626;">2026-03-30</td><td class="center" style="color:#dc2626;">◉ D-1</td><td><span style="color:#dc2626;">⚠ 긴급</span></td></tr>
                        <tr style="background:#fffbeb;"><td>INV-2024-002</td><td>렌지 소스</td><td>소스</td><td class="right" style="color:#d97706;"><strong>8L</strong><br/><span style="color:#999;font-size:12px;">(현재재고 미달)</span></td><td>15L</td><td>2026-03-25</td><td style="color:#d97706;">2026-03-31</td><td class="center" style="color:#d97706;">◉ D-2</td><td><span style="color:#d97706;">⚠ 경고</span></td></tr>
                        <tr style="background:#fef2f2;"><td>INV-2024-003</td><td>양상추</td><td>아채</td><td class="right" style="color:#dc2626;"><strong>8kg</strong><br/><span style="color:#999;font-size:12px;">(현재재고 미달)</span></td><td>20kg</td><td>2026-03-26</td><td style="color:#dc2626;">2026-04-01</td><td class="center" style="color:#dc2626;">◉ D-3</td><td><span style="color:#dc2626;">⚠ 긴급</span></td></tr>
                        <tr style="background:#fffbeb;"><td>INV-2024-004</td><td>아메라진 치즈</td><td>치즈</td><td class="right" style="color:#d97706;">30kg</td><td>25kg</td><td>2026-03-24</td><td style="color:#d97706;">2026-04-02</td><td class="center" style="color:#d97706;">◉ D-4</td><td><span style="color:#d97706;">⚠ 경고</span></td></tr>
                        <tr style="background:#fffbeb;"><td>INV-2024-007</td><td>뒤니오트 빵</td><td>빵류</td><td class="right" style="color:#d97706;"><strong>80개</strong><br/><span style="color:#999;font-size:12px;">(현재재고 미달)</span></td><td>150개</td><td>2026-03-27</td><td style="color:#d97706;">2026-04-05</td><td class="center" style="color:#d97706;">◉ D-7</td><td><span style="color:#d97706;">⚠ 경고</span></td></tr>
                        <tr><td>INV-2024-010</td><td>오이</td><td>아채</td><td class="right">15kg</td><td>50kg</td><td>2026-03-15</td><td>2026-04-15</td><td class="center">D-17</td><td><span style="color:#999;">비고</span></td></tr>
                        <tr><td>INV-2024-008</td><td>탄산음료</td><td>음료</td><td class="right">3박스</td><td>10박스</td><td>2026-02-15</td><td>2026-08-15</td><td class="center">D-139</td><td><span style="color:#999;">비고</span></td></tr>
                    </tbody>
                </table>
            </div>
            <div style="text-align:center;padding:12px;color:#6b7280;font-size:13px;">총 7개의 재고가 조회되었습니다.</div>
        </div>
    </section>

    <script>
        (function () {
            var tabs = document.querySelectorAll('.tab-btn');
            var panels = {
                all: document.getElementById('panel-all'),
                expiring: document.getElementById('panel-expiring'),
                lowstock: document.getElementById('panel-lowstock')
            };

            function activate(tabName) {
                tabs.forEach(function (btn) {
                    var isActive = btn.getAttribute('data-tab') === tabName;
                    btn.classList.toggle('active', isActive);
                    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');

                    if (isActive) {
                        if (tabName === 'all') {
                            btn.style.background = '#1e40af';
                            btn.style.borderColor = '#1e40af';
                            btn.style.color = '#fff';
                        } else if (tabName === 'expiring') {
                            btn.style.background = '#ea580c';
                            btn.style.borderColor = '#ea580c';
                            btn.style.color = '#fff';
                        } else if (tabName === 'lowstock') {
                            btn.style.background = '#b45309';
                            btn.style.borderColor = '#b45309';
                            btn.style.color = '#fff';
                        }
                    } else {
                        btn.style.background = '#fff';
                        btn.style.borderColor = '#d1d5db';
                        btn.style.color = '#374151';
                    }
                });
                Object.keys(panels).forEach(function (key) {
                    if (panels[key]) {
                        panels[key].classList.toggle('active', key === tabName);
                    }
                });
            }

            tabs.forEach(function (btn) {
                btn.addEventListener('click', function () {
                    activate(btn.getAttribute('data-tab'));
                });
            });

            var params = new URLSearchParams(window.location.search);
            if (params.get('tab') === 'expiring') {
                activate('expiring');
            } else if (params.get('tab') === 'lowstock') {
                activate('lowstock');
            } else {
                activate('all');
            }
        })();
    </script>
</div>
</main>
</div>
</div>
</body>
</html>
