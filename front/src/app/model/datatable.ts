export interface Formations {
    nom: string;
    debutDate: string;
    duree: string;
    format: string;
    status: string;
}

export const FORMATIONS: Formations[] = [
    { nom: 'Formation 1', debutDate: '20/10/2023', duree: '2h', format: 'Présentiel', status: 'Cloturée' },
    { nom: 'Formation 2', debutDate: '22/12/2023', duree: '2h', format: 'Distanciel', status: 'Ouverte' },
    { nom: 'Formation 3', debutDate: '18/01/2024', duree: '1h', format: 'Présentiel', status: 'Cloturée' },
    { nom: 'Formation 4', debutDate: '5/02/2024', duree: '1h30', format: 'Distanciel', status: 'Annulée' },


];