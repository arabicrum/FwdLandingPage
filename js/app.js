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
  thenav.innerHTML = `<ul id="navbar__list"></ul>`;
    let navhtml = "";
    

    for(section of sectionContainer) {
      
      let sectionnamenav = section.id; 
      let nav = document.createElement('li');
      navhtml  = `<a class = "menu__link" id = "${sectionnamenav}-link" href="#${sectionnamenav}">${sectionnamenav}</a>`;

      nav.innerHTML = navhtml;
       
       thenav.appendChild(nav);
    };
    
      
     //this attaches the html to the nav inner html  
    
    
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

// Add class 'active' to section when near top of viewport

const activeclass = ()=>{
  //
  let sectionid = '';
   for(section of sectionContainer){
    const sectionheight = section.clientHieght;
    const sectionoffsettop = section.offsetTop;
    const sectionoffsetbot = section.getBoundingClientRect().bottom;
    console.log(sectionoffsetbot);

    //idk why but subtracting 100 here realy made everything work 
   if(  window.scrollY > sectionoffsettop *(92/100) && 0 <  sectionoffsetbot)
   {
    section.classList.add('your-active-class');
   
    sectionid = section.getAttribute('id') + '-link';
   }
   else
   {
    section.classList.remove('your-active-class');
   }
   }
   const links = document.querySelectorAll('.menu__link');
    
   for (link of links) {
    if(link.getAttribute('id') == sectionid)
    {
      link.classList.add('navbar-chosen');
    }
    else {
      link.classList.remove('navbar-chosen');
    }
   }
};


// Scroll to anchor ID using scrollTO event

const linkaction = ()=>{
   let links = document.querySelectorAll('.menu__link');

   links.forEach(link =>
    {
       link.addEventListener("click", (e)=>
          {
           
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
  { let newsection = document.createElement('section');
  let sectiondata =text.value;
  let sectioncount = sectionContainer.length + 1;
  let sectionid = "section" + sectioncount;
  let sectionname = "Section " + sectioncount; 
  let sectionhtml = ` 
    <div class="landing__container">
      <h2>${sectionname}</h2>
      <p>${sectiondata}</p>
    </div>`;
  newsection.setAttribute('id' , sectionid);
  newsection.setAttribute('data-nav' , sectionname);
  newsection.innerHTML = sectionhtml;
  document.querySelector('main').appendChild(newsection);
  sectionContainer = document.querySelectorAll('section');
  text.value = "";
  popup.style.display ="none";
  navbar();
  linkaction();
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

window.addEventListener('scroll' , activeclass);
//show popup 
popupfunc();
submit.addEventListener('click',sectionsdata);


