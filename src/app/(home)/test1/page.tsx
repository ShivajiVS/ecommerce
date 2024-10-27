import { FadeUp } from "@/components/fade-up";

// cascadia code, Consolas

export default function Page() {
  return (
    <div className="mx-20  mt-10 px-10 py-10 border bg-slate-200 space-y-8 ">
      {Array.from(Array(100).keys()).map((i) => (
        <FadeUp key={i}>
          <p className="text-justify tracking-tight odd:bg-state-800">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
            placeat, deleniti perferendis necessitatibus porro aliquam, at
            praesentium molestias et odio accusamus amet aperiam! Eum nulla vel
            dolore maxime labore quia facilis ullam fuga dolor harum. Molestias
            similique, praesentium quidem possimus sunt eveniet tenetur
            explicabo maiores architecto enim quisquam consequatur! Mollitia!
          </p>
        </FadeUp>
      ))}
    </div>
  );
}
