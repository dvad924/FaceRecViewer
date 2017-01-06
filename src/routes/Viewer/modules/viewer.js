export const SET_VIDEO_URL = 'SET_VIDEO_URL'
export const defaulturl = 'http://prometheus.availabs.org:8080/stream?topic=/camera/image_raw'
export function urlset(value = 'http://prometheus.availabs.org:8080/stream?topic=/camera/image_raw') {
    return {
        type  : SET_VIDEO_URL,
        payload : value
    }
}

const ACTION_HANDLERS = {
    [SET_VIDEO_URL] : (state, action) => action.payload
}

const initialState = 'http://prometheus.availabs.org:8080/stream?topic=/camera/image_raw'
export default function viewerReducer ( state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    console.info('in viewerjs',state,action)
 
    return handler ? handler(state, action) : state
}
