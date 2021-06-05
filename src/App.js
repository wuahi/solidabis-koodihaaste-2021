import './App.css';

import {Panel} from './components/panel/panel';

function App() {
  const Cars = [
    {letter: 'A', fuelConsupmtionInLitersPer100km: 3},
    {letter: 'B', fuelConsupmtionInLitersPer100km: 3.5},
    {letter: 'C', fuelConsupmtionInLitersPer100km: 4}
  ];

  return (
    <div className="App">
      {Cars.map((car, index) => (
        <Panel
          letter={car.letter}
          fuelconsumption={car.fuelConsupmtionInLitersPer100km}
          key={index}
          id={`panel-${index}`}
        ></Panel>
      ))}
    </div>
  );
}

export default App;
