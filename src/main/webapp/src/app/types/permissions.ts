export type Role = "본사관리자" | "지점장";

export interface Permission {
  module: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  "본사관리자": [
    { module: "home", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { module: "dashboard", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { module: "branches", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { module: "sales", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { module: "orders", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { module: "delivery", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { module: "inventory", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { module: "logistics", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { module: "recipe", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { module: "hr", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { module: "permissions", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { module: "schedule", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { module: "finance", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { module: "sales-management", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { module: "inventory-swap", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { module: "receiving", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { module: "support", canView: true, canCreate: true, canEdit: true, canDelete: true },
  ],
  "지점장": [
    { module: "home", canView: true, canCreate: false, canEdit: false, canDelete: false },
    { module: "dashboard", canView: true, canCreate: false, canEdit: false, canDelete: false },
    { module: "branches", canView: false, canCreate: false, canEdit: false, canDelete: false },
    { module: "sales", canView: true, canCreate: true, canEdit: true, canDelete: false },
    { module: "orders", canView: true, canCreate: true, canEdit: true, canDelete: false },
    { module: "delivery", canView: true, canCreate: false, canEdit: false, canDelete: false },
    { module: "inventory", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { module: "recipe", canView: true, canCreate: false, canEdit: false, canDelete: false },
    { module: "hr", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { module: "permissions", canView: true, canCreate: false, canEdit: true, canDelete: false },
    { module: "schedule", canView: true, canCreate: true, canEdit: true, canDelete: true },
    { module: "finance", canView: false, canCreate: false, canEdit: false, canDelete: false },
    { module: "sales-management", canView: true, canCreate: true, canEdit: true, canDelete: false },
    { module: "inventory-swap", canView: true, canCreate: true, canEdit: true, canDelete: false },
    { module: "receiving", canView: true, canCreate: true, canEdit: true, canDelete: false },
    { module: "support", canView: true, canCreate: true, canEdit: true, canDelete: true },
  ],

};

export const MODULE_NAMES: Record<string, string> = {
  home: "홈",
  dashboard: "대시보드",
  branches: "직영점 통합 관리",
  sales: "매출 관리",
  orders: "발주 관리",
  delivery: "배송 관리",
  inventory: "재고 관리",
  logistics: "물류 관리",
  recipe: "레시피 관리",
  hr: "인사 및 권한 관리",
  permissions: "권한관리",
  schedule: "일정관리",
  finance: "회계관리",
  "sales-management": "매출관리",
  "inventory-swap": "재고 교환 관리",
  "receiving": "입고 관리",
  "support": "지원",
};