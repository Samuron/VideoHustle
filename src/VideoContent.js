import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import YouTube from 'react-youtube';

export default class VideoContent extends Component {
    render() {
        
        const { link, opts, onReady, onStateChange } = this.props;
        const videoId = link.includes('?v=')
          ? link.split('?v=')[1].slice(0, 11)
          : this.props.link.substr(this.props.link.lastIndexOf('/') + 1);
       
        return (
            <Card>
                <CardHeader
                    title="URL Avatar"
                    subtitle="Subtitle"
                    />
                <CardMedia>
                    <YouTube
                      videoId={videoId}
                      opts={opts}
                      onReady={onReady}
                      onStateChange={onStateChange}
                    />
                </CardMedia>
                <CardActions>
                    <FlatButton label="Action1" />
                    <FlatButton label="Action2" />
                </CardActions>
            </Card>
        )
    }
}
