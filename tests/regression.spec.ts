import { test } from '@playwright/test';
import DashboardPage from '../page/dashboard.page';
let dashboard;

test.beforeEach(async ({ page }) => {
  dashboard = new DashboardPage(page);
  await dashboard.openDashboard();
});

test('TC01-Verify url navigate to the right page', async () => {
  await dashboard.verifyDashboardHeader();
});

test('TC02-Verify dashboard page has all the filter available', async () => {
  await dashboard.verifyFilters();
});

test('extra- verify sort by "price ascending/descending" working', async () => {
  await dashboard.clickAllFilters();
  await dashboard.verifySortPrice();
});

test('TC03-verify search bar existence', async () => {
  await dashboard.verifySearchBarExists()
});

test('TC04-verify search bar functionality with valid data', async () => {
  await dashboard.verifySearchFunctionality(true, "bags");
});

test('TC05-verify search bar functionality with invalid data', async () => {
  await dashboard.verifySearchFunctionality(false, "invalid_data");
});

test('TC06-verify product navigation', async () => {
  await dashboard.verifySearchFunctionality(true, "bags");
  await dashboard.clickOnFirstProductFromSearchResults();
});

test('TC07-verify product title is similar on dashboard and product details page', async () => {
  await dashboard.verifySearchFunctionality(true, "bags");
  await dashboard.getFirstProductName();
  await dashboard.clickOnFirstProductFromSearchResults();
  await dashboard.verifyProductNameOnDetailsPage();
});

test('TC08-Verify product price is similar on dashboard and product details page', async () => {
  await dashboard.verifySearchFunctionality(true, "bags");
  await dashboard.getFirstProductPrice();
  await dashboard.clickOnFirstProductFromSearchResults();
  await dashboard.verifyProductPriceOnDetailsPage();
});

test('TC09-verify user can choose color and all the color options are selectable', async () => {
  await dashboard.verifySearchFunctionality(true, "bags");
  await dashboard.clickOnFirstProductFromSearchResults();
  await dashboard.verifyColorOptions();
});

test('TC10-verify user can choose size and all the size options are selectable', async () => {
  await dashboard.verifySearchFunctionality(true, "bags");
  await dashboard.clickOnFirstProductFromSearchResults();
  await dashboard.verifySizeOptions();
});

test('TC11-verify add to cart option is visible on product details page', async () => {
  await dashboard.verifySearchFunctionality(true, "bags");
  await dashboard.clickOnFirstProductFromSearchResults();
  await dashboard.verifyAddToCartOptionVisible();
});

test('TC12-verify user can not add product on cart before selecting color and size', async () => {
  await dashboard.verifySearchFunctionality(true, "bags");
  await dashboard.clickOnFirstProductFromSearchResults();
  await dashboard.verifyAddToCartOptionDisabled();
});

test('TC13-verify initially cart is empty', async () => {
  await dashboard.verifySearchFunctionality(true, "bags");
  await dashboard.clickOnFirstProductFromSearchResults();
  await dashboard.clickOnCart();
  await dashboard.verifyCartIsEmpty();
});

test('TC14-verify adding a product in cart successfully add the product to the cart and cart opens', async () => {
  await dashboard.verifySearchFunctionality(true, "bags");
  await dashboard.clickOnFirstProductFromSearchResults();
  await dashboard.clickOnColorOption(1);
  await dashboard.clickOnSizeOption(2);
  await dashboard.addToCart();
  await dashboard.verifyCartTotalProduct(1);
});

test('TC15-verify added product name and chosen color and size is correct', async () => {
  await dashboard.verifySearchFunctionality(true, "bags");
  await dashboard.getFirstProductName();
  await dashboard.clickOnFirstProductFromSearchResults();
  await dashboard.clickOnColorOption(1);
  await dashboard.clickOnSizeOption(2);
  await dashboard.addToCart();
  await dashboard.verifyAddedProductNameInCart();
  await dashboard.verifyAddedProductColorAndSizeInCart();
});

test('TC16-verify product price is correct on cart', async () => {
  await dashboard.verifySearchFunctionality(true, "bags");
  await dashboard.getFirstProductName();
  await dashboard.getFirstProductPrice();
  await dashboard.clickOnFirstProductFromSearchResults();
  await dashboard.clickOnColorOption(1);
  await dashboard.clickOnSizeOption(2);
  await dashboard.addToCart();
  await dashboard.verifyProductPriceOnCart();
});
//TC18 covered in TC17
test('[TC17, TC18 ]-verify user can increase/decrease the product quantity', async () => {
  await dashboard.verifySearchFunctionality(true, "bags");
  await dashboard.getFirstProductName();
  await dashboard.clickOnFirstProductFromSearchResults();
  await dashboard.clickOnColorOption(1);
  await dashboard.clickOnSizeOption(2);
  await dashboard.addToCart();
  await dashboard.verifyIncreaseDecreaseQuantity();
});

test('TC19- verify user can click on proceed to checkout to checkout the product', async () => {
  await dashboard.verifySearchFunctionality(true, "bags");
  await dashboard.getFirstProductName();
  await dashboard.clickOnFirstProductFromSearchResults();
  await dashboard.clickOnColorOption(1);
  await dashboard.clickOnSizeOption(2);
  await dashboard.addToCart();
  await dashboard.proceedToCheckout();
});

test('TC20- verify on the checkout page, total price is same as cart page', async () => {
  await dashboard.verifySearchFunctionality(true, "bags");
  await dashboard.getFirstProductName();
  await dashboard.clickOnFirstProductFromSearchResults();
  await dashboard.clickOnColorOption(1);
  await dashboard.clickOnSizeOption(2);
  await dashboard.addToCart();
  await dashboard.proceedToCheckout();
  await dashboard.verifyTotalPriceOnCheckoutPage();
});

//Checkout was not covered as it requires live payment details and OTP