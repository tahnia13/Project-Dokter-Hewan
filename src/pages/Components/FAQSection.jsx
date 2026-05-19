import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function FAQSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#CCC3FF]/30 p-6">
      <h3 className="text-xl font-bold text-[#432C81] mb-6 text-center">Pertanyaan Umum (FAQ)</h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-[#CCC3FF]/30 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center p-4 bg-[#F5F3FF] hover:bg-[#EBE5FF] transition-colors"
            >
              <span className="font-semibold text-gray-800">{faq.question}</span>
              {openIndex === index ? <FaChevronUp className="text-[#432C81]" /> : <FaChevronDown className="text-[#432C81]" />}
            </button>
            {openIndex === index && (
              <div className="p-4 text-gray-600 text-sm border-t border-[#CCC3FF]/30">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}   