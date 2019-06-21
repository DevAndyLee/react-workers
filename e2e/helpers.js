import { until } from 'selenium-webdriver';
import { Builder } from 'selenium-webdriver';

const seleniumHub = 'http://localhost:4444';
export const driver = new Builder()
  .forBrowser('chrome')
  .usingServer(`${seleniumHub}/wd/hub`)
  .build();

export const root = () => driver.findElement({ css: '#root' });

const baseUrl = process.env.E2E_BASE_URL || __baseUrl__;
console.log(`Running E2E tests on website: ${baseUrl}`);

export const load = async () => {
    await driver.get(`${baseUrl}${baseUrl[baseUrl.length - 1] === '/' ? '' : '/'}`);
    await driver.wait(until.elementLocated(root), defaultTimeout);
};

afterAll(async () => {
  // Cleanup `process.on('exit')` event handlers to prevent a memory leak caused by the combination of `jest` & `tmp`.
  for (const listener of process.listeners('exit')) {
    listener();
    process.removeListener('exit', listener);
  }
  await driver.quit();
});

export const defaultTimeout = 10e3;
