import { GeometryFactory } from "@app/GeometryFactory";
import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js';
import { Cactus } from "./cactus.class";
import { AmbientLight, DirectionalLight, Group, Mesh, MeshStandardMaterial, PlaneGeometry, RepeatWrapping, Texture, TextureLoader } from "three";

export class Ground extends GeometryFactory {
  private size = 256;
  private terrainWidth = 300;
  private terrainDepth = 300;
  private roadStart = -5;
  private roadEnd = 5;

  private terrainSegments: Mesh[];
  private terrainTexture: Texture;

  constructor() {
    super();
    this.material = this.createTerrainMaterial();

    const terrain = this.createTerrain();
  
    this.group.add(terrain);
  
    // Lights
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    this.threeService.scene.add(ambientLight);
  
    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 20, 10);
    this.threeService.scene.add(directionalLight);
  }

  private createTerrainMaterial() {
    this.terrainTexture = new TextureLoader().load('./textures/sand.jpg');
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
  
    // Perlin Noise for Terrain Heights
    const data = new Float32Array(this.size * this.size);
    const perlin = new ImprovedNoise();
    let quality = 10;
    for (let i = 0; i < data.length; i++) {
      const x = terrainGeometry.attributes['position'].getX(i);
      const z = terrainGeometry.attributes['position'].getZ(i);

      if (x > this.roadStart && x < this.roadEnd) {
        data[i] = 0;
      } else {
        data[i] = perlin.noise(x / quality, 12/ quality, z / quality) * 2.5;
      }
    }
  
    for (let i = 0; i < terrainGeometry.attributes['position'].count; i++) {
      terrainGeometry.attributes['position'].setY(i, data[i]);
    }
  
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
    const cactusCount = 30; // Numero di cactus per segmento
    const vertices = geoTerrain.attributes['position'];
    const groupCactus = new Group();

    for (let i = 0; i < cactusCount; i++) {
      let x, z, y;
      // With this do-while we avoid road space
      do {
        const index = Math.floor(Math.random() * vertices.count);
        x = vertices.getX(index);
        z = vertices.getZ(index);
        y = vertices.getY(index);
      } while (x > this.roadStart && x < this.roadEnd);

      const cactus = new Cactus().get();
      cactus.position.set(x, y, z);
      cactus.scale.set(0.5, 0.5, 0.5);
  
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
      segment.position.z -= 0.2; // Sposta il segmento in avanti

      // Quando un segmento esce dal campo visivo, ricollocalo dietro
      if (segment.position.z < -this.terrainDepth) {
        segment.position.z = this.terrainDepth * 1; // Spostalo dietro l'altro segmento
      }
    });
  }
}