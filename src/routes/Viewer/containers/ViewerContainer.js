import { connect } from 'react-redux'
import { urlset } from '../modules/viewer'
import { rosConnect,
         rosDisconnect,
         requestRosTopics,
         selectTopic
} from '../modules/RosActions'

import VideoViewer from '../components/VideoViewer.js'
import RosViewer   from '../components/RosViewer.js'

const mapDispatchToProps = {
    urlset : (value) => urlset(value),
    rosConnect,
    rosDisconnect,
    requestRosTopics,
    selectTopic
}

const mapStateToProps = (state) => {
    console.log('viewercontainer',state)
    return ({
        url : state.viewer.url,
        status : state.viewer.ros_conn,
        topics : state.viewer.topics,
        selectedTopic : state.viewer.selectedTopic,
        msgs : state.viewer.msgs
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(RosViewer)
