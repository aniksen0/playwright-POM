import { test } from "@playwright/test";
export default class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }
  async open(path = '/') {
    await this.page.goto(path);
  }

  async getTitle() {
    return this.page.title();
  }

  async logStep(message, data = null) {
    await test.step(message, async () => {
      if (data) {
        const body =
          typeof data === 'object'
            ? JSON.stringify(data, null, 2)
            : String(data);
        await test.info().attach(message, {
          body: Buffer.from(body, 'utf-8'),
          contentType: 'text/plain',
        });
      }
    });
  }

}
