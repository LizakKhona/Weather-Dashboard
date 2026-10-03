import { Component } from "react";
import { IoSearch } from "react-icons/io5";


import s from "../HeroSection/SearchInput.module.css";

export class SearchInput extends Component {
  state = {
    value: "",
  };

  handleInputChange = (event) => {
    this.setState({ value: event.currentTarget.value });    
  };
  
  handleBtnClick = () => {
    this.props.onChange(this.state.value)
    this.setState({value: ""})
  };

  
  
  

  render() {
    return (
      <label className={s.searchLabel}>
        <input
          onChange={this.handleInputChange}
          value={this.state.value}
          className={s.searchInput}
          type="text"
          name=""
          id=""
          placeholder="Search location..."
        />
        <button onClick={this.handleBtnClick} className={s.searchBtn}>
          <IoSearch className={s.searchIcon} />
        </button>
      </label>
    );
  }
}