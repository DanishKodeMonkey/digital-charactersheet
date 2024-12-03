import {useState} from 'react'
import SkillRow from "./SkillRow.tsx";
import skillList from './skillList.json'

function Skills() {

    const [maxRanks, setMaxRanks] = useState<number>(0)
    const [skillPoints, setSkillPoints] = useState<number>(0)


  return (
    <div className="mx-2 my-2">


      <div className="flex flex-col">
      <div className="flex gap-7">
          <div>
              <h1 className="header-title">Skills</h1>
          </div>
          <div className="flex justify-around">
              <div>
                <label className="header-text text-[.6rem]" htmlFor="skillPoints">Max ranks / Skill Points</label></div>
              <div className="flex w-2/6">
                <input className="input-micro" type="number" name="maxRanks" id="maxRanks"  value={maxRanks} onChange={(e)=> setMaxRanks(e.target.value)}/>
                <input className="input-micro" type="number" name="skillPoints" id="skillPoints"  value={skillPoints} onChange={(e)=> setSkillPoints(e.target.value)}/>
              </div>
          </div>
      </div>

        <div className="flex">
            <span className="text-[.5rem] sideways -ml-3">Learned</span>
            <span className="header-text mr-14">Skill name</span>
            <span className="header-text mr-1">Key <br /> ability</span>
            <span className="header-text mr-2">Skill <br /> modifier</span>
            <span className="header-text mr-2">Ability <br /> modifier</span>
            <span className="header-text mr-3">Ranks</span>
            <span className="header-text">misc <br /> modifier</span>
            
        </div>

      </div>
      <div className="skills-list flex flex-col">
        <hr className="my-2 border-y-2"/>
      <div className=" h-screen overflow-scroll">
          {skillList.map((skill, index) => (
              <SkillRow key={index} skill={skill} />
            ))}
      </div>
      </div>
    </div>
  );
}

export default Skills;
