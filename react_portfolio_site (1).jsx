import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Sun, Moon } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function Portfolio() {
  const [dark, setDark] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const msgRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setMessage("");

    // Example: send form using Formspree. Replace the URL with your own endpoint.
    // You can also use Netlify Forms, Vercel serverless functions, or an SMTP service.
    try {
      const res = await fetch("https://formspree.io/f/your-form-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameRef.current.value,
          email: emailRef.current.value,
          message: msgRef.current.value,
        }),
      });

      if (res.ok) {
        setMessage("Message sent — thank you!");
        nameRef.current.value = "";
        emailRef.current.value = "";
        msgRef.current.value = "";
      } else {
        setMessage("Something went wrong. Try again later.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error. Try again later.");
    }

    setSending(false);
  }

  return (
    <div className={dark ? "min-h-screen bg-gray-900 text-white" : "min-h-screen bg-gray-100 text-gray-900"}>
      {/* Navbar */}
      <nav className="w-full py-4 px-6 flex justify-between items-center shadow-md sticky top-0 z-50" style={{ backdropFilter: "blur(6px)" }}>
        <h1 className="text-2xl font-bold">Steph Tan</h1>
        <div className="space-x-4 flex items-center">
          <a href="#about" className="hover:underline">About</a>
          <a href="#projects" className="hover:underline">Projects</a>
          <a href="#contact" className="hover:underline">Contact</a>
          <Button variant="ghost" onClick={() => setDark(!dark)}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </div>
      </nav>

      <main className="p-6 flex flex-col items-center">
        {/* Hero Section */}
        <motion.section
          id="hero"
          className="w-full max-w-4xl text-center py-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.7 }}
        >
          {/* Use the uploaded image. This file lives at /mnt/data/No tag.jpg in the environment. */}
          <img
            src="/mnt/data/No tag.jpg"
            alt="Steph Tan"
            className="w-36 h-36 rounded-full mx-auto mb-6 object-cover shadow-xl border-4 border-white dark:border-gray-800"
            style={{ maxWidth: 200 }}
          />

          <h2 className="text-4xl font-bold mb-2">Hello, I'm Steph</h2>
          <p className="text-lg max-w-2xl mx-auto mb-4">
            Computer Engineering graduate — eager to learn and build useful software.
          </p>

          <div className="flex gap-3 justify-center">
            <a href="#projects">
              <Button>See Projects</Button>
            </a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer">
              <Button variant="outline">Download Resume</Button>
            </a>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          className="w-full max-w-4xl mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-6">
              <h2 className="text-3xl font-semibold mb-3">About Me</h2>
              <p className="leading-relaxed text-lg">
                I am a recent Computer Engineering graduate with experience in data encoding, basic web development,
                and a strong willingness to learn. I enjoy solving problems and turning ideas into working projects.
                Skills: JavaScript, React, basic SQL, data entry, and attention to detail.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          className="w-full max-w-6xl mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-center">Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{
              title: "Portfolio Website",
              desc: "This site — built with React and Tailwind."
            },{
              title: "Data Encoder Tool",
              desc: "Small internal app to speed up data entry tasks."
            },{
              title: "Todo App",
              desc: "A simple CRUD React app to practice state management."
            }].map((p, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }} className="rounded-2xl">
                <Card className="rounded-2xl shadow-md h-full flex flex-col">
                  <CardContent className="p-6 flex-1">
                    <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                    <p className="mb-4">{p.desc}</p>
                    <div className="mt-auto flex gap-2">
                      <Button>View</Button>
                      <Button variant="ghost">Source</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section (Form UI + example integration) */}
        <motion.section
          id="contact"
          className="w-full max-w-4xl mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-6">
              <h2 className="text-3xl font-semibold mb-3">Contact Me</h2>
              <p className="mb-4 text-lg">Fill out the form and I'll get back to you. (Example uses Formspree)</p>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
                <input ref={nameRef} required placeholder="Your name" className="p-3 rounded-md border" />
                <input ref={emailRef} type="email" required placeholder="Your email" className="p-3 rounded-md border" />
                <textarea ref={msgRef} required placeholder="Your message" className="p-3 rounded-md border h-32" />
                <div className="flex items-center gap-3">
                  <Button type="submit" disabled={sending}>{sending ? "Sending..." : "Send Message"}</Button>
                  {message && <span className="text-sm">{message}</span>}
                </div>
              </form>

              <div className="mt-6 text-sm text-gray-500">
                <strong>Deploy tips:</strong> Use Formspree by creating a free form and replacing the fetch URL
                with your form's endpoint. Alternatively: Netlify Forms (just add a name attribute and `netlify` hidden input),
                or create a serverless function on Vercel to handle email sending via an SMTP provider.
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Footer */}
        <footer className="w-full max-w-6xl mt-6 pb-12">
          <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <strong>Steph Tan</strong>
              <div className="text-sm">Computer Engineering • Open to opportunities</div>
            </div>

            <div className="flex gap-4">
              <a href="#" className="text-sm hover:underline">LinkedIn</a>
              <a href="#" className="text-sm hover:underline">GitHub</a>
              <a href="#" className="text-sm hover:underline">Email</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
