// variable to hold a reference to our A-Frame world
var world;

// container for each planet
var mercuryContainer;
var venusContainer;
var earthContainer;

// each planet
var sun, mercury, venus, earth;

function setup() {
	// no canvas needed
	noCanvas();

	// construct the A-Frame world
	// this function requires a reference to the ID of the 'a-scene' tag in our HTML document
	world = new World('VRScene');

	// move the user back a bit
	world.setUserPosition(0, 0, 50);

	// create the sun
	sun = new Sphere({
			x: 0, y: 0, z: 0,
			asset: "sun",
			radius: 5
	});
	world.add(sun);

	// container for mercury
	mercuryContainer = new Container3D({
		x: 0, y: 0, z: 0
	});
	world.add(mercuryContainer);

	// create mercury planet
	mercury = new Sphere({
		x: -7, y: 0, z: 0,
		red: 128, green: 128, blue: 128,
		radius: 0.5
	});
	// add to the mercury container
	mercuryContainer.addChild( mercury );


	// container for venus
	venusContainer = new Container3D({
		x: 0, y: 0, z: 0
	});
	world.add(venusContainer);

	// create venus planet
	venus = new Sphere({
		x: -15, y:0, z: 0,
		asset: "venus",
		radius: 2
	});
	// add to venus container
	venusContainer.addChild( venus );



	// container for earth
	earthContainer = new Container3D({
		x: 0, y: 0, z: 0
	});
	world.add(earthContainer);

	// create earth planet
	earth = new Sphere({
		x: -20, y:0, z: 0,
		radius: 2.5,
		asset: 'earth'
	});
	// add to container
	earthContainer.addChild(earth);

}

function draw() {
	mercuryContainer.spinY(5);
	venusContainer.spinY(3);
	earthContainer.spinY(1);

	earth.spinY(5);
	venus.spinY(5);
	mercury.spinY(5);
}
