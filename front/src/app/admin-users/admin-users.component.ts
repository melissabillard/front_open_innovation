import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {

    utilisateurs = [
    { id: 1, nom: 'Jean', prenom: 'Martin', email: 'jean.martin@mail.com', telephone: '0600000000' },
    { id: 2, nom: 'Sophie', prenom: 'Durand', email: 'sophie.durand@mail.com', telephone: '0611111111' }
  ];

  utilisateurFormVisible = false;
  modeEdition = false;
  utilisateurForm = { id: 0, nom: '', prenom: '', email: '', telephone: '', password: '' };

  ajouterUtilisateur() {
    this.modeEdition = false;
    this.utilisateurFormVisible = true;
    this.utilisateurForm = { id: 0, nom: '', prenom: '', email: '', telephone: '', password: '' };
  }

  modifierUtilisateur(user: any) {
    this.modeEdition = true;
    this.utilisateurFormVisible = true;
    this.utilisateurForm = { ...user, password: '' };
  }

  supprimerUtilisateur(id: number) {
    this.utilisateurs = this.utilisateurs.filter(u => u.id !== id);
  }

  enregistrerUtilisateur() {
    if (this.modeEdition) {
      const index = this.utilisateurs.findIndex(u => u.id === this.utilisateurForm.id);
      this.utilisateurs[index] = { ...this.utilisateurForm };
    } else {
      const nouveauId = Math.max(...this.utilisateurs.map(u => u.id)) + 1;
      this.utilisateurs.push({ ...this.utilisateurForm, id: nouveauId });
    }
    this.utilisateurFormVisible = false;
  }

  annulerEdition() {
    this.utilisateurFormVisible = false;
  }
}


