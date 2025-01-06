import { StatementSync } from "node:sqlite";
import React, {createContext, useContext, useReducer, ReactNode} from 'react'

// Define types for state, HUSKAT: Move to seperate file later

interface Stats{
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

interface State{
 stats: Stats
}

interface UpdateStatAction{
    type: 'UPDATE_STAT';
    payload: {stat: string; value: number}
}

interface UpdateTempStatAction{
    type: 'UPDATE_TEMP_STAT';
    payload: {stat: string; value: number}
}

// Unite action interfaces with as a type
type Action = UpdateStatAction | UpdateTempStatAction


// Centralised state, with initial states(default values)
const centralState: State = {
    stats:{
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
        modifiers: {},
        tempScores: {},
        tempModifiers: {},
    }
}
