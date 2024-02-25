import React, {useState} from 'react';
import s from './App.module.css';
import {Kindergarten} from "./Kindergarten/Kindergarten";
import {Credit} from "./Credit/Credit";
import {
    Routes,
    Route,
} from "react-router-dom"
import {Rent} from "./Rent/Rent";
import {Homework} from "./Homework/Homework";
import {Header} from "./Header/Header";
import {Primary} from "./Primary/Primary";


function App() {


    return (
        <div className={s.app}>
            <Header/>
            <Routes>
                <Route path={"/"} element={<Primary/>}/>
                <Route path={"/kindergarten"} element={<Kindergarten/>}/>
                <Route path={"/rent"} element={<Rent/>}/>
                <Route path={"/credit"} element={<Credit/>}/>
                <Route path={"/homework"} element={<Homework/>}/>
            </Routes>
        </div>
    );
}

export default App;
