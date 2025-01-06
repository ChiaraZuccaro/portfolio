import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Cactus } from '@app/classes/cactus.class';
import { Ground } from '@app/classes/ground.class';
import { ThreeService } from '@app/services/three.service';

@Component({
  selector: 'hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})

export class HeroComponent implements OnInit {
  private _threeService = inject(ThreeService);

  @ViewChild('canvasContainer', { static: true }) canvasContainer: ElementRef;

  ngOnInit() {
    this._threeService.initScenario();

    for (let i = 0; i < 3; i++) {
      const cactus = new Cactus().get();
      cactus.position.set(2 + (i * 70), 0, -3.5);
      this._threeService.addObj(cactus);
    }

    const ground = new Ground().get();
    ground.rotateY(Math.PI / 2)
    // this._threeService.addObj(ground);

    this._threeService.animate(() => {

      // Move the landscape backward
      // this._threeService.scene.children.forEach((child) => {
      //   if (child.position) {
      //     child.position.x -= 0.1;
      //     if (child.position.x < -25) {
      //       child.position.x = 25; // Reset position to create infinite scrolling
      //     }
      //   }
      // });
    });
  }
}

