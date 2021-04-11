import React from 'react';
import Header from './component/header';
import './component/app.css';
import SearchBox from './component/searchbox';
function App() {
  return (
    <div className="App">
      <Header/>
      <SearchBox/>
    </div>
  );
}
export default App;