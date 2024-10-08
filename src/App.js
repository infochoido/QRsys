import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
import OrderPage from './pages/order';
import OrderSummary from './pages/orderSummary';
import { RecoilRoot } from 'recoil';
import OrderComplete from './pages/orderComplete';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <div className="App">
          <header>
            <Header />
          </header>
          <section className='relative z-50'>
            <Routes>
              <Route path="/order/:tableId" element={<OrderPage />} />
              <Route path="/order/summary/:tableId" element={<OrderSummary />} />
              <Route path="/order/complete/:tableId" element={<OrderComplete />} />
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
