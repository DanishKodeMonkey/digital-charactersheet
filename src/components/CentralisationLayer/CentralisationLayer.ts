import { centralState } from './centralState.ts';

// Define types for state,
//
// HUSKAT: Move to seperate file later

interface ActionBase {
    skipDebounce?: boolean; // optional flag to skip debouncer for dispatch
}

interface CharacterDetails extends ActionBase {
    characterName: string;
    playerName: string;
    class: string;
    race: { raceName: string; raceBase: number; raceBonus: number };
    alignment: string;
    deity: string;
    level: number;
    size: { sizeName: string; ACMod: number };
    age: number;
    sex: string;
    height: number;
    weight: number;
    eyes: string;
    hair: string;
}

interface UpdateCharacterRaceAction extends ActionBase {
    field: 'characterDetails';
    type: 'UPDATE_CHARACTER_DETAIL_RACE';
    payload: { value: string };
}
interface UpdateCharacterSizeAction extends ActionBase {
    field: 'characterDetails';
    type: 'UPDATE_CHARACTER_DETAIL_SIZE';
    payload: { value: string };
}
interface UpdateCharacterDetailsAction extends ActionBase {
    field: 'characterDetails';
    type: 'UPDATE_CHARACTER_DETAIL';
    payload: { key: keyof CharacterDetails; value: string | number };
}
interface Stats {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    modifiers: Record<AbilityName, number>;
    tempScores: Record<AbilityName, number>;
    tempModifiers: Record<AbilityName, number>;
}

type AbilityName =
    | 'strength'
    | 'dexterity'
    | 'constitution'
    | 'intelligence'
    | 'wisdom'
    | 'charisma';

interface Bonus {
    baseAttackBonus: BaseAttackBonus;
    initiative: Initiative;
}

interface BaseAttackBonus {
    baseAttackMod: number;
    baseAttackTotal: number;
}

interface Initiative {
    initiativeTotal: number;
    miscModifier: number;
}

interface SavingThrows {
    fortitude: SaveThrow;
    reflex: SaveThrow;
    will: SaveThrow;
}

interface SaveThrow {
    base: number;
    magicMod: number;
    miscMod: number;
    tempMod: number;
    total?: number; // Derived value, can initiate as null
}

interface ArmorClassType {
    aBonus: number;
    naturalArmor: number;
    miscModifier: number;
}

interface HealthStatus {
    maxHealth: number;
    currentHealth: number;
    damage: number;
    hitDie: number;
}

interface SpeedType {
    speed: number;
}

interface Status {
    armorClass: ArmorClassType;
    health: HealthStatus;
    speed: SpeedType;
}

interface Skill {
    learned: boolean;
    abilityName: AbilityName;
    ranks: number;
    miscMod: number;
    skillMod: number;
}
interface SkillPoints {
    max: number;
    current: number;
}
type Skills = {
    skillPoints: SkillPoints;
    skills: Record<string, Skill>;
};

type SkillFieldValueType<Field extends keyof Skill> = Field extends 'learned'
    ? boolean // if field key, derived from Skill is 'learned' value must be boolean
    : Field extends 'ranks' | 'miscMod' | 'skillMod'
    ? number // if field key is this, value must be number
    : never; // default to never

interface State {
    characterDetails: CharacterDetails;
    stats: Stats;
    status: Status;
    bonus: Bonus;
    savingThrows: SavingThrows;
    skills: Skills;
}

interface UpdateStatAction extends ActionBase {
    field: 'stats';
    type: 'UPDATE_STAT';
    payload: { stat: keyof Stats; value: number };
}

interface UpdateTempStatAction extends ActionBase {
    field: 'stats';
    type: 'UPDATE_TEMP_STAT';
    payload: { stat: keyof Stats; value: number };
}

interface UpdateArmorClassAction extends ActionBase {
    field: 'status';
    type: 'UPDATE_ARMOR_CLASS_FIELD';
    payload: { stat: keyof ArmorClassType; value: number };
}

interface UpdateSpeedAction extends ActionBase {
    field: 'status';
    type: 'UPDATE_SPEED';
    payload: { value: number };
}
interface UpdateHealthAction extends ActionBase {
    field: 'status';
    type: 'UPDATE_HEALTH_FIELD';
    payload: { stat: keyof HealthStatus; value: number };
}
interface UpdateHitDie extends ActionBase {
    field: 'status';
    type: 'UPDATE_HIT_DIE';
}

interface TakeDamageAction extends ActionBase {
    field: 'status';
    type: 'HEALTH_DAMAGE' | 'HEALTH_HEAL';
    payload: { value: number };
}

