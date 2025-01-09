import { GeometryFactory } from "@app/GeometryFactory";
import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js';
import { Cactus } from "./cactus.class";
import { AmbientLight, DirectionalLight, Group, Mesh, MeshStandardMaterial, PlaneGeometry, RepeatWrapping, Texture, TextureLoader } from "three";

export class Ground extends GeometryFactory {
  private size = 256;
  private terrainWidth = 100;
  private terrainDepth = 100;
  private roadStart = -5;
  private roadEnd = 5;

  private groupCactus: Group;
  private terrainSegments: Mesh[];
  private terrainTexture: Texture;
  private animatedTextures: Texture[] = [];
  private lastSegmentEdge: number[] = [];

  constructor() {
    super();

    const terrain = this.createTerrain();
  
    this.group.add(terrain);
  
    // Lights
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    this.threeService.scene.add(ambientLight);
  
    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 20, 10);
    this.threeService.scene.add(directionalLight);
  }


  // private createCircularTerrain(): Mesh {
  //   const terrainRadius = 60; // Raggio maggiore rispetto alla strada
  //   const terrainWidth = 20; // Larghezza dell'anello del terreno
  
  //   const terrainGeometry = new TorusGeometry(terrainRadius, terrainWidth / 2, 16, 100);
  //   const terrainMaterial = new MeshStandardMaterial({
  //     color: 0xd2b48c, // Sabbia
  //     roughness: 1,
  //   });
  
  //   const terrain = new Mesh(terrainGeometry, terrainMaterial);
  //   terrain.rotation.x = Math.PI / 2; // Allinea l'anello al piano orizzontale
  //   return terrain;
  // }

  //#region Terrain
  private createTerrainGeometry() {
    const terrainGeometry = new PlaneGeometry(this.terrainWidth, this.terrainDepth, this.size - 1, this.size - 1);
    terrainGeometry.rotateX(-Math.PI / 2);

    // Perlin Noise for Terrain Heights
    const data = new Float32Array((this.size + 10) * (this.size + 10));
    const perlin = new ImprovedNoise();
    let quality = 10;

    // Memorizza il bordo anteriore del segmento corrente
    let currentSegmentEdge: number[] = [];

    // Generazione dell'altezza del terreno
    for (let i = 0; i < data.length; i++) {
      const x = terrainGeometry.attributes['position'].getX(i);
      const z = terrainGeometry.attributes['position'].getZ(i);

      if (x > this.roadStart && x < this.roadEnd) {
        // Mantieni la strada piatta
        data[i] = 0;
      } else if (z === -this.terrainDepth / 2 && this.lastSegmentEdge.length > 0) {
        // Usa il bordo finale del segmento precedente per il bordo iniziale
        data[i] = this.lastSegmentEdge.shift()!;
      } else {
        // Genera l'altezza con Perlin Noise
        data[i] = perlin.noise(x / quality, 12 / quality, z / quality) * 2.5;

        // Se siamo sul bordo finale, salviamo l'altezza
        if (z === this.terrainDepth / 2) {
          currentSegmentEdge.push(data[i]);
        }
      }
    }

    // Salva il bordo anteriore per il prossimo segmento
    this.lastSegmentEdge = currentSegmentEdge;

    // Applica le altezze al terreno
    for (let i = 0; i < terrainGeometry.attributes['position'].count; i++) {
      terrainGeometry.attributes['position'].setY(i, data[i]);
    }

    terrainGeometry.computeVertexNormals();

    return terrainGeometry;



    // const terrainGeometry = new PlaneGeometry(this.terrainWidth, this.terrainDepth, this.size - 1, this.size - 1);
    // terrainGeometry.rotateX(-Math.PI / 2);
  
    // // Perlin Noise for Terrain Heights
    // const data = new Float32Array(this.size * this.size);
    // const perlin = new ImprovedNoise();
    // let quality = 10;
    // for (let i = 0; i < data.length; i++) {
    //   const x = terrainGeometry.attributes['position'].getX(i);
    //   const z = terrainGeometry.attributes['position'].getZ(i);

    //   if (x > this.roadStart && x < this.roadEnd) {
    //     data[i] = 0;
    //   } else {
    //     data[i] = perlin.noise(x / quality, 12/ quality, z / quality) * 2.5;
    //   }
    // }
  
    // for (let i = 0; i < terrainGeometry.attributes['position'].count; i++) {
    //   terrainGeometry.attributes['position'].setY(i, data[i]);
    // }
  
    // terrainGeometry.computeVertexNormals();

    // return terrainGeometry;
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

  private createTerrain() {
    const geoTerrain = this.createTerrainGeometry();
    const materialTerrain = this.createTerrainMaterial();

    // Segmento 1
    const terrainSegment1 = new Mesh(geoTerrain, materialTerrain);
    terrainSegment1.position.set(0, -0.03, 0);

    // Aggiungi i cactus al primo segmento
    const cactusGroup1 = this.addCactus(geoTerrain); // Genera i cactus per il segmento 1
    terrainSegment1.add(cactusGroup1);

    // Segmento 2 (posizionato dietro il primo)
    const terrainSegment2 = new Mesh(geoTerrain, materialTerrain);
    terrainSegment2.position.set(0, -0.03, -this.terrainDepth);

    // Aggiungi i cactus al secondo segmento
    const cactusGroup2 = this.addCactus(geoTerrain); // Genera i cactus per il segmento 2
    terrainSegment2.add(cactusGroup2);

    // Gruppo per contenere entrambi i segmenti
    const terrainGroup = new Group();
    terrainGroup.add(terrainSegment1, terrainSegment2);

    // Salva i segmenti come proprietà per animarli
    this.terrainSegments = [terrainSegment1, terrainSegment2];

    return terrainGroup;


    // const geoTerrain = this.createTerrainGeometry();
    // const materialTerrain = this.createTerrainMaterial();
    // const terrain = new Mesh(geoTerrain, materialTerrain);
    // terrain.position.y = -.03;

    // const cactusGroup = this.addCactus(geoTerrain);
    // terrain.add(cactusGroup);
    // return terrain;
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
    this.animatedTextures.forEach(texture => {
      texture.offset.y -= 0.01; // Applica l'animazione
    });
    // Texture terrain animation
    // if (this.terrainTexture) {
    //   this.terrainTexture.offset.y -= 0.002;
    // }

    this.terrainSegments.forEach((segment) => {
      segment.position.z -= 0.2; // Sposta il segmento in avanti

      // Quando un segmento esce dal campo visivo, ricollocalo dietro
      if (segment.position.z < -this.terrainDepth) {
        segment.position.z = this.terrainDepth * 1; // Spostalo dietro l'altro segmento
      }
    });
    // if (this.terrain) {
    //   this.terrain.position.z += 0.1; // Muovi il terreno in avanti
    //   if (this.terrain.position.z > 50) {
    //     this.terrain.position.z = 0; // Riporta il terreno indietro per un movimento infinito
    //   }
    // }
    // Cactus animation
    // if (this.groupCactus) {
    //   this.updateCactus();
    // }
  }
}