import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated once at build time: the card shown when the link is shared.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0d1117",
          backgroundImage:
            "radial-gradient(900px 420px at 15% 0%, rgba(255,145,77,0.28), transparent 70%)",
          color: "#f0f3f6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #ff914d, #ea580c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 800,
              color: "#fff",
            }}
          >
            K
          </div>
          <div style={{ fontSize: 30, fontWeight: 600 }}>Keploy × Go · Quickstart tutorial</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 800, color: "#ff914d", letterSpacing: -2 }}>
            Record, replay, relax.
          </div>
          <div style={{ fontSize: 46, fontWeight: 700, letterSpacing: -1 }}>
            API testing a Go app with Keploy
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, fontSize: 24, color: "#9da7b3" }}>
          {["Gin + MongoDB", "No test code", "No test database", `Verified ${siteConfig.verified.date}`].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
