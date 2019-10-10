//initial declaration of canvas and context
const canvas = document.getElementById('game-window')

const ctx = canvas.getContext('2d');

//clears entire canvas when needed
function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//setting images to variables here for ease of calling them in game

const selectionWindow = document.getElementById("selection-window");
const gameOverWindow = document.getElementById("gameover-window");
const deathStatement = document.getElementById("deathStatement");
const youWinWindow = document.getElementById("you-win-window");
const winStatement = document.getElementById("winStatement")

const showHealth = document.getElementById("HEALTH");
const update = document.getElementById("message");

const selectTurtle = document.getElementById("selectTurtle");
const playTurtle = document.getElementById("playTurtle");
const winTurtle = document.getElementById("winTurtle")

const selectShark = document.getElementById("selectShark");
const playShark = document.getElementById("playShark");
const winShark = document.getElementById("winShark")

const selectWhale = document.getElementById("selectWhale");
const playWhale = document.getElementById("playWhale");
const winWhale = document.getElementById("winWhale");

const smallTrash = document.getElementById("smallTrash");
const medTrash = document.getElementById("plasticBagDebris");
const lrgTrash = document.getElementById("tireDebris");
const smallFood = document.getElementById("smallFood");
const fishFood = document.getElementById("foodFish");
const shrimp = document.getElementById("shrimpCocktail")

const upButton = document.getElementById("upButton");
const leftButton = document.getElementById("leftButton");
const downButton = document.getElementById("downButton");
const rightButton = document.getElementById("rightButton");

//declaration of Animal class
class Animal {
	constructor(animalImage, animalHeight, animalWidth, animalColor, animalSpeed, maxHealth, currentHealth){
		this.x = 40;
		this.y = 200;
		this.image = animalImage;
		this.height = animalHeight;
		this.width = animalWidth;
		this.color = animalColor;
		this.speed = animalSpeed;
		this.maxHealth = maxHealth
		this.currentHealth = currentHealth;
		this.direction = {
			up: false,
			right: false,
			down: false,
			left: false	
		}
	}
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
	dieMiserably() {
		// console.log("You have died in the cold, harsh, sea");
		stopAnimation();
		canvas.style.height = "0px";
		canvas.classList.add("hidden")
		gameOverWindow.classList.remove("hidden");
		gameOverWindow.style.height = "360px";
		deathStatement.classList.remove("hidden");
	}
	findMate () {
		// console.log("You are biologically successful in the cold, harsh, sea");
		stopAnimation();
		canvas.style.height = "0px";
		canvas.classList.add("hidden")
		youWinWindow.classList.remove("hidden");
		youWinWindow.style.height = "360px";
		winStatement.classList.remove("hidden");
		winTurtle.classList.remove("hidden");
		winShark.classList.remove("hidden");
		winWhale.classList.remove("hidden");
		game.animalWin.draw();
	}
}


//declaration of Food class
class Food {
	constructor(foodType, foodHeight, foodWidth, foodImage, foodSpeed, foodHealth){
		this.x = 620;
		this.y = (Math.random() * 300);
		this.type = foodType;
		this.height = foodHeight;
		this.width = foodWidth;
		this.image = foodImage;
		this.speed = foodSpeed;
		this.health = foodHealth;
	}
	draw() {
		ctx.drawImage(this.image, this.x, this.y);
	}

	move() {
		this.x -= this.speed;
		// if(this.x === 0){
		// 	this.x = canvas.width
		// 	this.y = (Math.random() * 300)
		// };
	}
}

// declaration of Garbage class
class Garbage {
	constructor(garbageType, garbageHeight, garbageWidth, garbageImage, garbageSpeed, garbageDamage){
		this.x = 620;
		this.y = (Math.random() * 300);
		this.type = garbageType;
		this.height = garbageHeight;
		this.width = garbageWidth;
		this.image = garbageImage;
		this.speed = garbageSpeed;
		this.damage = garbageDamage;
	}

	draw() {
		ctx.drawImage(this.image, this.x, this.y);
	}

	move() {
		this.x -= this.speed;
	}
}

