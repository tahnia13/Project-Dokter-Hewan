export default function Checkbox({ label, name, checked, onChange, className = "" }) {
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-[#432C81] border-[#CCC3FF] rounded focus:ring-[#432C81] focus:ring-2"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}