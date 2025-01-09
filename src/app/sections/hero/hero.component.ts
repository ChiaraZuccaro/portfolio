import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Ground } from '@app/classes/ground.class';
import { Mountain } from '@app/classes/mountains.class';
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

    const groundInstance = new Ground();
    const ground = groundInstance.get();
    ground.rotateY(Math.PI / 2)
    this._threeService.addObj(ground);

    new Mountain();

    this._threeService.animate(() => {
      groundInstance.update();
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

