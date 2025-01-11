import { GeometryFactory } from "@app/GeometryFactory";
import { BufferAttribute, InterleavedBufferAttribute, Mesh, MeshStandardMaterial, RepeatWrapping, TextureLoader } from "three";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise.js";

export class Mountains extends GeometryFactory {
  private levels: number = 3; // Number of mountain layers
  private radius: number = 150; // Base radius of the torus
  private height: number = 20; // Thickness of the torus
  private peakHeightFactor: number = 0.1; // Maximum peak height as a fraction of radius
  private sharpness: number = 2; // Sharpness factor for peaks

  constructor() {
    super();
    this.material = this.createMaterial();
    this.createMountainLevels();
  }

  private createMaterial() {
    const mountainTexture = new TextureLoader().load('./textures/mountains.jpg');
    mountainTexture.wrapS = RepeatWrapping;
    mountainTexture.wrapT = RepeatWrapping;
    mountainTexture.repeat.set(1,1);

    return new MeshStandardMaterial({
      map: mountainTexture,
      color: 0x946344,
      roughness: 1,
      flatShading: true
    });
  }

  private firstLevelMountain(positionAttribute: BufferAttribute | InterleavedBufferAttribute, quality: number, noise: ImprovedNoise) {
    for (let j = 0; j < positionAttribute.count; j++) {
      const x = positionAttribute.getX(j);
      const y = positionAttribute.getY(j);
      const z = positionAttribute.getZ(j);

      const noiseValue = noise.noise(x / quality, y / quality, z / quality);
      positionAttribute.setXYZ(j, x, y + noiseValue * 10, z);
    }
  }

  private otherLevelsMountain(positionAttribute: BufferAttribute | InterleavedBufferAttribute, quality: number, noise: ImprovedNoise) {
    const peakAmplification = this.radius * this.peakHeightFactor; // Limit peak height to 10% of radius
    for (let j = 0; j < positionAttribute.count; j++) {
      const x = positionAttribute.getX(j);
      const y = positionAttribute.getY(j);
      const z = positionAttribute.getZ(j);
      // Calculate distance from the center of the torus (radial distance)
      const radialDistance = Math.sqrt(x ** 2 + z ** 2);
      // Generate noise for peaks
      const noiseValue = noise.noise(x / quality, z / quality, radialDistance / quality);
      // Amplify noise for vertical peaks
      const amplifiedPeak = noiseValue * peakAmplification * this.sharpness;
      // Apply only to Y-axis
      positionAttribute.setXYZ(j, x, y, z + amplifiedPeak);
    }
  }

  private createMountainLevels() {
    const noise = new ImprovedNoise();
    const quality = 10;

    for (let i = 0; i < this.levels; i++) {
      const torusRadius = this.radius + i * 20; // Each layer increases in radius
      const torusThickness = this.height + i * 10; // Thickness grows for each layer

      const geometry = this.torusGeoInstance({
        radius: torusRadius,
        tube: torusThickness,
        radialSegments: 300,
        tubularSegments: 7500
      });

      const positionAttribute = geometry.attributes['position'];
      if(i === 0) {
        this.firstLevelMountain(positionAttribute, quality, noise);
      } else {
        this.otherLevelsMountain(positionAttribute, quality, noise);
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