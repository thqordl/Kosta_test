<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>레시피 상세</title>
  <style>
    body { margin: 0; font-family: "Malgun Gothic", sans-serif; background: transparent; color: #111827; }
    .overlay { min-height: 100vh; background: transparent; display: grid; place-items: center; padding: 16px; box-sizing: border-box; }
    .modal { width: min(980px, 100%); background: #fff; border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.22); }
    .top { padding: 14px 18px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; }
    .top h1 { margin: 0; font-size: 38px; letter-spacing: -0.02em; }
    .close { display: inline-flex; width: 30px; height: 30px; align-items: center; justify-content: center; border-radius: 8px; text-decoration: none; }
    .close img { width: 20px; height: 20px; }

    .body { padding: 16px 18px 18px; }
    .hero { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .hero img { width: 100%; height: 250px; object-fit: cover; border-radius: 10px; }
    .kv .k { font-size: 13px; color: #6b7280; }
    .kv .v { margin-top: 2px; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
    .kv + .kv { margin-top: 10px; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; background: #dcfce7; color: #15803d; }

    .stat-grid { margin-top: 14px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
    .sbox { border-radius: 10px; padding: 12px 14px; }
    .s1 { background: #dbeafe; } .s2 { background: #ffedd5; } .s3 { background: #dcfce7; }
    .sbox .k { font-size: 13px; color: #6b7280; }
    .sbox .v { margin-top: 3px; font-size: 20px; font-weight: 800; }
    .s1 .v { color: #1d4ed8; } .s2 .v { color: #c2410c; } .s3 .v { color: #15803d; }

    .sub-grid { margin-top: 14px; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .sub-grid .k { font-size: 13px; color: #6b7280; }
    .sub-grid .v { margin-top: 3px; font-size: 18px; font-weight: 800; }

    .section-title { margin: 16px 0 8px; font-size: 20px; font-weight: 800; }
    .table { border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; }
    .row { display: grid; grid-template-columns: 1fr auto; gap: 12px; padding: 10px 14px; border-bottom: 1px solid #e5e7eb; font-size: 16px; }
    .row:last-child { border-bottom: 0; }

    .inst { margin-top: 8px; background: #f3f4f6; border-radius: 10px; padding: 12px 14px; font-size: 16px; color: #374151; line-height: 1.55; }
    .actions { margin-top: 16px; }
    .actions a { display: block; text-align: center; height: 40px; line-height: 40px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px; color: #374151; background: #f9fafb; border: 1px solid #d1d5db; }

    @media (max-width: 1300px) {
      .top h1 { font-size: 26px; }
      .hero { grid-template-columns: 1fr; }
      .kv .k, .sbox .k, .sub-grid .k { font-size: 14px; }
      .kv .v { font-size: 20px; }
      .badge { font-size: 12px; }
      .sbox .v { font-size: 19px; }
      .sub-grid .v { font-size: 17px; }
      .section-title { font-size: 20px; }
      .row { font-size: 18px; }
      .inst { font-size: 16px; }
      .actions a { font-size: 14px; }
    }
  </style>
</head>
<body>
<div class="overlay">
  <section class="modal">
    <header class="top">
      <h1>레시피 상세 (조회 전용)</h1>
      <a class="close" href="<%= request.getContextPath() %>/branch/recipe/main.jsp"><img src="<%= request.getContextPath() %>/branch/icons/recipe/x.svg" alt="닫기" /></a>
    </header>

    <div class="body">
      <div class="hero">
        <img id="image" src="" alt="레시피" />
        <div>
          <div class="kv"><div class="k">레시피명</div><div id="name" class="v"></div></div>
          <div class="kv"><div class="k">카테고리</div><div id="category" class="v" style="font-size:18px;"></div></div>
          <div class="kv"><div class="k">설명</div><div id="desc" class="v" style="font-size:15px;font-weight:600;color:#374151;"></div></div>
          <div class="kv"><div class="k">상태</div><span class="badge" id="status">활성화</span></div>
        </div>
      </div>

      <div class="stat-grid">
        <div class="sbox s1"><div class="k">판매가</div><div class="v" id="price"></div></div>
        <div class="sbox s2"><div class="k">원가</div><div class="v" id="cost"></div></div>
        <div class="sbox s3"><div class="k">마진율</div><div class="v" id="margin"></div></div>
      </div>

      <div class="sub-grid">
        <div><div class="k">조리 시간</div><div class="v" id="prep"></div></div>
        <div><div class="k">난이도</div><div class="v" id="difficulty"></div></div>
      </div>

      <h2 class="section-title">필요 재료</h2>
      <div class="table" id="ingredients"></div>

      <h2 class="section-title">조리 방법</h2>
      <div class="inst" id="instructions"></div>

      <div class="actions"><a href="<%= request.getContextPath() %>/branch/recipe/main.jsp">닫기</a></div>
    </div>
  </section>
</div>

<script>
(function() {
  var recipes = {
    r1: {
      name:"이탈리안 비엠티", category:"샌드위치", desc:"살라미, 페퍼로니, 햄이 들어간 서브웨이 클래식", price:7500, cost:3200,
      image:"https://images.unsplash.com/photo-1509722747041-616f39b57569?w=1200&h=800&fit=crop", prep:"5분", difficulty:"쉬움", active:true,
      ingredients:[["허니오트 빵","1개"],["햄","30g"],["살라미","30g"],["페퍼로니","30g"],["양상추","30g"],["토마토","3슬라이스"],["오이","6슬라이스"],["랜치 소스","20ml"]],
      instructions:"1. 빵을 반으로 자릅니다. 2. 고기류를 빵 위에 올립니다. 3. 야채를 올립니다. 4. 소스를 뿌립니다."
    },
    r2: {
      name:"로티세리 치킨", category:"샌드위치", desc:"오븐에 구운 부드러운 치킨 샌드위치", price:8000, cost:3500,
      image:"https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&h=800&fit=crop", prep:"6분", difficulty:"쉬움", active:true,
      ingredients:[["위트 빵","1개"],["치킨 스트립","80g"],["양상추","30g"],["토마토","3슬라이스"],["아메리칸 치즈","2장"],["스위트 어니언 소스","20ml"]],
      instructions:"1. 빵을 반으로 자릅니다. 2. 치킨을 데웁니다. 3. 야채와 치즈를 올립니다. 4. 소스를 뿌립니다."
    },
    r3: {
      name:"참치 샌드위치", category:"샌드위치", desc:"고소한 참치로 만든 샌드위치", price:7000, cost:2800,
      image:"https://images.unsplash.com/photo-1509722747041-616f39b57569?w=1200&h=800&fit=crop", prep:"5분", difficulty:"쉬움", active:true,
      ingredients:[["허니오트 빵","1개"],["참치","80g"],["양상추","30g"],["오이","6슬라이스"],["피망","20g"],["올리브 오일","10ml"]],
      instructions:"1. 빵을 반으로 자릅니다. 2. 참치를 올립니다. 3. 야채를 올립니다. 4. 올리브 오일을 뿌립니다."
    },
    r4: {
      name:"초콜릿칩 쿠키", category:"디저트", desc:"시그니처 초콜릿 칩 쿠키", price:2000, cost:800,
      image:"https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1200&h=800&fit=crop", prep:"3분", difficulty:"쉬움", active:true,
      ingredients:[["초콜릿칩 쿠키","1개"]],
      instructions:"1. 쿠키를 포장합니다."
    },
    r5: {
      name:"베지 샌드위치", category:"샌드위치", desc:"신선한 야채로 만든 건강한 샌드위치", price:6000, cost:2000,
      image:"https://images.unsplash.com/photo-1509722747041-616f39b57569?w=1200&h=800&fit=crop", prep:"4분", difficulty:"쉬움", active:true,
      ingredients:[["위트 빵","1개"],["양상추","40g"],["토마토","4슬라이스"],["오이","8슬라이스"],["피망","30g"],["올리브","15g"],["랜치 소스","20ml"]],
      instructions:"1. 빵을 반으로 자릅니다. 2. 야채를 차례로 올립니다. 3. 소스를 뿌립니다."
    }
  };

  function won(n) { return "₩" + n.toLocaleString(); }
  var id = new URLSearchParams(location.search).get("id") || "r1";
  var r = recipes[id] || recipes.r1;

  document.getElementById("image").src = r.image;
  document.getElementById("image").alt = r.name;
  document.getElementById("name").textContent = r.name;
  document.getElementById("category").textContent = r.category;
  document.getElementById("desc").textContent = r.desc;
  document.getElementById("status").textContent = r.active ? "활성화" : "비활성화";
  document.getElementById("price").textContent = won(r.price);
  document.getElementById("cost").textContent = won(r.cost);
  document.getElementById("margin").textContent = (((r.price - r.cost) / r.price) * 100).toFixed(1) + "%";
  document.getElementById("prep").textContent = r.prep;
  document.getElementById("difficulty").textContent = r.difficulty;
  document.getElementById("instructions").textContent = r.instructions;

  var box = document.getElementById("ingredients");
  r.ingredients.forEach(function(item) {
    var row = document.createElement("div");
    row.className = "row";
    row.innerHTML = "<span>" + item[0] + "</span><strong>" + item[1] + "</strong>";
    box.appendChild(row);
  });
})();
</script>
</body>
</html>
