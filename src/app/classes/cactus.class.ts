import { GeometryFactory } from "@app/GeometryFactory";
import { CylinderParams, SphereParams } from "@app/interfaces/three.interface";
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

export class Cactus extends GeometryFactory {
  private smallSphere: SphereParams = {
    radius: 0.2,
    widthSegments: 16,
    heightSegments: 16
  }

  constructor() {
    super();
    this.color = 0x6ba583;
    this.material = new this.Three.MeshStandardMaterial({ color: this.color, roughness: 0.8 });

    const body = this.createBody();
    const arms = this.createArms();

    this.group.add(body, arms);
    // this.getExtCactus()
  }

  // private getExtCactus() {
  //   const mtlLoader = new MTLLoader();
  //   mtlLoader.load('/objects/cactus/cactus.mtl', (materials) => {
  //     materials.preload(); // Precarica i materiali

  //     const objLoader = new OBJLoader();
  //     objLoader.setMaterials(materials);
  //     objLoader.load(
  //       '/objects/cactus/cactus.obj',
  //       (object) => {
  //         console.log(object)
  //         object.scale.set(10, 10, 10);
  //         object.position.set(0, 0, 0); // Posiziona il modello
  //         object.traverse((child) => {
  //           if (child) {
  //             child.material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Materiale provvisorio
  //             child.castShadow = true;
  //             child.receiveShadow = true;
  //           }
  //         });
  //         this.threeService.scene.add(object); // Aggiunge il modello alla scena
  //       },
  //       undefined,
  //       (error) => {
  //         console.error('An error occurred loading the OBJ file:', error);
  //       }
  //     );
  //   });
  // }

  private createBody() {
    const body = new this.Three.Group();
    const sphereTop = this.createSphere({ radius: 0.6, widthSegments: 30, heightSegments: 30 }, this.material);
    const base = this.createCylinder({
      radiusTop: .6,
      radiusBottom: .3,
      height: 3,
      radialSegments: 20,
      heightSegments: 10
    }, this.material);

    sphereTop.position.y = 3;
    base.position.y = 1.5;

    body.add(sphereTop, base);
    return body;
  }

  //#region arms
  private createHigherArm() {
    const higherArm = new this.Three.Group();

    const cylinderBaseParams: CylinderParams = {
      radiusTop: 0.2,
      radiusBottom: 0.3,
      height: 1.3,
      radialSegments: 16,
      heightSegments: 16
    };
    const cylinderUpParams: CylinderParams = {
      radiusTop: 0.15,
      radiusBottom: 0.2,
      height: .6,
      radialSegments: 16,
      heightSegments: 16
    }

    const sphereTop = this.createSphere({ ...this.smallSphere, radius: 0.15 }, this.material);
    const sphereBottom = this.createSphere(this.smallSphere, this.material);
    const baseArm = this.createCylinder(cylinderBaseParams, this.material);
    const upArm = this.createCylinder(cylinderUpParams, this.material);

    sphereTop.position.set(-1.28, 2.6, 0);
    sphereBottom.position.set(-1.28, 2, 0)
    baseArm.position.set(-.6, 2.0, 0);
    upArm.position.set(-1.28, 2.3, 0);
    baseArm.rotation.z = Math.PI / 2;

    higherArm.add(sphereBottom, sphereTop, baseArm, upArm);

    return higherArm;
  }

  private createLowerArm() {
    const lowerArm = new this.Three.Group();

    const cylinderBaseParams: CylinderParams = {
      radiusTop: 0.2,
      radiusBottom: 0.3,
      height: 1,
      radialSegments: 16,
      heightSegments: 16
    };
    const cylinderUpParams: CylinderParams = {
      radiusTop: 0.15,
      radiusBottom: 0.2,
      height: .6,
      radialSegments: 16,
      heightSegments: 16
    }

    const sphereTop = this.createSphere({ ...this.smallSphere, radius: 0.15 }, this.material);
    const sphereBottom = this.createSphere(this.smallSphere, this.material);
    const baseArm = this.createCylinder(cylinderBaseParams, this.material);
    const upArm = this.createCylinder(cylinderUpParams, this.material);

    sphereTop.position.set(1, 1.6, 0);
    sphereBottom.position.set(1, 1, 0)
    baseArm.position.set(.5, 1, 0);
    upArm.position.set(1, 1.3, 0);
    baseArm.rotation.z = -Math.PI / 2;

    lowerArm.add(sphereBottom, sphereTop, baseArm, upArm);

    return lowerArm;
  }

  private createArms() {
    const arms = new this.Three.Group();
    const higherArm = this.createHigherArm();
    const lowerArm = this.createLowerArm();

    arms.add(higherArm, lowerArm);
    return arms;
  }
  //#endregion


  public get() {
    return this.group;
  }
}
