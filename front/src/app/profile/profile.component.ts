import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
 utilisateur = {
    nom: 'John',
    prenom: 'Doe',
    email: 'john.doe@example.com',
    telephone: '1234567890'
  };

  notificationsActive = true;
}
