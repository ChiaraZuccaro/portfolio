import { GeometryFactory } from "@app/GeometryFactory";
import { BufferGeometry, Color, Fog, Mesh, MeshStandardMaterial } from "three";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise.js";

export class Mountain extends GeometryFactory {
  private fogColor: number = 0xcce0ff;
  private fogNear: number = 50;
  private fogFar: number = 100;

  private levels: number = 3;
  private radius: number = 150;
  private height: number = 20;

  constructor() {
    super();
    this.material = new MeshStandardMaterial({
      color: 0x946344,
      roughness: 1,
      flatShading: true,
    });
    this.createMountainLevels();
  }

  private createMountainLevels() {
    const noise = new ImprovedNoise();
    const quality = 10;

    for (let i = 0; i < this.levels; i++) {
      const torusRadius = this.radius + i * 30;
      const torusHeight = this.height + i * 10;

      const geometry = this.torusGeoInstance({
        radius: torusRadius,
        tube: torusHeight,
        radialSegments: 32,
        tubularSegments: 100
      });

      const positionAttribute = geometry.attributes['position'];
      for (let j = 0; j < positionAttribute.count; j++) {
        const x = positionAttribute.getX(j);
        const y = positionAttribute.getY(j);
        const z = positionAttribute.getZ(j);

        const noiseValue = noise.noise(x / quality, y / quality, z / quality);
        positionAttribute.setXYZ(j, x, y + noiseValue * 10, z);
      }

      positionAttribute.needsUpdate = true;
      geometry.computeVertexNormals();

      const mesh = new Mesh(geometry, this.material);
      mesh.rotation.x = Math.PI / 2;
      this.group.add(mesh);
    }
  }

  public get() {
    return this.group;
  }
}
