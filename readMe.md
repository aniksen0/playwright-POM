# View this test strategy file from here
```URL: https://docs.google.com/document/d/1g14bHdiubE7cve0KSYDucGffh4j4e2kHPL0jnS5PRvE/edit?usp=sharing```

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

> ⚠️ **Warning:**  
> Test cases `extra`, `TC16`, `TC18`, and `TC20` are expected to fail due to known bugs.

## Folder Structure

```plaintext
playwright-POM/
├── tests/
│   ├── regression.spec.js
├── pages/
│   ├── DashboardPage.ts
│   ├── base.page.js
├── testData
├── .github/
│   └── workflows/
│       └── playwright.yml
├── playwright.config.js
├── package.json
|-- package-lock.json
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

---

## Installation & Setup Guide

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

### 1. Clone the Repository
```sh
git clone <your-repo-url>
cd playwright-POM
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Project Structure Overview
- All test cases are in the `tests/` folder.
- Page Object Models are in the `page/` or `pages/` folder.
- Test data is in `testData/`.
- Configuration is in `playwright.config.ts`.

### 4. Running Tests
To run all Playwright tests:
```sh
npm test
```
Or directly:
```sh
npx playwright test
```

#### Run Specific Test File
```sh
npx playwright test tests/regression.spec.ts
```

#### Run Tests in Headed Mode (see browser UI)
```sh
npx playwright test --headed
```

#### Generate HTML Report
After running tests, open the report:
```sh
npx playwright show-report
```

### 5. Using Scripts
- `npm test`: Runs all Playwright tests as defined in `package.json`.
- You can add more scripts in `package.json` as needed (e.g., for linting, cleaning reports, etc.).

### 6. CI/CD Integration
- The workflow file `.github/workflows/playwright.yml` automates test execution in CI/CD pipelines (such as GitHub Actions).
- On every push or pull request, tests run automatically to ensure code quality and catch regressions early.
- Test results are collected and an HTML report is generated for each run, making it easy to review outcomes directly from the pipeline.
- The workflow can be customized to include steps for installing dependencies, running lint checks, and publishing reports or artifacts.
- This setup helps maintain a reliable, consistent testing process and supports rapid development cycles.

### 7. Troubleshooting
- If you encounter issues, ensure all dependencies are installed and Node.js is up to date.
- For Playwright-specific errors, refer to the [Playwright documentation](https://playwright.dev/docs/intro).

---

