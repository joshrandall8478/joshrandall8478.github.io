// Hero field: a slowly flowing topographic map drawn with WebGL.
// The contour lines are iso-lines of domain-warped simplex noise. On load
// they spread outward from the center behind a bright front; the pointer
// raises a soft hill beneath it, and a click sends a ripple through them.
// Rendering pauses offscreen and in hidden tabs, drops resolution on slow
// GPUs, and draws a single still frame for prefers-reduced-motion.

const VERTEX = `
attribute vec2 a_pos;
void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAGMENT = `
#extension GL_OES_standard_derivatives : enable
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_res;      // drawing buffer size (device px)
uniform float u_time;    // seconds
uniform vec3 u_pointer;  // xy: position (device px, y up), z: presence 0..1
uniform vec3 u_ripple;   // xy: origin (device px, y up), z: age in seconds
uniform float u_reveal;  // intro progress 0..1
uniform float u_scroll;  // hero scrolled away 0..1
uniform float u_px;      // device px per CSS px
uniform vec3 u_bg;
uniform vec3 u_line;
uniform vec3 u_hi;

// 2D simplex noise by Ian McEwan, Ashima Arts.
// Copyright (C) 2011 Ashima Arts. Distributed under the MIT License.
// https://github.com/ashima/webgl-noise
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

const mat2 ROT = mat2(1.6, 1.2, -1.2, 1.6);

float fbm2(vec2 p) {
    return 0.5 * snoise(p) + 0.25 * snoise(ROT * p);
}

float fbm3(vec2 p) {
    float v = 0.5 * snoise(p);
    p = ROT * p;
    v += 0.2 * snoise(p);
    p = ROT * p;
    return v + 0.07 * snoise(p);
}

