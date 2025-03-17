import type {
  ClassBaseSaves,
  ClassSpellsShape,
} from "../CentralisationLayer.ts";
import classProgressionData from "./classProgression.json" with {
  type: "json",
};

export interface ClassLevelData {
  baseAttack: number;
  baseSkill?: number;
  classSkills?: string[];
  specials?: string[];
  spells?: ClassSpellsShape;
  baseSave?: ClassBaseSaves;
}

// Entire progresison table for a class level, e.g {5, {classlevel data e.g baseAttack: number}}
export type ClassProgressionTable = Record<number, ClassLevelData>;

// lookup shape for all classes e.g Barbarian, {class table}
export type ClassLookupTable = Record<string, ClassProgressionTable>;

// Default value fallback
const DEFAULT_LEVEL_DATA: ClassLevelData = {
  baseAttack: 0,
  baseSkill: 0,
  classSkills: [],
  specials: [],
  baseSave: {
    fortitudeBase: 0,
    reflexBase: 0,
    willBase: 0,
  },
};

// Clientside POC solution

export const classProgression: ClassLookupTable = classProgressionData;

export function classLookup(
  className: string,
  level: number,
): ClassLevelData | null {
  const classData = classProgression[className.toLowerCase()];
  return classData
    ? classData[level] || DEFAULT_LEVEL_DATA
    : DEFAULT_LEVEL_DATA;
}

//API solution draft
/* let classProgression: ClassLookupTable | null = null; */

// HUSKAT: Transition to API fetch for query of class and level later. For now handle in client
/* async function fetchClassProgression(): Promise<ClassLookupTable> {
    if (!classProgression) {
        const response = await fetch('./classProgression.json');
        classProgression = await response.json();
    }
    return classProgression;
}

export async function classLookup(
    className: string,
    level: number
): Promise<ClassLevelData> {
    const data = await fetchClassProgression();
    const classData = data[className.toLowerCase()];
    return classData
        ? classData[level] || DEFAULT_LEVEL_DATA
        : DEFAULT_LEVEL_DATA;
}
 */
