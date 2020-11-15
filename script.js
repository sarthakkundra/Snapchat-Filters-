/* Variables :-
1) Screen resolution
2) Tracker
3) Video screen
4) Filters
5) Selectors
*/

var outputWidth;
var outputHeight;

var faceTracker;
var videoInput;

var imgThugLifeGoggles;

var selected = -1;

// Load images for filters

function preload() {
    imgThugLifeGoggles = loadImage(`https://assets.stickpng.com/thumbs/584999b17b7d4d76317f6000.png`);
}
// Setup video feed, filter selector etc
function setup() {

    const maxWidth = Math.min(windowWidth, windowHeight);
    pixelDensity(1);
    outputWidth = maxWidth;
    outerHeight = outputWidth * 0.75;

    createCanvas(outputWidth, outerHeight);

    capture = createCapture(VIDEO);
    videoInput.size(outputWidth, outputHeight);
    videoInput.hide();

    const selector = createSelect();

    const list = ['thug life'];

    selector.option('Select a filter', -1);

    for(var i = 0; i < list.length; i++){
        selector.option(list[i], i);
    }
    selector.changed(applyFilter);

    faceTracker  = new clm.tracker();
    faceTracker.init();
    faceTracker.start(videoInput.elt);

}

function applyFilter() {
    selected = this.selected();
}

// Draw the filter

// Place the filter