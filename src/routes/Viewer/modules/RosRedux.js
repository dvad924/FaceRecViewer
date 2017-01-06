/* Heavily inspired by https://github.com/YannickDot/redux-websocket-example/blob/master/app/src/js/app.js */
import { CONNECT_TO_ROS, DISCONN_FROM_ROS,
         SEND_ROS_MSG, RECV_ROS_MSG, REQUEST_ROS_TOPICS, SELECT_TOPIC }
from './RosActions'
import * as RosActions from './RosActions'
import RosWS from './RosWrapper'
import {TOPIC, MSG} from './RosWrapper'

var Socket = (store) => {
    var RosSock= {
        ws : null,
        URL: 'ws://prometheus.availabs.org:9090',
        wsDispatcher : (RMSG) => {
            switch (RMSG.type){
                case MSG:
                    store.dispatch(RosActions.recvRosMsg(RMSG.msg))
                case TOPIC:
                    store.dispatch(RosActions.recvRosTopic(RMSG.msg))
                default:
                    return
            }
             store.dispatch(RosActions.recvRosMsg(msg))
        },
        wsListener: (action) => {


            switch (action.type) {
                case CONNECT_TO_ROS:
                    return RosSock.startRos(action.url)
                case DISCONN_FROM_ROS:
                    return RosSock.stopRos()
                case REQUEST_ROS_TOPICS:
                    return RosSock.getTopics()
                case SELECT_TOPIC:
                    return RosSock.subscribeTopic(action.payload)
                default:
                    return
            }
        },
        subscribeTopic : (topicinfo) => {
            if ( !!RosSock.ws ) {
                RosSock.ws.subscribe(topicinfo)
            }
        },
        getTopics : () => {
            if ( !!RosSock.ws) {
                RosSock.ws.getAllTopics()
            }
        },
        stopRos : () => {
            if ( !!RosSock.ws ) {
                RosSock.ws.close()
                RosSock.ws = null
            }
        },
        startRos : (url) => {
            if(!!RosSock.ws) RosSock.ws.close()

            RosSock.ws = new RosWS(url || RosSock.URL, RosSock.wsDispatcher)
        }
    }
    return RosSock
}
export default Socket
