import React from 'react';
import './App.css';
import AppHeader from "./components/Header/Header";


// function List({items}) {
// // function List(props) {
//     // const { items } = props;
//     // console.log(props)
//
//     return (
//         <ul>
//             {/*<li>{props.items[0]}</li>*/}
//             <li>{items[0]}</li>
//             <li>{items[1]}</li>
//         </ul>
//     )
// }




const List = ({items, children}) => {

    return (
        <ul>
            {items && items.map((item) => <li key={item}>{item}</li>)}
            <div>
                {children}
            </div>
        </ul>
    )
}

const data = ['Мой первый компонент', 'Мой второй компонент'];

function App() {

    const isAuth = false;
    const placeHold = 'Tel here';

  return (
      <>
          <AppHeader />
          <label htmlFor="name">
              <input id="name" placeholder={placeHold} />
          </label>
          {!isAuth ? (
            <List items={data} />
          ): null}

          {!isAuth && <List items={data}>
              <p>Какой-то текст</p>
              <p>Какой-то текст</p>
              <p>Какой-то текст</p>
              <p>Какой-то текст</p>
              <p>Какой-то текст</p>
              <p>Какой-то текст</p>
          </List>}

      </>
  )
}

export default App;
