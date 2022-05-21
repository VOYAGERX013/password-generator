import './App.css';
import { useState } from "react";
import { passwordStrength } from "check-password-strength";

function App() {

    const [rangeValue, setRangeValue] = useState(10);
    const [uppercase, setUppercase] = useState(true);
    const [lowercase, setLowercase] = useState(true);
    const [number, setNumber] = useState(true);
    const [symbol, setSymbol] = useState(true);
    const [statePassword, setStatePassword] = useState("");
    const [copyState, setCopyState] = useState(false);

    const getPassword = () => {
        const uppercases = uppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
        const lowercases = lowercase ? "abcdefghijklmnopqrstuvwxyz" : "";
        const numbers = number ? "0123456789" : "";
        const symbols = symbol ? "!@#$%^&*()_+/<>" : "";

        const allowedSymbols = uppercases + lowercases + numbers + symbols;
        console.log(allowedSymbols.length);
        console.log(allowedSymbols);

        let password = "";

        for (let i=0; i < rangeValue; i++){
            password += allowedSymbols[Math.floor((allowedSymbols.length - 1) * Math.random())];
        }

        setStatePassword(password);
    }

    const copyPassword = () => {
        navigator.clipboard.writeText(statePassword);
        setCopyState(true);
    }

    const passwordRating = {
        width: statePassword !== "" ? (`${(70 / 4) * (passwordStrength(statePassword).id + 1)}vw`) : "0",
        background: statePassword !== "" ? ((passwordStrength(statePassword).id === 0 || passwordStrength(statePassword).id === 1) ? "#D0312D" : (passwordStrength(statePassword).id === (2) ? "#FFBA01" : "#3d8c40")) : "rgb(192, 192, 192)"
    }

    return (
        <div className="container my-4">
            <h1 className="password-heading">Password generator</h1>

            <div className="password-holder">
                <input type="text" onChange={(e) => setStatePassword(e.target.value)} value={statePassword} className="password-input" />
                <div className="password-rating">
                    <div style={passwordRating} className="inner-password-rating"></div>
                </div>

                <button onClick={copyPassword} className="inline-btn btn btn-primary">{copyState ? "Copied" : "Copy"}</button>
                
                <div className="configurations">
                    <input onChange={(e) => setUppercase(e.target.checked)} type="checkbox" id="uppercase" className="label" checked={uppercase} />
                    <label htmlFor="uppercase">Uppercase</label>
                    <input onChange={(e) => setLowercase(e.target.checked)} type="checkbox" id="lowercase" className="label" checked={lowercase} />
                    <label htmlFor="lowercase">Lowercase</label>
                    <input onChange={(e) => setNumber(e.target.checked)} type="checkbox" id="number" className="label" checked={number} />
                    <label htmlFor="number">Numbers</label>
                    <input onChange={(e) => setSymbol(e.target.checked)} type="checkbox" id="symbol" className="label" checked={symbol} />
                    <label htmlFor="symbol">Symbols</label>
                </div>

                <div className="password-length">
                    <label htmlFor="range" className="block-label">Password length</label>
                    <input onChange={(e) => e.target.value >= 1 && e.target.value <= 50 && setRangeValue(e.target.value)} type="number" className="password-length-input" value={rangeValue} />
                    <input type="range" onChange={(e) => setRangeValue(e.target.value)} id="range" min="1" value={rangeValue} max="50" />
                </div>

                <button className="btn btn-primary" onClick={getPassword}>Get password</button>
            </div>
        </div>
    );
}

export default App;