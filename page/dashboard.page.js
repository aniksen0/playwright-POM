import { test, expect, mocha } from "@playwright/test";
import DashboardObject from "./../objects/dashboard.object.js";
import BasePage from "./base.page.js";

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.dashboardObject = new DashboardObject(page);
    this.productName = "";
    this.productPrice = "";
  }

  async openDashboard() {
    await this.open("/"); // automatically uses baseURL
  }

  async verifyDashboardHeader() {
    const headerLocator = this.dashboardObject.dashboardHeader;
    const text = await headerLocator.textContent();
    const headerText = text ? text.toLowerCase() : "";
    expect(headerText).toContain("acme");
    await this.logStep(`✅ Dashboard header verified: ${headerText}`);
    const pageTitle = await this.page.title();
    expect(pageTitle).toContain("Acme");
    await this.logStep(`✅ Page title verified: ${pageTitle}`);
  }
  async clickAllFilters() {
    const allFiltersLocator = this.dashboardObject.allFilter;
    await allFiltersLocator.click();
    await this.logStep(`✅ Clicked on All Filters`);
  }
  async verifyFilters() {
    await this.clickAllFilters();
    await this.page.waitForTimeout(2000);
    const filterList = [
      "All",
      "Bags",
      "Drinkware",
      "Electronics",
      "Footware",
      "Headwear",
      "Hoodies",
      "Jackets",
      "Kids",
      "Pets",
      "Shirts",
      "Stickers",
    ];
    const filtersLocators = this.dashboardObject.allFilters;
    const count = await filtersLocators.count();
    expect(count).toBe(filterList.length);
    await this.logStep(`✅ Total filters verified: ${count}`);
    for (let i = 0; i < count; i++) {
      const filterText = await filtersLocators.nth(i).textContent();
      expect(filterText?.trim()).toBe(filterList[i]);
      await this.logStep(`✅ Filter verified: ${filterText}`);
      await this.logStep(`✅ filter ${filterText} verified successfully`);
    }
  }

  async clickOnLowerToHigherSortOption() {
    const sortByPriceLowerLocator = this.dashboardObject.sortByPriceLower;
    await sortByPriceLowerLocator.click();
    await this.page.waitForTimeout(2000);
    await this.logStep(`✅ Clicked on Sort by Price: Low to high`);
  }
  async clickOnHigherToLowerSortOption() {
    const sortByPriceHigherLocator = this.dashboardObject.sortByPriceHigher;
    await sortByPriceHigherLocator.click();
    await this.page.waitForTimeout(2000);
    await this.logStep(`✅ Clicked on Sort by Price: High to low`);
  }
  async verifySortPrice() {
    await this.clickOnLowerToHigherSortOption();

    const allPrices = await this.dashboardObject.allProductPrices;
    const count = await allPrices.count();
    let prices = [];
    for (let i = 0; i < count; i++) {
      const priceText = await allPrices.nth(i).textContent();
      if (priceText) {
        const priceValue = parseFloat(priceText.replace("$", "").trim());
        prices.push(priceValue);
      }
    }
    console.log("✅ Prices in ascending order: ", prices);
    const sortedPrices = [...prices].sort((a, b) => a - b);
    console.log("✅ Sorted Prices in ascending order: ", sortedPrices);
    expect(prices).toEqual(sortedPrices);
    await this.logStep(
      `✅ Prices sorted in ascending order verified: ${prices.join(", ")}`
    );
  }
  async verifySearchBarExists() {
    const searchBarLocator = this.dashboardObject.searchBar;
    expect(await searchBarLocator.isVisible()).toBeTruthy();
    await this.logStep(`✅ Search bar is visible on the dashboard`);
  }
  async typeOnsearchBar(searchTerm) {
    const searchBarLocator = this.dashboardObject.searchBar;
    await searchBarLocator.fill("");
    await this.page.waitForTimeout(1000);
    await searchBarLocator.fill(searchTerm);
    await this.page.waitForTimeout(2000);
    await this.logStep(`✅ Typed on search bar: ${searchTerm}`);
    await this.page.keyboard.press("Enter");
    await this.page.waitForTimeout(2000);
  }

  async verifySearchFunctionality(isValid = true, searchTerm) {
    if (isValid) {
      await this.typeOnsearchBar(searchTerm);
      await this.page.waitForTimeout(2000);
      const productsFoundLocator =
        await this.dashboardObject.totalSearchFoundProducts(1);
      expect(await productsFoundLocator.isVisible()).toBeTruthy();
      await this.logStep(
        `✅ Search functionality verified with valid data: ${searchTerm}`
      );
    } else {
      await this.typeOnsearchBar(searchTerm);
      const noProductsLocator = this.dashboardObject.noProductsFound;
      expect(await noProductsLocator.isVisible()).toBeTruthy();
      await this.logStep(
        `✅ Search functionality verified with invalid data: ${searchTerm}`
      );
    }
  }
  async clickOnFirstProductFromSearchResults() {
    const firstProductLocator = this.dashboardObject.firstProduct;
    await firstProductLocator.click();
    await this.page.waitForTimeout(2000);
    await this.logStep(`✅ Clicked on the first product`);
  }
  async getFirstProductName() {
    const firstProductNameLocator =
      this.dashboardObject.firstProductNameOnSearchBar;
    const productName = await firstProductNameLocator.textContent();
    this.productName = productName ? productName.trim() : "";
    await this.logStep(
      `✅ First product name on search bar: ${this.productName}`
    );
    return this.productName;
  }
  async getFirstProductPrice() {
    const firstProductPriceLocator =
      this.dashboardObject.firstProductPriceOnSearchBar;
    const productPrice = await firstProductPriceLocator.textContent();
    this.productPrice = productPrice ? productPrice.trim() : "";
    await this.logStep(
      `✅ First product price on search bar: ${this.productPrice}`
    );
    return this.productPrice;
  }

  async verifyProductNameOnDetailsPage() {
    const productNameLocator = await this.dashboardObject.productName(
      this.productName
    );
    expect(await productNameLocator.isVisible()).toBeTruthy();
    await this.logStep(
      `✅ Product name on product page verified: ${this.productName}`
    );
  }
  async verifyProductPriceOnDetailsPage() {
    const productPriceLocator = await this.dashboardObject.productPrice(
      this.productPrice
    );
    expect(await productPriceLocator.isVisible()).toBeTruthy();
    await this.logStep(
      `✅ Product price on product page verified: ${this.productPrice}`
    );
  }

  async verifyColorOptions() {
    const colorOptionsLocator = await this.dashboardObject.colorOptions;
    const count = await colorOptionsLocator.count();
    expect(count).toBeGreaterThan(0);
    await this.logStep(`✅ Color options verified, total colors: ${count}`);
    for (let i = 0; i < count; i++) {
      const colorValueDisable = await colorOptionsLocator
        .nth(i)
        .getAttribute("aria-disabled");
      await this.logStep(`   - Color option ${i + 1}: ${colorValueDisable}`);
      expect(colorValueDisable).toBe("false");
    }
  }

  async verifySizeOptions() {
    const sizeOptionsLocator = await this.dashboardObject.sizeOptions;
    const count = await sizeOptionsLocator.count();
    expect(count).toBeGreaterThan(0);
    await this.logStep(`✅ Size options verified, total sizes: ${count}`);
    for (let i = 0; i < count; i++) {
      const sizeValueDisable = await sizeOptionsLocator
        .nth(i)
        .getAttribute("aria-disabled");
      await this.logStep(`   - Size option ${i + 1}: ${sizeValueDisable}`);
      expect(sizeValueDisable).toBe("false");
    }
  }

  async clickOnColorOption(index = 0) {
    const colorOptionsLocator = await this.dashboardObject.colorOptions;
    const count = await colorOptionsLocator.count();
    if (count > 0 && index < count) {
      await colorOptionsLocator.nth(index).click();
      await this.page.waitForTimeout(2000);
      await this.logStep(`✅ Clicked on color option at index: ${index}`);
    } else {
      throw new Error("❌ Invalid color option index");
    }
  }

  async clickOnSizeOption(index = 0) {
    const sizeOptionsLocator = await this.dashboardObject.sizeOptions;
    const count = await sizeOptionsLocator.count();
    if (count > 0 && index < count) {
      await sizeOptionsLocator.nth(index).click();
      await this.page.waitForTimeout(2000);
      await this.logStep(`✅ Clicked on size option at index: ${index}`);
    } else {
      throw new Error("❌ Invalid size option index");
    }
  }
  async verifyAddToCartOptionVisible() {
    const addToCartButtonLocator = await this.dashboardObject.addToCartButton;
    await addToCartButtonLocator.scrollIntoViewIfNeeded();
    expect(await addToCartButtonLocator.isVisible()).toBeTruthy();
    await this.logStep(`✅ Add to cart button is visible on the product page`);
  }

  async addToCart() {
    const addToCartButtonLocator = await this.dashboardObject.addToCartButton;
    await addToCartButtonLocator.click();
    await this.page.waitForTimeout(2000);
    await this.logStep(`✅ Clicked on Add to cart button`);
  }

  async verifyAddToCartOptionDisabled() {
    const addToCartButtonLocator = await this.dashboardObject.addToCartButton;
    const isDisabled = await addToCartButtonLocator.isDisabled();
    expect(isDisabled).toBeTruthy();
    await this.logStep(`✅ Add to cart button is disabled as expected`);
  }
  async clickOnCart() {
    const viewCartButtonLocator = await this.dashboardObject.viewCartButton;
    await viewCartButtonLocator.click();
    await this.page.waitForTimeout(2000);
    await this.logStep(`✅ Clicked on View cart button`);
  }
  async verifyCartIsEmpty() {
    const cartEmptyMessageLocator = await this.dashboardObject.cartEmptyMessage;
    expect(await cartEmptyMessageLocator.isVisible()).toBeTruthy();
    await this.logStep(`✅ Cart is empty as expected`);
  }
  async verifyCartTotalProduct(value) {
    const cartItemCountLocator = await this.dashboardObject.cartItemCount;
    const itemCountText = await cartItemCountLocator.textContent();
    const itemCount = itemCountText ? parseInt(itemCountText.trim()) : 0;
    expect(itemCount).toBe(value);
    await this.logStep(`✅ Cart item count verified: ${itemCount}`);
  }
  async verifyAddedProductNameInCart() {
    const cartProductNameLocator = await this.dashboardObject.cartProductName;
    const cartProductNameText = await cartProductNameLocator.textContent();
    const cartProductName = cartProductNameText
      ? cartProductNameText.trim()
      : "";
    expect(cartProductName).toBe(this.productName);
    await this.logStep(`✅ Cart product name verified: ${cartProductName}`);
  }
  async verifyAddedProductColorAndSizeInCart() {
    const productColorSizeLocator = await this.dashboardObject.productColorSize;
    expect(await productColorSizeLocator.isVisible()).toBeTruthy();
    await this.logStep(`✅ Product color and size verified in cart`);
  }
  async verifyProductPriceOnCart() {
    const cartProductPriceLocator = await this.dashboardObject.cartProductPrice;
    const cartProductPriceText = await cartProductPriceLocator.textContent();
    const cartProductPrice = cartProductPriceText.replace("$", "").trim();
    console.log("✅ Cart product price: ", cartProductPrice);
    expect(cartProductPrice).toBe(this.productPrice);
    await this.logStep(`✅ Cart product price verified: ${cartProductPrice}`);
  }
  async verifyIncreaseDecreaseQuantity() {
    const cartIncreaseQuantityButtonLocator = await this.dashboardObject
      .cartIncreaseQuantityButton;
    const cartDecreaseQuantityButtonLocator = await this.dashboardObject
      .cartDecreaseQuantityButton;
    await cartIncreaseQuantityButtonLocator.click();
    await this.page.waitForTimeout(2000);
    await this.logStep(`✅ Clicked on Increase item quantity button`);
    await this.verifyCartTotalProduct(2);
    await cartDecreaseQuantityButtonLocator.click();
    await this.page.waitForTimeout(2000);
    await this.logStep(`✅ Clicked on Decrease item quantity button`);
    await this.verifyCartTotalProduct(1);
  }
  async checkoutPageHeaderVisible() {
    const checkoutPageHeaderLocator = this.dashboardObject.checkoutPageHeader;
    expect(await checkoutPageHeaderLocator.isVisible()).toBeTruthy();
    await this.logStep(`✅ Checkout page header is visible`);
  }

  async proceedToCheckout() {
    const proceedToCheckoutButtonLocator = await this.dashboardObject
      .proceedToCheckoutButton;
    await proceedToCheckoutButtonLocator.click();
    await this.page.waitForTimeout(5000);
    await this.logStep(`✅ Clicked on Proceed to checkout button`);
    await this.checkoutPageHeaderVisible();
  }

  async verifyTotalPriceOnCheckoutPage() {
    const checkoutPageTotalPriceLocator = this.dashboardObject.checkoutPageTotalPrice;
    const priceText = await checkoutPageTotalPriceLocator.textContent();
    const checkoutPageTotalPriceText = parseFloat(priceText.replace("$", "").trim());
    await checkoutPageTotalPriceLocator.textContent();
    const checkoutPageTotalPrice = checkoutPageTotalPriceText;
    expect(checkoutPageTotalPrice).toBe(this.productPrice);
    await this.logStep(
      `✅ Checkout page total price verified: ${checkoutPageTotalPrice}`
    );
  }
}

export default DashboardPage;
