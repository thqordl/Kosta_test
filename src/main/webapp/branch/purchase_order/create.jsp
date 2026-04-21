<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>발주서 작성</title>
    <style>
        body { margin: 0; font-family: "Malgun Gothic", sans-serif; background: #f4f7fb; color: #111827; }
        .wrap {
    width: 100%; max-width: none; margin: 0; }
        .page-head { padding: 18px 0 12px; display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
        .page-title { margin: 0; font-size: 30px; line-height: 1.15; font-weight: 800; letter-spacing: -0.03em; }
        .page-sub { margin: 8px 0 0; font-size: 15px; color: #6b7280; }

        .head-actions { display: flex; gap: 10px; }
        .btn { height: 42px; padding: 0 16px; border-radius: 12px; border: 1px solid #d6dae3; background: #fff; color: #111827; font-size: 14px; font-weight: 800; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; cursor: pointer; }
        .btn:hover { background: #f9fafb; }
        .btn-primary { border-color: #2563eb; background: #2563eb; color: #fff; }
        .btn-primary:hover { background: #1d4ed8; }
        .btn-add { border: 0; background: #16a34a; color: #fff; min-width: 150px; justify-content: center; box-shadow: 0 8px 18px rgba(22, 163, 74, 0.3); }
        .btn-add:hover { background: #15803d; }

        .purchase-popup-overlay { position: fixed; inset: 0; z-index: 3000; background: rgba(0, 0, 0, 0.72); display: none; align-items: center; justify-content: center; padding: 18px; box-sizing: border-box; }
        .purchase-popup-overlay.active { display: flex; }
        .purchase-popup-frame { width: min(980px, 100%); height: min(94vh, 920px); border: 0; border-radius: 14px; background: transparent; }

        .card { margin-top: 12px; background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05); }
        .card.warn { border-color: #e7ce57; }
        .card.warn .card-head { background: #fef9dd; border-bottom-color: #e7ce57; }
        .card.added { border-color: #9ec6ff; }
        .card.added .card-head { background: #eaf2ff; border-bottom-color: #9ec6ff; }

        .card-head { height: 74px; padding: 0 22px; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: space-between; gap: 14px; }
        .card-title-wrap { display: flex; align-items: center; gap: 12px; }
        .card-icon { width: 42px; height: 42px; border-radius: 12px; display: grid; place-items: center; font-size: 20px; }
        .card.warn .card-icon { background: #fff1b3; color: #b7791f; }
        .card.added .card-icon { background: #d9e8ff; color: #2563eb; }
        .card-title { margin: 0; font-size: 20px; line-height: 1.1; font-weight: 800; letter-spacing: -0.02em; }
        .card-sub { margin: 4px 0 0; font-size: 13px; color: #6b7280; font-weight: 700; }
        .card-count { height: 32px; min-width: 40px; padding: 0 10px; border-radius: 10px; font-size: 14px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; }
        .card.warn .card-count { background: #fde68a; color: #7c5f00; }
        .card.added .card-count { background: #bfdbfe; color: #1d4ed8; }

        .table-wrap { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 12px 14px; border-bottom: 1px solid #edf0f5; text-align: left; font-size: 14px; }
        th { background: #fafbfc; color: #111827; font-weight: 900; }
        tbody tr:last-child td { border-bottom: 0; }

        .chip { display: inline-flex; align-items: center; height: 24px; padding: 0 9px; border-radius: 999px; background: #eef2f7; color: #475569; font-size: 12px; font-weight: 700; }
        .stock-low { color: #ef4444; font-weight: 900; }
        .qty-cell { display: inline-flex; align-items: center; gap: 8px; }
        .qty-input { width: 80px; height: 36px; box-sizing: border-box; padding: 0 10px; border: 1px solid #cfd6e2; border-radius: 10px; font-size: 14px; font-weight: 700; color: #2563eb; }
        .reason-input { width: 100%; min-width: 180px; height: 36px; box-sizing: border-box; padding: 0 10px; border: 1px solid #d5dae4; border-radius: 8px; background: #f8fafc; font-size: 13px; color: #6b7280; }
        .trash { color: #ef4444; font-size: 15px; font-weight: 700; }
        .center { text-align: center; }
        .unit { color: #475569; font-weight: 700; }
        .add-action { margin-top: 16px; display: flex; justify-content: center; }

        @media (max-width: 1280px) {
            .page-title { font-size: 28px; }
            .card-title { font-size: 18px; }
            .card-count { font-size: 13px; }
            th, td { font-size: 13px; }
            .chip { font-size: 11px; }
            .qty-input { font-size: 13px; }
            .reason-input { font-size: 12px; }
            .trash { font-size: 14px; }
        }

        @media (max-width: 980px) {
            .page-head { flex-direction: column; }
            .page-title { font-size: 26px; }
            .card-title { font-size: 16px; }
            .card-count { font-size: 12px; min-width: 34px; height: 26px; }
            th, td { font-size: 14px; }
            .chip { font-size: 11px; height: 22px; }
            .qty-input { width: 70px; height: 34px; font-size: 13px; }
            .reason-input { min-width: 130px; height: 34px; font-size: 12px; }
            .trash { font-size: 14px; }
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
    <div class="page-head">
        <div>
            <h1 class="page-title">발주서 작성</h1>
            <p class="page-sub">자동 생성된 발주서를 확인하고 품목을 추가하거나 수정하세요</p>
        </div>
        <div class="head-actions">
            <a class="btn" href="/branch/purchase_order/history.jsp">💾 초안 저장</a>
            <a class="btn btn-primary" href="/branch/purchase_order/send.jsp">✈ 본사 전송</a>
        </div>
    </div>

    <section class="card warn">
        <div class="card-head">
            <div class="card-title-wrap">
                <div class="card-icon">⚠</div>
                <div>
                    <h2 class="card-title">안전재고 미달 품목</h2>
                    <p class="card-sub">4개 품목이 안전 재고보다 부족합니다</p>
                </div>
            </div>
            <div class="card-count">4개</div>
        </div>
        <div class="table-wrap">
            <table>
                <thead>
                <tr>
                    <th>품목코드</th>
                    <th>품목명</th>
                    <th>카테고리</th>
                    <th>현재 재고</th>
                    <th>안전 재고</th>
                    <th>요청 수량</th>
                    <th>사유</th>
                    <th class="center">작업</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>MEAT-001</td>
                    <td>소고기 패티</td>
                    <td><span class="chip">육류</span></td>
                    <td class="stock-low">45개</td>
                    <td>50개</td>
                    <td>
                        <span class="qty-cell"><input class="qty-input" type="number" value="55" /> <span class="unit">개</span></span>
                    </td>
                    <td><input class="reason-input" type="text" value="안전재고 미달 + 일평균 소비량 고려" /></td>
                    <td class="center"><span class="trash">🗑</span></td>
                </tr>
                <tr>
                    <td>VEG-001</td>
                    <td>감자</td>
                    <td><span class="chip">채소</span></td>
                    <td class="stock-low">15kg</td>
                    <td>50kg</td>
                    <td>
                        <span class="qty-cell"><input class="qty-input" type="number" value="85" /> <span class="unit">kg</span></span>
                    </td>
                    <td><input class="reason-input" type="text" value="안전재고 미달 (35kg 부족)" /></td>
                    <td class="center"><span class="trash">🗑</span></td>
                </tr>
                <tr>
                    <td>DAIRY-001</td>
                    <td>생크림</td>
                    <td><span class="chip">유제품</span></td>
                    <td class="stock-low">12L</td>
                    <td>15L</td>
                    <td>
                        <span class="qty-cell"><input class="qty-input" type="number" value="18" /> <span class="unit">L</span></span>
                    </td>
                    <td><input class="reason-input" type="text" value="안전재고 미달 + 유통기한 고려" /></td>
                    <td class="center"><span class="trash">🗑</span></td>
                </tr>
                <tr>
                    <td>VEG-002</td>
                    <td>양상추</td>
                    <td><span class="chip">채소</span></td>
                    <td class="stock-low">8kg</td>
                    <td>20kg</td>
                    <td>
                        <span class="qty-cell"><input class="qty-input" type="number" value="27" /> <span class="unit">kg</span></span>
                    </td>
                    <td><input class="reason-input" type="text" value="안전재고 미달 (12kg 부족)" /></td>
                    <td class="center"><span class="trash">🗑</span></td>
                </tr>
                </tbody>
            </table>
        </div>
    </section>

    <section class="card added">
        <div class="card-head">
            <div class="card-title-wrap">
                <div class="card-icon">＋</div>
                <div>
                    <h2 class="card-title">추가 발주 품목</h2>
                    <p class="card-sub">수동으로 추가한 발주 품목입니다</p>
                </div>
            </div>
            <div class="card-count">2개</div>
        </div>
        <div class="table-wrap">
            <table>
                <thead>
                <tr>
                    <th>품목코드</th>
                    <th>품목명</th>
                    <th>카테고리</th>
                    <th>현재 재고</th>
                    <th>안전 재고</th>
                    <th>요청 수량</th>
                    <th>사유</th>
                    <th class="center">작업</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>VEG-004</td>
                    <td>양파</td>
                    <td><span class="chip">채소</span></td>
                    <td><strong>25kg</strong></td>
                    <td>20kg</td>
                    <td>
                        <span class="qty-cell"><input class="qty-input" type="number" value="10" /> <span class="unit">kg</span></span>
                    </td>
                    <td><input class="reason-input" type="text" value="추가 발주 요청" /></td>
                    <td class="center"><span class="trash">🗑</span></td>
                </tr>
                <tr>
                    <td>BREAD-001</td>
                    <td>버거빵</td>
                    <td><span class="chip">빵류</span></td>
                    <td><strong>180개</strong></td>
                    <td>150개</td>
                    <td>
                        <span class="qty-cell"><input class="qty-input" type="number" value="10" /> <span class="unit">개</span></span>
                    </td>
                    <td><input class="reason-input" type="text" value="추가 발주 요청" /></td>
                    <td class="center"><span class="trash">🗑</span></td>
                </tr>
                </tbody>
            </table>
        </div>
    </section>

    <div class="add-action">
                <a class="btn btn-add open-purchase-popup" href="/branch/purchase_order/create_add.jsp">＋ 품목 추가</a>
    </div>
</div>
</main>
</div>
</div>
<div id="purchasePopupOverlay" class="purchase-popup-overlay" aria-hidden="true">
        <iframe id="purchasePopupFrame" class="purchase-popup-frame" title="발주 팝업"></iframe>
</div>
<script>
    (function () {
        var overlay = document.getElementById('purchasePopupOverlay');
        var frame = document.getElementById('purchasePopupFrame');
        var triggers = document.querySelectorAll('.open-purchase-popup');

        function openPopup(url) {
            if (!overlay || !frame || !url) return;
            frame.src = url;
            overlay.classList.add('active');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closePopup() {
            if (!overlay || !frame) return;
            overlay.classList.remove('active');
            overlay.setAttribute('aria-hidden', 'true');
            frame.src = '';
            document.body.style.overflow = '';
        }

        for (var i = 0; i < triggers.length; i += 1) {
            triggers[i].addEventListener('click', function (event) {
                event.preventDefault();
                openPopup(this.getAttribute('href'));
            });
        }

        if (overlay) {
            overlay.addEventListener('click', function (event) {
                if (event.target === overlay) closePopup();
            });
        }

        window.addEventListener('message', function (event) {
            if (event.data && event.data.type === 'close-purchase-popup') {
                closePopup();
            }
        });
    })();
</script>
</body>
</html>
