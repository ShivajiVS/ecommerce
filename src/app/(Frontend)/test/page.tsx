import { getServerSession } from "@/auth/getServerSession";
import React from "react";

export default async function page() {
  const session = await getServerSession();
  return (
    <div className="max-w-xl mx-auto h-96 bg-slate-500">
      <p>{JSON.stringify(session)}</p>
    </div>
  );
}
