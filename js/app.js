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
	speed: 2,
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
	}
}

turtle.draw();






//// EVENT LISTENERS ////

document.addEventListener('keydown', (event) => {
	turtle.move(event.key);
})





















