import React, { useEffect, useState } from "react";
import { useCentralization } from "../../../context/CentralisationLayer/CentralisationContext.tsx";

interface Errors {
  [key: string]: string | undefined;
}
// Globals prevent re-declaring every render
const ALIGNMENT_OPTIONS = [
  "Lawful Good",
  "Neutral Good",
  "Chaotic Good",
  "Lawful Neutral",
  "True Neutral",
  "Chaotic Neutral",
  "Lawful Evil",
  "Neutral Evil",
  "Chaotic Evil",
];
const SIZE_OPTIONS = ["small", "medium", "large", "giant"];

function CharacterInformation() {
  // HUSKAT
  /*
  Field race should check if race matches dwarf, or halfling and grant bonuses as determined in central state
  seperate change or check in change?

  field alignment should be one of 9 alignments as determined by 3.5e rules

  field size should be a choice between small, medium, large, or giant.
  These should trigger appropriate size bonuses in state


  */
  // local error state for UI errors during validation
  const [errors, setErrors] = useState<Errors>({});

  const { state, dispatch } = useCentralization();
  const [inputValues, setInputValues] = useState({
    characterName: "",
    playerName: "",
    class: "",
    race: "",
    alignment: "",
    deity: "",
    level: 0,
    sizeName: "",
    age: 0,
    sex: "",
    height: 0,
    weight: 0,
    eyes: "",
    hair: "",
  });

  // Sync local state with centralState on mount and when centralState updates

  useEffect(() => {
    setInputValues({
      characterName: state.characterDetails.characterName || "",
      playerName: state.characterDetails.playerName || "",
      class: state.characterDetails.class.className || "",
      race: state.characterDetails.race.raceName || "",
      alignment: state.characterDetails.alignment || "",
      deity: state.characterDetails.deity || "",
      level: state.characterDetails.level || 0,
      sizeName: state.characterDetails.size.sizeName || "",
      age: state.characterDetails.age || 0,
      sex: state.characterDetails.sex || "",
      height: state.characterDetails.height || 0,
      weight: state.characterDetails.weight || 0,
      eyes: state.characterDetails.eyes || "",
      hair: state.characterDetails.hair || "",
    });
  }, [state.characterDetails]); // Reacts to state updates

  const handleChange = (
    key: keyof typeof state.characterDetails,
    value: string | number,
  ) => {
    // Update local state for UI
    setInputValues((prev) => ({ ...prev, [key]: value }));
    // Start by setting the error to undefined (clear any previous error)
    setErrors((prev: Errors) => ({ ...prev, [key]: undefined }));

    switch (key) {
      case "class":
        dispatch({
          field: "characterDetails",
          type: "UPDATE_CHARACTER_DETAIL_CLASS",
          payload: { value },
        });
        break;

      case "level": {
        const level = Number(value);
        console.log("Triggered level adjust with", level);
        console.log("Current level", state.characterDetails.level);

        // Validate level range
        if (level < 1 || level > 20) {
          console.log("Level not in range", level);

          setErrors((prev: Errors) => ({
            ...prev,
            [key]: "Invalid level, must be between 1 and 20.",
          }));
          return; // Early return to prevent dispatch if validation fails
        }

        // Validate level progression (cannot go back in levels)
        if (level < Number(state.characterDetails.level)) {
          console.log(
            `Level lower than saved value`,
            level,
            state.characterDetails.level,
          );

          setErrors((prev: Errors) => ({
            ...prev,
            [key]:
              `Invalid level, must be above saved level of ${state.characterDetails.level}`,
          }));
          return; // Early return to prevent dispatch if validation fails
        } // If level passes validation, dispatch the action
        else {
          console.log("Passed check, dispatching", level);

          dispatch({
            field: "characterDetails",
            type: "UPDATE_CHARACTER_DETAIL_LEVEL",
            payload: { value: level },
          });
          break;
        }
      }

      case "race":
        dispatch({
          field: "characterDetails",
          type: "UPDATE_CHARACTER_DETAIL_RACE",
          payload: { value },
        });
        break;

      case "alignment":
        if (!ALIGNMENT_OPTIONS.includes(value as string)) {
          setErrors((prev: Errors) => ({
            ...prev,
            [key]: "Invalid alignment selected.",
          }));
        } else {
          dispatch({
            field: "characterDetails",
            type: "UPDATE_CHARACTER_DETAIL_ALIGNMENT",
            payload: { value },
          });
        }
        break;

      case "size":
        if (!SIZE_OPTIONS.includes(value as string)) {
          setErrors((prev: Errors) => ({
            ...prev,
            [key]: "Invalid size selected.",
          }));
        } else {
          dispatch({
            field: "characterDetails",
            type: "UPDATE_CHARACTER_DETAIL_SIZE",
            payload: { value },
          });
        }
        break;

      default:
        // Handle other fields that don't have validation or specific rules
        dispatch({
          field: "characterDetails",
          type: "UPDATE_CHARACTER_DETAIL",
          payload: { key, value },
        });
        break;
    }
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-8 grid-rows-3">
        <div className="row-start-1 col-span-4 input-container-col">
          <input
            type="text"
            name="characterName"
            id="characterName"
            value={inputValues.characterName}
            onChange={(e) => handleChange("characterName", e.target.value)}
          />
          <label className="input-label" htmlFor="characterName">
            character name
          </label>
        </div>
        <div className="row-start-1 col-span-4 input-container-col">
          <input
            type="text"
            name="playerName"
            id="playerName"
            value={inputValues.playerName}
            onChange={(e) => handleChange("playerName", e.target.value)}
          />
          <label className="input-label" htmlFor="playerName">
            player name
          </label>
        </div>
        <div className="row-start-2 col-start-1 col-span-2 input-container-col">
          <input
            type="text"
            name="class"
            id="class"
            value={inputValues.class}
            onChange={(e) => handleChange("class", e.target.value)}
          />
          <label className="input-label" htmlFor="class">class</label>
        </div>
        <div className="row-start-2 col-start-3 col-span-2 input-container-col">
          <input
            type="text"
            name="race"
            id="race"
            value={inputValues.race}
            className={errors.race ? "border-red-500" : ""}
            onChange={(e) => handleChange("race", e.target.value)}
          />
          <label className="input-label" htmlFor="race">race</label>
          {errors.race && <p className="text-red-500 text-xs">{errors.race}</p>}
        </div>
        <div className="row-start-2 col-start-5 col-span-2 input-container-col">
          <select
            name="alignment"
            id="alignment"
            value={inputValues.alignment || ""}
            className={errors.alignment ? "border-red-500" : ""}
            onChange={(e) => handleChange("alignment", e.target.value)}
          >
            <option value={""} disabled>Select Alignment</option>
            {ALIGNMENT_OPTIONS.map((alignment) => (
              <option value={alignment} key={alignment}>{alignment}</option>
            ))}
          </select>
          <label className="input-label" htmlFor="alignment">alignment</label>
          {errors.alignment && (
            <p className="text-red-500 text-xs">{errors.alignment}</p>
          )}
        </div>
        <div className="row-start-2 col-start-7 col-span-2 input-container-col">
          <input
            type="text"
            name="deity"
            id="deity"
            value={inputValues.deity}
            onChange={(e) => handleChange("deity", e.target.value)}
          />
          <label className="input-label" htmlFor="deity">deity</label>
        </div>
        <div className="row-start-3 col-start-1 input-container-col">
          <input
            type="number"
            min={1}
            max={20}
            name="level"
            className={errors.level ? "border-red-500" : ""}
            id="level"
            value={inputValues.level}
            onChange={(e) => handleChange("level", e.target.value)}
          />
          <label className="input-label" htmlFor="level">level</label>
          {errors.level && (
            <p className="text-red-500 text-xs">{errors.level}</p>
          )}
        </div>
        <div className="row-start-3 col-start-2 input-container-col">
          <select
            name="size"
            id="size"
            value={inputValues.sizeName || ""}
            onChange={(e) => handleChange("size", e.target.value)}
          >
            <option value={""} disabled>Select size</option>
            {SIZE_OPTIONS.map((size) => (
              <option value={size} key={size}>{size}</option>
            ))}
          </select>
          <label className="input-label" htmlFor="size">size</label>
        </div>
        <div className="row-start-3 col-start-3 input-container-col">
          <input
            type="number"
            name="age"
            id="age"
            value={inputValues.age}
            onChange={(e) => handleChange("age", e.target.value)}
          />
          <label className="input-label" htmlFor="age">age</label>
        </div>
        <div className="row-start-3 col-start-4 input-container-col">
          <input
            type="text"
            name="sex"
            id="sex"
            value={inputValues.sex}
            onChange={(e) => handleChange("sex", e.target.value)}
          />
          <label className="input-label" htmlFor="sex">sex</label>
        </div>
        <div className="row-start-3 col-start-5 input-container-col">
          <input
            type="number"
            name="height"
            id="height"
            value={inputValues.height}
            onChange={(e) => handleChange("height", e.target.value)}
          />
          <label className="input-label" htmlFor="height">height</label>
        </div>
        <div className="row-start-3 col-start-6 input-container-col">
          <input
            type="number"
            name="weight"
            id="weight"
            value={inputValues.weight}
            onChange={(e) => handleChange("weight", e.target.value)}
          />
          <label className="input-label" htmlFor="weight">weight</label>
        </div>
        <div className="row-start-3 col-start-7 input-container-col">
          <input
            type="text"
            name="eyes"
            id="eyes"
            value={inputValues.eyes}
            onChange={(e) => handleChange("eyes", e.target.value)}
          />
          <label className="input-label" htmlFor="eyes">eyes</label>
        </div>
        <div className="row-start-3 col-start-8 input-container-col">
          <input
            type="text"
            name="hair"
            id="hair"
            value={inputValues.hair}
            onChange={(e) => handleChange("hair", e.target.value)}
          />
          <label className="input-label" htmlFor="hair">hair</label>
        </div>
      </div>
    </div>
  );
}

export default CharacterInformation;
