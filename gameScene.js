// gameScene.js
// ==================== NIVELES (más grandes y rectangulares) ====================
function scoreFromTimeMs(timeMs) {
  const MAX_SEC = 180; // 3 min
  const sec = Math.max(0, timeMs / 1000);
  const ratio = 1 - Math.min(sec / MAX_SEC, 1);
  const puntos = Math.round(ratio * 100);
  return Math.max(0, Math.min(100, puntos));
}

function enviarYFinalizarTiempo({ gameId, playerName, playerId, timeMs }) {
  const urlNodeRED = "https://nr6.iot-uma.es/score";

  const puntos = scoreFromTimeMs(timeMs);

  window.misControlesIoT = window.misControlesIoT || {};
  window.misControlesIoT.nombre = playerName ?? window.misControlesIoT.nombre ?? "Jugador";
  window.misControlesIoT.objetivo = gameId ?? window.misControlesIoT.objetivo ?? "laberinto";

  fetch(urlNodeRED, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      puntos_finales: puntos,                 // ✅ 0..100
      objetivo: window.misControlesIoT.objetivo,
      nombre: window.misControlesIoT.nombre,
      estado: "TERMINADO",
      accion: "CERRAR_JUEGO",

      // extra opcional
      playerId: playerId ?? null,
      timeMs,
      timeSec: Math.round((timeMs / 1000) * 100) / 100,
      ts: Date.now()
    })
  })
    .then(() => console.log("Notificación enviada a Node-RED correctamente"))
    .catch(err => console.error("Error al notificar fin a Node-RED:", err));
}


const MAZES = {
  1: {
    name: "Nivel 1 (Rectangular)",
    difficulty: "PRINCIPIANTE",
    maze: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    start: { r: 1, c: 1 },
    goal: { r: 17, c: 29 }
  },

  2: {
    name: "Nivel 2 (Más complicado)",
    difficulty: "INTERMEDIO",
    maze: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    start: { r: 1, c: 1 },
    goal: { r: 19, c: 31 }
  },

  3: {
    name: "Nivel 3 (Largo y duro)",
    difficulty: "AVANZADO",
    maze: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    start: { r: 1, c: 1 },
    goal: { r: 17, c: 33 }
  }
};

