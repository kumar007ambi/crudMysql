import React, { Component } from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import NumberFormat from "react-number-format";
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react";
// import Slider from "react-input-slider";
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";
import ReactPaginate from "react-paginate";
import moment from 'moment';


class CrudTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      keyword: "",
      currentPage: 1,
      postPerPage: 4,
      value1:{
        min: 0,
        max: 10000,
      },
      currentValue: 5,

    };
    this.remove = this.remove.bind(this);
    this.search = this.search.bind(this);
    this.sortByPriceAsc = this.sortByPriceAsc.bind(this);
    this.sortByPriceDesc = this.sortByPriceDesc.bind(this);
    // this.sortByDateNew=this.sortByDateNew(this);
  }

  componentDidMount() {
    this.allList();
  }

  filterList = (e) => {
    this.setState({ keyword: e.target.value });
  };
  //go to get id
  goToEdit(id) {
    console.log(this.props);
    this.props.history.push(`/edit/${id}`);
  }

  //go to add new
  goToNew() {
    console.log(this.props);
    this.props.history.push(`/addNew`);
  }

  //All Table
  allList = () => {
    axios
      .get(`http://localhost:4000/api`)
      .then((res) => {
        // console.log(res)
        this.setState({
          lists: res.data,
        });
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
      });
  };

  //delete
  async remove(id) {
    if (window.confirm("Sure want to delete?")) {
      fetch(`http://localhost:4000/api/delete/${id}`, {
        method: "DELETE",
      }).then(() => {
        let updateNew = [...this.state.lists].filter((i) => i.id !== id);
        this.setState({ lists: updateNew });
      });
    }
  }

  //search
  async search(keyword) {
    fetch(`http://localhost:4000/api/search/${keyword}`, {
      method: "GET",
    }).then(() => {
      let updateList = [...this.state.lists];
      // console.log("seacrh", updateList);
      this.setState({ lists: updateList });
    });
  }
  //price sort in Asc order
  sortByPriceAsc() {
    console.log("I am low clicked");
    let sortedProductsAsc;
    sortedProductsAsc = this.state.lists.sort((a, b) => {
      return parseInt(a.price) - parseInt(b.price);
    });
    this.setState({ lists: sortedProductsAsc });
  }
//price sort in Desc order
  sortByPriceDesc() {
    console.log("I am high clicked");
    let sortedProductsDsc;
    sortedProductsDsc = this.state.lists.sort((a, b) => {
      return parseInt(b.price) - parseInt(a.price);
    });
    this.setState({ lists: sortedProductsDsc });
  }
//Date sort in Asc order
sortByDateNew=()=> {
  console.log("I am Newest clicked");
  let sortedDateNew;
  sortedDateNew = this.state.lists.sort((a, b) => {
    return b.created_date.localeCompare(a.created_date);
  });
  this.setState({ lists: sortedDateNew });
}
//Date sort in Desc order
sortByDateOld=()=> {
  console.log("I am Oldest clicked");
  let sortedDateOld;
  sortedDateOld = this.state.lists.sort((a, b) => {
    return a.created_date.localeCompare(b.created_date);
  });
  this.setState({ lists: sortedDateOld });
}




  //pagination handleclick
  handlePageClick = (e) => {
    let selectedPage = e.selected;
    console.log("handleclick", selectedPage);
    this.setState({
      currentPage: selectedPage + 1,
    });
  };

  //slider
  // valueChange = (value) => {
  //   let { x, y } = value;
  //   this.setState({ currentValue: x}, () => {
  //     console.log("...price", this.state.currentValue);
  //     //call main api
  //     axios.get(`http://localhost:4000/api/slider/${x}`).then((res) => {
  //       console.log(res.data.data)
  //       this.setState({ lists: res.data.data });
  //     });
  //   });
  // };

  valueChange = (value) => {
    let value1=value;
    console.log(".........new val",value1)
    this.setState({ value1: value},() => {
      console.log("...price", this.state.value1);
      let min=value1.min;
      let max=value1.max;
      //call main api
      axios.get(`http://localhost:4000/api/slider?min=${min}&max=${max}`).then((res) => {
        console.log(res.data.data)
        this.setState({ lists: res.data.data });
      });
    });
  };

  render() {
    const { lists, keyword, currentPage, postPerPage } = this.state;
    //pages
    const indexOfLast = currentPage * postPerPage;
    const indexOfFirst = indexOfLast - postPerPage;
    const currentPost = lists.slice(indexOfFirst, indexOfLast);
    const pageCount = Math.ceil(lists.length / postPerPage);
    
  

    let filterList = currentPost
      .filter((val) => {
        if (keyword === "") {
          return val;
        } else if (val.title.toLowerCase().includes(keyword.toLowerCase())) {
          return val;
        } else if (
          val.description.toLowerCase().includes(keyword.toLowerCase())
        ) {
          return val;
        }
      })
      .map((items, i) => {
        return (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{items.title}</td>
            <td>{items.description}</td>
            <td>
              <NumberFormat
                value={items.price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </td>
            {/* <td>{items.image}</td> */}
            <td><img src={`http://localhost:4000/images/uploads/${items.image}`} style={{height:'100px',width:'100px',display:"flex"}} alt="Oops"/></td>
            <td>{moment(items.created_date).format("llll")}</td>
            <td>{moment(items.updated_date).format("llll")}</td>
            <td>
              <ButtonGroup>
                {/*   <Link to={`/edit/${items.id}` } ><Button size="sm">Edit</Button></Link> */}
                <Button size="sm"  style={{ margin: "10px" }} onClick={() => this.goToEdit(items.id)}>
                  Edit
                </Button>
                <Button size="sm"  style={{ margin: "10px" }} onClick={() => this.remove(items.id)}>
                  Delete
                </Button>
              </ButtonGroup>
            </td>
          </tr>
        );
      });

    return (
      <React.Fragment>
        <div className="float-left">
          <Button size="md" onClick={() => this.goToNew()}>
            Add New
          </Button>
          <input
            style={{ margin: "20px" }}
            type="text"
            placeholder="Search"
            name="searchname"
            onChange={this.filterList}
          />
          <CDropdown   style={{ margin: "20px" }}>
            <CDropdownToggle color="secondary">Sort by Price</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem onClick={this.sortByPriceDesc}>
                Price: High to Low
              </CDropdownItem>
              <CDropdownItem onClick={this.sortByPriceAsc}>
                Price: Low to High
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          {/* date */}
          <CDropdown   style={{ margin: "20px" }}>
            <CDropdownToggle color="secondary">Sort Date</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem onClick={this.sortByDateNew}>
                Newest
              </CDropdownItem>
              <CDropdownItem onClick={this.sortByDateOld}>
              Oldest
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          
          {/* <p>${this.state.currentValue}</p> */}
          {/* <Slider
            axis="x"
            xstep={5}
            xmin={100}
            xmax={10000}
            x={this.state.currentValue}
            onChange={(prop) => this.valueChange(prop)}
          /> */}
          <div style={{width:"300px" ,margin:"10px"}}>
          <InputRange
          draggableTrack={true}
          maxValue={10000}
          step={10}
          minValue={0}
          formatLabel={currentValue => `${currentValue} Price`}
          value={this.state.value1}
          onChange={(prop) => this.valueChange(prop)}
            />
            </div>
        </div>
        {/* Table Head */}
        <h1 style={{ textAlign: "center" }}>Table</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Images</th>
              <th>Creation Date</th>
              <th>Updated Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/*  {renderData} */}
            {filterList}
          </tbody>
        </Table>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </React.Fragment>
    );
  }
}

export default CrudTable;
