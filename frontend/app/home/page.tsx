const Page = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-zinc-200 overflow-hidden">
      <div className="w-full h-full flex flex-col space-y-4 justify-center items-center">
        <div className="w-64 h-64 bg-black"></div>
        <div className="flex flex-col justify-center space-y-2 text-center">
          <h1 className="text-center text-6xl tracking-[0.1em] font-secondary">
            ATLAS
          </h1>
          <h3 className="text-center text-3xl font-light font-primary">
            Map The World, Know the World
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Page;
