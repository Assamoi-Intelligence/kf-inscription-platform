import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Participant } from '../models/participant';
pdfMake.vfs = pdfFonts.vfs; 

@Injectable({
  providedIn: 'root'
})
export class PrintService {


  private getAgeCategory(age: number): string {
    if (age >= 6 && age <= 7) return "06-07 ans";
    if (age >= 8 && age <= 9) return "08-09 ans";
    if (age >= 10 && age <= 11) return "10-11 ans";
    if (age >= 12 && age <= 13) return "12-13 ans";
    if (age >= 14 && age <= 15) return "14-15 ans";
    if (age >= 16 && age <= 17) return "16-17 ans";
    if (age >= 18 && age <= 40) return "18-40 ans";
    return "Hors catégorie";
  }
  
  private getWeightCategory(weight: number): string {
    if (weight <= 48) return "Catégorie 48 kg (<= 48kg)";
    if (weight <= 52) return "Catégorie 52 kg (48 kg < poids <= 52 kg)";
    if (weight <= 56) return "Catégorie 56 kg (52 kg < poids <= 56 kg)";
    if (weight <= 60) return "Catégorie 60 kg (56 kg < poids <= 60 kg)";
    if (weight <= 65) return "Catégorie 65 kg (60 kg < poids <= 65 kg)";
    if (weight <= 70) return "Catégorie 70 kg (65 kg < poids <= 70 kg)";
    if (weight <= 75) return "Catégorie 75 kg (70 kg < poids <= 75 kg)";
    if (weight <= 80) return "Catégorie 80 kg (75 kg < poids <= 80 kg)";
    if (weight <= 85) return "Catégorie 85 kg (80 kg < poids <= 85 kg)";
    if (weight <= 90) return "Catégorie 90 kg (85 kg < poids <= 90 kg)";
    return "Plus de 90 kg (poids > 90 kg)";
  }

  
  private createSandaContentByGender(participants: Participant[], gender: 'male' | 'female'): any[] {
    const genderLabel = gender === 'male' ? 'MASCULIN' : 'FÉMININ';
    
    // Filtrer par genre et grouper par âge puis poids
    const genderParticipants = participants.filter(p => p.gender === gender);
    
    if (genderParticipants.length === 0) {
      return [];
    }
  
    const groupedParticipants = genderParticipants.reduce((acc, participant) => {
      const ageCategory = this.getAgeCategory(participant.age);
      const weightCategory = this.getWeightCategory(participant.weight);
      
      if (!acc[ageCategory]) {
        acc[ageCategory] = {};
      }
      if (!acc[ageCategory][weightCategory]) {
        acc[ageCategory][weightCategory] = [];
      }
      acc[ageCategory][weightCategory].push(participant);
      
      return acc;
    }, {} as Record<string, Record<string, Participant[]>>);
  
    const content: any[] = [
      {
        text: `${genderLabel}`,
        style: 'genderTitle',
        pageBreak: 'before'
      },
      { text: '\n' }
    ];
  
    // Parcourir chaque catégorie d'âge
    Object.entries(groupedParticipants).forEach(([ageCategory, weightGroups]) => {
      content.push({
        text: ageCategory,
        style: 'ageCategory',
        margin: [0, 15, 0, 10] as [number, number, number, number]
      });
  
      // Parcourir chaque catégorie de poids dans cette tranche d'âge
      Object.entries(weightGroups).forEach(([weightCategory, participantList]) => {
        content.push({
          text: weightCategory,
          style: 'weightCategory',
          margin: [0, 10, 0, 5] as [number, number, number, number]
        });
  
        // Trier par poids décroissant
        const sortedParticipants = participantList.sort((a, b) => b.weight - a.weight);
  
        content.push({
          table: {
            headerRows: 1,
            widths: ['80%', '20%'],
            body: [
              [
                { text: 'Nom & Prénoms', style: 'tableHeader' },
                { text: 'Poids (kg)', style: 'tableHeader' }
              ],
              ...sortedParticipants.map(participant => [
                participant.lastname + ' ' + participant.firstname || 'N/A',
                { text: participant.weight?.toString() || 'N/A', alignment: 'center' }
              ])
            ]
          },
          layout: {
            fillColor: function(rowIndex: number) {
              return (rowIndex === 0) ? '#2196F3' : (rowIndex % 2 === 0) ? '#f8f9fa' : null;
            }
          },
          margin: [0, 5, 0, 15] as [number, number, number, number]
        });
      });
    });
  
    return content;
  }
  
