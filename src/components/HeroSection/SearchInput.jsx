import { Component } from "react";
import { IoSearch } from "react-icons/io5";

import s from "../HeroSection/SearchInput.module.css";

export class SearchInput extends Component { 
  state = {
    value: ""
  }

  handleInputChange = (event) => {
    this.setState({ value: event.currentTarget.value })    
  }

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
          <button className={s.searchBtn}>
            <IoSearch className={s.searchIcon} />
          </button>
        </label>
      );
   }
}