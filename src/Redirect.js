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
          <Typography variant="subtitle1" style={{
            marginTop: 10
          }}>
            {this.state.error ? this.state.error : "Redirecting..."}
          </Typography>
        </div>
      </div>
    );
  }
}

export default withRouter(ABCRedirect);
