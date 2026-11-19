(function (global) {
    "use strict";

    global.ExamPilot = global.ExamPilot || {};
    global.ExamPilot.subjectBanks = global.ExamPilot.subjectBanks || {};

    const SUBJECT_NAME = "Chemistry";

    global.ExamPilot.subjectBanks[SUBJECT_NAME] = {
        subject: SUBJECT_NAME,
        questions: [
            {
                exam: "JAMB",
                year: 2021,
                topic: "Atomic Structure",
                q: "Isotopes of the same element have the same number of protons but differ in their number of:",
                options: [
                    "Electrons in a neutral atom",
                    "Neutrons",
                    "Valence shells",
                    "Chemical properties"
                ],
                correct: 1,
                exp: "Isotopes share the same atomic number (protons) but have different mass numbers due to different numbers of neutrons."
            },
            {
                exam: "WAEC",
                year: 2022,
                topic: "Chemical Bonding",
                q: "Which type of bond is formed by the transfer of valence electrons from a metal atom to a non-metal atom?",
                options: [
                    "Covalent bond",
                    "Ionic (electrovalent) bond",
                    "Metallic bond",
                    "Hydrogen bond"
                ],
                correct: 1,
                exp: "Ionic bonding results from electrostatic attraction between oppositely charged ions formed by electron transfer."
            },
            {
                exam: "JAMB",
                year: 2020,
                topic: "Acids, Bases and Salts",
                q: "A solution with a pH of 3 is:",
                options: [
                    "Strongly alkaline",
                    "Neutral",
                    "Acidic",
                    "A concentrated base"
                ],
                correct: 2,
                exp: "On the pH scale (0–14), values below 7 indicate acidity, 7 is neutral, and values above 7 are alkaline."
            },
            {
                exam: "WAEC",
                year: 2023,
                topic: "Organic Chemistry",
                q: "What is the general molecular formula for members of the alkane homologous series?",
                options: [
                    "CnH2n",
                    "CnH2n+2",
                    "CnH2n-2",
                    "CnH2n+1OH"
                ],
                correct: 1,
                exp: "Alkanes are saturated hydrocarbons with single covalent bonds and the general formula CnH2n+2."
            },
            {
                exam: "JAMB",
                year: 2024,
                topic: "Electrolysis",
                q: "During electrolysis, cations migrate towards the:",
                options: [
                    "Anode",
                    "Cathode",
                    "Salt bridge",
                    "Electrolyte surface"
                ],
                correct: 1,
                exp: "Cations are positively charged ions, so they are attracted to the negatively charged electrode, the cathode."
            }
        ]
    };
})(window);
