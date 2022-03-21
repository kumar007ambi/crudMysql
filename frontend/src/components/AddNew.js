import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

class AddNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      price: "",
    };
  }

  /* componentDidMount(){
  console.log(this.props)
  this.props.history.push(`/`)
}
 */

  handletTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };
  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };
  handlePriceChange = (event) => {
    this.setState({ price: event.target.value });
  };
  handleImage = (event) => {
    this.setState({ file: event.target.files[0] });
  };


  handleSubmit = (event) => {
    event.preventDefault();
    
    const formData=new FormData();

    formData.append("title",this.state.title);
    formData.append("description",this.state.description);
    formData.append("price",this.state.price);
    formData.append("image",this.state.file);

    axios
      .post("http://localhost:4000/api/new", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>Add New Record</h1>
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Title"
              onChange={this.handletTitleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Description"
              onChange={this.handleDescriptionChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Price"
              onChange={this.handlePriceChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Upload Images</label>
            <input
              type="file"
              className="form-control"
              filename="image"
              accept="image/*"
              multiple={false} 
              onChange={this.handleImage}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <Link to="/">
          <Button style={{ float: "right", marginTop: "-38px" }}>
            Back to Main Page
          </Button>
        </Link>
      </>
    );
  }
}

export default AddNew;
