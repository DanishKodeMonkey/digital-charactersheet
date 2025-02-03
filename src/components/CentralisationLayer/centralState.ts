import type { State } from './CentralisationLayer.ts';

export const centralState: State = {
    characterDetails: {
        characterName: '',
        playerName: '',
        class: {
            className: '',
            baseAttack: 0,
            baseSkill: 0,
            classSkills: new Set<string>([]),
            specials: [],
            spells: {
                spellsPerDay: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
                spellsKnown: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
            },
            baseSave: { fortitudeBase: 0, reflexBase: 0, willBase: 0 },
        },
        race: { raceName: '', raceBase: 30, raceBonus: 0 },
        alignment: '',
        deity: '',
        level: 1,
        size: { sizeName: '', ACMod: 0 },
        age: 0,
        sex: '',
        height: 0,
        weight: 0,
        eyes: '',
        hair: '',
    },
    stats: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
        modifiers: {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0,
        },
        tempScores: {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0,
        },
        tempModifiers: {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0,
        },
    },
    status: {
        armorClass: {
            aBonus: 0,
            naturalArmor: 0,
            miscModifier: 0,
        },
        health: {
            maxHealth: 0,
            currentHealth: 0,
            damage: 0,
            hitDie: 0,
        },
        speed: {
            speed: 30,
        },
    },
    bonus: {
        baseAttackBonus: 0,
        initiative: { initiativeTotal: 0, miscModifier: 0 },
    },
    savingThrows: {
        fortitude: {
            miscMod: 0,
            magicMod: 0,
            tempMod: 0,
            total: 0,
        },
        reflex: {
            miscMod: 0,
            magicMod: 0,
            tempMod: 0,
            total: 0,
        },
        will: {
            miscMod: 0,
            magicMod: 0,
            tempMod: 0,
            total: 0,
        },
    },
    skills: {
        skillPoints: { max: 0, current: 0 },
        skills: {
            Appraise: {
                learned: false,
                abilityName: 'intelligence',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            Balance: {
                learned: false,
                abilityName: 'dexterity',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            Bluff: {
                learned: false,
                abilityName: 'charisma',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            Climb: {
                learned: false,
                abilityName: 'strength',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            Concentration: {
                learned: false,
                abilityName: 'constitution',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            Craft: {
                learned: false,
                abilityName: 'intelligence',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            DecipherScript: {
                learned: false,
                abilityName: 'intelligence',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            Diplomacy: {
                learned: false,
                abilityName: 'charisma',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            'Disable Device': {
                learned: false,
                abilityName: 'intelligence',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            Disguise: {
                learned: false,
                abilityName: 'charisma',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            'Escape Artist': {
                learned: false,
                abilityName: 'dexterity',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            Forgery: {
                learned: false,
                abilityName: 'intelligence',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            'Gather Information': {
                learned: false,
                abilityName: 'charisma',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            'Handle Animal': {
                learned: false,
                abilityName: 'charisma',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            Heal: {
                learned: false,
                abilityName: 'wisdom',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            Hide: {
                learned: false,
                abilityName: 'dexterity',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            Intimidate: {
                learned: false,
                abilityName: 'charisma',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            Jump: {
                learned: false,
                abilityName: 'strength',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            Knowledge: {
                learned: false,
                abilityName: 'intelligence',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            Listen: {
                learned: false,
                abilityName: 'wisdom',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            'Move Silently': {
                learned: false,
                abilityName: 'dexterity',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            'Open Lock': {
                learned: false,
                abilityName: 'dexterity',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            Perform: {
                learned: false,
                abilityName: 'charisma',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            Profession: {
                learned: false,
                abilityName: 'wisdom',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            Ride: {
                learned: false,
                abilityName: 'dexterity',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            Search: {
                learned: false,
                abilityName: 'intelligence',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            'Sense Motive': {
                learned: false,
                abilityName: 'wisdom',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            'Sleight of Hand': {
                learned: false,
                abilityName: 'dexterity',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            Spellcraft: {
                learned: false,
                abilityName: 'intelligence',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            Spot: {
                learned: false,
                abilityName: 'wisdom',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            Survival: {
                learned: false,
                abilityName: 'wisdom',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            Swim: {
                learned: false,
                abilityName: 'strength',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            Tumble: {
                learned: false,
                abilityName: 'dexterity',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            'Use Magic Device': {
                learned: false,
                abilityName: 'charisma',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
            'Use Rope': {
                learned: false,
                abilityName: 'dexterity',
                ranks: 0,
                miscMod: 0,
                skillMod: 0,
            },
        },
    },
};
