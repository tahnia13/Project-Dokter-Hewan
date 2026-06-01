export default function InputField({ label, type = "text", name, placeholder, value, onChange, required = false, icon: Icon }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {Icon && <Icon className="inline mr-1 text-sm" />} {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#432C81] focus:border-[#432C81] outline-none transition-all text-black"
      />
    </div>
  );
}