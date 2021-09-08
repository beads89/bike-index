// Build an app using the Bike Index API. Your app could list all the bikes that have been registered as stolen in a given location in the past week. Or it could display statistics - for instance, you could see which manufacturer is most frequently stolen in a given area.

//use api to gather list of bikes in city
//reject any that are older than 1 week from Date.now()
//body.bikes[0].date_stolen > Date.now() - 604800000
//output: bike.title bike.serial bike.url

export default class BikeIndex {
  static searchArea(city) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://bikeindex.org/api/v3/search?page=1&per_page=100&location=${city}&distance=10&stolenness=proximity&access_token=${process.env.API_KEY}`;
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}

// function lastWeek(results) {
//   results.bikes.forEach((bike) => {
//     if (bike.date_stolen < Date.now() - 604800000) {
//       results.bikes.splice(bike, 1);
//     }
//   });
// }