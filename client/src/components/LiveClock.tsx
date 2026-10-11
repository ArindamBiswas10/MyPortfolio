import { useEffect, useState } from "react";

export default function LiveClock() {
  const [time, setTime] = useState("--:-- --");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      let h = ist.getHours();
      const m = ist.getMinutes();
      const ap = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      setTime(`${h}:${m < 10 ? "0" : ""}${m} ${ap}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span style={{ color: "#888" }}>{time}</span>;
}