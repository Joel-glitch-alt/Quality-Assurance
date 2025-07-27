const { Builder, By, until } = require("selenium-webdriver");

let driver;

beforeAll(async () => {
  driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000");
}, 10000);

afterAll(async () => {
  await driver.quit();
});

test("Login with valid credentials", async () => {
  await driver
    .findElement(By.css('[data-testid="username"]'))
    .sendKeys("admin");
  await driver.findElement(By.css('[data-testid="password"]')).sendKeys("1234");
  await driver.findElement(By.css('[data-testid="login-button"]')).click();
  await driver.wait(
    until.elementLocated(By.css('[data-testid="todo-input"]')),
    5000
  );
});

test("Create a new todo item", async () => {
  await driver
    .findElement(By.css('[data-testid="todo-input"]'))
    .sendKeys("Test Task");
  await driver.findElement(By.css('[data-testid="add-button"]')).click();
  const todo = await driver
    .findElement(By.css('[data-testid="todo-text"]'))
    .getText();
  expect(todo).toBe("Test Task");
});

test("Edit the todo item", async () => {
  await driver.findElement(By.css('[data-testid="edit-button"]')).click();
  const input = await driver.findElement(By.css('[data-testid="edit-input"]'));
  await input.clear();
  await input.sendKeys("Updated Task");
  await input.sendKeys("\n"); // triggers blur
  const updated = await driver
    .findElement(By.css('[data-testid="todo-text"]'))
    .getText();
  expect(updated).toBe("Updated Task");
});

test("Delete the todo item", async () => {
  await driver.findElement(By.css('[data-testid="delete-button"]')).click();
  const items = await driver.findElements(By.css('[data-testid="todo-text"]'));
  expect(items.length).toBe(0);
});
