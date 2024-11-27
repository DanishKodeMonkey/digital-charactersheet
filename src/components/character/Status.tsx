import ArmorClass from "./ArmorClass.tsx";
import Health from "./Health.tsx";

function Status() {
  return (
    <div className="flex flex-col md:flex-row justify-center mx-5">
      <div className="w-1/3">
          <Health />
      </div>
      <div className="md:w-2/3">
          <ArmorClass />
      </div>
    </div>
  );
}

export default Status;
