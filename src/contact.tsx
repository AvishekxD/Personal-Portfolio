"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Contact() {
    const formRef = useRef<HTMLFormElement>(null);

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const sectionVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        exit: { opacity: 0, y: -30, transition: { duration: 0.4, ease: "easeIn" } }
    };

    const socialContainer: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
        exit: { opacity: 0 }
    };

    const socialItem: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        setIsSubmitting(true);
        try {
            await emailjs.sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                formRef.current,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );
            setShowToast(true);
            formRef.current.reset();
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error("Email send error:", error);
            alert("Failed to send message.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="w-full px-6 sm:px-12 md:px-20 my-36 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 relative">
            <div className="max-w-[920px] mx-auto space-y-10 bg-gray-200/10 py-16 px-10 shadow-md rounded-2xl scale-103">

                <motion.h2
                    className="text-3xl md:text-2xl text-center bg-gradient-to-r from-gray-50 to-zinc-500 bg-clip-text text-transparent font-[500] text-shadow-sm tracking-wide"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    {isFormVisible ? "Get In Touch" : "Connect With Me"}
                </motion.h2>

                <motion.div
                    className="text-center flex justify-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <button
                        onClick={() => setIsFormVisible(prev => !prev)}
                        className="bg-black text-white rounded-md hover:bg-zinc-800 transition-all duration-300 spark-button cursor-pointer"
                    >
                        <span className="spark-glow"></span>
                        <span className="spark-backdrop"></span>
                        <span className="spark-text py-1.5 px-8 sm:py-0.5 sm:px-10 tracking-wide text-sm sm:text-base">
                            {isFormVisible ? "Social Links" : "Send a Message"}
                        </span>
                    </button>
                </motion.div>

                <AnimatePresence mode="wait">
                    {isFormVisible ? (
                        <motion.form
                            key="contact-form"
                            onSubmit={handleSubmit}
                            ref={formRef}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4"
                            variants={sectionVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {["name", "email", "subject"].map((field, i) => (
                                <div key={i} className={field === "subject" ? "sm:col-span-2" : ""}>
                                    <label className="block text-sm font-semibold mb-1 capitalize">{field}</label>
                                    <motion.input
                                        whileFocus={{ scale: 1.02 }}
                                        type={field === "email" ? "email" : "text"}
                                        name={field}
                                        required
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 transition-all ease-in-out duration-300"
                                        placeholder={`Enter your ${field}`}
                                    />
                                </div>
                            ))}

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-semibold mb-1">Message</label>
                                <motion.textarea
                                    whileFocus={{ scale: 1.02 }}
                                    name="message"
                                    required
                                    rows={5}
                                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 resize-none text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 transition-all ease-in-out duration-300"
                                    placeholder="What's on your mind?"
                                ></motion.textarea>
                            </div>

                            <div className="sm:col-span-2 flex justify-center sm:justify-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-zinc-900 text-white px-8 py-2 rounded-xl font-semibold hover:bg-black transition-all duration-300 hover:scale-105 ease-in-out shadow-md shadow-gray-600 hover:shadow-xl"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </button>
                            </div>
                        </motion.form>
                    ) : (
                        <motion.div
                            key="social-links"
                            className="flex flex-wrap justify-center gap-10 pt-6"
                            variants={socialContainer}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {[
                                { href: "https://github.com/AvishekxD", icon: <FaGithub className="text-2xl" />, label: "GitHub" },
                                { href: "https://linkedin.com/in/avishek-meena/", icon: <FaLinkedin className="text-2xl text-blue-600" />, label: "LinkedIn" },
                                { href: "https://twitter.com/AvishekzZ_", icon: <FaTwitter className="text-2xl text-sky-500" />, label: "Twitter" }
                            ].map((link, i) => (
                                <motion.a
                                    key={i}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.label}
                                    className="text-lg flex items-center gap-2 hover:scale-105 transition-transform duration-300"
                                    variants={socialItem}
                                >
                                    {link.icon} <span>{link.label}</span>
                                </motion.a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showToast && (
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            className="fixed top-6 right-6 bg-gray-400/10 text-black px-4 py-2 rounded-md shadow-lg z-50 transition-all ease-out duration-400"
                        >
                            Message Sent!
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
