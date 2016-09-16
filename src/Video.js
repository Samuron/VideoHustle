import React, { Component } from 'react';
import VideoBroadcaster from './VideoBroadcaster';
import VideoSubscriber from './VideoSubscriber';
import Chat from './Chat';

const Video = ({ params }) => {
  return (
    <div>
      <div style={{width: '500px', float: 'left'}}>
        <h3>Broadcaster</h3>
        <VideoBroadcaster videoKey={params.key} />
      </div>
      <div style={{width: '500px', float: 'right'}}>
        <h3>Subscriber</h3>
        <VideoSubscriber videoKey={params.key} />
      </div>
      <br style={{clear: 'both'}} />
      <Chat videoKey={params.key} />
    </div>
  )
};

export default Video;
