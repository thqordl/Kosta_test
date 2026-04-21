<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>레시피 관리</title>
  <style>
    body { margin: 0; font-family: "Malgun Gothic", sans-serif; background: #f3f4f6; color: #111827; }
    .wrap {
    width: 100%; max-width: none; margin: 0; padding: 14px 20px 28px; }
    .head h1 { margin: 0; font-size: 30px; letter-spacing: -0.03em; }
    .head p { margin: 8px 0 0; font-size: 16px; color: #6b7280; }

    .stats { margin-top: 14px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
    .stat { background: #fff; border: 1px solid #d1d5db; border-radius: 14px; padding: 10px 12px; display: flex; align-items: center; gap: 10px; }
    .stat-ico { width: 32px; height: 32px; border-radius: 10px; display: grid; place-items: center; }
    .stat-ico img { width: 16px; height: 16px; display: block; }
    .s1 { background: #dbeafe; } .s2 { background: #dcfce7; } .s3 { background: #ffedd5; } .s4 { background: #f3e8ff; }
    .stat .num { font-size: 30px; font-weight: 800; line-height: 1; }
    .stat .label { margin-top: 4px; font-size: 13px; color: #6b7280; }

    .filter-box { margin-top: 14px; background: #fff; border: 1px solid #d1d5db; border-radius: 14px; padding: 14px; }
    .filter-title { font-size: 14px; font-weight: 700; color: #374151; margin-bottom: 10px; }
    .categories { display: flex; gap: 8px; flex-wrap: wrap; }
    .cat-btn { border: 0; height: 34px; padding: 0 14px; border-radius: 10px; background: #e5e7eb; color: #374151; font-size: 14px; font-weight: 700; cursor: pointer; }
    .cat-btn.active { background: #2563eb; color: #fff; }

    .search-row { margin-top: 12px; display: flex; gap: 10px; align-items: center; }
    .search-wrap { flex: 1; position: relative; }
    .search-wrap input { width: 100%; height: 38px; border: 1px solid #cfd6dd; border-radius: 10px; box-sizing: border-box; padding: 0 12px 0 40px; font-size: 14px; }
    .search-wrap img { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; }
    .state-btn { border: 0; height: 38px; padding: 0 16px; border-radius: 10px; background: #e5e7eb; color: #374151; font-size: 14px; font-weight: 700; cursor: pointer; }
    .state-btn.active-all { background: #111827; color: #fff; }
    .state-btn.active-yes { background: #16a34a; color: #fff; }
    .state-btn.active-no { background: #ea580c; color: #fff; }

    .grid { margin-top: 14px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
    .card { background: #fff; border: 1px solid #d1d5db; border-radius: 14px; overflow: hidden; text-decoration: none; color: inherit; }
    .thumb { position: relative; height: 170px; background: #d1d5db; }
    .thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .chip { position: absolute; top: 8px; left: 8px; border-radius: 999px; padding: 4px 10px; font-size: 12px; font-weight: 700; background: #dbeafe; color: #2563eb; }
    .chip-ok { left: auto; right: 8px; background: #dcfce7; color: #15803d; }
    .body { padding: 10px 12px 12px; }
    .name { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
    .desc { margin: 8px 0 0; color: #6b7280; font-size: 14px; min-height: 48px; }
    .price-row { margin-top: 10px; display: flex; justify-content: space-between; }
    .price-row .k { font-size: 12px; color: #6b7280; }
    .price-row .v { font-size: 16px; font-weight: 700; margin-top: 2px; }
    .meta { margin-top: 10px; display: flex; gap: 12px; color: #6b7280; font-size: 12px; }
    .meta span { display: inline-flex; align-items: center; gap: 5px; }
    .meta img { width: 14px; height: 14px; }
    .empty { margin-top: 16px; background: #fff; border: 1px solid #d1d5db; border-radius: 14px; padding: 32px; text-align: center; color: #6b7280; display: none; }

    @media (max-width: 1400px) {
      .head h1 { font-size: 28px; }
      .head p { font-size: 18px; }
      .stat .num { font-size: 26px; }
      .stat .label { font-size: 14px; }
      .cat-btn { font-size: 14px; }
      .search-wrap input, .state-btn { font-size: 14px; }
      .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .name { font-size: 19px; }
      .desc { font-size: 14px; }
      .price-row .k { font-size: 12px; }
      .price-row .v { font-size: 15px; }
      .meta { font-size: 12px; }
      .chip { font-size: 12px; }
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
        <section class="head">
          <h1>레시피 관리</h1>
          <p>메뉴 레시피를 조회하세요 (조회 전용)</p>
        </section>

        <section class="stats">
          <article class="stat"><div class="stat-ico s1"><img src="<%= request.getContextPath() %>/branch/icons/recipe/chef-hat.svg" alt="전체" /></div><div><div class="num" id="sTotal">0</div><div class="label">전체 레시피</div></div></article>
          <article class="stat"><div class="stat-ico s2"><img src="<%= request.getContextPath() %>/branch/icons/recipe/check-circle.svg" alt="활성" /></div><div><div class="num" id="sActive">0</div><div class="label">활성화</div></div></article>
          <article class="stat"><div class="stat-ico s3"><img src="<%= request.getContextPath() %>/branch/icons/recipe/alert-circle.svg" alt="비활성" /></div><div><div class="num" id="sInactive">0</div><div class="label">비활성화</div></div></article>
          <article class="stat"><div class="stat-ico s4"><img src="<%= request.getContextPath() %>/branch/icons/recipe/won.svg" alt="원가" /></div><div><div class="num" id="sAvg">₩0</div><div class="label">평균 원가</div></div></article>
        </section>

        <section class="filter-box">
          <div class="filter-title">카테고리</div>
          <div class="categories" id="cats"></div>
          <div class="search-row">
            <div class="search-wrap">
              <img src="<%= request.getContextPath() %>/branch/icons/recipe/search.svg" alt="검색" />
              <input id="searchInput" type="text" placeholder="레시피명 검색..." />
            </div>
            <button class="state-btn active-all" data-state="all">전체</button>
            <button class="state-btn" data-state="active">활성화</button>
            <button class="state-btn" data-state="inactive">비활성화</button>
          </div>
        </section>

        <section class="grid" id="recipeGrid"></section>
        <section class="empty" id="emptyBox">검색 결과가 없습니다. 다른 검색어나 필터를 시도해보세요.</section>
      </div>
    </main>
  </div>
</div>

<script>
(function() {
  var categories = ["전체", "샌드위치", "샐러드", "사이드", "음료", "수프"];
  var recipes = [
    { id:"r1", name:"이탈리안 비엠티", category:"샌드위치", desc:"살라미, 페퍼로니, 햄이 들어간 서브웨이 클래식", price:7500, cost:3200, image:"https://images.unsplash.com/photo-1509722747041-616f39b57569?w=1000&h=700&fit=crop", active:true, prep:5, ingredients:8 },
    { id:"r2", name:"로티세리 치킨", category:"샌드위치", desc:"오븐에 구운 부드러운 치킨 샌드위치", price:8000, cost:3500, image:"https://images.unsplash.com/photo-1550547660-d9450f859349?w=1000&h=700&fit=crop", active:true, prep:6, ingredients:6 },
    { id:"r3", name:"참치 샌드위치", category:"샌드위치", desc:"고소한 참치로 만든 샌드위치", price:7000, cost:2800, image:"https://images.unsplash.com/photo-1509722747041-616f39b57569?w=1000&h=700&fit=crop", active:true, prep:5, ingredients:6 },
    { id:"r4", name:"초콜릿칩 쿠키", category:"디저트", desc:"시그니처 초콜릿 칩 쿠키", price:2000, cost:800, image:"https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1000&h=700&fit=crop", active:true, prep:3, ingredients:1 },
    { id:"r5", name:"베지 샌드위치", category:"샌드위치", desc:"신선한 야채로 만든 건강한 샌드위치", price:6000, cost:2000, image:"https://images.unsplash.com/photo-1509722747041-616f39b57569?w=1000&h=700&fit=crop", active:true, prep:4, ingredients:7 }
  ];

  var state = { category:"전체", status:"all", q:"" };
  var catsBox = document.getElementById("cats");
  var grid = document.getElementById("recipeGrid");
  var empty = document.getElementById("emptyBox");

  function won(n){ return "₩" + n.toLocaleString(); }
  function stats() {
    var total = recipes.length;
    var active = recipes.filter(function(r){ return r.active; }).length;
    var inactive = total - active;
    var avg = Math.round(recipes.reduce(function(s, r){ return s + r.cost; }, 0) / total);
    document.getElementById("sTotal").textContent = String(total);
    document.getElementById("sActive").textContent = String(active);
    document.getElementById("sInactive").textContent = String(inactive);
    document.getElementById("sAvg").textContent = won(avg);
  }

  function drawCats() {
    catsBox.innerHTML = "";
    categories.forEach(function(c) {
      var b = document.createElement("button");
      b.className = "cat-btn" + (state.category === c ? " active" : "");
      b.textContent = c;
      b.addEventListener("click", function(){ state.category = c; drawCats(); render(); });
      catsBox.appendChild(b);
    });
  }

  function render() {
    var filtered = recipes.filter(function(r) {
      var c = state.category === "전체" || r.category === state.category;
      var s = state.status === "all" || (state.status === "active" && r.active) || (state.status === "inactive" && !r.active);
      var q = r.name.toLowerCase().indexOf(state.q.toLowerCase()) !== -1;
      return c && s && q;
    });

    grid.innerHTML = "";
    filtered.forEach(function(r){
      var a = document.createElement("a");
      a.className = "card";
      a.href = "<%= request.getContextPath() %>/branch/recipe/recipe_detail.jsp?id=" + encodeURIComponent(r.id);
      a.innerHTML =
        '<div class="thumb">' +
          '<img src="' + r.image + '" alt="' + r.name + '">' +
          '<span class="chip">' + r.category + '</span>' +
          '<span class="chip chip-ok">' + (r.active ? '활성화' : '비활성화') + '</span>' +
        '</div>' +
        '<div class="body">' +
          '<h3 class="name">' + r.name + '</h3>' +
          '<p class="desc">' + r.desc + '</p>' +
          '<div class="price-row"><div><div class="k">판매가</div><div class="v">' + won(r.price) + '</div></div><div><div class="k">원가</div><div class="v">' + won(r.cost) + '</div></div></div>' +
          '<div class="meta"><span><img src="<%= request.getContextPath() %>/branch/icons/recipe/clock.svg" alt="시간"> ' + r.prep + '분</span><span><img src="<%= request.getContextPath() %>/branch/icons/recipe/package.svg" alt="재료"> ' + r.ingredients + '개 재료</span></div>' +
        '</div>';
      grid.appendChild(a);
    });

    empty.style.display = filtered.length ? "none" : "block";
  }

  document.getElementById("searchInput").addEventListener("input", function(e){ state.q = e.target.value; render(); });
  document.querySelectorAll(".state-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      state.status = btn.getAttribute("data-state");
      document.querySelectorAll(".state-btn").forEach(function(b) {
        b.classList.remove("active-all", "active-yes", "active-no");
      });
      if (state.status === "all") btn.classList.add("active-all");
      if (state.status === "active") btn.classList.add("active-yes");
      if (state.status === "inactive") btn.classList.add("active-no");
      render();
    });
  });

  stats();
  drawCats();
  render();
})();
</script>
</body>
</html>
