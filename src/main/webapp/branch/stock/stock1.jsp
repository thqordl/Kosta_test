<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>재고 변동</title>
    <style>
        .wrap {
    width: 100%; max-width: none; margin: 0; }
        .page-header { margin-bottom: 24px; }
        .page-title { margin: 0; font-size: 28px; font-weight: 700; color: #111827; }
        .page-sub { margin: 8px 0 0; color: #6b7280; font-size: 14px; }

        .filter-section { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; margin: 16px 0; }
        .filter-label { font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px; display: block; }
        .filter-input, .filter-select { width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; }
        .filter-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }

        .tab-section { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 8px; margin: 16px 0; }
        .tab-button { flex: 1; padding: 10px 16px; border: none; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
        .tab-button.active.disposal { background: #dc2626; color: #fff; }
        .tab-button.active.history { background: #2563eb; color: #fff; }
        .tab-button.inactive { background: transparent; color: #6b7280; }
        .tab-buttons { display: flex; gap: 8px; }

        .button-group { display: flex; gap: 8px; margin: 16px 0; }
        .btn { padding: 8px 16px; border: none; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; }
        .btn-primary { background: #2563eb; color: #fff; }
        .btn-danger { background: #dc2626; color: #fff; }
        .btn:hover { opacity: 0.9; }

        .stats { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin: 16px 0; }
        .stat-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; text-align: center; }
        .stat-value { font-size: 20px; font-weight: 700; color: #111827; }
        .stat-label { font-size: 11px; color: #6b7280; margin-top: 4px; }

        .table-wrap { overflow-x: auto; margin: 16px 0; }
        table { width: 100%; border-collapse: collapse; background: #fff; }
        th, td { padding: 10px 12px; border-bottom: 1px solid #e5e7eb; text-align: left; font-size: 13px; }
        th { background: #f9fafb; color: #374151; font-weight: 600; }

        .badge { display: inline-block; padding: 2px 6px; border-radius: 3px; font-size: 11px; font-weight: 600; }
        .badge-receive { background: #dcfce7; color: #16a34a; }
        .badge-release { background: #dbeafe; color: #1e40af; }
        .badge-disposal { background: #fee2e2; color: #b91c1c; }
        .badge-adjust { background: #fef3c7; color: #b45309; }
        .badge-completed { background: #dcfce7; color: #16a34a; }

        .quantity-positive { color: #16a34a; font-weight: 600; }
        .quantity-negative { color: #dc2626; font-weight: 600; }
        .right { text-align: right; }

        .tab-content { display: none; }
        .tab-content.active { display: block; }

        .modal-overlay { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); z-index: 1000; }
        .modal-overlay.show { display: flex; align-items: center; justify-content: center; }
        .modal { background: #fff; border-radius: 10px; padding: 24px; width: 90%; max-width: 500px; }
        .modal-header { display: flex; align-items: center; margin-bottom: 16px; }
        .modal-icon { font-size: 24px; margin-right: 12px; }
        .modal-title { font-size: 18px; font-weight: 700; color: #111827; }
        .modal-desc { font-size: 13px; color: #6b7280; }
        .form-group { margin: 16px 0; }
        .form-label { display: block; font-size: 13px; font-weight: 600; color: #111827; margin-bottom: 6px; }
        .form-label.required:after { content: " *"; color: #dc2626; }
        .form-input, .form-select, .form-textarea { width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; font-family: inherit; }
        .form-row { display: flex; gap: 12px; }
        .form-row > div { flex: 1; }
        .modal-buttons { display: flex; gap: 8px; justify-content: flex-end; margin-top: 20px; }
        .btn-cancel { background: #e5e7eb; color: #374151; }
        .btn-submit { background: #2563eb; color: #fff; }

        @media (max-width: 1000px) {
            .filter-grid { grid-template-columns: repeat(2, 1fr); }
            .stats { grid-template-columns: repeat(3, 1fr); }
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
        <p class="page-sub">재고 폐기 처리와 이력을 관리하세요</p>
    </div>

    <div class="filter-section">
        <div class="filter-grid">
            <div>
                <label class="filter-label">시작일</label>
                <input type="date" class="filter-input" value="2026-03-20" />
            </div>
            <div>
                <label class="filter-label">종료일</label>
                <input type="date" class="filter-input" value="2026-03-29" />
            </div>
            <div>
                <label class="filter-label">카테고리</label>
                <select class="filter-select">
                    <option value="">전체</option>
                    <option value="단백질">단백질</option>
                    <option value="야채">야채</option>
                </select>
            </div>
            <div>
                <label class="filter-label">상품명</label>
                <select class="filter-select">
                    <option value="">전체</option>
                </select>
            </div>
        </div>
    </div>

    <div class="tab-section">
        <div class="tab-buttons">
            <button class="tab-button active disposal" data-tab="disposal">🗑️ 재고 폐기 처리</button>
            <button class="tab-button inactive" data-tab="history">📊 재고 이력</button>
        </div>
    </div>

    <!-- 재고 폐기 처리 탭 -->
    <div id="disposal-tab" class="tab-content active">
        <div class="button-group">
            <button class="btn btn-danger" id="openDisposalBtn">🗑️ 폐기 처리 등록</button>
            <button class="btn btn-primary" id="historyBtn">📊 재고 이력</button>
        </div>

        <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; margin: 16px 0;">
            <h3 style="margin: 0 0 16px; font-size: 15px; font-weight: 600; color: #111827;">재고 폐기 처리</h3>
            <p style="margin: 0 0 16px; font-size: 13px; color: #6b7280;">폐기된 제료를 등록하세요</p>
            
            <div class="stats" style="grid-template-columns: repeat(3, 1fr);">
                <div class="stat-card">
                    <div style="font-size: 20px; margin-bottom: 4px;">🗑️</div>
                    <div class="stat-value">0건</div>
                    <div class="stat-label">오늘 폐기</div>
                </div>
                <div class="stat-card">
                    <div style="font-size: 20px; margin-bottom: 4px;">📦</div>
                    <div class="stat-value">0개</div>
                    <div class="stat-label">오늘 폐기량</div>
                </div>
                <div class="stat-card">
                    <div style="font-size: 20px; margin-bottom: 4px;">📋</div>
                    <div class="stat-value">5건</div>
                    <div class="stat-label">전체 폐기</div>
                </div>
            </div>

            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>재고 번호</th>
                            <th>시시</th>
                            <th>제료명</th>
                            <th>카테고리</th>
                            <th class="right">폐기 수량</th>
                            <th>폐기 사유</th>
                            <th>상세사유</th>
                            <th>처리자</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>INV-2024-001</td>
                            <td>2026-03-28<br/>14:30</td>
                            <td>소고기 패티</td>
                            <td>단백질</td>
                            <td class="right"><strong>10개</strong></td>
                            <td>유통기한 만료</td>
                            <td>유통기한 초과로 인한 폐기</td>
                            <td>김철수</td>
                            <td><span class="badge badge-completed">완료</span></td>
                        </tr>
                        <tr>
                            <td>INV-2024-003</td>
                            <td>2026-03-27<br/>11:20</td>
                            <td>양상추</td>
                            <td>야채</td>
                            <td class="right"><strong>3kg</strong></td>
                            <td>품질 불량</td>
                            <td>변색 및 신선도 저하</td>
                            <td>이영희</td>
                            <td><span class="badge badge-completed">완료</span></td>
                        </tr>
                        <tr>
                            <td>INV-2024-002</td>
                            <td>2026-03-26<br/>16:45</td>
                            <td>랜치 소스</td>
                            <td>소스</td>
                            <td class="right"><strong>2L</strong></td>
                            <td>유통기한 만료</td>
                            <td>유통기한 초과</td>
                            <td>김철수</td>
                            <td><span class="badge badge-completed">완료</span></td>
                        </tr>
                        <tr>
                            <td>INV-2024-005</td>
                            <td>2026-03-25<br/>10:15</td>
                            <td>토마토</td>
                            <td>야채</td>
                            <td class="right"><strong>5kg</strong></td>
                            <td>품질 불량</td>
                            <td>곰팡이 발생</td>
                            <td>박민수</td>
                            <td><span class="badge badge-completed">완료</span></td>
                        </tr>
                        <tr>
                            <td>INV-2024-007</td>
                            <td>2026-03-24<br/>09:30</td>
                            <td>허니오트 빵</td>
                            <td>빵류</td>
                            <td class="right"><strong>20개</strong></td>
                            <td>기타</td>
                            <td>배송 중 파손</td>
                            <td>이영희</td>
                            <td><span class="badge badge-completed">완료</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- 재고 이력 탭 -->
    <div id="history-tab" class="tab-content">
        <div class="button-group">
            <button class="btn btn-danger" id="disposalBtn">🗑️ 폐기 처리 등록</button>
            <button class="btn btn-primary" id="downloadBtn">📥 엑셀 다운로드</button>
        </div>

        <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; margin: 16px 0;">
            <h3 style="margin: 0 0 16px; font-size: 15px; font-weight: 600; color: #111827;">재고 이력</h3>
            <p style="margin: 0 0 16px; font-size: 13px; color: #6b7280;">재고 입출고 내역을 조회하세요</p>
            
            <div class="stats" style="grid-template-columns: repeat(5, 1fr);">
                <div class="stat-card">
                    <div style="font-size: 20px; margin-bottom: 4px;">📦</div>
                    <div class="stat-value">10</div>
                    <div class="stat-label">전체</div>
                </div>
                <div class="stat-card">
                    <div style="font-size: 20px; margin-bottom: 4px;">📈</div>
                    <div class="stat-value">4</div>
                    <div class="stat-label">입고</div>
                </div>
                <div class="stat-card">
                    <div style="font-size: 20px; margin-bottom: 4px;">📉</div>
                    <div class="stat-value">2</div>
                    <div class="stat-label">출고</div>
                </div>
                <div class="stat-card">
                    <div style="font-size: 20px; margin-bottom: 4px;">🗑️</div>
                    <div class="stat-value">3</div>
                    <div class="stat-label">폐기</div>
                </div>
                <div class="stat-card">
                    <div style="font-size: 20px; margin-bottom: 4px;">⚙️</div>
                    <div class="stat-value">1</div>
                    <div class="stat-label">조정</div>
                </div>
            </div>

            <div style="margin: 16px 0;">
                <select class="filter-select" style="width: 200px;">
                    <option value="">이유 유형</option>
                    <option value="입고">입고</option>
                    <option value="출고">출고</option>
                    <option value="폐기">폐기</option>
                    <option value="조정">조정</option>
                </select>
            </div>

            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>재고 번호</th>
                            <th>시시</th>
                            <th>재료명</th>
                            <th>유형</th>
                            <th class="right">우량 변화</th>
                            <th class="right">저리 우량</th>
                            <th>저리자</th>
                            <th>비고</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>INV-2024-001</td>
                            <td>2026-03-29<br/>09:30</td>
                            <td>소고기 패티</td>
                            <td><span class="badge badge-receive">📈 입고</span></td>
                            <td class="right"><span class="quantity-positive">+50개</span></td>
                            <td class="right">95개</td>
                            <td>김철수</td>
                            <td>정기 발주 입고</td>
                        </tr>
                        <tr>
                            <td>INV-2024-003</td>
                            <td>2026-03-29<br/>12:15</td>
                            <td>양상추</td>
                            <td><span class="badge badge-release">📉 출고</span></td>
                            <td class="right"><span class="quantity-negative">-5kg</span></td>
                            <td class="right">8kg</td>
                            <td>박민수</td>
                            <td>점심 피크타임</td>
                        </tr>
                        <tr>
                            <td>INV-2024-001</td>
                            <td>2026-03-28<br/>14:30</td>
                            <td>소고기 패티</td>
                            <td><span class="badge badge-disposal">🗑️ 폐기</span></td>
                            <td class="right"><span class="quantity-negative">-10개</span></td>
                            <td class="right">45개</td>
                            <td>김철수</td>
                            <td>유통기한 만료</td>
                        </tr>
                        <tr>
                            <td>INV-2024-007</td>
                            <td>2026-03-28<br/>10:00</td>
                            <td>허니오트 빵</td>
                            <td><span class="badge badge-receive">📈 입고</span></td>
                            <td class="right"><span class="quantity-positive">+100개</span></td>
                            <td class="right">180개</td>
                            <td>이영희</td>
                            <td>긴급 발주 입고</td>
                        </tr>
                        <tr>
                            <td>INV-2024-002</td>
                            <td>2026-03-28<br/>18:45</td>
                            <td>랜치 소스</td>
                            <td><span class="badge badge-release">📉 출고</span></td>
                            <td class="right"><span class="quantity-negative">-3L</span></td>
                            <td class="right">12L</td>
                            <td>최지훈</td>
                            <td>디저트 제조</td>
                        </tr>
                        <tr>
                            <td>INV-2024-003</td>
                            <td>2026-03-27<br/>11:20</td>
                            <td>양상추</td>
                            <td><span class="badge badge-disposal">🗑️ 폐기</span></td>
                            <td class="right"><span class="quantity-negative">-3kg</span></td>
                            <td class="right">13kg</td>
                            <td>이영희</td>
                            <td>품질 불량</td>
                        </tr>
                        <tr>
                            <td>INV-2024-006</td>
                            <td>2026-03-27<br/>09:00</td>
                            <td>감자</td>
                            <td><span class="badge badge-receive">📈 입고</span></td>
                            <td class="right"><span class="quantity-positive">+30kg</span></td>
                            <td class="right">45kg</td>
                            <td>김철수</td>
                            <td>정기 발주</td>
                        </tr>
                        <tr>
                            <td>INV-2024-004</td>
                            <td>2026-03-27<br/>15:30</td>
                            <td>아메리칸 치즈</td>
                            <td><span class="badge badge-adjust">⚙️ 조정</span></td>
                            <td class="right"><span class="quantity-negative">-5개</span></td>
                            <td class="right">30개</td>
                            <td>이영희</td>
                            <td>재고 실사</td>
                        </tr>
                        <tr>
                            <td>INV-2024-002</td>
                            <td>2026-03-26<br/>16:45</td>
                            <td>랜치 소스</td>
                            <td><span class="badge badge-disposal">🗑️ 폐기</span></td>
                            <td class="right"><span class="quantity-negative">-2L</span></td>
                            <td class="right">15L</td>
                            <td>김철수</td>
                            <td>유통기한 초과</td>
                        </tr>
                        <tr>
                            <td>INV-2024-005</td>
                            <td>2026-03-26<br/>10:30</td>
                            <td>토마토</td>
                            <td><span class="badge badge-receive">📈 입고</span></td>
                            <td class="right"><span class="quantity-positive">+20kg</span></td>
                            <td class="right">35kg</td>
                            <td>박민수</td>
                            <td>정기 발주</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 16px;">
            2026-03-20 ~ 2026-03-29 기간 동안 10건의 재고 이력이 발생했습니다.
        </div>
    </div>
</div>
</main>
</div>
</div>

<!-- 폐기 처리 등록 모달 -->
<div class="modal-overlay" id="disposalModal">
    <div class="modal">
        <div class="modal-header">
            <div class="modal-icon">🗑️</div>
            <div>
                <div class="modal-title">폐기 처리 등록</div>
                <div class="modal-desc">폐기할 제료와 사유를 입력하세요</div>
            </div>
        </div>

        <form id="disposalForm" onsubmit="return false;">
            <div class="form-group">
                <label class="form-label required">제료 선택</label>
                <select class="form-select" id="itemSelect" required>
                    <option value="">제료를 선택해주세요</option>
                    <option value="INV-2024-001">소고기 패티</option>
                    <option value="INV-2024-002">랜치 소스</option>
                    <option value="INV-2024-003">양상추</option>
                    <option value="INV-2024-004">아메리칸 치즈</option>
                    <option value="INV-2024-005">토마토</option>
                    <option value="INV-2024-006">감자</option>
                    <option value="INV-2024-007">허니오트 빵</option>
                </select>
            </div>

            <div class="form-group">
                <div class="form-row">
                    <div>
                        <label class="form-label required">폐기 수량</label>
                        <input type="number" class="form-input" id="quantityInput" placeholder="폐기할 수량을 입력하세요" required />
                    </div>
                    <div style="flex: 0 0 80px;">
                        <label class="form-label">&nbsp;</label>
                        <select class="form-select" id="unitSelect" disabled style="background: #f3f4f6;">
                            <option>단위</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label class="form-label required">폐기 사유</label>
                <select class="form-select" id="reasonSelect" required>
                    <option value="">폐기 사유를 선택해주세요</option>
                    <option value="유통기한 만료">유통기한 만료</option>
                    <option value="품질 불량">품질 불량</option>
                    <option value="기타">기타</option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">상세 사유 (선택)</label>
                <textarea class="form-input" id="detailInput" placeholder="폐기 사유에 대한 상세 내용을 입력하세요" style="resize: vertical; min-height: 80px;"></textarea>
            </div>

            <div class="modal-buttons">
                <button type="button" class="btn btn-cancel" onclick="closeDisposalModal()">취소</button>
                <button type="submit" class="btn btn-submit" onclick="submitDisposal()">폐기 처리</button>
            </div>
        </form>
    </div>
</div>

<script>
const items = [
    { code: 'INV-2024-001', name: '소고기 패티', unit: '개', stock: 45 },
    { code: 'INV-2024-002', name: '랜치 소스', unit: 'L', stock: 12 },
    { code: 'INV-2024-003', name: '양상추', unit: 'kg', stock: 8 },
    { code: 'INV-2024-004', name: '아메리칸 치즈', unit: '개', stock: 30 },
    { code: 'INV-2024-005', name: '토마토', unit: 'kg', stock: 15 },
    { code: 'INV-2024-006', name: '감자', unit: 'kg', stock: 15 },
    { code: 'INV-2024-007', name: '허니오트 빵', unit: '개', stock: 80 },
];

document.querySelectorAll('.tab-button').forEach(btn => {
    btn.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
        
        document.getElementById(tabName + '-tab').classList.add('active');
        this.classList.add('active');
        
        if (tabName === 'disposal') {
            this.classList.remove('inactive');
            this.classList.add('disposal');
            document.querySelector('[data-tab="history"]').classList.add('inactive');
            document.querySelector('[data-tab="history"]').classList.remove('history');
        } else {
            this.classList.remove('inactive');
            this.classList.add('history');
            document.querySelector('[data-tab="disposal"]').classList.add('inactive');
            document.querySelector('[data-tab="disposal"]').classList.remove('disposal');
        }
    });
});

document.getElementById('openDisposalBtn').addEventListener('click', () => {
    document.getElementById('disposalModal').classList.add('show');
});

document.getElementById('historyBtn').addEventListener('click', () => {
    document.querySelector('[data-tab="history"]').click();
});

document.getElementById('disposalBtn').addEventListener('click', () => {
    document.querySelector('[data-tab="disposal"]').click();
});

function closeDisposalModal() {
    document.getElementById('disposalModal').classList.remove('show');
}

document.getElementById('disposalModal').addEventListener('click', function(e) {
    if (e.target === this) closeDisposalModal();
});

document.getElementById('itemSelect').addEventListener('change', function() {
    const selected = items.find(i => i.code === this.value);
    if (selected) {
        document.getElementById('unitSelect').value = selected.unit;
    }
});

function submitDisposal() {
    const item = document.getElementById('itemSelect').value;
    const quantity = document.getElementById('quantityInput').value;
    const reason = document.getElementById('reasonSelect').value;
    
    if (!item || !quantity || !reason) {
        alert('모든 필수 항목을 입력해주세요.');
        return false;
    }
    
    alert('폐기 처리가 완료되었습니다.');
    closeDisposalModal();
    document.getElementById('disposalForm').reset();
    return false;
}

document.getElementById('downloadBtn').addEventListener('click', function() {
    alert('엑셀 다운로드 기능입니다.');
});
</script>
</body>
</html>
