export default async function captionClashScenario(a, b) {
  await a.getByLabel("Contest prompt").fill("The meeting starts five minutes early");
  await a.getByRole("button", { name: "Set prompt" }).click();
  await b.getByText(/meeting starts/).waitFor({ timeout: 10_000 });
  await a.getByLabel("Your caption").fill("Everyone discovers a new timezone.");
  await a.getByRole("button", { name: "Submit caption" }).click();
  await b.getByText("Everyone discovers a new timezone.").waitFor({ timeout: 10_000 });
  await b.getByRole("button", { name: "♥ 0" }).click();
  await a.getByRole("button", { name: "♥ 1" }).waitFor({ timeout: 10_000 });
  await a.waitForTimeout(1_000);
}
