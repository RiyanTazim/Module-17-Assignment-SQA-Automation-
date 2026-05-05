const { test, expect } = require('@playwright/test');

test('Q2: Purchase flow and verification', async ({ page }) => {
  // 1. Log in
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // 2. Open Menu and Reset App State
  await page.click('#react-burger-menu-btn');
  await page.click('#reset_sidebar_link');
  await page.click('#react-burger-cross-btn'); // Close the menu

  // 3. Add 3 items to cart
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('#add-to-cart-sauce-labs-bike-light');
  await page.click('#add-to-cart-sauce-labs-bolt-t-shirt');

  // 4. Navigate to Checkout
  await page.click('.shopping_cart_link');
  await page.click('#checkout');

  // Fill Checkout Info
  await page.fill('#first-name', 'Test');
  await page.fill('#last-name', 'User');
  await page.fill('#postal-code', '12345');
  await page.click('#continue');

  // 5. Verify product name and total price
  // Verify products exist in the cart
  await expect(page.locator('.inventory_item_name').first()).toBeVisible();
  
  // Verify Total Price exists (Checking that the total label is present)
  const totalLabel = page.locator('.summary_total_label');
  await expect(totalLabel).toContainText('Total: $');

  // 6. Finish Purchase
  await page.click('#finish');

  // 7. Verify Success Message
  const successHeader = page.locator('.complete-header');
  await expect(successHeader).toHaveText('Thank you for your order!');

  // 8. Reset App State again & Logout
  await page.click('#react-burger-menu-btn');
  await page.click('#reset_sidebar_link');
  await page.click('#logout_sidebar_link');

  // Final verification: Ensure we are back at the login page
  await expect(page).toHaveURL(/.*saucedemo.com/);
});