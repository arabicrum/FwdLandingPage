/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let sectiondata = document.getElementById('text').value;
let  thenav = document.querySelector('.navbar__menu');
let up = document.querySelector('#progress');
let  dynamicnav = document.getElementById('navbar__list');
let  sectionContainer = document.querySelectorAll('section');
let  scroll = window.scrollY;
let popupbtn = document.getElementById('popupbtn');
let popup = document.querySelector('.popup-fade');
let closebtn = document.querySelector('.close');
let submit = document.getElementById('submit');
let main = document.getElementsByName('main');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const navbar  = () => {

    let nav = "";

    sectionContainer.forEach(section => {
        const ID = section.id;
        const data = section.dataset.nav;
        
        nav += `<li><a class = "menu__link" id = "${ID}-link" href="#${ID}">${data}</a></li>`;

              
    });
   
     //this attaches the html to the nav inner html  
    dynamicnav.innerHTML = nav;
}





//making nav invisible at scroll

window.addEventListener('scroll', () => {
  if(scroll < window.scrollY)
  {
    dynamicnav.classList.add('nav-scrolling');
     thenav.classList.add('nav-scrolling');
     
  }
  else{
    dynamicnav.classList.remove('nav-scrolling');
    thenav.classList.remove('nav-scrolling');
  }
   scroll = window.scrollY;
});





//make up btn go to side when not scrolled at threshhold
window.onscroll = () => {
   
  if(this.scrollY > 1000){

    up.classList.add('progress-active')
  }
  else
  {
    up.classList.remove('progress-active')
    
  }

} ;

//scrolls to top

up.onclick = () =>
{
 window.scrollTo (
  {top : 0 ,behavior: "smooth"})
};





//getting the offset for activating the section 
const offset = (section) =>
{
  return Math.floor(section.getBoundingClientRect().top);

};




// Add class 'active' to section when near top of viewport
const addActive = (activeSection,section)=> {
if (activeSection){
    section.classList.add('your-active-class');
}
};
const removeActive = (section) => {
    section.classList.remove('your-active-class');
};

const sectionactive = () => {

sectionContainer.forEach( section => {
 const sectionoffset = offset(section);
 
  isactive = ()=> sectionoffset < 500 && sectionoffset >= -500;
  removeActive(section);
  addActive(isactive(),section);

});
};




// Scroll to anchor ID using scrollTO event

const linkaction = ()=>{
   let links = document.querySelectorAll('.menu__link ');

   links.forEach(link =>
    {
       link.addEventListener("click", (e)=>
          {
           links.forEach(link =>
            {
              link.classList.remove('navbar-chosen');
            }
            );
           link.classList.add('navbar-chosen');
           e.preventDefault();
           document.querySelector(link.getAttribute('href')).scrollIntoView({
              top : 0 ,behavior: "smooth"
            });      
          }
       )
       
      });
  };






  //making a new section and populating it with content
   
  //first the popup functions
const popupfunc = () =>{
 popupbtn.addEventListener('click' , ()=>
 {
   popup.style.display ="flex";
   closefunc();
 });
};

//close button on popup functionality

const closefunc = () =>{
  closebtn.addEventListener('click' , ()=>
  {
    popup.style.display ="none";
  });
 };


 //creating the sections
 const sectionsdata = ()=>
  {  console.log(text.value);
  let sectiondata =text.value;
  let sectioncount = sectionContainer.length + 1;
  let sectionname = "Section " + sectioncount; 
  let sectionhtml = ` <section id="${sectionname}" data-nav="${sectionname}">
    <div class="landing__container">
      <h2>${sectionname}</h2>
      <p>${sectiondata}</p>
    </div>
  </section>`;
  document.querySelector('main').innerHTML+=sectionhtml;
  sectionContainer = document.querySelectorAll('section');
  navbar();
 };



/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
navbar();
// Scroll to section on link click
linkaction ();
// Set sections as active
window.addEventListener('scroll',sectionactive);

//show popup 
popupfunc();
submit.addEventListener('click',sectionsdata);


