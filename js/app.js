//initial declaration of canvas and context
const canvas = document.getElementById('game-window')
console.log(canvas);



const ctx = canvas.getContext('2d');
console.log(ctx);

//clears entire canvas when needed
function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//setting images to variables here for ease of calling them in game

const selectionWindow = document.getElementById("selection-window")
const selectTurtle = document.getElementById("selectTurtle");
const playTurtle = document.getElementById("playTurtle")

const selectShark = document.getElementById("selectShark");
const playShark = document.getElementById("playShark")

const selectWhale = document.getElementById("selectWhale");
const playWhale = document.getElementById("playWhale");


//declaration of Animal class
class Animal {
	constructor(animalImage, animalHeight, animalWidth, animalColor, animalSpeed, animalHealth){
		this.x = 40;
		this.y = 200;
		this.image = animalImage;
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
	// draw() {
	// 	ctx.beginPath();
	// 	ctx.rect(this.x, this.y, this.width, this.height);
	// 	ctx.fillStyle = this.color;
	// 	ctx.fill();
	// }
	draw() {
		ctx.drawImage(this.image, this.x, this.y);
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


//declaration of Food class
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

// declaration of Garbage class
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


const game = {

	// playableAnimals: [
	// 	{turtle: new Animal(playTurtle, 40, 60, "green", 10, 50)},
	// 	{shark: new Animal(playShark, 60, 160, "grey", 5, 100)},
	// 	{whale: new Animal(playWhale, 100, 240, "lightblue", 2, 200)},
	// ],
	// turtle: new Animal(playTurtle, 40, 60, "green", 10, 50),
	// shark: new Animal(playShark, 60, 160, "grey", 5, 100),
	// whale: new Animal(playWhale, 100, 240, "lightblue", 2, 200),
	// turtle.draw();
	// shark.draw();
	// whale.draw();

	//variable instantiates new animal based on selectAnimal function
	animalHero: null,
	// animalHero: this.animalHeroArray[0],

	// foodObjects: [
	// 	{smallFood: new Food("small", 20, 20, "palegreen", 5, 10)},
	// ],
	smallFood: new Food("small", 20, 20, "palegreen", 5, 10),

	// floatingDebris: [
	// 	{smallGarbage: new Garbage("straw", 20, 20, "sienna", 5, 10)}
	// ],
	smallGarbage: new Garbage("straw", 20, 20, "sienna", 5, 10),

	selectAnimal(whichAnimal){
		canvas.classList.add("hidden");
		selectionWindow.classList.remove("hidden");
		if (whichAnimal == "turtle") {
			this.animalHero = new Animal(playTurtle, 40, 60, "green", 10, 50)
		}
		else if (whichAnimal == "shark") {
			this.animalHero = new Animal(playShark, 60, 160, "grey", 5, 100)
		}
		else if (whichAnimal == "whale") {
			this.animalHero = new Animal(playWhale, 100, 240, "lightblue", 2, 200)
		}
		// const turtleImage = document.getElementById("selectTurtle");
		// turtleImage.classList.remove("hidden");
		// const sharkButton = document.getElementById("selectShark");
		// sharkButton.classList.remove("hidden");
		// const whaleButton = document.getElementById("selectWhale");
		// whaleButton.classList.remove("hidden");
		// ctx.drawImage(turtleImage, 50, 50);
	},

}
//animate function is the start of the game
let x = 0;
function animate() {
	// game.turtle.move();
	// game.shark.move();
	// game.whale.move();
	game.animalHero.move();
	game.smallFood.move();
	game.smallGarbage.move();
	clearCanvas();
	// game.turtle.draw();
	// game.shark.draw();
	// game.whale.draw();
	game.smallFood.draw();
	game.smallGarbage.draw();
	game.animalHero.draw();

	// if(game.turtle.checkCollision(game.smallFood)) {
	// 	console.log("You got some food!")
	// 	console.log(game.turtle.health += game.smallFood.health);
	// 	game.smallFood.x = canvas.width;
	// 	game.smallFood.y = (Math.random() * 300)
	// }
	// if(game.shark.checkCollision(smallFood)) {
	// 	console.log("You got some food!");
	// 	smallFood.x = canvas.width;
	// 	smallFood.y = (Math.random() * 300)
	// }
	if(game.animalHero.checkCollision(game.smallFood)) {
		console.log("You got some food!");
		game.smallFood.x = canvas.width;
		game.smallFood.y = (Math.random() * 300)
	}
	if(game.animalHero.checkCollision(game.smallGarbage)) {
		console.log("You got nailed by some garbage!");
		console.log(game.animalHero.health -= game.smallGarbage.damage);
		game.smallGarbage.x = canvas.width;
		game.smallGarbage.y = (Math.random() * 300)
	}
	window.requestAnimationFrame(animate);
}

game.selectAnimal();


// const health = document.getElementById("HEALTH");
// health.innerText("HEALTH: " + turtle.health);





////////////////////////////////////////////////////////
//// EVENT LISTENERS //// EXIST OUTSIDE GAME OBJECT ////

// set directions and abilities of Animals
document.addEventListener('keydown', (event) => {
	// game.turtle.setDirection(event.key);
	// game.shark.setDirection(event.key);
	// game.whale.setDirection(event.key);
	game.animalHero.setDirection(event.key);
});

// used to "pause" movement of Animals
document.addEventListener('keyup', (event) => {
	if(["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(event.key)) {
		// game.turtle.unsetDirection(event.key);
		// game.shark.unsetDirection(event.key);
		// game.whale.unsetDirection(event.key);
		game.animalHero.unsetDirection(event.key);
	}
})


// start the animation frames
// document.getElementById('startButton').addEventListener('click', (event) => {
// 	animate();
// });

//pick and start play as the turtle
selectTurtle.addEventListener('click', (event) => {
	selectionWindow.classList.add('hidden');
	selectionWindow.style.height = "0px";
	selectTurtle.classList.add("hidden");
	selectShark.classList.add("hidden");
	selectWhale.classList.add("hidden");
	game.selectAnimal("turtle");
	canvas.classList.remove('hidden');
	console.log(game.animalHero)
	animate();
});

//pick and start play as the shark
selectShark.addEventListener('click', (event) => {
	selectionWindow.classList.add('hidden');
	selectionWindow.style.height = "0px";
	selectTurtle.classList.add("hidden");
	selectShark.classList.add("hidden");
	selectWhale.classList.add("hidden");
	game.selectAnimal("shark");
	canvas.classList.remove('hidden');
	console.log(game.animalHero)
	animate();
});

//pick and start play as the whale
selectWhale.addEventListener('click', (event) => {
	selectionWindow.classList.add('hidden');
	selectionWindow.style.height = "0px";
	selectTurtle.classList.add("hidden");
	selectShark.classList.add("hidden");
	selectWhale.classList.add("hidden");
	game.selectAnimal("whale");
	canvas.classList.remove('hidden');
	console.log(game.animalHero)
	animate();
});















