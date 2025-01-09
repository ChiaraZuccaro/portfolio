import { GeometryFactory } from "@app/GeometryFactory";
import { RingParams } from "@app/interfaces/three.interface";
import { ColorRepresentation, Group, Mesh, MeshStandardMaterial, PlaneGeometry, RepeatWrapping, Texture, TextureLoader } from "three";

export class Road extends GeometryFactory {
  private animatedTextures: Texture[] = [];

  private innerRadius = 50;
  private outerRadius = 60;
  private segments = 1000;

  private ringRoadParams: RingParams = {
    innerRadius: this.innerRadius,
    outerRadius: this.outerRadius,
    thetaSegments: this.segments
  }

  constructor() {
    super();
    this.createRoute()
  }

  private createRoadMaterial(color: ColorRepresentation) {
    const roadTexture = new TextureLoader().load('./textures/asphalt_black.jpg');
    roadTexture.wrapS = RepeatWrapping;
    roadTexture.wrapT = RepeatWrapping;
    roadTexture.repeat.set(1, 2);
    roadTexture.center.set(.5,.5);

    this.animatedTextures.push(roadTexture);
  
    return new MeshStandardMaterial({
      map: roadTexture, color , roughness: 1
    });
  }

  private createSingleStripe(ring: RingParams) {
    const stripeMaterial = this.createRoadMaterial(0xffdd00);
    const stripe = this.createRing(ring, stripeMaterial);
    stripe.rotation.x = -Math.PI / 2;
    return stripe;
  }

  private createRoadStripes(): Group {
    const centerRoad = (this.outerRadius - this.innerRadius) / 2;
    const stripesGroup = new Group();

    const exStripe = this.createSingleStripe({
      innerRadius: this.outerRadius - .5,
      outerRadius: this.outerRadius - .3,
      thetaSegments: this.segments
    });
    const inStripe = this.createSingleStripe({
      innerRadius: this.innerRadius + .3,
      outerRadius: this.innerRadius + .5,
      thetaSegments: this.segments
    });
    const inCentralStripe = this.createSingleStripe({
      innerRadius: this.innerRadius + centerRoad - .5,
      outerRadius: this.innerRadius + centerRoad - .3,
      thetaSegments: this.segments
    });
    const exCentralStripe = this.createSingleStripe({
      innerRadius: this.outerRadius - centerRoad + .3,
      outerRadius: this.outerRadius - centerRoad + .5,
      thetaSegments: this.segments
    });
    stripesGroup.add(exStripe, exCentralStripe, inStripe, inCentralStripe);
    stripesGroup.position.y = .01;

    return stripesGroup;
  }
  

  private createCircularRoad() {
    const roadMaterial = this.createRoadMaterial(0x333333);
    const road = this.createRing(this.ringRoadParams, roadMaterial);
    road.rotateX(-Math.PI / 2);
    return road;
  }

  private createRoute() {
    const road = this.createCircularRoad();
    const stripes = this.createRoadStripes();
    this.group.add(road, stripes);
  }

  public get() {
    return this.group;
  }

  public update() {
    this.animatedTextures.forEach(texture => {
      texture.rotation += 0.003
    });
  }
}
