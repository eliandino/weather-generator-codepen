// ============================================================
// CODEPEN WEATHER GENERATOR
// ============================================================
// Add Three.js under:
// Pen Settings → JavaScript → External Scripts
//
// https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.min.js
// ============================================================

console.log("Weather Generator loaded from GitHub");

const $ = (selector) => document.querySelector(selector);

const clamp = (value, minimum, maximum) => {
  return Math.min(maximum, Math.max(minimum, value));
};

// ============================================================
// WEATHER PRESET DATA
// ============================================================

const weatherPresets = {
  sunny: {
    label: "Clear Sunny",
    icon: "☀️",
    sky: "#70c5ff",
    horizon: "#dff4ff",
    fog: "#bfe8ff",
    fogDensity: 0.001,
    rain: 0,
    snow: 0,
    ash: 0,
    wind: 0.15,
    clouds: 0.1,
    light: 2.2,
    ground: "dry",
    lightning: false,
    temp: 28,
    visibility: 100
  },

  partlyCloudy: {
    label: "Partly Cloudy",
    icon: "🌤️",
    sky: "#73aeda",
    horizon: "#d5e7ef",
    fog: "#cbdde5",
    fogDensity: 0.002,
    rain: 0,
    snow: 0,
    ash: 0,
    wind: 0.35,
    clouds: 0.45,
    light: 1.65,
    ground: "dry",
    lightning: false,
    temp: 22,
    visibility: 92
  },

  overcast: {
    label: "Overcast",
    icon: "☁️",
    sky: "#687684",
    horizon: "#aeb8c0",
    fog: "#929da5",
    fogDensity: 0.008,
    rain: 0,
    snow: 0,
    ash: 0,
    wind: 0.45,
    clouds: 0.9,
    light: 0.8,
    ground: "damp",
    lightning: false,
    temp: 17,
    visibility: 78
  },

  lightRain: {
    label: "Light Rain",
    icon: "🌦️",
    sky: "#53697a",
    horizon: "#8296a4",
    fog: "#718692",
    fogDensity: 0.012,
    rain: 1200,
    snow: 0,
    ash: 0,
    wind: 0.55,
    clouds: 0.8,
    light: 0.75,
    ground: "wet",
    lightning: false,
    temp: 15,
    visibility: 72
  },

  heavyRain: {
    label: "Heavy Rain",
    icon: "🌧️",
    sky: "#263544",
    horizon: "#526676",
    fog: "#475b69",
    fogDensity: 0.022,
    rain: 3600,
    snow: 0,
    ash: 0,
    wind: 1.25,
    clouds: 1,
    light: 0.42,
    ground: "puddled",
    lightning: false,
    temp: 12,
    visibility: 48
  },

  thunderstorm: {
    label: "Thunderstorm",
    icon: "⛈️",
    sky: "#101925",
    horizon: "#354356",
    fog: "#263443",
    fogDensity: 0.03,
    rain: 5200,
    snow: 0,
    ash: 0,
    wind: 1.8,
    clouds: 1,
    light: 0.28,
    ground: "puddled",
    lightning: true,
    temp: 11,
    visibility: 35
  },

  snow: {
    label: "Snow",
    icon: "🌨️",
    sky: "#aab8c4",
    horizon: "#e5edf3",
    fog: "#d4dde3",
    fogDensity: 0.018,
    rain: 0,
    snow: 2200,
    ash: 0,
    wind: 0.45,
    clouds: 0.85,
    light: 1.1,
    ground: "snow",
    lightning: false,
    temp: -3,
    visibility: 70
  },

  blizzard: {
    label: "Blizzard",
    icon: "❄️",
    sky: "#9ba8b3",
    horizon: "#dbe3e8",
    fog: "#ced7dc",
    fogDensity: 0.045,
    rain: 0,
    snow: 5200,
    ash: 0,
    wind: 2.5,
    clouds: 1,
    light: 0.7,
    ground: "snow",
    lightning: false,
    temp: -14,
    visibility: 22
  },

  fog: {
    label: "Dense Fog",
    icon: "🌫️",
    sky: "#879395",
    horizon: "#bbc2c1",
    fog: "#9ca7a5",
    fogDensity: 0.06,
    rain: 0,
    snow: 0,
    ash: 0,
    wind: 0.08,
    clouds: 0.65,
    light: 0.55,
    ground: "damp",
    lightning: false,
    temp: 9,
    visibility: 16
  },

  sandstorm: {
    label: "Sandstorm",
    icon: "🏜️",
    sky: "#9d6b36",
    horizon: "#d89b51",
    fog: "#b77c3f",
    fogDensity: 0.055,
    rain: 0,
    snow: 0,
    ash: 3400,
    wind: 2.7,
    clouds: 0.75,
    light: 0.72,
    ground: "cracked",
    lightning: false,
    temp: 39,
    visibility: 20,
    particleColor: "#d39a55"
  },

  ashfall: {
    label: "Ashfall",
    icon: "🌋",
    sky: "#493e3c",
    horizon: "#9b4931",
    fog: "#62504b",
    fogDensity: 0.052,
    rain: 0,
    snow: 0,
    ash: 3800,
    wind: 0.8,
    clouds: 1,
    light: 0.32,
    ground: "ash",
    lightning: false,
    temp: 31,
    visibility: 24,
    glow: 0.8
  },

  toxicRain: {
    label: "Toxic Rain",
    icon: "☣️",
    sky: "#38452d",
    horizon: "#7ca43d",
    fog: "#576b3c",
    fogDensity: 0.035,
    rain: 4000,
    snow: 0,
    ash: 0,
    wind: 1.1,
    clouds: 1,
    light: 0.45,
    ground: "toxic",
    lightning: true,
    temp: 19,
    visibility: 32,
    particleColor: "#aaff32"
  },

  meteor: {
    label: "Meteor Shower",
    icon: "☄️",
    sky: "#050817",
    horizon: "#251c45",
    fog: "#10142a",
    fogDensity: 0.004,
    rain: 700,
    snow: 0,
    ash: 0,
    wind: 0.4,
    clouds: 0.15,
    light: 0.18,
    ground: "dry",
    lightning: false,
    temp: 4,
    visibility: 96,
    particleColor: "#ff9b42",
    meteor: true
  },

  acidStorm: {
    label: "Cyber Acid Storm",
    icon: "⚡",
    sky: "#17102d",
    horizon: "#cc2cff",
    fog: "#2d174b",
    fogDensity: 0.028,
    rain: 4500,
    snow: 0,
    ash: 500,
    wind: 1.9,
    clouds: 1,
    light: 0.4,
    ground: "toxic",
    lightning: true,
    temp: 23,
    visibility: 38,
    particleColor: "#4dffcf"
  },

  magical: {
    label: "Magical Storm",
    icon: "🔮",
    sky: "#241342",
    horizon: "#954dff",
    fog: "#442767",
    fogDensity: 0.022,
    rain: 0,
    snow: 3600,
    ash: 0,
    wind: 1.3,
    clouds: 0.8,
    light: 0.65,
    ground: "frozen",
    lightning: true,
    temp: 2,
    visibility: 62,
    particleColor: "#dcadff",
    magical: true
  },

  volcanic: {
    label: "Volcanic Sky",
    icon: "🔥",
    sky: "#241514",
    horizon: "#ff5a1f",
    fog: "#5b3128",
    fogDensity: 0.048,
    rain: 0,
    snow: 0,
    ash: 4800,
    wind: 1.1,
    clouds: 1,
    light: 0.3,
    ground: "ash",
    lightning: false,
    temp: 47,
    visibility: 18,
    glow: 1.5
  }
};

