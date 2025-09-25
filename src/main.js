//! Récupération des éléments du DOM
let BoutonFiltre = document.getElementById("BoutonFiltre");
let dropdown = document.getElementById("dropdown");
let searchFiltre = document.getElementById("searchFiltre");
let activeFilters = [];

//! === FILTRE GÉNÉRIQUE === 
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
    // Boucle for native au lieu de Array.from() et forEach()
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.style.display = item.textContent.toLowerCase().includes(filter) ? "" : "none";
    }
  });
}

//! === BARRE DE RECHERCHE PRINCIPALE === 
function BarreRecherche() {
  const searchInput = document.getElementById("RechercheInput");
  const bouton = document.getElementById("RechercheBtn");

  function filtrer() {
    const filter = searchInput.value.toLowerCase().trim();
    const section = document.getElementById("recetteSection");
    section.innerHTML = "";

    // Filtre les recettes avec boucles natives
    const resultats = [];
    
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      let correspond = false;
      
      // Vérifie le nom
      if (recipe.name.toLowerCase().includes(filter)) {
        correspond = true;
      }
      
      // Vérifie la description
      if (!correspond && recipe.description.toLowerCase().includes(filter)) {
        correspond = true;
      }
      
      // Vérifie les ingrédients avec boucle native
      if (!correspond) {
        for (let j = 0; j < recipe.ingredients.length; j++) {
          if (recipe.ingredients[j].ingredient.toLowerCase().includes(filter)) {
            correspond = true;
            break;
          }
        }
      }
      
      if (correspond) {
        resultats.push(recipe);
      }
    }

    if (resultats.length === 0) {
      section.innerHTML = `<p class="text-gray-600 italic">Aucune recette ne correspond à votre recherche.</p>`;
    } else {
      // Affiche les résultats avec boucle for native
      for (let i = 0; i < resultats.length; i++) {
        BlockRecette(resultats[i]);
      }
    }

    // Maj le nombre
    document.getElementById("NombreRecettes").textContent = `${resultats.length} recettes`;
  }
  // Recherche dynamique quand on tape (seulement si >=3 caractères ou vide)
  searchInput.addEventListener("input", () => {
    if (searchInput.value.length >= 3 || searchInput.value.length === 0) {
      filtrer();
    }
  });
  // Recherche quand on clique sur la loupe
  bouton.addEventListener("click", filtrer);
}


//! === EXTRACTION === 
function Extraction() {
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    BlockRecette(recipe); 
    Filtres(recipe);
    NombreRecettes(recipe);
  }
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

  // Remplit les 3 listes avec boucles for natives
  const ingredientsArray = Array.from(ingredients);
  for (let i = 0; i < ingredientsArray.length; i++) {
    createFilterItem(ingredientsArray[i], ingredientList);
  }
  
  const appareilsArray = Array.from(appareils);
  for (let i = 0; i < appareilsArray.length; i++) {
    createFilterItem(appareilsArray[i], appareilsList);
  }
  
  const ustensilesArray = Array.from(ustensiles);
  for (let i = 0; i < ustensilesArray.length; i++) {
    createFilterItem(ustensilesArray[i], ustensilesList);
  }
}

// === Gestion des tags dans FilterContainer ===
function addFilterTag(text) {
  const filterContainer = document.getElementById("FilterContainer");

  // Vérifie si déjà présent avec boucle for native
  const spans = filterContainer.querySelectorAll("span");
  let dejaPresent = false;
  for (let i = 0; i < spans.length; i++) {
    if (spans[i].textContent === text) {
      dejaPresent = true;
      break;
    }
  }
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
    // Retire aussi du tableau des filtres avec boucle while
    const filtreASupprimer = text.toLowerCase();
    let i = 0;
    while (i < activeFilters.length) {
      if (activeFilters[i] === filtreASupprimer) {
        activeFilters.splice(i, 1);
      } else {
        i++;
      }
    }
    filtrerAvecTags(); // relance le filtrage
  });

  tag.appendChild(span);
  tag.appendChild(btn);
  filterContainer.appendChild(tag);

  // Filtre les recettes après ajout
  filtrerAvecTags();
}

