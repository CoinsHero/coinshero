import config from 'config';
import { createLogger } from 'redux-logger';

export default createLogger({

  /**
   * This function will be called before each action is processed with this middleware
   * Returns true if action should be logged, false otherwise.
   */
  predicate() {
    return config.FEATURE_FLAGS.DEBUGGABLE;
  }
});
