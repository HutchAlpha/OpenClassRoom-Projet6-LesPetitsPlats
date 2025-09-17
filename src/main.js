// Récupération des éléments du DOM
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
      if (item.textContent.toLowerCase().includes(filter)) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    }
  });
}

// === BARRE DE RECHERCHE PRINCIPALE ===
function BarreRecherche() {
  // ⚠️ Assure-toi d’avoir ajouté ces id dans index.html :
  // <input id="RechercheInput" ... >
  // <button id="RechercheBtn" ... >
  const searchInput = document.getElementById("RechercheInput");
  const bouton = document.getElementById("RechercheBtn");

  function filtrer() {
    const filter = searchInput.value.toLowerCase().trim();
    const section = document.getElementById("recetteSection");
    section.innerHTML = "";

    let resultats = [];

    // === Boucles classiques ===
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];

      let dansNom = recipe.name.toLowerCase().includes(filter);
      let dansDescription = recipe.description.toLowerCase().includes(filter);

      let dansIngredients = false;
      for (let j = 0; j < recipe.ingredients.length; j++) {
        if (recipe.ingredients[j].ingredient.toLowerCase().includes(filter)) {
          dansIngredients = true;
          break;
        }
      }

      if (dansNom || dansDescription || dansIngredients) {
        resultats.push(recipe);
      }
    }

    // Affiche les résultats
    for (let i = 0; i < resultats.length; i++) {
      BlockRecette(resultats[i]);
    }

    // Met à jour le nombre
    document.getElementById("NombreRecettes").textContent = `${resultats.length} recettes`;
  }

  // Recherche dynamique
  searchInput.addEventListener("input", () => {
    if (searchInput.value.length >= 1 || searchInput.value.length === 0) {
      filtrer();
    }
  });

  // Recherche quand on clique
  bouton.addEventListener("click", filtrer);
}

// === EXTRACTION INITIALE ===
function Extraction() {
  for (let i = 0; i < recipes.length; i++) {
    BlockRecette(recipes[i]);
  }
  Filtres();
  NombreRecettes();
}

// === NOMBRE DE RECETTES ===
function NombreRecettes() {
  const nombre = recipes.length;
  const element = document.getElementById("NombreRecettes");
  element.textContent = `${nombre} recettes`;
}

// === FILTRES ===
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

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    for (let j = 0; j < recipe.ingredients.length; j++) {
      ingredients.add(recipe.ingredients[j].ingredient);
    }

    appareils.add(recipe.appliance);

    for (let k = 0; k < recipe.ustensils.length; k++) {
      ustensiles.add(recipe.ustensils[k]);
    }
  }

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

// === BLOC RECETTE ===
function BlockRecette(recipe) {
  const section = document.getElementById("recetteSection");

  const article = document.createElement("article");
  article.className = "sm:w-1/2 lg:[width:30%] bg-white rounded-2xl overflow-hidden shadow-md flex flex-col";

  // Image + Badge
  const topDiv = document.createElement("div");
  topDiv.className = "relative";

  const img = document.createElement("img");
  img.src = "JSON recipes/" + recipe.image;
  img.alt = recipe.name;
  img.className = "w-full h-48 object-cover";

  const badge = document.createElement("div");
  badge.textContent = recipe.time + "mn";
  badge.className = "absolute top-2 right-2 bg-yellow-300 text-xs text-black font-medium px-2 py-0.5 rounded-full";

  topDiv.appendChild(img);
  topDiv.appendChild(badge);
  article.appendChild(topDiv);

  // Contenu bas
  const bottomDiv = document.createElement("div");
  bottomDiv.className = "p-5 flex flex-col gap-4";

  const title = document.createElement("h2");
  title.className = "text-lg font-semibold text-black font-bold uppercase";
  title.textContent = recipe.name;

  const recipeLabel = document.createElement("p");
  recipeLabel.className = "text-xs uppercase font-semibold text-gray-400 tracking-wide";
  recipeLabel.textContent = "Recette";

  const description = document.createElement("p");
  description.className = "text-sm text-gray-800 leading-relaxed";
  description.textContent = recipe.description;

  const ingLabel = document.createElement("p");
  ingLabel.className = "text-xs uppercase font-semibold text-gray-400 tracking-wide";
  ingLabel.textContent = "Ingrédients";

  const ingGrid = document.createElement("div");
  ingGrid.className = "grid grid-cols-2 gap-x-4 gap-y-2 text-sm";

  for (let i = 0; i < recipe.ingredients.length; i++) {
    const ing = recipe.ingredients[i];

    const col1 = document.createElement("div");
    col1.textContent = ing.ingredient;

    const col2 = document.createElement("div");
    let quantity = "";
    if (ing.quantity !== undefined) quantity += ing.quantity;
    if (ing.unit) quantity += " " + ing.unit;
    col2.textContent = quantity;

    ingGrid.appendChild(col1);
    ingGrid.appendChild(col2);
  }

  bottomDiv.appendChild(title);
  bottomDiv.appendChild(recipeLabel);
  bottomDiv.appendChild(description);
  bottomDiv.appendChild(ingLabel);
  bottomDiv.appendChild(ingGrid);

  article.appendChild(bottomDiv);
  section.appendChild(article);
}

// === INITIALISATION ===
FiltreGenerique("BoutonFiltreIngredients", "dropdownIngredients", "searchFiltreIngredients", "ingredientList");
FiltreGenerique("BoutonFiltreAppareils", "dropdownAppareils", "searchFiltreAppareils", "appareilsList");
FiltreGenerique("BoutonFiltreUstensiles", "dropdownUstensiles", "searchFiltreUstensiles", "ustensilesList");
BarreRecherche();
Extraction();
