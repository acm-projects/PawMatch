likedAnimals = [55083530, 55083529];

var petfinder = require("@petfinder/petfinder-js");
var client = new petfinder.Client({apiKey: "BW2quofQcKQRW8zaW5nxGCLiYxvlnYPZWfoWhD19EMp9oHbmjJ", secret: "zrA4VcQo24kvI21xAZjE6Ok8ZD6EZjEQ3JPBJ6hA"});

export function getAnimal(likedAnimals) {

  client.animal.show(likedAnimals)
  .then(function (response) {
    console.log(response.data.animal)
    //console.log(resp.data.animal.name);
  });

}
