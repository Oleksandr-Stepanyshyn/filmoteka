import { refs } from './refs';


refs.switchBtn.addEventListener('click', onSwitch)


if(!localStorage.theme )
  localStorage.theme ="light";
  
  if(!localStorage.themeFooter)
  localStorage.themeFooter ="light";

  if(!localStorage.icon )
  localStorage.icon ="day";
  
document.body.className=localStorage.theme;
refs.switchFooter.className =localStorage.themeFooter;
function onSwitch(){
  document.body.classList.toggle("dark");
  refs.switchFooter.classList.toggle("dark-footer");
  refs.day.classList.toggle('is-hidden');
  refs.night.classList.toggle('is-hidden')
  refs.switchMain.classList.toggle('main-shadow');
  refs.paginationBtn.classList.toggle('pagination-switcn');
  localStorage.theme=document.body.className;
  localStorage.themeFooter=refs.switchFooter.className || light;
  localStorage.icon=refs.day.className || day;
}