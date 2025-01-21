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
    size: string;
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
    modifiers: Record<keyof Stats, number>;
    tempScores: Record<keyof Stats, number>;
    tempModifiers: Record<keyof Stats, number>;
}

interface ArmorClassType {
    aBonus: number;
    sizeModifier: number;
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
    abilityName: keyof Stats;
    ranks: number;
    miscMod: number;
    skillMod: number;
}

interface State {
    characterDetails: CharacterDetails;
    stats: Stats;
    status: Status;
    skills: Record<string, Skill>;
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

// Unite action interfaces with as a type as Enumerate interfaces
type Action =
    | UpdateCharacterRaceAction
    | UpdateCharacterDetailsAction
    | UpdateStatAction
    | UpdateTempStatAction
    | UpdateArmorClassAction
    | UpdateHealthAction
    | UpdateHitDie
    | TakeDamageAction
    | UpdateSpeedAction;

// Centralised state, with initial states(default values)
const centralState: State = {
    characterDetails: {
        characterName: '',
        playerName: '',
        class: '',
        race: { raceName: '', raceBase: 30, raceBonus: 0 },
        alignment: '',
        deity: '',
        level: 1,
        size: '',
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
            sizeModifier: 0,
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
            speed: 0,
        },
    },
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
};

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
// 3. Process data : returns new state (not mutation)

// TODO Debounce timer for dispatches to prevent partial dispatches?

const centralizationReducer = (state: State, action: Action): State => {
    switch (action.field) {
        case 'characterDetails': {
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
        default:
            console.log('No changes made to state');
            return state;
    }
};

export { centralizationReducer, centralState };
export type { Action, ArmorClassType, HealthStatus, State };
