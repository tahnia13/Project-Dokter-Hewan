export default function Button({ children, type = "primary", onClick, className = "" }) {
  const types = {
    primary: "bg-gradient-primary hover:shadow-md text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
  };
  return (
    <button onClick={onClick} className={`${types[type]} px-4 py-2 rounded-lg font-semibold transition-all ${className}`}>
      {children}
    </button>
  );
}