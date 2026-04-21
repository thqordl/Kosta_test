import { useAuth } from "../contexts/AuthContext";
import { BranchesDashboard } from "./dashboards/BranchesDashboard";
import { NotFound } from "./NotFound";

export function BranchesRouter() {
  const { user } = useAuth();

  // 본사관리자만 접근 가능
  if (user?.role === "본사관리자") {
    return <BranchesDashboard />;
  }

  return <NotFound />;
}
