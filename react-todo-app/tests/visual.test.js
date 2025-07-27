const puppeteer = require("puppeteer");
const { toMatchImageSnapshot } = require("jest-image-snapshot");

expect.extend({ toMatchImageSnapshot });

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto("http://localhost:3000");
});

afterAll(async () => {
  await browser.close();
});

test("Homepage visual snapshot", async () => {
  const screenshot = await page.screenshot();
  expect(screenshot).toMatchImageSnapshot();
});
