import { GeometryFactory } from "@app/GeometryFactory";
import { CylinderParams, SphereParams } from "@app/interfaces/three.interface";

export class Cactus extends GeometryFactory {
  private group = new this.Three.Group();

  private smallSphere: SphereParams = {
    radius: 0.2,
    widthSegments: 16, 
    heightSegments: 16
  }
  
  constructor() {
    super();
    this.color = 0x6ba583;
    this.material = new this.Three.MeshStandardMaterial({ color: this.color, roughness: 0.8 });
    this.createCentral()
    this.createArms();
  }

  private createCentral() {
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

    this.group.add(sphereTop, base);
  }

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
    const higherArm = this.createHigherArm();
    const lowerArm = this.createLowerArm();

    this.group.add(higherArm, lowerArm);
  }


  public get() {
    return this.group;
  }
}
