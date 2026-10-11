import { useEffect, useState } from "react";
import { ScrollTrigger } from "../lib/gsap";

interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";
}

interface Week {
  contributionDays: ContributionDay[];
}

interface GithubData {
  totalContributions: number;
  weeks: Week[];
}

const LEVEL_COLORS: Record<ContributionDay["contributionLevel"], string> = {
  NONE: "var(--bg3)",
  FIRST_QUARTILE: "#1a3a2a",
  SECOND_QUARTILE: "#236b3e",
  THIRD_QUARTILE: "#2ea04f",
  FOURTH_QUARTILE: "#40d166",
};



export default function GithubGrid() {
  const [data, setData] = useState<GithubData | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);


useEffect(() => {
  if (data) ScrollTrigger.refresh();
}, [data]);

    if (!data) return null;

  const { weeks } = data;

  // One label per month change, placed on the column where the month starts
  const months: { col: number; name: string }[] = [];
  weeks.forEach((week, wi) => {
    const m = new Date(week.contributionDays[0].date).getUTCMonth();
    const prev = wi > 0 ? new Date(weeks[wi - 1].contributionDays[0].date).getUTCMonth() : -1;
    if (m !== prev) {
      months.push({
        col: wi + 1,
        name: new Date(week.contributionDays[0].date).toLocaleString("en-US", { month: "short", timeZone: "UTC" }),
      });
    }
  });
  // Drop a cramped first label if the next month starts right after it
  if (months.length > 1 && months[1].col - months[0].col < 3) months.shift();

  return (
    <div className="gh-card" style={{ "--weeks": weeks.length } as React.CSSProperties}>
      <div className="gh-months">
        {months.map((m) => (
          <span key={m.col} className="gh-month" style={{ gridColumn: `${m.col} / span 4` }}>
            {m.name}
          </span>
        ))}
      </div>

      <div className="gh-cells">
        {weeks.map((week, wi) =>
          week.contributionDays.map((day) => (
            <div
              key={day.date}
              className="gh-cell"
              style={{
                gridColumn: wi + 1,
                gridRow: new Date(day.date).getUTCDay() + 1,
                background: LEVEL_COLORS[day.contributionLevel],
              }}
              title={`${day.date}: ${day.contributionCount} contributions`}
            />
          ))
        )}
      </div>

      <div className="gh-footer">
        <span className="gh-count">
          <strong>{data.totalContributions}</strong> contributions in the last year
        </span>
        <div className="gh-legend">
          <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted2)" }}>Less</span>
          {Object.values(LEVEL_COLORS).map((bg, i) => (
            <div key={i} className="gh-legend-cell" style={{ background: bg }} />
          ))}
          <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted2)" }}>More</span>
        </div>
      </div>
    </div>
  );
}