import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

let GOOGLE_KEY; // enter your Api key

// declare var google: any;

function searchAddressHandler(e: Event) {
  e.preventDefault();
  const enteredAddress = addressInput.value;
  console.log(encodeURI(enteredAddress));

  type GoogleGeoResponse = {
    results: { geometry: { location: { lat: number; lng: number } } }[];
    status: "OK" | "ZERO_RESULTS";
  };

  axios
    .get<GoogleGeoResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_KEY}`
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Unfortunately could not fetch location!");
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map"), {
        center: coordinates,
        zoom: 16,
      });
      new google.maps.Marker({
        position: coordinates,
        map: map,
      });
    })
    .catch((e) => console.error(e));
}

form.addEventListener("submit", searchAddressHandler);
