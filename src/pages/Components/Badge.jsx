export default function Badge({ children, type = "primary" }) {
  const types = {
    primary: "bg-blue-100 text-blue-600 border-blue-200",
    success: "bg-green-100 text-green-600 border-green-200",
    warning: "bg-yellow-100 text-yellow-600 border-yellow-200",
    danger: "bg-red-100 text-red-600 border-red-200",
    info: "bg-purple-100 text-purple-600 border-purple-200"
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${types[type]}`}>
      {children}
    </span>
  );
}