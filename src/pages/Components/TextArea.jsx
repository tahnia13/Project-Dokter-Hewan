export default function TextArea({ label, name, placeholder, value, onChange, rows = 3, required = false, icon: Icon }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {Icon && <Icon className="inline mr-1 text-sm" />} {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#432C81] focus:border-[#432C81] outline-none resize-none transition-all"
      />
    </div>
  );
}