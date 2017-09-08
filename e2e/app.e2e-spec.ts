import { DynamicPage } from './app.po';

describe('dynamic App', () => {
  let page: DynamicPage;

  beforeEach(() => {
    page = new DynamicPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
