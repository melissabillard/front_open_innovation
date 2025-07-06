import { Component } from '@angular/core';

@Component({
  selector: 'app-info-vache',
  templateUrl: './info-vache.component.html',
  styleUrls: ['./info-vache.component.css']
})
export class InfoVacheComponent {
troupeau = [
    { id: '001', age: 5, naissance: '15/3/2019', nom: 'Blanchette' },
    { id: '002', age: 3, naissance: '12/7/2021', nom: 'Mimi' },
    { id: '003', age: 4, naissance: '20/5/2020', nom: 'Luna' },
    { id: '004', age: 6, naissance: '10/3/2018', nom: 'Daisy' }
  ];

  recherche = '';
  vachesFiltrees = [...this.troupeau];
  vacheSelectionnee: any = null;

  filtrerVaches() {
    const terme = this.recherche.toLowerCase();
    this.vachesFiltrees = this.troupeau.filter(v =>
      v.id.toLowerCase().includes(terme) ||
      (v.nom && v.nom.toLowerCase().includes(terme))
    );
  }

  selectionnerVache(vache: any) {
    this.vacheSelectionnee = vache;
  }
}