// ============================================================
// TIME-OF-DAY PRESETS
// ============================================================

const timePresets = {
  dawn: {
    label: "Dawn",
    sun: 0.35,
    exposure: 0.8,
    tint: "#ffb77a"
  },

  morning: {
    label: "Morning",
    sun: 0.8,
    exposure: 1,
    tint: "#fff1cf"
  },

  noon: {
    label: "Noon",
    sun: 1.25,
    exposure: 1.1,
    tint: "#ffffff"
  },

  golden: {
    label: "Golden Hour",
    sun: 0.55,
    exposure: 0.9,
    tint: "#ffb45c"
  },

  sunset: {
    label: "Sunset",
    sun: 0.25,
    exposure: 0.75,
    tint: "#ff7043"
  },

  twilight: {
    label: "Twilight",
    sun: 0.12,
    exposure: 0.55,
    tint: "#8e7dff"
  },

  night: {
    label: "Night",
    sun: 0.04,
    exposure: 0.38,
    tint: "#688cff"
  },

  midnight: {
    label: "Midnight",
    sun: 0.015,
    exposure: 0.25,
    tint: "#3b57b8"
  }
};

// ============================================================
// APPLICATION STATE
// ============================================================

const state = {
  preset: "sunny",
  time: "noon",
  playing: true,

  intensity: 1,
  wind: 0.15,
  direction: 25,
  visibility: 100,
  temperature: 28,
  fog: 0.001,
  cloud: 0.1,
  particleSize: 1,
  transition: 0.45
};

