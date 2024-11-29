
import {useState} from 'react'

function BaseAttackBonus(){
    /* 
     Your attack bonus with a melee weapon is:

    Base attack bonus + Strength modifier + size modifier

    With a ranged weapon, your attack bonus is:

    Base attack bonus + Dexterity modifier + size modifier + range penalty

    */

    const [baseAtk, setBaseAtk] = useState<number>(5)
    const handleBaseAtkChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const value = parseInt(e.target.value, 10) || 0;
        setBaseAtk(value)
    }
    return(
        <div className="flex flex-col m-5">

        <label htmlFor="BaseAttackBonus" className="input-title">Base Attack Bonus</label>
        <input className="input-base w-full" type="number" name="baseAtkBonus" id="baseAtkBonus" value={baseAtk} onChange={handleBaseAtkChange}/>
        </div>
    )
}


export default BaseAttackBonus