// Define types for state,
//
// HUSKAT: Move to seperate file later

type FieldType = 'stats' | 'armorClass' | 'health';

interface Details {
    raceSize: number;
    raceBonus: number;
}
interface Stats {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    modifiers: Record<string, number>;
    tempScores: Record<string, number>;
    tempModifiers: Record<string, number>;
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

interface State {
    details: Details;
    stats: Stats;
    status: Status;
}

interface UpdateStatAction {
    field: 'stats';
    type: 'UPDATE_STAT';
    payload: { stat: keyof Stats; value: number };
}

interface UpdateTempStatAction {
    field: 'stats';
    type: 'UPDATE_TEMP_STAT';
    payload: { stat: keyof Stats; value: number };
}

interface UpdateArmorClassAction {
    field: 'status';
    type: 'UPDATE_ARMOR_CLASS_FIELD';
    payload: { stat: keyof ArmorClassType; value: number };
}

interface UpdateHealthAction {
    field: 'status';
    type: 'UPDATE_HEALTH_FIELD';
    payload: { stat: keyof HealthStatus; value: number };
}

interface TakeDamageAction {
    field: 'status';
    type: 'HEALTH_DAMAGE' | 'HEALTH_HEAL';
    payload: { value: number };
}

interface UpdateSpeedAction {
    field: 'status';
    type: 'UPDATE_SPEED';
    payload: SpeedCalculation;
}

interface SpeedCalculation {
    race: 'small' | 'medium' | 'large';
    armorType: 'none' | 'light' | 'medium' | 'heavy';
}

// Unite action interfaces with as a type as Enumerate interfaces
type Action =
    | UpdateStatAction
    | UpdateTempStatAction
    | UpdateArmorClassAction
    | UpdateHealthAction
    | TakeDamageAction
    | UpdateSpeedAction;

// Centralised state, with initial states(default values)
const centralState: State = {
    details: {
        raceSize: 30,
        raceBonus: 0,
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

const centralizationReducer = (state: State, action: Action): State => {
    switch (action.field) {
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