void main() {
    float unit = length(u_res) * 0.55;
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / unit;
    vec2 p = uv * 1.15 + vec2(0.0, -u_scroll * 0.8);
    float t = u_time * 0.03;

    // Domain warp: two slow noise fields bend the coordinates over time.
    vec2 q = vec2(fbm2(p + vec2(0.0, t)), fbm2(p + vec2(5.2, 1.3) - vec2(t * 0.8, 0.0)));
    float h = fbm3(p + 1.1 * q + vec2(t * 0.35, -t * 0.25));

    // The pointer raises a soft hill; a click sends a damped ring outward.
    vec2 m = (u_pointer.xy - 0.5 * u_res) / unit;
    float dm = dot(uv - m, uv - m);
    h += u_pointer.z * 0.34 * exp(-dm / 0.024);

    vec2 r = (u_ripple.xy - 0.5 * u_res) / unit;
    float age = u_ripple.z;
    float dr = length(uv - r) - age * 0.55;
    float wave = exp(-dr * dr * 40.0) * exp(-age * 1.1);
    h += 0.11 * sin(dr * 30.0) * wave;

    // Iso-lines as ~1px antialiased strokes; every fifth is a heavier index line.
    float v = h * 8.0;
    float w = fwidth(v);
    float d = abs(fract(v - 0.5) - 0.5) / max(w, 1e-4);
    float major = 1.0 - step(0.5, mod(floor(v + 0.5), 5.0));
    float hw = u_px * mix(0.5, 0.85, major);
    float line = 1.0 - smoothstep(hw - 0.5, hw + 0.7, d);
    line *= 1.0 - smoothstep(0.14, 0.38, w); // fade where lines crowd into moire

    // Quieter behind the title, brighter around the pointer.
    float center = length(uv * vec2(0.85, 1.2));
    float calm = mix(0.4, 1.0, smoothstep(0.1, 0.62, center));
    float glow = min(exp(-dm / 0.05) * u_pointer.z + wave * 1.5, 1.5);
    float alpha = mix(0.13, 0.27, major) * calm * (1.0 + 1.6 * glow);

    // Intro: contours spread outward from the center behind a bright front.
    float radius = length(uv);
    float front = u_reveal * 1.6;
    float shown = 1.0 - smoothstep(front - 0.3, front, radius);
    float edge = (radius - front) * 8.0;
    float flare = exp(-edge * edge) * (1.0 - u_reveal);

    vec3 col = u_bg + u_line * h * 0.035;
    col += u_hi * 0.05 * exp(-dot(uv, uv) * 2.4);
    col = mix(col, u_line, clamp(line * alpha * shown, 0.0, 1.0));
    col = mix(col, u_hi, clamp(line * flare * 0.65, 0.0, 1.0));
    col *= 1.0 - 0.3 * smoothstep(0.5, 1.3, length(uv * vec2(0.8, 1.0)));
    gl_FragColor = vec4(col, 1.0);
}
`;

const MAX_SCALE = 1.5; // device px per CSS px
const MIN_SCALE = 0.5;
const REVEAL_SECONDS = 2.8;
const STILL_TIME = 42; // a pleasant frame for reduced motion

const clamp01 = (x) => Math.min(1, Math.max(0, x));
const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

// "#b5a392" -> [0.71, 0.64, 0.57]
function cssColor(name, fallback) {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    const hex = /^#([0-9a-f]{6})$/i.test(value) ? value : fallback;
    return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
}

function compile(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn('hero-field:', gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}

/**
 * Starts the field on `canvas`. Returns a controller, or null when WebGL
 * is unavailable (the caller shows the static fallback instead).
 */
export function createHeroField(canvas, { reducedMotion = false, onLost } = {}) {
    const gl = canvas.getContext('webgl', {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: 'low-power',
    });
    if (!gl) return null;

    let program = null;
    let uniforms = {};

    function setup() {
        if (!gl.getExtension('OES_standard_derivatives')) return false;
        const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
        const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
        if (!vs || !fs) return false;
        program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false;
        gl.useProgram(program);

        // One oversized triangle covers the whole viewport.
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(program, 'a_pos');
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

        for (const name of ['res', 'time', 'pointer', 'ripple', 'reveal', 'scroll', 'px', 'bg', 'line', 'hi']) {
            uniforms[name] = gl.getUniformLocation(program, `u_${name}`);
        }
        gl.uniform3fv(uniforms.bg, cssColor('--c-bg', '#23201d'));
        gl.uniform3fv(uniforms.line, cssColor('--c-accent', '#b5a392'));
        gl.uniform3fv(uniforms.hi, cssColor('--c-accent-hi', '#d5c8b9'));
        return true;
    }

    if (!setup()) return null;

    let scale = Math.min(window.devicePixelRatio || 1, MAX_SCALE);
    let width = 0;
    let height = 0;
    let scroll = 0;
    let rafId = null;
    let lastFrame = 0;
    let slowFrames = 0;
    let sampledFrames = 0;
    let onscreen = true;
    const start = performance.now();
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, on: 0, target: 0 };
    const ripple = { x: 0, y: 0, start: -100 };

    const seconds = (now) => (now - start) / 1000;

    function resize() {
        const rect = canvas.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        canvas.width = Math.max(1, Math.round(width * scale));
        canvas.height = Math.max(1, Math.round(height * scale));
        gl.viewport(0, 0, canvas.width, canvas.height);
        if (reducedMotion) draw(performance.now());
    }

    function draw(now) {
        const t = seconds(now);
        pointer.x += (pointer.tx - pointer.x) * 0.08;
        pointer.y += (pointer.ty - pointer.y) * 0.08;
        pointer.on += (pointer.target - pointer.on) * 0.05;

        const sx = canvas.width / Math.max(width, 1);
        const sy = canvas.height / Math.max(height, 1);
        gl.uniform2f(uniforms.res, canvas.width, canvas.height);
        gl.uniform1f(uniforms.time, reducedMotion ? STILL_TIME : t);
        gl.uniform3f(uniforms.pointer, pointer.x * sx, (height - pointer.y) * sy, pointer.on);
        gl.uniform3f(uniforms.ripple, ripple.x * sx, (height - ripple.y) * sy, t - ripple.start);
        gl.uniform1f(uniforms.reveal, reducedMotion ? 1 : easeOutCubic(clamp01((t - 0.05) / REVEAL_SECONDS)));
        gl.uniform1f(uniforms.scroll, scroll);
        gl.uniform1f(uniforms.px, sx);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    // Drop resolution when frames run long (measured after load settles).
    function adapt(now) {
        if (lastFrame && seconds(now) > 1.5 && scale > MIN_SCALE) {
            sampledFrames++;
            if (now - lastFrame > 22) slowFrames++;
            if (sampledFrames === 40) {
                if (slowFrames > 24) {
                    scale = Math.max(MIN_SCALE, scale * 0.8);
                    resize();
                }
                sampledFrames = 0;
                slowFrames = 0;
            }
        }
        lastFrame = now;
    }

    function frame(now) {
        rafId = requestAnimationFrame(frame);
        adapt(now);
        draw(now);
    }

    function play() {
        if (reducedMotion || rafId !== null || !onscreen || document.hidden) return;
        lastFrame = 0;
        rafId = requestAnimationFrame(frame);
    }

    function pause() {
        if (rafId !== null) cancelAnimationFrame(rafId);
        rafId = null;
    }

    new ResizeObserver(resize).observe(canvas);
    resize();

    if (reducedMotion) {
        draw(performance.now());
    } else {
        const host = canvas.parentElement;
        host.addEventListener('pointermove', (e) => {
            if (e.pointerType === 'touch') return;
            const rect = canvas.getBoundingClientRect();
            pointer.tx = e.clientX - rect.left;
            pointer.ty = e.clientY - rect.top;
            if (pointer.on < 0.02) {
                pointer.x = pointer.tx;
                pointer.y = pointer.ty;
            }
            pointer.target = 1;
        });
        host.addEventListener('pointerleave', () => {
            pointer.target = 0;
        });
        host.addEventListener('pointerdown', (e) => {
            if (e.target.closest('a, button')) return;
            const rect = canvas.getBoundingClientRect();
            ripple.x = e.clientX - rect.left;
            ripple.y = e.clientY - rect.top;
            ripple.start = seconds(performance.now());
        });

        new IntersectionObserver(([entry]) => {
            onscreen = entry.isIntersecting;
            onscreen ? play() : pause();
        }).observe(canvas);
        document.addEventListener('visibilitychange', () => (document.hidden ? pause() : play()));
        play();
    }

    canvas.addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
        pause();
    });
    canvas.addEventListener('webglcontextrestored', () => {
        uniforms = {};
        if (setup()) {
            resize();
            reducedMotion ? draw(performance.now()) : play();
        } else {
            onLost?.();
        }
    });

    return {
        setScroll(progress) {
            scroll = progress;
        },
    };
}
