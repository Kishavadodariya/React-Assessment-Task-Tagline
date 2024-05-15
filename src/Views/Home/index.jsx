import React, { useEffect, useState } from "react";
import { Data } from "../../utils/appData";
import { debounce, size } from "lodash";
import styled from "styled-components";
import Select from "react-select";
import { Table } from "reactstrap";

import {
  getKeyNamesArrayFromData,
  getOptionListArray,
} from "../../utils/commonFunctions";

const HomeContainer = styled.div`
  padding: 80px 0;
  .filter-section {
    margin-bottom: 40px;
    .flex-box {
      display: flex;
      align-items: baseline;
      gap: 16px;
      flex-wrap: wrap;
    }

    .select-box {
      width: 300px;
      max-width: 100%;

      label {
        margin-bottom: 4px;
        display: block;
        font-size: 16px;
        font-weight: 500;
        text-transform: capitalize;
      }
    }
  }
  table {
    thead {
      tr {
        th {
          text-transform: capitalize;
        }
      }
    }

    tbody {
      tr {
        td {
          text-transform: capitalize;
        }
      }
    }
  }
`;
const Home = () => {
  const [userData, setUserData] = useState([...Data]);
  const [filterData, setFilterData] = useState({});

  const handelChangeSelect = (key, value) => {
    let filterDataObj = {
      ...filterData,
      [key]: value,
    };
    setFilterData(filterDataObj);
    applyFilter(filterDataObj);
  };
  const applyFilter = (filterDataObj) => {
    let currentData = [...Data];
    if (filterDataObj) {
      Object.keys(filterDataObj).forEach((key) => {
        if (Array.isArray(filterDataObj[key])) {
          let arr = [...filterDataObj[key]];
          if (arr.length > 0) {
            const filterValues = arr.map((filter) => filter.value);
            if (key === "name") {
              currentData = currentData.filter((item) => {
                return item.name
                  .toLowerCase()
                  .includes(filterValues[0] && filterValues[0].toLowerCase());
              });
            } else {
              currentData = currentData.filter((item) =>
                filterValues.includes(item[key] && item[key].toString())
              );
            }
          }
        }
      });
    }

    setUserData(currentData);
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    debouncedSetSearchTerm(value);
  };

  const debouncedSetSearchTerm = debounce((value) => {
    if (value) {
      let nameArray = [{ label: value, value: value }];
      setFilterData({
        ...filterData,
        name: nameArray,
      });
      applyFilter(
        {
          ...filterData,
          name: nameArray,
        },
        "name"
      );
    } else {
      setFilterData({
        ...filterData,
        name: [],
      });
      applyFilter(
        {
          ...filterData,
          name: [],
        },
        "name"
      );
    }
  }, 500);

  return (
    <HomeContainer>
      <div className="container">
        <div className="row">
          {Data && size(Data) > 0 ? (
            <>
              <div className="col-12">
                <div className="filter-section">
                  <div className="flex-box">
                    {size(getKeyNamesArrayFromData(Data)) > 0 &&
                      getKeyNamesArrayFromData(Data).map((key) => {
                        if (key === "id" || key === "name") return null;
                        return (
                          <div className="select-box" key={key}>
                            <label>{key}</label>
                            <Select
                              isMulti
                              name={key}
                              onChange={(value) =>
                                handelChangeSelect(key, value)
                              }
                              value={filterData[key] || []}
                              options={getOptionListArray(Data, key)}
                              className="basic-multi-select"
                              classNamePrefix="select"
                            />
                          </div>
                        );
                      })}
                    {size(getKeyNamesArrayFromData(Data)) > 0 &&
                      getKeyNamesArrayFromData(Data).includes("name") && (
                        <div className="select-box">
                          <label>Search by Name</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleSearch}
                          />
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="col-12">
                <Table bordered responsive striped>
                  <thead>
                    <tr>
                      {size(getKeyNamesArrayFromData(Data)) > 0 &&
                        getKeyNamesArrayFromData(Data).map((key) => (
                          <th key={key}>{key}</th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {size(getKeyNamesArrayFromData(Data)) > 0 &&
                      userData.map((data) => (
                        <tr key={data?.id}>
                          {getKeyNamesArrayFromData(Data).map((key) => (
                            <td key={key}>
                              {data[key] ? data[key].toString() : ""}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </>
          ) : (
            <div className="col-12 text-center">
              <h1>No Data Found</h1>
            </div>
          )}
        </div>
      </div>
    </HomeContainer>
  );
};

export default Home;
