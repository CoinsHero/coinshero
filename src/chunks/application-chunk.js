import loadAllPolyfills from './polyfills-chunk';

const loadApplication = () => {
  import(/* webpackChunkName: "main_chunk" */ './main-chunk')
  .then(runMain => runMain.default())
  .catch((e) => {
    // TODO: How should we handle it?
    console.log('We should take care of this error in running the application..');
    console.log('Error: ', e);
  });
};

loadAllPolyfills()
  .then(loadApplication)
  .catch((e) => {
    // TODO: How should we handle it?
    console.log('We should take care of this error in polyfills..');
    console.log('Error: ', e);
    loadApplication();
  });
