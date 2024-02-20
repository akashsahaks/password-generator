import { useState, useCallback, useEffect, useRef } from "react";

function App() {
   const [length, setLength] = useState(8);
   const [numberAllowed, setNumberAllowed] = useState(false);
   const [characterAllowed, setCharacterAllowed] = useState(false);
   const [password, setPassword] = useState("");

   //  useRef hook
   const passwordRef = useRef(null);

   //generating password
   const passwordGenerator = useCallback(() => {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      if (numberAllowed) str += "0123456789";
      if (characterAllowed) str += "!@#$&-+=";

      for (let i = 1; i <= length; i++) {
         let char = Math.floor(Math.random() * str.length + 1);
         pass += str.charAt(char);
      }
      setPassword(pass);
   }, [length, numberAllowed, characterAllowed, setPassword]);

   //copyPasswordToClipboard

   const copyPasswordToClipboard = () => {
      passwordRef.current?.select();
      // passwordRef.current?.setSelectionRange(0, 50);
      window.navigator.clipboard.writeText(password);
   };

   useEffect(() => {
      passwordGenerator();
   }, [length, characterAllowed, numberAllowed, passwordGenerator]);

   return (
      <>
         <div className="bg-black w-full h-screen pt-16">
            <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-4 text-orange-500 bg-gray-700">
               <h1 className="text-4xl text-center text-white px-3 py-3 font-bold">
                  Password Generator
               </h1>
               <div className="flex shadow rounded-lg overflow-hidden mb-4">
                  <input
                     type="text"
                     value={password}
                     className="outline-none rounded-l w-full py-1 px-3"
                     placeholder="Password"
                     readOnly={true}
                     ref={passwordRef}
                  />
                  <button
                     className="outline-none rounded-r bg-blue-700 text-white px-3 py-0.5 shrink-0"
                     onClick={copyPasswordToClipboard}
                  >
                     Copy
                  </button>
               </div>
               <div className="flex text-sm gap-x-2">
                  <div className="flex items-center gap-x-1">
                     <input
                        type="range"
                        min={6}
                        max={30}
                        value={length}
                        onChange={(event) => {
                           setLength(event.target.value);
                        }}
                        id="rangeInput"
                        className="cursor-pointer outline-none"
                     />
                     <label htmlFor="rangeInput">Length: {length}</label>
                  </div>
                  <div className="flex items-center gap-x-1 px-2">
                     <input
                        type="checkbox"
                        defaultChecked={numberAllowed}
                        id="numberInput"
                        onChange={() => {
                           setNumberAllowed((prev) => !prev);
                        }}
                        className="cursor-pointer outline-none"
                     />
                     <label htmlFor="numberInput">Numbers</label>
                  </div>
                  <div className="flex items-center gap-x-1">
                     <input
                        type="checkbox"
                        defaultChecked={characterAllowed}
                        id="charactersInput"
                        onChange={() => {
                           setCharacterAllowed((prev) => !prev);
                        }}
                        className="cursor-pointer outline-none"
                     />
                     <label htmlFor="charactersInput">Characters</label>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default App;
