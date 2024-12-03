
// huskat: seperate types to typefile

interface MiscItemTypeProp {
    name: string;
  }


function MiscItem({name}:MiscItemTypeProp){

    return(
        <div className="bg-yellow-500 bg-opacity-80">
            <h2>{name}</h2>

        </div>
    )
}

export default MiscItem