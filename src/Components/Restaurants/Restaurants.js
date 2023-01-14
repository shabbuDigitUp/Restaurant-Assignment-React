import React, { useState } from "react";
import restaurantMenu from "../../Json/restaurant";
import Search from "../Form/Search"
import "./restaurants.css";

const Restaurant = () => {
  const availableRestra = restaurantMenu.menuDetails;
  const keys = Object.keys(availableRestra);

  let CURRENTTIME = 0;

  const date = new Date();
  const showTime =  date.getHours() + ":" + date.getMinutes();

  showTime.split(":").map((t, idx) =>{
    let tm = idx === 0 ? parseInt(t * 60) : parseInt(t)
    return CURRENTTIME += tm
    })

  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <>
      <Search handleChange={handleChange} searchInput={searchInput} />
      {keys.map((key, idx) => {
        return (
          <section key={idx}>
            <h2>{key}</h2>
            <ul className="foodItems">
              {searchInput.length === 0
                ? availableRestra[key].map(
                    ({ foodname, servingtime, outofstock }, idx) => {

                      let STARTTIME = 0;
                      let ENDTIME = 0;  

                      servingtime.split("-")[0].split(":").map((t, i) =>{
                        let tm = i === 0 ? parseInt(t * 60) : parseInt(t)
                        return STARTTIME += tm
                       })
                      
                      servingtime.split("-")[1].split(":").map((t, i) =>{
                        let tm = i === 0 ? parseInt(t * 60) : parseInt(t)
                        return ENDTIME += tm
                       })

                      if (STARTTIME < CURRENTTIME && ENDTIME > CURRENTTIME) {
                        return outofstock ? (
                          <li key={idx} readOnly className="disabled">
                            {foodname}
                          </li>
                        ) : (
                          <li key={idx}>{`${foodname}`}</li>
                        );
                      } else {
                        return null;
                      }
                    }
                  )
                : availableRestra[key].map(({ foodname }, idx) => {
                    if (foodname.toLowerCase().includes(searchInput)) {
                      return <li key={idx}>{`${foodname}`}</li>;
                    } else {
                      return null}
                  })}
            </ul>
          </section>
        );
      })}
    </>
  );
};

export default Restaurant;
