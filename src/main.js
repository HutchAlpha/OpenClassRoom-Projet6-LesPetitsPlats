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
    console.log(`🍽️ Recette #${index + 1}`);
    console.log(`📸 Image       : ${recipe.image}`);
    console.log(`📛 Nom         : ${recipe.name}`);
    console.log(`👥 Portions    : ${recipe.servings}`);
    console.log(`⏱️ Temps       : ${recipe.time} min`);
    console.log(`🧑‍🍳 Appareil   : ${recipe.appliance}`);
    console.log(`🧰 Ustensiles  : ${recipe.ustensils.join(', ')}`);

    console.log(`🧂 Ingrédients :`);
    recipe.ingredients.forEach(ingredient => {
      let detail = `${ingredient.ingredient}`;
      if (ingredient.quantity !== undefined) {
        detail += ` : ${ingredient.quantity}`;
        if (ingredient.unit) detail += ` ${ingredient.unit}`;
      }
      console.log(`   - ${detail}`);
    });

    console.log(`\n📜 Description :\n${recipe.description}`);
    console.log(`\n-----------------------------\n`);
  });
}

function BlockRecette() {
  let article = document.getElementById("Artrecette");
  article.classList.add("");

  //?Div Haut
  let divHaut = document.createElement("div");
  divHaut.classList.add("");

  let img = document.createElement("img");
  img.src = "";

  divHaut.appendChild(img);
  article.appendChild(divHaut);
  //?Fin Div Haut

  //?Div Bas
  let divBas = document.createElement("div");
  divBas.classList.add("");

  let TitreArticle = document.createElement("h2");
  TitreArticle.textContent = "";

  //!Présentation Recettes
  let DRecette = document.createElement("p");
  DRecette.textContent = "Recette";

  let DescriptionRecette = document.createElement("p");
  DescriptionRecette.textContent = "";


  let DIngredients = document.createElement("p");
  DIngredients.textContent = "INGREDIENTS ";

  let ListeIngredients = document.createElement("ul");
  for (i = 0; i < ingredients.length; i++) {
    let li = document.createElement("li");
    li.textContent = ingredients[i];
    ListeIngredients.appendChild(li);
  }

  divBas.appendChild(TitreArticle);
  divBas.appendChild(DRecette);
  divBas.appendChild(DescriptionRecette);
  divBas.appendChild(DIngredients);
  divBas.appendChild(ListeIngredients);
  //!Fin Présentation Recettes

  article.appendChild(divBas);
  //?Fin Div Bas
  return article;
}

Filtre();

Extraction();

BlockRecette();