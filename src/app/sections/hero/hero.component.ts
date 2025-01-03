import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Technologies } from '@app/data/techs.mock';
import { ThreeService } from '@app/services/three.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})

export class HeroComponent implements OnInit {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  constructor(private threeService: ThreeService) {}

  ngOnInit(): void {
    const canvas = this.canvasContainer.nativeElement;
    this.threeService.initializeRenderer(canvas);

    // Set background color
    this.threeService.scene.background = this.threeService.createColor(0xcce7ff); // Light blue sky

    // Create the bike
    const bike = this.createBike();
    this.threeService.addObject(bike);

    // Create the ground
    const ground = this.threeService.createBox({ width: 50, height: 0.1, depth: 10, color: 0x8b4513 }); // Brown ground
    ground.position.y = -0.5;
    this.threeService.addObject(ground);

    // Add cactus and bushes
    for (let i = 0; i < 10; i++) {
      const cactus = this.threeService.createCylinder({ radiusTop: 0.2, radiusBottom: 0.2, height: 2, color: 0x228b22 }); // Green cactus
      cactus.position.set(Math.random() * 50 - 25, 0, Math.random() * 10 - 5);
      this.threeService.addObject(cactus);
    }

    // Start the animation loop
    this.threeService.animate(() => {
      // Keep the bike stationary
      bike.rotation.y = 0;

      // Move the landscape backward
      this.threeService.scene.children.forEach((child) => {
        if (child !== bike && child.position) {
          child.position.x -= 0.1;
          if (child.position.x < -25) {
            child.position.x = 25; // Reset position to create infinite scrolling
          }
        }
      });
    });
  }

  private createBike(): any {
    const bike = this.threeService.createGroup();

    // Create the body of the bike
    const body = this.threeService.createBox({ width: 1.5, height: 0.4, depth: 0.3, color: 0xff0000 });
    bike.add(body);

    // Create retro wheels using torus geometry
    const frontWheel = this.threeService.createTorus({ radius: 0.4, tube: 0.1, radialSegments: 16, tubularSegments: 100, color: 0x000000 });
    frontWheel.position.set(0.8, -0.4, 0);
    bike.add(frontWheel);

    const backWheel = this.threeService.createTorus({ radius: 0.4, tube: 0.1, radialSegments: 16, tubularSegments: 100, color: 0x000000 });
    backWheel.position.set(-0.8, -0.4, 0);
    bike.add(backWheel);

    // Create the seat
    const seat = this.threeService.createBox({ width: 0.8, height: 0.2, depth: 0.3, color: 0x333333 });
    seat.position.set(0, 0.2, 0);
    bike.add(seat);

    // Create handlebars
    const handlebars = this.threeService.createCylinder({ radiusTop: 0.05, radiusBottom: 0.05, height: 1.0, color: 0x333333 });
    handlebars.rotation.z = Math.PI / 2;
    handlebars.position.set(0.9, 0.4, 0);
    bike.add(handlebars);

    return bike;
  }
}

