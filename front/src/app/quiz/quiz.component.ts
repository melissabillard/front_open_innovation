// quiz.component.ts
import { Component } from '@angular/core';
import { TokenService } from '../token.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  score: number = 0;
  currentQuestionIndex: number = 0;
  decodedToken: any;
  quizComplete: boolean = false;
  questions = [
    {
      "questionText": "Question 1 : Avez-vous déjà rigolé du physique d'un de vos collègues ?",
      "answers": [
        {
          "answerText": "Oui",
          "points": -10
        },
        {
          "answerText": "Non",
          "points": 10
        }
      ]
    },
    {
      "questionText": "Question 2 : Avez-vous déjà subi des remarques de la part de vos collègues ? (remarques physiques, remarques déplacées ou inappropriées)",
      "answers": [
        {
          "answerText": "Oui",
          "points": 0
        },
        {
          "answerText": "Non",
          "points": 0
        }
      ]
    },
    {
      "questionText": "Question 3 : Avez-vous déjà secrètement pris des photos d'un ou d'une de vos collègues ?",
      "answers": [
        {
          "answerText": "Oui",
          "points": -10
        },
        {
          "answerText": "Non",
          "points": 10
        }
      ]
    },
    {
      "questionText": "Question 4 : Avez-vous déjà reçu des messages/mails inappropriés d'un ou d'une de vos collègues sur votre mails pro/téléphone ?",
      "answers": [
        {
          "answerText": "Oui",
          "points": 0
        },
        {
          "answerText": "Non",
          "points": 0
        }
      ]
    },
    {
      "questionText": "Question 5 : Avez-vous été harcelé par messages d'un ou d'une personne sur un réseau social ?",
      "answers": [
        {
          "answerText": "Oui",
          "points": 10
        },
        {
          "answerText": "Non",
          "points": -10
        }
      ]
    },
    {
      "questionText": "Question 5.5 : Si oui, était-ce un/une collègue ?",
      "answers": [
        {
          "answerText": "Oui",
          "points": 0
        },
        {
          "answerText": "Non",
          "points": 0
        }
      ]
    },
    {
      "questionText": "Question 6 : Avez-vous déjà évité un collègue ou un endroit spécifique au travail en raison de comportements inappropriés ?",
      "answers": [
        {
          "answerText": "Oui",
          "points": 10
        },
        {
          "answerText": "Non",
          "points": 0
        }
      ]
    },
    {
      "questionText": "Question 7 : Un/Une collègue vous répète qu'il ou qu'elle veut souvent vous retrouver seul à l'extérieur / privé ? (vous raccompagniez en voiture/prendre un café..)",
      "answers": [
        {
          "answerText": "Oui",
          "points": 10
        },
        {
          "answerText": "Non",
          "points": 0
        }
      ]
    },
    {
      "questionText": "Question 8 : Avez-vous déjà été victime de chantage à caractère sexuel au travail ?",
      "answers": [
        {
          "answerText": "Oui",
          "points": 10
        },
        {
          "answerText": "Non",
          "points": 0
        }
      ]
    },
    {
      "questionText": "Question 9 : Avez-vous déjà suivi l'un/l'une de vos collègues avec des intentions bizarres ?",
      "answers": [
        {
          "answerText": "Oui",
          "points": -10
        },
        {
          "answerText": "Non",
          "points": 0
        }
      ]
    },
    {
      "questionText": "Question 10 : Avez-vous déjà senti être suivi par un/une de vos collègues ?",
      "answers": [
        {
          "answerText": "Oui",
          "points": 10
        },
        {
          "answerText": "Non",
          "points": 0
        }
      ]
    },
    {
      "questionText": "Question 11 : Votre supérieur vous a-t-il déjà proposé une promotion en échange d'un arrangement sexuel ?",
      "answers": [
        {
          "answerText": "Oui",
          "points": 20
        },
        {
          "answerText": "Non",
          "points": 0
        }
      ]
    },
    {
      "questionText": "Question 12 : Avez-vous déjà ressenti la nécessité de céder à des avances sexuelles pour protéger votre emploi ?",
      "answers": [
        {
          "answerText": "Oui",
          "points": 20
        },
        {
          "answerText": "Non",
          "points": 0
        }
      ]
    },
    {
      "questionText": "Question 13 : Avez-vous déjà été victime de rumeurs à caractère sexuel vous concernant au travail ?",
      "answers": [
        {
          "answerText": "Oui",
          "points": 10
        },
        {
          "answerText": "Non",
          "points": 0
        }
      ]
    },
    {
      "questionText": "Question 14 : Avez-vous déjà été témoin ou victime de blagues à caractère sexuel au travail ?",
      "answers": [
        {
          "answerText": "Oui",
          "points": 10
        },
        {
          "answerText": "Non",
          "points": 0
        }
      ]
    },
    {
      "questionText": "Question 15 : Pensez-vous que des mesures sont à prendre au sein de l'entreprise ?",
      "answers": [
        {
          "answerText": "Oui",
          "points": 0
        },
        {
          "answerText": "Non",
          "points": 0
        }
      ]
    },
    {
      "questionText": "Question 16 : Pain au chocolat ou Chocolatine",
      "answers": [
        {
          "answerText": "Pain au chocolat",
          "points": 10
        },
        {
          "answerText": "Chocolatine",
          "points": -10
        }
      ]
    }
  ];
  
  constructor(private tokenService: TokenService, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.decodedToken = this.tokenService.getDecodedToken();

    if (this.currentQuestionIndex >= this.questions.length) {
      this.sendQuizResult();
    }
  }

  selectAnswer(answerIndex: number) {
    const selectedAnswer = this.questions[this.currentQuestionIndex].answers[answerIndex];
    this.score += selectedAnswer.points;
  
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.sendQuizResult();
    } else {
      this.currentQuestionIndex++;
    }
  }

  sendQuizResult() {
    const postData = {
      Score: this.score,
      ID_Utilisateur: this.decodedToken.id
    };

    this.httpClient.post('https://safeproethics.fr/api/test-ethics', postData).subscribe(
      (response) => {
        console.log('Réponse de la requête POST :', response);
        this.quizComplete = true;
      },
      (error) => {
        console.error('Erreur de la requête POST :', error);
      }
    );
  }
}
