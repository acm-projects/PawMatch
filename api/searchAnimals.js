var petfinder = require("@petfinder/petfinder-js");
var client = new petfinder.Client({apiKey: "BW2quofQcKQRW8zaW5nxGCLiYxvlnYPZWfoWhD19EMp9oHbmjJ", secret: "zrA4VcQo24kvI21xAZjE6Ok8ZD6EZjEQ3JPBJ6hA"});

export function searchAnimals(pZipcode, aType, aAge, aGender, aSize) {

  client.animal.search({
    location: pZipcode,
    type: aType,
    age: aAge,
    gender: aGender,
    size: aSize,
    limit: 1,
  }).then(resp => {
    console.log(resp.data.animals);
  });
}


//TO GET ALL POSSIBLE RESULTS or TO FLIP THROUGH PAGES
/*
  let page = 1;
  let pets = 0;
  let lim = 5;

    let dogIdx = (page - 1) * 100;
    while (pets < lim){
      apiResult.data.animals.forEach(function(animal) {
        //only logs animals with names, not with numbers as names
        if (!IsNum(animal.name)){
          console.log(animal.name);
          console.log(animal.id);
          console.log("#");
          pets++;
        }
      });
    }
    page++;
  } while(apiResult.data.pagination && apiResult.data.pagination.total_pages >= page && (pets < lim));
  console.log("##################");
*/


/*
(async function() {
  await searchAnimals("Dog", "Bernedoodle");
})();

*/