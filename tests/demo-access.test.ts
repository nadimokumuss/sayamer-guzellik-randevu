import { buildDemoLoginPath, getSafeRedirectPath } from "@/lib/demo-access";

describe("demo access helpers", () => {
  it("falls back to root for unsafe redirects", () => {
    expect(getSafeRedirectPath("https://example.com")).toBe("/");
    expect(getSafeRedirectPath("//evil.example")).toBe("/");
    expect(getSafeRedirectPath("yonetim")).toBe("/");
  });

  it("keeps local relative paths", () => {
    expect(getSafeRedirectPath("/yonetim")).toBe("/yonetim");
    expect(getSafeRedirectPath("/takvim?gun=2026-04-08")).toBe("/takvim?gun=2026-04-08");
  });

  it("builds login path with next query", () => {
    expect(buildDemoLoginPath("/yonetim")).toBe("/giris?next=%2Fyonetim");
    expect(buildDemoLoginPath("/")).toBe("/giris");
  });
});
