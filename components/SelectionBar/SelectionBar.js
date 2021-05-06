import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function SelectionBar() {
  const [showAllCities, setShowAllCities] = useState(false);
  const router = useRouter();
  const listOfAllCities = [
    "Agra",
    "Ahmedabad",
    "Allahbad",
    "Andhra Pradesh",
    "Banglore",
    "Bhopal",
    "Bihar",
    "Chandigarh",
    "Chennai",
    "Coimbatore",
    "Dehradun",
    "Delhi",
    "Faridabad",
    "Ghaziabad",
    "Gorakhpur",
    "Gurgaon",
    "Haryana",
    "Hyderabad",
    "Indore",
    "Jabalpur",
    "Jaipur",
    "Jharkhand",
    "Kanpur",
    "Kolkata",
    "Lucknow",
    "Mumbai",
    "Nagpur",
    "Nashik",
    "Noida",
    "Patna",
    "Pune",
    "Ranchi",
    "Surat",
    "Thane",
    "Varanasi",
    "Visakhapatnam",
  ];
  const topCities = [
    "Delhi",
    "Banglore",
    "Ahmedabad",
    "Chennai",
    "Mumbai",
    "Kolkata",
    "Lucknow",
    "Surat",
    "Noida",
    "Pune",
  ];
  const listOfResources = [
    "Icu",
    "Ventilator",
    "Oxygen Bed",
    "Bed",
    "Remdesivir",
    "Favipiravir",
    "Tocilizumab",
    "Plasma",
    "Food",
    "Ambulance",
    "Oxygen Concentrator",
    "Oxygen Cylinder",
    "Covid Test",
    "Helpline",
  ];

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchInputText, setSearchInputText] = useState(null);
  const [selectHelpOption, setSelectHelpOption] = useState("available");

  useEffect(() => {
    setSelectedLocation(null);
    setSelectedResource(null);
  }, []);

  const searchCities = (event) => {
    setSearchInputText(event.target.value);
    setSearchResults([]);
    listOfAllCities.forEach((city) => {
      if (city.toLowerCase().includes(event.target.value.toLowerCase())) {
        setSearchResults((result) => [...result, city]);
      }
    });
  };

  return (
    <div className="w-[100%] mt-5 px-10 pb-3">
      <div className="selectionBar">
        <div className="location">
          <div className="flex ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#228B22"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <h3 className="font-bold text-green-500">Choose location</h3>
          </div>
          <div className="border-t mt-3"></div>
          <div className="searchBar flex w-[100%] items-center mt-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#228B22"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              onChange={(e) => {
                searchCities(e);
              }}
              value={searchInputText}
              className="w-[100%] p-2 border-2 hover:bg-gray-100 transition duration-200 rounded-lg ml-2"
              type="text"
              name="search"
              id="Search"
              placeholder="Search for your city or select from below . . ."
            />
          </div>
          {searchInputText === null ? (
            <div>
              {!showAllCities ? (
                <div className="citiesChips grid grid-cols-3 gap-y-3 gap-x-3 mt-5 md:grid-cols-5 lg:grid-cols-6">
                  {topCities.map((city, index) => {
                    return (
                      <div
                        onClick={() => setSelectedLocation(city)}
                        key={index}
                        className={`w-[100%] items-center justify-center flex p-2 rounded-md ${
                          selectedLocation === city
                            ? "text-white"
                            : "text-gray-600"
                        } h-10 ${
                          selectedLocation === city
                            ? "bg-green-500"
                            : "bg-[#E4E4E7]"
                        } cursor-pointer hover:bg-green-500 hover:text-white transition duration-200`}
                      >
                        <h1>{city}</h1>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="citiesChips grid grid-cols-3 gap-y-3 gap-x-3 mt-5 md:grid-cols-5 lg:grid-cols-6">
                  {listOfAllCities.map((city, index) => {
                    return (
                      <div
                        onClick={() => setSelectedLocation(city)}
                        key={index}
                        className={`w-[100%] items-center justify-center flex p-2 rounded-md ${
                          selectedLocation === city
                            ? "text-white"
                            : "text-gray-600"
                        } h-10 ${
                          selectedLocation === city
                            ? "bg-green-500"
                            : "bg-[#E4E4E7]"
                        } cursor-pointer hover:bg-green-500 hover:text-white transition duration-200`}
                      >
                        <h1>{city}</h1>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="citiesChips grid grid-cols-3 gap-y-3 gap-x-3 mt-5 md:grid-cols-5 lg:grid-cols-6">
              {searchResults.map((city, index) => {
                return (
                  <div
                    onClick={() => setSelectedLocation(city)}
                    key={index}
                    className={`w-[100%] items-center justify-center flex p-2 rounded-md ${
                      selectedLocation === city ? "text-white" : "text-gray-600"
                    } h-10 ${
                      selectedLocation === city
                        ? "bg-green-500"
                        : "bg-[#E4E4E7]"
                    } cursor-pointer hover:bg-green-500 hover:text-white transition duration-200`}
                  >
                    <h1>{city}</h1>
                  </div>
                );
              })}
            </div>
          )}
          <div
            className="showMore w-max"
            onClick={() => setShowAllCities(!showAllCities)}
          >
            <h1 className="text-[#228B22] text-sm p-2 cursor-pointer border-2 w-max rounded-lg mt-3 hover:bg-green-500 hover:text-white transition duration-200">
              {!showAllCities ? "Show all cities" : "Show less"}
            </h1>
          </div>
        </div>
        <div className="resources mt-5">
          <div className="flex ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#228B22"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            <h3 className="font-bold text-green-400">Choose Resources</h3>
          </div>
          <div className="citiesChips grid grid-cols-3 gap-y-3 gap-x-3 mt-5 md:grid-cols-5 lg:grid-cols-6 ">
            {listOfResources.map((resource, index) => {
              return (
                <div
                  onClick={() => {
                    setSelectedResource(resource);
                  }}
                  key={index}
                  className={`w-[100%] items-center justify-center flex p-2 rounded-md ${
                    selectedResource === resource
                      ? "text-white"
                      : "text-gray-600"
                  } h-10 ${
                    selectedResource === resource
                      ? "bg-green-500"
                      : "bg-[#E4E4E7]"
                  } cursor-pointer hover:bg-green-500 hover:text-white transition duration-200`}
                >
                  <h1>{resource}</h1>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-5">
          <p>Select any one:</p>
          <div className="btn mt-3">
            <button
              onClick={() => setSelectHelpOption("available")}
              className={`border p-2 cursor-pointer rounded-lg  transition duration-150 mr-2 ${
                selectHelpOption === "available"
                  ? "bg-green-500 text-white"
                  : ""
              }`}
            >
              Get Help
            </button>
            <button
              onClick={() => setSelectHelpOption("help")}
              className={`border p-2 cursor-pointer rounded-lg  ${
                selectHelpOption === "help" ? "bg-green-500 text-white" : ""
              }`}
            >
              Help Others
            </button>
          </div>
        </div>
        {selectedLocation != null && selectedResource != null ? (
          <div className="showResult flex  w-max items-center mt-5">
            <button
              onClick={() =>
                router.push(
                  `/results?location=${selectedLocation}&resource=${selectedResource}&helpOption=${selectHelpOption}`
                )
              }
              className="border p-2 cursor-pointer rounded-lg bg-green-500 text-white"
            >
              Show Results
            </button>
            <button
              className="cursor-pointer ml-3 font-semibold"
              onClick={() => {
                setSelectedLocation(null);
                setSelectedResource(null);
              }}
            >
              Clear Choices
            </button>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
