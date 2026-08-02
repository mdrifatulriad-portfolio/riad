import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, Facebook, Instagram, Play, ExternalLink, Youtube, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface ContactProps {
  darkMode?: boolean;
}

export default function Contact({ darkMode = true }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please provide a valid email';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API pipeline
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000); // fade out success alert
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Background soft glowing orb */}
      <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-blue-600/5 blur-[120px]" />

      <div className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-16 select-none">
          <span className="text-xs font-mono text-blue-500 dark:text-blue-400 font-bold uppercase tracking-widest mb-2">// COMMUNICATE</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">Let's Connect</h2>
          <div className="mt-4 h-1 w-16 bg-blue-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Block: Contact Details, Social Hub, & Mock Vector Map */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-8 text-left select-none">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">Say hello!</h3>
              <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed">
                Whether you have an upcoming brand launch, complex motion design queue, or just want to chat about creative code, drop me a message.
              </p>
            </div>

            {/* Direct Info List */}
            <div className="space-y-4">
              {/* WhatsApp */}
              <motion.div 
                whileHover={{ y: -3, scale: 1.015 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-4 bg-white dark:bg-gray-900/40 border border-slate-200 dark:border-gray-800/25 p-4 rounded-2xl shadow-md dark:shadow-none hover:border-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all group"
              >
                <div className="h-11 w-11 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/25 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-colors shrink-0">
                  <MessageSquare className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-extrabold text-slate-400 dark:text-gray-500 tracking-wider">WhatsApp</p>
                  <a href={PERSONAL_INFO.whatsapp} target="_blank" rel="noreferrer" className="text-sm font-bold text-slate-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    +880 1700-814379 (Message)
                  </a>
                </div>
              </motion.div>

              {/* Phone Number */}
              <motion.div 
                whileHover={{ y: -3, scale: 1.015 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-4 bg-white dark:bg-gray-900/40 border border-slate-200 dark:border-gray-800/25 p-4 rounded-2xl shadow-md dark:shadow-none hover:border-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all group"
              >
                <div className="h-11 w-11 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/25 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-colors shrink-0">
                  <Phone className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-extrabold text-slate-400 dark:text-gray-500 tracking-wider">Call Me</p>
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3.5 sm:items-center">
                    <a href="tel:+8801700814379" className="text-sm font-bold text-slate-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors whitespace-nowrap">
                      +880 1700-814379
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div 
                whileHover={{ y: -3, scale: 1.015 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-4 bg-white dark:bg-gray-900/40 border border-slate-200 dark:border-gray-800/25 p-4 rounded-2xl shadow-md dark:shadow-none hover:border-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all group"
              >
                <div className="h-11 w-11 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/25 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-colors shrink-0">
                  <Mail className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-extrabold text-slate-400 dark:text-gray-500 tracking-wider">Email Me</p>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm font-bold text-slate-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </motion.div>

              {/* Facebook */}
              <motion.div 
                whileHover={{ y: -3, scale: 1.015 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-4 bg-white dark:bg-gray-900/40 border border-slate-200 dark:border-gray-800/25 p-4 rounded-2xl shadow-md dark:shadow-none hover:border-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all group"
              >
                <div className="h-11 w-11 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/25 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-colors shrink-0">
                  <Facebook className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-extrabold text-slate-400 dark:text-gray-500 tracking-wider">Facebook</p>
                  <a href={PERSONAL_INFO.socials.facebook} target="_blank" rel="noreferrer" title="Follow me on Facebook" className="text-sm font-bold text-slate-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    md.rifatulislamriad.3
                  </a>
                </div>
              </motion.div>

              {/* YouTube */}
              <div className="relative group/ytd">
                <motion.div 
                  whileHover={{ y: -3, scale: 1.015 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-4 bg-white dark:bg-gray-900/40 border border-slate-200 dark:border-gray-800/25 p-4 rounded-2xl shadow-md dark:shadow-none hover:border-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-all"
                >
                  <div className="h-11 w-11 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/25 group-hover/ytd:bg-red-500/20 group-hover/ytd:border-red-500/40 transition-colors shrink-0">
                    <Youtube className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-extrabold text-slate-400 dark:text-gray-500 tracking-wider">YouTube</p>
                    <a href="https://www.youtube.com/@MdrifatulIslam3426/shorts" target="_blank" rel="noreferrer" className="text-sm font-bold text-slate-700 dark:text-gray-300 hover:text-red-500 transition-colors">
                      @MdrifatulIslam3426
                    </a>
                  </div>
                </motion.div>
                {/* Tooltip */}
                <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-gray-950 text-white text-[10px] font-bold py-1 px-2.5 rounded border border-slate-200 dark:border-gray-800/80 whitespace-nowrap opacity-0 group-hover/ytd:opacity-100 transition-opacity pointer-events-none z-50 shadow-md">
                  Watch My YouTube Portfolio
                </div>
              </div>
            </div>

            {/* Social Network Icon Hub */}
            <div>
              <p className="text-xs font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-4">// SOCIAL NETWORK</p>
              <div className="flex flex-wrap gap-3">
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href={PERSONAL_INFO.socials.behance}
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 w-10 bg-slate-100 dark:bg-gray-900/40 border border-slate-200 dark:border-gray-800/25 hover:border-blue-500/35 hover:bg-blue-600/10 rounded-xl flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-md cursor-pointer"
                  aria-label="Behance profile link"
                >
                  <ExternalLink className="h-4.5 w-4.5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href={PERSONAL_INFO.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  title="Follow me on Facebook"
                  className="h-10 w-10 bg-slate-100 dark:bg-gray-900/40 border border-slate-200 dark:border-gray-800/25 hover:border-blue-500/45 hover:bg-blue-600/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_0_15px_rgba(59,130,246,0.45)] rounded-xl flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-md cursor-pointer"
                  aria-label="Facebook profile link"
                >
                  <Facebook className="h-4.5 w-4.5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href={PERSONAL_INFO.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 w-10 bg-slate-100 dark:bg-gray-900/40 border border-slate-200 dark:border-gray-800/25 hover:border-blue-500/35 hover:bg-blue-600/10 rounded-xl flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-md cursor-pointer"
                  aria-label="Instagram profile link"
                >
                  <Instagram className="h-4.5 w-4.5" />
                </motion.a>
                
                {/* YouTube Icon in Hub */}
                <div className="relative group/ytch">
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href="https://www.youtube.com/@MdrifatulIslam3426/shorts"
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 w-10 bg-slate-100 dark:bg-gray-900/40 border border-slate-200 dark:border-gray-800/25 hover:border-red-500/45 hover:bg-red-600/10 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] dark:hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] rounded-xl flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-red-500 transition-all shadow-md cursor-pointer"
                    aria-label="YouTube Shorts channel link"
                  >
                    <Youtube className="h-4.5 w-4.5" />
                  </motion.a>
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-gray-950 text-white text-[10px] font-bold py-1 px-2.5 rounded border border-slate-200 dark:border-gray-800/80 whitespace-nowrap opacity-0 group-hover/ytch:opacity-100 transition-opacity pointer-events-none z-50 shadow-md">
                    Watch My YouTube Portfolio
                  </div>
                </div>
              </div>
            </div>

            {/* Vector Mock Map Component */}
            <div className="h-56 w-full rounded-2xl bg-slate-100 dark:bg-gray-950/60 border border-slate-200 dark:border-gray-800/30 overflow-hidden relative shadow-inner">
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px]" />
              
              {/* Coordinates scale lines */}
              <div className="absolute top-4 left-4 text-[9px] font-mono text-slate-400 dark:text-gray-600 uppercase tracking-widest">
                23.8103° N, 90.4125° E
              </div>
              
              {/* Pulsing beacon in map center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-blue-500/20 -translate-x-1/2 -translate-y-1/2 opacity-75"></span>
                  <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-blue-500/40 -translate-x-1/2 -translate-y-1/2 opacity-75"></span>
                  <div className="h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)] -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute top-4 left-4 bg-white dark:bg-gray-900/90 border border-slate-200 dark:border-gray-800 rounded px-2 py-1 text-[8px] text-slate-500 dark:text-gray-400 whitespace-nowrap -translate-x-1/2">
                    Studio Rifat, Dhaka
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Fully Configured Contact Form */}
          <div className="col-span-1 lg:col-span-7 bg-white dark:bg-gray-900/40 backdrop-blur-md border border-slate-200/60 dark:border-gray-800/20 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
            
            {/* Header detail */}
            <div className="mb-8 text-left select-none">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Let's Work Together</h3>
              <p className="text-xs text-slate-500 dark:text-gray-500">Have a project in mind? Fill out the form below and I'll get back to you as soon as possible.</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name field */}
                <div className="flex flex-col text-left">
                  <label htmlFor="name" className="text-xs font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-2 select-none">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`bg-slate-50/50 dark:bg-gray-950/60 text-slate-900 dark:text-white text-sm border ${
                      formErrors.name ? 'border-red-500/50 focus:border-red-500' : 'border-slate-200 dark:border-gray-800/40 focus:border-blue-500'
                    } rounded-xl px-4.5 py-3.5 focus:outline-none transition-colors duration-200`}
                    placeholder="Enter your full name"
                  />
                  {formErrors.name && (
                    <span className="text-red-500 text-[10px] font-semibold uppercase mt-1 select-none">
                      {formErrors.name}
                    </span>
                  )}
                </div>

                {/* Email field */}
                <div className="flex flex-col text-left">
                  <label htmlFor="email" className="text-xs font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-2 select-none">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`bg-slate-50/50 dark:bg-gray-950/60 text-slate-900 dark:text-white text-sm border ${
                      formErrors.email ? 'border-red-500/50 focus:border-red-500' : 'border-slate-200 dark:border-gray-800/40 focus:border-blue-500'
                    } rounded-xl px-4.5 py-3.5 focus:outline-none transition-colors duration-200`}
                    placeholder="Enter your email address"
                  />
                  {formErrors.email && (
                    <span className="text-red-500 text-[10px] font-semibold uppercase mt-1 select-none">
                      {formErrors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Subject field */}
              <div className="flex flex-col text-left">
                <label htmlFor="subject" className="text-xs font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-2 select-none">
                  Project Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`bg-slate-50/50 dark:bg-gray-950/60 text-slate-900 dark:text-white text-sm border ${
                    formErrors.subject ? 'border-red-500/50 focus:border-red-500' : 'border-slate-200 dark:border-gray-800/40 focus:border-blue-500'
                  } rounded-xl px-4.5 py-3.5 focus:outline-none transition-colors duration-200`}
                  placeholder="What do you need help with?"
                />
                {formErrors.subject && (
                  <span className="text-red-500 text-[10px] font-semibold uppercase mt-1 select-none">
                    {formErrors.subject}
                  </span>
                )}
              </div>

              {/* Message field */}
              <div className="flex flex-col text-left">
                <label htmlFor="message" className="text-xs font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-2 select-none">
                  Message Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`bg-slate-50/50 dark:bg-gray-950/60 text-slate-900 dark:text-white text-sm border ${
                    formErrors.message ? 'border-red-500/50 focus:border-red-500' : 'border-slate-200 dark:border-gray-800/40 focus:border-blue-500'
                  } rounded-xl px-4.5 py-3.5 focus:outline-none transition-colors duration-200 resize-none`}
                  placeholder="Tell me about your project, goals, budget, or any questions you have..."
                />
                {formErrors.message && (
                  <span className="text-red-500 text-[10px] font-semibold uppercase mt-1 select-none">
                    {formErrors.message}
                  </span>
                )}
              </div>

              {/* Submit trigger button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-blue-800 disabled:to-indigo-800 text-white font-semibold text-sm tracking-wider uppercase py-4 px-8 rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(37,99,235,0.25)] w-full cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Transmission...
                  </span>
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Instant Success Alert */}
            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  className="absolute inset-0 bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    initial={{ scale: 0.8, y: 15 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="flex flex-col items-center max-w-sm text-center"
                  >
                    <CheckCircle className="h-16 w-16 text-blue-500 mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]" />
                    <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">Message Sent</h4>
                    <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed mb-6">
                      Thank you! Your message has been sent successfully. I will contact you soon.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="text-xs font-bold text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 uppercase tracking-widest"
                    >
                      Dismiss Alert
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
