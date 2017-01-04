import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
import VideoViewer from 'components/utils/VideoViewer'
import RosViewer from 'components/utils/RosViewer'
export const HomeView = () => (
  <div className='container text-center'>
    <h4>Welcome!</h4>
    <img
        alt='This is a duck, because Redux!'
        className='duck'
        src={DuckImage} />
    <VideoViewer />
    <RosViewer />
  </div>
)

export default HomeView
