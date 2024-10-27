import { useSession } from "next-auth/react";

const useClientSession = () => {
  const { data } = useSession();
  return data;
};

export {useClientSession}