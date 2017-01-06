import { injectReducer } from 'store/reducers'

export default (store) => ({
  path : 'viewer',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Viewer = require('./containers/ViewerContainer').default
      let reducer = require('./modules/RosActions').default
      reducer = reducer(store)
      /*  Add the reducer to the store on key 'viewer and ros_bboxes'  */
      injectReducer(store, { key: 'viewer', reducer })


      
      /*  Return getComponent   */
      cb(null, Viewer)

    /* Webpack named bundle   */
    }, 'counter')
  }
})
