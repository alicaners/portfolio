import { ImageResponse } from "next/og";
import { profile } from "@content/profile";

export const alt = `${profile.name} · ${profile.title} portfolyosu`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#08090B",
          color: "#EDEFF3",
        }}
      >
        <svg
          width="160"
          height="160"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#EDEFF3"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <path d="M12 3 21 8l-9 5-9-5 9-5Z" stroke="#34D399" />
          <path d="m3 12 9 5 9-5" />
          <path d="m3 16 9 5 9-5" />
        </svg>
        <div style={{ fontSize: 88, fontWeight: 700, marginTop: 48 }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 44, color: "#9097A3", marginTop: 16 }}>
          {profile.title}
        </div>
        <div
          style={{
            width: 160,
            height: 6,
            background: "#34D399",
            marginTop: 40,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
