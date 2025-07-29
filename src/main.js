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


function Extraction() {
  recipes.forEach((recipe, index) => {
    const article = BlockRecette(recipe);
    document.body.appendChild(article);
  });
}


function BlockRecette(recipe) {
  let article = document.createElement("article");
  article.classList.add("recette");

  //? Div Haut
  let divHaut = document.createElement("div");
  divHaut.classList.add("recette-haut");

  let img = document.createElement("img");
  img.src = "JSON recipes/" + recipe.image;

  img.alt = recipe.name;

  divHaut.appendChild(img);
  article.appendChild(divHaut);
  //? Fin Div Haut

  //? Div Bas
  let divBas = document.createElement("div");
  divBas.classList.add("recette-bas");

  let titre = document.createElement("h2");
  titre.textContent = recipe.name;

  let dRecette = document.createElement("p");
  dRecette.textContent = "Recette";

  let description = document.createElement("p");
  description.textContent = recipe.description;

  let dIngredients = document.createElement("p");
  dIngredients.textContent = "Ingrédients :";

  let listeIngredients = document.createElement("ul");
  recipe.ingredients.forEach(ing => {
    let li = document.createElement("li");
    let detail = `${ing.ingredient}`;
    if (ing.quantity !== undefined) {
      detail += ` : ${ing.quantity}`;
      if (ing.unit) detail += ` ${ing.unit}`;
    }
    li.textContent = detail;
    listeIngredients.appendChild(li);
  });

  divBas.appendChild(titre);
  divBas.appendChild(dRecette);
  divBas.appendChild(description);
  divBas.appendChild(dIngredients);
  divBas.appendChild(listeIngredients);

  article.appendChild(divBas);
  //? Fin Div Bas

  return article;
}


Filtre();

Extraction();
