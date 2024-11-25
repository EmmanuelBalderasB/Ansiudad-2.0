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
    float speed = 0.7;

    vec2 uv = uvToPolarFlowing(vUv, -uAnimate * speed);
    vec2 uv2 = rotate(vUv, 30. + (uAnimate * -1.), vec2(0.5));
    uv2 = uvToPolarFlowing(uv2, -uAnimate * (speed * 1.25));

    vec4 texel = texture2D(tMap, uv);
    vec4 texel2 = texture2D(tMap, uv2);
    texel *= texel2;
    texel *= 2.;

    float radialGradient = length(vUv - 0.5);
    float radialMask = 1. - radialGradient;
    radialMask += 0.05;
    // radialMask = pow(radialMask, 6.);
    texel *= radialMask;

    float centerMask = smoothstep(0.0, 0.08, radialGradient);
    texel *= centerMask;

    // texel = vec4(1. - step(texel.r, 0.1));
    texel = vec4(smoothstep(0.15, (cos(uAnimate * 5.) * 0.3) + 0.7, texel.r));

    float alpha = texel.r;

    // vec3 purple = vec3(0.37, 0.22, 0.51);
    texel *= (sin(uAnimate * 20.) * 0.05) + 0.05;
    vec3 colorOverlay = uColor;
    texel.rgb += colorOverlay;

    float centerGlowStrength = 1. - radialGradient;
    float centerGlowStrength2 = smoothstep(0.6, 1.15, centerGlowStrength);
    centerGlowStrength = smoothstep(0.75, 1., centerGlowStrength);
    centerGlowStrength = pow(centerGlowStrength + 0.1, 3.);
    vec3 centerGlow = colorOverlay * centerGlowStrength;
    centerGlow += pow(centerGlowStrength2 + 0.2, 4.);

    texel.rgb += centerGlow;
    alpha += centerGlowStrength2;

    float fadeCircleMask = (1. - radialGradient);
    fadeCircleMask = smoothstep(0.5, .7, fadeCircleMask);

    alpha *= fadeCircleMask;

    // gl_FragColor = vec4(centerGlow, centerGlowStrength);
    gl_FragColor = vec4(texel.rgb, alpha);
    // gl_FragColor = vec4(fadeCircleMask);
}