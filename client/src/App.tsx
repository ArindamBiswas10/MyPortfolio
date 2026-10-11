import { useRef, useState } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "./lib/gsap";
import * as Si from "react-icons/si";
import {
  FiMail,
  FiCode,
  FiClock,
  FiMapPin,
  FiArrowRight,
  FiExternalLink,
} from "react-icons/fi";
import NavBar from "./components/NavBar";
import LiveClock from "./components/LiveClock";
import SpotifyCard from "./components/SpotifyCard";
import GithubGrid from "./components/GithubGrid";
import { PROJECTS, BLOG_POSTS, EXPERIENCES, TECH_STACK } from "./data";
import { useMagnetic } from "./hooks/useMagnetic";
import { useSpotlight } from "./hooks/useSpotlight";

const SiIcons = Si as unknown as Record<
  string,
  React.ComponentType<{ size?: number; color?: string }>
>;

export default function App() {
  const page = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(page.current ?? undefined);

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1. Page-load sequence
        const sub = new SplitText(".hero-sub", { type: "chars" });
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".avatar, .hero-name, .badge-available", {
          y: 14,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.08,
        })
          .from(
            sub.chars,
            { autoAlpha: 0, duration: 0.01, stagger: 0.03 },
            "-=0.2",
          )
          .from(
            ".info-item",
            { y: 10, autoAlpha: 0, duration: 0.5, stagger: 0.05 },
            "-=0.4",
          )
          .from(
            ".bio, .btns",
            { y: 12, autoAlpha: 0, duration: 0.5, stagger: 0.1 },
            "-=0.2",
          );

        // 2. Section labels: text slides up from behind a mask
        gsap.utils.toArray<HTMLElement>(".sec-label").forEach((el) => {
          const split = new SplitText(el, { type: "lines", mask: "lines" });
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        // 3. Cards ease in as they enter the screen
        const cards = gsap.utils.toArray<HTMLElement>(
          ".proj-card, .exp-card, .blog-item, .contact-card, .quote-card",
        );
        gsap.set(cards, { autoAlpha: 0, y: 24 });
        ScrollTrigger.batch(cards, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "power2.out",
              overwrite: true,
            }),
        });
      });

      return () => mm.revert();
    },
    { scope: page },
  );

  useMagnetic(page, ".btn, .btn-icon");
  useSpotlight(page, ".proj-card, .exp-card, .blog-item, .contact-card");
  return (
    <>
      <NavBar />
      <div className="page" ref={page}>
        {/* ── HERO ── */}
        <section className="hero" id="home">
          <div className="hero-top">
            <Avatar />
            <div className="hero-text">
              <div className="hero-name-row">
                <h1 className="hero-name">Arindam Biswas</h1>
                <span className="badge-available">
                  <span className="badge-dot" />
                  Available for work
                </span>
              </div>
              <div className="hero-sub">Full-Stack Developer</div>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <FiCode size={13} />
              <span className="val">Full-Stack Developer</span>
            </div>
            <div className="info-item">
              <FiClock size={13} />
              <LiveClock />
              <span className="dim">// IST</span>
            </div>
            <div className="info-item">
              <FiMapPin size={13} />
              <span className="val">Bengaluru,Karnataka,India</span>
            </div>
            <div className="info-item">
              <Si.SiGithub size={13} />
              <span className="val">github.com/ArindamBiswas10</span>
            </div>
            <div className="info-item">
              <FiMail size={13} />
              <span className="val">arindombiswas29@gmail.com</span>
            </div>
            <div className="info-item">
              <Si.SiX size={13} />
              <span className="val">@arindamdebugs</span>
            </div>
          </div>

          <p className="bio">
            I build full-stack web apps and backend systems using{" "}
            <span className="tech-pill pill-ts">
              <Si.SiTypescript size={12} />
              TypeScript
            </span>
            ,{" "}
            <span className="tech-pill pill-py">
              <Si.SiPython size={12} />
              Python
            </span>
            ,{" "}
            <span className="tech-pill pill-go">
              <Si.SiGo size={12} />
              Go
            </span>
            , and{" "}
            <span className="tech-pill pill-rs">
              <Si.SiRust size={12} />
              Rust
            </span>
            . Into AI/ML, DevOps, and occasionally building games just to see if
            I can.
          </p>

          <div className="btns">
            <a href="https://drive.google.com/file/d/1Yv95fabnZyhFHUZ1gTGWjpcFfLRJKl5l/view" target="_blank" className="btn">
              <Si.SiReadthedocs size={12} /> Resume
            </a>
            <a href="#contact" className="btn">
              <FiMail size={12} /> Contact
            </a>
            <div
              style={{
                width: 1,
                height: 20,
                background: "var(--border)",
                margin: "0 4px",
              }}
            />
            <a
              href="https://x.com/arindamdebugs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              title="X"
            >
              <Si.SiX size={13} />
            </a>
            <a
              href="https://github.com/ArindamBiswas10"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              title="GitHub"
            >
              <Si.SiGithub size={13} />
            </a>
            <a
              href="mailto:arindombiswas29@gmail.com"
              className="btn-icon"
              title="Email"
            >
              <FiMail size={13} />
            </a>
          </div>

          <SpotifyCard />
          <GithubGrid />
        </section>

        {/* ── TECH STACK ── */}
        <section id="about">
          <div className="sec-label">Tech Stack</div>
          <div className="tech-grid">
            {TECH_STACK.map((tech) => {
              const Icon = SiIcons[tech.icon];
              return (
                <div
                  key={tech.title}
                  className="tech-icon"
                  title={tech.title}
                  style={{ background: tech.bg }}
                >
                  {Icon ? (
                    <Icon size={20} color={tech.color} />
                  ) : (
                    tech.title.slice(0, 2)
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section>
          <div className="sec-label">Featured Projects</div>
          <div className="proj-grid">
            {PROJECTS.map((p) => (
              <div key={p.id} className="proj-card">
                <div className="proj-thumb" style={{ background: p.gradient }}>
                  <div className="proj-thumb-inner">
                    <div
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 11,
                        color: p.categoryColor,
                        opacity: 0.5,
                      }}
                    >
                      {p.category}
                    </div>
                  </div>
                  <div className="proj-label">{p.id}</div>
                </div>
                <div className="proj-body">
                  <div className="proj-title-row">
                    <span className="proj-title">{p.title}</span>
                    <div className="proj-links">
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="proj-link"
                          aria-label={`${p.title} source code on GitHub`}
                        >
                          <Si.SiGithub size={13} /> Code
                        </a>
                      )}
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="proj-link"
                          aria-label={`${p.title} live demo`}
                        >
                          <FiExternalLink size={13} /> Live
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="proj-desc">{p.description}</p>
                  <div className="proj-tags">
                    {p.tags.map((tag) => (
                      <span key={tag} className="proj-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section>
          <div className="sec-label">Experience</div>
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="exp-card">
              <div className="exp-top">
                <div className="exp-left">
                  <div className="exp-logo">{exp.logoLabel}</div>
                  <div>
                    <div className="exp-role">{exp.role}</div>
                    <div className="exp-company">
                      {exp.company} · {exp.type}
                    </div>
                  </div>
                </div>
                <div className="exp-date">{exp.period}</div>
              </div>
              <p className="exp-desc">{exp.description}</p>
              <ul className="exp-bullets">
                {exp.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* ── BLOG ── */}
        <section id="blog">
          <div className="sec-label">Blog / Writings</div>
          <div className="blog-list">
            {BLOG_POSTS.map((post) => (
              <a key={post.id} href={post.url} className="blog-item">
                <div>
                  <div className="blog-meta">
                    {post.date} · {post.readTime}
                  </div>
                  <div className="blog-title">{post.title}</div>
                  <div className="blog-tags-row">
                    {post.tags.map((tag) => (
                      <span key={tag} className="blog-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="blog-arrow">↗</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" style={{ paddingBottom: "5rem" }}>
          <div className="sec-label">Let's Work Together</div>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-title">Get in Touch</div>
              <p className="contact-sub">
                Choose your preferred method and let's talk.
              </p>
              <a
                href="mailto:arindombiswas29@gmail.com"
                className="contact-row"
              >
                <div className="contact-row-left">
                  <FiMail size={14} color="var(--muted)" />
                  <div>
                    <div className="contact-row-title">
                      arindombiswas29@gmail.com
                    </div>
                    <div className="contact-row-sub">
                      Quickest way to reach me
                    </div>
                  </div>
                </div>
                <FiArrowRight size={11} color="var(--muted2)" />
              </a>
              <a
                href="https://github.com/ArindamBiswas10"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-row"
              >
                <div className="contact-row-left">
                  <Si.SiGithub size={14} color="var(--muted)" />
                  <div>
                    <div className="contact-row-title">
                      github.com/ArindamBiswas10
                    </div>
                    <div className="contact-row-sub">See what I'm building</div>
                  </div>
                </div>
                <FiArrowRight size={11} color="var(--muted2)" />
              </a>
              <a
                href="https://x.com/arindamdebugs"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-row"
              >
                <div className="contact-row-left">
                  <Si.SiX size={14} color="var(--muted)" />
                  <div>
                    <div className="contact-row-title">@arindamdebugs</div>
                    <div className="contact-row-sub">Follow for updates</div>
                  </div>
                </div>
                <FiArrowRight size={11} color="var(--muted2)" />
              </a>
              <div className="contact-avail">
                Response within 24 hours · Available for hire
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-title">Send a Message</div>
              <p className="contact-sub">
                Fill out the form and I'll get back to you within 24 hours.
              </p>
              <ContactForm />
            </div>
          </div>

          <div className="quote-card">
            <div className="quote-icon">"</div>
            <div style={{ flex: 1 }}>
              <p className="quote-text">
                The best code is code you never have to write twice. Every
                system is a chance to design something that lasts.
              </p>
              <div className="quote-attr">Arindam's principle</div>
            </div>
          </div>
        </section>
      </div>

      <footer>
        <div className="footer-inner">
          <span className="footer-copy">© 2026 Arindam Biswas.</span>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#blog">Blog</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-icons">
            <a
              href="https://x.com/arindamdebugs"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <Si.SiX size={15} />
            </a>
            <a href="mailto:arindombiswas29@gmail.com" className="footer-icon">
              <FiMail size={15} />
            </a>
            <a
              href="https://github.com/ArindamBiswas10"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <Si.SiGithub size={15} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFeedback(data.message);
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setFeedback(data.message);
      }
    } catch {
      setStatus("error");
      setFeedback("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input
        className="msg-input"
        placeholder="Full Name"
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        disabled={status === "loading"}
        required
      />
      <input
        className="msg-input"
        placeholder="Email Address"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        disabled={status === "loading"}
        required
      />
      <textarea
        className="msg-input"
        placeholder="Your Message"
        name="message"
        value={form.message}
        onChange={handleChange}
        disabled={status === "loading"}
        required
      />
      {feedback && (
        <p
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            marginBottom: 8,
            color: status === "success" ? "var(--green)" : "#f87171",
          }}
        >
          {status === "success" ? "✓ " : "✗ "}
          {feedback}
        </p>
      )}
      <button className="msg-btn" type="submit" disabled={status === "loading"}>
        {status === "loading"
          ? "Sending…"
          : status === "success"
            ? "Sent ✓"
            : "Send Message →"}
      </button>
    </form>
  );
}

function Avatar() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="avatar">
      {failed ? (
        "AB"
      ) : (
        <img
          src="https://github.com/ArindamBiswas10.png?size=128"
          alt="Arindam Biswas"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
