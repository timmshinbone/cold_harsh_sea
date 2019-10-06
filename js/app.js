//initial declaration of canvas and context
const canvas = document.getElementById('game-window')
console.log(canvas);

const ctx = canvas.getContext('2d');
console.log(ctx);

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//declaration of turtle object
const turtle = {
	x: 40,
	y: 200,
	height: 40,
	width: 60,
	color: "green",
	speed: 20,
	direction: {
		up: false,
		right: false,
		down: false,
		left: false	
	},
	draw() {
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fill();
	},
	move(direction) {
		if(direction === "ArrowUp") {
			this.direction.up = true;
			this.y -= this.speed;
			if(this.y <= 0) {
				this.y = 0;
			}
		}
		if(direction === "ArrowRight") {
			this.direction.right = true;
			this.x += this.speed;
			if((this.x + this.width) >= canvas.width) {
				this.x = (canvas.width - this.width);
			}
		}
		if(direction === "ArrowDown") {
			this.direction.down = true;
			this.y += this.speed;
			if((this.y + this.height) >= canvas.height) {
				this.y = (canvas.height - this.height);
			}
		}
		if(direction === "ArrowLeft") {
			this.direction.left = true;
			this.x -= this.speed;
			if(this.x <= 0) {
				this.x = 0;
			}
		}
		clearCanvas();
		this.draw();
		smallFood.draw()
	},
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

turtle.draw();

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

smallFood.draw();

let x = 0;
function animate(){
	console.log(++x);

	smallFood.move();
	clearCanvas();
	smallFood.draw();
	turtle.draw();

	if(turtle.checkCollision(smallFood)) {
		console.log("You got some food!");
	}
	window.requestAnimationFrame(animate);
}




//// EVENT LISTENERS ////

document.addEventListener('keydown', (event) => {
	turtle.move(event.key);
});

document.getElementById('startButton').addEventListener('click', (event) => {
	animate();
});



















