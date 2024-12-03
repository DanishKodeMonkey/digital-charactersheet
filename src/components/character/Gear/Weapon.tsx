
// huskat: seperate types to typefile

  interface WeaponTypeProp {
    name: string;
  }


function Weapon({name}:WeaponTypeProp){

    return(
        <div className="bg-red-300 bg-opacity-80"> 
            <h2>{name}</h2>

        </div>
    )
}

export default Weapon