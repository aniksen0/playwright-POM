class dashboardObject {
    constructor(page) {
        this.page = page;
    }
    get dashboardHeader() {
        return this.page.locator('xpath=//div[contains(text(), "Acme")]');
    }
    get allFilter() {
        return this.page.locator('xpath=//li//a[contains(text(),"All")]');
    }
    get allFilters() {
        return this.page.locator('xpath=(//nav)[2]//ul//li');
    }
    get sortByPriceLower()
    {
        return this.page.locator("xpath=//a[normalize-space()='Price: Low to high']");
    }
    get sortByPriceHigher()
    {
        return this.page.locator("xpath=//a[normalize-space()='Price: High to low']");
    }
    get allProductPrices()
    {
        return this.page.locator("xpath=//p[contains(concat(' ', normalize-space(@class), ' '), ' rounded-full ')]");
    }
    get searchBar()
    {
        return this.page.locator("//input[@placeholder='Search for products...']");
    }
    async totalSearchFoundProducts(value)
    {
        return this.page.locator(`xpath=//p[contains(text(),"Showing ${value} result for")]`);
    }
    get noProductsFound()
    {
        return this.page.locator('xpath=//p[contains(text(),"There are no products that match ")]');
    }
    get firstProduct()
    {
        return this.page.locator('xpath=//p//following-sibling::ul[1]//li[1]');
    }
    get firstProductNameOnSearchBar()
    {
        return this.page.locator('xpath=//p//following-sibling::ul[1]//li[1]//h3');
    }
    get firstProductPriceOnSearchBar()
    {
        return this.page.locator('xpath = //p//following-sibling::ul[1]//li[1]//p');
    }

    async productName(productName)
    {
        return this.page.locator(`xpath= //h1[normalize-space()='${productName}']`);
    }
    async productPrice(productPrice)
    {
        return this.page.locator(`xpath= //p[normalize-space()='${productPrice}']`);
    }
    get colorOptions()
    {
        return this.page.locator('xpath=(//form)[3]//button');
    }
    get sizeOptions()
    {
        return this.page.locator('xpath=(//form)[4]//button');
    }
    get addToCartButton()
    {
        return this.page.locator('xpath=//button[normalize-space()="Add To Cart"]');
    }
    get viewCartButton()
    {
        return this.page.locator('xpath=//button[@aria-label="Open cart"]');
    }
    get cartEmptyMessage()
    {
        return this.page.locator("xpath=//p[normalize-space(.)='Your cart is empty.']");
    }
    get cartProductName()
    {
        return this.page.locator("xpath=//span[@class='leading-tight']");
    }
    get cartProductPrice()
    {
        return this.page.locator("xpath=//p[@class='flex justify-end space-y-2 text-right text-sm']")
    }
    get productColorSize()
    {
        return this.page.locator("xpath=//p[@class='flex justify-end space-y-2 text-right text-sm']")
    }
    get cartItemCount()
    {
        return this.page.locator("xpath=//p[@class='w-6 text-center']");
    }
    get cartIncreaseQuantityButton()
    {
        return this.page.locator("xpath=//button[@aria-label='Increase item quantity']")
    }
    get cartDecreaseQuantityButton()
    {
        return this.page.locator("xpath=//button[@aria-label='Reduce item quantity']")
    }
    get proceedToCheckoutButton()
    {
        return this.page.locator("xpath=//button[normalize-space()='Proceed to Checkout']");
    }
    get closeCartButton()
    {
        return this.page.locator("xpath=//button[@aria-label='Close cart']//div[@class='relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white']")
    }
    get checkoutPageButton()
    {
        return this.page.locator("xpath=//button[normalize-space()='Proceed to Checkout']");
    }

    get checkoutPageHeader()
    {
        return this.page.locator("xpath=//h2[@id='checkout-main-header']")
    }
    async checkoutTotalPrice(price)
    {
        return this.page.locator(`xpath=//strong[contains(text(),'$${price}')]`);
    }

}

export default dashboardObject;