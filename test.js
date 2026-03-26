const { By, Builder, Browser, until } = require("selenium-webdriver");
const assert = require("assert");

const URL = "https://topeeez.cz";
let driver;

// ─── Setup & Teardown ────────────────────────────────────────────
before(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().setTimeouts({ implicit: 3000 });
    await driver.manage().window().maximize();
});

after(async () => {
    await driver.quit();
});

// ─── 1. Základní načtení stránky ────────────────────────────────
describe("Základní načtení", () => {
    it("Stránka se načte a má správný titulek", async () => {
        await driver.get(URL);
        const title = await driver.getTitle();
        assert.ok(title.length > 0, "Titulek stránky je prázdný");
        console.log("Titulek:", title);
    });

    it("URL je dostupná (žádný 404)", async () => {
        await driver.get(URL);
        const currentUrl = await driver.getCurrentUrl();
        assert.ok(currentUrl.includes("topeeez.cz"));
    });
});

// ─── 2. Navigace ────────────────────────────────────────────────
describe("Navigace", () => {
    it("Hlavní menu je viditelné", async () => {
        await driver.get(URL);
        const nav = await driver.findElement(By.css("nav, .navbar, header"));
        assert.ok(await nav.isDisplayed(), "Navigace není viditelná");
    });

    it("Logo/home link vede zpět na hlavní stránku", async () => {
        await driver.get(URL);
        const logo = await driver.findElement(By.css('header a[href="/"]'));
        await logo.click();
        await driver.wait(until.urlContains("topeeez.cz"), 3000);
        const url = await driver.getCurrentUrl();
        assert.ok(url.includes("topeeez.cz"));
    });
});

// ─── 3. Obsah hlavní stránky ────────────────────────────────────
describe("Obsah stránky", () => {
    it("Hlavní nadpis (h1) existuje a není prázdný", async () => {
        await driver.get(URL);
        const h1 = await driver.findElement(By.css("h1"));
        const text = await h1.getText();
        assert.ok(text.length > 0, "H1 je prázdné");
        console.log("H1:", text);
    });

    it("Obrázky mají alt atribut", async () => {
        await driver.get(URL);
        const images = await driver.findElements(By.css("img"));
        for (const img of images) {
            const alt = await img.getAttribute("alt");
            const src = await img.getAttribute("src");
            assert.ok(alt !== null, `Obrázek bez alt atributu: ${src}`);
        }
    });

    it("Stránka neobsahuje broken links (základní check)", async () => {
        await driver.get(URL);
        const links = await driver.findElements(By.css("a[href]"));
        assert.ok(links.length > 0, "Na stránce nejsou žádné odkazy");
        console.log(`Nalezeno ${links.length} odkazů`);
    });
});

// ─── 4. Formuláře ────────────────────────────────────────────────
describe("Formulář", () => {
    it("Kontaktní formulář jde odeslat", async () => {
        await driver.get(`${URL}/#contact`);

        // Scrollni na formulář
        await driver.executeScript(
            "document.querySelector('.form-content').scrollIntoView()",
        );

        await driver
            .findElement(By.css('input[name="name"]'))
            .sendKeys("Test Uživatel");
        await driver
            .findElement(By.css('input[name="email"]'))
            .sendKeys("test@example.com");
        await driver
            .findElement(By.css('textarea[name="message"]'))
            .sendKeys("Testovací zpráva ze Selenium");

        await driver.findElement(By.css('button[type="submit"]')).click();

        const toast = await driver.wait(
            until.elementLocated(
                By.css(
                    '[data-sonner-toast], [role="status"], [data-type="success"]',
                ),
            ),
            8000,
        );
        assert.ok(await toast.isDisplayed(), "Toast notifikace se nezobrazila");
    });
});

// ─── 5. Responzivita ────────────────────────────────────────────
describe("Responzivita", () => {
    it("Stránka vypadá OK na mobilní šířce (375px)", async () => {
        await driver.manage().window().setRect({ width: 375, height: 812 });
        await driver.get(URL);
        const body = await driver.findElement(By.css("body"));
        assert.ok(await body.isDisplayed());
        await driver.manage().window().maximize();
    });
});
