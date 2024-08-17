"use client";
import { Button } from "@/components/ui/button";

export default function Page() {
  async function handle() {
    // "use server";
    console.log("clicked..");
  }

  return (
    <div>
      Account page
      <form action={handle}>
        <Button size="lg">submit</Button>
      </form>
    </div>
  );
}