// ============================================================
// THREE.JS VARIABLES
// ============================================================

let scene;
let camera;
let renderer;
let clock;

let sun;
let ambient;
let flashLight;
let ground;

let rainSystem;
let snowSystem;
let ashSystem;

let clouds = [];

let lightningTimer = 0;
let fpsFrames = 0;
let fpsTime = 0;

const MAX_RAIN = 6000;
const MAX_SNOW = 6000;
const MAX_ASH = 5000;

// ============================================================
// START APPLICATION
// ============================================================

initUI();
initScene();
applyPreset("sunny");
animate();

// ============================================================
// BUILD USER INTERFACE
// ============================================================

function initUI() {
  const presetGrid = $("#presetGrid");

  // Generate preset buttons through JavaScript.
  // This keeps the CodePen HTML panel much smaller.
  presetGrid.innerHTML = Object.entries(weatherPresets)
    .map(([key, preset]) => {
      return `
        <button class="preset-card" data-preset="${key}">
          <span>${preset.icon}</span>
          <small>${preset.label}</small>
        </button>
      `;
    })
    .join("");

  $("#timeSelect").innerHTML = Object.entries(timePresets)
    .map(([key, time]) => {
      return `<option value="${key}">${time.label}</option>`;
    })
    .join("");

  $("#timeSelect").value = state.time;

  // Slider definition:
  // id, visible label, minimum, maximum, step
  const controls = [
    ["intensity", "Weather intensity", 0, 2, 0.01],
    ["wind", "Wind strength", 0, 3, 0.01],
    ["direction", "Wind direction", 0, 360, 1],
    ["visibility", "Visibility", 5, 100, 1],
    ["temperature", "Temperature", -30, 55, 1],
    ["fog", "Fog density", 0, 0.08, 0.001],
    ["cloud", "Cloud coverage", 0, 1, 0.01],
    ["particleSize", "Particle size", 0.4, 2.5, 0.05],
    ["transition", "Transition speed", 0.05, 1, 0.01]
  ];

  $("#controlList").innerHTML = controls
    .map(([id, label, minimum, maximum, step]) => {
      return `
        <label class="control-row" for="${id}">
          <span>
            ${label}
            <output id="${id}Value"></output>
          </span>

          <input
            id="${id}"
            type="range"
            min="${minimum}"
            max="${maximum}"
            step="${step}"
          >
        </label>
      `;
    })
    .join("");

  controls.forEach(([id]) => {
    const input = $("#" + id);

    input.value = state[id];

    input.addEventListener("input", () => {
      state[id] = Number(input.value);

      updateControlReadout(id);

      if (id === "direction") {
        updateCompass();
      }

      updateEnvironment();
    });

    updateControlReadout(id);
  });

  presetGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-preset]");

    if (button) {
      applyPreset(button.dataset.preset);
    }
  });

  $("#timeSelect").addEventListener("change", (event) => {
    state.time = event.target.value;
    updateEnvironment();
  });

  $("#playBtn").addEventListener("click", togglePlay);
  $("#randomBtn").addEventListener("click", randomizeWeather);
  $("#exportBtn").addEventListener("click", exportPrompt);
  $("#copyBtn").addEventListener("click", copyPrompt);

  $("#closeModal").addEventListener("click", () => {
    $("#exportModal").close();
  });

  $("#themeBtn").addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
  });

  window.addEventListener("resize", onResize);

  updateCompass();
}

// ============================================================
// CREATE THREE.JS SCENE
// ============================================================

