import { useState } from "react";
import {
  Search,
  Eye,
  ChefHat,
  DollarSign,
  Clock,
  AlertCircle,
  X,
  Check,
  Package,
} from "lucide-react";

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

interface Recipe {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  cost: number;
  image: string;
  isActive: boolean;
  prepTime: number;
  difficulty: "쉬움" | "보통" | "어려움";
  ingredients: Ingredient[];
  instructions: string;
  createdAt: string;
}

const categories = [
  "전체",
  "샌드위치",
  "샐러드",
  "사이드",
  "음료",
  "수프",
];

const mockRecipes: Recipe[] = [
  {
    id: "r1",
    name: "이탈리안 비엠티",
    category: "샌드위치",
    description: "살라미, 페퍼로니, 햄이 들어간 서브웨이 클래식",
    price: 7500,
    cost: 3200,
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop",
    isActive: true,
    prepTime: 5,
    difficulty: "쉬움",
    ingredients: [
      { id: "i1", name: "허니오트 빵", quantity: 1, unit: "개" },
      { id: "i2", name: "햄", quantity: 30, unit: "g" },
      { id: "i3", name: "살라미", quantity: 30, unit: "g" },
      { id: "i4", name: "페퍼로니", quantity: 30, unit: "g" },
      { id: "i5", name: "양상추", quantity: 30, unit: "g" },
      { id: "i6", name: "토마토", quantity: 3, unit: "슬라이스" },
      { id: "i7", name: "오이", quantity: 6, unit: "슬라이스" },
      { id: "i8", name: "랜치 소스", quantity: 20, unit: "ml" },
    ],
    instructions: "1. 빵을 반으로 자릅니다.\n2. 고기류를 빵 위에 올립니다.\n3. 야채를 올립니다.\n4. 소스를 뿌립니다.",
    createdAt: "2024-01-15",
  },
  {
    id: "r2",
    name: "로티세리 치킨",
    category: "샌드위치",
    description: "오븐에 구운 부드러운 치킨 샌드위치",
    price: 8000,
    cost: 3500,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop",
    isActive: true,
    prepTime: 6,
    difficulty: "쉬움",
    ingredients: [
      { id: "i9", name: "위트 빵", quantity: 1, unit: "개" },
      { id: "i10", name: "치킨 스트립", quantity: 80, unit: "g" },
      { id: "i11", name: "양상추", quantity: 30, unit: "g" },
      { id: "i12", name: "토마토", quantity: 3, unit: "슬라이스" },
      { id: "i13", name: "아메리칸 치즈", quantity: 2, unit: "장" },
      { id: "i14", name: "스위트 어니언 소스", quantity: 20, unit: "ml" },
    ],
    instructions: "1. 빵을 반으로 자릅니다.\n2. 치킨을 데웁니다.\n3. 야채와 치즈를 올립니다.\n4. 소스를 뿌립니다.",
    createdAt: "2024-01-10",
  },
  {
    id: "r3",
    name: "참치 샌드위치",
    category: "샌드위치",
    description: "고소한 참치로 만든 샌드위치",
    price: 7000,
    cost: 2800,
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop",
    isActive: true,
    prepTime: 5,
    difficulty: "쉬움",
    ingredients: [
      { id: "i15", name: "허니오트 빵", quantity: 1, unit: "개" },
      { id: "i16", name: "참치", quantity: 80, unit: "g" },
      { id: "i17", name: "양상추", quantity: 30, unit: "g" },
      { id: "i18", name: "오이", quantity: 6, unit: "슬라이스" },
      { id: "i19", name: "피망", quantity: 20, unit: "g" },
      { id: "i20", name: "올리브 오일", quantity: 10, unit: "ml" },
    ],
    instructions: "1. 빵을 반으로 자릅니다.\n2. 참치를 올립니다.\n3. 야채를 올립니다.\n4. 올리브 오일을 뿌립니다.",
    createdAt: "2024-01-20",
  },
  {
    id: "r4",
    name: "초콜릿칩 쿠키",
    category: "디저트",
    description: "시그니처 초콜릿칩 쿠키",
    price: 2000,
    cost: 800,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop",
    isActive: true,
    prepTime: 3,
    difficulty: "쉬움",
    ingredients: [
      { id: "i21", name: "초콜릿칩 쿠키", quantity: 1, unit: "개" },
    ],
    instructions: "1. 쿠키를 포장합니다.",
    createdAt: "2024-02-01",
  },
  {
    id: "r5",
    name: "베지 샌드위치",
    category: "샌드위치",
    description: "신선한 야채로 만든 건강한 샌드위치",
    price: 6000,
    cost: 2000,
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop",
    isActive: true,
    prepTime: 4,
    difficulty: "쉬움",
    ingredients: [
      { id: "i22", name: "위트 빵", quantity: 1, unit: "개" },
      { id: "i23", name: "양상추", quantity: 40, unit: "g" },
      { id: "i24", name: "토마토", quantity: 4, unit: "슬라이스" },
      { id: "i25", name: "오이", quantity: 8, unit: "슬라이스" },
      { id: "i26", name: "피망", quantity: 30, unit: "g" },
      { id: "i27", name: "올리브", quantity: 15, unit: "g" },
      { id: "i28", name: "랜치 소스", quantity: 20, unit: "ml" },
    ],
    instructions: "1. 빵을 반으로 자릅니다.\n2. 야채를 차례로 올립니다.\n3. 소스를 뿌립니다.",
    createdAt: "2024-01-25",
  },
];

