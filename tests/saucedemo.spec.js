// tests/saucedemo.spec.js
const { test, expect } = require('@playwright/test');

test('Verify locked_out_user cannot login', async ({ page }) => {
  // 1. Navigate to the site
  await page.goto('https://www.saucedemo.com/');

  // 2. Perform Login
  await page.fill('#user-name', 'locked_out_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // 3. Verify Error Message
  const errorElement = page.locator('h3[data-test="error"]');
  await expect(errorElement).toBeVisible();
  await expect(errorElement).toHaveText(/Epic sadface: Sorry, this user has been locked out./);
});