  // Impression format Sanda séparé par genre
  printSandaCompetition(participants: Participant[]) {
    const content: any[] = [
      { text: 'Competition Sanda', style: 'header' },
      { text: `Généré le ${new Date().toLocaleDateString('fr-FR')}`, style: 'subheader' },
      { text: '\n' }
    ];
  
    // Ajouter tout le contenu MASCULIN
    const maleContent = this.createSandaContentByGender(participants, 'male');
    if (maleContent.length > 0) {
      // Première page pour les hommes (pas de pageBreak)
      maleContent[0].pageBreak = undefined;
      content.push(...maleContent);
    }
  
    // Ajouter tout le contenu FÉMININ
    const femaleContent = this.createSandaContentByGender(participants, 'female');
    if (femaleContent.length > 0) {
      content.push(...femaleContent);
    }
  
    const documentDefinition: any = {
      content,
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20] as [number, number, number, number]
        },
        subheader: {
          fontSize: 12,
          alignment: 'center',
          color: '#666666',
          margin: [0, 0, 0, 5] as [number, number, number, number]
        },
        genderTitle: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          color: '#FF5722',
          margin: [0, 20, 0, 20] as [number, number, number, number]
        },
        ageCategory: {
          fontSize: 16,
          bold: true,
          color: '#2196F3'
        },
        weightCategory: {
          fontSize: 14,
          bold: true,
          color: '#4CAF50'
        },
        tableHeader: {
          bold: true,
          fontSize: 11,
          color: 'white',
          alignment: 'center'
        }
      }
    };
  
    pdfMake.createPdf(documentDefinition).download('sanda-competition.pdf');
  }
  
  // Fonction helper pour créer le contenu TaoLu par genre
  private createTaoLuContentByGender(participants: Participant[], gender: 'male' | 'female'): any[] {
    const genderLabel = gender === 'male' ? 'MASCULIN' : 'FÉMININ';
    
    // Filtrer par genre et grouper par âge puis discipline
    const genderParticipants = participants.filter(p => p.gender === gender);
    
    if (genderParticipants.length === 0) {
      return [];
    }
  
    const groupedParticipants = genderParticipants.reduce((acc, participant) => {
      const ageCategory = this.getAgeCategory(participant.age);
      
      if (!acc[ageCategory]) {
        acc[ageCategory] = {};
      }
      
      // Pour chaque discipline du participant
      if (participant.disciplines && participant.disciplines.length > 0) {
        participant.disciplines.forEach(discipline => {
          if (!acc[ageCategory][discipline.name]) {
            acc[ageCategory][discipline.name] = [];
          }
          acc[ageCategory][discipline.name].push(participant);
        });
      } else {
        // Participants sans discipline
        if (!acc[ageCategory]['Sans discipline']) {
          acc[ageCategory]['Sans discipline'] = [];
        }
        acc[ageCategory]['Sans discipline'].push(participant);
      }
      
      return acc;
    }, {} as Record<string, Record<string, Participant[]>>);
  
    const content: any[] = [
      {
        text: `${genderLabel}`,
        style: 'genderTitle',
        pageBreak: 'before'
      },
      { text: '\n' }
    ];
  
    // Parcourir chaque catégorie d'âge
    Object.entries(groupedParticipants).forEach(([ageCategory, disciplineGroups]) => {
      content.push({
        text: ageCategory,
        style: 'ageCategory',
        margin: [0, 15, 0, 10] as [number, number, number, number]
      });
  
      // Parcourir chaque discipline dans cette tranche d'âge
      Object.entries(disciplineGroups).forEach(([disciplineName, participantList]) => {
        content.push({
          text: disciplineName,
          style: 'disciplineCategory',
          margin: [0, 10, 0, 5] as [number, number, number, number]
        });
  
        content.push({
          table: {
            headerRows: 1,
            widths: ['38%', '12%', '12%', '12%', '12%', '14%'],
            body: [
              [
                { text: 'Nom & Prénoms', style: 'tableHeader' },
                { text: 'Note/5', style: 'tableHeader' },
                { text: 'Note/3', style: 'tableHeader' },
                { text: 'Note/2', style: 'tableHeader' },
                { text: 'Total', style: 'tableHeader' },
                { text: 'Classements', style: 'tableHeader' }
              ],
              ...participantList.map(participant => [
                participant.lastname + ' ' + participant.firstname  || 'N/A',
                { text: '', alignment: 'center' }, // Note /5 - vide pour remplir à la main
                { text: '', alignment: 'center' }, // Note /3 - vide pour remplir à la main
                { text: '', alignment: 'center' }, // Note /2 - vide pour remplir à la main
                { text: '', alignment: 'center' }, // Total - vide pour remplir à la main
                { text: '', alignment: 'center' }  // Classement - vide pour remplir à la main
              ])
            ]
          },
          layout: {
            fillColor: function(rowIndex: number) {
              return (rowIndex === 0) ? '#9C27B0' : (rowIndex % 2 === 0) ? '#f8f9fa' : null;
            }
          },
          margin: [0, 5, 0, 15] as [number, number, number, number]
        });
      });
    });
  
    return content;
  }
  
  // Impression format TaoLu séparé par genre
  printTaoLuCompetition(participants: Participant[]) {
    const content: any[] = [
      { text: 'Competition TaoLu', style: 'header' },
      { text: `Généré le ${new Date().toLocaleDateString('fr-FR')}`, style: 'subheader' },
      { text: '\n' }
    ];
  
    // Ajouter tout le contenu MASCULIN
    const maleContent = this.createTaoLuContentByGender(participants, 'male');
    if (maleContent.length > 0) {
      // Première page pour les hommes (pas de pageBreak)
      maleContent[0].pageBreak = undefined;
      content.push(...maleContent);
    }
  
    // Ajouter tout le contenu FÉMININ
    const femaleContent = this.createTaoLuContentByGender(participants, 'female');
    if (femaleContent.length > 0) {
      content.push(...femaleContent);
    }
  
    const documentDefinition: any = {
      content,
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20] as [number, number, number, number]
        },
        subheader: {
          fontSize: 12,
          alignment: 'center',
          color: '#666666',
          margin: [0, 0, 0, 5] as [number, number, number, number]
        },
        genderTitle: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          color: '#FF5722',
          margin: [0, 20, 0, 20] as [number, number, number, number]
        },
        ageCategory: {
          fontSize: 16,
          bold: true,
          color: '#2196F3'
        },
        disciplineCategory: {
          fontSize: 14,
          bold: true,
          color: '#9C27B0'
        },
        tableHeader: {
          bold: true,
          fontSize: 10,
          color: 'white',
          alignment: 'center'
        }
      }
    };
  
    pdfMake.createPdf(documentDefinition).download('taolu-competition.pdf');
  }
}
