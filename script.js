/* Variables :-
1) Screen resolution
2) Tracker
3) Video screen
4) Filters
5) Selectors
*/

let outputWidth;
let outputHeight;

let faceTracker;
let videoInput;

let imgThugLifeGoggles;

let selected = -1;

// Load images for filters

function preload() {
	// Thug life assets
	imgThugLifeGoggles = loadImage("goggles.png");

	// Dog assets
	imgDogEarRight = loadImage("https://i.ibb.co/bFJf33z/dog-ear-right.png");
	imgDogEarLeft = loadImage("https://i.ibb.co/dggwZ1q/dog-ear-left.png");
	imgDogNose = loadImage("https://i.ibb.co/PWYGkw1/dog-nose.png");
}
// Setup video feed, filter selector etc
function setup() {
	windowResized();

	createCanvas(outputWidth, outerHeight);

	videoInput = createCapture(VIDEO);
	videoInput.size(outputWidth, outputHeight);
	videoInput.hide();

	const selector = createSelect();

	const list = ["thug life", "dog filter"];

	selector.option("Select a filter", -1);

	for (var i = 0; i < list.length; i++) {
		selector.option(list[i], i);
	}
	selector.changed(applyFilter);

	faceTracker = new clm.tracker();
	faceTracker.init();
	console.log(faceTracker);
	faceTracker.start(videoInput.elt);
}

function applyFilter() {
	selected = this.selected();
}

// Draw the filter

function draw() {
	image(videoInput, 0, 0, outputWidth, outputHeight);

	switch (selected) {
		case "-1":
			break;
		case "0":
			drawThugLifeGoggles();
			break;
		case "1":
			drawDogFilter();
			break;
	}
}

// Place the filter

function drawThugLifeGoggles() {
	const positions = faceTracker.getCurrentPosition();
	console.log(positions);
	if (positions !== false) {
		push();
		const widthX = Math.abs(positions[14][0] - positions[1][0]) * 1.2;

		const widthY =
			Math.abs(positions[7][1] - Math.min(positions[16][1], positions[20][1])) *
			1.2;

		translate(-widthX / 2, -widthY / 2);

		image(
			imgThugLifeGoggles,
			positions[62][0],
			positions[63][1],
			widthX,
			widthY
		);
		pop();
	}
}

function drawDogFilter() {
	const positions = faceTracker.getCurrentPosition();
	if (positions !== false) {
		if (positions.length >= 20) {
			push();
			translate(-100, -150);
			image(imgDogEarRight, positions[20][0], positions[20][1]);
			pop();
		}

		if (positions.length >= 16) {
			push();
			translate(-20, -150);
			image(imgDogEarLeft, positions[16][0], positions[16][1]);
			pop();
		}
		if (positions.length >= 62) {
			push();
			translate(-57, -20); // offset adjustment
			image(imgDogNose, positions[62][0], positions[62][1]);
			pop();
		}
	}
}

function windowResized() {
	const maxWidth = Math.min(windowWidth, windowHeight);
	pixelDensity(1);
	outputWidth = maxWidth;
	outputHeight = maxWidth * 0.75; // 4:3
	resizeCanvas(outputWidth, outputHeight);
}
