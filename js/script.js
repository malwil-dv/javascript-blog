{
  'use strict';

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    
    /* remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */

    const hrefAttributeClickedElement = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */

    const selectedArticle = document.querySelector(hrefAttributeClickedElement);

    /* add class 'active' to the correct article */

    selectedArticle.classList.add('active'); 
  }

  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';

  function generateTitleLinks (){

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    console.log('titleList is: ', titleList);
    titleList.innerHTML = '';
    console.log('titleList is:', titleList);

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log('articles are: ', articles);

    let html  = '';

    for(let article of articles){

      /* get the article id */
      const articleId = article.getAttribute('id');
      console.log('articleId is: ', articleId);

      /* find the title element */
      const titleElement = article.querySelector(optTitleSelector);
      console.log('titleElement is:', titleElement);

      /* get the title from the title element */
      const articleTitle = titleElement.innerHTML;
      console.log('articleTitle is: ', articleTitle);

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId  + '"><span>' + articleTitle + '</span></a></li>';
      console.log('linkHTML is: ', linkHTML);

      /* insert link into titleList */
      // titleList.insertAdjacentHTML("beforeend", linkHTML);
      // console.log('TitleList is: ', titleList);

      /* insert link into html variable */
      html = html + linkHTML;
      console.log('Value of html is: ', html);
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    console.log('Const links is: ', links);

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  }

  generateTitleLinks ();

}
