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