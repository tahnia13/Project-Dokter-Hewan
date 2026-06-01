export default function Card({ children, title, className = "", onClick }) {
  return (
    <div onClick={onClick} className={`bg-white rounded-xl shadow-sm border border-[#CCC3FF]/30 overflow-hidden hover:shadow-md transition-all ${className}`}>
      {title && (
        <div className="px-5 py-3 border-b border-[#CCC3FF]/30 bg-[#432C81]">
          <h3 className="font-semibold text-white">{title}</h3>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}