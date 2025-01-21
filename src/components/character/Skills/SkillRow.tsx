import { useEffect, useState } from "react";
import { SkillRowProps } from "../../../types/character.ts";
import { useCentralization } from "../../CentralisationLayer/CentralisationContext.tsx";

// huskat: seperate types to typefile

function SkillRow({ skill }: SkillRowProps) {
  const { state } = useCentralization();
  const [learned, setLearned] = useState<boolean>(false);
  const [skillMod, setSkillMod] = useState<number>(0);
  const abilityMod = state.stats.modifiers[skill.keyAbility] || 0;
  const [ranks, setRanks] = useState<number>("");
  const [miscMod, setMiscMod] = useState<number>("");

  const toggleLearned = () => {
    setLearned((prevLearned) => !prevLearned);
  };
  useEffect(() => {
    setSkillMod(
      (abilityMod ? abilityMod : 0) + (ranks ? ranks : 0) +
        (miscMod ? miscMod : 0),
    );
  }, [abilityMod, ranks, miscMod]);

  // HUSKAT: Styling to sheet
  return (
    <div className="skill-row flex space-between">
      <div className="w-1/12">
        <input
          type="checkbox"
          name="learned"
          id="learned"
          checked={learned}
          onChange={toggleLearned}
        />
      </div>
      <label className="w-1/3 text-sm" htmlFor={`${skill.name}`}>
        {skill.name}
      </label>
      <span className="text-xs mr-2">
        {skill.keyAbility.slice(0, 3).toUpperCase()}
      </span>
      <div className="flex w-1/2">
        <div className="w-1/4">
          <input
            type="number"
            name="skillModifier"
            className="input-micro"
            id={`skillModifier-${skill.name}`}
            value={skillMod ? skillMod : 0}
            disabled
          />
        </div>

        <div className="w-1/4">
          <input
            className="input-micro"
            type="number"
            name="abilityModifier"
            id={`abilityModifier-${skill.name}`}
            value={abilityMod}
            disabled
          />
        </div>
        <div className="w-1/4">
          <input
            className="input-micro"
            type="number"
            name="ranksModifier"
            id={`ranksModifier-${skill.name}`}
            value={ranks}
            onChange={(e) => setRanks(Number(e.target.value))}
          />
        </div>
        <div className="w-1/4">
          <input
            className="input-micro"
            type="number"
            name="miscModifier"
            id={`miscModifier-${skill.name}`}
            value={miscMod}
            onChange={(e) => setMiscMod(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}

export default SkillRow;
