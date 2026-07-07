import React, { useState } from 'react';
import { Mail, Phone, Clock, MapPin, Sparkles, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutContact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product Fitting');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSuccess(false), 3000);
  };

  const timeline = [
    { year: '2019', title: 'THE INCUBATOR', desc: 'DEVINE starts as a secret design sandbox in Los Angeles, experimenting with raw 400GSM cotton and oversized drop-shoulders.' },
    { year: '2021', title: 'CO-ENTHUSIASTS SYNDICATE', desc: 'Launches its flagship cargos and limited sneakers online. First drop sells out globally in 12 minutes.' },
    { year: '2023', title: 'PARIS STREET SHOWCASE', desc: 'Showcases the Capsule VII collection in France, introducing luxury heavy flannels and dual-shade denim grids.' },
    { year: '2026', title: 'THE DEVINE BLY ERA', desc: 'Expanding physical spaces to New Delhi, Seoul, and Tokyo, crafting full-stack custom-tailored online portals.' }
  ];

  return (
    <div className="bg-black py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* About Section (Editorial layout) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-brand-accent uppercase">
              OUR ANTECEDENTS
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-widest text-white uppercase mt-2">
              WE DON'T RE-ENGINEER HEIRLOOMS. WE FORGE FUTURE WEARS.
            </h2>
            <p className="font-sans text-xs text-zinc-400 mt-6 leading-relaxed font-light">
              DEVINE BLY represents a global paradigm shift. We do not design basic attire; we sculpt armor for the street culture co-enthusiast. Our apparel is designed for durability and absolute proportional precision.
            </p>
            <p className="font-sans text-xs text-zinc-400 mt-4 leading-relaxed font-light">
              Each drop is crafted with custom-knitted, preshrunk fleece, double-needle cover stitching, and hand-treated distressing. We remain fiercely independent, rejecting fast-fashion cycles in favor of permanent, high-integrity collections.
            </p>
          </div>

          <div className="relative rounded-sm overflow-hidden aspect-video border border-white/5 bg-[#111111]">
            {/* Grab limited edition banner */}
            <img
              src="/src/assets/images/limited_edition_banner_1783314954500.jpg"
              alt="DEVINE Campaign Shoot"
              className="h-full w-full object-cover object-center scale-102"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-heading text-lg tracking-wider text-brand-accent uppercase">CAMPAIGN SESSIONS 26</span>
              <p className="font-sans text-[9px] text-zinc-400 uppercase mt-0.5">Fulfillment Centers, Los Angeles & Delhi</p>
            </div>
          </div>
        </section>

        {/* Brand Timeline Segment */}
        <section className="border-t border-zinc-900 pt-16">
          <div className="mb-12">
            <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase">THE ARCHIVE TIMELINE</span>
            <h3 className="font-heading text-3xl tracking-widest text-white uppercase mt-1">DEVINE CHRONOLOGY</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((item, idx) => (
              <div key={idx} className="bg-[#111111] rounded-sm border border-white/5 p-6 space-y-3 hover:border-brand-accent/30 transition-all">
                <span className="font-heading text-4xl text-brand-accent font-extrabold tracking-widest">{item.year}</span>
                <h4 className="font-heading text-lg text-white tracking-wider uppercase">{item.title}</h4>
                <p className="font-sans text-[11px] text-zinc-400 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Split layout */}
        <section className="border-t border-zinc-900 pt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left: Contact Info & Support */}
          <div className="space-y-8">
            <div>
              <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-brand-accent uppercase">
                STYLING ASSISTANCE
              </span>
              <h3 className="font-heading text-3xl sm:text-4xl tracking-widest text-white uppercase mt-2">
                GET IN TOUCH WITH THE SYNDICATE
              </h3>
              <p className="font-sans text-xs text-zinc-500 mt-4 leading-normal font-light">
                Need advice on proportions, styling overlays, or shipment customs? Reach out directly. Our global concierge stands ready.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-sans">
              <div className="flex items-center space-x-3 text-zinc-400">
                <div className="rounded-sm bg-white/5 p-2.5 border border-white/10 glass">
                  <Mail className="h-4 w-4 text-brand-accent" />
                </div>
                <div>
                  <p className="text-zinc-500 text-[10px] uppercase">EMAIL CHANNELS</p>
                  <p className="text-white mt-0.5 font-semibold">concierge@devinebly.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-zinc-400">
                <div className="rounded-sm bg-white/5 p-2.5 border border-white/10 glass">
                  <Phone className="h-4 w-4 text-brand-accent" />
                </div>
                <div>
                  <p className="text-zinc-500 text-[10px] uppercase">HOTLINE CONCIERGE</p>
                  <p className="text-white mt-0.5 font-semibold">+91 99881 22430</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-zinc-400">
                <div className="rounded-sm bg-white/5 p-2.5 border border-white/10 glass">
                  <Clock className="h-4 w-4 text-brand-accent" />
                </div>
                <div>
                  <p className="text-zinc-500 text-[10px] uppercase">BUSINESS TIMINGS</p>
                  <p className="text-white mt-0.5 font-semibold">10:00 AM - 07:00 PM (IST)</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-zinc-400">
                <div className="rounded-sm bg-white/5 p-2.5 border border-white/10 glass">
                  <MapPin className="h-4 w-4 text-brand-accent" />
                </div>
                <div>
                  <p className="text-zinc-500 text-[10px] uppercase">FLAGSHIP OUTPOST</p>
                  <p className="text-white mt-0.5 font-semibold">DLF Cyber City, Delhi</p>
                </div>
              </div>
            </div>

            {/* Simulated interactive luxury map */}
            <div className="rounded-sm border border-white/5 overflow-hidden bg-[#111111] p-4 h-56 relative flex items-center justify-center">
              {/* Slate dark grid coordinates */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
              
              <div className="text-center relative z-10 space-y-2">
                <MapPin className="h-8 w-8 text-brand-accent mx-auto animate-bounce" />
                <h4 className="font-heading text-lg text-white tracking-widest uppercase">FLAGSHIP POSITION</h4>
                <p className="font-sans text-[10px] text-zinc-400 max-w-xs mx-auto leading-normal">
                  C-45, Phase III, DLF Cyber City, Sector 24, New Delhi - 110001
                </p>
                <div className="inline-flex items-center text-[9px] font-bold text-brand-accent hover:underline uppercase tracking-widest">
                  <span>GET LIVE MAP DIRECTIONS</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Message Form */}
          <div className="bg-[#111111] rounded-sm border border-white/5 p-6 sm:p-8">
            <h3 className="font-heading text-2xl tracking-widest text-white uppercase mb-6">
              LEAVE AN ADVICE DISPATCH
            </h3>

            {success ? (
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="bg-brand-accent/15 border border-brand-accent/40 rounded-xl p-4 text-brand-accent text-xs font-sans flex items-center space-x-3 uppercase tracking-wider"
              >
                <CheckCircle2 className="h-5 w-5 text-brand-accent" />
                <span>DISPATCH SUBMITTED. THE CONCIERGE WILL RESPOND WITHIN 12 HOURS!</span>
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-5 text-xs font-sans">
                <div>
                  <label className="block text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Liam Sterling"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-sm bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-accent"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="liam@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-sm bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-accent"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1.5">Subject Category</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-sm bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-accent"
                  >
                    <option value="Product Fitting">Product Fitting & GSM Specs</option>
                    <option value="Shipping Customs">Shiprocket Tracking assistance</option>
                    <option value="Bulk Syndications">Custom / Corporate Bulk drops</option>
                    <option value="Others">General Styling Queries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1.5">Message / Inquiry</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your concerns..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-sm bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-accent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full font-button text-xs font-bold tracking-widest bg-brand-accent hover:bg-white text-black py-4 rounded-sm transition-all cursor-pointer uppercase flex items-center justify-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>TRANSMIT DISPATCH</span>
                </button>
              </form>
            )}
          </div>

        </section>

      </div>
    </div>
  );
}
