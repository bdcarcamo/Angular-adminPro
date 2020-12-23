import { Component, Input, OnInit } from '@angular/core';

import { MultiDataSet, Label, Color } from 'ng2-charts';
import { ChartTooltipLabelColor } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: []
})
export class DonaComponent {

  // tslint:disable-next-line:no-inferrable-types
  @Input() public titulo: string = 'Sin titulo';

  // tslint:disable-next-line:no-input-rename
  @Input('labels') doughnutChartLabels: Label[] = ['Data 1', 'Data 2', 'Data 3'];
  // tslint:disable-next-line:no-input-rename
  @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 100]
  ];

  public colors: Color[] = [
    { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }
  ];



}
