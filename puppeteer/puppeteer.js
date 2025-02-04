const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // true par la suite
  const page = await browser.newPage();

  await page.goto("http://localhost:3000");
  await page.type("#email", "test@example.com");
  await page.type("#password", "123456");
  await page.click("button[type='submit']");
  await page.waitForNavigation();
  await page.goto("http://localhost:3000/quote-form"); // Page de devis

  await page.select("select", "option1");
  await page.type("#amount", "1000");
  await page.click("#customization");

  for (let i = 1; i <= 7; i++) {
    await page.type(`#field${i}`, `Valeur ${i}`);
  }
  await page.click("button[type='submit']");
  await page.waitForNavigation();

  if (page.url().includes("/confirmation")) {
    await page.waitForSelector("button");
    await page.click("button");
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  await new Promise((resolve) => setTimeout(resolve, 5000));
  await browser.close();
})();
