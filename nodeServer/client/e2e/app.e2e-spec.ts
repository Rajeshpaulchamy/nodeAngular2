import { Ngclient2Page } from './app.po';

describe('ngclient2 App', function() {
  let page: Ngclient2Page;

  beforeEach(() => {
    page = new Ngclient2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