export function BranchRecipeView() {
  const [recipes] = useState<Recipe[]>(mockRecipes);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "inactive">("all");
  const [modalType, setModalType] = useState<"view" | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Filter recipes
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory = selectedCategory === "전체" || recipe.category === selectedCategory;
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesActive =
      activeFilter === "all" ||
      (activeFilter === "active" && recipe.isActive) ||
      (activeFilter === "inactive" && !recipe.isActive);
    return matchesCategory && matchesSearch && matchesActive;
  });

  // Statistics
  const stats = {
    total: recipes.length,
    active: recipes.filter((r) => r.isActive).length,
    inactive: recipes.filter((r) => !r.isActive).length,
    avgCost: Math.round(recipes.reduce((sum, r) => sum + r.cost, 0) / recipes.length),
  };

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setModalType("view");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedRecipe(null);
  };

  const getProfitMargin = (recipe: Recipe) => {
    return ((recipe.price - recipe.cost) / recipe.price * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">레시피 관리</h2>
          <p className="text-gray-500 mt-1">메뉴 레시피를 조회하세요 (조회 전용)</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg border border-gray-200 px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <ChefHat className="w-4 h-4" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-500">전체 레시피</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{stats.active}</p>
              <p className="text-xs text-gray-500">활성화</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{stats.inactive}</p>
              <p className="text-xs text-gray-500">비활성화</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">₩{stats.avgCost.toLocaleString()}</p>
              <p className="text-xs text-gray-500">평균 원가</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-4">
          {/* Category filters */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">카테고리</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Search and active filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="레시피명 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === "all"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setActiveFilter("active")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === "active"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                활성화
              </button>
              <button
                onClick={() => setActiveFilter("inactive")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === "inactive"
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                비활성화
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleViewRecipe(recipe)}
          >
            <div className="relative h-48">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    recipe.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {recipe.isActive ? "활성화" : "비활성화"}
                </span>
              </div>
              <div className="absolute top-2 left-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  {recipe.category}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{recipe.name}</h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{recipe.description}</p>
              <div className="flex items-center justify-between text-sm mb-3">
                <div>
                  <span className="text-gray-500">판매가</span>
                  <p className="font-semibold text-gray-900">₩{recipe.price.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-500">원가</span>
                  <p className="font-semibold text-gray-900">₩{recipe.cost.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {recipe.prepTime}분
                </div>
                <div className="flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  {recipe.ingredients.length}개 재료
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">검색 결과가 없습니다</p>
          <p className="text-gray-400 text-sm">다른 검색어나 필터를 시도해보세요</p>
        </div>
      )}

      {/* View Recipe Modal - 조회 전용 (수정/삭제/활성화 버튼 제거) */}
      {modalType === "view" && selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">레시피 상세 (조회 전용)</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Image and basic info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-500">레시피명</span>
                    <p className="text-2xl font-bold text-gray-900">{selectedRecipe.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">카테고리</span>
                    <p className="text-lg text-gray-900">{selectedRecipe.category}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">설명</span>
                    <p className="text-gray-700">{selectedRecipe.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">상태</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedRecipe.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {selectedRecipe.isActive ? "활성화" : "비활성화"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing info */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600 mb-1">판매가</p>
                  <p className="text-2xl font-bold text-blue-700">
                    ₩{selectedRecipe.price.toLocaleString()}
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-sm text-orange-600 mb-1">원가</p>
                  <p className="text-2xl font-bold text-orange-700">
                    ₩{selectedRecipe.cost.toLocaleString()}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600 mb-1">마진율</p>
                  <p className="text-2xl font-bold text-green-700">
                    {getProfitMargin(selectedRecipe)}%
                  </p>
                </div>
              </div>

              {/* Additional info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">조리 시간</span>
                  <p className="text-lg font-semibold text-gray-900">{selectedRecipe.prepTime}분</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">난이도</span>
                  <p className="text-lg font-semibold text-gray-900">{selectedRecipe.difficulty}</p>
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">필요 재료</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2">
                    {selectedRecipe.ingredients.map((ingredient) => (
                      <div
                        key={ingredient.id}
                        className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0"
                      >
                        <span className="text-gray-700">{ingredient.name}</span>
                        <span className="font-medium text-gray-900">
                          {ingredient.quantity}{ingredient.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">조리 방법</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-line">{selectedRecipe.instructions}</p>
                </div>
              </div>

              {/* Action buttons - 조회 전용 (닫기 버튼만) */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={closeModal}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