// ==================== SCENE ====================
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });

    this.currentLevel = 1;
    this.totalLevels = 3;


    this.playerAvatar = null;       // imagen phaser del personaje
    this.currentAvatar = "chicoazul";

    this.playerName = "Jugador";
    this.playerId = null;


    this.moveForce = 0.0026;
    this.maxBallSpeed = 12;

    this.padding = 24;
    this.sidebarW = 300;

    this.cellSize = 40;
    this.offsetX = 0;
    this.offsetY = 0;
    this.mazeW = 0;
    this.mazeH = 0;

    this.ball = null;
    this.goal = null;
    this.walls = [];
    this.frame = [];
    this.floor = null;

    this.cursors = null;
    this.keyA = null;
    this.keyD = null;
    this.keyW = null;
    this.keyS = null;
    this.keyR = null;

    this.isTransitioning = false;
    this._levelTimers = [];
    this._collisionHandler = null;

    this.startTime = 0;
    this.totalTimeMs = 0;

    this.sideBg = null;
    this.hudLevelSmall = null;
    this.hudLevelTime = null;
    this.hudTotalTime = null;

    this.titleText = null;
    this.msgText = null;

    this._startPos = { x: 0, y: 0 };

    this.BASE_ROWS = 21;
    this.BASE_COLS = 33;
    this.fixedCellSize = null;

    // --- SENSOR (desde Node-RED -> postMessage) ---
    this.sensorX = 0;        // izquierda/derecha
    this.sensorY = 0;        // arriba/abajo (opcional)
    this.sensorDeadZone = 3; // zona muerta (ajusta 2..8 según tu sensor)
    this.sensorMax = 30;     // valor a partir del cual consideras "máximo" (ej: 30º)
    this.useSensor = true;   // por si quieres desactivarlo rápido


  }

  preload() {
    this.createTextures();

    // (Opcional) log si algo falla cargando
    this.load.on("loaderror", (file) => {
      console.log("❌ ERROR cargando:", file.src, "key:", file.key);
    });

    // ✅ precargar TODOS los personajes
    const AVATARS = [
      "chicoazul", "chicoamarillo", "chicorojo", "chicoverde",
      "chicaazul", "chicaamarillo", "chicarosa", "chicaverde"
    ];

    AVATARS.forEach(name => {
      this.load.image("avatar_" + name, "./assets/" + name + ".png");
    });
  }



  createTextures() {
    const bg = this.add.graphics();
    bg.fillStyle(0x0b1020, 1);
    bg.fillRect(0, 0, 1920, 1080);
    bg.fillStyle(0x24104a, 0.35);
    bg.fillRect(0, 0, 1920, 540);
    bg.fillStyle(0x0d3b66, 0.25);
    bg.fillRect(0, 360, 1920, 720);
    for (let i = 0; i < 160; i++) {
      const x = Math.random() * 1920;
      const y = Math.random() * 1080;
      const a = 0.25 + Math.random() * 0.6;
      bg.fillStyle(0xffffff, a);
      bg.fillCircle(x, y, 1 + Math.random() * 1.2);
    }
    bg.generateTexture("bg", 1920, 1080);
    bg.destroy();

    const floor = this.add.graphics();
    floor.fillStyle(0x142033, 1);
    floor.fillRect(0, 0, 160, 160);
    floor.lineStyle(2, 0x34d3ff, 0.12);
    for (let i = 0; i <= 160; i += 20) {
      floor.lineBetween(i, 0, i, 160);
      floor.lineBetween(0, i, 160, i);
    }
    for (let i = 0; i < 14; i++) {
      floor.fillStyle(0xff4fd8, 0.08);
      floor.fillCircle(Math.random() * 160, Math.random() * 160, 6 + Math.random() * 10);
    }
    floor.generateTexture("mazeFloor", 160, 160);
    floor.destroy();

    const wall = this.add.graphics();
    wall.fillStyle(0x6c2bd9, 1);
    wall.fillRoundedRect(0, 0, 64, 64, 12);
    wall.lineStyle(4, 0x00e5ff, 0.9);
    wall.strokeRoundedRect(2, 2, 60, 60, 10);
    wall.fillStyle(0xffffff, 0.12);
    wall.beginPath();
    wall.moveTo(10, 10);
    wall.lineTo(34, 10);
    wall.lineTo(54, 30);
    wall.lineTo(30, 30);
    wall.closePath();
    wall.fillPath();
    wall.generateTexture("wall", 64, 64);
    wall.destroy();

    const ball = this.add.graphics();
    ball.fillStyle(0xffc857, 1);
    ball.fillCircle(24, 24, 20);
    ball.fillStyle(0xff7a18, 0.9);
    ball.fillCircle(24, 24, 16);
    ball.fillStyle(0xffffff, 0.55);
    ball.fillCircle(16, 14, 7);
    ball.lineStyle(3, 0x2a1b0a, 0.6);
    ball.strokeCircle(24, 24, 20);
    ball.generateTexture("ball", 48, 48);
    ball.destroy();

    const goal = this.add.graphics();
    goal.fillStyle(0x00f5a0, 0.25);
    goal.fillCircle(32, 32, 30);
    goal.fillStyle(0x00f5a0, 1);
    goal.fillCircle(32, 32, 22);
    goal.fillStyle(0x00c67b, 0.9);
    goal.fillCircle(32, 32, 15);
    goal.lineStyle(3, 0x062016, 0.5);
    goal.strokeCircle(32, 32, 22);
    goal.generateTexture("goal", 64, 64);
    goal.destroy();
  }

  create() {
    this.MBody = Phaser.Physics.Matter.Matter.Body;

    // ✅ escuchar config desde Node-RED (si te mandan personaje/jugadorNombre/id)
    window.addEventListener("message", (e) => {
      if (!e.data) return;

      // nombre/id (si lo usas)
      if (e.data.jugadorNombre !== undefined) this.playerName = e.data.jugadorNombre;
      if (e.data.playerName !== undefined) this.playerName = e.data.playerName;

      if (e.data.jugadorId !== undefined) this.playerId = e.data.jugadorId;
      if (e.data.playerId !== undefined) this.playerId = e.data.playerId;

      // ✅ sensor X/Y
      if (e.data.angulo !== undefined) this.sensorX = Number(e.data.angulo) || 0;
      if (e.data.anguloY !== undefined) this.sensorY = Number(e.data.anguloY) || 0;



      // ✅ personaje -> cambia avatar
      if (e.data.personaje !== undefined) {
        this.setAvatar(e.data.personaje);
      }
    });


    const bg = this.add.image(0, 0, "bg").setOrigin(0, 0);
    bg.setDisplaySize(this.scale.width, this.scale.height);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    this.matter.world.engine.gravity.x = 0;
    this.matter.world.engine.gravity.y = 0;

    const availableW = this.scale.width - this.sidebarW - this.padding * 3;
    const availableH = this.scale.height - this.padding * 2;
    this.fixedCellSize = Math.floor(Math.min(availableW / this.BASE_COLS, availableH / this.BASE_ROWS) * 0.92);
    this.fixedCellSize = Math.max(this.fixedCellSize, 18);

    this.buildRightHud();





    // ✅ título arriba del laberinto (solo dificultad)
    const titleStyle = {
      fontFamily: "Arial, sans-serif",
      fontSize: 40,
      color: "#b8ffda",
      stroke: "#071022",
      strokeThickness: 10
    };
    this.titleText = this.add.text(0, 0, "", titleStyle).setOrigin(0.5);
    this.titleText.setDepth(1000);

    // Mensaje central (solo win / reset / fin)
    const msgStyle = {
      fontFamily: "Arial, sans-serif",
      fontSize: 44,
      color: "#ffd36b",
      stroke: "#071022",
      strokeThickness: 7
    };
    this.msgText = this.add.text(this.scale.width / 2, this.scale.height / 2, "", msgStyle).setOrigin(0.5);
    this.msgText.setDepth(1000);

    this.totalTimeMs = 0;
    this.loadLevel(this.currentLevel);
  }

  setAvatar(nombre) {
    const personaje = (nombre && String(nombre).trim())
      ? String(nombre).trim()
      : "chicoazul";

    this.currentAvatar = personaje;

    // si HUD aún no existe, solo guardamos el nombre
    if (!this.playerAvatar) return;

    const key = "avatar_" + personaje;

    // si no existe esa textura, fallback al default
    if (this.textures.exists(key)) {
      this.playerAvatar.setTexture(key);
    } else {
      this.playerAvatar.setTexture("avatar_chicoazul");
    }
  }




  buildRightHud() {
    const x = this.scale.width - this.sidebarW;
    const y = this.padding;
    const w = this.sidebarW - this.padding;
    const h = this.scale.height - this.padding * 2;

    this.sideBg = this.add.graphics();
    this.sideBg.fillStyle(0x0b1020, 0.55);
    this.sideBg.fillRoundedRect(x, y, w, h, 18);
    this.sideBg.lineStyle(2, 0x34d3ff, 0.25);
    this.sideBg.strokeRoundedRect(x, y, w, h, 18);
    this.sideBg.setDepth(900);

    const textStyle = {
      fontFamily: "Arial, sans-serif",
      fontSize: 22,
      color: "#f1f5ff",
      stroke: "#071022",
      strokeThickness: 6
    };

    this.hudLevelSmall = this.add.text(x + 18, y + 18, "Nivel: 1/3", {
      ...textStyle,
      color: "#b8ffda",
      fontSize: 24
    }).setDepth(950);

    this.hudLevelTime = this.add.text(x + 18, y + 70, "Tiempo nivel: 0:00", textStyle).setDepth(950);
    this.hudTotalTime = this.add.text(x + 18, y + 112, "Tiempo total: 0:00", {
      ...textStyle,
      color: "#ffd36b"
    }).setDepth(950);

    this.add.text(
      x + 18,
      y + h - 140,
      "Controles:\nInclina el mando! / WASD\nR: reiniciar\n\nObjetivo:\nLlega al verde",
      {
        fontFamily: "Arial, sans-serif",
        fontSize: 18,
        color: "#cbd5ff",
        lineSpacing: 6
      }
    ).setDepth(950);

    const avatarX = x + (w / 2);
    const avatarY = y + 180;

    this.playerAvatar = this.add.image(avatarX, avatarY, "avatar_chicoazul")
      .setOrigin(0.5)
      .setDepth(960);

    this.playerAvatar.setDisplaySize(90, 90);

    // aplica el avatar actual (por si ya llegó mensaje antes)
    this.setAvatar(this.currentAvatar);




  }

  clearLevelResources() {
    this.isTransitioning = false;

    for (const t of this._levelTimers) {
      if (t && !t.hasDispatched) t.remove(false);
    }
    this._levelTimers = [];

    if (this._collisionHandler) {
      this.matter.world.off("collisionstart", this._collisionHandler);
      this._collisionHandler = null;
    }

    if (this.goal) this.tweens.killTweensOf(this.goal);
    if (this.msgText) this.tweens.killTweensOf(this.msgText);

    if (this.floor && this.floor.active) this.floor.destroy();
    this.floor = null;

    for (const w of this.walls) {
      if (w && w.body) this.matter.world.remove(w.body);
      if (w && w.obj && w.obj.active) w.obj.destroy();
    }
    this.walls = [];

    for (const f of this.frame) {
      if (f && f.body) this.matter.world.remove(f.body);
      if (f && f.obj && f.obj.active) f.obj.destroy();
    }
    this.frame = [];

    if (this.ball && this.ball.body) this.matter.world.remove(this.ball.body);
    if (this.ball && this.ball.active) this.ball.destroy();
    this.ball = null;

    if (this.goal && this.goal.body) this.matter.world.remove(this.goal.body);
    if (this.goal && this.goal.active) this.goal.destroy();
    this.goal = null;
  }

  loadLevel(levelNum) {
    this.clearLevelResources();
    this.startTime = this.time.now;

    const levelData = MAZES[levelNum];
    const MAZE = levelData.maze;
    const rows = MAZE.length;
    const cols = MAZE[0].length;

    this.cellSize = this.fixedCellSize;
    this.mazeW = cols * this.cellSize;
    this.mazeH = rows * this.cellSize;

    const leftAreaW = this.scale.width - this.sidebarW - this.padding * 2;
    const leftAreaX = this.padding;
    this.offsetX = Math.floor(leftAreaX + (leftAreaW - this.mazeW) / 2);
    this.offsetY = Math.floor((this.scale.height - this.mazeH) / 2);

    this.floor = this.add.tileSprite(this.offsetX, this.offsetY, this.mazeW, this.mazeH, "mazeFloor")
      .setOrigin(0, 0);
    this.floor.setDepth(-1);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (MAZE[r][c] === 1) {
          const x = this.offsetX + c * this.cellSize + this.cellSize / 2;
          const y = this.offsetY + r * this.cellSize + this.cellSize / 2;

          const wall = this.add.image(x, y, "wall");
          wall.setDisplaySize(this.cellSize, this.cellSize);

          this.matter.add.gameObject(wall, {
            isStatic: true,
            friction: 1.0,
            frictionStatic: 1.4,
            restitution: 0.02,
            slop: 0.01
          });

          this.walls.push({ obj: wall, body: wall.body });
        }
      }
    }

    this.buildFrame();

    const start = levelData.start;
    const startX = this.offsetX + start.c * this.cellSize + this.cellSize / 2;
    const startY = this.offsetY + start.r * this.cellSize + this.cellSize / 2;
    this._startPos = { x: startX, y: startY };

    this.ball = this.add.image(startX, startY, "ball");
    const ballDiameter = Math.floor(this.cellSize * 0.45);
    this.ball.setDisplaySize(ballDiameter, ballDiameter);

    const radius = Math.floor(ballDiameter / 2);
    this.matter.add.gameObject(this.ball, {
      shape: { type: "circle", radius },
      friction: 0.09,
      frictionAir: 0.06,
      frictionStatic: 0.3,
      restitution: 0.12,
      density: 0.0022,
      slop: 0.01
    });

    const goal = levelData.goal;
    const goalX = this.offsetX + goal.c * this.cellSize + this.cellSize / 2;
    const goalY = this.offsetY + goal.r * this.cellSize + this.cellSize / 2;

    this.goal = this.add.image(goalX, goalY, "goal");
    this.goal.setDisplaySize(this.cellSize * 0.60, this.cellSize * 0.60);
    this.matter.add.gameObject(this.goal, { isStatic: true, isSensor: true });

    this.tweens.add({
      targets: this.goal,
      alpha: 0.55,
      duration: 650,
      yoyo: true,
      repeat: -1
    });

    // ✅ título: SOLO dificultad (sin duplicar con msg)
    this.titleText.setText(levelData.difficulty || "NIVEL");
    this.titleText.setPosition(this.offsetX + this.mazeW / 2, this.offsetY - 46);
    this.titleText.setDepth(1200);

    // HUD derecha
    this.hudLevelSmall.setText(`Nivel: ${this.currentLevel}/${this.totalLevels}`);

    // ✅ quita el msg de “🚀 ...” para no duplicar título
    this.msgText.setText("");
    this.msgText.setAlpha(0);


    this._collisionHandler = (event) => {
      if (this.isTransitioning) return;
      for (const pair of event.pairs) {
        const a = pair.bodyA.gameObject;
        const b = pair.bodyB.gameObject;
        if (!a || !b) continue;

        if ((a === this.ball && b === this.goal) || (a === this.goal && b === this.ball)) {
          this.winLevel();
          break;
        }
      }
    };
    this.matter.world.on("collisionstart", this._collisionHandler);
  }

  buildFrame() {
    const t = Math.max(26, Math.floor(this.cellSize * 0.75));
    const cx = this.offsetX + this.mazeW / 2;
    const cy = this.offsetY + this.mazeH / 2;

    const topY = this.offsetY - t / 2;
    const botY = this.offsetY + this.mazeH + t / 2;
    const leftX = this.offsetX - t / 2;
    const rightX = this.offsetX + this.mazeW + t / 2;

    const horizW = this.mazeW + 2 * t;
    const horizH = t;
    const vertW = t;
    const vertH = this.mazeH + 2 * t;

    const make = (x, y, w, h) => {
      const part = this.add.image(x, y, "wall");
      part.setDisplaySize(w, h);
      part.setAlpha(0.90);

      this.matter.add.gameObject(part, {
        isStatic: true,
        friction: 1.0,
        frictionStatic: 1.6,
        restitution: 0.02,
        slop: 0.01
      });

      this.frame.push({ obj: part, body: part.body });
    };

    make(cx, topY, horizW, horizH);
    make(cx, botY, horizW, horizH);
    make(leftX, cy, vertW, vertH);
    make(rightX, cy, vertW, vertH);
  }

  update() {
    if (!this.ball || !this.ball.active) return;

    this.updateTimersUI();

    if (this.isTransitioning) return;

    this.handleInput();
    this.capBallSpeed();
    this.checkOutOfBounds();
  }

  handleInput() {
    // --- 1) teclado (fallback / debug) ---
    const left = this.cursors.left.isDown || this.keyA.isDown;
    const right = this.cursors.right.isDown || this.keyD.isDown;
    const up = this.cursors.up.isDown || this.keyW.isDown;
    const down = this.cursors.down.isDown || this.keyS.isDown;

    let dxK = 0, dyK = 0;
    if (left) dxK -= 1;
    if (right) dxK += 1;
    if (up) dyK -= 1;
    if (down) dyK += 1;

    // --- 2) sensor (lo que llega del iframe template) ---
    let dxS = 0, dyS = 0;
    if (this.useSensor) {
      const x = this.sensorX;
      const y = this.sensorY;

      // zona muerta
      const xDZ = (Math.abs(x) < this.sensorDeadZone) ? 0 : x;
      const yDZ = (Math.abs(y) < this.sensorDeadZone) ? 0 : y;

      // normaliza a [-1, 1] usando sensorMax como "máximo"
      dxS = Phaser.Math.Clamp(xDZ / this.sensorMax, -1, 1);
      dyS = Phaser.Math.Clamp(yDZ / this.sensorMax, -1, 1);

      // Si tu eje Y viene invertido, descomenta:
      // dyS = -dyS;
    }

    // --- 3) mezcla: si hay teclado, manda teclado; si no, sensor ---
    // (si prefieres sumarlos, cambia esta lógica)
    let dx = (dxK !== 0 || dyK !== 0) ? dxK : dxS;
    let dy = (dxK !== 0 || dyK !== 0) ? dyK : dyS;

    // normalizar para no ir más rápido en diagonal
    if (dx !== 0 || dy !== 0) {
      const len = Math.sqrt(dx * dx + dy * dy);
      dx /= len; dy /= len;

      this.ball.body.force.x += dx * this.moveForce;
      this.ball.body.force.y += dy * this.moveForce;
    }

    // reset con R
    if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
      this.resetBall(false);
    }
  }


  capBallSpeed() {
    const v = this.ball.body.velocity;
    const speed = Math.sqrt(v.x * v.x + v.y * v.y);
    if (speed > this.maxBallSpeed) {
      const ratio = this.maxBallSpeed / speed;
      this.MBody.setVelocity(this.ball.body, { x: v.x * ratio, y: v.y * ratio });
    }
  }

  checkOutOfBounds() {
    const margin = 500;
    if (
      this.ball.x < -margin ||
      this.ball.x > this.scale.width + margin ||
      this.ball.y < -margin ||
      this.ball.y > this.scale.height + margin
    ) {
      this.resetBall(false);
    }
  }

  updateTimersUI() {
    const levelMs = Math.max(0, this.time.now - this.startTime);
    const totalLiveMs = this.totalTimeMs + (this.isTransitioning ? 0 : levelMs);

    this.hudLevelTime.setText(`Tiempo nivel: ${this.formatMs(levelMs)}`);
    this.hudTotalTime.setText(`Tiempo total: ${this.formatMs(totalLiveMs)}`);
  }

  formatMs(ms) {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  }

  resetBall(won) {
    if (!this.ball || !this.ball.body) return;

    this.MBody.setPosition(this.ball.body, this._startPos);
    this.MBody.setVelocity(this.ball.body, { x: 0, y: 0 });
    this.MBody.setAngularVelocity(this.ball.body, 0);

    this.showMsg(won ? "✅ ¡Bien!" : "↻ Reinicio");
  }

  winLevel() {
    if (!this.ball || !this.ball.active) return;
    if (this.isTransitioning) return;

    this.isTransitioning = true;

    this.MBody.setVelocity(this.ball.body, { x: 0, y: 0 });
    this.MBody.setAngularVelocity(this.ball.body, 0);
    if (this.goal && this.goal.body) this.goal.body.isSensor = false;

    const levelMs = Math.max(0, this.time.now - this.startTime);
    this.totalTimeMs += levelMs;

    this.showMsg(`🏁 Completado (${this.formatMs(levelMs)})`);

    const t = this.time.delayedCall(1400, () => {
      if (this.currentLevel < this.totalLevels) {
        this.currentLevel++;
        this.isTransitioning = false;
        this.loadLevel(this.currentLevel);
      } else {
        // ✅ FIN DEL JUEGO: mostramos total
        this.showMsg(`🎉 Total: ${this.formatMs(this.totalTimeMs)}`);

        // ✅ ENVIAR RESULTADO FINAL A NODE-RED
        reportFinalTime({
          gameId: "laberinto",
          playerName: this.playerName,
          playerId: this.playerId,
          timeMs: this.totalTimeMs
        });

        enviarYFinalizarTiempo({
          gameId: "laberinto",
          playerName: this.playerName,
          playerId: this.playerId,
          timeMs: this.totalTimeMs
        });
        // reiniciamos todo tras un delay

        const t2 = this.time.delayedCall(1800, () => {
          this.currentLevel = 1;
          this.totalTimeMs = 0;
          this.isTransitioning = false;
          this.loadLevel(this.currentLevel);
        });

        this._levelTimers.push(t2);
      }
    });

    this._levelTimers.push(t);
  }


  showMsg(text) {
    // Siempre centrado en pantalla
    this.msgText.setPosition(this.scale.width / 2, this.scale.height / 2);

    this.msgText.setText(text);
    this.msgText.setDepth(1200);

    // animación: pop + fade
    this.msgText.setAlpha(0);
    this.msgText.setScale(0.92);

    this.tweens.killTweensOf(this.msgText);

    this.tweens.add({
      targets: this.msgText,
      alpha: 1,
      scale: 1,
      duration: 180,
      ease: "Sine.easeOut"
    });

    // auto-ocultar para que no moleste (pero NO en fin de campaña)
    const shouldAutoHide = !String(text).includes("🎉");
    if (shouldAutoHide) {
      const t = this.time.delayedCall(850, () => {
        this.tweens.add({
          targets: this.msgText,
          alpha: 0,
          duration: 220,
          ease: "Sine.easeIn"
        });
      });
      this._levelTimers.push(t);
    }
  }

}
