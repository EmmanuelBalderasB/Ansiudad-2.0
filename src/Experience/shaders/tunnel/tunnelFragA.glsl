#define PI 3.1415926535897932384626433832795

uniform sampler2D tMap;
uniform vec3 uColor;
uniform float uAnimate;
varying vec2 vUv;

#include ../utils/random;
#include ../utils/transformUV;
#include ../utils/cnoise;

void main()
{
    vec2 uv = uvToPolarFlowing(vUv, -uAnimate);

    vec4 texel = texture2D(tMap, uv);
    // texel = vec4(1.) - texel;

    float fade = length(vUv - 0.5);
    fade = pow(1. - fade, 2.);
    texel *= fade;
    texel = smoothstep(vec4(0.3), vec4(0.4), texel);
    float alpha = texel.r;

    // vec3 purple = vec3(0.37, 0.22, 0.51);
    vec3 colorOverlay = uColor;
    texel.rgb *= colorOverlay;

    gl_FragColor = vec4(texel.rgb, alpha);
}