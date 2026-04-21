import { expect, test } from "@playwright/test";

test("customer can move from home page to service listing", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Sayamer Güzellik")).toBeVisible();
  await page.getByRole("link", { name: "Online Randevu" }).click();
  await expect(page.getByText("Bakım yolculuğunu şimdi başlatın")).toBeVisible();
});
