import { GeometryFactory } from "@app/GeometryFactory";
import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js';
import { Cactus } from "./cactus.class";
import { Group, Mesh, MeshStandardMaterial, PlaneGeometry, RepeatWrapping, Texture, TextureLoader } from "three";

export class Ground extends GeometryFactory {
  private size = 256;
  private terrainWidth = 300;
  private terrainDepth = 300;

  private terrainSegments: Mesh[];
  private terrainTexture: Texture;

  constructor() {
    super();
    this.material = this.createTerrainMaterial();
    const terrain = this.createTerrain();
  
    this.group.add(terrain);
  }

  private createTerrainMaterial() {
    this.terrainTexture = this.textureLoader.load('./textures/sand.jpg');
    this.terrainTexture.wrapS = RepeatWrapping;
    this.terrainTexture.wrapT = RepeatWrapping;
    this.terrainTexture.repeat.set(1,1);
  
    return new MeshStandardMaterial({
      map: this.terrainTexture,
      color: 0xd2b48c,
      roughness: 1,
    });
  }

  //#region Terrain
  private createTerrainGeometry() {
    const terrainGeometry = new PlaneGeometry(this.terrainWidth, this.terrainDepth, this.size - 1, this.size - 1);
    terrainGeometry.rotateX(-Math.PI / 2);

    // Perlin Noise to generate random heights
    const data = new Float32Array(this.size * this.size);
    const perlin = new ImprovedNoise();
    const quality = 10;

    // Cyrcle that is going to be flat same as road dimensions minus 5
    const innerRadius = 85;
    const outerRadius = 105;

    for (let i = 0; i < data.length; i++) {
      const x = terrainGeometry.attributes['position'].getX(i);
      const z = terrainGeometry.attributes['position'].getZ(i);

      const distanceFromCenter = Math.sqrt(x ** 2 + z ** 2);

      if (distanceFromCenter >= innerRadius && distanceFromCenter <= outerRadius) {
        data[i] = 0;
      } else {
        data[i] = perlin.noise(x / quality, 12 / quality, z / quality) * 2.5;
      }
    }
    for (let i = 0; i < terrainGeometry.attributes['position'].count; i++) {
      terrainGeometry.attributes['position'].setY(i, data[i]);
    }
    // Realistic illumination
    terrainGeometry.computeVertexNormals();

    return terrainGeometry;
  }

  private createTerrain() {
    const geoTerrain = this.createTerrainGeometry();
    const terrain = new Mesh(geoTerrain, this.material);
    terrain.position.y = -.03;

    const cactusGroup = this.addCactus(geoTerrain);
    terrain.add(cactusGroup);
    return terrain;
  }
  //#endregion

  //#region Cactus
  private addCactus(geoTerrain: PlaneGeometry): Group {
    const cactusCount = 170;
    const innerRoadRadius = 88;
    const outerRoadRadius = 102;

    const groupCactus = new Group();
    const vertices = geoTerrain.attributes['position'];

    for (let i = 0; i < cactusCount; i++) {
      let x, z, y;

      do {
        const index = Math.floor(Math.random() * vertices.count);
        x = vertices.getX(index);
        z = vertices.getZ(index);
        y = vertices.getY(index);
      } while (
        Math.sqrt(x ** 2 + z ** 2) >= innerRoadRadius && Math.sqrt(x ** 2 + z ** 2) <= outerRoadRadius
      );

      const cactus = new Cactus().get();
      cactus.position.set(x, y, z);
      cactus.rotateY(Math.random() * i);
      cactus.scale.set(0.7, 0.7, 0.7);

      groupCactus.add(cactus);
    }

    return groupCactus;
  }
  //#endregion

  public get() {
    return this.group;
  }

  public update() {
    // Road texture animation
    this.terrainSegments.forEach((segment) => {
      segment.position.z -= 0.2;

      if (segment.position.z < -this.terrainDepth) {
        segment.position.z = this.terrainDepth * 1;
      }
    });
  }
}