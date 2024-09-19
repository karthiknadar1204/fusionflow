const LandingLayout = ({
    children
  }: {
    children: React.ReactNode;
  }) => {
    return (
      <main className="h-full bg-[#020617] overflow-auto">
        <div className="mx-auto max-w-screen-xl h-full w-full relative">
          <div className="absolute inset-0 bg-[url('/nebula.svg')] opacity-20"></div>
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </main>
     );
  }
   
  export default LandingLayout;