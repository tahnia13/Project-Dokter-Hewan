export default function HeroSection({ title, subtitle, buttonText, onButtonClick, bgColor = "from-[#432C81] to-[#58315A]" }) {
  return (
    <div className={`bg-gradient-to-r ${bgColor} text-white py-12 px-6 rounded-2xl mb-6 shadow-lg`}>
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
        <p className="text-base md:text-lg mb-6 opacity-90 max-w-2xl mx-auto">{subtitle}</p>
        {buttonText && (
          <button
            onClick={onButtonClick}
            className="bg-white text-[#432C81] px-6 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-md hover:scale-105"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}