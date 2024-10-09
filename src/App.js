// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
import OrderPage from './pages/order';
import OrderSummary from './pages/orderSummary';
import { RecoilRoot } from 'recoil';
import OrderComplete from './pages/orderComplete';
import OrderedList from './pages/orderedList';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <div className="App">
            <section className=" flex flex-col items-center w-full">
            <Routes>
              <Route path="/order/:tableId" element={<><Header /><OrderPage /></>} />
              <Route path="/order/summary/:tableId" element={<><Header /><OrderSummary /></>} />
              <Route path="/order/complete/:tableId" element={<><Header /><OrderComplete /></>} />
              <Route path="/order/ordered/:tableId" element={<><Header /><OrderedList /></>} />
            </Routes>
          </section>
          <footer className='relative z-0'>
            <Footer />
          </footer>
        </div>
      </Router>
    </RecoilRoot>
  );
}

export default App;
