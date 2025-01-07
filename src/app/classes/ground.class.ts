import { GeometryFactory } from "@app/GeometryFactory";
import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js';
import { Cactus } from "./cactus.class";
import { ColorRepresentation, PlaneGeometry } from "three";

export class Ground extends GeometryFactory {
  private size = 256;
  private terrainWidth = 100;
  private terrainDepth = 100;
  private roadWidth = 6.5;
  private roadStart = -5;
  private roadEnd = 5;

  constructor() {
    super();

    const terrain = this.createTerrain();
    const road = this.createRoad();
  
    this.group.add(terrain, road);
  
    // Lights
    const ambientLight = new this.Three.AmbientLight(0xffffff, 0.5);
    this.threeService.scene.add(ambientLight);
  
    const directionalLight = new this.Three.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 20, 10);
    this.threeService.scene.add(directionalLight);
  }

  //#region Road
  private createStripes() {
    const allStripes = new this.Three.Group();

    const stripesMaterial = this.createRoadMaterial(0xffdd00);

    const stripesLeftGeo = new this.Three.PlaneGeometry(0.2, 100, 1, 1);
    const stripesCentralLeftGeo = new this.Three.PlaneGeometry(0.2, 100, 1, 1);
    const stripesCentralRightGeo = new this.Three.PlaneGeometry(0.2, 100, 1, 1);
    const stripesRightGeo = new this.Three.PlaneGeometry(0.2, 100, 1, 1);
    
    const stripeLeft = new this.Three.Mesh(stripesLeftGeo, stripesMaterial);
    const stripeCentralLeft = new this.Three.Mesh(stripesCentralLeftGeo, stripesMaterial);
    const stripeCentralRight = new this.Three.Mesh(stripesCentralRightGeo, stripesMaterial);
    const stripeRight = new this.Three.Mesh(stripesRightGeo, stripesMaterial);

    stripeLeft.rotateX(-Math.PI / 2);
    stripeLeft.position.set(2.9, .1, 0);
    stripeCentralLeft.rotateX(-Math.PI / 2);
    stripeCentralLeft.position.set(.2, .1, 0);
    stripeCentralRight.rotateX(-Math.PI / 2);
    stripeCentralRight.position.set(-.2, .1, 0);
    stripeRight.rotateX(-Math.PI / 2);
    stripeRight.position.set(-2.9, .1, 0);

    allStripes.add(stripeLeft, stripeCentralLeft, stripeCentralRight, stripeRight);
    return allStripes;
  }
  
  private createRoadGeometry() {
    const roadGeometry = new this.Three.PlaneGeometry(this.roadWidth, this.terrainDepth, 1, 1);
    roadGeometry.rotateX(-Math.PI / 2);
    roadGeometry.translate(0, 0, 0);
    return roadGeometry;
  }

  private createRoadMaterial(color: ColorRepresentation) {
    const roadTexture = new this.Three.TextureLoader().load('./textures/asphalt_black.jpg');
    roadTexture.wrapS = this.Three.RepeatWrapping;
    roadTexture.wrapT = this.Three.RepeatWrapping;
    roadTexture.repeat.set(1, 5);
  
    const roadMaterial = new this.Three.MeshStandardMaterial({
      color, map: roadTexture, roughness: 1
    });
    return roadMaterial;
  }

  private createRoad() {
    const roadGroup = new this.Three.Group();

    const roadGeo = this.createRoadGeometry();
    const roadMaterial = this.createRoadMaterial(0x333333);

    const stripes = this.createStripes();
    const road = new this.Three.Mesh(roadGeo, roadMaterial);

    roadGroup.add(road, stripes);
    return roadGroup;
  }
  //#endregion

  //#region Terrain
  private createTerrainGeometry() {
    const terrainGeometry = new this.Three.PlaneGeometry(this.terrainWidth, this.terrainDepth, this.size - 1, this.size - 1);
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

  private createTerrainMaterial() {
    const terrainTexture = new this.Three.TextureLoader().load('./textures/sand.jpg');
    terrainTexture.wrapS = this.Three.RepeatWrapping;
    terrainTexture.wrapT = this.Three.RepeatWrapping;
    terrainTexture.repeat.set(1,1);
  
    return new this.Three.MeshStandardMaterial({
      map: terrainTexture,
      color: 0xd2b48c,
      roughness: 1,
    });
  }

  private createTerrain() {
    const geoTerrain = this.createTerrainGeometry();
    const materialTerrain = this.createTerrainMaterial();
    const terrain = new this.Three.Mesh(geoTerrain, materialTerrain);
    terrain.position.y = -.03;
    this.addCactus(geoTerrain);
    return terrain;
  }
  //#endregion

  //#region Cactus
  private addCactus(geoTerrain: PlaneGeometry) {
    const cactusCount = 30;
    const vertices = geoTerrain.attributes['position'];
    const groupCactus = new this.Three.Group();

    for (let i = 0; i < cactusCount; i++) {
      let x, z, y;
      // With this do-while we avoid road space
      do {
        const index = Math.floor(Math.random() * vertices.count);
        x = vertices.getX(index);
        z = vertices.getZ(index);
        y = vertices.getY(index);
  
      } while (x > this.roadStart && x < this.roadEnd || x < 0);
  
      const cactus = new Cactus().get();
      cactus.position.set(x, y, z);
      cactus.scale.set(0.5, 0.5, 0.5);
  
      groupCactus.add(cactus);
    }

    this.group.add(groupCactus);
  }
  //#endregion

  public get() {
    return this.group;
  }
}