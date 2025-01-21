import { useState, useMemo } from "react";
import SkillRow from "./SkillRow.tsx";
import { useCentralization } from "../../CentralisationLayer/CentralisationContext.tsx";

function Skills() {
  const {state} = useCentralization()
  const [maxRanks, setMaxRanks] = useState<number>(0);
  const [skillPoints, setSkillPoints] = useState<number>(0);

  const skillNames =  useMemo(() => Object.keys(state.skills), [state.skills])

  return (
    <div className="mx-2 my-2 h-full flex flex-col overflow-hidden">
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
                value={maxRanks}
                onChange={(e) => setMaxRanks(e.target.value)}
              />
              <input
                className="input-micro"
                type="number"
                name="skillPoints"
                id="skillPoints"
                value={skillPoints}
                onChange={(e) => setSkillPoints(e.target.value)}
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
      <div className="skills-list min-h-0 h-5 flex-grow overflow-y-auto">
        <div className="h-auto overflow-scroll">
          {skillNames.map((skillName) => (
            <SkillRow key={skillName} skill={{name: skillName}} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;
