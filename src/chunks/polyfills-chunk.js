// The Promise polyfill is loaded in a sync manner since dynamic-import uses it, this is why it's loaded at the top.
// We don't want to override the native Promise in case the browser has one, this is why we use require here.
if (!window.Promise) {
  require('core-js/fn/promise');
}

const loadAllPolyfills = () => {
  const polyfills = [
    () => !window.Object.assign ? import(/* webpackChunkName: "core-js_object_assign" */ 'core-js/fn/object/assign') : null,
    () => !window.Object.values ? import(/* webpackChunkName: "core-js_object_values" */ 'core-js/fn/object/values') : null
  ];

  return Promise.all(polyfills.map((polyfill) => polyfill()));
};

export default loadAllPolyfills;
