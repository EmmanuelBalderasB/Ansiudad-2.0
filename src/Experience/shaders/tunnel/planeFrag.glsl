#define PI 3.1415926535897932384626433832795

uniform float uAnimate;
varying vec2 vUv;

#include ../utils/random;
#include ../utils/transformUV;
#include ../utils/cnoise;

void main()
{
    // // Pattern 1
    // gl_FragColor = vec4(vUv, 1.0, 1.0);

    // // Pattern 2
    // gl_FragColor = vec4(vUv, 0.0, 1.0);

    // // Pattern 3
    // float strength = vUv.x;

    // // Pattern 4
    // float strength = vUv.y;

    // // Pattern 5
    // float strength = 1.0 - vUv.y;

    // // Pattern 6
    // float strength = vUv.y * 10.0;

    // // Pattern 7
    // float strength = mod(vUv.y * 10.0, 1.0);

    // // Pattern 8
    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.5, strength);

    // // Pattern 9
    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.8, strength);

    // // Pattern 10
    // float strength = mod(vUv.x * 10.0, 1.0);
    // strength = step(0.8, strength);

    // // Pattern 11
    // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength += step(0.8, mod(vUv.y * 10.0, 1.0));
    // strength = clamp(strength, 0.0, 1.0);

    // // Pattern 12
    // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));

    // // Pattern 13
    // float strength = step(0.4, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));

    // // Pattern 14
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
    // float barY = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0, 1.0));
    // float strength = barX + barY;
    // strength = clamp(strength, 0.0, 1.0);

    // // Pattern 15
    // float barX = step(0.4, mod(vUv.x * 10.0 - 0.2, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
    // float barY = step(0.8, mod(vUv.x * 10.0, 1.0)) * step(0.4, mod(vUv.y * 10.0 - 0.2, 1.0));
    // float strength = barX + barY;
    // strength = clamp(strength, 0.0, 1.0);

    // // Pattern 16
    // float strength = abs(vUv.x - 0.5);

    // // Pattern 17
    // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    // // Pattern 18
    // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    // // Pattern 19
    // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

    // // Pattern 20
    // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // strength *= 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

    // // Pattern 21
    // float strength = floor(vUv.x * 10.0) / 10.0;

    // // Pattern 22
    // float strength = floor(vUv.x * 10.0) / 10.0 * floor(vUv.y * 10.0) / 10.0;

    // // Pattern 23
    // float strength = random(vUv);

    // // Pattern 24
    // vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, floor(vUv.y * 10.0) / 10.0);
    // float strength = random(gridUv);

    // // Pattern 25
    // vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, floor((vUv.y + vUv.x * 0.5) * 10.0) / 10.0);
    // float strength = random(gridUv);

    // // Pattern 26
    // float strength = length(vUv);

    // // Pattern 27
    // float strength = distance(vUv, vec2(0.5));

    // // Pattern 28
    // float strength = 1.0 - distance(vUv, vec2(0.5));

    // // Pattern 29
    // float strength = 0.015 / (distance(vUv, vec2(0.5)));

    // // Pattern 30
    // float strength = 0.15 / (distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));

    // // Pattern 31
    // float strength = 0.15 / (distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
    // strength *= 0.15 / (distance(vec2(vUv.y, (vUv.x - 0.5) * 5.0 + 0.5), vec2(0.5)));

    // // Pattern 32
    // vec2 rotatedUv = rotate(vUv, PI * 0.25, vec2(0.5));
    // float strength = 0.15 / (distance(vec2(rotatedUv.x, (rotatedUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
    // strength *= 0.15 / (distance(vec2(rotatedUv.y, (rotatedUv.x - 0.5) * 5.0 + 0.5), vec2(0.5)));

    // // Pattern 33
    // float strength = step(0.5, distance(vUv, vec2(0.5)) + 0.25);

    // // Pattern 34
    // float strength = abs(distance(vUv, vec2(0.5)) - 0.25);

    // // Pattern 35
    // float strength = step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));

    // // Pattern 36
    // float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));

    // // Pattern 37
    // vec2 wavedUv = vec2(
    //     vUv.x,
    //     vUv.y + sin(vUv.x * 30.0) * 0.1
    // );
    // float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    // // Pattern 38
    // vec2 wavedUv = vec2(
    //     vUv.x + sin(vUv.y * 30.0) * 0.1,
    //     vUv.y + sin(vUv.x * 30.0) * 0.1
    // );
    // float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    // // Pattern 39
    // vec2 wavedUv = vec2(
    //     vUv.x + sin(vUv.y * 100.0) * 0.1,
    //     vUv.y + sin(vUv.x * 100.0) * 0.1
    // );
    // float strength = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    // // Pattern 40
    // float angle = atan(vUv.x, vUv.y);
    // float strength = angle;

    // // Pattern 41
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // float strength = angle;

    // // Pattern 42
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    // float strength = angle;

    // // Pattern 43
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    // float strength = mod(angle * 20.0, 1.0);

    // // Pattern 44
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    // float strength = sin(angle * 100.0);

    // // Pattern 45
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 2.0) + 0.5;
    // float radius = 0.25 + sin(angle * 100.0) * 0.02;
    // float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - radius));

    // // Pattern 46
    // float strength = cnoise(vUv * 10.0);

    // // Pattern 47
    // float strength = step(0.0, cnoise(vUv * 10.0));

    // // Pattern 48
    // float strength = 1.0 - abs(cnoise(vUv * 10.0));

    // // Pattern 49
    float uTime = mod(uAnimate, PI * 10.);

    vec2 uv = vUv;
    vec2 uvMirror = vec2(1. - uv.x, uv.y);

    uv.x += uTime * 0.05;
    uvMirror.x += uTime * 0.05;
    float mirrorStep = step(0.5, vUv.x);
    uv = mix(uv, uvMirror, mirrorStep);
    uv = rotate(uv, uTime * 0.01, vec2(0.5));

    float strength = sin((cnoise(uv * 0.5) * 50.0) + uAnimate);

    // Pattern 50
    // float strength = step(0.9, sin(cnoise(vUv * 10.0) * 20.0));

    // Final color
    vec3 bgColor = vec3(vUv.y) * 0.5;
    vec3 uvColor = vec3(vUv.y, 0, 1.0);
    vec3 mixedColor = mix(bgColor, uvColor, strength);
    // vec3 mixedColor = vec3(vUv.x);

    // gl_FragColor = vec4(mixedColor, strength + 0.5);
    gl_FragColor = vec4(strength);
}