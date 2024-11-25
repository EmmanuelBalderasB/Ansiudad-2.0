varying vec2 vUv;

void main()
{
    vec3 pos = position;

    float radialGradient = length(uv - 0.5);
    float fadeCircleMask = (1. - radialGradient);
    fadeCircleMask = smoothstep(0.3, 1., fadeCircleMask);
    fadeCircleMask *= 0.25;

    pos.z += fadeCircleMask;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vUv = uv;
}