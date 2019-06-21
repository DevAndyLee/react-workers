import { header, message, counterButton } from './pageObjects';
import { load } from '../helpers';

describe('app', () => {
  beforeEach(async () => {
    await load();
  });

  it('should show the right header', async () => {
    expect(await header().getText()).toBe('Home');
  });

  it('should show no clicks', async () => {
    expect(await message().getText()).toBe('I have been clicked 0 times');
  });

  describe('clicked button', () => {
    beforeEach(async () => {
      await counterButton().click();
    });

    it('should show one click', async () => {
      expect(await message().getText()).toBe('I have been clicked 1 times');
    });
  });
});
