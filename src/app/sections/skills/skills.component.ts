import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { Skills } from '@app/data/skills.mock';

@Component({
  selector: 'skills',
  imports: [NgStyle],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  public skills = Skills;
}
