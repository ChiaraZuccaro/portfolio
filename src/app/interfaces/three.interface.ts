export interface BoxParams {
  width?: number;
  height?: number;
  depth?: number;
  color?: number;
}

export interface CylinderParams {
  radiusTop?: number;
  radiusBottom?: number;
  height?: number;
  color?: number;
}

export interface TorusParams {
  radius?: number;
  tube?: number;
  radialSegments?: number;
  tubularSegments?: number;
  color?: number;
}