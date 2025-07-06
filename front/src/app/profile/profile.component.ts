import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
utilisateur = {
    nom: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    telephone: '+33 6 12 34 56 78'
  };
}
