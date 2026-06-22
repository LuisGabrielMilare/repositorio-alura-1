const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Jogador
const player = {
  x: 400,
  y: 300,
  size: 20,
  speed: 4
};

let keys = {};
let wood = 0;
let hunger = 100;
let time = 0; // 0 = dia, 1 = noite

// Árvores simples
let trees = [];

for (let i = 0; i < 25; i++) {
  trees.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 25
  });
}

// inimigo simples
let monster = {
  x: 100,
  y: 100,
  size: 25,
  speed: 1.5
};

// CONTROLES
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

function update() {

  // movimento
  if (keys["w"]) player.y -= player.speed;
  if (keys["s"]) player.y += player.speed;
  if (keys["a"]) player.x -= player.speed;
  if (keys["d"]) player.x += player.speed;

  // colher madeira
  trees.forEach((t, i) => {
    let dx = player.x - t.x;
    let dy = player.y - t.y;
    let dist = Math.sqrt(dx*dx + dy*dy);

    if (dist < 30 && keys["e"]) {
      wood++;
      trees.splice(i, 1);
    }
  });

  // fome diminui
  hunger -= 0.02;

  // ciclo dia/noite
  time += 0.0005;
  if (time > 1) time = 0;

  // monstro persegue à noite
  if (time > 0.5) {
    let dx = player.x - monster.x;
    let dy = player.y - monster.y;
    let dist = Math.sqrt(dx*dx + dy*dy);

    monster.x += (dx / dist) * monster.speed;
    monster.y += (dy / dist) * monster.speed;
  }

  // UI
  document.getElementById("wood").innerText = wood;
  document.getElementById("hunger").innerText = Math.floor(hunger);
  document.getElementById("time").innerText = time > 0.5 ? "Noite" : "Dia";
}

function draw() {

  // fundo muda com dia/noite
  ctx.fillStyle = time > 0.5 ? "#05070f" : "#1c2b1c";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // árvores
  ctx.fillStyle = "green";
  trees.forEach(t => {
    ctx.fillRect(t.x, t.y, t.size, t.size);
  });

  // jogador
  ctx.fillStyle = "white";
  ctx.fillRect(player.x, player.y, player.size, player.size);

  // monstro
  ctx.fillStyle = "red";
  ctx.fillRect(monster.x, monster.y, monster.size, monster.size);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();