function initScene() {
  const viewport = $("#viewport");

  scene = new THREE.Scene();
  scene.background = new THREE.Color("#70c5ff");
  scene.fog = new THREE.FogExp2("#bfe8ff", 0.001);

  camera = new THREE.PerspectiveCamera(
    55,
    viewport.clientWidth / viewport.clientHeight,
    0.1,
    400
  );

  camera.position.set(24, 18, 32);
  camera.lookAt(0, 5, 0);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance"
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
  renderer.setSize(viewport.clientWidth, viewport.clientHeight);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  viewport.prepend(renderer.domElement);

  clock = new THREE.Clock();

  // Sky and ground fill lighting.
  ambient = new THREE.HemisphereLight(
    0xcdeeff,
    0x27311f,
    1.2
  );

  scene.add(ambient);

  // Primary sunlight.
  sun = new THREE.DirectionalLight(0xffffff, 2.2);
  sun.position.set(18, 28, 12);
  sun.castShadow = true;

  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -35;
  sun.shadow.camera.right = 35;
  sun.shadow.camera.top = 35;
  sun.shadow.camera.bottom = -35;

  scene.add(sun);

  // Lightning flash source.
  flashLight = new THREE.PointLight(
    0xdbe9ff,
    0,
    120
  );

  flashLight.position.set(0, 30, 8);
  scene.add(flashLight);

  buildWorld();

  rainSystem = createParticleSystem(
    MAX_RAIN,
    "#9edcff",
    0.08,
    true
  );

  snowSystem = createParticleSystem(
    MAX_SNOW,
    "#ffffff",
    0.18
  );

  ashSystem = createParticleSystem(
    MAX_ASH,
    "#77706c",
    0.12
  );

  scene.add(
    rainSystem.points,
    snowSystem.points,
    ashSystem.points
  );

  createClouds();
}

// ============================================================
// BUILD SIMPLE CITY ENVIRONMENT
// ============================================================

function buildWorld() {
  // Main ground.
  ground = new THREE.Mesh(
    new THREE.PlaneGeometry(110, 110),
    new THREE.MeshStandardMaterial({
      color: 0x51613b,
      roughness: 0.9,
      metalness: 0.02
    })
  );

  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;

  scene.add(ground);

  // Central roadway.
  const road = new THREE.Mesh(
    new THREE.PlaneGeometry(15, 110),
    new THREE.MeshStandardMaterial({
      color: 0x252a2e,
      roughness: 0.72,
      metalness: 0.08
    })
  );

  road.rotation.x = -Math.PI / 2;
  road.position.y = 0.03;
  road.receiveShadow = true;

  scene.add(road);

  const buildingMaterial = new THREE.MeshStandardMaterial({
    color: 0x303b46,
    roughness: 0.66,
    metalness: 0.2
  });

  // Create buildings on both sides of the road.
  for (let index = 0; index < 20; index++) {
    const width = 4 + Math.random() * 5;
    const height = 4 + Math.random() * 17;
    const depth = 4 + Math.random() * 7;

    const building = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth),
      buildingMaterial.clone()
    );

    const side = index % 2 ? 1 : -1;

    building.position.set(
      side * (12 + Math.random() * 17),
      height / 2,
      -43 + index * 4.6
    );

    building.castShadow = true;
    building.receiveShadow = true;

    scene.add(building);

    // Add simple illuminated windows.
    const windowMaterial = new THREE.MeshBasicMaterial({
      color: Math.random() > 0.5
        ? 0x66ddff
        : 0xffc66d
    });

    for (let y = 2; y < height - 1; y += 3) {
      const windowMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(width * 0.55, 0.65),
        windowMaterial
      );

      windowMesh.position.set(
        building.position.x - side * (width / 2 + 0.01),
        y,
        building.position.z
      );

      windowMesh.rotation.y = side > 0
        ? -Math.PI / 2
        : Math.PI / 2;

      scene.add(windowMesh);
    }
  }

  // Distant mountains.
  const mountainMaterial = new THREE.MeshStandardMaterial({
    color: 0x344337,
    roughness: 1
  });

  for (let index = 0; index < 9; index++) {
    const mountain = new THREE.Mesh(
      new THREE.ConeGeometry(
        8 + Math.random() * 10,
        14 + Math.random() * 18,
        6
      ),
      mountainMaterial
    );

    mountain.position.set(
      -50 + index * 13,
      -1,
      -55 - Math.random() * 15
    );

    mountain.rotation.y = Math.random();

    scene.add(mountain);
  }
}

// ============================================================
// PARTICLE SYSTEM CREATION
// ============================================================

