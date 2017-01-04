import React from 'react'
var ros = new ROSLIB.Ros({
    url : 'ws://prometheus.availabs.org:9090'
})

ros.on('connection', () => console.log('Connected to ros websocket server.'))
ros.on('error', () => console.log('Error connecting to ros websocket server.'))
ros.on('close', () => console.log( 'Connection to ros server closed.'))

class RosViewer extends React.Component {
        
    constructor ( props ) {
        super ( props )
    }
    render () {
        
        return (
            <p>Being Implemented</p>
        )
    }
}
export default RosViewer
