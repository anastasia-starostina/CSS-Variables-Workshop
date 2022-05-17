// create a function.
// choose id of Dark-mode-button
// create if-else statement that toggles between root and dark mode
// toggle the class on and off of the body of the webpage
// call the function  

let toggle = document.querySelector ("#dark-mode-button");

toggle.addEventListener('click', darkMode);

function darkMode () {
   let element = document.body;
   element.classList.toggle("dark-mode-theme");

}

 