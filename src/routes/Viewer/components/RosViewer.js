import React from 'react'
import VideoViewer from './VideoViewer'
import Select from 'react-select'
import ConfidenceGraph from './ConfidenceGraph'
export const RosViewer = (props) => {
    console.log('RosViewer',props);
    let topics = Object.keys(props.topics).map((t) => ({
        label:t,
        value:t,
        type:props.topics[t]
        }))
    console.log(topics)
    return (
    <div className='container'>
        <div className='row' style={{margin: '0 auto' }} >
            <p>Under Construction</p>
            <div className='col-md-6'>
                <VideoViewer
                    width='100%'
                    height='100%'
                    url={props.url} />
            </div>
            
            <div className='col-md-6'>
                <div className='row'>
                    <button className='btn btn-default' onClick={props.rosConnect}>
                        Connect
                    </button>
                    <button className='btn btn-default' onClick={props.rosDisconnect}>
                        Disconnect
                    </button>
                    <button  className='btn btn-default' onClick={props.requestRosTopics} disabled={!props.status} >
                        Get Topics
                    </button>
                </div>
                <Select
                    name="Ros Topics"
                    options={topics}
                    value={props.selectedTopic}
                    onChange={props.selectTopic} />
                <ConfidenceGraph />
            </div>
            
        </div>
    </div>
    )
}

export default RosViewer
