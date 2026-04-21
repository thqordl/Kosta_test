import { useAuth } from "../contexts/AuthContext";
import { RecipeManagement } from "./recipe/RecipeManagement";
import { BranchRecipeView } from "./recipe/BranchRecipeView";

export function RecipeRouter() {
  const { user } = useAuth();

  if (user?.role === "본사관리자") {
    return <RecipeManagement />;
  }

  return <BranchRecipeView />;
}
