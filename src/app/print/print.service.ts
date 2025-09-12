import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Participant } from '../models/participant';
pdfMake.vfs = pdfFonts.vfs; 

@Injectable({
  providedIn: 'root'
})
export class PrintService {


  printCompetition(participants: Participant[]) {
    const documentDefinition: any = {
      content: [
        { text: 'Liste des Participants', style: 'header' },
        { text: `Généré le ${new Date().toLocaleDateString('fr-FR')}`, style: 'subheader' },
        { text: `Nombre de participants: ${participants.length}`, style: 'info' },
        { text: '\n' },
        {
          table: {
            headerRows: 1,
            widths: ['20%', '20%', '15%', '15%', '15%', '15%'],
            body: [
              [
                { text: 'Nom', style: 'tableHeader' },
                { text: 'Prénom', style: 'tableHeader' },
                { text: 'Genre', style: 'tableHeader' },
                { text: 'Âge', style: 'tableHeader' },
                { text: 'Poids', style: 'tableHeader' },
                { text: 'N°', style: 'tableHeader' }
              ],
              ...participants.map((participant, index) => [
                participant.lastname || 'N/A',
                participant.firstname || 'N/A',
                participant.gender === 'male' ? 'Masculin' : participant.gender === 'female' ? 'Féminin' : participant.gender || 'N/A',
                participant.age ? `${participant.age} ans` : 'N/A',
                participant.weight ? `${participant.weight} kg` : 'N/A',
                (index + 1).toString()
              ])
            ]
          },
          layout: {
            fillColor: function(rowIndex: number) {
              return (rowIndex === 0) ? '#2196F3' : (rowIndex % 2 === 0) ? '#f8f9fa' : null;
            }
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20] as [number, number, number, number] // Format requis par PDFMake
        },
        subheader: {
          fontSize: 12,
          alignment: 'center',
          color: '#666666',
          margin: [0, 0, 0, 5] as [number, number, number, number]
        },
        info: {
          fontSize: 12,
          alignment: 'center',
          bold: true,
          margin: [0, 0, 0, 20] as [number, number, number, number]
        },
        tableHeader: {
          bold: true,
          fontSize: 11,
          color: 'white',
          alignment: 'center'
        }
      }
    };
    console.log(documentDefinition);
    pdfMake.createPdf(documentDefinition).download('participants.pdf');
  }
}
