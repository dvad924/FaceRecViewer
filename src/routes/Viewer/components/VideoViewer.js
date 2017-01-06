//import MJPEGCANVAS from './mjpegcanvas'
import React from 'react'


export const VideoViewer = (props) => (
    <div className='container'>
        <div style={{ margin: '0 auto'}} >
            <img width={props.width} height={props.height} src={props.url} alt={"Waiting on Resource"} />
        </div>
    </div>
)

VideoViewer.propTypes = {
    url: React.PropTypes.string.isRequired
}

export default VideoViewer
