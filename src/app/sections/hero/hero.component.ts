import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Ground } from '@app/classes/ground.class';
import { Mountain } from '@app/classes/mountains.class';
import { Road } from '@app/classes/road.class';
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

    const roadInstance = new Road();
    const road = roadInstance.get()
    this._threeService.addObj(road)


    // const groundInstance = new Ground();
    // const ground = groundInstance.get();
    // ground.rotateY(Math.PI / 2)
    // this._threeService.addObj(ground);

    // new Mountain();

    this._threeService.animate(() => {
      roadInstance.update();
      // groundInstance.update();
    });
  }
}

