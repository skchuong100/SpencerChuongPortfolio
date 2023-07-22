const numShapes = 20; // Adjust the number of shapes here

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Shape {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 20 + 10;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.type = Math.random() < 0.3 ? "square" : Math.random() < 0.5 ? "triangle" : "circle";
    this.rotation = Math.random() * 360;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation * (Math.PI / 180));

    if (this.type === "square") {
      ctx.fillStyle = "#8F00FF";
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    } else if (this.type === "triangle") {
      ctx.fillStyle = "#DB00FF";
      ctx.beginPath();
      ctx.moveTo(0, -this.size / 2);
      ctx.lineTo(this.size / 2, this.size / 2);
      ctx.lineTo(-this.size / 2, this.size / 2);
      ctx.closePath();
      ctx.fill();
    } else if (this.type === "circle") {
      ctx.fillStyle = "#2400FF";
      ctx.beginPath();
      ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

const shapes = [];

function init() {
  for (let i = 0; i < numShapes; i++) {
    shapes.push(new Shape());
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < shapes.length; i++) {
    shapes[i].update();
    shapes[i].draw();
  }
}

init();
animate();