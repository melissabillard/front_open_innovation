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
  userInput: string = ''; // Pour stocker l'entrée de l'utilisateur
  chatMessages: { sender: string, text: string }[] = []; // Pour stocker les messages

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

  // sendExample(question: string) {
  //   this.userInput = question; // Remplit l'input avec l'exemple
  //   this.sendMessage(); // Envoie le message
  // }

  // Réponses prédéfinies du chatbot
  private botResponses: { [key: string]: string } = {
    'bonjour': 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
    'problème': 'Veuillez décrire le problème que vous rencontrez.',
    'besoin': 'Dites-moi ce dont vous avez besoin.',
    'aide': 'Je suis là pour vous aider. Posez-moi une question !',
    'merci': 'Je vous en prie ! Si vous avez d\'autres questions, n\'hésitez pas.',
    'caméra': 'Vérifiez que les caméras sont bien alimentées et connectées au réseau. Si le problème persiste, contactez le support technique.',
    'vache': 'Les vaches sont-elles visibles à l\'écran ? Si non, vérifiez l\'angle de la caméra ou son état.',
    'santé': 'Si vous suspectez un problème de santé chez une vache, contactez immédiatement un vétérinaire.',
    'mouvement': 'Si une vache ne bouge pas pendant une longue période, cela peut indiquer un problème. Vérifiez la caméra et son angle.',
    'alarme': 'L\'alarme est déclenchée en cas de mouvement suspect ou de problème technique. Vérifiez les notifications pour plus de détails.',
    'notification': 'Les notifications vous alertent en cas de problème détecté par le système. Vérifiez les paramètres pour les personnaliser.',
    'réseau': 'Si la caméra ne se connecte pas, vérifiez votre connexion Internet ou redémarrez le routeur.',
    'image': 'Si l\'image est floue ou absente, nettoyez l\'objectif de la caméra ou vérifiez la connexion.',
    'nuit': 'Les caméras infrarouges fonctionnent la nuit. Assurez-vous qu\'elles sont activées et orientées correctement.',
    'technique': 'Pour toute assistance technique, contactez notre équipe de support à support@votredomaine.com.',
    'urgence': 'En cas d\'urgence, contactez immédiatement un vétérinaire ou le responsable de l\'exploitation.',
    'paramètres': 'Vous pouvez ajuster les paramètres de la caméra via l\'application. Consultez le guide utilisateur pour plus de détails.',
    'guide': 'Le guide utilisateur est disponible dans la section "Aide" de l\'application. Vous y trouverez des instructions détaillées.',
    'météo': 'Les conditions météorologiques peuvent affecter la qualité de l\'image. Vérifiez que la caméra est protégée des intempéries.',
    'batterie': 'Si la caméra fonctionne sur batterie, assurez-vous qu\'elle est suffisamment chargée.',
    'détection': 'Le système de détection de mouvement est conçu pour vous alerter en cas d\'activité inhabituelle. Vérifiez les paramètres de sensibilité.',
    'default': 'Je ne comprends pas. Pouvez-vous reformuler votre question ?'
  };

  // Envoyer un message
  sendMessage() {
    if (this.userInput.trim()) {
      // Ajouter le message de l'utilisateur
      this.chatMessages.push({ sender: 'user', text: this.userInput });

      // Générer une réponse automatique
      const botResponse = this.generateBotResponse(this.userInput);
      this.chatMessages.push({ sender: 'bot', text: botResponse });

      // Réinitialiser l'input
      this.userInput = '';
    }
  }

  // Envoyer un exemple de question
  sendExample(question: string) {
    this.userInput = question; // Remplit l'input avec l'exemple
    this.sendMessage(); // Envoie le message
  }

  // Générer une réponse du bot
  generateBotResponse(userInput: string): string {
    const lowerCaseInput = userInput.toLowerCase();

    // Vérifier les mots-clés
    for (const keyword in this.botResponses) {
      if (lowerCaseInput.includes(keyword)) {
        return this.botResponses[keyword];
      }
    }

    // Réponse par défaut si aucun mot-clé n'est trouvé
    return this.botResponses['default'];
  }

  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
