import Button from "./Button";

export default function PricingSection({ plans }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#CCC3FF]/30 p-6">
      <h3 className="text-xl font-bold text-[#432C81] mb-6 text-center">Paket Layanan</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div key={index} className={`border rounded-xl p-6 text-center ${plan.popular ? "border-[#432C81] shadow-lg relative" : "border-[#CCC3FF]/30"}`}>
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#432C81] text-white text-xs px-3 py-1 rounded-full">Populer</span>
            )}
            <h4 className="text-lg font-bold text-gray-800">{plan.name}</h4>
            <p className="text-3xl font-bold text-[#432C81] mt-3">{plan.price}</p>
            <p className="text-xs text-gray-400 mb-4">{plan.duration}</p>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx}>✓ {feature}</li>
              ))}
            </ul>
            <Button type={plan.popular ? "primary" : "secondary"} className="w-full">Pilih Paket</Button>
          </div>
        ))}
      </div>
    </div>
  );
}