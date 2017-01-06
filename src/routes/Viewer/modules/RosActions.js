import {SET_VIDEO_URL, defaulturl, urlset} from './viewer'
import RosSocket from './RosRedux'
const MAXLEN = 1e4


let Socket = null
export const CONNECT_TO_ROS   = 'CONNECT_TO_ROS'
export function rosConnect(url = 'ws://prometheus.availabs.org:9090'){
    return {
        type : CONNECT_TO_ROS,
    }
}
export const DISCONN_FROM_ROS = 'DISCONN_FROM_ROS'
export function rosDisconnect(msg='') {
    return {
        type : DISCONN_FROM_ROS,
    }
}
export const SEND_ROS_MSG     = 'SEND_ROS_MSG'
export function sendRosMsg(msg={}) {
    return {
        type : SEND_ROS_MSG,
        payload : msg
    }
}
export const RECV_ROS_MSG      = 'RECV_ROS_MSG'
export function recvRosMsg(msg={}) {
    return {
        type : RECV_ROS_MSG,
        payload : msg
    }
}

export const REQUEST_ROS_TOPICS = 'REQUEST_ROS_TOPICS'
export function requestRosTopics() {
    return {
        type : REQUEST_ROS_TOPICS,
    }
}

export const RECV_ROS_TOPIC = 'RECV_ROS_TOPIC'
export function recvRosTopic(topic) {
    return {
        type : RECV_ROS_TOPIC,
        payload : topic
    }
}

export const SELECT_TOPIC = 'SELECT_TOPIC'
export function selectTopic(selection) {
    console.log(selection)
    return {
        type : SELECT_TOPIC,
        payload : selection
    }
}

const ACTION_HANDLERS = {
    [ SELECT_TOPIC ] : (state, action) => {
        Socket.wsListener( action )
        let nstate = Object.assign( {}, state)
        nstate.selectedTopic = action.payload.value
        return nstate
    },
    
    [ CONNECT_TO_ROS ] : ( state, action ) => {
        Socket.wsListener( action )
        let nstate = Object.assign( {}, state )
        nstate.ros_conn = true
        return nstate
    },
    
    [ DISCONN_FROM_ROS ] : ( state, action ) => {
        Socket.wsListener( action )
        let nstate = Object.assign( {}, state )
        nstate.ros_conn = false
        return nstate
    },
    
    [ REQUEST_ROS_TOPICS ] : ( state, action ) =>{
        Socket.wsListener( action )
        let nstate = Object.assign( {}, state )
        return nstate
    },
    
    [ RECV_ROS_TOPIC ]  : ( state, action ) => {
        let nstate = Object.assign( {}, state )
        if ( action.payload ) {
            console.log( action.payload )
            let topic = Object.keys( action.payload )[ 0 ]
            let type = action.payload[ topic ]
            nstate.topics = Object.assign( {}, nstate.topics )
            nstate.topics[ topic ] = type
        }
        return nstate
    },
    
    [ SEND_ROS_MSG ] : (state, action) => Object.assign( {}, state ),
    
    [ RECV_ROS_MSG ] : (state, action) => {
        let nstate = Object.assign( {}, state )
        Object.keys(action.payload).forEach( ( tname ) => {
            nstate.msgs[ tname ] = nstate.msgs[ tname ] || []
            if(nstate.msgs[ tname ].length >=  MAXLEN){
                nstate.msgs[ tname ].shift()
            }
            nstate.msgs[ tname ].push( action.payload[ tname ] )
        })
        return nstate
    },
    
    [ SET_VIDEO_URL ]: ( state, action ) => {
        let nstate = Object.assign( {}, state )
        nstate.url = action.payload
        return nstate
    }
}

const initialState = {ros_conn:false,send_msg:null,msgs:{},url:defaulturl,topics:{},selectedTopic:''}

export default function rosReducer(store){
    Socket = RosSocket(store)
    return ( state = initialState, action ) => {
        const handler = ACTION_HANDLERS[action.type]

        return handler ? handler(state, action) : state
    }
}
