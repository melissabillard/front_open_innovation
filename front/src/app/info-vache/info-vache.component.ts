import { Component } from '@angular/core';

@Component({
  selector: 'app-info-vache',
  templateUrl: './info-vache.component.html',
  styleUrls: ['./info-vache.component.css']
})
export class InfoVacheComponent {
 troupeau = [
    { id: '001', age: 5, naissance: '15/3/2019' },
    { id: '002', age: 3, naissance: '12/7/2021' },
    { id: '003', age: 4, naissance: '20/5/2020' },
    { id: '001', age: 5, naissance: '10/3/2019' },
    { id: '002', age: 3, naissance: '11/7/2021' },
    { id: '003', age: 4, naissance: '20/5/2020' }
  ];
}
