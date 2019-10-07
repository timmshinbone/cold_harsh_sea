//initial declaration of canvas and context
const canvas = document.getElementById('game-window')
console.log(canvas);



const ctx = canvas.getContext('2d');
console.log(ctx);

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//declaration of Animal class
class Animal {
	constructor(animalHeight, animalWidth, animalColor, animalSpeed){
		this.x = 40;
		this.y = 200
		this.height = animalHeight;
		this.width = animalWidth;
		this.color = animalColor;
		this.speed = animalSpeed;
		this.direction = {
			up: false,
			right: false,
			down: false,
			left: false	
		}
	}
	draw() {
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
	setDirection(key) {
		//pressing key moves character in direction
		//move called every 1/60th of a second regardless for smooth moves
		if(key == "ArrowUp") this.direction.up = true;
		if(key == "ArrowRight") this.direction.right = true;
		if(key == "ArrowDown") this.direction.down = true;
		if(key == "ArrowLeft") this.direction.left = true;
	}
		//releasing key stops movement
	unsetDirection(key) {
		if(key == "ArrowUp") this.direction.up = false;
		if(key == "ArrowRight") this.direction.right = false;
		if(key == "ArrowDown") this.direction.down = false;
		if(key == "ArrowLeft") this.direction.left = false;
	}
	move() {
		//call in animate - moves 60 fps
		//constrain movement outside of canvas per each direction
		if(this.direction.up) this.y -= this.speed
			if(this.y <= 0) {
				this.y = 0;
			}
		if(this.direction.right) this.x += this.speed
			if((this.x + this.width) >= canvas.width) {
				this.x = (canvas.width - this.width);
			}
		if(this.direction.down)	this.y += this.speed;
			if((this.y + this.height) >= canvas.height) {
				this.y = (canvas.height - this.height);
			}
		if(this.direction.left) this.x -= this.speed;
			if(this.x <= 0) {
				this.x = 0;
			}
	}
	checkCollision(thing) {
		if(
			this.x + this.width > thing.x &&
			this.x < thing.x + thing.width &&
			this.y + this.height > thing.y &&
			this.y < thing.y + thing.height
		)	{
			return true
		}
		else return false;
	}
}

const turtle = new Animal(40, 60, "green", 10);

const shark = new Animal(60, 160, "grey", 5);

const whale = new Animal(100, 240, "lightblue", 2);

// turtle.draw();

// shark.draw();

whale.draw();

//Turtle features
	// height: 40,
	// width: 60,
	// color: "green",
	// // src = "https://piskel-imgstore-b.appspot.com/img/c0b67c21-e89d-11e9-a815-55ce2b2bafad.gif",
	// speed: 10,


const smallFood = {
	x: 620,
	y: 250,
	height: 20,
	width: 20,
	color: "blue",
	draw() {
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fill();
	},
	move() {
		this.x -= 5;
		if(this.x === 0){
			this.x = canvas.width
			this.y = (Math.random() * 300)
		};
	}

}

// smallFood.draw();

let x = 0;
function animate(){

	smallFood.move();
	// turtle.move();
	// shark.move();
	whale.move();
	clearCanvas();
	// turtle.draw();
	// shark.draw();
	whale.draw();
	smallFood.draw();

	if(turtle.checkCollision(smallFood)) {
		console.log("You got some food!");
		smallFood.x = canvas.width;
		smallFood.y = (Math.random() * 300)
	}
	if(shark.checkCollision(smallFood)) {
		console.log("You got some food!");
		smallFood.x = canvas.width;
		smallFood.y = (Math.random() * 300)
	}
	if(whale.checkCollision(smallFood)) {
		console.log("You got some food!");
		smallFood.x = canvas.width;
		smallFood.y = (Math.random() * 300)
	}
	window.requestAnimationFrame(animate);
}




//// EVENT LISTENERS ////

document.addEventListener('keydown', (event) => {
	turtle.setDirection(event.key);
	shark.setDirection(event.key);
	whale.setDirection(event.key);
});

document.addEventListener('keyup', (event) => {
	if(["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(event.key)) {
		turtle.unsetDirection(event.key)
		shark.unsetDirection(event.key)
		whale.unsetDirection(event.key)
	}
})

document.getElementById('startButton').addEventListener('click', (event) => {
	animate();
});



















