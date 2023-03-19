let url="https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

let req= new XMLHttpRequest();
    req.open("GET",url,true);

    req.send();
    req.onload = function(){
        let data = JSON.parse(req.responseText);
    }