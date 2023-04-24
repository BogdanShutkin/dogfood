// import './index.css';
// import {ReactComponent as SearchIcon } from './ic-search.svg';
// import {ReactComponent as CloseIcon } from './ic-close-input.svg';

// export const Search = ({setValue}) => {
//     // const handleInput = (e) => {
//     //     onInput (e.target.value);
//     // }

//     return 
//         <input placeholder='Поиск' className='search__input' type="text" onChange={(e)=>setValue(e.target.value)} />
//         }

// import './index.css';

// export const Search  = ({setValue}) => {
//     return <input
//     placeholder='Search...'
//     className='search__input'
//     onChange={(e)=>setValue(e.target.value)}
//     />
// }

import './index.css';
import {ReactComponent as SearchIcon} from "./ic-search.svg";
import {ReactComponent as CloseIcon} from "./ic-close-input.svg";

function Search({onSubmit: propsOnSubmit, onInput}) {
    const handleInput = (e) => {
        onInput(e.target.value);
    }
    return (
        <form className='search' onSubmit={propsOnSubmit}>
            <input type='text' className='search__input' placeholder='Поиск' onInput={handleInput}/>
            <button className='search__btn'>
                <SearchIcon />
                {false && <CloseIcon/>}
            </button>
        </form>
    )
}

export default Search;