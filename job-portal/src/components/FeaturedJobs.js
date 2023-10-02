// src/components/FeaturedJobs.js
import jobdata from './MOCK_DATA.json';
import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ForEmployers from './ForEmployers';

function FeaturedJobs() {
const [jobsArray,setJobsArray] = useState(jobdata)
const [openModal, setOpenModal] = useState(false)
const [openModalEmployer, setOpenModalEmployer] = useState(false)
const [keywords,setkeywords] = useState("")
const [location,setlocation] = useState("")
const [backup,setBackup] = useState(jobdata)
const [empSubmit,setempSubmit] = useState({})

  const handleFormData = (event) =>{
       const a = event.target.name
       const b = event.target.value
       setempSubmit({
        ...empSubmit,
        [a] : b
       })
  } 

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleOpenModalEmployer = () => {
    setOpenModalEmployer(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleCloseModalEmployerForm = (event) => {
    if (!empSubmit["Company name"] || !empSubmit["Hiring"] || !empSubmit["Designation"]|| !empSubmit["No of position"] || !empSubmit["email"] || !empSubmit["salary"] ){
      alert("fill all the details")
      return
    }
    else{
      const arrayform = [...jobsArray,empSubmit]
      setJobsArray([...arrayform])
      setempSubmit({})
      setOpenModalEmployer(false);
    }    
  };
  const handleCloseModalEmployer = (event) => {   
      setOpenModalEmployer(false);
    }    

  const handleKeywords = (event) => {
    setkeywords(event.target.value);
  };
  const handlelocation = (event) => {
    setlocation(event.target.value);
  };
  const handlesearch = (event)=>{
    event.preventDefault()
      if(keywords === "" && location=== ""){
        return
      }
      if(keywords === "" && location!== ""){
           sortSearch("location")
      }
      if(keywords !== "" && location=== ""){
           sortSearch("keywords")
      }
      if(keywords !== "" && location !==""){
          sortSearch("both")
      }
  }
  // SEARCH FUNCTONALITY
  const sortSearch = (a)=>{
    
      if(a==="location"){

        const found = jobsArray.filter((element) => element["Hiring"].toLowerCase() === location.toLocaleLowerCase())
        if(found){
          setJobsArray(found)  
        }
        else{
          setJobsArray([]) 
        }
         
      }
      else if(a==="keywords"){
        const found1 = jobsArray.filter((element) => element["Designation"].toLowerCase() === keywords.toLowerCase())
        if(found1){
          setJobsArray(found1)  
        }
        else{
          setJobsArray([]) 
        }
      }
      else if(a==="both"){
        const found2 = jobsArray.filter((element) => element["Designation"].toLowerCase() === keywords.toLowerCase() && element["Hiring"].toLowerCase() === location.toLowerCase())
        if(found2){
          setJobsArray(found2)  
        }
        else{
          setJobsArray([]) 
        }
      }
      else{
        setJobsArray([...backup])
      }
  }

  // SORTING FUNCTION 
  const filterarray =(event)=>{  
    if(event.target.value === "high"){
      
      const changed1 = jobsArray.sort((a,b)=>b.salary-a.salary);
      setJobsArray([...changed1])
    }
    if(event.target.value === "vacancy"){
      const changed2 = jobsArray.sort((a,b)=>b["No of position"]-a["No of position"])
      setJobsArray([...changed2])
    }
      
  }

  return (
    <section className="featured-jobs">
      <section className="search-section">
      <h2>Search for Jobs</h2>
      <form id="job-search-form">
        <input type="text" id="keywords" placeholder="Designation" onChange={handleKeywords}/>
        <input type="text" id="location" placeholder="country" onChange={handlelocation}/>
        <button onClick={handlesearch}>Search</button>
      </form>
    </section>
      <div >
        <h2>Featured Jobs</h2>
        
      </div>
      <div class="sortingDiv">
        <div><label class="sorting"><b>SORT:</b></label>
        <select onChange={filterarray}>
        <option>--------SELECT--------</option>  
        <option value="high">hign_Paying</option>
        <option value="vacancy">High_Vacancies</option>
        </select></div>
       
        <div>
        <div className="emp">
      <h2>Employer ? <Button
                  size="small"
                  color="success"
                  variant="contained"
                  onClick={handleOpenModalEmployer} // Open the modal when this button is clicked
                >
                    Post a Job
                  </Button></h2>
      <p>Post your job openings and find the best candidates.</p>
      
      </div>
        </div>
      </div>
      
      
      <div class="maincontent">
        
          {jobsArray.map((job)=>(
            <div key={job['email']}>
                <Card sx={{ minWidth: 345 }}>
                <CardActionArea>
                  <CardContent>
                  
                    <Typography gutterBottom variant="h5" component="div">
                     COMPANY NAME: {job['Company name']}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Designation :{job.Designation}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Location :{job['Hiring']}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      EMAIL :{job.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      No of Vacany :{job['No of position']}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Salary :{job.salary}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={handleOpenModal} // Open the modal when this button is clicked
                >
                    Apply
                  </Button>
                </CardActions>
              </Card>
              </div>
          ))}
                
        </div>
        <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Apply for Job</DialogTitle>
        <DialogContent>
          {/* Add the content for your application form or any additional details */}
          <p>Upload your updted Resume</p>
          <input type="file" id="myFile" name="filename"></input>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseModal} color="primary" variant="contained">
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openModalEmployer} onClose={handleCloseModalEmployer}>
        <DialogTitle>Add a Job</DialogTitle>
        <DialogContent>
          {/* Add the content for your application form or any additional details */}
          <table>
          <tr>
          <td><label for="companyname">companyname</label></td>
          <td><input type="text" id="companynameEmp" name="Company name" onChange={handleFormData}></input></td>
        </tr>
        <tr>
          <td><label for="post">Designation</label></td>
          <td><input type="text" id="postEmp" name="Designation" onChange={handleFormData}></input></td>
        </tr>
        <tr>
          <td><label for="countryname">Location</label></td>
          <td><input type="text" id="countrynameEmp" name="Hiring" onChange={handleFormData}></input></td>
        </tr>
        <tr>
          <td><label for="yourEmail">Email address</label></td>
          <td><input type="text" id="yourEmailEmp" name="email" onChange={handleFormData}></input></td>
        </tr>
        <tr>
          <td><label for="vacancy">No of vacancies</label></td>
          <td><input type="text" id="vacancyEmp" name="No of position" onChange={handleFormData}></input></td>
        </tr>
        <tr>
          <td><label for="pay">Salary per annum</label></td>
          <td><input type="number" id="pay" name="salary" onChange={handleFormData}></input></td>
        </tr>
      </table>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalEmployer} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseModalEmployerForm} color="primary" variant="contained">
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>
      
      
    </section>
  );
}

export default FeaturedJobs;
