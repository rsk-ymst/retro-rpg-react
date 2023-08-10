import { ActionCharacter } from '../models/actionCharacter'
import { CharacterType, FieldPlayer } from './context'

export const testPlayerData: ActionCharacter[] = [
  {
    name: 'フェリス',
    type: 'FieldPlayer',
    status: {
      currentHitPoint: 300,
      currentMagicPoint: 300,
      condition: '通常',
      command: 'たたかう',
      onDamage: false,
    },
    parameter: {
      attack: 80,
      vitality: 100,
      defense: 100,
      intelligence: 100,
      hitPoint: 1000,
      magicPoint: 500,
      speed: 50,
      level: 0,
      specialAttack: 0,
      specialDefense: 0,
      experiencePoint: 0,
    },
    commandOptions: [],
  },
  {
    name: 'ゴーファー',
    type: 'FieldPlayer',
    status: {
      currentHitPoint: 300,
      currentMagicPoint: 300,
      condition: '通常',
      command: 'たたかう',
      onDamage: false,
    },
    parameter: {
      attack: 20,
      vitality: 100,
      defense: 100,
      intelligence: 100,
      hitPoint: 1000,
      magicPoint: 500,
      speed: 60,
      level: 0,
      specialAttack: 0,
      specialDefense: 0,
      experiencePoint: 0,
    },
    commandOptions: [],
  },
  {
    name: 'Linuxペンギン',
    type: 'FieldPlayer',
    status: {
      currentHitPoint: 300,
      currentMagicPoint: 300,
      condition: '通常',
      command: 'たたかう',
      onDamage: false,
    },
    parameter: {
      attack: 30,
      vitality: 100,
      defense: 100,
      intelligence: 100,
      hitPoint: 1000,
      magicPoint: 500,
      speed: 70,
      level: 0,
      specialAttack: 0,
      specialDefense: 0,
      experiencePoint: 0,
    },
    commandOptions: [],
  },
  {
    name: 'ドロイド',
    type: 'FieldPlayer',
    status: {
      currentHitPoint: 300,
      currentMagicPoint: 300,
      condition: '通常',
      command: 'たたかう',
      onDamage: false,
    },
    parameter: {
      attack: 50,
      vitality: 100,
      defense: 100,
      intelligence: 100,
      hitPoint: 1000,
      magicPoint: 500,
      speed: 90,
      level: 0,
      specialAttack: 0,
      specialDefense: 0,
      experiencePoint: 0,
    },
    commandOptions: [],
  },
]
