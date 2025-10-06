# Playwright automation with CI/CD.
This is a web test automation framework, This automation script follows
- Page Object Model
- Reporting tools
- Retries
- structured code format
- clean and reusable code
- hassle free plug and run

## Test cases covered here
- TC01-Verify url navigate to the right page | priority - low
- TC02-Verify dashboard page has all the filter available | priority - High
- extra- verify sort by "price ascending/descending" working | | priority - medium
- TC03-verify search bar existence - | priority - medium
- TC04-verify search bar functionality with valid data | priority - medium
- TC05-verify search bar functionality with invalid data | priority - medium
- TC06-verify product navigation | priority - High
- TC07-verify product title is similar on dashboard and product details page | priority - High
- TC08-Verify product price is similar on dashboard and product details page | priority - High
- TC09-verify user can choose color and all the color options are selectable | priority - High
- TC10-verify user can choose size and all the size options are selectable | priority - High
- TC11-verify add to cart option is visible on product details page | priority - High
- TC12-verify user can not add product on cart before selecting color and size | priority - High
- TC13-verify initially cart is empty  | priority - High
- TC14-verify adding a product in cart successfully add the product to the cart and cart opens | priority - High
- TC15-verify added product name and chosen color and size is correct | priority - High
- TC16-verify product price is correct on cart | priority - High
- TC17-verify user can increase/decrease the product quantity | priority - High
- TC18- verify increasing/decreasing the product quantity also effects to the total price | priority - High
- TC19- verify user can click on proceed to checkout to checkout the product | priority - High
- TC20- verify on the checkout page, total price is same as cart page | priority - High

-- end of test cases --


## Folder Structure

```plaintext
playwright-POM/
├── tests/
│   ├── dashboard.spec.ts
├── pages/
│   ├── DashboardPage.ts
│   ├── ProductPage.ts
│   └── CartPage.ts
├── utils/
│   ├── helpers.ts
│   └── reporter.ts
├── fixtures/
│   └── testData.json
├── .github/
│   └── workflows/
│       └── ci.yml
├── playwright.config.ts
├── package.json
└── readMe.md
```

**Description:**
- `tests/`: Contains all test case files.
- `pages/`: Page Object Model classes for each page.
- `utils/`: Utility functions and reporting tools.
- `fixtures/`: Test data and mock files.
- `.github/workflows/`: CI/CD pipeline configuration.
- `playwright.config.ts`: Playwright configuration.
- `package.json`: Project dependencies and scripts.
- `readMe.md`: Project documentation.