function createParticleSystem(
  maximumCount,
  color,
  size,
  isRain = false
) {
  const positions = new Float32Array(maximumCount * 3);
  const speeds = new Float32Array(maximumCount);
  const offsets = new Float32Array(maximumCount);

  for (let index = 0; index < maximumCount; index++) {
    resetParticle(positions, index, true);

    speeds[index] = 0.45 + Math.random();
    offsets[index] = Math.random() * Math.PI * 2;
  }

  const geometry = new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  geometry.setDrawRange(0, 0);

  const material = new THREE.PointsMaterial({
    color,
    size,
    transparent: true,
    opacity: 0.86,
    depthWrite: false,

    // Snow and ash should become smaller in the distance.
    // Rain keeps a more consistent visible size.
    sizeAttenuation: !isRain
  });

  return {
    points: new THREE.Points(geometry, material),
    positions,
    speeds,
    offsets,
    maxCount: maximumCount,
    count: 0
  };
}

// Position or reposition one particle.
function resetParticle(array, index, initial = false) {
  const positionIndex = index * 3;

  array[positionIndex] = (Math.random() - 0.5) * 85;

  array[positionIndex + 1] = initial
    ? Math.random() * 45
    : 40 + Math.random() * 8;

  array[positionIndex + 2] =
    (Math.random() - 0.5) * 85;
}

// ============================================================
// CREATE CLOUD GROUPS
// ============================================================

function createClouds() {
  const cloudGeometry = new THREE.SphereGeometry(
    1,
    10,
    8
  );

  for (let index = 0; index < 24; index++) {
    const cloudGroup = new THREE.Group();

    const cloudMaterial = new THREE.MeshLambertMaterial({
      color: 0xd8e0e5,
      transparent: true,
      opacity: 0.5,
      depthWrite: false
    });

    // Build each cloud from several stretched spheres.
    for (let puffIndex = 0; puffIndex < 5; puffIndex++) {
      const puff = new THREE.Mesh(
        cloudGeometry,
        cloudMaterial
      );

      puff.scale.set(
        4 + Math.random() * 5,
        1.3 + Math.random() * 2,
        2.5 + Math.random() * 4
      );

      puff.position.set(
        (puffIndex - 2) * 3 + Math.random() * 2,
        Math.random() * 1.5,
        Math.random() * 3
      );

      cloudGroup.add(puff);
    }

    cloudGroup.position.set(
      (Math.random() - 0.5) * 110,
      25 + Math.random() * 13,
      (Math.random() - 0.5) * 100
    );

    cloudGroup.userData.speed = 0.4 + Math.random();
    cloudGroup.visible = false;

    scene.add(cloudGroup);
    clouds.push(cloudGroup);
  }
}

// ============================================================
// APPLY A WEATHER PRESET
// ============================================================

function applyPreset(key) {
  const preset = weatherPresets[key];

  state.preset = key;
  state.wind = preset.wind;
  state.visibility = preset.visibility;
  state.temperature = preset.temp;
  state.fog = preset.fogDensity;
  state.cloud = preset.clouds;
  state.intensity = 1;

  const valuesToUpdate = [
    "wind",
    "visibility",
    "temperature",
    "fog",
    "cloud",
    "intensity"
  ];

  valuesToUpdate.forEach((id) => {
    $("#" + id).value = state[id];
    updateControlReadout(id);
  });

  document
    .querySelectorAll(".preset-card")
    .forEach((button) => {
      button.classList.toggle(
        "active",
        button.dataset.preset === key
      );
    });

  $("#weatherName").textContent = preset.label;
  $("#weatherIcon").textContent = preset.icon;

  updateEnvironment(true);
}

// ============================================================
// UPDATE ENVIRONMENT APPEARANCE
// ============================================================

