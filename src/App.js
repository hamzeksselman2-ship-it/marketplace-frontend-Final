import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Terms from './pages/Terms';
import AuthPage from './pages/AuthPage';
import SignupPage from './pages/SignupPage';
import AddProductPage from './pages/AddProductPage'; // አዲሱ ገጽ

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: '1', padding: '20px' }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={AboutUs} />
            <Route path="/terms" component={Terms} />
            <Route path="/login" component={AuthPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/add-product" component={AddProductPage} /> 
            <Redirect to="/" />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
