import React from "react";
import './card.scss'

const ImgUpload =({
  onChange,
  src
})=>
  <label htmlFor="photo-upload" className="custom-file-upload fas">
    <div className="img-wrap img-upload" >
      <img for="photo-upload" src={src}/>
    </div>
    <input id="photo-upload" type="file" onChange={onChange}/> 
  </label>

const Edit =({
  onSubmit,
  children,
})=>
  <div className="profile">
    <form onSubmit={onSubmit}>
      <h1>Upload Food Image</h1>
        {children}
      <button type="submit" className="save">Identify </button>
    </form>
  </div>

const Profile =({
  onSubmit,
  src,
})=>
  <div className="profile">
    <form onSubmit={onSubmit}>
      <h1>Food Details</h1>
      <label className="custom-file-upload fas">
        <div className="img-wrap" >
          <img for="photo-upload" src={src}/>
        </div>
      </label>
      <button type="submit" className="edit">Change</button>
    </form>
  </div>

export default class CardProfile extends React.Component {
  state = {
    file: '',
    imagePreviewUrl: './image.png',
    name:'',
    status:'',
    active: 'edit'
  }

  photoUpload = e =>{
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file);
  }

  handleSubmit= e =>{
    e.preventDefault();
    let activeP = this.state.active === 'edit' ? 'profile' : 'edit';
    this.setState({
      active: activeP,
    })
  }
  
  render() {
    const {imagePreviewUrl, active} = this.state;
    return (
      <div style={{width:'80%'}}>
        {(active === 'edit')?(
          <Edit onSubmit={this.handleSubmit}>
            <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl}/>
          </Edit>
        ):(
          <Profile 
            onSubmit={this.handleSubmit} 
            src={imagePreviewUrl}/>
        )}
      </div>
    )
  }
}
