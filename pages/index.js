
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaFacebook, FaLinkedin, FaGlobe } from 'react-icons/fa';

export default function Home() {
  const canvasRef = useRef(null);
  const parallaxRefs = { bucc: useRef(null), upgrade: useRef(null), tech: useRef(null) };
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date('2025-11-01T23:59:59Z').getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const icons = ['<>', '{ }', '</>', '⚙️', 'AI', 'DB'];
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      txt: icons[Math.floor(Math.random() * icons.length)],
      size: 14 + Math.random() * 22,
      hue: 200 + Math.random() * 100
    }));

    let rafId;
    function onResize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', onResize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, '#050016');
      gradient.addColorStop(1, '#0a0320');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x = (p.x + p.vx + w) % w;
        p.y = (p.y + p.vy + h) % h;
        ctx.save();
        ctx.font = `${p.size}px Inter, ui-sans-serif, system-ui`;
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, 0.9)`;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 80%, 0.6)`;
        ctx.shadowBlur = 10;
        ctx.fillText(p.txt, p.x, p.y);
        ctx.restore();
      });

      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      if (parallaxRefs.bucc.current) parallaxRefs.bucc.current.style.transform = `translate(${x * 8}px, ${y * 4}px)`;
      if (parallaxRefs.upgrade.current) parallaxRefs.upgrade.current.style.transform = `translate(${x * -6}px, ${y * -3}px)`;
      if (parallaxRefs.tech.current) parallaxRefs.tech.current.style.transform = `translate(${x * 12}px, ${y * 6}px)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <>
      <Head>
        <title>BUCC Presents: UpgradeHour</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="relative min-h-screen text-white overflow-x-hidden">
        <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" />
        <div className="absolute inset-0 bg-black/50 z-10" />

        <nav className="fixed top-6 left-6 right-6 z-50 flex justify-between items-center px-6 py-3 bg-black/40 backdrop-blur-xl rounded-xl border border-cyan-400/20 shadow-lg">
          <div className="text-2xl font-extrabold text-cyan-400">BUCC</div>
          <a href="#register" className="px-5 py-2 bg-gradient-to-r from-cyan-400 to-indigo-600 rounded-full font-semibold text-black hover:scale-105 transition">Register</a>
        </nav>

        <main className="relative z-20 pt-36 text-center px-6">
          <motion.h2 ref={parallaxRefs.bucc} initial="hidden" animate="show" variants={fadeUp} className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-cyan-400 to-yellow-400 mb-2 neon-pink hover-glow">
            BUCC Presents
          </motion.h2>

          <motion.h1 ref={parallaxRefs.upgrade} initial="hidden" animate="show" variants={fadeUp} className="text-3xl md:text-6xl font-orbitron gradient-text hover-glow">
            UpgradeHour
          </motion.h1>

          <motion.h3 ref={parallaxRefs.tech} initial="hidden" animate="show" variants={fadeUp} className="text-5xl md:text-9xl font-extrabold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 drop-shadow-2xl">
            Tech Innovation Battle
          </motion.h3>

          <motion.div id="register" initial="hidden" animate="show" variants={fadeUp} className="mt-12 inline-block px-10 py-8 rounded-3xl bg-black/40 border border-cyan-400/40 shadow-[0_0_40px_rgba(0,255,255,0.35)] hover:shadow-[0_0_70px_rgba(0,255,255,0.6)] transition-all duration-600 transform hover:scale-105">
            <div className="text-lg text-gray-300 mb-2">Registration ends in:</div>
            <div className="text-4xl md:text-5xl font-mono font-bold text-white">
              {countdown.days}d : {countdown.hours}h : {countdown.minutes}m : {countdown.seconds}s
            </div>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScGufSeGnIxwPfOEeIVIzrzH2h7PlYpVqKH9Je0EaIHS4NEIA/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white font-semibold rounded-full text-xl hover:scale-105 transition-all duration-400 shadow-lg">
              Register Now
            </a>
          </motion.div>

          <section id="objective" className="mt-12 px-4 md:px-20">
            <motion.div whileHover={{ scale: 1.03, boxShadow: '0 10px 40px rgba(80,100,255,0.12)' }} className="bg-black/50 p-8 rounded-2xl border border-cyan-400/20 shadow-md transition-all duration-400">
              <h2 className="text-2xl md:text-3xl font-bold text-cyan-300 mb-4">Objective</h2>
              <p className="text-lg text-gray-200 mb-3">Encourage creativity, teamwork, and practical innovation by solving real student-life problems through technology-driven solutions.</p>
              <p className="text-lg text-gray-200">Project Types: Web or mobile apps, dashboards, bots, automation tools, data-driven systems, or any other tech-based solutions.</p>
            </motion.div>
          </section>

          {/* Team Building Section */}
          <section id="team" className="mt-12 px-4 md:px-20">
            <motion.div whileHover={{ scale: 1.03, boxShadow: '0 10px 40px rgba(120,88,255,0.12)' }} className="bg-black/50 p-8 rounded-2xl border border-purple-400/20 shadow-md transition-all duration-400">
              <h2 className="text-2xl md:text-3xl font-bold text-cyan-300 mb-4">Team Building</h2>
              <ul className="text-left text-lg text-gray-200 list-disc list-inside space-y-2">
                <li>Each team must consist of four members but five is max, including one Senior Executive as the Team Leader.</li>
                <li>The remaining members should be a balanced mix of Executives and General Members to ensure cross-role collaboration.</li>
                <li>Each participant may join only one team.</li>
                <li>Registration must include team name, member details, idea title (150–200 words), and contact method.</li>
                <li>Late registrations will not be accepted.</li>
              </ul>
            </motion.div>

            {/* Marking Criteria */}
            <motion.div whileHover={{ scale: 1.03, boxShadow: '0 10px 40px rgba(120,88,255,0.12)' }} className="bg-black/50 p-8 rounded-2xl border border-indigo-400/20 shadow-md transition-all duration-400 mt-8">
              <h2 className="text-2xl md:text-3xl font-bold text-indigo-300 mb-4">Marking Criteria</h2>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div>
                  <h3 className="font-semibold text-lg text-cyan-300">Module 1: Concept &amp; Design : 10 Marks</h3>
                  <ul className="list-disc list-inside text-gray-200 mt-2 space-y-1">
                    <li>Problem relevance</li>
                    <li>Originality &amp; innovation</li>
                    <li>Mockups / Figma prototype quality</li>
                    <li>Feasibility &amp; design clarity</li>
                    <li>Technical approach</li>
                    <li>Team collaboration &amp; presentation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-cyan-300">Module 2: Prototype / Implementation : 20 Marks</h3>
                  <ul className="list-disc list-inside text-gray-200 mt-2 space-y-1">
                    <li>Core feature functionality</li>
                    <li>Extra/bonus features</li>
                    <li>Code structure &amp; documentation</li>
                    <li>UI/UX implementation</li>
                    <li>Robustness &amp; error handling</li>
                    <li>Demo readiness &amp; deployment</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-cyan-300">Final Presentation &amp; Demo : 45 Marks</h3>
                  <ul className="list-disc list-inside text-gray-200 mt-2 space-y-1">
                    <li>Problem framing &amp; clarity</li>
                    <li>Technical execution &amp; demo</li>
                    <li>Innovation / novelty</li>
                    <li>Practical impact</li>
                    <li>Viability / sustainability</li>
                    <li>UI/UX quality</li>
                    <li>Q&amp;A &amp; presentation skill</li>
                    <li>Team coordination</li>
                    <li>Limitations &amp; future plan</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Submission Guidelines */}
          <section id="submission" className="mt-12 px-4 md:px-20">
            <motion.div whileHover={{ scale: 1.03, boxShadow: '0 10px 40px rgba(120,88,255,0.12)' }} className="bg-black/50 p-8 rounded-2xl border border-purple-400/20 shadow-md transition-all duration-400">
              <h2 className="text-2xl md:text-3xl font-bold text-purple-300 mb-4">Submission Guidelines</h2>
              <ul className="text-left text-lg text-gray-200 list-disc list-inside space-y-2">
                <li>Submit via GitHub/GitLab or hosted link with README, documentation, and screenshots or any other shareable link medium.</li>
                <li>Figma-only submissions are allowed (maximum 7/10 in Module 1). However, teams submitting only a design prototype without a working implementation will face significant mark deductions.</li>
                <li>Final presentation: 10–15 min demo + Q&amp;A.</li>
                <li>Late submission penalty: -10% per hour after the deadline.</li>
              </ul>
            </motion.div>
          </section>

          {/* Ethics Section */}
          <section id="ethics" className="mt-12 px-4 md:px-20 mb-24">
            <motion.div whileHover={{ scale: 1.03, boxShadow: '0 10px 40px rgba(255,120,180,0.12)' }} className="bg-black/50 p-8 rounded-2xl border border-pink-400/20 shadow-md transition-all duration-400">
              <h2 className="text-2xl md:text-3xl font-bold text-pink-300 mb-4">Conduct &amp; Ethics</h2>
              <p className="text-lg text-gray-200">All projects must be original and plagiarism-free. Respectful behavior and adherence to BRACU’s code of ethics are mandatory. For queries, contact in the BUCC Group Chat.</p>
            </motion.div>
          </section>

          {/* Footer */}
          <footer className="bg-black/60 py-12 mt-10 text-center border-t border-cyan-400/20">
            <div className="flex justify-center gap-8 text-3xl text-gray-300 mb-4">
              <a href="https://www.bracucc.org" target="_blank" rel="noopener noreferrer"><FaGlobe /></a>
              <a href="https://www.facebook.com/BRACUCC" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://www.linkedin.com/company/bracuc" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            </div>
            <p className="text-gray-400 text-lg">© 2025 BUCC | All Rights Reserved</p>
          </footer>
        </main>
      </div>
    </>
  );
}
