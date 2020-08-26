import React from "react";
import '../style/loader.css'

class ImageLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        isLoading: true
    };
  }

  handleImageLoaded() {
      console.log('loaded!')
    this.setState({ isLoading: false });
  }

  componentWillUnmount() {
      this.setState({ isLoading: true })
  }

  render() {
    return (
      <div>
        <div className="loader" style={{ display: this.state.isLoading ? "inherit" : "none" }}>Loading...</div>
        <img
            id={this.props.id}
            src={this.props.src}
            alt={this.props.alt}
            style={{ opacity: this.state.isLoading ? 0 : 1 }}
            onLoad={this.handleImageLoaded.bind(this)}
        />
      </div>
    );
  }
}
export default ImageLoader;