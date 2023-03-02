import React, {Component} from 'react'
import ReactPlayer from 'react-player'
const VideoPlayer = (props) => {
  // const {video_url} = props ; 
  // return (
  //   <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
  // )

  const {links} = props ; 
  return (
    <ReactPlayer url= {links} width />
  )
}

export default VideoPlayer