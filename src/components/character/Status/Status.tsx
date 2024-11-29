import Speed from "./Speed.tsx";
import ArmorClass from "../Status/ArmorClass.tsx";
import Health from "../Status/Health.tsx";

function Status() {
  /* HUSKAT - Centraliser abliity modifiers og send via props */

  return (
    <div className="flex flex-col md:flex-row justify-center mx-5 my-auto">
      <div className="w-1/2 md:w-1/4 my-auto">
        <Health />
      </div>
      <div className="border-b-2 my-2 md:border-r-2 md:mx-2"></div>
      <div className="md:w-5/6 my-auto">
        <ArmorClass />
      </div>
      <div className="border-b-2 my-2 md:border-r-2 md:mx-2"></div>
      <div className="md:w-1/6 my-auto">
        <Speed />
      </div>
    </div>
  );
}

export default Status;
