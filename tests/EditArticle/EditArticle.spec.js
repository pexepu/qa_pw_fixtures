import { test } from '../_fixtures/fixtures';

import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import {
  TITLE_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  TEXT_CANNOT_BE_EMPTY
} from '../../src/ui/constants/articleErrorMessages';








test.beforeEach(async ({ page, user }) => {
  
  await signUpUser(page, user);
});

test.describe('Edit  an article WITHOUT tags',  () => {
  
  test.beforeEach(async ({ articleWithoutTags, createNewArticle}) => {
    
    await createNewArticle(articleWithoutTags);
    
});
  
  test('Edit the article title for the existing article', async ({
    viewArticlePage, 
    articleWithOneTag
  }) => {
    await viewArticlePage.clickEditArticleLink();
    await viewArticlePage.editArticleTitle(articleWithOneTag.title);
    await viewArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  });

  test('Edit the article description for the existing article', 
    async ({viewArticlePage, homePage, articleWithOneTag}) => {
    
    await viewArticlePage.clickEditArticleLink();
    await viewArticlePage.editArticleDescription(articleWithOneTag.description);
    await viewArticlePage.clickUpdateArticleButtonNormal();
    await viewArticlePage.openHomePage();
    await homePage.clickGlobalFeed();
    await homePage.assertDescriptionChangeVisible(
      articleWithOneTag.description
    );
  });

  test('Edit the article text for the existing article', async ({
    viewArticlePage, 
    articleWithOneTag
  }) => {
    await viewArticlePage.clickEditArticleLink();
    await viewArticlePage.editAarticleBody(articleWithOneTag.text);
    await viewArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertArticleTextIsVisible(articleWithOneTag.text);
  });

  test('Add the tag for the existing article without tags', async ({
    viewArticlePage, articleWithOneTag
  }) => {
    
    await viewArticlePage.clickEditArticleLink();
    await viewArticlePage.editArticleTag(articleWithOneTag.tags[0]);
    await viewArticlePage.enterEtner();
    await viewArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertArticleTagIsVisible(articleWithOneTag.tags[0]);
  });

  test ('Remove an article title for the existing article', 
    async ({viewArticlePage}) => {
    await viewArticlePage.clickEditArticleLink();
    await viewArticlePage.editArticleTitle('');
    await viewArticlePage.clickUpdateArticleButtonNormal();
    await viewArticlePage
    .assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
    
  });

  test('Remove an article description for the existing article', 
    async ({viewArticlePage}) => {
    await viewArticlePage.clickEditArticleLink();
    await viewArticlePage.editArticleDescription('');
    await viewArticlePage.clickUpdateArticleButtonNormal();
    await viewArticlePage
    .assertErrorMessageContainsText(DESCRIPTION_CANNOT_BE_EMPTY);
  });

  test('Remove the article text for the existing article', 
    async ({viewArticlePage}) => {
    await viewArticlePage.clickEditArticleLink();
    await viewArticlePage.editAarticleBody('');
    await viewArticlePage.clickUpdateArticleButtonNormal();
    await viewArticlePage
    .assertErrorMessageContainsText(TEXT_CANNOT_BE_EMPTY);
  })

  
});


test.describe('Edit an article WITH tags',  () => {
  
  test.beforeEach(async ({ articleWithOneTag, createNewArticle}) => {
    
    await createNewArticle(articleWithOneTag);
   
});

  test('Add the tag for the existing article with tags', async ({
    viewArticlePage, articleWithTwoTags, articleWithOneTag
  }) => {
    await viewArticlePage.clickEditArticleLink();
    await viewArticlePage.editArticleTag(articleWithTwoTags.tags[0]);
    await viewArticlePage.enterEtner();
    await viewArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertArticleTagIsVisible(articleWithOneTag.tags[0]);
    await viewArticlePage.assertArticleTagIsVisible(articleWithTwoTags.tags[0]);
  })

  test('Remove an article tag for the existing article with tag', 
    async ({viewArticlePage, articleWithOneTag}) => {
    await viewArticlePage.clickEditArticleLink();
    await viewArticlePage.deleteArticleTags();
    await viewArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertArticleTagIsNotVisible(
      articleWithOneTag.tags[0]);
  })
  
  
});


