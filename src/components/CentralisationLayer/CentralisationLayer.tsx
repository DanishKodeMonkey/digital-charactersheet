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

// Unite action interfaces with as a type as Enumerate interfaces
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

const validStatNames = ['strength', 'dexterity','constitution','intelligence','wisdom','charisma']


// state update reducer, atching action type and performing action as needed, and returns a state

const centralizationReducer = (state: State, action: Action): State => {
    switch(action.type){
        case 'UPDATE_STAT':{
            // extract stat and values from payload
            const {stat, value} = action.payload;

            // validate stat type
            if(!validStatNames.includes(stat)){
                console.warn(`Invalid stat name: "${stat}. Must be one of: ${validStatNames.join(', ')}`)
                console.log(`No changes has been made`)
                return state;
            }
            // update state object with stat value
            const newStats = {
                ...state.stats,
                [stat]: value,
            }

            // update modifiers, re-calculate based on updated stats, acc = accumilator
            const modifiers = Object.keys(newStats).reduce((acc, key)=>{
                if(key !== 'modifiers' && key !== 'tempScores' && key !== 'tempModifiers'){
                    const statValue = newStats[key as keyof Stats] 
                    // typeguard to ensure statValue is number(stop screaming typescript thx)
                    if(typeof statValue ==='number'){
                        acc[key] = Math.floor((statValue - 10) / 2);
                    }
                }
                return acc
            }, {} as Record<string,number>) // accumilator initialiser, we push caluclated records to this
           
            // return new state
            return{
                ...state, stats:{...newStats, modifiers},
            }
        }
        case 'UPDATE_TEMP_STAT':{
            // similar to update_stat
            const {stat, value} = action.payload;
            const tempScores = {
                ...state.stats.tempScores,
                [stat]:value,
            }

            const tempModifiers = {
                ...state.stats.tempModifiers,
                [stat]: Math.floor((value - 10) / 2)
            }
            return{
                ...state,
                stats:{...state.stats, tempScores, tempModifiers}
            }
        }
        // default case, if nothing else matches just return state
        default:
            console.log(`No changes has been made`)
            return state;
    }
}

export {centralState, centralizationReducer}
export type {Action, State}