//import MJPEGCANVAS from './mjpegcanvas'
import React from 'react'

class VideoViewer extends React.Component {
        
        constructor ( props ) {
                super ( props )
        }
        render () {
                console.log( this.props )
                return (
                        <img src={this.props.url} alt={'loading'} />        
                )
        }
}
VideoViewer.defaultProps = { url:"http://prometheus.availabs.org:8080/stream?topic=/TheFaces/annotated" }
export default VideoViewer
