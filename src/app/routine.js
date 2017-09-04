document.addEventListener('DOMContentLoaded', function(){

    var simulation = {

        currentTime: 0,
        deltaT: 0.0,
        total_time: 100.0, // will run for 10 secs
        actors : [],
        accel: 9.8, //meter per second -> 
        scaleFactor: 100, //how many pixels is one metre?
        ground: {
            points: [],
            precision: null,
            initGround: function(resolution, maxIncline, startingY){


                points[].push(startingY);
                //randomly generates ground
                for (let n = 0 ; n < resolution ; n++ ){



                }




            }
        },
        
        startSimulation: function(){

            simulation.init();
            requestAnimationFrame( simulation.render ) ; // START RECURSIVE RENDER / UPDATE

        },
        init: function(){

            simulation.actors.forEach(
                function(actor){
                    actor.v = 0 ;
                }
            );
        },
        update: function(timestamp){

            simulation.deltaT = ( timestamp - simulation.currentTime ) / 1000 ;
            simulation.currentTime += simulation.deltaT ;

            //console.log("Current Time is : " + simulation.currentTime );
            //console.log("Delta T is : " + simulation.deltaT );

            simulation.actors.forEach(
                function(actor){

                    actor.v += simulation.accel * simulation.deltaT ;
                    actor.center[1] += actor.v / simulation.scaleFactor ;

                    //console.log( "Acc: " + actor.acc + " Vel: " + actor.v + " Y: " + actor.center[1] );

                }
            );


        },
        render: function( timestamp ){

            clearCanvas();

            simulation.update(timestamp);

            simulation.actors.forEach(
                function(actor){

                    if (actor.shape === "circle"){

                        drawingContext.beginPath();
                        drawingContext.arc( actor.center[0] , actor.center[1], 10, 0, 2*Math.PI );
                        drawingContext.strokeStyle = actor.color ;
                        drawingContext.stroke();

                    }
                }
            );

            if (simulation.currentTime < simulation.total_time){
                requestAnimationFrame(simulation.render);
            }    
            
        },
        /**
         * first static preview of the Canvas contents
         */
        preemptiveRender: function(){
    
            clearCanvas();

            simulation.actors.forEach(
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
            simulation.currentTime = 0 ;
            simulation.deltaT = 0 ;

            cancelAnimationFrame();

            //simulation.preemptiveRender();
            
            console.log("This Simulation has been reset - - > Values are : " + JSON.stringify(simulation, null, 2));

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
                //SHOULD ALSO GET MASS AND STUFF
            }
        );

        simulation.preemptiveRender();

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




