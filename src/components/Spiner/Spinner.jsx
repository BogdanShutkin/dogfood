import React from "react";
import s from "./Spiner.module.css";


const Spinner = () => {
    return (
        <div className={s.wrapperLoader}>
            <span className={s.loader}></span>
        </div>
    );
};

export default Spinner;