import React from 'react'

const canvasBlend = (input, type, context, backContext, cWidth, cHeight, loop) => {
    if( loop && (input.paused || input.ended)) return false;

    backContext.drawImage(input,0,0,cWidth,cHeight);

    let idata = backContext.getImageData(0,0,cWidth,cHeight);
    let data = idata.data;

    if (type === "screen") {
      for(let i = 0; i < data.length; i+=4) {
          const r = data[i];
          const g = data[i+1];
          const b = data[i+2];
          const t = Math.max(r,g,b);
          data[i] = (r*255)/t;
          data[i+1] = (g*255)/t;
          data[i+2] = (b*255)/t;
          data[i+3] = t;
      }
    } else if (type === "multiply") {
      for(let i = 0; i < data.length; i+=4) {
          const r = data[i];
          const g = data[i+1];
          const b = data[i+2];
          const t = 255 - (Math.min(r,g,b));
          data[i] = 255 * (r - (255 - t)) / t;
          data[i+1] = 255 * (g - (255 - t)) / t;
          data[i+2] = 255 * (b - (255 - t)) / t;
          data[i+3] = t;
      }
    } else if (type === "screenBW") {
      for(let i = 0; i < data.length; i+=4) {
          const r = data[i];
          data[i] = 255;
          data[i+1] = 255;
          data[i+2] = 255;
          data[i+3] = r;
      }
    } else if (type === "multiplyBW") {
      for(let i = 0; i < data.length; i+=4) {
          const r = data[i];
          data[i] = 0;
          data[i+1] = 0;
          data[i+2] = 0;
          data[i+3] = 255-r;
      }
    }

    // idata.data = data;
    context.putImageData(idata,0,0);

    if (loop) {
      requestAnimationFrame(() => { 
        canvasBlend(input, type, context, backContext, cWidth, cHeight, loop); 
      })
    }
}

class CanvasBlend extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    if(!(this.props.children.type === "img" || this.props.children.type === "video")){
      throw "CanvasBlend only accepts a single image or video element as an input"
    }

    this.state = {loaded: false}

    this.canvasRef = React.createRef();
    this.inputRef = React.createRef();
    this.input = React.cloneElement(this.props.children, {
        ref: this.inputRef
      });

    this.back = document.createElement('canvas');
    this.backContext = this.back.getContext('2d');

    if (this.props.children.type === "img") {
      this.isVideo = false;
    } else {
      this.isVideo = true;
    }
  }

  handleLoaded = () => {
    if (this.isVideo) {
      this.contextWidth = this.inputRef.current.clientWidth;
      this.contextHeight = this.inputRef.current.clientHeight;
      this.inputRef.current.muted = true;
      this.inputRef.current.play();
    } else {
      this.contextWidth = this.inputRef.current.naturalWidth;
      this.contextHeight = this.inputRef.current.naturalHeight;
    }
    this.canvasRef.current.width = this.contextWidth;
    this.canvasRef.current.height = this.contextHeight;
    this.back.width = this.contextWidth;
    this.back.height = this.contextHeight;

    this.canvasBlend(false);

    this.setState({loaded: true});
  }

  canvasBlend = (loop = this.isVideo) => {
    canvasBlend(this.inputRef.current, this.props.use, this.canvasRef.current.getContext('2d'), this.backContext, this.contextWidth, this.contextHeight, loop)
  }

  componentDidMount() {
    if (this.isVideo) {
      this.inputRef.current.addEventListener('canplay', this.handleLoaded.bind(this));
      this.inputRef.current.addEventListener('play', this.canvasBlend.bind(this));
    } else {
      this.inputRef.current.addEventListener('load', this.handleLoaded.bind(this));
    }
  }

  render() {
    const { use, className, ...rest } = this.props;
    return(
      <React.Fragment>
        <canvas ref={this.canvasRef} className={"Asset--fade-in" + (this.state.loaded ? " isLoaded" : "") + (className ? ` ${className}` : "")} {...rest} />
        <div className="visuallyhidden">{this.input}</div>
      </React.Fragment>
    )
  }
}

export default CanvasBlend
