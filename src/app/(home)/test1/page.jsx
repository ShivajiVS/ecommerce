// import { FadeUp } from "@/components/fade-up";

// cascadia code, Consolas
"use client";

import { useState } from "react";

const countries = {
  "United States": [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ],
  India: [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ],
  Canada: [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Northwest Territories",
    "Nunavut",
    "Yukon",
  ],
  Australia: [
    "New South Wales",
    "Victoria",
    "Queensland",
    "Western Australia",
    "South Australia",
    "Tasmania",
    "Australian Capital Territory",
    "Northern Territory",
  ],
  Brazil: [
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins",
  ],
};

export default function Page() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [states, setStates] = useState([]);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setStates(countries[country] || []);
    setSelectedState(""); // Reset state selection
    console.log(states);
  };

  return (
    <div className="mx-20  mt-10 px-10 py-10 border bg-slate-200 space-y-8 ">
      {/* {Array.from(Array(100).keys()).map((i) => (
        // <FadeUp key={i}>
        <p key={i} className="text-justify tracking-tight odd:bg-state-800">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum placeat,
          deleniti perferendis necessitatibus porro aliquam, at praesentium
          molestias et odio accusamus amet aperiam! Eum nulla vel dolore maxime
          labore quia facilis ullam fuga dolor harum. Molestias similique,
          praesentium quidem possimus sunt eveniet tenetur explicabo maiores
          architecto enim quisquam consequatur! Mollitia!
        </p>
        // </FadeUp>
      ))} */}
      <select
        id="country"
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        <option value="">Select a country</option>
        {Object.keys(countries).map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <br />

      <select
        id="state"
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
      >
        <option value="">Select a State</option>
        {countries[`${selectedCountry}`].map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
}
