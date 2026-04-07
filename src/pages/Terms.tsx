import React from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Gavel, Scale, AlertCircle, CheckCircle } from 'lucide-react';

export default function Terms() {
  return (
    <div className="pt-32 pb-20 px-6">
      <Helmet>
        <title>Terms of Service | MD Abu Hanif Mia</title>
      </Helmet>
      
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-zinc-900 dark:text-white">
              Terms of <span className="text-brand-600">Service</span>
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">
              Last updated: April 7, 2026
            </p>
          </div>

          <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-brand-600">
                <Gavel className="w-6 h-6" />
                <h2 className="text-2xl font-bold m-0">1. Agreement to Terms</h2>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-brand-600">
                <Scale className="w-6 h-6" />
                <h2 className="text-2xl font-bold m-0">2. Use License</h2>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Permission is granted to temporarily download one copy of the materials (information or software) on MD Abu Hanif Mia's website for personal, non-commercial transitory viewing only.
              </p>
              <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-2xl space-y-4">
                <p className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li>Modify or copy the materials;</li>
                  <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                  <li>Attempt to decompile or reverse engineer any software contained on the website;</li>
                  <li>Remove any copyright or other proprietary notations from the materials; or</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-brand-600">
                <AlertCircle className="w-6 h-6" />
                <h2 className="text-2xl font-bold m-0">3. Disclaimer</h2>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                The materials on MD Abu Hanif Mia's website are provided on an 'as is' basis. MD Abu Hanif Mia makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-brand-600">
                <CheckCircle className="w-6 h-6" />
                <h2 className="text-2xl font-bold m-0">4. Limitations</h2>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                In no event shall MD Abu Hanif Mia or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website, even if MD Abu Hanif Mia or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section className="space-y-4 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Governing Law</h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Any claim relating to MD Abu Hanif Mia's website shall be governed by the laws of Bangladesh without regard to its conflict of law provisions.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
