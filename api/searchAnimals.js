var petfinder = require("@petfinder/petfinder-js");
var client = new petfinder.Client({apiKey: "TRGJgs572EMIApod6zYEZCFeIgKpgKzOex5CcaVG9pErBo9y4U", secret: "eZmBINe8wGKxdaNlQ7m4Ae0QV0lUqCalI6YkLrFx"});

var apicall;

export const searchAnimals = async (pZipcode, aType, aAge, aGender, aSize) => {
   await client.animal.search ({
    location: pZipcode,
    type: aType,
    age: aAge,
    gender: aGender,
    size: aSize,
    limit: 1,
  }).then(function(response) {
      apicall = response.data;
      console.log(apicall);
  }).catch(function (error) {
    console.log(error);
  });
}

/*
var petfinder = require("@petfinder/petfinder-js");
var client = new petfinder.Client({apiKey: "TRGJgs572EMIApod6zYEZCFeIgKpgKzOex5CcaVG9pErBo9y4U", secret: "eZmBINe8wGKxdaNlQ7m4Ae0QV0lUqCalI6YkLrFx"});


export async function searchAnimals(pZipcode, aType, aAge, aGender, aSize) {

  var animalData;

   await client.animal.search ({
    location: pZipcode,
    type: aType,
    age: aAge,
    gender: aGender,
    size: aSize,
    limit: 1,
  }).then((resp) => {
    animalData = resp;
    //console.log(animalData);
    return animalData;
  });
  
}
*/
/*
var animalData;

   await client.animal.search ({
    location: pZipcode,
    type: aType,
    age: aAge,
    gender: aGender,
    size: aSize,
    limit: 1,
  }).then(resp => {
    animalData = resp.data.animals;
    console.log(animalData);
    return animalData;
  });
  */

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