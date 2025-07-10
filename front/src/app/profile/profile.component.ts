import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
 utilisateur = {
    nom: 'Admin',
    prenom: 'Admin',
    email: 'admin@example.com',
    telephone: '06 50 60 46 35'
  };

  notificationsActive = true;
}
