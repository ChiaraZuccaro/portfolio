import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Cactus } from '@app/classes/cactus.class';
import { ThreeService } from '@app/services/three.service';

@Component({
  selector: 'hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})

export class HeroComponent implements OnInit {
  private threeService = inject(ThreeService);

  @ViewChild('canvasContainer', { static: true }) canvasContainer: ElementRef;

  ngOnInit() {
    this.threeService.initScenario();
    
    for (let i = 0; i < 4; i++) {
      const cactus = new Cactus().get();
      cactus.position.set(Math.random() * 50 - 25, 0, Math.random() * 10 - 5);
      this.threeService.addObj(cactus);
    }

    this.threeService.animate(() => {

      // Move the landscape backward
      this.threeService.scene.children.forEach((child) => {
        if (child.position) {
          child.position.x -= 0.1;
          if (child.position.x < -25) {
            child.position.x = 25; // Reset position to create infinite scrolling
          }
        }
      });
    });
  }
}

