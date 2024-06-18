import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {
  constructor(private fb: FormBuilder) { }

  dispoFormGroup: FormGroup = this.fb.group({
    rdvDate: ['', [Validators.required]],
    placeRdv: ['', Validators.required],
    comment: ['']
  })

  idPersonChoosen!: number;

  datas = [
    {
      id: 1,
      prenom: 'Natalie',
      nom: 'Foche',
      fonction: 'Directrice des ressources humaines'
    },
    {
      id: 2,
      prenom: 'Romain',
      nom: 'Roch',
      fonction: 'Responsable relation salarié'
    },
    {
      id: 3,
      prenom: 'Romain',
      nom: 'Roch',
      fonction: 'Responsable relation salarié'
    },
    {
      id: 4,
      prenom: 'Romain',
      nom: 'Roch',
      fonction: 'Responsable relation salarié'
    },
    {
      id: 5,
      prenom: 'Romain',
      nom: 'Roch',
      fonction: 'Responsable relation salarié'
    }
  ]

  getPersonChoosen(idPerson: number) {
    this.idPersonChoosen = idPerson;
  }

  onClickConfirmAppointment() {
    if (this.dispoFormGroup.valid) {
      const data = this.dispoFormGroup.value
      /// envoyer en base la demande de dispo avec l'id de la person choisis
    }
  }

  onStepChange(event: any) {
    if (event.selectedIndex === 0 && event.previouslySelectedIndex === 1) {
      this.dispoFormGroup.reset();
      this.dispoFormGroup.markAsUntouched();
    }
  }

}
