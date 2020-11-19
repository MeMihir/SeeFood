import React from "react";
import "./uploadCard.scss";

const ImgUpload = ({ onChange, src }) => (
  <label htmlFor="photo-upload" className="custom-file-upload fas">
    <div className="img-wrap img-upload">
      <img crossOrigin="" alt="img" id="image" htmlFor="photo-upload" src={src} />
    </div>
    <input id="photo-upload" type="file" onChange={onChange} />
  </label>
);

const Url = ({ onChange, value }) => (
  <div className="field">
    <label htmlFor="url">Enter URL:</label>
    <input
      id="url"
      type="text"
      onChange={onChange}
      value={value}
      placeholder="www.test.com/testimg.jpg"
    />
  </div>
);

const Edit = ({ onSubmit, children }) => (
  <div className="profile">
    <form onSubmit={onSubmit}>
      <h1>Upload Food Image</h1>
      {children}

      <button type="submit" className="save">
        Identify{" "}
      </button>
    </form>
  </div>
);

const Profile = ({ onSubmit, src }) => (
  <div className="profile">
    <form onSubmit={onSubmit}>
      <h1>Food Details</h1>
      <label className="custom-file-upload fas">
        <div className="img-wrap">
          <img crossOrigin="" alt="img" id="image" htmlFor="photo-upload" src={src} />
        </div>
      </label>
      <button type="submit" className="edit">
        Change
      </button>
    </form>
  </div>
);

export default class CardProfile extends React.Component {
  state = {
    file: "",
    imagePreviewUrl: "./image.png",
    url: "",
    status: "",
    active: "edit",
  };

  photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  handleURLChange = (e) => {
    this.setState({
      imagePreviewUrl: e.target.value,
      url: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.active === "edit") {
      this.setState({
        active: "",
      });
      const img = document.getElementById("image");
      this.props.predict(img);
    } else {
      this.setState({
        active: "edit",
        imagePreviewUrl: "./image.png",
        url: "",
      });
      this.props.newImage();
    }
  };

  render() {
    const { imagePreviewUrl, active, url } = this.state;
    return (
      <div style={{ width: "80%" }}>
        {active === "edit" ? (
          <Edit onSubmit={this.handleSubmit}>
            <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl} />
            <Url onChange={this.handleURLChange} value={url} />
          </Edit>
        ) : (
          <Profile onSubmit={this.handleSubmit} src={imagePreviewUrl} />
        )}
      </div>
    );
  }
}
