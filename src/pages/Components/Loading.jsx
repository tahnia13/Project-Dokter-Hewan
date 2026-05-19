export default function Loading({ fullScreen = false, text = "Loading..." }) {
  if (fullScreen) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-[#432C81] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[#432C81] text-lg">{text}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center p-8">
      <div className="w-8 h-8 border-4 border-[#432C81] border-t-transparent rounded-full animate-spin mb-2"></div>
      <p className="text-[#432C81] text-sm">{text}</p>
    </div>
  );
}
