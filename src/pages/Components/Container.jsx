export default function Container({ children, className = "", fluid = false }) {
  return (
    <div className={`${fluid ? "w-full" : "container mx-auto"} px-4 py-4 ${className}`}>
      {children}
    </div>
  );
}