import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

class EditTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      price: "",
      image:''
    };
  }

  componentDidMount = async () => {
    axios
      .get(`http://localhost:4000/api/edit/${this.props.match.params.id}`)
      .then(async (res) => {
        console.log(this.props.match.params.id);
        console.log("responce data", res.data.data);
        let data = res.data.data[0];
        await this.setState({
          title: data.title,
          description: data.description,
          price: data.price,
          image:data.image
        });
        console.log(this.state.title, this.state.description, this.state.price,this.state.image);
      })

      .catch((error) => {
        console.log(error);
      });
  };

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
    if(this.state.file){
      formData.append("title",this.state.title);
      formData.append("description",this.state.description);
      formData.append("price",this.state.price);
      formData.append("image",this.state.file);
      console.log("file select",this.state.file)
    
    }else{
      formData.append("title",this.state.title);
      formData.append("description",this.state.description);
      formData.append("price",this.state.price);
      formData.append("image",this.state.image);
      console.log("imageeee is  selected",this.state.image)
    }
   /*  const formData=new FormData();
    formData.append("title",this.state.title);
    formData.append("description",this.state.description);
    formData.append("price",this.state.price);
    formData.append("image",this.state.file); */
    axios
      .put(`http://localhost:4000/api/update/${this.props.match.params.id}`,formData )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>Edit Record</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={this.state.title}
              onChange={this.handletTitleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              name="description"
              className="form-control"
              value={this.state.description}
              onChange={this.handleDescriptionChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="text"
              name="price"
              className="form-control"
              value={this.state.price}
              onChange={this.handlePriceChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image</label>
           <img src={`http://localhost:4000/images/uploads/${this.state.image}`} style={{height:'100px',width:'100px'}} alt="oops"/>
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

export default EditTab;
