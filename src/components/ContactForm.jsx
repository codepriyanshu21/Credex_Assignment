import React, { useState } from 'react';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', company: '', license: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    let err = {};
    if (!form.name) err.name = 'Required';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Invalid email';
    if (!form.company) err.company = 'Required';
    if (!form.license) err.license = 'Required';
    if (!form.message) err.message = 'Required';
    return err;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
  
    if (Object.keys(err).length === 0) {
      console.log('Submitted Data:', form); 
      alert('Form submitted!');
      setForm({ name: '', email: '', company: '', license: '', message: '' }); 
    }
  };
  

  return (
    <section className="py-8 px-8">
      <h3 className="text-4xl font-bold text-center mb-8">Contact Us</h3>
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-xl mx-auto ">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="p-2 border rounded  bg-white text-black dark:bg-gray-800 dark:text-white" />
        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}

        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="p-2 border rounded  bg-white text-black dark:bg-gray-800 dark:text-white" />
        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

        <input name="company" placeholder="Company" value={form.company} onChange={handleChange} className="p-2 border rounded  bg-white text-black dark:bg-gray-800 dark:text-white" />
        {errors.company && <span className="text-red-500 text-sm">{errors.company}</span>}

        <select name="license" value={form.license} onChange={handleChange} className="p-2 border rounded  bg-white text-black dark:bg-gray-800 dark:text-white">
          <option value="">Select License Type</option>
          <option value="Windows">Windows</option>
          <option value="Adobe">Adobe</option>
          <option value="Other">Other</option>
        </select>
        {errors.license && <span className="text-red-500 text-sm">{errors.license}</span>}

        <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} className="p-2 border rounded  bg-white text-black dark:bg-gray-800 dark:text-white" />
        {errors.message && <span className="text-red-500 text-sm">{errors.message}</span>}

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">Submit</button>
      </form>
    </section>
  );
};

export default ContactForm;
