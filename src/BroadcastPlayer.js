import React, { Component } from 'react';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import YouTube from 'react-youtube';
import Chat from './Chat';
import Toggle from 'material-ui/Toggle';

export default class BroadcastPlayer extends Component {
    render() {
        const { videoId, broadcastId, opts, onReady, onStateChange } = this.props;
        return (
            <Card>
                <CardHeader
                    title="URL Avatar"
                    subtitle="Subtitle"
                    actAsExpander={true}
                    showExpandableButton={true}
                    />
                <CardMedia>
                    <YouTube
                        videoId={videoId}
                        opts={opts}
                        onReady={onReady}
                        onStateChange={onStateChange}
                        />
                </CardMedia>
                <Chat videoKey={broadcastId}/>
            </Card>
        )
    }
}
