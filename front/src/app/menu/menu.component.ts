import { Component } from '@angular/core';
import { FORMATIONS } from '../model/datatable';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})


export class MenuComponent {
  displayedColumns: string[] = ['Nom', 'Date de début', 'Durée', 'Format', 'Statut'];
  dataSource = FORMATIONS;

  getBackgroundColor(status: string) {
    if (status === "En cours") {
      return '#E39E21'
    }
    else if (status === 'Planifié') {
      return '#009D86'
    } else if (status === 'Annulée') {
      return '#D26C6F'
    }
  
    else {
      return 'lightgrey'
    }
  }



}
