import { useEffect, useMemo, useState } from "react";
import SkillRow from "./SkillRow.tsx";
import { useCentralization } from "../../../context/CentralisationLayer/CentralisationContext.tsx";

function Skills() {
  const { state, dispatch } = useCentralization();

  const { max, current } = state.skills.skillPoints;

  // Calculate new max ranks when level changes
  useEffect(() => {
    dispatch({
      field: "skills",
      type: "UPDATE_SKILL_POINTS",
    });
  }, [
    state.characterDetails.level,
    state.stats.modifiers.intelligence,
    state.stats.tempModifiers.intelligence,
  ]);

  const skillNames = useMemo(() => Object.keys(state.skills.skills), [
    state.skills.skills,
  ]);

  return (
    <div className="mx-2 my-2 h-full flex flex-col lg:overflow-hidden">
      <div className="flex flex-col">
        <div className="flex gap-7">
          <div>
            <h1 className="header-title">Skills</h1>
          </div>
          <div className="flex justify-around">
            <div>
              <label className="header-text text-[.6rem]" htmlFor="skillPoints">
                Max ranks / Skill Points
              </label>
            </div>
            <div className="flex w-2/6">
              <input
                className="input-micro"
                type="number"
                name="maxRanks"
                id="maxRanks"
                value={max}
                readOnly
              />
              <input
                className="input-micro"
                type="number"
                name="skillPoints"
                id="skillPoints"
                value={current}
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="flex">
          <span className="text-[.5rem] sideways -ml-3">Learned</span>
          <span className="header-text mr-14">Skill name</span>
          <span className="header-text mr-1">
            Key <br /> ability
          </span>
          <span className="header-text mr-2">
            Skill <br /> modifier
          </span>
          <span className="header-text mr-2">
            Ability <br /> modifier
          </span>
          <span className="header-text mr-3">Ranks</span>
          <span className="header-text">
            misc <br /> modifier
          </span>
        </div>
      </div>
      <hr className="my-2 border-y-2" />
      <div className="skills-list lg:h-5 min-h-0 flex-grow lg:overflow-y-auto">
        <div className="h-full md:h-auto md:overflow-scroll">
          {skillNames.map((skillName: string) => (
            <SkillRow key={skillName} skill={{ name: skillName }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;
