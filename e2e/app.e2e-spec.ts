import { LegalAdvicePage } from './app.po';

describe('legal-advice App', () => {
  let page: LegalAdvicePage;

  beforeEach(() => {
    page = new LegalAdvicePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
