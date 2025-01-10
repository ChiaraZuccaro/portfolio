export interface SphereParams {
  radius?: number,
  widthSegments?: number,
  heightSegments?: number,
  phiStart?: number,
  phiLength?: number,
  thetaStart?: number,
  thetaLength?: number
}

export interface CylinderParams {
  radiusTop?: number,
  radiusBottom?: number,
  height?: number,
  radialSegments?: number,
  heightSegments?: number,
  openEnded?: boolean,
  thetaStart?: any,
  thetaLength?: any
}

export interface TorusParams {
  radius?: number,
  tube?: number,
  radialSegments?: number,
  tubularSegments?: number,
  arc?: number
}

export interface RingParams {
  innerRadius?: number,
  outerRadius?: number,
  thetaSegments?: number,
  phiSegments?: number,
  thetaStart?: number,
  thetaLength?: number
}

export interface CircleParams {
  radius?: number,
  segments?: number,
  thetaStart?: number,
  thetaLength?: number
}