import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import ReactLoading from "react-loading";

import { apiKey } from "./api";

const App = () => {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [isp, setIsp] = useState("");
  const [test, setTest] = useState("");

  const [loading, setLoading] = useState(false);

  function MyComponent() {
    // const map = useMapEvent("click", () => {
    //   map.flyTo([lat, long]);
    // });
    // return null;

    const map = useMap();

    useEffect(() => {
      map.flyTo([lat, long]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  }
  const fetchAdvice = async () => {
    try {
      setLoading(true);
      axios
        .get(`https://api.ipdata.co/${test}?api-key=${apiKey}`)
        .then((res) => {
          setAddress(res.data.ip);
          setLocation(`${res.data.city}, ${res.data.region}`);
          setTimezone(res.data.time_zone.offset);
          setIsp(res.data.asn.name);
          setLat(res.data.latitude);
          setLong(res.data.longitude);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  const onKeyUp = (event) => {
    if (event.charCode === 13) {
      fetchAdvice();
    }
  };

  useEffect(() => {
    fetchAdvice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg1 mt-[-25px] h-[320px] pb-[30px]">
      <h1 className="text-center pt-12 lg:pt-16 font-medium text-white text-2xl lg:text-4xl duration-500">
        IP Address Tracker
      </h1>
      <div className="mt-6 lg:mt-12 flex justify-center">
        <input
          className="h-14 w-[264px] lg:w-[550px] ml-6 rounded-l-lg px-4 shadow-lg duration-700"
          placeholder="Enter an IP Address"
          value={test}
          onChange={(e) => setTest(e.target.value)}
          onKeyPress={onKeyUp}
          type="text"
        />
        <div
          onClick={fetchAdvice}
          className="rounded-r-lg mr-6 bg-black  hover:bg-gray-800 duration-300 shadow-lg h-14 w-14 cursor-pointer"
        >
          {loading ? (
            <div className="float-right mt-4 mr-4">
              <ReactLoading
                type={"spin"}
                color={"#0DC6DE"}
                height={25}
                width={25}
              />
            </div>
          ) : (
            <svg
              className="float-right mt-5 mr-6 hover:scale-125 duration-300"
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="14"
            >
              <path
                fill="none"
                stroke="#FFF"
                stroke-width="3"
                d="M2 1l6 6-6 6"
              />
            </svg>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-white h-auto min-w-[326px] lg:min-w-[900px] opacity-95 shadow-lg mx-6 mt-6 lg:mt-10 rounded-lg grid grid-cols-1 lg:grid-cols-4 duration-700">
          <div className=" lg:mt-10 lg:mb-10">
            <h1 className="text-center text-xs text-gray-400 font-bold pt-3">
              IP ADDRESS
            </h1>
            <h2 className="text-center text-xl mx-6 pt-1 font-medium">
              {loading ? (
                <div className="flex justify-center">
                  <ReactLoading
                    type={"bubbles"}
                    color={"#0DC6DE"}
                    height={25}
                    width={25}
                  />
                </div>
              ) : (
                address
              )}
            </h2>
          </div>
          <div className="lg:mt-10 lg:mb-10">
            <h1 className="text-center text-xs text-gray-400 font-bold pt-3">
              LOCATION
            </h1>
            <h2 className="text-center text-xl pt-1 mx-6 font-medium">
              {loading ? (
                <div className="flex justify-center">
                  <ReactLoading
                    type={"bubbles"}
                    color={"#0DC6DE"}
                    height={25}
                    width={25}
                  />
                </div>
              ) : (
                location
              )}
            </h2>
          </div>
          <div className="lg:mt-10 lg:mb-10">
            <h1 className="text-center text-xs text-gray-400 font-bold pt-3">
              TIMEZONE
            </h1>
            <h2 className="text-center text-xl pt-1 mx-6 font-medium">
              {loading ? (
                <div className="flex justify-center">
                  <ReactLoading
                    type={"bubbles"}
                    color={"#0DC6DE"}
                    height={25}
                    width={25}
                  />
                </div>
              ) : (
                <>UTC {timezone}</>
              )}
            </h2>
          </div>
          <div className="mb-2 lg:mt-10 lg:mb-10">
            <h1 className="text-center text-xs text-gray-400 font-bold pt-3">
              ISP
            </h1>
            <h2 className="text-center text-xl pt-1 mx-6 font-medium">
              {loading ? (
                <div className="flex justify-center">
                  <ReactLoading
                    type={"bubbles"}
                    color={"#0DC6DE"}
                    height={25}
                    width={25}
                  />
                </div>
              ) : (
                isp
              )}
            </h2>
          </div>
        </div>
      </div>
      <div className="absolute behind mt-[180px] lg:mt-[250px] duration-500">
        <MapContainer center={[lat, long]} zoom={14} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MyComponent />
          <Marker position={[lat, long]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default App;
