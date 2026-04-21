<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>발주 품목 추가</title>
    <style>
        body { margin: 0; font-family: "Malgun Gothic", sans-serif; background: transparent; }
        .overlay { min-height: 100vh; background: transparent; display: flex; align-items: center; justify-content: center; padding: 16px; box-sizing: border-box; }
        .modal { width: min(940px, 100%); height: min(95vh, 1700px); background: #fff; border-radius: 16px; display: flex; flex-direction: column; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.22); }

        .modal-head { padding: 18px 22px 12px; border-bottom: 1px solid #e5e7eb; background: #fff; }
        .head-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
        .title { margin: 0; font-size: 24px; line-height: 1.1; font-weight: 900; color: #111827; letter-spacing: -0.02em; }
        .subtitle { margin: 8px 0 0; font-size: 14px; color: #6b7280; }
        .close-x { border: 0; background: transparent; color: #9aa3af; font-size: 24px; line-height: 1; cursor: pointer; }

        .search-wrap { margin-top: 14px; position: relative; }
        .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #9aa3af; font-size: 16px; }
        .search-input { width: 100%; box-sizing: border-box; height: 44px; border: 1px solid #d1d5db; border-radius: 10px; padding: 0 14px 0 42px; font-size: 14px; background: #f9fafb; }

        .modal-body { flex: 1; overflow: auto; padding: 16px 18px 18px; }
        .item-list { display: grid; gap: 12px; }
        .item { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 14px 14px; display: flex; align-items: center; justify-content: space-between; gap: 14px; }
        .item.low { border-color: #fde68a; background: #fffbeb; }
        .item.disabled { background: #fff; opacity: 0.72; }
        .left { min-width: 0; }
        .row1 { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .name { font-size: 20px; font-weight: 800; color: #1f2937; letter-spacing: -0.02em; }
        .chip { display: inline-flex; align-items: center; height: 24px; padding: 0 10px; border-radius: 999px; background: #eef2f7; color: #6b7280; font-size: 13px; font-weight: 700; }
        .chip.low { background: #fff2cc; color: #b7791f; }
        .code { margin-top: 8px; font-size: 13px; color: #9aa3af; }
        .meta { margin-top: 8px; display: flex; gap: 14px; flex-wrap: wrap; font-size: 13px; }
        .cur { color: #ef4444; font-weight: 800; }
        .safe { color: #6b7280; }
        .lack { color: #ef4444; font-weight: 800; }

        .btn-add { border: 0; min-width: 84px; height: 38px; padding: 0 14px; border-radius: 999px; font-size: 14px; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px; transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, color 0.15s ease; }
        .btn-add.on { background: linear-gradient(135deg, #3b82f6, #2563eb); color: #fff; box-shadow: 0 10px 20px rgba(37, 99, 235, 0.22); }
        .btn-add.on::before { content: "+"; display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; border-radius: 999px; background: rgba(255, 255, 255, 0.18); font-size: 14px; line-height: 1; font-weight: 900; }
        .btn-add.on:hover { background: linear-gradient(135deg, #4f86f7, #1d4ed8); box-shadow: 0 12px 24px rgba(37, 99, 235, 0.28); transform: translateY(-1px); }
        .btn-add.on:active { transform: translateY(0); box-shadow: 0 8px 16px rgba(37, 99, 235, 0.2); }
        .btn-add.off { background: #f3f4f6; color: #6b7280; cursor: not-allowed; border: 1px solid #d1d5db; }
        .btn-add.off::before { content: "✓"; display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; border-radius: 999px; background: #e5e7eb; font-size: 12px; line-height: 1; font-weight: 900; color: #6b7280; }

        .modal-foot { border-top: 1px solid #e5e7eb; background: #fff; padding: 16px 18px; }
        .btn-close { width: 100%; height: 42px; border: 1px solid #d1d5db; background: #f9fafb; color: #374151; border-radius: 10px; font-size: 14px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; }

        @media (max-width: 980px) {
            .title { font-size: 24px; }
            .name { font-size: 17px; }
            .code { font-size: 12px; }
            .meta { font-size: 12px; }
            .btn-add { height: 36px; font-size: 13px; }
        }
        @media (max-width: 680px) {
            .overlay { padding: 8px; }
            .modal { width: 100%; height: 96vh; }
            .title { font-size: 20px; }
            .subtitle { font-size: 13px; }
            .search-input { height: 42px; font-size: 14px; }
            .item { flex-direction: column; align-items: flex-start; }
            .name { font-size: 15px; }
            .code { font-size: 14px; }
            .meta { font-size: 13px; }
            .btn-add { width: 100%; font-size: 13px; }
            .btn-close { font-size: 14px; height: 40px; }
        }
    </style>
</head>
<body>
<div class="overlay">
    <section class="modal" role="dialog" aria-modal="true" aria-label="발주 품목 추가">
        <div class="modal-head">
            <div class="head-row">
                <div>
                    <h1 class="title">발주 품목 추가</h1>
                    <p class="subtitle">발주할 품목을 선택하세요</p>
                </div>
                <a class="close-x" href="/branch/purchase_order/create.jsp" aria-label="닫기">×</a>
            </div>
            <div class="search-wrap">
                <span class="search-icon">⌕</span>
                <input class="search-input" type="text" placeholder="품목명, 품목코드, 카테고리로 검색..." />
            </div>
        </div>

        <div class="modal-body">
            <div class="item-list">
                <div class="item low disabled">
                    <div class="left">
                        <div class="row1">
                            <strong class="name">소고기 패티</strong>
                            <span class="chip">육류</span>
                            <span class="chip low">⚠ 재고 부족</span>
                        </div>
                        <div class="code">품목코드: MEAT-001</div>
                        <div class="meta"><span class="cur">현재: 45개</span><span class="safe">안전: 50개</span><span class="lack">부족: 5개</span></div>
                    </div>
                    <button class="btn-add off" type="button" disabled>추가됨</button>
                </div>

                <div class="item low disabled">
                    <div class="left">
                        <div class="row1">
                            <strong class="name">감자</strong>
                            <span class="chip">채소</span>
                            <span class="chip low">⚠ 재고 부족</span>
                        </div>
                        <div class="code">품목코드: VEG-001</div>
                        <div class="meta"><span class="cur">현재: 15kg</span><span class="safe">안전: 50kg</span><span class="lack">부족: 35kg</span></div>
                    </div>
                    <button class="btn-add off" type="button" disabled>추가됨</button>
                </div>

                <div class="item low disabled">
                    <div class="left">
                        <div class="row1">
                            <strong class="name">생크림</strong>
                            <span class="chip">유제품</span>
                            <span class="chip low">⚠ 재고 부족</span>
                        </div>
                        <div class="code">품목코드: DAIRY-001</div>
                        <div class="meta"><span class="cur">현재: 12L</span><span class="safe">안전: 15L</span><span class="lack">부족: 3L</span></div>
                    </div>
                    <button class="btn-add off" type="button" disabled>추가됨</button>
                </div>

                <div class="item low disabled">
                    <div class="left">
                        <div class="row1">
                            <strong class="name">양상추</strong>
                            <span class="chip">채소</span>
                            <span class="chip low">⚠ 재고 부족</span>
                        </div>
                        <div class="code">품목코드: VEG-002</div>
                        <div class="meta"><span class="cur">현재: 8kg</span><span class="safe">안전: 20kg</span><span class="lack">부족: 12kg</span></div>
                    </div>
                    <button class="btn-add off" type="button" disabled>추가됨</button>
                </div>

                <div class="item" data-item-added="false">
                    <div class="left">
                        <div class="row1"><strong class="name">버거빵</strong><span class="chip">빵류</span></div>
                        <div class="code">품목코드: BREAD-001</div>
                        <div class="meta"><span><strong>현재: 180개</strong></span><span class="safe">안전: 150개</span></div>
                    </div>
                    <a class="btn-add on" href="/branch/purchase_order/create.jsp">추가</a>
                </div>

                <div class="item" data-item-added="false">
                    <div class="left">
                        <div class="row1"><strong class="name">체다치즈</strong><span class="chip">유제품</span></div>
                        <div class="code">품목코드: DAIRY-002</div>
                        <div class="meta"><span><strong>현재: 35장</strong></span><span class="safe">안전: 25장</span></div>
                    </div>
                    <a class="btn-add on" href="/branch/purchase_order/create.jsp">추가</a>
                </div>

                <div class="item" data-item-added="false">
                    <div class="left">
                        <div class="row1"><strong class="name">식용유</strong><span class="chip">소스류</span></div>
                        <div class="code">품목코드: SAUCE-001</div>
                        <div class="meta"><span><strong>현재: 20L</strong></span><span class="safe">안전: 15L</span></div>
                    </div>
                    <a class="btn-add on" href="/branch/purchase_order/create.jsp">추가</a>
                </div>

                <div class="item" data-item-added="false">
                    <div class="left">
                        <div class="row1"><strong class="name">토마토</strong><span class="chip">채소</span></div>
                        <div class="code">품목코드: VEG-003</div>
                        <div class="meta"><span><strong>현재: 18kg</strong></span><span class="safe">안전: 15kg</span></div>
                    </div>
                    <a class="btn-add on" href="/branch/purchase_order/create.jsp">추가</a>
                </div>

                <div class="item" data-item-added="false">
                    <div class="left">
                        <div class="row1"><strong class="name">양파</strong><span class="chip">채소</span></div>
                        <div class="code">품목코드: VEG-004</div>
                        <div class="meta"><span><strong>현재: 25kg</strong></span><span class="safe">안전: 20kg</span></div>
                    </div>
                    <a class="btn-add on" href="/branch/purchase_order/create.jsp">추가</a>
                </div>

                <div class="item" data-item-added="false">
                    <div class="left">
                        <div class="row1"><strong class="name">케찹</strong><span class="chip">소스류</span></div>
                        <div class="code">품목코드: SAUCE-002</div>
                        <div class="meta"><span><strong>현재: 12병</strong></span><span class="safe">안전: 10병</span></div>
                    </div>
                    <a class="btn-add on" href="/branch/purchase_order/create.jsp">추가</a>
                </div>

                <div class="item" data-item-added="false">
                    <div class="left">
                        <div class="row1"><strong class="name">머스타드</strong><span class="chip">소스류</span></div>
                        <div class="code">품목코드: SAUCE-003</div>
                        <div class="meta"><span><strong>현재: 10병</strong></span><span class="safe">안전: 8병</span></div>
                    </div>
                    <a class="btn-add on" href="/branch/purchase_order/create.jsp">추가</a>
                </div>

                <div class="item">
                    <div class="left">
                        <div class="row1"><strong class="name">베이컨</strong><span class="chip">육류</span></div>
                        <div class="code">품목코드: MEAT-002</div>
                        <div class="meta"><span><strong>현재: 22팩</strong></span><span class="safe">안전: 20팩</span></div>
                    </div>
                    <a class="btn-add on" href="/branch/purchase_order/create.jsp">추가</a>
                </div>
            </div>
        </div>

        <div class="modal-foot">
            <a class="btn-close" href="/branch/purchase_order/create.jsp">닫기</a>
        </div>
    </div>
</div>
<script>
    (function () {
        function closePopupOrFallback() {
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({ type: 'close-purchase-popup' }, '*');
            }
        }

        var closeElements = document.querySelectorAll('.close-x, .btn-close');
        for (var i = 0; i < closeElements.length; i += 1) {
            closeElements[i].addEventListener('click', function (event) {
                event.preventDefault();
                closePopupOrFallback();
            });
        }

        var addButtons = document.querySelectorAll('.btn-add.on');
        for (var j = 0; j < addButtons.length; j += 1) {
            addButtons[j].addEventListener('click', function (event) {
                event.preventDefault();

                var btn = event.currentTarget;
                btn.classList.remove('on');
                btn.classList.add('off');
                btn.setAttribute('aria-disabled', 'true');
                btn.textContent = '추가됨';
                btn.removeAttribute('href');

                var item = btn.closest('.item');
                if (item) {
                    item.classList.add('disabled');
                    item.setAttribute('data-item-added', 'true');
                }
            });
        }
    })();
</script>
</body>
</html>
