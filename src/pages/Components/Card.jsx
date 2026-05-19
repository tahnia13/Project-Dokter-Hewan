export default function Card({ children, title, className = "", onClick }) {
  return (
    <div onClick={onClick} className={`bg-white rounded-xl shadow-sm border border-[#CCC3FF]/30 overflow-hidden hover:shadow-md transition-all ${className}`}>
      {title && (
        <div className="px-5 py-3 border-b border-[#CCC3FF]/30 bg-[#F5F3FF]">
          <h3 className="font-semibold text-[#432C81]">{title}</h3>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}