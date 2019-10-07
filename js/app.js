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
	constructor(animalType, animalHeight, animalWidth, animalColor, animalSpeed, animalHealth){
		this.x = 40;
		this.y = 200;
		this.type = animalType;
		this.height = animalHeight;
		this.width = animalWidth;
		this.color = animalColor;
		this.speed = animalSpeed;
		this.health = animalHealth;
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

const turtle = new Animal("turtle", 40, 60, "green", 10, 50);

const shark = new Animal("shark", 60, 160, "grey", 5, 100);

const whale = new Animal("whale", 100, 240, "lightblue", 2, 200);

turtle.draw();

// shark.draw();

// whale.draw();

class Food {
	constructor(foodType, foodHeight, foodWidth, foodColor, foodSpeed, foodHealth){
		this.x = 620;
		this.y = 250;
		this.type = foodType;
		this.height = foodHeight;
		this.width = foodWidth;
		this.color = foodColor;
		this.speed = foodSpeed;
		this.health = foodHealth;
	}
	draw() {
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
	move() {
		this.x -= this.speed;
		if(this.x === 0){
			this.x = canvas.width
			this.y = (Math.random() * 300)
		};
	}
}

const smallFood = new Food("small", 20, 20, "palegreen", 5, 10);

class Garbage {
	constructor(garbageType, garbageHeight, garbageWidth, garbageColor, garbageSpeed, garbageDamage){
		this.x = 620;
		this.y = 125;
		this.type = garbageType;
		this.height = garbageHeight;
		this.width = garbageWidth;
		this.color = garbageColor;
		this.speed = garbageSpeed;
		this.damage = garbageDamage;
	}
	draw() {
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
	move() {
		this.x -= this.speed;
		if(this.x === 0){
			this.x = canvas.width
			this.y = (Math.random() * 300)
		}
	}
}

const smallGarbage = new Garbage("straw", 20, 20, "sienna", 5, 10);



let x = 0;
function animate(){

	turtle.move();
	// shark.move();
	// whale.move();
	smallFood.move();
	smallGarbage.move();
	clearCanvas();
	turtle.draw();
	// shark.draw();
	// whale.draw();
	smallFood.draw();
	smallGarbage.draw();

	if(turtle.checkCollision(smallFood)) {
		console.log("You got some food!")
		console.log(turtle.health += smallFood.health);
		smallFood.x = canvas.width;
		smallFood.y = (Math.random() * 300)
	}
	// if(shark.checkCollision(smallFood)) {
	// 	console.log("You got some food!");
	// 	smallFood.x = canvas.width;
	// 	smallFood.y = (Math.random() * 300)
	// }
	// if(whale.checkCollision(smallFood)) {
	// 	console.log("You got some food!");
	// 	smallFood.x = canvas.width;
	// 	smallFood.y = (Math.random() * 300)
	// }
	if(turtle.checkCollision(smallGarbage)) {
		console.log("You got nailed by some garbage!");
		console.log(turtle.health -= smallGarbage.damage);
		smallGarbage.x = canvas.width;
		smallGarbage.y = (Math.random() * 300)
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



















