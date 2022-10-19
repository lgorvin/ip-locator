import axios from "axios";
import { useState } from "react";

import bg from "./assets/images/pattern-bg.png";

const App = () => {
  // const url =
  //   "https://geo.ipify.org/api/v2/country,city?apiKey=at_gwdGvwCRWQMN5AeWtZDcJCraMgAwc&ipAddress=8.8.8.8";

  //const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_gwdGvwCRWQMN5AeWtZDcJCraMgAwc&ipAddress=${test}`;
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [isp, setIsp] = useState("");
  const [test, setTest] = useState("");

  const fetchAdvice = async () => {
    try {
      axios
        .get(
          `https://geo.ipify.org/api/v2/country,city?apiKey=at_gwdGvwCRWQMN5AeWtZDcJCraMgAwc&ipAddress=${test}`
        )
        .then((res) => {
          setAddress(res.data.ip);
          setLocation(`${res.data.location.city}, ${res.data.location.region}`);
          setTimezone(res.data.location.timezone);
          setIsp(res.data.isp);
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="bg1 mt-[-25px] h-[320px] pb-[30px]">
      {/* <img className="absolute" src={bg} alt="" /> */}
      <h1 className="text-center pt-12 font-medium text-white text-2xl">
        IP Address Tracker
      </h1>
      <div className="flex justify-center mt-6">
        <div
          onClick={fetchAdvice}
          className="mx-6 rounded-lg bg-black shadow-lg h-14 w-80 cursor-pointer"
        >
          <svg
            className="float-right mt-5 mr-6"
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="14"
          >
            <path fill="none" stroke="#FFF" stroke-width="3" d="M2 1l6 6-6 6" />
          </svg>
          <input
            className="h-14 w-64 rounded-l-lg px-4 shadow-lg"
            value={test}
            onChange={(e) => setTest(e.target.value)}
            type="text"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-white h-[266px] shadow-lg w-80 mx-6 mt-6 rounded-lg">
          <h1 className="text-center text-xs text-gray-400 font-bold pt-5">
            IP ADDRESS
          </h1>
          <h2 className="text-center text-xl pt-1 font-medium">{address}</h2>
          <h1 className="text-center text-xs text-gray-400 font-bold pt-3">
            LOCATION
          </h1>
          <h2 className="text-center text-xl pt-1 font-medium">{location}</h2>
          <h1 className="text-center text-xs text-gray-400 font-bold pt-3">
            TIMEZONE
          </h1>
          <h2 className="text-center text-xl pt-1 font-medium">
            UTC {timezone}
          </h2>
          <h1 className="text-center text-xs text-gray-400 font-bold pt-3">
            ISP
          </h1>
          <h2 className="text-center text-xl pt-1 font-medium">{isp}</h2>
        </div>
      </div>
    </div>
  );
};

export default App;
