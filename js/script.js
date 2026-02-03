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
  };

  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags a, .tags a';
  const optArticleTagsActiveSelector = '.post-tags .list .active';
  const optArticleTagsWrapperSelector = '.post-tags .list';
  const optArticleAuthorSelector = '.post-author';
  const optArticleAuthorActiveSelector = '.post-author .active';
  const optArticleAuthorLinkSelector = '.post-author a';

  function generateTitleLinks (customSelector = ''){
    //console.log('Attribute customSelector is: ', customSelector);
    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html  = '';

    for(let article of articles){

      /* get the article id */

      const articleId = article.getAttribute('id');

      /* find the title element */

      const titleElement = article.querySelector(optTitleSelector);

      /* get the title from the title element */

      const articleTitle = titleElement.innerHTML;

      /* create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId  + '"><span>' + articleTitle + '</span></a></li>';

      /* insert link into html variable */

      html = html + linkHTML;
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  }

  generateTitleLinks ();

  function generateTags(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log('Articles are: ', articles);

    /* START LOOP: for every article: */
    for(let article of articles){
      //console.log('Single article is: ', article);

      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsWrapperSelector);
      //console.log('Tags are: ', tagsWrapper);

      /* make html variable with empty string */
      let html = ''; //sprawdzic czy przed petla

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      //console.log('Articletags are: ', articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      //console.log('Const articleTagsArray is: ', articleTagsArray);

      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
      //console.log('Const tag is: ', tag);

        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-'+ tag +'">' + tag + '</a></li>';
        //console.log('HTML is: ', linkHTML);

        /* add generated code to html variable */
        html = html + linkHTML + ' ';
        //console.log('Const html is: ', html);

      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
      //console.log('TagWrapper is: ', tagsWrapper);

    /* END LOOP: for every article: */
    }
  }

  generateTags();

  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    //console.log('Const clickedElement is: ', clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    //console.log('Const href is: ', href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    //console.log('Const tag is: ', tag);

    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll(optArticleTagsActiveSelector);
    //let activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    //console.log('Const activeTagLinks is: ', activeTagLinks);

    /* START LOOP: for each active tag link */
    for(let activeTagLink of activeTagLinks){
    //console.log('Let activeTagLink is: ', activeTagLink);
      /* remove class active */
      activeTagLink.classList.remove('active');

    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const equalAttributesToHref = document.querySelectorAll('a[href="' + href + '"]');
    //console.log('Const equalAttributesToHref is: ', equalAttributesToHref);

    /* START LOOP: for each found tag link */
    for(let equalAttributeToHref of equalAttributesToHref){
      /* add class active */
      equalAttributeToHref.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="'+ tag +'"]');

  }

  function addClickListenersToTags(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll(optArticleTagsSelector);
    //console.log('tagLinks are: ', tagLinks);
    /* START LOOP: for each link */
    for(let tagLink of tagLinks ){
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();

  function generateAuthors(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log('Articles are: ', articles);

    /* START LOOP: for every article: */
    for(let article of articles){
    //console.log('Single article is: ', article);

      /* find author wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      //console.log('authorWrapper is: ', authorWrapper);

      /* get author from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      //console.log('articleAuthor is: ', articleAuthor);

      /* generate HTML of the link */
      const linkHTML = 'by <a href="#author-'+ articleAuthor + '">' + articleAuthor + '</a>';
      //console.log('Author HTML is: ', linkHTML);

      /* insert HTML of all the links into the author wrapper */
      authorWrapper.innerHTML = linkHTML;
      //console.log('authorWrapper is: ', authorWrapper);

    /* END LOOP: for every article: */
    }
  }
  generateAuthors();

  function authorClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('Const clickedElement is: ', clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('Const href is: ', href);

    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
    //console.log('Const author is: ', author);

    /* find all author links with class active */
    const activeAuthorLinks = document.querySelectorAll(optArticleAuthorActiveSelector);
    //let activeAuthorLinks = document.querySelectorAll('a.active[href^="#author"]');
    //console.log('Const activeAuthorLinks is: ', activeAuthorLinks);

    /* START LOOP: for each active author links */
    for(let activeAuthorLink of activeAuthorLinks){
    //console.log('Let activeAuthorLink is: ', activeAuthorLink);
      /* remove class active */
      activeAuthorLink.classList.remove('active');

    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const equalAttributesToHref = document.querySelectorAll('a[href="' + href + '"]');
    //console.log('Const equalAttributesToHref is: ', equalAttributesToHref);

    /* START LOOP: for each found author link */
    for(let equalAttributeToHref of equalAttributesToHref){
      /* add class active */
      equalAttributeToHref.classList.add('active');
    /* END LOOP: for each found author link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="'+ author + '"]');
  }
  function addClickListenersToAuthors(){
    /*find all links to authors*/
    const authorLinks = document.querySelectorAll(optArticleAuthorLinkSelector);

    /*START LOOP: for each link*/
    for(let authorLink of authorLinks){
      /* add tagClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
    }
  }
  addClickListenersToAuthors();

}
