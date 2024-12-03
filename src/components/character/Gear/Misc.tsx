
// huskat: seperate types to typefile

interface MiscItemTypeProp {
    name: string;
  }


function MiscItem({name}:MiscItemTypeProp){

    return(
        <div>
            <h2>{name}</h2>

        </div>
    )
}

export default MiscItem