//! === FILTRAGE AVEC TAGS ===
function filtrerAvecTags() {
  const section = document.getElementById("recetteSection");
  section.innerHTML = "";

  // Filtre les recettes avec boucles natives
  const resultats = [];
  
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    let correspondATousLesFiltres = true;
    
    // Vérifie si la recette contient TOUS les filtres actifs avec boucle for
    for (let j = 0; j < activeFilters.length; j++) {
      const filtre = activeFilters[j];
      let correspondAuFiltre = false;
      
      // Vérifie le nom
      if (recipe.name.toLowerCase().includes(filtre)) {
        correspondAuFiltre = true;
      }
      
      // Vérifie la description
      if (!correspondAuFiltre && recipe.description.toLowerCase().includes(filtre)) {
        correspondAuFiltre = true;
      }
      
      // Vérifie les ingrédients avec boucle for
      if (!correspondAuFiltre) {
        for (let k = 0; k < recipe.ingredients.length; k++) {
          if (recipe.ingredients[k].ingredient.toLowerCase().includes(filtre)) {
            correspondAuFiltre = true;
            break;
          }
        }
      }
      
      // Vérifie l'appareil
      if (!correspondAuFiltre && recipe.appliance.toLowerCase().includes(filtre)) {
        correspondAuFiltre = true;
      }
      
      // Vérifie les ustensiles avec boucle for
      if (!correspondAuFiltre) {
        for (let k = 0; k < recipe.ustensils.length; k++) {
          if (recipe.ustensils[k].toLowerCase().includes(filtre)) {
            correspondAuFiltre = true;
            break;
          }
        }
      }
      
      // Si ce filtre ne correspond pas, la recette ne correspond pas
      if (!correspondAuFiltre) {
        correspondATousLesFiltres = false;
        break;
      }
    }
    
    if (correspondATousLesFiltres) {
      resultats.push(recipe);
    }
  }

  if (resultats.length === 0) {
    section.innerHTML = `<p class="text-gray-600 italic">Aucune recette ne correspond aux filtres sélectionnés.</p>`;
  } else {
    // Affiche les recettes trouvées avec boucle for native
    for (let i = 0; i < resultats.length; i++) {
      BlockRecette(resultats[i]);
    }
  }

  // Met à jour le nombre
  document.getElementById("NombreRecettes").textContent = `${resultats.length} recettes`;
}

//! === BLOC RECETTE ===
function BlockRecette(recipe) {
  const section = document.getElementById("recetteSection");

  const article = document.createElement("article");
  article.className = "w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] bg-white rounded-xl overflow-hidden shadow-lg flex flex-col";

  // Image container with time badge
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

  // Content container
  const contentDiv = document.createElement("div");
  contentDiv.className = "p-6 flex flex-col gap-5";

  // Recipe name
  const title = document.createElement("h2");
  title.className = "text-[18px] font-anton leading-[100%] tracking-[0%] font-normal text-gray-900 uppercase";
  title.textContent = recipe.name;

  // RECETTE section
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

  // INGRÉDIENTS section
  const ingredientsSection = document.createElement("div");
  ingredientsSection.className = "space-y-2";

  const ingredientsLabel = document.createElement("h3");
  ingredientsLabel.className = "text-sm font-semibold text-gray-500 uppercase";
  ingredientsLabel.textContent = "INGRÉDIENTS";

  const ingredientsGrid = document.createElement("div");
  ingredientsGrid.className = "grid grid-cols-2 gap-4";

  // Utilise boucle for native pour les ingrédients
  for (let i = 0; i < recipe.ingredients.length; i++) {
    const ing = recipe.ingredients[i];
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
  }

  ingredientsSection.appendChild(ingredientsLabel);
  ingredientsSection.appendChild(ingredientsGrid);

  // Append all sections to content div
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
