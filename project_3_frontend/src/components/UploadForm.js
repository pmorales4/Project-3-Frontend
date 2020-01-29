import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import axios from 'axios'
import "../App.css";

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      file: null,
      genres: []
    };
  }

//   submitActions = (e) => {
//       this.onFormSubmit(e)
//       this.props.onHide
//   }
  //this submits the form to the database as a post request
  onFormSubmit = (e) => {
      e.preventDefault()
      let photo = this.state.file
      let formData = new FormData()

      formData.append("title", this.state.title)
      formData.append("genre", this.state.genres)
      formData.append("path", photo)

      
      // const obj = {
      //   headers: {
      //     "Content-Type": "multipart/form-data"
      //   },
      //   method: "POST",
      //   body: {
      //     title: this.state.title,
      //     genre: this.state.genres.slice(0),
      //     path: this.state.file
      //   }
      // }
      // console.log(obj)
      // const json = JSON.stringify(obj)
      // const blob = new Blob([json], {
      //       type: 'application/json'
      // })
      // console.log(Blob)
      // const formData = new FormData()
      // formData.append("document", obj)
      // console.log(formData)
      axios.post("http://localhost:8080/api/images", formData, {
          onUploadProgress: progressEvent => {
              console.log('upload progress: ' + (progressEvent.loaded / progressEvent.total * 100 + '%'))
          }
      })
        .then((res) => {
            // res.json(res)
            console.log(res)
        })
        .then(() => {
            this.setState({
                title: "",
                file: null,
                genres: []
            })
        })

    
  }


  //this adds the file to the state
  onChange = (e) => {
    console.log(e.target.files[0])
    this.setState({file: e.target.files[0]})
  }
  //this changes the state title as the user types it out
  handleChange = (e) => {
    this.setState({title: e.target.value})
  }

  addTags = (e) => {
    let array = this.state.genres.slice(0)
    let tag = e.target.id
    !array.includes(tag) ? array.push(tag) : array = array.filter(e => e !==tag)
    this.setState({
        genres: array
    })
  }
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Share Photos
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="post" encType="multipart/form-data">
            {/* title for modal */}
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                value={this.state.title}
                id="title"
                onChange={this.handleChange}
                placeholder="Dancing Cat, Beautiful Mountain, Etc!"
              />
            </div>
            {/* Select a file */}
            <div className="form-group">
              <label htmlFor="fileUpload">Select file</label>
              <input
                type="file"
                name="photo"
                className="form-control-file"
                id="fileUpload"
                onChange={this.onChange}
              />
            </div>
            {/* Select genre tags */}
            <div className="form-group"></div>
            <h6>Tag some Genres!</h6>
            <div className="row">
              <div className="col">
                <div className="custom-control custom-checkbox">
                  <label className="container" htmlFor="sports">
                    Sports
                    <input type="checkbox" id="sports" onClick={this.addTags}/>
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <label className="container" htmlFor="nature">
                    Nature
                    <input type="checkbox" id="nature" onClick={this.addTags}/>
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <label className="container" htmlFor="beach">
                    Beach
                    <input type="checkbox" id="beach" onClick={this.addTags}/>
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <label className="container" htmlFor="relationships">
                    Relationships
                    <input type="checkbox" id="relationships" onClick={this.addTags}/>
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <label className="container" htmlFor="love">
                    Love
                    <input type="checkbox" id="love" onClick={this.addTags}/>
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="custom-control custom-checkbox">
                  <label className="container" htmlFor="action">
                    Action
                    <input type="checkbox" id="action" onClick={this.addTags}/>
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <label className="container" htmlFor="travel">
                    Travel
                    <input type="checkbox" id="travel" onClick={this.addTags}/>
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <label className="container" htmlFor="art">
                    Art
                    <input type="checkbox" id="art" onClick={this.addTags}/>
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <label className="container" htmlFor="photography">
                    Photography
                    <input type="checkbox" id="photography" onClick={this.addTags}/>
                    <span className="checkmark"></span>
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <label className="container" htmlFor="funny">
                    Funny
                    <input type="checkbox" id="funny" onClick={this.addTags}/>
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={this.onFormSubmit}>Share</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default UploadForm;
