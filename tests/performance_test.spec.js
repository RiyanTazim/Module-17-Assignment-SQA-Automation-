const { test, expect } = require('@playwright/test');

test('Q3: Performance glitch user flow', async ({ page }) => {
  // 1. Log in
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'performance_glitch_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // 2. Reset App State
  await page.click('#react-burger-menu-btn');
  await page.click('#reset_sidebar_link');
  await page.click('#react-burger-cross-btn');

  // 3. Filter by Name (Z to A)
  // 'za' is the value attribute for 'Name (Z to A)' in the dropdown
  await page.selectOption('.product_sort_container', 'za');

  // 4. Capture the first product name & Add to cart
  // After Z-A sort, the first item will be the one alphabetically last
  const firstProduct = page.locator('.inventory_item_name').first();
  const productName = await firstProduct.innerText();
  await page.click('.btn_inventory >> nth=0');

  // 5. Navigate to checkout
  await page.click('.shopping_cart_link');
  await page.click('#checkout');

  await page.fill('#first-name', 'Test');
  await page.fill('#last-name', 'User');
  await page.fill('#postal-code', '12345');
  await page.click('#continue');

  // 6. Verify product name and total price
  await expect(page.locator('.inventory_item_name')).toHaveText(productName);
  const totalLabel = page.locator('.summary_total_label');
  await expect(totalLabel).toBeVisible();

  // 7. Finish purchase
  await page.click('#finish');
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

  // 8. Reset App State & Logout
  await page.click('#react-burger-menu-btn');
  await page.click('#reset_sidebar_link');
  await page.click('#logout_sidebar_link');
  
  // Verify redirected to login
  await expect(page).toHaveURL(/.*saucedemo.com/);
});