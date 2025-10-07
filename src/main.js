//!DOM
let BoutonFiltre = document.getElementById("BoutonFiltre");
let dropdown = document.getElementById("dropdown");
let searchFiltre = document.getElementById("searchFiltre");
let activeFilters = [];

//! === FILTRE GÉNÉRIQUE
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
    const items = Array.from(list.getElementsByTagName("li"));
    items.forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(filter) ? "" : "none";
    });
  });
}

//! === BARRE DE RECHERCHE PRINCIPALE
function BarreRecherche() {
  const searchInput = document.getElementById("RechercheInput");
  const bouton = document.getElementById("RechercheBtn");

  function filtrer() {
    const filter = searchInput.value.toLowerCase().trim();
    const section = document.getElementById("recetteSection");
    section.innerHTML = "";

    // Filtre les recettes avec méthodes Array
    const resultats = recipes.filter(recipe => {
      const criteres = [
        recipe.name.toLowerCase().includes(filter),
        recipe.description.toLowerCase().includes(filter),
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(filter))
      ];
      return criteres.some(critere => critere);
    });

    if (resultats.length === 0) {
      section.innerHTML = `<p class="text-gray-600 italic">Aucune recette ne correspond à votre recherche.</p>`;
    } else {
      resultats.forEach(recette => BlockRecette(recette));
    }

    // Maj le nombre
    document.getElementById("NombreRecettes").textContent = `${resultats.length} recettes`;
  }

  searchInput.addEventListener("input", () => {
    if (searchInput.value.length >= 3 || searchInput.value.length === 0) {
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

//! === NOMBRE DE RECETTES ===
function NombreRecettes() {
  const nombre = recipes.length;
  const element = document.getElementById("NombreRecettes");
  element.textContent = `${nombre} recettes`;
}

//! === FILTRES ===
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

  // Parcourt toutes les recettes
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    // Ajoute chaque ingrédient
    for (let j = 0; j < recipe.ingredients.length; j++) {
      ingredients.add(recipe.ingredients[j].ingredient);
    }

    // Ajoute l’appareil
    appareils.add(recipe.appliance);

    // Ajoute chaque ustensile
    for (let k = 0; k < recipe.ustensils.length; k++) {
      ustensiles.add(recipe.ustensils[k]);
    }
  }

  // Fonction utilitaire : créer un <li> et gérer le clic
  function createFilterItem(text, listElement) {
    const li = document.createElement("li");
    li.textContent = text;
    li.className = "px-4 py-2 hover:bg-gray-100 cursor-pointer";

    // clique → ajoute un tag
    li.addEventListener("click", () => {
      addFilterTag(text);
    });

    listElement.appendChild(li);
  }

  // Remplit les 3 listes avec forEach
  Array.from(ingredients).forEach(ingredient => createFilterItem(ingredient, ingredientList));
  Array.from(appareils).forEach(appareil => createFilterItem(appareil, appareilsList));
  Array.from(ustensiles).forEach(ustensile => createFilterItem(ustensile, ustensilesList));
}

// === Gestion des tags dans FilterContainer ===
function addFilterTag(text) {
  const filterContainer = document.getElementById("FilterContainer");

  const dejaPresent = Array.from(filterContainer.querySelectorAll("span"))
    .some(span => span.textContent === text);
  if (dejaPresent) return;

  // Ajoute dans les filtres actifs
  activeFilters.push(text.toLowerCase());

  // Crée le tag visuel
  const tag = document.createElement("div");
  tag.className = "inline-flex items-center bg-yellow-200 text-black px-2 py-1 rounded-full mr-2 mb-2";

  const span = document.createElement("span");
  span.textContent = text;

  const btn = document.createElement("button");
  btn.textContent = "×";
  btn.className = "ml-2 text-red-500 font-bold";

  // Supprime le tag quand on clique sur ×
  btn.addEventListener("click", () => {
    tag.remove();
    activeFilters = activeFilters.filter(f => f !== text.toLowerCase());
    filtrerAvecTags(); 
  });

  tag.appendChild(span);
  tag.appendChild(btn);
  filterContainer.appendChild(tag);

  // Filtre les recettes après ajout
  filtrerAvecTags();
}

//! === FILTRAGE AVEC TAGS
function filtrerAvecTags() {
  const section = document.getElementById("recetteSection");
  section.innerHTML = "";

  //? Filtre les recettes avec méthodes Array
  const resultats = recipes.filter(recipe => {
    return activeFilters.every(filtre => {
      const criteres = [
        recipe.name.toLowerCase().includes(filtre),
        recipe.description.toLowerCase().includes(filtre),
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(filtre)),
        recipe.appliance.toLowerCase().includes(filtre),
        recipe.ustensils.some(ustensile => ustensile.toLowerCase().includes(filtre))
      ];
      return criteres.some(critere => critere);
    });
  });

  if (resultats.length === 0) {
    section.innerHTML = `<p class="text-gray-600 italic">Aucune recette ne correspond aux filtres sélectionnés.</p>`;
  } else {
    // Affiche recettes trouvées avec forEach
    resultats.forEach(recette => BlockRecette(recette));
  }

  document.getElementById("NombreRecettes").textContent = `${resultats.length} recettes`;
}

