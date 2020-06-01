var accessToken = 2792784207486148;
var proxyurl = 'https://fast-ocean-15050.herokuapp.com/';
var cardlist = document.getElementById('list');

var resout = [];
var cleanedResult = [];
var showingResultFor = ""
var currentsuperhero;

var fav = [];

document.addEventListener('click', clickEvents);








//function for fetch request 
async function getResults() {
    let query = document.getElementById('name').value;
    var url = `https://superheroapi.com/api/${accessToken}/search/${query}`;

    var response = await fetch(proxyurl + url);
    var data = await response.json();
    resout = [];
    resout.push(data);
    console.log("inside the function", data);

    cleanResults();
    if (resout[0].response == "error") {
        cardlist.innerHTML = "No match found"
    }
    renderList();
}

//calling this will fetch responses and render the list to html
function fetchResults() {

    getResults();
    renderList();

}


//calling this will make the response from fetch easy for handling 
function cleanResults() {
    showingResultFor = resout[0]["results-for"];
    console.log("showing results for ", showingResultFor);
    cleanedResult = resout[0].results;


}

//Render Data to HTML DOM
function renderList() {
    cardlist.innerHTML = '';

    for (let i = 0; i < cleanedResult.length; i++) {

        var name = cleanedResult[i].name;
        var gender = cleanedResult[i].appearance.gender;
        var url = cleanedResult[i].image.url;
        var id = cleanedResult[i].id;
        showItems(name, gender, url, id);
    }

    if (resout[0].response == "error") {
        cardlist.innerHTML = "No match found"
    }



}

//Creating the HTML ELEMENTS based on the data recieved
function showItems(name, gender, url, id) {
    var li = document.createElement('li');

    li.innerHTML = `
                    <div class="card">
                    <div class="top">
                       <a href='viewsuperhero.html?id=${id}' data-id = ${id}> <img  class = "superhero" src="${url}" id = "${id}" width = 200px alt="image"></a>
                    </div>
                    <div class="down">
                        <p>${name}</p>
                        <p>${gender}</p>
                    </div>
                    <div>
                    <input class="check" type="checkbox" id="${id}" data-name ="${name}" data-image="${url}">
                    <label for="${id}"></label>
                    </div>
                </div>                    

                `




    cardlist.appendChild(li);
    //   console.log()  

}












// var debounce = function (func, wait, immediate) {
//     var timeout;
//     return function() {
//         var context = this, args = arguments;
//         var later = function() {
//                 timeout = null;
//                 if (!immediate) func.apply(context, args);
//         };
//         var callNow = immediate && !timeout;
//         clearTimeout(timeout);
//         timeout = setTimeout(later, wait);
//         if (callNow) func.apply(context, args);
//     };
// };

function debounce(func, timeout) {
    let timer;
    return (...args) => {
        const next = () => func(...args);

        clearTimeout(timer);

        timer = setTimeout(next, timeout > 0 ? timeout : 300);
    };
}




document.addEventListener('click', clickEvents);
(function () {
    document.getElementById('name').addEventListener('keyup', debounce(function () {
        fetchResults();
    }, 300));
}())


//handling the click events 
function clickEvents(e) {

    if (e.target.className == 'superhero') {
        currentsuperhero = e.target.id

    }
    if (e.target.className == 'check') {
        //getting the checked list for creating the list of favourites
        check = document.querySelectorAll('input[type="checkbox"]:checked');
        if (e.target.checked == true) {
            fav.push(e.target.id);
        } else {
            console.log('remove from favourites')
            id = e.target.id;
            var index = fav.indexOf(id);
            fav.splice(index, 1);
        }
        //adding the favourties data to the local storage
        localStorage.setItem('id', JSON.stringify(fav));
        console.log(e);

    }

}