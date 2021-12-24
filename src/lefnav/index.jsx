import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { SearchInput } from "../components/searchinput/search";
import { NavItem } from "../components/navItem/navitem";

import styles from "./leftnav.css";

export function LeftNav() {
  const contactData = useSelector((state) => state.contactData);

  const [filterValue, setFilterValue] = useState("");
  const [filterData, setFilteredData] = useState([]);

  useEffect(() => {
    if (filterValue) {
      setFilteredData(filterSearch(contactData, filterValue));
    } else {
      setFilteredData(contactData);
    }
  }, [filterValue, contactData]);

  function filterSearch(data, value) {
    return data?.filter((user) =>
      user.FirstName.toLocaleLowerCase().normalize().trim().includes(value)
    );
  }

  return (
    <div className={styles.leftNavContiner}>
      <SearchInput
        onChange={(e) => setFilterValue(e.target.value)}
        value={filterValue}
      />
      <div className={styles.contentCotainer}>
        <Routes>
          <Route
            path={"/message/:userId"}
            element={
              <>
                <div className={styles.contentHeader}>Messages</div>
                <div className={styles.contentBody}>
                  {filterData?.map((el) => (
                    <NavItem type={"message"} userData={el} key={el.id} />
                  ))}
                </div>
              </>
            }
          ></Route>
          <Route
            path={"/*"}
            exact={false}
            element={
              <>
                <div className={styles.contentHeader}>Contacts</div>
                <div className={styles.contentBody}>
                  {filterData?.map((el) => (
                    <NavItem type={"contact"} userData={el} key={el.id} />
                  ))}
                </div>
              </>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}
