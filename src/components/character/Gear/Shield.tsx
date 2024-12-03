
// huskat: seperate types to typefile

interface ShieldTypeProp {
    name: string;
  }


function Shield({name}:ShieldTypeProp){

    return(
        <div>
            <h2>{name}</h2>

        </div>
    )
}

export default Shield