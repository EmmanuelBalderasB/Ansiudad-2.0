#define PI 3.1415926535897932384626433832795

vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

vec2 uvToPolar(vec2 uv) {
    // Step 1: Translate UV to center
    vec2 centeredUV = uv - 0.5;
    
    // Step 2: Calculate radius
    float radius = length(centeredUV); // sqrt(centeredUV.x^2 + centeredUV.y^2)

    // Step 3: Calculate angle (in radians)
    float angle = atan(centeredUV.y, centeredUV.x); // Range: [-PI, PI]

    // Optional: Normalize the angle to [0, 1]
    angle = (angle + PI) / (2.0 * PI); // Range: [0, 1]

    // Return polar coordinates (radius, normalized angle)
    return vec2(radius, angle);
}

vec2 uvToPolarFlowing(vec2 uv, float time) {
  // Step 1: Translate UV to center
    vec2 centeredUV = uv - 0.5;
    
    // Step 2: Calculate radius
    float radius = length(centeredUV); // sqrt(centeredUV.x^2 + centeredUV.y^2)

    // Step 2.1: add time offset to make it flow
    radius += time;

    // Step 3: Calculate angle (in radians)
    float angle = atan(centeredUV.y, centeredUV.x); // Range: [-PI, PI]

    // Optional: Normalize the angle to [0, 1]
    angle = (angle + PI) / (2.0 * PI); // Range: [0, 1]

    // Return polar coordinates (radius, normalized angle)
    return vec2(radius, angle);
}