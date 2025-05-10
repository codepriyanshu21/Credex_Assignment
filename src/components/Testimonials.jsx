import React from 'react'

const Testimonals = () => {

  const testimonials = [
    {
      name: "Jane Doe",
      role: "IT Manager",
      company: "TechCorp",
      message: "SoftSell helped us recover value from unused licenses effortlessly!",
      image:"https://bdcham.sg/frontend/img/User-Icon.png"
    },
    {
      name: "John Smith",
      role: "CFO",
      company: "BizWare Inc.",
      message: "Quick, professional, and secure. Highly recommended.",
      image:"https://www.shutterstock.com/image-vector/professional-male-portrait-businessman-avatar-260nw-2099215135.jpg"
    },
  ]

  return (
     <section className='py-8 px-8'>
      <h3 className="text-4xl font-bold text-center mb-8">Customer Testimonials</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((t, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
            <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full mb-4" />
            <p className="mb-2">"{t.message}"</p>
            <p className="font-semibold">{t.name}, {t.role} at {t.company}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonals