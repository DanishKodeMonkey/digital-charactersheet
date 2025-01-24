import { SkillRowProps } from "../../../types/character.ts";
import { useCentralization } from "../../CentralisationLayer/CentralisationContext.tsx";

// huskat: seperate types to typefile

function SkillRow({ skill }: SkillRowProps) {
  const { state, dispatch } = useCentralization();

  
  const { learned, abilityName, ranks, miscMod } =
    state.skills.skills[skill.name];

  const abilityMod = state.stats.modifiers[abilityName] || 0;

  const skillMod = ranks + abilityMod + miscMod
  // calculate skillMod total

  const toggleLearned = () => {
    dispatch({
      field: "skills",
      type: "UPDATE_SKILL",
      payload: {
        skill: skill.name,
        field: "learned",
        value: !learned,
      },
    });
  };

  const updateRanks = (value: number) => {
    dispatch({
      field: "skills",
      type: "UPDATE_SKILL",
      payload: { skill: skill.name, field: "ranks", value },
    });
  };
  const updateMiscMod = (value: number) => {
    dispatch({
      field: "skills",
      type: "UPDATE_SKILL",
      payload: { skill: skill.name, field: "miscMod", value },
    });
  };

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
        {abilityName.slice(0, 3).toUpperCase()}
      </span>
      <div className="flex w-1/2">
        <div className="w-1/4">
          <input
            type="number"
            name="skillModifier"
            className="input-micro"
            id={`skillModifier-${skill.name}`}
            value={skillMod}
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
            defaultValue={ranks.toString()}
            onFocus={(e) => {
              e.target.value = "";
            }} // Clear value on focus
            onBlur={(e) => {
              if (e.target.value === "") {
                e.target.value = ranks.toString(); // Reset to original state if blank
              } else {
                updateRanks(Number(e.target.value)); // Update state with the new value
              }
            }}
          />
        </div>
        <div className="w-1/4">
          <input
            className="input-micro"
            type="number"
            name="miscModifier"
            id={`miscModifier-${skill.name}`}
            defaultValue={miscMod.toString()}
            onFocus={(e) => {
              e.target.value = "";
            }} // Clear value on focus
            onBlur={(e) => {
              if (e.target.value === "") {
                console.log(e.target.value);

                e.target.value = miscMod.toString(); // Reset to original state if blank
              } else {
                updateMiscMod(Number(e.target.value)); // Update state with the new value
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SkillRow;
