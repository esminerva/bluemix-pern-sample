import React, { Component } from 'react';
import 'bulma/css/bulma.css'

class Footer extends Component {

  render() {
    return (
        <footer className="footer">
  <div className="container">
    <div className="content has-text-centered">
      <p>
        <strong>PERN example</strong> by <a href="https://github.com/joyychang">Joy Chang</a>.
        The source code is licensed
         <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>.
      </p>
      <p>
        <a className="icon" href="https://github.com/joyychang/bluemix-pern-sample">
          <i className="fa fa-github"></i>
        </a>
      </p>
    </div>
  </div>
</footer>
    )
  }
}

export default Footer;