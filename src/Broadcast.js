import React, { Component } from 'react';
import VideoBroadcaster from './VideoBroadcaster';
import VideoSubscriber from './VideoSubscriber';
import Chat from './Chat';

const Broadcast = ({ params }) => {
  return (
    <div>
      <div style={{width: '500px', float: 'left'}}>
        <h3>Broadcaster</h3>
        <VideoBroadcaster broadcastId={params.key} />
      </div>
      <div style={{width: '500px', float: 'right'}}>
        <h3>Subscriber</h3>
        <VideoSubscriber broadcastId={params.key} />
      </div>
    </div>
  )
};

export default Broadcast;
