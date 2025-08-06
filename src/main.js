let BoutonFiltre = document.getElementById("BoutonFiltre");
let dropdown = document.getElementById("dropdown");
let searchFiltre = document.getElementById("searchFiltre");

function FiltreGenerique(buttonId, dropdownId, inputId, listId) {
  const bouton = document.getElementById(buttonId);
  const dropdown = document.getElementById(dropdownId);
  const searchInput = document.getElementById(inputId);
  const list = document.getElementById(listId);

  bouton.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
  });

  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    const items = list.getElementsByTagName("li");
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.style.display = item.textContent.toLowerCase().includes(filter) ? "" : "none";
    }
  });
}

// Appel des 3 filtres
FiltreGenerique("BoutonFiltreIngredients", "dropdownIngredients", "searchFiltreIngredients", "ingredientList");
FiltreGenerique("BoutonFiltreAppareils", "dropdownAppareils", "searchFiltreAppareils", "appareilsList");
FiltreGenerique("BoutonFiltreUstensiles", "dropdownUstensiles", "searchFiltreUstensiles", "ustensilesList");


function Extraction() {
recipes.forEach(recipe => {
  BlockRecette(recipe); 
  Filtres(recipe);
});

}

function Filtres(){
  const ingredientList = document.getElementById("ingredientList");
  const appareilsList = document.getElementById("appareilsList");
  const ustensilesList = document.getElementById("ustensilesList");

  const ingredients = new Set();
  const appareils = new Set();
  const ustensiles = new Set();

  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ing => ingredients.add(ing.ingredient));
    appareils.add(recipe.appliance);
    recipe.ustensils.forEach(ust => ustensiles.add(ust));
  });

  ingredients.forEach(ing => {
    const li = document.createElement("li");
    li.textContent = ing;
    ingredientList.appendChild(li);
  });

  appareils.forEach(app => {
    const li = document.createElement("li");
    li.textContent = app;
    appareilsList.appendChild(li);
  });

  ustensiles.forEach(ust => {
    const li = document.createElement("li");
    li.textContent = ust;
    ustensilesList.appendChild(li);
  });

}

function BlockRecette(recipe) {
  const section = document.getElementById("recetteSection");

  const article = document.createElement("article");
  article.className =
    " sm:w-1/2 lg:[width:30%] bg-white rounded-2xl overflow-hidden shadow-md flex flex-col";

  //? === Image en haut + Badge durée
  const topDiv = document.createElement("div");
  topDiv.className = "relative";

  const img = document.createElement("img");
  img.src = "JSON recipes/" + recipe.image;
  img.alt = recipe.name;
  img.className = "w-full h-48 object-cover";

  const badge = document.createElement("div");
  badge.textContent = recipe.time + "mn";
  badge.className =
    "absolute top-2 right-2 bg-yellow-300 text-xs text-black font-medium px-2 py-0.5 rounded-full";

  topDiv.appendChild(img);
  topDiv.appendChild(badge);
  article.appendChild(topDiv);

  //? === Texte et contenu bas
  const bottomDiv = document.createElement("div");
  bottomDiv.className = "p-5 flex flex-col gap-4";

  // Titre de la recette
  const title = document.createElement("h2");
  title.className = "text-lg font-semibold text-black";
  title.textContent = recipe.name;

  // Bloc RECETTE
  const recipeLabel = document.createElement("p");
  recipeLabel.className = "text-xs uppercase font-semibold text-gray-400 tracking-wide";
  recipeLabel.textContent = "Recette";

  const description = document.createElement("p");
  description.className = "text-sm text-gray-800 leading-relaxed";
  description.textContent = recipe.description;

  // Bloc INGRÉDIENTS
  const ingLabel = document.createElement("p");
  ingLabel.className = "text-xs uppercase font-semibold text-gray-400 tracking-wide";
  ingLabel.textContent = "Ingrédients";

  const ingGrid = document.createElement("div");
  ingGrid.className = "grid grid-cols-2 text-sm text-gray-800 gap-y-1";

  recipe.ingredients.forEach(ing => {
    const col1 = document.createElement("div");
    col1.textContent = ing.ingredient;

    const col2 = document.createElement("div");
    let quantity = "";
    if (ing.quantity !== undefined) quantity += ing.quantity;
    if (ing.unit) quantity += " " + ing.unit;
    col2.textContent = quantity;

    ingGrid.appendChild(col1);
    ingGrid.appendChild(col2);
  });

  bottomDiv.appendChild(title);
  bottomDiv.appendChild(recipeLabel);
  bottomDiv.appendChild(description);
  bottomDiv.appendChild(ingLabel);
  bottomDiv.appendChild(ingGrid);

  article.appendChild(bottomDiv);
  section.appendChild(article);
}


Extraction();
