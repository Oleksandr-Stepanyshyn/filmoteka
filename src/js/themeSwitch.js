import { refs } from './refs';


refs.switchBtn.addEventListener('click', onSwitch)


if(!localStorage.theme )
  localStorage.theme ="light";
  
  if(!localStorage.themeFooter)
  localStorage.themeFooter ="light";

  
document.body.className=localStorage.theme;
refs.switchFooter.className =localStorage.themeFooter;

function onSwitch(){
  document.body.classList.toggle("dark");
  refs.switchFooter.classList.toggle("dark-footer");
  refs.day.classList.toggle('is-hidden');
  refs.night.classList.toggle('is-hidden')
  refs.switchHeader.classList.toggle('shadow-header');
  refs.switchFooter.classList.toggle('shadow-footer');
  refs.paginationBtn.classList.toggle('pagination-switcn');
  refs.iconFooter.classList.toggle('icon-footer');
  refs.paginationBtnPrev.style.color='#ffffff';
  refs.paginationBtnNext.style.color='#ffffff';
  refs.paginationBtnPrev.style.backgroundColor='#ff6b08';
  refs.paginationBtnNext.style.backgroundColor='#ff6b08';
  refs.iconFooter.style.fill='#f7f7f7';
  localStorage.theme=document.body.className || light;
  localStorage.themeFooter=refs.switchFooter.className || light;
}
