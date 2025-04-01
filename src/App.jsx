import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ValueList from './pages/ValueList';
import Calculator from './pages/Calculator';
import ItemDetails from './pages/ItemDetails';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ValueList />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/items/:itemName/:id" element={<ItemDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
