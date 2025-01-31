import type {
    ClassSpellsShape,
    ClassBaseSaves,
} from './CentralisationLayer.ts';

export interface ClassLevelData {
    baseAttack: number;
    baseSkill?: number;
    classSkills?: Set<string>;
    specials?: string[];
    spells?: ClassSpellsShape;
    baseSave?: ClassBaseSaves;
}

// Entire progresison table for a class level, e.g {5, {classlevel data e.g baseAttack: number}}
export type ClassProgressionTable = Record<number, ClassLevelData>;

// lookup shape for all classes e.g Barbarian, {class table}
export type ClassLookupTable = Record<string, ClassProgressionTable>;

// HUSKAT - Make lookup table a json instead and match against that? This is in memory
// like what the fuck am I thinking
export const classProgression: ClassLookupTable = {
    barbarian: {
        1: {
            baseAttack: 1,
            baseSkill: 4,
            classSkills: new Set([
                'Climb',
                'Craft',
                'Handle Animal',
                'Intimidate',
                'Jump',
                'Listen',
                'Ride',
                'Survival',
                'Swim',
            ]),
            specials: ['Fast Movement', 'Illiteracy', 'Rage 1/day'],
            baseSave: {
                fortitudeBase: 2,
                reflexBase: 0,
                willBase: 0,
            },
        },
        2: {
            baseAttack: 2,
            specials: ['Uncanny Dodge'],
            baseSave: {
                fortitudeBase: 3,
                reflexBase: 0,
                willBase: 0,
            },
        },
        3: {
            baseAttack: 3,
            specials: ['Trap Sense +1'],
            baseSave: {
                fortitudeBase: 3,
                reflexBase: 1,
                willBase: 1,
            },
        },
        4: {
            baseAttack: 4,
            specials: ['Rage 2/day'],
            baseSave: {
                fortitudeBase: 4,
                reflexBase: 1,
                willBase: 1,
            },
        },
        5: {
            baseAttack: 5,
            specials: ['Improved Uncanny Dodge'],
        },
        6: {
            baseAttack: 6,
            specials: ['Trap Sense +2'],
            baseSave: {
                fortitudeBase: 5,
                reflexBase: 2,
                willBase: 2,
            },
        },
        7: {
            baseAttack: 7,
            specials: ['Damage Reduction 1/-'],
        },
        8: {
            baseAttack: 8,
            specials: ['Rage 3/day'],
            baseSave: {
                fortitudeBase: 6,
                reflexBase: 2,
                willBase: 2,
            },
        },
        9: {
            baseAttack: 9,
            specials: ['Trap Sense +3'],
            baseSave: {
                fortitudeBase: 6,
                reflexBase: 3,
                willBase: 3,
            },
        },
        10: {
            baseAttack: 10,
            specials: ['Damage Reduction 2/-'],
            baseSave: {
                fortitudeBase: 7,
                reflexBase: 3,
                willBase: 3,
            },
        },
        11: {
            baseAttack: 11,
            specials: ['Greater Rage'],
        },
        12: {
            baseAttack: 12,
            specials: ['Trap Sense +4'],
            baseSave: {
                fortitudeBase: 8,
                reflexBase: 4,
                willBase: 4,
            },
        },
        13: {
            baseAttack: 13,
            specials: ['Damage Reduction 3/-'],
        },
        14: {
            baseAttack: 14,
            specials: ['Indomitable will'],
            baseSave: {
                fortitudeBase: 9,
                reflexBase: 4,
                willBase: 4,
            },
        },
        15: {
            baseAttack: 15,
            specials: ['Trap sense +5'],
            baseSave: {
                fortitudeBase: 9,
                reflexBase: 5,
                willBase: 5,
            },
        },
        16: {
            baseAttack: 16,
            specials: ['Damage Reduction 4/-', 'rage 5/day'],
            baseSave: {
                fortitudeBase: 10,
                reflexBase: 5,
                willBase: 5,
            },
        },
        17: {
            baseAttack: 17,
            specials: ['Tireless Rage'],
        },
        18: {
            baseAttack: 18,
            specials: ['Trap sense +6'],
            baseSave: {
                fortitudeBase: 11,
                reflexBase: 6,
                willBase: 6,
            },
        },
        19: {
            baseAttack: 19,
            specials: ['Damage reduction 5/-'],
        },
        20: {
            baseAttack: 20,
            specials: ['Mighty Rage', 'rage 6/day'],
            baseSave: {
                fortitudeBase: 12,
                reflexBase: 6,
                willBase: 6,
            },
        },
    },
};

// class lookup function that takes a class name and a level number,
// returns level data for that class if succesfull, else null.
export function classLookup(
    className: string,
    level: number
): ClassLevelData | null {
    // look up class
    const classData = classProgression[className.toLowerCase()];
    // If successful, look up level, otherwise null.
    return classData ? classData[level] || null : null;
}
