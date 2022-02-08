import { refs } from './refs';
const switchFooter = document.querySelector('.footer');

refs.btnSwitch.addEventListener('click', onSwitch);

if(!localStorage.theme )
  localStorage.theme ="light";
  
  if(!localStorage.themeFooter)
  localStorage.themeFooter ="light";
  
document.body.className=localStorage.theme;
switchFooter.className =localStorage.themeFooter;
function onSwitch(){
  document.body.classList.toggle("dark");
  refs.footerSwitch.classList.toggle("dark");
  localStorage.theme=document.body.className || light;
  localStorage.themeFooter=switchFooter.className || light;
}