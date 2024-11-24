uniform sampler2D tMap;
uniform vec3 uColor;
varying vec2 vUv;

void main () {
    vec4 texel = texture2D(tMap, vUv);

    float fade = vUv.y;
    texel.a *= fade;

    gl_FragColor = texel;
}