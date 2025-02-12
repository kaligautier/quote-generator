const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // true par la suite
  const page = await browser.newPage();

  // Configure le téléchargement automatique
  const downloadPath = "./downloads";
  const client = await page.createCDPSession();
  await client.send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: downloadPath,
  });

  await page.goto("http://localhost:3000");
  await new Promise((resolve) => setTimeout(resolve, 500));

  await page.type("#email", "test@example.com");
  await new Promise((resolve) => setTimeout(resolve, 500));

  await page.type("#password", "123456");
  await new Promise((resolve) => setTimeout(resolve, 500));

  await page.click("button[type='submit']");
  await page.waitForNavigation();
  await new Promise((resolve) => setTimeout(resolve, 500));

  await page.goto("http://localhost:3000/quote-form");
  await new Promise((resolve) => setTimeout(resolve, 500));

  await page.select("select", "option1");
  await new Promise((resolve) => setTimeout(resolve, 500));

  await page.type("#amount", "1000");
  await new Promise((resolve) => setTimeout(resolve, 500));

  await page.click("#customization");
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Informations d'assurance pertinentes
  const insuranceInfo = {
    field1: "John Doe", // Nom complet
    field2: "15/03/1985", // Date de naissance
    field3: "123 Rue de la Paix, 75000 Paris", // Adresse
    field4: "Appartement 75m²", // Type de bien à assurer
    field5: "2", // Nombre d'occupants
    field6: "Non", // Sinistres précédents
    field7: "Protection juridique incluse", // Options supplémentaires
  };

  for (let i = 1; i <= 7; i++) {
    await page.type(`#field${i}`, insuranceInfo[`field${i}`]);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  await page.click("button[type='submit']");
  await page.waitForNavigation();
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (page.url().includes("/confirmation")) {
    await page.waitForSelector("button");
    await page.click("button");
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  await new Promise((resolve) => setTimeout(resolve, 5000));
  await browser.close();
})();
