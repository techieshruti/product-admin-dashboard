import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setIsAuthenticated(false);
      setCheckingAuth(false);

      router.replace("/login");

      return;
    }

    setIsAuthenticated(true);
    setCheckingAuth(false);
  }, [router]);

  return {
    isAuthenticated,
    checkingAuth,
  };
};

export default useAuth;