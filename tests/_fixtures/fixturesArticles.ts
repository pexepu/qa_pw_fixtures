import { test as base} from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';

import { generateNewArticleData} from '../../src/common/testData/generateNewArticleData';

export const test = base.extend<{
  createArticlePage;
  viewArticlePage;
  articleWithoutTags;
  articleWithOneTag;
  articleWithTwoTags;
  createNewArticle;
}>({
  createArticlePage: async({ page }, use) => {
    const createArticlePage = new CreateArticlePage(page);

    await use(createArticlePage);
  },
  viewArticlePage: async({ page }, use) => {
    const viewArticlePage = new ViewArticlePage(page);

    await use(viewArticlePage);
  },
  articleWithoutTags: async({ logger }, use) => {
    const articleWithoutTags =  generateNewArticleData(logger, 0);

    await use(articleWithoutTags);
  },
  articleWithOneTag: async ({ logger }, use) => {
    const article = generateNewArticleData(logger, 1);
    await use(article);
  },

  articleWithTwoTags: async ({ logger }, use) => {
    const article = generateNewArticleData(logger, 2);
    await use(article);
  },
  createNewArticle: async ({ homePage, createArticlePage }, use) => {
    const createNewArticle = async (article) => {
      await test.step('Create new Article', async () => {
        await homePage.clickNewArticleLink();

        await createArticlePage.fillTitleField(article.title);
        await createArticlePage.fillDescriptionField(article.description);
        await createArticlePage.fillTextField(article.text);

        if (article.tags && article.tags.length > 0) {
          
          await createArticlePage.fillTagsField(article.tags[0]);
          await createArticlePage.enterEtner();
        }

        await createArticlePage.clickPublishArticleButton();
      });
    };

    await use(createNewArticle);
  },
});