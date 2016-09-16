import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import YouTube from 'react-youtube';

export default class VideoContent extends React.Component {
    constructor(props) {
        console.log(props.link);
        var {link, ...other} = props;
        var videoId = props.link.includes('?v=') ? 
                  props.link.split('?v=')[1].slice(0, 11)           : 
                  props.link.substr(props.link.lastIndexOf('/') + 1)
                
        var withId = {
            videoId,
            ...other
        };
        console.log(withId);
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
                <CardTitle title="Card title" subtitle="Card subtitle" />
                <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa.Aliquam erat volutpat.Nulla facilisi.
                    Donec vulputate interdum sollicitudin.Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
                <CardActions>
                    <FlatButton label="Action1" />
                    <FlatButton label="Action2" />
                </CardActions>
            </Card>
        )
    }
}