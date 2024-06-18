import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { userInformation } from '../model/userInformation';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private route: Router, private httpClient: HttpClient, private tokenService: TokenService) {}

  hide: boolean = true;
  errorMessage: any = [];
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required]
    });
  }

  getFormData(data: userInformation): userInformation {
    return {
      email: data.email,
      password: data.password
    };
  }

  onSubmitForm() {
    this.errorMessage = [];
    if (this.loginForm.valid) {
      const data = this.getFormData(this.loginForm.value);
      this.httpClient.post('http://localhost:5000/api/user/check-credentials', data).subscribe(
      (response: any) => {
        console.log('Réponse de l\'API :', response);
        this.tokenService.decodeToken(response.token);
        this.route.navigate(['menu']);
      },
      (error) => {
        console.error('Erreur de la requête API :', error);
      }
      );
    } else {
      this.getFormErrors(this.loginForm);
    }
  }

  getFormErrors(form: FormGroup) {
    for (const controlName in form.controls) {
      const control = form.controls[controlName];
      if (control.invalid) {
        for (const errorName in control.errors) {
          this.errorMessage[controlName] = this.getErrorMessage(controlName, errorName);
        }
      }
    }
    return this.errorMessage;
  }

  getErrorMessage(controlName: string, errorName: string) {
    switch (errorName) {
      case 'required':
        return `Le champ est requis.`;
      case 'pattern':
        return `Le champ n'est pas valide.`;
      case 'emailNotIdentical':
        return 'Les emails ne sont pas identiques.';
      case 'passwordNotIdentical':
        return 'Les mots de passe ne sont pas identiques.';
      case 'dateAndAge':
        return 'Pas majeur.';
      default:
        return `Le champ ${controlName} est invalide.`;
    }
  }
}
