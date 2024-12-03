
// huskat: seperate types to typefile

interface ShieldTypeProp {
    name: string;
  }


function Shield({name}:ShieldTypeProp){

    return(
        <div className="bg-green-300 bg-opacity-80">
            <h2>{name}</h2>

        </div>
    )
}

export default Shield