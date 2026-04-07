import React from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="pt-32 pb-20 px-6">
      <Helmet>
        <title>Privacy Policy | MD Abu Hanif Mia</title>
      </Helmet>
      
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-zinc-900 dark:text-white">
              Privacy <span className="text-brand-600">Policy</span>
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">
              Last updated: April 7, 2026
            </p>
          </div>

          <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-brand-600">
                <Shield className="w-6 h-6" />
                <h2 className="text-2xl font-bold m-0">Introduction</h2>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Welcome to the portfolio website of MD Abu Hanif Mia. Your privacy is critically important to us. This Privacy Policy document contains types of information that is collected and recorded by our website and how we use it.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-brand-600">
                <Eye className="w-6 h-6" />
                <h2 className="text-2xl font-bold m-0">Information We Collect</h2>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                We only collect information about you if we have a reason to do so—for example, to provide our services, to communicate with you, or to make our services better.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400">
                <li><strong>Contact Information:</strong> If you contact us directly via the contact form, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us.</li>
                <li><strong>Log Files:</strong> Like many other websites, we make use of log files. These files merely logs visitors to the site - usually a standard procedure for hosting companies and a part of hosting services' analytics.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-brand-600">
                <Lock className="w-6 h-6" />
                <h2 className="text-2xl font-bold m-0">How We Use Information</h2>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                We use the information we collect in various ways, including to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400">
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you, either directly or through one of our partners</li>
                <li>Send you emails regarding project inquiries or updates</li>
              </ul>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-brand-600">
                <FileText className="w-6 h-6" />
                <h2 className="text-2xl font-bold m-0">Data Security</h2>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                The security of your personal information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </section>

            <section className="space-y-4 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Contact Us</h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at <a href="mailto:mohammadbitullah@gmail.com" className="text-brand-600 hover:underline">mohammadbitullah@gmail.com</a>.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
