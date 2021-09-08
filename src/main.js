import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import BikeIndex from "./project";

function clearFields() {
  $("#city").val("");
  $("#bike-search-output").empty();
  $("show-errors").empty();
}

// function lastWeek(results) {
//   results.bikes.forEach((bike) => {
//     if (bike.date_stolen < Date.now() - 604800000 || bike.date_stolen === null) {
//       results.bikes.splice(bike, 1); 
//       console.log(bike.date_stolen);
//     }
//   });
//   return results;
// }

function lastWeek(results) {
  // let date = Date.now();
  let bikeArray = results.bikes;
  console.log(bikeArray);
  // // bikeArray.forEach((bike, i) => {
  // //   if (bike.date_stolen < (date - 604800000) / 1000) {
  // //     // bikeArray.splice(i, 1); 
  // //   }
  // });
  return bikeArray;
}

$(document).ready(function () {
  $("#bike-search").submit(function (event) {
    event.preventDefault();
    let city = $("#city").val();
    clearFields();
    let promise = BikeIndex.searchArea(city);
    promise.then(function (response) {
      let body = JSON.parse(response);
      console.log(body);
      const bikeResults = lastWeek(body);
      console.log(bikeResults);
      bikeResults.forEach(
        (bike) => {
          let msDateValue = bike.date_stolen * 1000;
          let date = new Date(msDateValue);
          $("#bike-search-output").append(
            `<p>Date Stolen: ${date.toDateString()}</p><p>Title: ${bike.title}</p><p>Serial #: ${bike.serial}</p><p>Link: <a href=${bike.url}>${bike.url}</a></p><br>`
          );
        },
        function (error) {
          $("#show-errors").text(
            `There was an error processing your request: ${error}`
          );
        }
      );
    });
  });
});
