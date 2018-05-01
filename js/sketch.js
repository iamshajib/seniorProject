// variable to hold a reference to our A-Frame world
var world;

// container for each planet
var mercuryContainer;
var venusContainer;
var earthContainer;

// each planet
var sun, mercury, venus, earth;

var box9, box1, box2, box3, box4;

var particles = [];


function setup() {
    // no canvas needed
    noCanvas();

    // construct the A-Frame world
    // this function requires a reference to the ID of the 'a-scene' tag in our HTML document
    world = new World('VRScene');

    // move the user back a bit
    world.setUserPosition(0, 0, 35);



    // create a bunch of particles
    noiseDetail(24);

    for (var i = 0; i < 100; i++) {
        particles.push(new Particle(-20, 0, 25));
    }



    // create the sun
    sun = new Sphere({
        x: 0,
        y: 0,
        z: 0,
        asset: "sun",
        radius: 5
    });
    world.add(sun);


    // container for mercury
    mercuryContainer = new Container3D({
        x: 0,
        y: 0,
        z: 0
    });
    world.add(mercuryContainer);

    // create mercury planet
    mercury = new Sphere({
        x: -7,
        y: 0,
        z: 0,
        red: 128,
        green: 128,
        blue: 128,
        radius: 0.5
    });
    // add to the mercury container
    mercuryContainer.addChild(mercury);

    // container for venus
    venusContainer = new Container3D({
        x: 0,
        y: 0,
        z: 0
    });
    world.add(venusContainer);

    // create venus planet
    venus = new Sphere({
        x: -15,
        y: 0,
        z: 0,
        asset: "venus",
        radius: 2
    });
    // add to venus container
    venusContainer.addChild(venus);


    // container for earth
    earthContainer = new Container3D({
        x: 0,
        y: 0,
        z: 0
    });
    world.add(earthContainer);

    // create earth planet
    earth = new Sphere({
        x: -20,
        y: 0,
        z: 0,
        radius: 2.5,
        asset: 'earth'
    });
    // add to container
    earthContainer.addChild(earth);






    workContainer = new Container3D({
        x: 15,
        y: 0,
        z: 10
    });
    world.add(workContainer);


        box9 = new Plane({
        x: -2,
        y: -2,
        z: 0,
        asset: 'workT'

    });

    workContainer.addChild(box9);

    box1 = new Box({
        x: 0,
        y: 0,
        z: 0,
//        scaleX: 1,
        asset: 'green',

        //        clickFunction: function (theBox) {
        //
        //            world.slideToObject(theBox, 2000);
        //        }
    });

    workContainer.addChild(box1);

    box2 = new Box({
        x: -2,
        y: 0,
        z: 0,
        asset: 'work2'

    });

    workContainer.addChild(box2);

       box3 = new Box({
        x: -4,
        y: 0,
        z: 0,
        asset: 'work3'

    });

    workContainer.addChild(box3);

       box4 = new Box({
        x: -6,
        y: 0,
        z: 0,
        asset: 'work4'

    });

    workContainer.addChild(box4);


}





function draw() {

    if (mouseIsPressed) {
        world.moveUserForward(0.05);
    }

    mercuryContainer.spinY(5);
    venusContainer.spinY(3);
    earthContainer.spinY(1);

    earth.spinY(5);
    venus.spinY(5);
    mercury.spinY(5);

    // move all particles
    for (var i = 0; i < particles.length; i++) {
        particles[i].move();
    }
}

function Particle(x, y, z) {
    // every particle needs its own asset
    this.myBox = new Box({
        x: x,
        y: y,
        z: z,
        red: random(255),
        green: random(255),
        blue: random(255),
        width: 0.25,
        height: 0.25,
        depth: 0.25
    });
    world.add(this.myBox);

    // every box is going to wander around, so it needs a Perlin noise offset
    this.noiseX = random(0, 1000);
    this.noiseY = random(2000, 3000);
    this.noiseZ = random(4000, 5000);

    // every box should be able to move
    this.move = function () {
        // compute how much to move using Perlin noise
        var moveX = map(noise(this.noiseX), 0, 1, -0.03, 0.03);
        var moveY = map(noise(this.noiseY), 0, 1, -0.03, 0.03);
        var moveZ = map(noise(this.noiseZ), 0, 1, -0.03, 0.03);

        // nudge the box
        this.myBox.nudge(moveX, moveY, moveZ);

        // make sure it doesn't leave the middle of the screen
        this.myBox.constrainPosition(-10, 10, 0, 10, -10, 10);

        // update Perlin noise offsets
        this.noiseX += 0.01;
        this.noiseY += 0.01;
        this.noiseZ += 0.01;

        // spin a bit, just for fun
        this.myBox.spinX(1);
    }
}
