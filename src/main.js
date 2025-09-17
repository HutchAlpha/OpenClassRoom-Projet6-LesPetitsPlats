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


function BarreRecherche() {
  const searchInput = document.getElementById("RechercheInput");
  const bouton = document.getElementById("RechercheBtn");

  function filtrer() {
    const filter = searchInput.value.toLowerCase().trim();
    const section = document.getElementById("recetteSection");
    section.innerHTML = "";

    // Filtre les recettes
    const resultats = recipes.filter(recipe => {
      const dansNom = recipe.name.toLowerCase().includes(filter);
      const dansDescription = recipe.description.toLowerCase().includes(filter);
      const dansIngredients = recipe.ingredients.some(i => i.ingredient.toLowerCase().includes(filter));
      return dansNom || dansDescription || dansIngredients;
    });

    resultats.forEach(r => BlockRecette(r));

    // Maj le nombre
    document.getElementById("NombreRecettes").textContent = `${resultats.length} recettes`;
  }
  // Recherche dynamique quand on tape
  searchInput.addEventListener("input", () => {
    if (searchInput.value.length >= 1 || searchInput.value.length === 0) {
      filtrer();
    }
  });
  // Recherche quand on clique sur la loupe
  bouton.addEventListener("click", filtrer);
}



function Extraction() {
recipes.forEach(recipe => {
  BlockRecette(recipe); 
  Filtres(recipe);
  NombreRecettes(recipe);
});

}

function NombreRecettes() {
  const nombre = recipes.length;
  const element = document.getElementById("NombreRecettes");
  element.textContent = `${nombre} recettes`;
}


function Filtres() {
  const ingredientList = document.getElementById("ingredientList");
  const appareilsList = document.getElementById("appareilsList");
  const ustensilesList = document.getElementById("ustensilesList");

  ingredientList.innerHTML = "";
  appareilsList.innerHTML = "";
  ustensilesList.innerHTML = "";

  const ingredients = new Set();
  const appareils = new Set();
  const ustensiles = new Set();

  recipes.forEach(recipe => {
    recipe.ingredients.forEach(i => ingredients.add(i.ingredient));
    appareils.add(recipe.appliance);
    recipe.ustensils.forEach(u => ustensiles.add(u));
  });

  ingredients.forEach(i => {
    const li = document.createElement("li");
    li.textContent = i;
    li.className = "px-4 py-2 hover:bg-gray-100 cursor-pointer";
    ingredientList.appendChild(li);
  });

  appareils.forEach(a => {
    const li = document.createElement("li");
    li.textContent = a;
    li.className = "px-4 py-2 hover:bg-gray-100 cursor-pointer";
    appareilsList.appendChild(li);
  });

  ustensiles.forEach(u => {
    const li = document.createElement("li");
    li.textContent = u;
    li.className = "px-4 py-2 hover:bg-gray-100 cursor-pointer";
    ustensilesList.appendChild(li);
  });
}


function BlockRecette(recipe) {
  const section = document.getElementById("recetteSection");

  const article = document.createElement("article");
  article.className = " sm:w-1/2 lg:[width:30%] bg-white rounded-2xl overflow-hidden shadow-md flex flex-col";

  //? === Image en haut + Badge durée
  const topDiv = document.createElement("div");
  topDiv.className = "relative";

  const img = document.createElement("img");
  img.src = "JSON recipes/" + recipe.image;
  img.alt = recipe.name;
  img.className = "w-full h-48 object-cover ";

  const badge = document.createElement("div");
  badge.textContent = recipe.time + "mn";
  badge.className = "absolute top-2 right-2 bg-yellow-300 text-xs text-black font-medium px-2 py-0.5 rounded-full";

  topDiv.appendChild(img);
  topDiv.appendChild(badge);
  article.appendChild(topDiv);

  //? === Texte et contenu bas
  const bottomDiv = document.createElement("div");
  bottomDiv.className = "p-5 flex flex-col gap-4";

  //! Titre de la recette
  const title = document.createElement("h2");
  title.className = "text-lg font-semibold text-black font-bold uppercase";
  title.textContent = recipe.name;

  //!Bloc RECETTE
  const recipeLabel = document.createElement("p");
  recipeLabel.className = "text-xs uppercase font-semibold text-gray-400 tracking-wide";
  recipeLabel.textContent = "Recette";

  const description = document.createElement("p");
  description.className = "text-sm text-gray-800 leading-relaxed";
  description.textContent = recipe.description;

  //!Bloc INGRÉDIENTS
  const ingLabel = document.createElement("p");
  ingLabel.className = "text-xs uppercase font-semibold text-gray-400 tracking-wide";
  ingLabel.textContent = "Ingrédients";

  const ingGrid = document.createElement("div");
  ingGrid.className = "grid grid-cols-2 gap-x-4 gap-y-2 text-sm";

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

FiltreGenerique("BoutonFiltreIngredients", "dropdownIngredients", "searchFiltreIngredients", "ingredientList");
FiltreGenerique("BoutonFiltreAppareils", "dropdownAppareils", "searchFiltreAppareils", "appareilsList");
FiltreGenerique("BoutonFiltreUstensiles", "dropdownUstensiles", "searchFiltreUstensiles", "ustensilesList");
BarreRecherche();
Extraction();
