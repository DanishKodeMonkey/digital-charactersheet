
function CharacterInformation() {
    return (
        <div className="container">
            <div className="grid grid-cols-8 grid-rows-3">
                <div className="row-start-1 col-span-4 input-container-col">
                    <input type="text" name="characterName" id="characterName" />
                    <label className="input-label" htmlFor="characterName">character name</label>
                </div>
                <div className="row-start-1 col-span-4 input-container-col">
                    <input type="text" name="playerName" id="playerName" />
                    <label className="input-label" htmlFor="playerName">player name</label>
                </div>
                <div className="row-start-2 col-start-1 col-span-2 input-container-col">
                    <input type="text" name="class" id="class" />
                    <label className="input-label" htmlFor="class">class</label>
                </div>
                <div className="row-start-2 col-start-3 col-span-2 input-container-col">
                    <input type="text" name="race" id="race" />
                    <label className="input-label" htmlFor="race">race</label>
                </div>
                <div className="row-start-2 col-start-5 col-span-2 input-container-col">
                    <input type="text" name="alignment" id="alignment" />
                    <label className="input-label" htmlFor="alignment">alignment</label>
                </div>
                <div className="row-start-2 col-start-7 col-span-2 input-container-col">
                    <input type="text" name="deity" id="deity" />
                    <label className="input-label" htmlFor="deity">deity</label>
                </div>
                <div className="row-start-3 col-start-1 input-container-col">
                    <input type="number" name="level" id="level" />
                    <label className="input-label" htmlFor="level">level</label>
                </div>
                <div className="row-start-3 col-start-2 input-container-col">
                    <input type="text" name="size" id="size" />
                    <label className="input-label" htmlFor="size">size</label>
                </div>
                <div className="row-start-3 col-start-3 input-container-col">
                    <input type="number" name="age" id="age" />
                    <label className="input-label" htmlFor="age">age</label>
                </div>
                <div className="row-start-3 col-start-4 input-container-col">
                    <input type="number" name="sex" id="sex" />
                    <label className="input-label" htmlFor="sex">sex</label>
                </div>
                <div className="row-start-3 col-start-5 input-container-col">
                    <input type="number" name="height" id="height" />
                    <label className="input-label" htmlFor="height">height</label>
                </div>
                <div className="row-start-3 col-start-6 input-container-col">
                    <input type="number" name="weight" id="weight" />
                    <label className="input-label" htmlFor="weight">weight</label>
                </div>
                <div className="row-start-3 col-start-7 input-container-col">
                    <input type="number" name="eyes" id="eyes" />
                    <label className="input-label" htmlFor="eyes">eyes</label>
                </div>
                <div className="row-start-3 col-start-8 input-container-col">
                    <input type="number" name="hair" id="hair" />
                    <label className="input-label" htmlFor="hair">hair</label>
                </div>
            </div>
        </div>
    );
  }
  
  export default CharacterInformation;
  