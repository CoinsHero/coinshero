let didSEORun = false;

const runSEO = () => {
  if (!didSEORun) {
    // Add canonical link so all languages will prefer the main domain language
    // https://support.google.com/webmasters/answer/139066?visit_id=1-636351984810892674-3279683908&rd=1

    // // TODO: Add a link to the image to be shown here - with HTTP
    // const ogImage = document.createElement('meta');
    // ogImage.property = 'og:image';
    // // ogImage.content = ;
    // document.head.appendChild(ogImage);
    //
    // // TODO: Add a link to the image to be shown here - with HTTPS
    // const ogImageSecureUrl = document.createElement('meta');
    // ogImageSecureUrl.property = 'og:image:secure_url';
    // // ogImageSecureUrl.content = ;
    // document.head.appendChild(ogImageSecureUrl);
    //
    // // TODO: Add the mimetype of the image
    // const ogImageMimeType = document.createElement('meta');
    // ogImageMimeType.property = 'og:image:type';
    // // ogImageMimeType.content = ;
    // document.head.appendChild(ogImageMimeType);
    //
    // const ogImageWidth = document.createElement('meta');
    // ogImageWidth.property = 'og:image:width';
    // ogImageWidth.content = 200;
    // document.head.appendChild(ogImageWidth);
    //
    // const ogImageHeight = document.createElement('meta');
    // ogImageHeight.property = 'og:image:height';
    // ogImageHeight.content = 200;
    // document.head.appendChild(ogImageHeight);

    didSEORun = true;
  }
};

export default runSEO;