interface UpdateSkillAction {
    field: 'skills';
    type: 'UPDATE_SKILL';
    payload: {
        skill: keyof Skills; // e.g string = "heal"
        field: keyof Skill; // e.g string =  "learned"
        value: SkillFieldValueType<keyof Skill>; // e.g boolean = "true" OR number = 3
    };
}

interface UpdateBonusBaseAttackTotalAction {
    field: 'bonus';
    type: 'UPDATE_BASE_ATTACK_TOTAL';
    payload: number;
}

interface UpdateBonusInitiativeAction {
    field: 'bonus';
    type: 'UPDATE_INITIATIVE';
    payload: { miscModifier: number };
}

interface UpdateSaveThrowsAction {
    field: 'savingThrows';
    type: 'UPDATE_SAVE_THROW_TOTAL';
    payload: {
        saveType: keyof SavingThrows;
        field: keyof SaveThrow;
        value: number;
    };
}
interface UpdateSaveThrowsAbilityModifierAction {
    field: 'savingThrows';
    type: 'UPDATE_SAVE_THROW_ABILITY_MODIFIER';
    payload: {
        saveType: keyof SavingThrows;
    };
}

// Unite action interfaces with as a type as Enumerate interfaces
type Action =
    | UpdateCharacterRaceAction
    | UpdateCharacterDetailsAction
    | UpdateCharacterSizeAction
    | UpdateStatAction
    | UpdateTempStatAction
    | UpdateArmorClassAction
    | UpdateHealthAction
    | UpdateHitDie
    | TakeDamageAction
    | UpdateSpeedAction
    | UpdateSkillAction
    | UpdateBonusBaseAttackTotalAction
    | UpdateBonusInitiativeAction
    | UpdateSaveThrowsAction
    | UpdateSaveThrowsAbilityModifierAction;

const validStatNames = [
    'strength',
    'dexterity',
    'constitution',
    'intelligence',
    'wisdom',
    'charisma',
];

// state update reducer, accepts state and action (dispatch) performing action as needed and instructed, and returns a state

// 3 steps,
// 1. Check field(section of state),
// 2. Check action type(Update stat? Temp stat? Reset?(TODO))
// 2.5 sub-field check based on shape of action.payload
// 3. Process data : returns new state (not mutation)

