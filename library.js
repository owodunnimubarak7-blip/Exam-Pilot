
/* =====================================================
   EXAM PILOT — SHARED STUDY LIBRARY ENGINE
   Version: 2.0
   Root-level files architecture
   All learning materials remain FREE.
===================================================== */

(function () {
  "use strict";

  const CONFIG = {
    catalogue: "catalog.json",
    reader: "reader.html",

    storage: {
      theme: "examPilotTheme",
      favourites: "examPilotFavourites",
      progressPrefix: "examPilotProgress_"
    }
  };

  let catalogue = null;
  let loadingPromise = null;

  /* UTILITIES */

  function normalise(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function getBaseURL() {
    return new URL(".", window.location.href);
  }

  /* CATEGORIES */

  const CATEGORIES = Object.freeze({
    "study-notes": "Study Notes",
    "recommended-texts": "JAMB Recommended Texts",
    "syllabus": "JAMB Syllabus"
  });

  function getCategoryName(category) {
    return CATEGORIES[normalise(category).replace(/\s/g, "-")]
      || category;
  }

  /* CATALOGUE VALIDATION */

  function validateCatalogue(data) {
    if (!data || !Array.isArray(data.materials)) {
      throw new Error("catalog.json must contain a materials array.");
    }

    const ids = new Set();

    data.materials.forEach(material => {
      if (!material.id || !material.title || !material.category) {
        throw new Error("A material is missing its ID, title or category.");
      }

      if (ids.has(String(material.id))) {
        throw new Error("Duplicate material ID: " + material.id);
      }

      ids.add(String(material.id));

      if (!["study-notes", "recommended-texts", "syllabus"].includes(
        normalise(material.category).replace(/\s/g, "-")
      )) {
        throw new Error("Unknown category: " + material.category);
      }
    });

    return data;
  }

  /* LOAD CATALOGUE */

  async function loadCatalogue(forceRefresh = false) {
    if (catalogue && !forceRefresh) return catalogue;
    if (loadingPromise && !forceRefresh) return loadingPromise;

    loadingPromise = (async () => {
      const url = new URL(CONFIG.catalogue, getBaseURL());

      if (forceRefresh) {
        url.searchParams.set("_", Date.now());
      }

      const response = await fetch(url, {
        cache: forceRefresh ? "no-store" : "default"
      });

      if (!response.ok) {
        throw new Error("Catalogue loading failed: HTTP " + response.status);
      }

      catalogue = validateCatalogue(await response.json());

      return catalogue;
    })();

    try {
      return await loadingPromise;
    } catch (error) {
      loadingPromise = null;
      throw error;
    }
  }

  /* MATERIALS */

  function getMaterials(options = {}) {
    if (!catalogue) return [];

    const {
      category = null,
      subject = null,
      search = "",
      includeUnavailable = false
    } = options;

    return catalogue.materials.filter(material => {
      if (!includeUnavailable && material.status === "placeholder") {
        return false;
      }

      if (category &&
          normalise(material.category) !== normalise(category)) {
        return false;
      }

      if (subject &&
          normalise(material.subject) !== normalise(subject)) {
        return false;
      }

      if (search) {
        const searchable = normalise([
          material.title,
          material.subject,
          material.description,
          material.category,
          ...(Array.isArray(material.tags) ? material.tags : [])
        ].join(" "));

        if (!searchable.includes(normalise(search))) return false;
      }

      return true;
    });
  }

  function findMaterial(id) {
    if (!catalogue) return null;

    return catalogue.materials.find(
      item => String(item.id) === String(id)
    ) || null;
  }

  /* SUBJECTS */

  function getSubjects(category = "study-notes") {
    if (!catalogue) return [];

    const subjects = new Map();

    getMaterials({ category }).forEach(material => {
      if (material.subject) {
        subjects.set(normalise(material.subject), material.subject);
      }
    });

    (catalogue.subjects || []).forEach(subject => {
      subjects.set(normalise(subject), subject);
    });

    return [...subjects.values()].sort((a, b) =>
      a.localeCompare(b)
    );
  }

  /* PDF URL */

  function getPDFURL(material) {
    if (!material || !material.file) {
      throw new Error("PDF filename is missing.");
    }

    const filename = String(material.file);

    if (
      !filename.toLowerCase().endsWith(".pdf") ||
      filename.includes("/") ||
      filename.includes("\\") ||
      filename.includes("..")
    ) {
      throw new Error("Invalid PDF filename. Use a root-level PDF.");
    }

    return new URL(encodeURIComponent(filename), getBaseURL()).href;
  }

  /* OPEN READER */

  function openReader(id) {
    const material = findMaterial(id);

    if (!material) throw new Error("Material not found.");

    if (material.status === "placeholder") {
      throw new Error("This material has not been uploaded yet.");
    }

    getPDFURL(material);

    window.location.href =
      CONFIG.reader + "?id=" + encodeURIComponent(material.id);
  }

  /* FAVOURITES */

  function getFavourites() {
    try {
      const result = JSON.parse(
        localStorage.getItem(CONFIG.storage.favourites) || "[]"
      );

      return Array.isArray(result) ? result : [];
    } catch {
      return [];
    }
  }

  function isFavourite(id) {
    return getFavourites().includes(String(id));
  }

  function toggleFavourite(id) {
    id = String(id);

    let favourites = getFavourites();

    favourites = favourites.includes(id)
      ? favourites.filter(item => item !== id)
      : [...favourites, id];

    localStorage.setItem(
      CONFIG.storage.favourites,
      JSON.stringify(favourites)
    );

    return favourites;
  }

  function getFavouriteMaterials() {
    return getFavourites()
      .map(findMaterial)
      .filter(Boolean);
  }

  /* READING PROGRESS */

  function saveProgress(id, page) {
    localStorage.setItem(
      CONFIG.storage.progressPrefix + id,
      String(Math.max(1, Number(page) || 1))
    );
  }

  function getProgress(id) {
    return Number(
      localStorage.getItem(CONFIG.storage.progressPrefix + id)
    ) || 1;
  }

  /* THEME */

  function getTheme() {
    return localStorage.getItem(CONFIG.storage.theme) || "dark";
  }

  function setTheme(theme) {
    if (!["dark", "light"].includes(theme)) return;

    localStorage.setItem(CONFIG.storage.theme, theme);

    document.body.classList.toggle("light", theme === "light");
  }

  /* STATISTICS */

  function getStatistics() {
    const available = getMaterials();

    return {
      total: available.length,
      notes: available.filter(x =>
        normalise(x.category) === "study notes"
      ).length,
      texts: available.filter(x =>
        normalise(x.category) === "recommended texts"
      ).length,
      syllabuses: available.filter(x =>
        normalise(x.category) === "syllabus"
      ).length
    };
  }

  /* PUBLIC API */

  window.ExamPilotLibrary = Object.freeze({
    version: "2.0",
    categories: CATEGORIES,

    loadCatalogue,
    getCatalogue: () => catalogue,

    getMaterials,
    findMaterial,
    getSubjects,
    getCategoryName,

    getPDFURL,
    openReader,

    getFavourites,
    getFavouriteMaterials,
    isFavourite,
    toggleFavourite,

    saveProgress,
    getProgress,

    getTheme,
    setTheme,

    getStatistics,

    normalise,
    escapeHTML
  });

  console.log("Exam Pilot Library Engine v2.0 ready.");

})();
