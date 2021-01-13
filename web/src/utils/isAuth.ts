import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { meQuery } from "../api/authApi";

export const useIsAuth = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery("me", meQuery);
  useEffect(() => {
    if (!isLoading && !data?.id) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [isLoading, data, router]);
};
