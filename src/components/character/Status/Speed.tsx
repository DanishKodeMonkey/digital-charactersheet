import {useState} from 'react'


function Speed(){

    /* HUSKAT
    Speed = raceBase - armorPenalty(>medium=-10 + racebonus(gnome,halfling = +5 dwarf + 10))
    e.g
    Human heavy armor
    20 = 30 - 10 + 0
    Dwarf heavy armor
    20 = 20 - 10 + 10
    Halfling heavy armor
    15 = 20 - 10 + 5
    */
    const [speed, setSpeed] = useState<number>("")


    return(
        <div className="m-5">
            <label htmlFor="speedInput" className="input-title">Speed</label>
            <input className="input-base w-full" type="number" name="speedInput" id="speedInput" value={speed}  onChange={(e) => setSpeed(parseInt((e.target.value)))} />
        </div>
    )
}

export default Speed