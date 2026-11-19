
/* =====================================================
   EXAM PILOT — SHARED STUDY LIBRARY ENGINE
   Version: 1.0
   Purpose: Catalogue, search, favourites and navigation
   All student learning materials remain free.
===================================================== */

(function () {
  "use strict";

  const CONFIG = {
    catalogue: "catalog.json",
    storage: {
      theme: "examPilotTheme",
      favourites: "examPilotFavourites",
      progressPrefix: "examPilotProgress_"
    }
  };

  let catalogue = null;
  let loadingPromise = null;

  /* =====================================
     BASIC UTILITIES
  ===================================== */

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

  /* =====================================
     CATALOGUE VALIDATION
  ===================================== */

  function validateCatalogue(data) {
    if (!data || typeof data !== "object") {
      throw new Error("Invalid catalogue.");
    }

    if (!Array.isArray(data.materials)) {
      throw new Error("Catalogue materials must be an array.");
    }

    const ids = new Set();

    data.materials.forEach(material => {

      if (!material.id || !material.title || !material.category) {
        throw new Error("A catalogue entry is missing required fields.");
      }

      if (ids.has(String(material.id))) {
        throw new Error("Duplicate material ID: " + material.id);
      }

      ids.add(String(material.id));

    });

    return data;
  }

  /* =====================================
     LOAD CATALOGUE
  ===================================== */

  async function loadCatalogue(forceRefresh = false) {

    if (catalogue && !forceRefresh) {
      return catalogue;
    }

    if (loadingPromise && !forceRefresh) {
      return loadingPromise;
    }

    loadingPromise = (async () => {

      const url = new URL(CONFIG.catalogue, getBaseURL());

      if (forceRefresh) {
        url.searchParams.set("_", Date.now());
      }

      const response = await fetch(url, {
        cache: forceRefresh ? "no-store" : "default"
      });

      if (!response.ok) {
        throw new Error(
          "Could not load catalog.json. HTTP " + response.status
        );
      }

      const data = await response.json();

      catalogue = validateCatalogue(data);

      return catalogue;

    })();

    try {
      return await loadingPromise;
    } catch (error) {
      loadingPromise = null;
      throw error;
    }

  }

  /* =====================================
     MATERIAL CATEGORIES
  ===================================== */

  const CATEGORIES = {
    "study-notes": "Study Notes",
    "recommended-texts": "JAMB Recommended Texts",
    "syllabus": "JAMB Syllabus"
  };

  function getCategoryName(category) {
    return CATEGORIES[normalise(category).replace(/\s/g, "-")]
      || category;
  }

  function getMaterials(options = {}) {

    if (!catalogue) return [];

    const {
      category = null,
      subject = null,
      search = "",
      includeUnavailable = false
    } = options;

    return catalogue.materials.filter(material => {

      if (!includeUnavailable &&
          material.status === "placeholder") {
        return false;
      }

      if (category) {
        if (
          normalise(material.category) !== normalise(category)
        ) {
          return false;
        }
      }

      if (subject) {
        if (
          normalise(material.subject) !== normalise(subject)
        ) {
          return false;
        }
      }

      if (search) {

        const searchable = normalise([
          material.title,
          material.subject,
          material.description,
          material.category,
          ...(Array.isArray(material.tags) ? material.tags : [])
        ].join(" "));

        if (!searchable.includes(normalise(search))) {
          return false;
        }

      }

      return true;

    });

  }

  /* =====================================
     GET MATERIAL BY ID
  ===================================== */

  function findMaterial(id) {

    if (!catalogue) return null;

    return catalogue.materials.find(material =>
      String(material.id) === String(id)
    ) || null;

  }

  /* =====================================
     GET SUBJECTS
  ===================================== */

  function getSubjects(category = "study-notes") {

    if (!catalogue) return [];

    const subjects = new Map();

    getMaterials({ category }).forEach(material => {

      if (material.subject) {
        const key = normalise(material.subject);

        if (!subjects.has(key)) {
          subjects.set(key, material.subject);
        }
      }

    });

    if (Array.isArray(catalogue.subjects)) {

      catalogue.subjects.forEach(subject => {

        const key = normalise(subject);

        if (!subjects.has(key)) {
          subjects.set(key, subject);
        }

      });

    }

    return [...subjects.values()].sort((a, b) =>
      a.localeCompare(b)
    );

  }

  /* =====================================
     PDF FILE VALIDATION
  ===================================== */

  function getPDFURL(material) {

    if (!material || !material.file) {
      throw new Error("PDF file is missing.");
    }

    const filename = String(material.file);

    // This version supports root-level PDF files.
    if (
      !filename.toLowerCase().endsWith(".pdf") ||
      filename.includes("/") ||
      filename.includes("\\") ||
      filename.includes("..")
    ) {
      throw new Error("Invalid PDF filename.");
    }

    return new URL(
      encodeURIComponent(filename),
      getBaseURL()
    ).href;

  }

  /* =====================================
     OPEN READER
  ===================================== */

  function openReader(id) {

    const material = findMaterial(id);

    if (!material) {
      throw new Error("Material not found.");
    }

    if (material.status === "placeholder") {
      throw new Error("This material has not been uploaded yet.");
    }

    getPDFURL(material);

    window.location.href =
      "reader.html?id=" + encodeURIComponent(material.id);

  }

  /* =====================================
     FAVOURITES
  ===================================== */

  function getFavourites() {

    try {

      const saved = JSON.parse(
        localStorage.getItem(CONFIG.storage.favourites) || "[]"
      );

      return Array.isArray(saved) ? saved : [];

    } catch {
      return [];
    }

  }

  function isFavourite(id) {
    return getFavourites().includes(String(id));
  }

  function toggleFavourite(id) {

    let favourites = getFavourites();

    id = String(id);

    if (favourites.includes(id)) {
      favourites = favourites.filter(item => item !== id);
    } else {
      favourites.push(id);
    }

    localStorage.setItem(
      CONFIG.storage.favourites,
      JSON.stringify(favourites)
    );

    return favourites;

  }

  function getFavouriteMaterials() {

    const favourites = getFavourites();

    return favourites
      .map(id => findMaterial(id))
      .filter(Boolean);

  }

  /* =====================================
     READING PROGRESS
  ===================================== */

  function saveProgress(id, page) {

    localStorage.setItem(
      CONFIG.storage.progressPrefix + id,
      String(Math.max(1, Number(page) || 1))
    );

  }

  function getProgress(id) {

    return Number(
      localStorage.getItem(
        CONFIG.storage.progressPrefix + id
      )
    ) || 1;

  }

  /* =====================================
     THEME
  ===================================== */

  function getTheme() {

    return localStorage.getItem(CONFIG.storage.theme) || "dark";

  }

  function setTheme(theme) {

    if (!["dark", "light"].includes(theme)) {
      return;
    }

    localStorage.setItem(CONFIG.storage.theme, theme);

    document.body.classList.toggle(
      "light",
      theme === "light"
    );

  }

  /* =====================================
     LIBRARY STATISTICS
  ===================================== */

  function getStatistics() {

    if (!catalogue) {
      return {
        total: 0,
        notes: 0,
        texts: 0,
        syllabuses: 0
      };
    }

    const available = getMaterials();

    return {
      total: available.length,

      notes: available.filter(item =>
        normalise(item.category) === "study notes"
      ).length,

      texts: available.filter(item =>
        normalise(item.category) === "recommended texts"
      ).length,

      syllabuses: available.filter(item =>
        normalise(item.category) === "syllabus"
      ).length
    };

  }

  /* =====================================
     PUBLIC EXAM PILOT API
  ===================================== */

  window.ExamPilotLibrary = Object.freeze({

    version: "1.0",

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

  console.log("Exam Pilot Study Library Engine initialized.");

})();
