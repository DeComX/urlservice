import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { withRouter } from "react-router";
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { getUrl } from './getUrl';

class ABCRedirect extends Component {
  constructor() {
    super();
    this.state = {
      longurl: "",
      error: "",
      loading: true,
      seconds: 3
    }
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({seconds: seconds});
    if (seconds == 0) {
      clearInterval(this.timer);
      window.location.assign("https://talk.abcer.world/");
    }
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  componentDidMount() {
    this.setState({loading: true});
    const shortUrlId = this.props.match.params.id;
    getUrl(shortUrlId)
      .then(longurl => {
        window.location.assign(longurl);
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err.message
        });
        this.startTimer();
      });
  }

  render() {
    return (
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: 800
      }}>
        <div align='center' style={{
          alignSelf: 'center'
        }}>
          <img src="/logo.png" style={{
            maxWidth: 150,
            maxHight: 150,
          }} />
          <Typography variant="h6" style={{
            marginTop: 10,
            marginBottom: 30
          }}>
            ABC Blockchain Community
          </Typography>
          <LinearProgress hidden={!this.state.loading} style={{
            maxWidth: 200
          }}/>
          <Typography variant="subtitle1" color='secondary' style={{
            marginTop: 10
          }}>
            {this.state.error}
          </Typography>
          <Typography variant="subtitle1" color='secondary' style={{
            marginTop: 10
          }}>
            {this.state.seconds}
          </Typography>
          <Typography variant="subtitle1" style={{
            marginTop: 10
          }}>
            {this.state.error ? "Redirecting to ABC Forum..."
                              : "Redirecting..."}
          </Typography>
        </div>
      </div>
    );
  }
}

export default withRouter(ABCRedirect);
