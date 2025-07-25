let BoutonFiltre = document.getElementById("BoutonFiltre");
let dropdown = document.getElementById("dropdown");

BoutonFiltre.addEventListener("click", function() {
  dropdown.classList.toggle("hidden");
});