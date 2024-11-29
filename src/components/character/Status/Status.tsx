import ArmorClass from "../Status/ArmorClass.tsx";
import Health from "../Status/Health.tsx";

function Status() {
      /* HUSKAT - Centraliser abliity modifiers og send via props */

  return (
    <div className="flex flex-col md:flex-row justify-center mx-5 my-2">
      <div className="w-1/2 md:w-1/4">
          <Health />
      </div>
      <div className="border-b-2 my-2 md:border-r-2 md:mx-2"></div>
      <div className="md:w-3/4">
          <ArmorClass />
      </div>
    </div>
  );
}

export default Status;
