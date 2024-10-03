export const Title = ({ title }: { title: string }) => {
  return (
    <>
      <div className="mx-auto my-1 flex w-full items-center justify-evenly before:mr-4 before:block before:h-0.5 before:flex-grow before:bg-stone-300 after:ml-4 after:block after:h-0.5 after:flex-grow after:bg-stone-300">
        <span className="text-base md:text-lg lg:text-3xl text-muted-foreground uppercase font-bold tracking-tight leading-5">
          {title}
        </span>
      </div>
    </>
  );
};
