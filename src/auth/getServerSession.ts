import { auth } from "@/auth";

const getServerSession = async () => {
  const session = await auth();
  return session;
};

export { getServerSession };