const centralizationReducer = (state: State, action: Action): State => {
    switch (action.field) {
        case 'characterDetails': {
            // HUSKAT: Update case for class, update types and central state to include class-subfields with bonuses like base attack, base save etc.
            // For starters, use case check for string matches, otherwise default to fighter type, like with race.
            switch (action.type) {
                case 'UPDATE_CHARACTER_DETAIL_RACE': {
                    const { value } = action.payload; // race name
                    const raceData = (() => {
                        switch (value.toLowerCase()) {
                            case 'dwarf':
                                return { raceBase: 20, raceBonus: 5 };
                            case 'halfling':
                                return { raceBase: 20, raceBonus: 10 };
                            default: // Default to human
                                return { raceBase: 30, raceBonus: 0 };
                        }
                    })();
                    return {
                        ...state,
                        characterDetails: {
                            ...state.characterDetails,
                            race: { raceName: value, ...raceData },
                        },
                    };
                }
                case 'UPDATE_CHARACTER_DETAIL_SIZE': {
                    const { value } = action.payload;
                    const sizeData = (() => {
                        switch (value.toLowerCase()) {
                            case 'small':
                                return { ACMod: 1 };
                            case 'large':
                                return { ACMod: -1 };
                            case 'giant':
                                return { ACMod: -2 };
                            default:
                                return { ACMod: 0 };
                        }
                    })();
                    return {
                        ...state,
                        characterDetails: {
                            ...state.characterDetails,
                            size: { sizeName: value, ...sizeData },
                        },
                    };
                }
                case 'UPDATE_CHARACTER_DETAIL': {
                    const { key, value } = action.payload;
                    return {
                        ...state,
                        characterDetails: {
                            ...state.characterDetails,
                            [key]: value,
                        },
                    };
                }
                default:
                    console.log('No changes made to character details');
                    return state;
            }
        }
        case 'stats': {
            switch (action.type) {
                case 'UPDATE_STAT': {
                    // extract stat and values from payload
                    const { stat, value } = action.payload;

                    // validate stat type
                    if (!validStatNames.includes(stat)) {
                        console.warn(
                            `Invalid stat name: "${stat}. Must be one of: ${validStatNames.join(
                                ', '
                            )}`
                        );
                        console.log(`No changes has been made`);
                        return state;
                    }

                    if (state.stats[stat] === value) {
                        console.log('No changes made to stat value');

                        return state;
                    }

                    // update state object with stat value
                    const newStats = {
                        ...state.stats,
                        [stat]: value,
                    };

                    // update modifiers, re-calculate based on updated stats, acc = accumilator
                    const modifiers = Object.keys(newStats).reduce(
                        (acc, key) => {
                            if (
                                key !== 'modifiers' &&
                                key !== 'tempScores' &&
                                key !== 'tempModifiers'
                            ) {
                                const statValue = newStats[key as keyof Stats];
                                // typeguard to ensure statValue is number(stop screaming typescript thx)
                                if (typeof statValue === 'number') {
                                    // If the stat value is greater than or equal to 10, calculate positive modifier
                                    if (statValue >= 10) {
                                        acc[key] = Math.floor(
                                            (statValue - 10) / 2
                                        );
                                    } // If the stat value is less than 10, calculate negative modifier
                                    else {
                                        acc[key] = Math.ceil(
                                            (statValue - 10) / 2
                                        );
                                    }
                                }
                            }
                            return acc;
                        },
                        {} as Record<string, number>
                    ); // accumilator initialiser, we push caluclated records to this

                    // return new state
                    return {
                        ...state,
                        stats: { ...newStats, modifiers },
                    };
                }
                case 'UPDATE_TEMP_STAT': {
                    // similar to update_stat
                    const { stat, value } = action.payload;
                    const tempScores = {
                        ...state.stats.tempScores,
                        [stat]: value,
                    };

                    const tempModifiers = {
                        ...state.stats.tempModifiers,
                        [stat]:
                            value >= 0
                                ? Math.floor(value / 2) // For values >= 10
                                : Math.ceil(value / 2), // For values < 10
                    };
                    return {
                        ...state,
                        stats: { ...state.stats, tempScores, tempModifiers },
                    };
                }
                // default case, if nothing else matches just return state
                default:
                    console.log(`No changes has been made to stats`);
                    return state;
            }
        }
        case 'bonus': {
            switch (action.type) {
                case 'UPDATE_BASE_ATTACK_TOTAL':
                    return {
                        ...state,
                        bonus: {
                            ...state.bonus,
                            baseAttackBonus: {
                                ...state.bonus.baseAttackBonus,
                                baseAttackTotal: action.payload,
                            },
                        },
                    };
                case 'UPDATE_INITIATIVE': {
                    const { miscModifier } = action.payload;
                    const { dexterity } = state.stats.modifiers;
                    const newInitiativeTotal = miscModifier + dexterity;
                    return {
                        ...state,
                        bonus: {
                            ...state.bonus,
                            initiative: {
                                ...state.bonus.initiative,
                                initiativeTotal: newInitiativeTotal,
                                miscModifier,
                            },
                        },
                    };
                }
                default:
                    console.log('No changes made to bonuses');
                    return state;
            }
        }
        case 'savingThrows': {
            switch (action.type) {
                case 'UPDATE_SAVE_THROW_TOTAL': {
                    const { saveType, field, value } = action.payload;

                    let abilityMod = 0;
                    //get relevant ability modifier
                    switch (saveType) {
                        case 'fortitude': {
                            abilityMod = state.stats.modifiers.constitution;
                            break;
                        }
                        case 'reflex': {
                            abilityMod = state.stats.modifiers.dexterity;
                            break;
                        }
                        case 'will':
                            abilityMod = state.stats.modifiers.wisdom;
                            break;
                        default:
                            console.error(`Unknown saveType: ${saveType}`);
                            return state;
                    }
                    // get current saveThrow data
                    const save = state.savingThrows[saveType];

                    // update field
                    const newSave = {
                        ...save,
                        [field]: value,
                    };

                    // calculate new total
                    const newTotal =
                        newSave.base +
                        newSave.magicMod +
                        newSave.miscMod +
                        newSave.tempMod +
                        abilityMod;

                    return {
                        ...state,
                        savingThrows: {
                            ...state.savingThrows,
                            [saveType]: { ...newSave, total: newTotal },
                        },
                    };
                }
                case 'UPDATE_SAVE_THROW_ABILITY_MODIFIER': {
                    const { saveType } = action.payload;
                    let abilityMod = 0;
                    switch (saveType) {
                        case 'fortitude':
                            abilityMod = state.stats.modifiers.constitution;
                            break;
                        case 'reflex':
                            abilityMod = state.stats.modifiers.dexterity;
                            break;
                        case 'will':
                            abilityMod = state.stats.modifiers.wisdom;
                            break;
                        default:
                            return state;
                    }
                    const save = state.savingThrows[saveType];

                    const newTotal =
                        save.base + save.miscMod + save.tempMod + abilityMod;

                    return {
                        ...state,
                        savingThrows: {
                            ...state.savingThrows,
                            [saveType]: {
                                ...save,
                                total: newTotal,
                            },
                        },
                    };
                }
                default:
                    console.log('No changes made to savingThrows');
                    return state;
            }
        }
        case 'status': {
            switch (action.type) {
                case 'UPDATE_ARMOR_CLASS_FIELD': {
                    const { stat, value } = action.payload;
                    return {
                        ...state,
                        status: {
                            ...state.status,
                            armorClass: {
                                ...state.status.armorClass,
                                [stat]: value,
                            },
                        },
                    };
                }
                case 'UPDATE_SPEED': {
                    const { value } = action.payload;
                    return {
                        ...state,
                        status: {
                            ...state.status,
                            speed: { ...state.status.speed, speed: value },
                        },
                    };
                }
                case 'UPDATE_HEALTH_FIELD': {
                    const { stat, value } = action.payload;

                    return {
                        ...state,
                        status: {
                            ...state.status,
                            health: {
                                ...state.status.health,
                                [stat]: value,
                            },
                        },
                    };
                }
                case 'UPDATE_HIT_DIE': {
                    const { hitDie } = state.status.health;
                    const { level } = state.characterDetails;
                    const { constitution } = state.stats.modifiers;
                    const { maxHealth } = state.status.health; // current max health
                    /* HUSKAT: Determine max hit die based on class (e.g fighter max hit die is d10 = 10) */

                    const newHealthTotal =
                        hitDie + constitution + (level - 1) + maxHealth;

                    return {
                        ...state,
                        status: {
                            ...state.status,
                            health: {
                                ...state.status.health,
                                maxHealth: newHealthTotal,
                                hitDie: 0, // reset hitDie after health is calculated
                            },
                        },
                    };
                }
                case 'HEALTH_DAMAGE': {
                    const { value } = action.payload;
                    const newHealth =
                        state.status.health.currentHealth - Math.abs(value);

                    return {
                        ...state,
                        status: {
                            ...state.status,
                            health: {
                                ...state.status.health,
                                currentHealth: newHealth,
                            },
                        },
                    };
                }
                case 'HEALTH_HEAL': {
                    const { value } = action.payload;
                    const newHealth = state.status.health.currentHealth + value;

                    return {
                        ...state,
                        status: {
                            ...state.status,
                            health: {
                                ...state.status.health,
                                currentHealth: newHealth,
                            },
                        },
                    };
                }
                // HUSKAT Implement proper after player details added to state (realised we need data like race to determine speed bonuses)
                /*                 case 'UPDATE_SPEED': {
                    const { race, armorType } = action.payload;
                    switch (race) {
                        case 'dwarf':
                            raceBase = 20;
                            raceBonus = 10;
                            break;
                        case 'halfling':
                            raceBase = 20;
                            raceBonus = 5;
                            break;
                        default: // Human or other races
                            raceBase = 30;
                            break;
                    }
                } */
                default:
                    console.log('No changes made to status');
                    return state;
            }
        }
        case 'skills': {
            switch (action.type) {
                case 'UPDATE_SKILL': {
                    const { skill, field, value } = action.payload;

                    // Validate skill in state
                    if (state.skills.skills[skill]) {
                        if (field !== 'learned') {
                            const updatedSkill = {
                                ...state.skills.skills[skill],
                                [field]: value,
                            };

                            // Recalculate skillMod total based on updated values
                            const { ranks, miscMod, abilityName } =
                                updatedSkill;
                            const abilityMod =
                                state.stats.modifiers[abilityName] || 0;
                            const newSkillMod = abilityMod + ranks + miscMod;

                            // Return updated state with new skill modifier, and rest of updatedSkill
                            return {
                                ...state,
                                skills: {
                                    ...state.skills, // Keep other fields in state.skills
                                    skills: {
                                        ...state.skills.skills, // Update only the skills part
                                        [skill]: {
                                            ...updatedSkill,
                                            skillMod: newSkillMod,
                                        },
                                    },
                                },
                            };
                        } else if (typeof value === 'boolean') {
                            // If the field is 'learned', just update the related field without recalculating skillMod
                            return {
                                ...state,
                                skills: {
                                    ...state.skills, // Keep other fields in state.skills
                                    skills: {
                                        ...state.skills.skills, // Update only the skills part
                                        [skill]: {
                                            ...state.skills.skills[skill],
                                            [field]: value,
                                        },
                                    },
                                },
                            };
                        } else {
                            console.warn(
                                'Expected a boolean for "learned" field, got: ',
                                typeof value
                            );
                            console.log(state);

                            return state;
                        }
                    }

                    console.warn('No skill called', skill);
                    return state;
                }
                default:
                    console.log('No changes made to skills');
                    return state;
            }
        }
        default:
            console.log('No changes made to state');
            return state;
    }
};

export { centralizationReducer, centralState };
export type { Action, ArmorClassType, HealthStatus, State };
