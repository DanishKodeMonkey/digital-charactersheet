import ArmorClass from "./ArmorClass.tsx";
import Health from "./Health.tsx";

function Status() {
  return (
    <div className="flex flex-col">
      <Health />
      <ArmorClass />
    </div>
  );
}

export default Status;
