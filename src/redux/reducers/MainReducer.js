import * as Immutable from 'seamless-immutable';

const initialState = Immutable.from({});

/**
 * MainReducer
 */
const MainReducer = (state = initialState, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default MainReducer;
