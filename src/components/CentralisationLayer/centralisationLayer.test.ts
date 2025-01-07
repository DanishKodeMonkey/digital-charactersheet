import { assertEquals } from 'jsr:@std/assert';
import { centralizationReducer } from './CentralisationLayer.tsx';
import { Action, State } from './CentralisationLayer.tsx';

Deno.test('UPDATE_STAT with a valid stat updates state correctly', () => {
    const mockState: State = {
        stats: {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10,
            modifiers: {},
            tempScores: {},
            tempModifiers: {},
        },
    };
    // Establish action call, this illustrates how a action would be sent to the reducer
    const action: Action = {
        type: 'UPDATE_STAT',
        payload: { stat: 'strength', value: 15 },
    };
    // trigger the reducer against mock state with test action.
    const newState = centralizationReducer(mockState, action);
    // Should equal 15
    assertEquals(newState.stats.strength, 15);
    // Verify calculation of modifier matches.
    assertEquals(newState.stats.modifiers.strength, Math.floor((15 - 10) / 2));
});

Deno.test('UPDATE_STAT with an invalid stat name does not modify state', () => {
    const mockState: State = {
        stats: {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10,
            modifiers: {},
            tempScores: {},
            tempModifiers: {},
        },
    };
    const action: Action = {
        type: 'UPDATE_STAT',
        payload: { stat: 'invalidStat', value: 20 },
    };
    const newState = centralizationReducer(mockState, action);

    assertEquals(newState, mockState); // State should match, and remain unchanged
});

Deno.test(
    'UPDATE_TEMP_STAT updates tempScores and tempModifiers in the state correctly',
    () => {
        const mockState: State = {
            stats: {
                strength: 10,
                dexterity: 10,
                constitution: 10,
                intelligence: 10,
                wisdom: 10,
                charisma: 10,
                modifiers: {},
                tempScores: {},
                tempModifiers: {},
            },
        };

        const action: Action = {
            type: 'UPDATE_TEMP_STAT',
            payload: { stat: 'dexterity', value: 18 },
        };
        const newState = centralizationReducer(mockState, action);

        // verify score is updated correctly
        assertEquals(newState.stats.tempScores.dexterity, 18);
        // verify modifier is calculated correctly
        assertEquals(
            newState.stats.tempModifiers.dexterity,
            Math.floor((18 - 10) / 2)
        );
    }
);

Deno.test('Invalid action type does not modify the state', () => {
    const mockState: State = {
        stats: {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10,
            modifiers: {},
            tempScores: {},
            tempModifiers: {},
        },
    };

    const action: Action = { type: 'INVALID_ACTION' } as any; // Cast to bypass type checking
    const newState = centralizationReducer(mockState, action);

    assertEquals(newState, mockState); // State should remain unchanged
});
