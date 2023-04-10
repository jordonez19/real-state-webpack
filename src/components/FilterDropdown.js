  import React, { useState } from "react";

  const FilterDropdown = (props) => {
    const { options, filterOptions, setFilterOptions } = props;

    function handleOptionChange(option) {
      setFilterOptions({
        ...filterOptions,
        [option]: !filterOptions[option],
      });
    }

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    function toggleDropdown() {
      setIsDropdownOpen(!isDropdownOpen);
    }

    return (
      <div className="dropdown">
        <div>
            <i
              className="dropdown-btn"
              onClick={toggleDropdown}
              style={{ color: "#00b7ef" , margin: '0 10px'}}
              class="fa-solid fa-filter"
            ></i>{" "}
        </div>

        {isDropdownOpen && (
          <div className="dropdown-content">
            {Object.keys(options).map((option, index) => (
              <div
                style={{
                  display: "flex",
                }}
              >
                <input
                  type="checkbox"
                  checked={filterOptions[option]}
                  onChange={() => handleOptionChange(option)}
                />
                <label key={index}>{options[option]}</label>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  export default FilterDropdown;




  