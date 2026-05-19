export default function FeatureSection({ features, title = "Fitur Unggulan" }) {
  return (
    <div className="py-6">
      <h3 className="text-xl md:text-2xl font-bold text-[#432C81] mb-5 text-center">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-xl p-5 text-center shadow-sm border border-[#CCC3FF]/30 hover:shadow-md transition-all">
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
            <p className="text-sm text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}