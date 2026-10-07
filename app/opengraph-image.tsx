import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "철학이야기 · 쉬운 철학";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const font = await readFile(join(process.cwd(), "lib/og-font.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3eee6",
          color: "#241c16",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: "0.22em", color: "#a34732" }}>
          PHILOSOPHY STORIES
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, fontFamily: "Noto Sans KR", lineHeight: 1.15 }}>
            철학이야기
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 36,
              color: "#6e6258",
              fontFamily: "Noto Sans KR",
            }}
          >
            쉬운 철학
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#a34732", fontFamily: "Noto Sans KR" }}>
          나두 역사·신화
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Noto Sans KR", data: font, weight: 500, style: "normal" }],
    },
  );
}
