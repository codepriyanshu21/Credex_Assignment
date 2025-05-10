import React from 'react'

const WhyChoosenUs = () => {

  const reasons = [
    { icon: "⚡", title: "Fast Payouts", description: "Receive your money within 24 hours of sale." },
    { icon: "🔒", title: "Secure Transactions", description: "We use encrypted systems to ensure your data is safe." },
    { icon: "💬", title: "24/7 Support", description: "Our support team is always available." },
    { icon: "📊", title: "Transparent Valuation", description: "We provide clear insights into your license value." },
  ]

  return (
     <section className='px-8'>
      <h3 className="text-4xl font-bold text-center mb-8">Why Choose Us</h3>
      <div className="grid md:grid-cols-4 gap-6">
        {reasons.map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
            <div className="text-4xl mb-2">{item.icon}</div>
            <h4 className="text-xl font-semibold">{item.title}</h4>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WhyChoosenUs