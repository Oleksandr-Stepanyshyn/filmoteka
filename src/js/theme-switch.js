import { refs } from './refs';

refs.btnSwitch.addEventListener('click', onSwitch)

function onSwitch(){
  document.body.classList.toggle("dark");
  refs.footerSwitch.classList.toggle("dark")
}
