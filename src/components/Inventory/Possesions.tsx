import InventoryRow from "./InventoryRow.tsx";

interface PossessionsProps {
    possessions: Possession[];
}

function Possessions(){

    return(
        <div>
            <h1>POSSESSIONS</h1>
            <InventoryRow />
            <InventoryRow />
        </div>
    )
}

export default Possessions