function updateEnvironment(immediate = false) {
  const preset = weatherPresets[state.preset];
  const time = timePresets[state.time];

  const interpolationSpeed = immediate
    ? 1
    : state.transition;

  // Sky and fog.
  scene.background.lerp(
    new THREE.Color(preset.sky),
    interpolationSpeed
  );

  scene.fog.color.lerp(
    new THREE.Color(preset.fog),
    interpolationSpeed
  );

  const visibilityFogMultiplier =
    1.15 - state.visibility / 130;

  const targetFogDensity =
    state.fog * visibilityFogMultiplier;

  scene.fog.density = THREE.MathUtils.lerp(
    scene.fog.density,
    targetFogDensity,
    interpolationSpeed
  );

  // Time-of-day lighting.
  renderer.toneMappingExposure = time.exposure;

  sun.color.lerp(
    new THREE.Color(time.tint),
    interpolationSpeed
  );

  sun.intensity = THREE.MathUtils.lerp(
    sun.intensity,
    preset.light * time.sun,
    interpolationSpeed
  );

  ambient.intensity = THREE.MathUtils.lerp(
    ambient.intensity,
    Math.max(0.08, preset.light * 0.62),
    interpolationSpeed
  );

  // Reposition sunlight based on time.
  const timeKeys = Object.keys(timePresets);
  const timeIndex = timeKeys.indexOf(state.time);

  const sunAngle =
    (timeIndex / timeKeys.length) * Math.PI * 1.8 + 0.2;

  sun.position.set(
    Math.cos(sunAngle) * 35,
    Math.max(2, Math.sin(sunAngle) * 32),
    12
  );

  // Change particle counts.
  setParticles(
    rainSystem,
    Math.round(preset.rain * state.intensity)
  );

  setParticles(
    snowSystem,
    Math.round(preset.snow * state.intensity)
  );

  setParticles(
    ashSystem,
    Math.round(preset.ash * state.intensity)
  );

  // Particle colors.
  const rainColor =
    preset.particleColor || "#9edcff";

  rainSystem.points.material.color.set(rainColor);

  snowSystem.points.material.color.set(
    preset.particleColor || "#ffffff"
  );

  ashSystem.points.material.color.set(
    preset.particleColor || "#706963"
  );

  // Particle sizes.
  rainSystem.points.material.size =
    0.08 * state.particleSize;

  snowSystem.points.material.size =
    0.18 * state.particleSize;

  ashSystem.points.material.size =
    0.13 * state.particleSize;

  // Cloud amount.
  const visibleCloudCount = Math.round(
    clouds.length * state.cloud
  );

  clouds.forEach((cloud, index) => {
    cloud.visible = index < visibleCloudCount;

    cloud.children.forEach((puff) => {
      puff.material.color.set(
        preset.clouds > 0.8
          ? "#59616a"
          : "#d9e1e7"
      );

      puff.material.opacity =
        0.22 + preset.clouds * 0.45;
    });
  });

  updateGround(preset.ground);

  // Update scene statistics.
  $("#windStat").textContent =
    state.wind.toFixed(1);

  $("#visibilityStat").textContent =
    Math.round(state.visibility) + "%";

  $("#tempStat").textContent =
    Math.round(state.temperature) + "°C";

  $("#particleStat").textContent = (
    rainSystem.count +
    snowSystem.count +
    ashSystem.count
  ).toLocaleString();

  updateCompass();
}

// ============================================================
// CHANGE ACTIVE PARTICLE COUNT
// ============================================================

function setParticles(system, count) {
  system.count = clamp(
    count,
    0,
    system.maxCount
  );

  system.points.geometry.setDrawRange(
    0,
    system.count
  );

  system.points.visible = system.count > 0;
}

// ============================================================
// CHANGE GROUND MATERIAL
// ============================================================

function updateGround(type) {
  const groundStyles = {
    dry: [0x52613c, 0.9, 0.01],
    damp: [0x374431, 0.75, 0.05],
    wet: [0x202d29, 0.28, 0.32],
    puddled: [0x18282b, 0.16, 0.48],
    snow: [0xdbe3e7, 0.72, 0.02],
    frozen: [0xa9d4df, 0.18, 0.35],
    ash: [0x3b3735, 1, 0.01],
    cracked: [0x73502e, 1, 0.01],
    toxic: [0x263b22, 0.2, 0.5]
  };

  const style = groundStyles[type] ||
    groundStyles.dry;

  ground.material.color.setHex(style[0]);
  ground.material.roughness = style[1];
  ground.material.metalness = style[2];

  $("#groundState").textContent = type;
}

// ============================================================
// ANIMATE PARTICLES
// ============================================================