//declaration of win condition class
class WinCondition {
	constructor(winImage, winHeight, winWidth, winColor, winSpeed){
		this.x = canvas.width;
		this.y = (Math.random() * 300);
		this.image = winImage;
		this.height = winHeight;
		this.width = winWidth;
		this.color = winColor;
		this.speed = winSpeed;
	}
	
	draw() {
		ctx.drawImage(this.image, this.x, this.y);
	}

	move() {
		this.x -= this.speed
		if(this.x === 0 - this.width) {
			setTimeout(() => {
				this.x = canvas.width + this.width
			}, 10000);
		};
	}
}



const game = {

	//variable instantiates new animal based on selectAnimal(whichAnimal) function
	animalHero: null,
	animalWin: null,
	time: 0,
	floatingDebris: [],
	foodItems: [],


	startTimer() {
		const interval = setInterval(() => {
			this.time += 1;

			this.createGarbage();
			this.createFood();

			if(this.animalHero.currentHealth <= 0){
				clearInterval(interval)
			}
		}, 700);
	},

	createGarbage() {
		// instantiate random garb, push to array
		let randNum = Math.floor(Math.random() * 3);
		const straw = new Garbage("STRAW", 20, 20, smallTrash, 4, 10);
		const bag = new Garbage("PLASTIC BAG", 32, 32, medTrash, 5, 15);
		const tire = new Garbage("TIRE", 60, 60, lrgTrash, 2, 25);
		if(randNum === 0) {
			this.floatingDebris.push(straw);
		}
		if(randNum === 1) {
			this.floatingDebris.push(bag);
		}
		if(randNum === 2) {
			this.floatingDebris.push(tire);
		}
	},

	drawGarbage() {
		for(let i = 0; i < this.floatingDebris.length; i++){
			this.floatingDebris[i].draw();
		}
	},

	moveGarbage() {
		for(let i = 0; i < this.floatingDebris.length; i++){
			this.floatingDebris[i].move();
			if(this.floatingDebris[i].x <= 0){
				this.floatingDebris.splice(i, 1);
			}
			if(game.animalHero.checkCollision(this.floatingDebris[i])) {
				if(game.animalHero.currentHealth > 0) {
					game.animalHero.currentHealth -= this.floatingDebris[i].damage;
					update.innerText = "EW! THAT WAS A " + this.floatingDebris[i].type + "!";
				}
				if(game.animalHero.currentHealth <= 0){
					game.animalHero.dieMiserably();
					update.innerText = "DEATH BY " + this.floatingDebris[i].type + "!";
				}
				this.floatingDebris.splice(i, 1);
			}
		}
	},
	createFood() {
		// instantiate random garb, push to array
		let randFood = Math.floor(Math.random() * 3);
		const jellyfish = new Food("JELLYFISH", 20, 20, smallFood, 2, 10);
		const smallFish = new Food("LIL FISH", 20, 32, fishFood, 5, 15);
		const shrimpCocktail = new Food("SHRIMP COCKTAIL", 20, 20, shrimp, 8, 50);
		if(randFood === 0) {
			this.foodItems.push(jellyfish);
		}
		if(randFood === 1) {
			this.foodItems.push(smallFish);
		}
		if(randFood === 2) {
			this.foodItems.push(shrimpCocktail);
		}
	},

	drawFood() {
		for(let i = 0; i < this.foodItems.length; i++){
			this.foodItems[i].draw();
		}
	},

	moveFood() {
		for(let i = 0; i < this.foodItems.length; i++){
			this.foodItems[i].move();
			if(this.foodItems[i].x <= 0){
				this.foodItems.splice(i, 1);
			}
			if(game.animalHero.checkCollision(this.foodItems[i])) {
				update.innerText = "YUM! A " + this.foodItems[i].type + "!";
				if(game.animalHero.currentHealth < game.animalHero.maxHealth) {
					game.animalHero.currentHealth += this.foodItems[i].health;
				}
				this.foodItems.splice(i, 1);
			}
		}
	},
	//animal selection screen, the first thing you see upon load
	selectAnimal(whichAnimal){
		canvas.classList.add("hidden");
		gameOverWindow.classList.add("hidden");
		gameOverWindow.style.height = "0px";
		deathStatement.classList.add("hidden");
		youWinWindow.classList.add("hidden");
		youWinWindow.style.height = "0px";
		winStatement.classList.add("hidden");
		selectionWindow.classList.remove("hidden");
		update.innerText = "CLICK ANIMAL TO BEGIN";
		if (whichAnimal == "turtle") {
			this.animalHero = new Animal(playTurtle, 40, 60, "green", 10, 50, 50)
			this.animalWin = new WinCondition(winTurtle, 40, 60, "green", 10)
			update.innerText = "GOOD LUCK TURTLE!";
		}
		else if (whichAnimal == "shark") {
			this.animalHero = new Animal(playShark, 60, 160, "grey", 5, 100, 100)
			this.animalWin = new WinCondition(winShark, 60, 160, "grey", 5, 100, 100)
			update.innerText = "GOOD LUCK SHARK!";
		}
		else if (whichAnimal == "whale") {
			this.animalHero = new Animal(playWhale, 100, 240, "lightblue", 2, 200, 200)
			this.animalWin = new WinCondition(winWhale, 100, 240, "lightblue", 2, 200)
			update.innerText = "GOOD LUCK WHALE!";
		}
	}
}
	



