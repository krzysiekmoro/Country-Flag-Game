import React from 'react';
import StyledButton from './StyledButton';
import './Choises.css';

const Choises = ({options, handleSubmit, handleChange}) => {
    const inputs = options.map((opt, index) => (
        <label key={opt.id}>
            <input type="checkbox" value={opt.name} onChange={handleChange}></input>
            {opt.name}
        </label>
    ));

    return(
        <form className="flag-form" onSubmit={handleSubmit}>
            {inputs}
            <StyledButton text="GUESS" type="submit" />
        </form>
    )
}

export default Choises;