
// huskat: seperate types to typefile

interface ArmorTypeProp {
    name: string;
  }


function Armor({name}:ArmorTypeProp){

    return(
        <div>
            <h2>{name}</h2>
        </div>
    )
}

export default Armor