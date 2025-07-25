let BoutonFiltre = document.getElementById("BoutonFiltre");
let dropdown = document.getElementById("dropdown");
let searchFiltre = document.getElementById("searchFiltre");

function Filtre() {
  BoutonFiltre.addEventListener("click", function() {
    dropdown.classList.toggle("hidden");
  });

  searchFiltre.addEventListener("input", function() {
    let filter = searchFiltre.value.toLowerCase();
    let items = dropdown.getElementsByTagName("li");
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (item.textContent.toLowerCase().includes(filter)) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    }
  });
}

Filtre();