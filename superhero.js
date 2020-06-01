// (function () {














// })();

window.onload=function(){





    console.log('loaded')

    async function showAllDetails(){
         var params =  window.location.href.split('?')[1];
         var id=params.split('=')[1];
        console.log(id);
        
        var url = `https://superheroapi.com/api/${accessToken}/${id}`;
        console.log(url);

        var response = await fetch(proxyurl+url);
        var data =  await response.json();
        var superherodetails=[];
        superherodetails.push(data);
    
        console.log("inside the function",superherodetails[0]);
         
        extractDetails(superherodetails);
       
     }
    
     function appendDetails(superherodetails,appearance,bio,connections,powerstats,work){
        var imgDiv  = document.createElement('div');
        var appdiv  = document.createElement('div');
        var biodiv  = document.createElement('div');
        var condiv  = document.createElement('div');
        var powdiv  = document.createElement('div');

        var top = document.getElementById('top');
        if(superherodetails[0].response=='error'){
            div.innerHTML = `<h1> Error </h1>`
        }else{
           imgDiv = renderImage(imgDiv,superherodetails);
           biodiv = renderEachPart(biodiv,superherodetails,appearance);
           appdiv = renderEachPart(appdiv,superherodetails,work);
           condiv = renderEachPart(condiv,superherodetails,connections);
           powdiv = renderEachPart(powdiv,superherodetails,powerstats);
        //    appdiv = renderEachPart(appdiv,superherodetails,appearance);
           
        }
        top.appendChild(imgDiv);
        top.appendChild(biodiv);
        top.appendChild(appdiv);
        top.appendChild(condiv);
        top.appendChild(powdiv);
     }
     function renderImage(div,superherodetails){
        var image = superherodetails[0].image.url;
        var name = superherodetails[0].name;
        div.innerHTML=` <div class="image"> 
        <img src="${image}" alt="">
        </div>`

        return div;
     }
     function renderEachPart(div,superherodetails,section){
        var keys =Object.keys(section);
        var values = Object.values(section);
        for(i =0 ; i < keys.length;i++){
            var p = document.createElement('p');
            p.innerHTML=`<p> ${keys[i]} ; ${values[i]}</p>`;

            div.appendChild(p);
        }

        return div;

     }
    function extractDetails(superherodetails){
        var  details = superherodetails[0];
         var appearance = details.appearance;
         var bio = details.biography;
         var connections = details.connections;
         var powerstats = details.powerstats;
         var work = details.work;


         console.log(Object.keys(appearance),Object.keys(bio));
         appendDetails(superherodetails,appearance,bio,connections,powerstats,work);
    }
     showAllDetails();


}