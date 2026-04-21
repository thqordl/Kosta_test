import { useAuth } from "../contexts/AuthContext";
import { Home } from "./Home";
import { BranchHome } from "./BranchHome";

export function HomePage() {
  const { user } = useAuth();
  
  // 본사관리자인 경우 Home을, 그 외(지점장, 지점매니저)는 BranchHome을 표시
  if (user?.role === "본사관리자") {
    return <Home />;
  }
  
  return <BranchHome />;
}