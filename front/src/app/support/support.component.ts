import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../token.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-support-event',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  eventForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  
  ngOnInit(): void {
    // Initialisation du formulaire avec validation
    this.eventForm = this.fb.group({
      objet: ['', Validators.required],
      motif: ['', Validators.required],
      type: ['', Validators.required],
      entite: ['', Validators.required],
      navigateur: ['', Validators.required],
      description: ['', Validators.required],
      protection: [false, Validators.requiredTrue], // Protection des données
      fichier: [null] // Fichier joint (optionnel)
    });
  }
  onClickConfirmData() {
    if (this.eventForm.valid) {
      const data = this.eventForm.value
      /// envoyer en base la demande de dispo avec l'id de la person choisis
    }
  }
  submitForm(event: Event) {
    event.preventDefault(); // Empêche le rechargement de la page
  const formData = this.eventForm.value;

  console.log('Données soumises :', formData);
  
    if (this.eventForm.valid) {
      

      // Réinitialiser le formulaire après soumission
      this.eventForm.reset();

      // Réinitialiser la case à cocher pour "protection"
      this.eventForm.patchValue({ protection: false });
    } else {
      console.warn('Le formulaire est invalide. Veuillez vérifier les champs.');
    }
  }
}