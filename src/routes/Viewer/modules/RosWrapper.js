//ROSLIB is in the global namespace
//Due to age it is imported in the header of the html

export const TOPIC = 'TOPIC'
export const MSG   = 'MSG'
export default class RosWS{
    constructor(url, dispatcher) {
        console.log(url)
        this.ros = new ROSLIB.Ros({
            url : url
        })
        this.dispatcher = dispatcher
        this.ros.on('connection', () => console.log('Connected to ' +  url + ' successfully'))
        this.ros.on('error', () => console.log('Error connecting to ros websocket server.'))
        this.ros.on('close', () => console.log('Connection to ros server closed.' ))
        this.subtopics = {}
    }
    
    unsubscribe( topic ) {
        this.subtopics[topic.value].unsubscribe()
        this.subtopics[topic.value] = null
    }
    
    subscribe( topic ) {
        this.subtopics[topic.value] = new ROSLIB.Topic({
            ros: this.ros,
            name : topic.value,
            messageType : topic.type
        })

        let callback = (msg) => this.dispatcher({
            type: MSG ,
            msg:{[topic.value]:msg}
        })
        this.subtopics[topic.value].subscribe(callback)
    }
    
    getAllTopics() {
        /* Call back for single topic request */
     let onTopicType = (name) => (type) => {
            this.dispatcher({
                type : TOPIC,
                msg:{[name]:type}
            })
        }
        /* Call back for the array of topics */
        let onTopics = (topicarray) => {
            topicarray.map(
                (name) => {
                    this.ros.getTopicType(name,onTopicType(name))
                }
            )
        }
        /* On reception of topics
        *  send of to get their types */
        this.ros.getTopics(onTopics)
    }
    
    close() {
        this.ros.close()
    }
}
