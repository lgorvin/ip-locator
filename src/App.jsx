import axios from "axios";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  setView,
  useMapEvent,
} from "react-leaflet";
import ReactLoading from "react-loading";

const App = () => {
  // const url =
  //   "https://geo.ipify.org/api/v2/country,city?apiKey=at_gwdGvwCRWQMN5AeWtZDcJCraMgAwc&ipAddress=8.8.8.8";

  //const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_gwdGvwCRWQMN5AeWtZDcJCraMgAwc&ipAddress=${test}`;

  // try {
  //   setLoading(true);
  //   axios
  //     .get(
  //       `"https://api.ipdata.co/${test}?api-key=98e10052fe66cd7d5f7ab713e9f8f83918cab5aff563099731cb6884"`
  //     )
  //     .then((res) => {
  //       setAddress(res.data.ip);
  //       setLocation(`${res.data.location.city}, ${res.data.location.region}`);
  //       setTimezone(res.data.location.timezone);
  //       setIsp(res.data.isp);
  //       setLat(res.data.location.lat);
  //       setLong(res.data.location.lng);
  //       setLoading(false);
  //     });
  // } catch (error) {
  //   setLoading(false);
  //   console.log(error.response);
  // }

  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [isp, setIsp] = useState("");
  const [test, setTest] = useState("");

  const [position, setPosition] = useState(null);

  const [loading, setLoading] = useState(false);

  const mapRef = useRef();

  function MyComponent() {
    // const map = useMapEvent("click", () => {
    //   map.flyTo([lat, long]);
    // });
    // return null;

    const map = useMap();

    useEffect(() => {
      map.flyTo([lat, long]);
    }, []);
  }

  //const key = "98e10052fe66cd7d5f7ab713e9f8f83918cab5aff563099731cb6884";

  const fetchAdvice = async () => {
    try {
      setLoading(true);
      axios
        .get(
          `https://api.ipdata.co/${test}?api-key=98e10052fe66cd7d5f7ab713e9f8f83918cab5aff563099731cb6884`
        )
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

  console.log(lat);
  console.log(long);

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="bg1 mt-[-25px] h-[320px] pb-[30px]">
      <h1 className="text-center pt-12 font-medium text-white text-2xl">
        IP Address Tracker
      </h1>
      <div className="mt-6 flex justify-center">
        <input
          className="h-14 w-[264px] ml-6 rounded-l-lg px-4 shadow-lg"
          placeholder="Enter an IP Address"
          value={test}
          onChange={(e) => setTest(e.target.value)}
          type="text"
        />
        <div
          onClick={fetchAdvice}
          className="rounded-r-lg mr-6 bg-black shadow-lg h-14 w-14 cursor-pointer"
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
              className="float-right mt-5 mr-6"
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
        <div className="bg-white h-[266px] opacity-95 shadow-lg w-80 mx-6 mt-6 rounded-lg">
          <h1 className="text-center text-xs text-gray-400 font-bold pt-5">
            IP ADDRESS
          </h1>
          <h2 className="text-center text-xl pt-1 font-medium">
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
          <h1 className="text-center text-xs text-gray-400 font-bold pt-3">
            LOCATION
          </h1>
          <h2 className="text-center text-xl pt-1 font-medium">
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
          <h1 className="text-center text-xs text-gray-400 font-bold pt-3">
            TIMEZONE
          </h1>
          <h2 className="text-center text-xl pt-1 font-medium">
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
          <h1 className="text-center text-xs text-gray-400 font-bold pt-3">
            ISP
          </h1>
          <h2 className="text-center text-xl pt-1 font-medium">
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
      <div className="absolute behind mt-[80px]">
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
