import { useEffect, useState } from "react";

const SECTIONS = ["home", "about", "blog"] as const;
type Section = (typeof SECTIONS)[number];

const LOGO = "~/arindam_biswas";

export default function NavBar() {
  const [active, setActive] = useState<Section>("home");

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY + 100;
      let current: Section = "home";
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav>
      <a href="#home" className="nav-logo" aria-label="Arindam Biswas, back to top">
        {LOGO.split("").map((ch, i) => (
          <span
            key={i}
            className="roll"
            style={{ "--i": i } as React.CSSProperties}
            aria-hidden="true"
          >
            <span>{ch}</span>
            <span>{ch}</span>
          </span>
        ))}
      </a>
      <div className="nav-links">
        {SECTIONS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? "active" : ""}
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
      </div>
    </nav>
  );
}