// //declare stop animation to be called upon game win/lose
// let requestID;
// let animationRunning = false;
//animate function is the start of the game
let x = 0;
function animate() {

	// animationRunning = true;

	selectionWindow.style.height = "0px";

	game.animalHero.move();
	game.moveFood();
	game.moveGarbage();
	//calls win condition animal every x seconds
	setTimeout(() => {
		game.animalWin.move();
	}, 30000);

	clearCanvas();

	game.drawGarbage();
	game.drawFood();
	game.animalWin.draw();
	game.animalHero.draw();
	showHealth.innerText = "HEALTH: " + game.animalHero.currentHealth;

	if(game.animalHero.checkCollision(game.animalWin)) {
		game.animalHero.findMate();
	}
	window.requestAnimationFrame(animate);
}

function stopAnimation() {
	cancelAnimationFrame(animate)
	animationRunning = false;	
};

game.selectAnimal();




////////////////////////////////////////////////////////
//// EVENT LISTENERS //// EXIST OUTSIDE GAME OBJECT ////

// set directions and abilities of Animals
document.addEventListener('keydown', (event) => {
	game.animalHero.setDirection(event.key);
});

// used to "pause" movement of Animals
document.addEventListener('keyup', (event) => {
	if(["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(event.key)) {
		game.animalHero.unsetDirection(event.key);
	}
})

//pick and start play as the turtle
selectTurtle.addEventListener('click', (event) => {
	selectionWindow.classList.add('hidden');
	selectionWindow.style.height = "0px";
	selectTurtle.classList.add("hidden");
	selectShark.classList.add("hidden");
	selectWhale.classList.add("hidden");
	game.selectAnimal("turtle");
	canvas.classList.remove('hidden');
	game.startTimer();
	animate();
	// game.startTheClock();
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
	game.startTimer();
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
	game.startTimer();
	animate();
});

upButton.addEventListener('mousedown', (event) => {
	game.animalHero.setDirection("ArrowUp")
})

rightButton.addEventListener('mousedown', (event) => {
	game.animalHero.setDirection("ArrowRight")
})

downButton.addEventListener('mousedown', (event) => {
	game.animalHero.setDirection("ArrowDown")
})

leftButton.addEventListener('mousedown', (event) => {
	game.animalHero.setDirection("ArrowLeft")
})

upButton.addEventListener('mouseup', (event) => {
	game.animalHero.unsetDirection("ArrowUp")
})

rightButton.addEventListener('mouseup', (event) => {
	game.animalHero.unsetDirection("ArrowRight")
})

downButton.addEventListener('mouseup', (event) => {
	game.animalHero.unsetDirection("ArrowDown")
})

leftButton.addEventListener('mouseup', (event) => {
	game.animalHero.unsetDirection("ArrowLeft")
})













