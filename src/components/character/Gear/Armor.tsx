// huskat: seperate types to typefile

interface ArmorTypeProp {
  name: string;
}

function Armor({ name }: ArmorTypeProp) {
  return (
    <div className="bg-pink-300 bg-opacity-80">
      <h2>{name}</h2>
    </div>
  );
}

export default Armor;
