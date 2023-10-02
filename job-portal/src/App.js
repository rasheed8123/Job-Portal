import logo from './logo.svg';
import './App.css';
import SearchForm from './components/SearchForm';
import FeaturedJobs from './components/FeaturedJobs';
import ForEmployers from './components/ForEmployers';

function App() {
  return (
    <div className="App">
      <div>
      <header>
      <div>
          <img src="https://cdn-icons-png.flaticon.com/512/248/248917.png"
           width="50px" height="50px" alt="menu" ></img>
        </div>
        <div  class="name">
        <h1>Welcome to WaahJobs Portal</h1>
        <p>Find the Perfect Job or Ideal Candidate</p>
        </div>
        <div class="imageDiv">
        <img src="https://img.freepik.com/premium-vector/accoun-vector-icon-with-long-shadow-white-illustration-isolated-blue-round-background-graphic-web-design_549897-771.jpg" 
        width="50px" height="50px" alt="login" />
        </div>
        
      </header>

      <SearchForm />

      <FeaturedJobs />

      <ForEmployers />

      <footer>
        <p>&copy; {new Date().getFullYear()} Job Portal</p>
      </footer>
    </div>
    </div>
  );
}

export default App;
