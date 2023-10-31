import { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/searchbox.component';
import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [title, setTitle] = useState('');
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => setMonsters(users))
  }, [])

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) =>{
      return monster.name.toLocaleLowerCase().includes(searchField);
   });

   setFilteredMonsters(newFilteredMonsters);

   console.log('effect is fired...')
  }, [monsters, searchField])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString)
  }

  const onTitleChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setTitle(searchFieldString)
  }

  return (
    <div className="App">
      <h1 className='app-title'>{title}</h1>

      <SearchBox 
        className= 'monsters-search-box' 
        onChangeHandler={onSearchChange} 
        placeholder='search monsters'
        />

        <br/>

        <SearchBox 
        className= 'title-search-box' 
        onChangeHandler={onTitleChange} 
        placeholder='set title'
        />

      <CardList monsters={filteredMonsters} />
    </div>
  )
}

// class App extends Component {
//   constructor(){
//     super()

//     this.state = {
//       monsters: [],
//       searchField: ''
//     };
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(res => res.json())
//       .then(users => this.setState( 
//         () => {
//           return {monsters: users}
//         }, 
//       ));
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLowerCase();

//     this.setState(() =>{
//       return {searchField}
//     });
//   }

//   render(){

//     const { monsters, searchField } = this.state

//     const { onSearchChange } = this

//     const filteredMonsters = monsters.filter((monster) =>{
//       return monster.name.toLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">

//         <h1 className='app-title'>Monsters Rolodex</h1>

//         <SearchBox 
//           onChangeHandler={onSearchChange} 
//           className= 'monsters-search-box' 
//           placeholder='search monsters'
//           />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }

// }

export default App;
