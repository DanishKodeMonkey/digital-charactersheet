
// huskat: seperate types to typefile

  interface WeaponTypeProp {
    name: string;
  }


function Weapon({name}:WeaponTypeProp){

    return(
        <div>
            <h2>{name}</h2>

        </div>
    )
}

export default Weapon