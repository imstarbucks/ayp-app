const Spinner = () => {
  return (
    <div className="w-full h-full bg-white/50 flex justify-center items-center absolute top-0 left-0 m-auto">
      <div className="w-8 h-8 rounded-full border-4 border-b-transparent border-secondary animate-spin"></div>
    </div>
  );
};

export default Spinner;
