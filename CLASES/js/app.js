const url = new URL(window.location.href);
const tema = url.searchParams.get('tema');
const header = document.getElementById("header");
if(tema == '0'){
    header.style.backgroundColor = "#009fff";   //feliz
}
if(tema == '1'){
    header.style.backgroundColor = "#ff006a";    //triste
}
if(tema == '2'){
    header.style.backgroundColor = "#ff9500";    //enojado
}

//elemento.classList.add("clase1", "clase2"); // Añade varias clases
//elemento.classList.remove("clase1"); // Elimina una clase
 
