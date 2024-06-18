export interface Formations {
    nom: string;
    debutDate: string;
    duree: string;
    intitule: string;
    status: string;
}

export const FORMATIONS: Formations[] = [
    { nom: 'Vache - VL001', debutDate: '20/10/2024', duree: '2h', intitule: 'Consultation de suivi', status: 'En attente' },
    { nom: 'Vache - HO789', debutDate: '22/12/2024', duree: '2h', intitule: 'Consultation préventive', status: 'Planifié' },
    { nom: 'Vache - LH2024', debutDate: '26/06/2024', duree: '1h', intitule: 'Rappel vaccin brucellose', status: 'En cours' },
    { nom: 'Vache - HO789', debutDate: '22/07/2024', duree: '2h', intitule: 'Consultation générale', status: 'Annulée' },
];