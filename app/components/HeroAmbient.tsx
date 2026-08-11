"use client";

import { useEffect, useRef } from "react";

const vertexShaderSource = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragmentShaderSource = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uTime;
uniform float uPointerEnergy;
out vec4 outColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p = p * 2.03 + 17.17;
    amplitude *= 0.5;
  }
  return value;
}

vec3 aurora(vec2 uv, float time) {
  float rightBias = smoothstep(0.12, 0.64, uv.x);
  float haze = exp(-length((uv - vec2(0.69, 0.47)) * vec2(0.92, 1.38)) * 1.92);
  float drift = fbm(uv * vec2(2.2, 2.65) + vec2(time * 0.035, -time * 0.024));
  float textureVeil = smoothstep(0.30, 0.83, drift) * haze;

  float waveA = 0.40 + sin(uv.x * 4.6 + time * 0.22) * 0.105;
  waveA += (fbm(vec2(uv.x * 2.7 - time * 0.032, time * 0.018)) - 0.5) * 0.11;
  float waveB = 0.56 + sin(uv.x * 3.5 - time * 0.17 + 1.7) * 0.13;
  waveB += (fbm(vec2(uv.x * 2.15 + 8.0, time * 0.022)) - 0.5) * 0.09;
  float waveC = 0.30 + sin(uv.x * 5.2 + time * 0.14 + 3.1) * 0.075;

  float ribbonA = exp(-pow(abs(uv.y - waveA) / 0.105, 2.0));
  float ribbonB = exp(-pow(abs(uv.y - waveB) / 0.145, 2.0));
  float ribbonC = exp(-pow(abs(uv.y - waveC) / 0.065, 2.0));
  float ribbonMask = rightBias * haze;

  vec3 deepBlue = vec3(0.035, 0.125, 0.360);
  vec3 iceBlue = vec3(0.220, 0.560, 1.000);
  vec3 softViolet = vec3(0.455, 0.285, 0.920);
  vec3 cyan = vec3(0.125, 0.720, 0.960);

  vec3 color = deepBlue * haze * 0.72;
  color += iceBlue * ribbonA * ribbonMask * 0.38;
  color += softViolet * ribbonB * ribbonMask * 0.26;
  color += cyan * ribbonC * ribbonMask * 0.17;
  color += iceBlue * textureVeil * rightBias * 0.16;

  float breath = 0.88 + sin(time * 0.31) * 0.12;
  return color * breath;
}

vec3 scene(vec2 uv, float time) {
  vec3 color = aurora(uv, time);
  float softBeam = exp(-abs(uv.y - 0.48 - sin(uv.x * 4.0 + time * 0.23) * 0.075) * 8.0);
  softBeam *= smoothstep(0.18, 0.78, uv.x) * (1.0 - smoothstep(0.90, 1.08, uv.x));
  color += vec3(0.18, 0.46, 0.92) * softBeam * 0.15;
  return color;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  uv.y = 1.0 - uv.y;

  vec2 pointer = uPointer;
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
  vec2 delta = (uv - pointer) * aspect;
  float distanceToPointer = length(delta);
  float lensBody = smoothstep(0.42, 0.035, distanceToPointer);
  float influence = pow(lensBody, 1.45) * uPointerEnergy;
  vec2 direction = normalize(delta + vec2(0.0001));
  float lensCurve = (1.0 - smoothstep(0.0, 0.40, distanceToPointer)) * influence;
  vec2 refractedUv = uv - direction / aspect * lensCurve * 0.044;

  float chroma = influence * 0.008;
  vec3 base = scene(uv, uTime);
  vec3 refracted;
  refracted.r = scene(refractedUv + direction / aspect * chroma, uTime).r;
  refracted.g = scene(refractedUv, uTime).g;
  refracted.b = scene(refractedUv - direction / aspect * chroma, uTime).b;

  vec3 color = mix(base, refracted * 1.12, influence * 0.72);

  float innerCaustic = exp(-pow((distanceToPointer - 0.15) / 0.036, 2.0));
  float outerCaustic = exp(-pow((distanceToPointer - 0.29) / 0.058, 2.0));
  float diagonalSheen = smoothstep(0.30, 0.0, abs(delta.y + delta.x * 0.48 + 0.06));
  diagonalSheen *= lensBody * smoothstep(-0.05, 0.28, delta.x);
  color += vec3(0.34, 0.68, 1.0) * innerCaustic * uPointerEnergy * 0.14;
  color += vec3(0.50, 0.34, 0.96) * outerCaustic * uPointerEnergy * 0.065;
  color += vec3(0.52, 0.78, 1.0) * diagonalSheen * uPointerEnergy * 0.075;

  float leftProtection = smoothstep(0.08, 0.52, uv.x);
  float edgeFade = smoothstep(0.0, 0.105, uv.x) * smoothstep(1.0, 0.88, uv.x);
  edgeFade *= smoothstep(0.0, 0.13, uv.y) * smoothstep(1.0, 0.84, uv.y);
  color *= mix(0.12, 1.0, leftProtection) * edgeFade;

  outColor = vec4(color, 1.0);
}`;

function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function HeroAmbient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;
    const gl = canvas?.getContext("webgl2", {
      alpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });
    if (!canvas || !hero || !gl) return;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );

    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "uResolution");
    const pointerLocation = gl.getUniformLocation(program, "uPointer");
    const timeLocation = gl.getUniformLocation(program, "uTime");
    const energyLocation = gl.getUniformLocation(program, "uPointerEnergy");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const pointer = { x: 0.73, y: 0.48 };
    const target = { x: 0.73, y: 0.48 };
    let energy = 0.14;
    let targetEnergy = 0.14;
    let frame = 0;
    let start = performance.now();

    const resize = () => {
      const rect = hero.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = hero.getBoundingClientRect();
      target.x = Math.max(0.36, Math.min(0.98, (event.clientX - rect.left) / rect.width));
      target.y = Math.max(0.08, Math.min(0.92, (event.clientY - rect.top) / rect.height));
      targetEnergy = 1;
    };

    const handlePointerLeave = () => {
      target.x = 0.73;
      target.y = 0.48;
      targetEnergy = 0.14;
    };

    const render = (now: number) => {
      pointer.x += (target.x - pointer.x) * 0.07;
      pointer.y += (target.y - pointer.y) * 0.07;
      energy += (targetEnergy - energy) * 0.065;

      gl.useProgram(program);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(pointerLocation, pointer.x, pointer.y);
      gl.uniform1f(timeLocation, reduceMotion.matches ? 0 : (now - start) / 1000);
      gl.uniform1f(energyLocation, reduceMotion.matches ? 0 : energy);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!reduceMotion.matches) frame = requestAnimationFrame(render);
    };

    resize();
    render(start);
    window.addEventListener("resize", resize);
    hero.addEventListener("pointermove", handlePointerMove);
    hero.addEventListener("pointerleave", handlePointerLeave);

    const handleMotionPreference = () => {
      cancelAnimationFrame(frame);
      start = performance.now();
      render(start);
    };
    reduceMotion.addEventListener("change", handleMotionPreference);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", handlePointerLeave);
      reduceMotion.removeEventListener("change", handleMotionPreference);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-ambient" aria-hidden="true" />;
}
