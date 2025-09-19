import { Discipline } from "../disciplines/discipline.list";
import { Participant } from "../models/participant";

export const weightCategories = [
    "Catégorie 48 kg (<= 48kg)",
    "Catégorie 52 kg (48 kg < poids <= 52 kg)",
    "Catégorie 56 kg (52 kg < poids <= 56 kg)",
    "Catégorie 60 kg (56 kg < poids <= 60 kg)",
    "Catégorie 65 kg (60 kg < poids <= 65 kg)",
    "Catégorie 70 kg (65 kg < poids <= 70 kg)",
    "Catégorie 75 kg (70 kg < poids <= 75 kg)",
    "Catégorie 80 kg (75 kg < poids <= 80 kg)",
    "Catégorie 85 kg (80 kg < poids <= 85 kg)",
    "Catégorie 90 kg (85 kg < poids <= 90 kg)",
    "Plus de 90 kg (poids > 90 kg)",
]

export const ageCategories = [
    "06-07 ans",
    "08-09 ans",
    "10-11 ans",
    "12-13 ans",
    "14-15 ans",
    "16-17 ans",
    "18-40 ans",
]

// Disciplines de test (vous devez les adapter selon votre liste)
const testDisciplines: Discipline[] = [
    { id: '1', type: 'Main nue', name: 'Chang Quan', createdAt: Date.now() },
    { id: '2', type: 'Main nue', name: 'Taiji Quan', createdAt: Date.now() },
    { id: '3', type: 'Arme', name: 'Dao Shu', createdAt: Date.now() },
    { id: '4', type: 'Arme', name: 'Jian Shu', createdAt: Date.now() },
    { id: '5', type: 'Main nue', name: 'Nan Quan', createdAt: Date.now() }
  ];
  
  // Participants de test pour Sanda (sans disciplines ou avec sanda)
  export const sandaTestParticipants: Participant[] = [
    // Catégorie 06-07 ans
    {
      id: '1',
      lastname: 'Dupont',
      firstname: 'Pierre',
      age: 6,
      weight: 25,
      gender: 'male',
      competitionId: 'comp1',
      createdAt: Date.now(),
      clubName: 'Club Dragon Rouge',
      disciplines: null
    },
    {
      id: '2',
      lastname: 'Martin',
      firstname: 'Sophie',
      age: 7,
      weight: 28,
      gender: 'female',
      competitionId: 'comp1',
      createdAt: Date.now(),
      clubName: 'Dojo des Tigres',
      disciplines: null
    },
    
    // Catégorie 08-09 ans
    {
      id: '3',
      lastname: 'Durand',
      firstname: 'Lucas',
      age: 8,
      weight: 32,
      gender: 'male',
      competitionId: 'comp1',
      createdAt: Date.now(),
      clubName: 'Club Dragon Rouge',
      disciplines: null
    },
    {
      id: '4',
      lastname: 'Bernard',
      firstname: 'Emma',
      age: 9,
      weight: 35,
      gender: 'female',
      competitionId: 'comp1',
      createdAt: Date.now(),
      clubName: 'Arts Martiaux Unis',
      disciplines: null
    },
    
    // Catégorie 10-11 ans
    {
      id: '5',
      lastname: 'Petit',
      firstname: 'Antoine',
      age: 10,
      weight: 42,
      gender: 'male',
      competitionId: 'comp1',
      createdAt: Date.now(),
      clubName: 'Shaolin Academy',
      disciplines: null
    },
    {
      id: '6',
      lastname: 'Robert',
      firstname: 'Léa',
      age: 11,
      weight: 45,
      gender: 'female',
      competitionId: 'comp1',
      createdAt: Date.now(),
      clubName: 'Dojo des Tigres',
      disciplines: null
    },
    
    // Catégorie 12-13 ans
    {
      id: '7',
      lastname: 'Richard',
      firstname: 'Hugo',
      age: 12,
      weight: 50,
      gender: 'male',
      competitionId: 'comp1',
      createdAt: Date.now(),
      clubName: 'Club Dragon Rouge',
      disciplines: null
    },
    {
      id: '8',
      lastname: 'Moreau',
      firstname: 'Chloé',
      age: 13,
      weight: 48,
      gender: 'female',
      competitionId: 'comp1',
      createdAt: Date.now(),
      clubName: 'Arts Martiaux Unis',
      disciplines: null
    },
    {
      id: '9',
      lastname: 'Simon',
      firstname: 'Tom',
      age: 13,
      weight: 55,
      gender: 'male',
      competitionId: 'comp1',
      createdAt: Date.now(),
      clubName: 'Shaolin Academy',
      disciplines: null
    },
    
    // Catégorie 14-15 ans
    {
      id: '10',
      lastname: 'Laurent',
      firstname: 'Maxime',
      age: 14,
      weight: 60,
      gender: 'male',
      competitionId: 'comp1',
      createdAt: Date.now(),
      clubName: 'Dojo des Tigres',
      disciplines: null
    },
    {
      id: '11',
      lastname: 'Michel',
      firstname: 'Sarah',
      age: 15,
      weight: 58,
      gender: 'female',
      competitionId: 'comp1',
      createdAt: Date.now(),
      clubName: 'Club Dragon Rouge',
      disciplines: null
    },
    
    // Catégorie 16-17 ans
    {
      id: '12',
      lastname: 'Garcia',
      firstname: 'Kevin',
      age: 16,
      weight: 68,
      gender: 'male',
      competitionId: 'comp1',
      createdAt: Date.now(),
      clubName: 'Arts Martiaux Unis',
      disciplines: null
    },
    {
      id: '13',
      lastname: 'Roux',
      firstname: 'Marine',
      age: 17,
      weight: 62,
      gender: 'female',
      competitionId: 'comp1',
      createdAt: Date.now(),
      clubName: 'Shaolin Academy',
      disciplines: null
    },
    
    // Catégorie 18-40 ans (Seniors)
    {
      id: '14',
      lastname: 'Vincent',
      firstname: 'Alexandre',
      age: 25,
      weight: 75,
      gender: 'male',
      competitionId: 'comp1',
      createdAt: Date.now(),
      clubName: 'Dojo des Tigres',
      disciplines: null
    },
    {
      id: '15',
      lastname: 'Fournier',
      firstname: 'Julie',
      age: 28,
      weight: 65,
      gender: 'female',
      competitionId: 'comp1',
      createdAt: Date.now(),
      clubName: 'Club Dragon Rouge',
      disciplines: null
    },
    {
      id: '16',
      lastname: 'Girard',
      firstname: 'Nicolas',
      age: 32,
      weight: 85,
      gender: 'male',
      competitionId: 'comp1',
      createdAt: Date.now(),
      clubName: 'Arts Martiaux Unis',
      disciplines: null
    },
    {
      id: '17',
      lastname: 'Bonnet',
      firstname: 'Céline',
      age: 30,
      weight: 70,
      gender: 'female',
      competitionId: 'comp1',
      createdAt: Date.now(),
      clubName: 'Shaolin Academy',
      disciplines: null
    },
    {
      id: '18',
      lastname: 'Dupuis',
      firstname: 'Fabien',
      age: 35,
      weight: 95,
      gender: 'male',
      competitionId: 'comp1',
      createdAt: Date.now(),
      clubName: 'Dojo des Tigres',
      disciplines: null
    }
  ];
  
  // Participants de test pour TaoLu (avec disciplines)
  export const taoLuTestParticipants: Participant[] = [
    // Catégorie 08-09 ans
    {
      id: '19',
      lastname: 'Chen',
      firstname: 'Li',
      age: 8,
      weight: 30,
      gender: 'male',
      competitionId: 'comp2',
      createdAt: Date.now(),
      clubName: 'École de Wushu',
      disciplines: [testDisciplines[0]] // Chang Quan
    },
    {
      id: '20',
      lastname: 'Wang',
      firstname: 'Mei',
      age: 9,
      weight: 32,
      gender: 'female',
      competitionId: 'comp2',
      createdAt: Date.now(),
      clubName: 'Temple du Dragon',
      disciplines: [testDisciplines[1]] // Taiji Quan
    },
    
    // Catégorie 10-11 ans
    {
      id: '21',
      lastname: 'Zhang',
      firstname: 'Wei',
      age: 10,
      weight: 38,
      gender: 'male',
      competitionId: 'comp2',
      createdAt: Date.now(),
      clubName: 'École de Wushu',
      disciplines: [testDisciplines[0], testDisciplines[2]] // Chang Quan + Dao Shu
    },
    {
      id: '22',
      lastname: 'Liu',
      firstname: 'Xiao',
      age: 11,
      weight: 40,
      gender: 'female',
      competitionId: 'comp2',
      createdAt: Date.now(),
      clubName: 'Arts Martiaux Traditionnels',
      disciplines: [testDisciplines[3]] // Jian Shu
    },
    {
      id: '23',
      lastname: 'Wu',
      firstname: 'Jun',
      age: 11,
      weight: 42,
      gender: 'male',
      competitionId: 'comp2',
      createdAt: Date.now(),
      clubName: 'Temple du Dragon',
      disciplines: [testDisciplines[4]] // Nan Quan
    },
    
    // Catégorie 12-13 ans
    {
      id: '24',
      lastname: 'Yang',
      firstname: 'Ming',
      age: 12,
      weight: 45,
      gender: 'male',
      competitionId: 'comp2',
      createdAt: Date.now(),
      clubName: 'École de Wushu',
      disciplines: [testDisciplines[0], testDisciplines[3]] // Chang Quan + Jian Shu
    },
    {
      id: '25',
      lastname: 'Zhou',
      firstname: 'Ling',
      age: 13,
      weight: 48,
      gender: 'female',
      competitionId: 'comp2',
      createdAt: Date.now(),
      clubName: 'Arts Martiaux Traditionnels',
      disciplines: [testDisciplines[1], testDisciplines[2]] // Taiji Quan + Dao Shu
    },
    {
      id: '26',
      lastname: 'Huang',
      firstname: 'Hao',
      age: 13,
      weight: 50,
      gender: 'male',
      competitionId: 'comp2',
      createdAt: Date.now(),
      clubName: 'Temple du Dragon',
      disciplines: [testDisciplines[4]] // Nan Quan
    },
    
    // Catégorie 14-15 ans
    {
      id: '27',
      lastname: 'Zhao',
      firstname: 'Feng',
      age: 14,
      weight: 55,
      gender: 'male',
      competitionId: 'comp2',
      createdAt: Date.now(),
      clubName: 'École de Wushu',
      disciplines: [testDisciplines[0], testDisciplines[2], testDisciplines[3]] // Chang Quan + Dao Shu + Jian Shu
    },
    {
      id: '28',
      lastname: 'Xu',
      firstname: 'Yu',
      age: 15,
      weight: 52,
      gender: 'female',
      competitionId: 'comp2',
      createdAt: Date.now(),
      clubName: 'Arts Martiaux Traditionnels',
      disciplines: [testDisciplines[1]] // Taiji Quan
    },
    
    // Catégorie 16-17 ans
    {
      id: '29',
      lastname: 'Sun',
      firstname: 'Gang',
      age: 16,
      weight: 62,
      gender: 'male',
      competitionId: 'comp2',
      createdAt: Date.now(),
      clubName: 'Temple du Dragon',
      disciplines: [testDisciplines[0], testDisciplines[4]] // Chang Quan + Nan Quan
    },
    {
      id: '30',
      lastname: 'Ma',
      firstname: 'Lan',
      age: 17,
      weight: 58,
      gender: 'female',
      competitionId: 'comp2',
      createdAt: Date.now(),
      clubName: 'École de Wushu',
      disciplines: [testDisciplines[3]] // Jian Shu
    },
    
    // Catégorie 18-40 ans
    {
      id: '31',
      lastname: 'Zhu',
      firstname: 'Qiang',
      age: 22,
      weight: 70,
      gender: 'male',
      competitionId: 'comp2',
      createdAt: Date.now(),
      clubName: 'Arts Martiaux Traditionnels',
      disciplines: [testDisciplines[0], testDisciplines[1], testDisciplines[2]] // Chang Quan + Taiji Quan + Dao Shu
    },
    {
      id: '32',
      lastname: 'Guo',
      firstname: 'Na',
      age: 26,
      weight: 60,
      gender: 'female',
      competitionId: 'comp2',
      createdAt: Date.now(),
      clubName: 'Temple du Dragon',
      disciplines: [testDisciplines[1], testDisciplines[3]] // Taiji Quan + Jian Shu
    },
    
    // Participant sans discipline (pour tester)
    {
      id: '33',
      lastname: 'Kong',
      firstname: 'Lei',
      age: 20,
      weight: 65,
      gender: 'male',
      competitionId: 'comp2',
      createdAt: Date.now(),
      clubName: 'École de Wushu',
      disciplines: null
    },
    {
      id: '34',
      lastname: 'Deng',
      firstname: 'Hui',
      age: 24,
      weight: 55,
      gender: 'female',
      competitionId: 'comp2',
      createdAt: Date.now(),
      clubName: 'Arts Martiaux Traditionnels',
      disciplines: []
    }
  ];
  
  // Comment utiliser ces données de test :
  /*
  // Pour tester Sanda
  this.printSandaCompetition(sandaTestParticipants);
  
  // Pour tester TaoLu
  this.printTaoLuCompetition(taoLuTestParticipants);
  
  // Pour tester avec tous les participants mélangés
  this.printSandaCompetition([...sandaTestParticipants, ...taoLuTestParticipants]);
  this.printTaoLuCompetition([...sandaTestParticipants, ...taoLuTestParticipants]);
  */