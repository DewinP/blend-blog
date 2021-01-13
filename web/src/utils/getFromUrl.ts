import { useRouter } from "next/router";

export const getFromUrl = () => {
  const router = useRouter();
  const id = router.query.id as string;
  return id;
};