function updateParticles(
  system,
  particleType,
  deltaTime,
  elapsedTime
) {
  if (!system.points.visible) {
    return;
  }

  const positions = system.positions;

  const windAngle = THREE.MathUtils.degToRad(
    state.direction
  );

  const windX =
    Math.cos(windAngle) * state.wind;

  const windZ =
    Math.sin(windAngle) * state.wind;

  for (
    let particleIndex = 0;
    particleIndex < system.count;
    particleIndex++
  ) {
    const positionIndex = particleIndex * 3;
    const speed = system.speeds[particleIndex];

    if (particleType === "rain") {
      positions[positionIndex] +=
        windX * deltaTime * 7;

      positions[positionIndex + 1] -=
        (18 + speed * 22) *
        state.intensity *
        deltaTime;

      positions[positionIndex + 2] +=
        windZ * deltaTime * 7;
    }

    if (particleType === "snow") {
      positions[positionIndex] +=
        (
          windX * 1.8 +
          Math.sin(
            elapsedTime * 1.4 +
            system.offsets[particleIndex]
          ) * 0.45
        ) * deltaTime;

      positions[positionIndex + 1] -=
        (1.7 + speed * 2.2) *
        deltaTime *
        state.intensity;

      positions[positionIndex + 2] +=
        (
          windZ * 1.8 +
          Math.cos(
            elapsedTime +
            system.offsets[particleIndex]
          ) * 0.25
        ) * deltaTime;
    }

    if (particleType === "ash") {
      positions[positionIndex] +=
        (
          windX * 2.5 +
          Math.sin(
            elapsedTime * 0.7 +
            system.offsets[particleIndex]
          ) * 0.65
        ) * deltaTime;

      positions[positionIndex + 1] -=
        (0.6 + speed * 1.1) * deltaTime;

      // Occasionally lift ash upward.
      if (
        Math.sin(
          elapsedTime +
          system.offsets[particleIndex]
        ) > 0.94
      ) {
        positions[positionIndex + 1] +=
          0.8 * deltaTime;
      }

      positions[positionIndex + 2] +=
        windZ * 2.5 * deltaTime;
    }

    const particleOutsideArea =
      positions[positionIndex + 1] < 0 ||
      Math.abs(positions[positionIndex]) > 55 ||
      Math.abs(positions[positionIndex + 2]) > 55;

    if (particleOutsideArea) {
      resetParticle(
        positions,
        particleIndex,
        false
      );
    }
  }

  system.points.geometry
    .attributes
    .position
    .needsUpdate = true;
}

// ============================================================
// LIGHTNING SYSTEM
// ============================================================

function updateLightning(deltaTime) {
  const lightningEnabled =
    weatherPresets[state.preset].lightning;

  if (!lightningEnabled) {
    flashLight.intensity = 0;
    return;
  }

  lightningTimer -= deltaTime;

  if (lightningTimer <= 0) {
    lightningTimer = 1.5 + Math.random() * 5;

    if (Math.random() < 0.7) {
      flashSequence();
    }
  }
}

function flashSequence() {
  flashLight.position.set(
    (Math.random() - 0.5) * 45,
    25 + Math.random() * 15,
    (Math.random() - 0.5) * 35
  );

  // First flash.
  flashLight.intensity =
    5 + Math.random() * 8;

  document.body.classList.add("flash");

  setTimeout(() => {
    flashLight.intensity = 0.4;
    document.body.classList.remove("flash");
  }, 70);

  // Second, stronger flash.
  setTimeout(() => {
    flashLight.intensity =
      8 + Math.random() * 8;

    document.body.classList.add("flash");
  }, 125);

  // End flash.
  setTimeout(() => {
    flashLight.intensity = 0;
    document.body.classList.remove("flash");
  }, 230);
}

// ============================================================
// MAIN ANIMATION LOOP
// ============================================================

function animate() {
  requestAnimationFrame(animate);

  const deltaTime = Math.min(
    clock.getDelta(),
    0.05
  );

  const elapsedTime = clock.elapsedTime;

  if (state.playing) {
    updateParticles(
      rainSystem,
      "rain",
      deltaTime,
      elapsedTime
    );

    updateParticles(
      snowSystem,
      "snow",
      deltaTime,
      elapsedTime
    );

    updateParticles(
      ashSystem,
      "ash",
      deltaTime,
      elapsedTime
    );

    clouds.forEach((cloud) => {
      if (!cloud.visible) {
        return;
      }

      cloud.position.x +=
        state.wind *
        cloud.userData.speed *
        deltaTime;

      if (cloud.position.x > 62) {
        cloud.position.x = -62;
      }
    });

    updateLightning(deltaTime);
  }

  // Slight cinematic camera movement.
  camera.position.x =
    24 + Math.sin(elapsedTime * 0.08) * 2.2;

  camera.lookAt(0, 5, 0);

  renderer.render(scene, camera);

  // Basic FPS counter.
  fpsFrames++;
  fpsTime += deltaTime;

  if (fpsTime > 1) {
    $("#fps").textContent = Math.round(
      fpsFrames / fpsTime
    );

    fpsFrames = 0;
    fpsTime = 0;
  }
}

// ============================================================
// PLAY AND PAUSE
// ============================================================

function togglePlay() {
  state.playing = !state.playing;

  $("#playBtn").textContent = state.playing
    ? "⏸ Pause"
    : "▶ Play";
}

