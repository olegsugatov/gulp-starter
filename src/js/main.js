// console.log("!main.min.js");
var s = Snap("#svg"); // into body
var bigCircle = s.circle(150, 150, 100);


// SHAPES

// - circle
// x:200, y:400 canvas size
var s = Snap(600,100);
// cx: 150, cy: 150, r: 0 // c - center
var circle = s.circle(100, 40, 40);

// - rectangle
// x, y, w, h
var rect = s.rect(150, 0, 80, 80);

// - ellipse
// cx, cy, rx, ry
var ellipse = s.ellipse(280, 10, 40, 10);

// - rounded rectangle
// x, y, w, h, corners (2 or 1 param)
var roundRect = s.rect(330, 0, 80, 80,10);

// - line
// start piont, end point
var line = s.line(420, 0, 460, 80);
// nide stroke
line.attr({
	stroke: "#FDCD00"
});

var s = Snap();
// - polygon
var polygon = s.polyline(0,0,50,50,100,0,150,50,150,150,100,100,50,150,0,100);

// example my git
var s = Snap();
var Git_circle = s.circle(100, 40, 40);
Git_circle.attr( {
	fill:"#FDCD00"
});


// ATTRIBUTES

var s = Snap(200,200);
var Ycircle = s.circle(60, 60, 40);
	Ycircle.attr({
		fill: "#FDCD00",
		stroke: "#E6E6E6",
		strokeWidth: 4
		// "stroke-width": 4
	});
circle.attr();


// GROUP (COMBINE FIGURES)

var s = Snap(400,400);
var base = s.rect(50, 100, 100, 75);
var roof = s.polygon(35, 100, 165, 100, 100, 50);
// .g() - group 
var house = s.g(base,roof);
// .attr({})
house.attr ({
	fill: "#FDCD00"
});
// .add() to group 
var chimney = s.rect(65, 50, 15, 30);
house.add(chimney);


// TRANSFORMATION

// s.1  - size, 
// x, y - move from center to original coordimate)
// t100 - translation (movement)
// r45  - rotate 45
// house.transform("s1,50,100, r45,0,0, t10");
// house.transform("t10,0r45s.5");
house.transform("t10,0s.5");

// ANIMATION

// 1000 ms = 1sec
// house.animate({transform: "r45, 100, 150"}, 1000);
// house.animate({transform: "t100, 0"}, 1000);
// house.animate({transform: "s2,0,0r45,100,100t100,0"}, 1000);

// - callbacks
base.animate({height: 300}, 1000, mina.elastic, function() {
	// window.alert("Animation Complete!");
	house.animate({transform: 't200,0'}, 1000, mina.elastic,function(){
		base.animate({height: 100}, 1000, mina.elastic);
	});
});

// - easings (speed of animation)
// mina.easein, mina.easeout, mina.elastic, mina.easeinout


// LOAD EXTERNAL SVG

var icon = Snap("#icon_house");
Snap.load("../img/icon-house.svg", function(data) {
	icon.append(data);

// INTERACTIVE

	var house = icon.select("#house");
	house.attr({fill: "white"});

	var bg = icon.select("#bg");
	bg.attr({fill: "#2F62AD"});

	var ring = icon.select("#ring");
	ring.attr({fill: "#2F62AD"});

// - click
	icon.click(function() {
		// window.alert("click");
		house.animate({transform: 's1.3,100,100'}, 500, mina.elastic);
		ring.animate({transform: 's1.1,100,100'}, 500, mina.elastic);
		bg.animate({opacity: 1}, 200, mina.elastic);
	});

// - hover
	icon.hover(function() {
		house.animate({transform: 's1.1,100,100'}, 600, mina.elastic);
		ring.animate({transform: 's1.05,100,100'}, 500, mina.elastic);
		bg.animate({opacity: .7}, 200, mina.elastic);
	});

// - mouseout
	icon.mouseout(function() {
		house.animate({transform: 's1,100,100'}, 800, mina.elastic);
		ring.animate({transform: 's1,100,100'}, 500, mina.elastic);
		bg.animate({opacity: 1}, 200, mina.elastic);
	});
});



// post-test
// var icon_post = Snap("#icon_post");
// Snap.load("img/post.svg"), function(data) {
// 	icon_post.append(data);
// });
	// var post = icon.select("#");

var icon_post = Snap("#icon_post");
Snap.load("../img/post.svg", function(data) {
	icon_post.append(data);
});

