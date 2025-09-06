// Reutilizable: alterna visibilidad de contraseña + icono (ojo / ojo tachado)
function attachPasswordToggle(inputEl, btnEl){
const icon = btnEl.querySelector('i');
btnEl.addEventListener('click', ()=>{
const show = inputEl.type === 'password';
inputEl.type = show ? 'text' : 'password';
btnEl.setAttribute('aria-pressed', show);
icon.classList.toggle('fa-eye', !show);
icon.classList.toggle('fa-eye-slash', show);
inputEl.focus();
});
}


// Login
const form = document.getElementById('formLogin');
const usuario = document.getElementById('usuario');
const pass = document.getElementById('pass');
attachPasswordToggle(pass, document.getElementById('toggleLogin'));


form.addEventListener('submit', (e)=>{
  e.preventDefault();
  if (!usuario.value.trim() || !pass.value.trim()){
    form.classList.add('shake');
    setTimeout(()=> form.classList.remove('shake'), 350);
    return;
  }
  window.location.href = '/principal.html'; 
});


// Modal registro
const modal = document.getElementById('modal');
const btnRegistrar = document.getElementById('btnRegistrar');
const closeModal = document.getElementById('closeModal');


const regName = document.getElementById('regName');
const regEmail = document.getElementById('regEmail');
const regPass = document.getElementById('regPass');
const toggleReg = document.getElementById('toggleReg');
const progressReg = document.getElementById('progressReg');
const progressRegLabel = document.getElementById('progressRegLabel');


attachPasswordToggle(regPass, toggleReg);


btnRegistrar.addEventListener('click', ()=>{
modal.classList.remove('hidden');
// reset modal
regName.value = regEmail.value = regPass.value = '';
progressReg.style.width = '0%';
progressReg.className = 'h-full w-0 rounded-full bg-rose-500';
progressRegLabel.textContent = 'Introduce una contraseña';
const icon = toggleReg.querySelector('i');
icon.classList.add('fa-eye');
icon.classList.remove('fa-eye-slash');
toggleReg.setAttribute('aria-pressed','false');
});


closeModal.addEventListener('click', ()=> modal.classList.add('hidden'));
modal.addEventListener('click', (e)=>{ if(e.target===modal) modal.classList.add('hidden') });


// Fuerza de contraseña en registro
regPass.addEventListener('input', ()=>{
const v = regPass.value;
if(!v){
progressReg.style.width = '0%';
progressReg.className = 'h-full w-0 rounded-full bg-rose-500';
progressRegLabel.textContent = 'Introduce una contraseña';
return;
}
let s = 0; // 0..5
if(v.length>=8) s++; if(/[A-Z]/.test(v)) s++; if(/[a-z]/.test(v)) s++; if(/\d/.test(v)) s++; if(/[^\w]/.test(v)) s++;
progressReg.style.width = ['25%','40%','60%','80%','100%'][Math.max(0,s-1)];
progressReg.className = 'h-full rounded-full ' + (s<=2 ? 'bg-rose-500' : s===3 ? 'bg-amber-500' : 'bg-emerald-600');
progressRegLabel.textContent = s<=2 ? 'Contraseña débil' : s===3 ? 'Contraseña media' : 'Contraseña fuerte';
});