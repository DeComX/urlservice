import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { withRouter } from "react-router";

import { getUrl } from './getUrl'

class ABCRedirect extends Component {
  constructor() {
    super();
    this.state = {
      longurl: "",
      error: "",
    }
  }

  componentDidMount() {
    const shortUrlId = this.props.match.params.id;
    getUrl(shortUrlId)
      .then(longurl => {
        window.location.assign(longurl);
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }

  render() {
    return (
      <div>
        {
          this.state.error ? (
            <h2>{this.state.error}</h2>
          ) : (
            <h2>Welcome to join ABC Blockchain Community, redirecting...</h2>
          )
        }
      </div>
    );
  }
}

export default withRouter(ABCRedirect);
