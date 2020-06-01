var accessToken = 2792784207486148;
var proxyurl = 'https://fast-ocean-15050.herokuapp.com/';
var li = document.getElementById('list');
var list = document.getElementById('list')
var items;
var Responses = [];
var favList = [];

// function for fetch request
async function getResults(id) {

  var url = `https://superheroapi.com/api/${accessToken}/${id}`;

  var response = await fetch(proxyurl + url);
  var data = await response.json();

  Responses.push(data);

}

items = JSON.parse(localStorage['id']);
for (var x of items) {
  getResults(x);
}

//Rendering the Favourites to the Document
function RenderFavourites() {

  list.innerHTML = ''
  for (var x of Responses) {
    console.log(x);

    var li = document.createElement('li');

    li.innerHTML = `
                    <div class="card">
                    <div class="top">
                       <a href='/viewsuperhero.html?id=${x.id}' data-id = ${x.id}> <img  class = "superhero" src="${x.image.url}" id = "${x.id}" width = 200px alt="image"></a>
                    </div>
                    <div class="down">
                        <p>${x.name}</p>
                        <p>${x.appearance.gender}</p>
                    </div>
                    <div>
                    <input class="check" type="checkbox" id="${x.id}" data-name ="${x.name}" data-image="${x.url}">
                    <label for="${x.id}"></label>
                    </div>
                </div>                    
  
                `




    list.appendChild(li);
  }
}

function BuildList() {

}
RenderFavourites();



//handling mouse events
function mouseEvents(e) {

  RenderFavourites();

}


//handling all click events
function clickEvents(e) {

  if (e.target.className == 'superhero') {
    currentsuperhero = e.target.id

  }
  if (e.target.className == 'check') {

    check = document.querySelectorAll('input[type="checkbox"]:checked');
    if (e.target.checked == true) {
      fav.push(e.target.id);
    } else {
      console.log('remove from favourites')
      id = e.target.id;
      var index = fav.indexOf(id);
      fav.splice(index, 1);
    }
    localStorage.setItem('id', JSON.stringify(fav));
    console.log(e);

  }

}


document.addEventListener('click', clickEvents);

document.addEventListener('mousemove', mouseEvents);