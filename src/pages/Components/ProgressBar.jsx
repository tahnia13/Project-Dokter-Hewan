export default function ProgressBar({ 
  percentage = 0, 
  label = "", 
  showLabel = true, 
  showPercentage = true,
  size = "md",
  color = "primary"
}) {
  const sizeClass = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3"
  }[size];

  const colorClass = {
    primary: "bg-[#432C81]",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
    info: "bg-blue-500"
  }[color];

  return (
    <div className="w-full">
      {(showLabel || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {showLabel && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && <span className="text-sm font-bold text-[#432C81]">{percentage.toFixed(0)}%</span>}
        </div>
      )}
      <div className={`w-full ${sizeClass} bg-gray-200 rounded-full overflow-hidden`}>
        <div
          className={`${colorClass} ${sizeClass} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
