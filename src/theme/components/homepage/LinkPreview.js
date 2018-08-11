/* author: Ribhararnus Pracutiar */

import React, { Component } from 'react';
import * as URL from 'url';


class LinkPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  hasMeta() {
    if (typeof this.props.meta === 'undefined') return false;
    if (Object.keys(this.props.meta).length > 0) return true

    return false;
  }

  render() {
    const { meta, loader, isLoading } = this.props;

    if (isLoading) return loader;
    if (!this.hasMeta()) return <div />;
    
    const { image, title, description, url } = meta;
    const { hostname } = URL.parse(url);
    const refinedHostname = hostname.replace(/^www\./, '').toUpperCase();

    return (
      <div className="link-preview">
        <img src={image} />
        <h3 className="title">{title}</h3>
        <div className="description">{description}</div>
        <div>{ refinedHostname }</div>
      </div>
    );
  }
}

export default LinkPreview;
