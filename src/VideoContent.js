import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import YouTube from 'react-youtube';

export default class VideoContent extends React.Component {
    constructor(props) {
        var {link, ...other} = props;
        var videoId = props.link.includes('?v=') ? 
                  props.link.split('?v=')[1].slice(0, 11)           : 
                  props.link.substr(props.link.lastIndexOf('/') + 1)
        var withId = {
            videoId,
            ...other
        };
        super(withId);
    }

    render() {
        return (
            <Card>
                <CardHeader
                    title="URL Avatar"
                    subtitle="Subtitle"
                    />
                <CardMedia>
                    <YouTube {...this.props}/>
                </CardMedia>
                <CardActions>
                    <FlatButton label="Action1" />
                    <FlatButton label="Action2" />
                </CardActions>
            </Card>
        )
    }
}