import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-level-card',
  templateUrl: './level-card.component.html',
  styleUrls: ['./level-card.component.css']
})
export class LevelCardComponent implements OnInit {

  @Input() nivelName:   string  | undefined;
  @Input() description: string  | undefined;
  @Input() icon:        string  | undefined;
  @Input() colorCard:   string  | undefined;
  @Input() level:       string  | undefined;

  @Output() levelSelected = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void { }

  getRoutinesWithLevel(){
    this.levelSelected.emit();
  }
}
