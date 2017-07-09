import T from 'i18n-react';
import config from 'config';

let didSEORun = false;

const runSEO = () => {
  if (!didSEORun) {
    // Add canonical link so all languages will prefer the main domain language
    // https://support.google.com/webmasters/answer/139066?visit_id=1-636351984810892674-3279683908&rd=1
    const link = document.createElement('link');
    link.link = 'canonical';
    link.href = config.ORIGINS.COINS_HERO;
    document.head.appendChild(link);

    // Title
    const title = document.createElement('title');
    // eslint-disable-next-line no-unsafe-innerhtml/no-unsafe-innerhtml
    title.innerHTML = T.translate('SITE_TITLE');
    document.head.appendChild(title);

    // Meta tags - for users
    const description = document.createElement('meta');
    description.name = 'description';
    description.content = T.translate('SITE_DESCRIPTION');
    document.head.appendChild(description);

    // Meta tags - for Open Graph of Facebook
    const ogTitle = document.createElement('meta');
    ogTitle.property = 'og:title';
    ogTitle.content = title.innerHTML;
    document.head.appendChild(ogTitle);

    const ogSiteName = document.createElement('meta');
    ogSiteName.property = 'og:site_name';
    ogSiteName.content = title.innerHTML;
    document.head.appendChild(ogSiteName);

    const ogType = document.createElement('meta');
    ogType.property = 'og:type';
    ogType.content = 'website';
    document.head.appendChild(ogType);

    // TODO: This needs to be a link to the specific URL of the current language
    const ogURL = document.createElement('meta');
    ogURL.property = 'og:url';
    ogURL.content = config.ORIGINS.COINS_HERO;
    document.head.appendChild(ogURL);

    const ogDescription = document.createElement('meta');
    ogDescription.property = 'og:description';
    ogDescription.content = description.content;
    document.head.appendChild(ogDescription);

    // TODO: This needs to be the locale we'll use for the current page
    const ogLocale = document.createElement('meta');
    ogLocale.property = 'og:locale';
    // ogLocale.content = ;
    document.head.appendChild(ogLocale);

    // TODO: Add a link to the image to be shown here - with HTTP
    const ogImage = document.createElement('meta');
    ogImage.property = 'og:image';
    // ogImage.content = ;
    document.head.appendChild(ogImage);

    // TODO: Add a link to the image to be shown here - with HTTPS
    const ogImageSecureUrl = document.createElement('meta');
    ogImageSecureUrl.property = 'og:image:secure_url';
    // ogImageSecureUrl.content = ;
    document.head.appendChild(ogImageSecureUrl);

    // TODO: Add the mimetype of the image
    const ogImageMimeType = document.createElement('meta');
    ogImageMimeType.property = 'og:image:type';
    // ogImageMimeType.content = ;
    document.head.appendChild(ogImageMimeType);

    const ogImageWidth = document.createElement('meta');
    ogImageWidth.property = 'og:image:width';
    ogImageWidth.content = 200;
    document.head.appendChild(ogImageWidth);

    const ogImageHeight = document.createElement('meta');
    ogImageHeight.property = 'og:image:height';
    ogImageHeight.content = 200;
    document.head.appendChild(ogImageHeight);

    didSEORun = true;
  }
};

export default runSEO;