// ============================================================
// RANDOM WEATHER GENERATOR
// ============================================================

function randomizeWeather() {
  const weatherKeys = Object.keys(
    weatherPresets
  );

  const randomWeather =
    weatherKeys[
      Math.floor(Math.random() * weatherKeys.length)
    ];

  applyPreset(randomWeather);

  const timeKeys = Object.keys(timePresets);

  state.time =
    timeKeys[
      Math.floor(Math.random() * timeKeys.length)
    ];

  $("#timeSelect").value = state.time;

  state.direction = Math.floor(
    Math.random() * 361
  );

  $("#direction").value = state.direction;

  updateControlReadout("direction");
  updateEnvironment(true);
}

// ============================================================
// GENERATE ENVIRONMENT PROMPT
// ============================================================

function exportPrompt() {
  const preset = weatherPresets[state.preset];
  const time = timePresets[state.time];

  let visibilityDescription = "clear";

  if (state.visibility < 40) {
    visibilityDescription = "severely reduced";
  } else if (state.visibility < 75) {
    visibilityDescription = "moderate";
  }

  let windDescription = "gentle";

  if (state.wind > 1.8) {
    windDescription = "violent";
  } else if (state.wind > 0.7) {
    windDescription = "strong";
  }

  let lightingDescription = "bright natural light";

  if (preset.light < 0.5) {
    lightingDescription = "dark and dramatic";
  } else if (preset.light < 1) {
    lightingDescription = "soft and subdued";
  }

  const prompt = `ENVIRONMENT WEATHER PROMPT

Weather: ${preset.label}
Time of day: ${time.label}
Intensity: ${state.intensity.toFixed(2)}
Wind: ${state.wind.toFixed(2)} from ${Math.round(state.direction)} degrees
Visibility: ${Math.round(state.visibility)}%
Temperature: ${Math.round(state.temperature)}°C
Fog density: ${state.fog.toFixed(3)}
Cloud coverage: ${Math.round(state.cloud * 100)}%
Ground condition: ${preset.ground}
Lighting: ${lightingDescription}
Particles: ${rainSystem.count} rain, ${snowSystem.count} snow, ${ashSystem.count} ash
Lightning: ${preset.lightning ? "enabled" : "disabled"}

Cinematic description: A ${preset.label.toLowerCase()} environment during ${time.label.toLowerCase()}, with ${visibilityDescription} visibility, ${windDescription} wind, ${preset.ground} ground, atmospheric depth, physically believable weather interaction, volumetric haze, detailed environmental lighting, game-engine-ready scene, cinematic composition.`;

  $("#promptOutput").value = prompt;
  $("#exportModal").showModal();
}

// ============================================================
// COPY GENERATED PROMPT
// ============================================================

async function copyPrompt() {
  const prompt = $("#promptOutput").value;

  try {
    await navigator.clipboard.writeText(prompt);

    $("#copyBtn").textContent = "Copied";

    setTimeout(() => {
      $("#copyBtn").textContent = "Copy Prompt";
    }, 1200);
  } catch (error) {
    // Older browser fallback.
    $("#promptOutput").select();
    document.execCommand("copy");
  }
}

// ============================================================
// FORMAT CONTROL VALUES
// ============================================================

function updateControlReadout(id) {
  const formatters = {
    intensity: (value) =>
      value.toFixed(2) + "×",

    wind: (value) =>
      value.toFixed(2),

    direction: (value) =>
      Math.round(value) + "°",

    visibility: (value) =>
      Math.round(value) + "%",

    temperature: (value) =>
      Math.round(value) + "°C",

    fog: (value) =>
      value.toFixed(3),

    cloud: (value) =>
      Math.round(value * 100) + "%",

    particleSize: (value) =>
      value.toFixed(2) + "×",

    transition: (value) =>
      value.toFixed(2)
  };

  $("#" + id + "Value").textContent =
    formatters[id](Number(state[id]));
}

// ============================================================
// UPDATE COMPASS NEEDLE
// ============================================================

function updateCompass() {
  $("#compassNeedle").style.transform =
    `rotate(${state.direction}deg)`;
}

// ============================================================
// RESPONSIVE CANVAS
// ============================================================

function onResize() {
  const viewport = $("#viewport");

  camera.aspect =
    viewport.clientWidth /
    viewport.clientHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(
    viewport.clientWidth,
    viewport.clientHeight
  );
}
