import React from 'react'
import { motion } from 'framer-motion'
import { UploadCloud, BarChart3, DollarSign } from "lucide-react";

const HowItWorks = () => {

    const steps = [
        {
            title: "Upload License",
            icon: <UploadCloud size={40} className="text-blue-500" />,
        },
        {
            title: "Get Valuation",
            icon: <BarChart3 size={40} className="text-purple-500" />,
        },
        {
            title: "Get Paid",
            icon: <DollarSign size={40} className="text-green-500" />,
        },
    ]

    return (
        <section className='py-8 px-8'>
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-4xl font-bold text-center mb-8">How It Works</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6 text-center">
                {steps.map((step, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
                        <div className="text-4xl mb-2">{step.icon}</div>
                        <h4 className="text-xl font-semibold">{step.title}</h4>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default HowItWorks