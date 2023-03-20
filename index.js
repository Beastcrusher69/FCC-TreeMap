let url="https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

let colors=["#08e206",
"#e7cd7c",
"#da6c9c",
"#994def",
"#a34423",
"#5ac0e9",
"#511288",
"#ab5c50",
"#d2422b",
"#b7987b",
"#598341",
"#6e965a",
"#2743d6",
"#9b7133",
"#9366e8",
"#e05ed5",
"#b93e05",
"#957508",]

let req= new XMLHttpRequest();
    req.open("GET",url,true);

    req.send();
    req.onload = function(){
        let data = JSON.parse(req.responseText);
        let categories = data.children.map((i) => { return i['children'][0]['category'];})
        console.log(categories);

        let canvas = d3.select('#canvas')
                        .attr("width",850)
                        .attr("height",450);
        let tooltip = d3.select('#tooltip');                        

        
        let hierarchy = d3.hierarchy(data , (node) => {
             
            return node['children'];
        }).sum((node) => {
            return node['value'];
        }).sort((node1,node2) => {
            return node2['value'] - node1['value']; 
        })                        

        let createTreeMap = d3.treemap().size([850,450]);

        createTreeMap(hierarchy);

        let movieTiles = hierarchy.leaves();

        let block =d3.select('svg')
                    .selectAll("g")
                    .data(movieTiles)
                    .enter()
                    .append('g')
                    .attr("transform",(d) => {
                        return "translate(" + d["x0"] + ","+ d["y0"] + ")" ;
                    })
                    
            block.append('rect')
                .attr("class","tile")
                .attr("fill",(d) => {
                    let v= d['data']['category'];

                    if(v === data['children'][0]['children'][0]['category']){
                        return colors[0];
                    }
                    else if(v === data['children'][1]['children'][0]['category']){
                        return colors[1];
                    }
                    else if(v === data['children'][2]['children'][0]['category']){
                        return colors[2];
                    }
                    else if(v === data['children'][3]['children'][0]['category']){
                        return colors[3];
                    }
                    else if(v === data['children'][4]['children'][0]['category']){
                        return colors[4];
                    }
                    else if(v === data['children'][5]['children'][0]['category']){
                        return colors[5];
                    }
                    else if(v === data['children'][6]['children'][0]['category']){
                        return colors[6];
                    }
                    else if(v === data['children'][7]['children'][0]['category']){
                        return colors[7];
                    }
                    else if(v === data['children'][8]['children'][0]['category']){
                        return colors[8];
                    }
                    else if(v === data['children'][9]['children'][0]['category']){
                        return colors[9];
                    }
                    else if(v === data['children'][10]['children'][0]['category']){
                        return colors[10];
                    }
                    else if(v === data['children'][11]['children'][0]['category']){
                        return colors[11];
                    }
                    else if(v === data['children'][12]['children'][0]['category']){
                        return colors[12];
                    }
                    else if(v === data['children'][13]['children'][0]['category']){
                        return colors[13];
                    }
                    else if(v === data['children'][14]['children'][0]['category']){
                        return colors[14];
                    }
                    else if(v === data['children'][15]['children'][0]['category']){
                        return colors[15];
                    }
                    else if(v === data['children'][16]['children'][0]['category']){
                        return colors[16];
                    }
                    else {
                        return colors[17];
                    }

                })
                .attr("data-name",(d) => d.data.name)
                .attr("data-category",(d) => d.data.category)
                .attr("data-value",(d) => d.data.value)    
                .attr("width",(d) => {
                    return d['x1'] - d['x0'];
                })
                .attr("height",(d) => {
                    return d['y1'] - d['y0'];
                })
                .on("mousemove",(event,d) => {

                    tooltip.transition().style('visibility','visible');
                    tooltip.html("<p>" + d.data.name + "</p><p>" + d.data.category + "</p><p>" + d.data.value + "</p>");
                    tooltip.style('opacity','0.9')
                    tooltip.style("left",event.pageX + "px")
                    tooltip.style("top",event.pageY + "px")

                    tooltip.attr("data-value",d.data.value)

                })
                .on("mouseout",() => {
                    tooltip.transition().style('visibility','hidden');
                })

                block.append("text")
                    .text((d) => d.data.name)
                    .attr("transform","translate(10,14)")
                    .style('font-size','10')
                    .attr("width",20 + "px")

                //legend
                let L_H_S = 150;
                let L_V_S = 30;   
                let width = 500;
                let ipr =  Math.floor(width / L_H_S);    
                let height = Math.ceil( categories.length / ipr) * L_V_S;
                let RECT_SIDE = 18; 
                
                let legend = d3.select('#legend')
                                .attr("width",width)
                                .attr("height",height)

                let legendItem = legend.selectAll('g')
                    .data(categories)
                    .enter()
                    .append('g')
                    .attr("transform", (d,i) => {
                        return "translate(" + (((i%ipr)*L_H_S)+90) + "," + (Math.floor(i / ipr) * L_V_S) + ")";
                    })


                    legendItem.append("rect")
                    .attr('width',RECT_SIDE)
                    .attr('height',RECT_SIDE)
                    .attr("fill", (d,i) => {
                        return colors[i];
                    })
                    .attr("class","legend-item")

                    legendItem.append('text')
                    .text((d,i) => { return categories[i];})
                    .attr("transform" , "translate(22, 15) ")

            


    }