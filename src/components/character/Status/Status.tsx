import Speed from "./Speed.tsx";
import ArmorClass from "../Status/ArmorClass.tsx";
import Health from "../Status/Health.tsx";
import { useCentralization } from "../../CentralisationLayer/CentralisationContext.tsx";

function Status() {
  /* HUSKAT - Centraliser abliity modifiers og send via props */
  const {state} = useCentralization()

  // dev button, remove for prod
  const handleClick = () =>{
    console.log(state)
  }

  return (
    <>
    <button onClick={handleClick}>dev - print state</button>
    <div className="flex flex-col md:flex-row justify-center mx-5 my-auto">
     
      <div className="md:w-2/6 my-auto">
        <Health />
      </div>
      <div className="border-b-2 my-2 md:border-r-2 md:mx-2"></div>
      <div className="md:w-3/6 flex-shrink-0 my-auto mr-5">
        <ArmorClass />
      </div>
      <div className="border-b-2 my-2 md:border-r-2 md:mx-2"></div>
      <div className="w-3/6 self-center md:w-1/6 my-auto">
        <Speed />
      </div>
    </div>
    </>
  );
}

export default Status;