//! === BLOC RECETTE ===
function BlockRecette(recipe) {
  const section = document.getElementById("recetteSection");

  const article = document.createElement("article");
  article.className = "w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] bg-white rounded-xl overflow-hidden shadow-lg flex flex-col";

  //?IMG
  const topDiv = document.createElement("div");
  topDiv.className = "relative h-48";

  const img = document.createElement("img");
  img.src = "JSON recipes/" + recipe.image;
  img.alt = recipe.name;
  img.className = "w-full h-full object-cover";

  const badge = document.createElement("div");
  badge.textContent = recipe.time + "min";
  badge.className = "absolute top-4 right-4 bg-yellow-400 text-black font-medium px-3 py-1 rounded-full";

  topDiv.appendChild(img);
  topDiv.appendChild(badge);
  article.appendChild(topDiv);

  
  const contentDiv = document.createElement("div");
  contentDiv.className = "p-6 flex flex-col gap-5";

  //?Nom recettes
  const title = document.createElement("h2");
  title.className = "text-[18px] font-anton leading-[100%] tracking-[0%] font-normal text-gray-900 uppercase";
  title.textContent = recipe.name;

  //?section recette
  const recetteSection = document.createElement("div");
  recetteSection.className = "space-y-2";
  
  const recetteLabel = document.createElement("h3");
  recetteLabel.className = "text-sm font-semibold text-gray-500 uppercase";
  recetteLabel.textContent = "RECETTE";

  const description = document.createElement("p");
  description.className = "text-sm text-gray-600 line-clamp-4";
  description.textContent = recipe.description;

  recetteSection.appendChild(recetteLabel);
  recetteSection.appendChild(description);

  //?section ingrédients
  const ingredientsSection = document.createElement("div");
  ingredientsSection.className = "space-y-2";

  const ingredientsLabel = document.createElement("h3");
  ingredientsLabel.className = "text-sm font-semibold text-gray-500 uppercase";
  ingredientsLabel.textContent = "INGRÉDIENTS";

  const ingredientsGrid = document.createElement("div");
  ingredientsGrid.className = "grid grid-cols-2 gap-4";

  //?forEach pour les ingrédients
  recipe.ingredients.forEach(ing => {
    const ingredientItem = document.createElement("div");
    ingredientItem.className = "space-y-1";

    const ingName = document.createElement("div");
    ingName.className = "text-sm font-medium text-gray-900";
    ingName.textContent = ing.ingredient;

    const ingQuantity = document.createElement("div");
    ingQuantity.className = "text-sm text-gray-500";
    let quantity = "";
    if (ing.quantity !== undefined) quantity += ing.quantity;
    if (ing.unit) quantity += " " + ing.unit;
    ingQuantity.textContent = quantity;

    ingredientItem.appendChild(ingName);
    ingredientItem.appendChild(ingQuantity);
    ingredientsGrid.appendChild(ingredientItem);
  });

  ingredientsSection.appendChild(ingredientsLabel);
  ingredientsSection.appendChild(ingredientsGrid);

  contentDiv.appendChild(title);
  contentDiv.appendChild(recetteSection);
  contentDiv.appendChild(ingredientsSection);

  article.appendChild(contentDiv);
  section.appendChild(article);
}


//! === INITIALISATION ===
FiltreGenerique("BoutonFiltreIngredients", "dropdownIngredients", "searchFiltreIngredients", "ingredientList");
FiltreGenerique("BoutonFiltreAppareils", "dropdownAppareils", "searchFiltreAppareils", "appareilsList");
FiltreGenerique("BoutonFiltreUstensiles", "dropdownUstensiles", "searchFiltreUstensiles", "ustensilesList");
Filtres();
BarreRecherche();
Extraction();