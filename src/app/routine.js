document.addEventListener('DOMContentLoaded', function(){

var simulation = {

    time : 0.0 ,
    simulationInited: false,
    simulationEnded: false ,
    actors : [],
    
    startSimulation: function(){

        //window.alert("RUN THIS SHIT");
        simulation.init();



        while (!simulation.simulationEnded){

            simulation.update();
        }

    },
    init: function(){

        simulation.actors.forEach(
            function(actor){

                actor.acc = 9.8 ;
                actor.v = 0 ;

            }
        );

        simulation.simulationInited = true ;

    },
    update: function(){

        console.log("Simulation Step nr 1 ");
        console.log(simulation.actors);
        //simulation.simulationEnded = true ;
    },
    render: function(){

        clearCanvas();

        simulation.actors.filter(
            actor => actor.visible 
        ).forEach(
            function(actor){

                if (actor.shape === "circle"){

                    drawingContext.beginPath();
                    drawingContext.arc( actor.center[0] , actor.center[1], 10, 0, 2*Math.PI );
                    drawingContext.strokeStyle = actor.color ;
                    drawingContext.stroke();

                }
            }
        );
    },
    reset: function(){
        clearCanvas();
        simulation.actors = [] ;
    }
}


    /********* OTHER STUFF     
     * 
     */
    //add listener to canvas
    var canvas = document.getElementById("mainCanvas") ;

    canvas.addEventListener("mousedown", makeCircleActor, false );
    document.getElementById("clearthis").addEventListener("click", simulation.reset , false ); 
    document.getElementById("startsim").addEventListener("click", simulation.startSimulation, false );

    var drawingContext = document.getElementById("mainCanvas").getContext("2d");
    

    function clearCanvas(){
        drawingContext.clearRect(0, 0, canvas.width, canvas.height);
    }


    function makeCircleActor(event){

        simulation.actors.push(
            {
                "center": getMousePosition(event),
                "color": colors.foreground,
                "filled": false,
                "visible": true,
                "shape": "circle"
            }
        );

        simulation.render();


    }




    function getMousePosition(event){

        let rect = canvas.getBoundingClientRect() ;

        return [
            event.clientX - rect.left ,
            event.clientY - rect.top
        ];
    }


    /****
 * MAIN COMPONENT 
 */
var colors = {
    background: "#2f2e30",
    foreground: "#89f73b"
}




});




