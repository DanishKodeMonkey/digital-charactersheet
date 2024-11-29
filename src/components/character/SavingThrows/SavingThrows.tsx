import SaveRow from "./SaveRow.tsx";

function SavingThrows() {
  return (
  <div className="container p-4">
      <div className="flex flex-col">
        <div className="grid grid-cols-[1fr,2.2fr]">
            <div><span className="ability-row-headers text-xl leading-none">Saving Throws</span></div>
            <div className="grid grid-cols-6 items-end text-center">
                <span className="ability-row-headers text-[.9rem] font-extrabold leading-none">Total</span>
                <span className="ability-row-headers text-[.7rem] leading-none">Base <br /> save</span>
                <span className="ability-row-headers text-[.7rem] leading-none">Ability <br /> mod</span>
                <span className="ability-row-headers text-[.7rem] leading-none">magic <br /> mod</span>
                <span className="ability-row-headers text-[.7rem] leading-none">misc  <br /> mod</span>
                <span className="ability-row-headers text-[.7rem] leading-none">temp <br /> mod</span>
               
            </div>
        
        </div>
        <hr className="border-b-2 m-1"/>
        <div className="grid grid-rows-3 grid-cols-[1fr,2fr] pr-1" >

                <div>
                    <h1 className="text-sm">Fortitude</h1> <h2 className="text-xs">(constitution)</h2>
                </div>
                <div>
                    <SaveRow />
                </div>

                <div>
                    <h1  className="text-sm">Reflex</h1> <h2 className="text-xs">(dexterity)</h2>
                </div>
                <div>
                    <SaveRow />
                </div>


                <div>
                    <h1  className="text-sm">Will</h1> <h2 className="text-xs">(wisdom)</h2>
                </div>
                <div>
                    <SaveRow />
                </div>

        </div>
      </div>
  </div>

)

}

export default SavingThrows;
