import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenService } from '../token.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-declare-event',
  templateUrl: './declare.component.html',
  styleUrls: ['./declare.component.scss']
})
export class DeclareComponent implements OnInit {
  eventForm!: FormGroup;
  decodedToken: any;

  constructor(private fb: FormBuilder, private tokenService: TokenService, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.decodedToken = this.tokenService.getDecodedToken();

    this.eventForm = this.fb.group({
      Anonyme: [false],
      EstVictime: [false],
      EstTemoin: [false],
      Lieu_incident: [''],
      description_incident: [''], 
      Date_heure: [new Date()]
    });
  }

  submitForm() {
    if (this.eventForm && this.eventForm.valid) {
      const formData = this.eventForm.value;
  
      const postData = {
        Anonyme: formData.Anonyme,
        Date_heure: this.formatDate(new Date(formData.Date_heure)),
        Lieu_incident: formData.Lieu_incident,
        description_incident: formData.description_incident,
        Confidentialité: formData.Anonyme,
        EstVictime: formData.EstVictime,
        ID_Utilisateur: this.decodedToken.id
      };

    console.log(postData, "POSTDATA")
  
      // Effectuez la requête POST
      this.httpClient.post('https://safeproethics.fr/api/add-incident-report', postData).subscribe(
        (response) => {
          console.log('Réponse de l\'API :', response);
          // Gérez la réponse de l'API si nécessaire
        },
        (error) => {
          console.error('Erreur de la requête API :', error);
          // Gérez l'erreur de la requête si nécessaire
        }
      );
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}` + ' ' +  `${hours}:${minutes}:${seconds}`;
  }
  
}
