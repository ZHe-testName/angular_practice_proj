import { AlertService } from './../../services/alert.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy{

  @Input() delay = 5000 //время показа алерта

  public text: string = ''
  public type: string = 'success'

  aSub: Subscription

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.aSub = this.alertService.alert$.subscribe(alert => {
      this.text = alert.text;
      this.type = alert.type;

      const timeout = setTimeout(() => {//для очистки и убирания алерта
        clearTimeout(timeout);

        this.text = '';
      }, this.delay);
    });
  }

  ngOnDestroy(): void {
    if(this.aSub) {
      this.aSub.unsubscribe();
    };
  }

}
