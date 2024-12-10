export interface Skill {
  name: string;
  keyAbility: string;
}

export interface SkillRowProps {
  skill: Skill;
}

export type AbilityRowProps = {
  ability: string;
};
