(function (global) {
    "use strict";

    global.ExamPilot = global.ExamPilot || {};
    global.ExamPilot.subjectBanks = global.ExamPilot.subjectBanks || {};

    const SUBJECT_NAME = "Economics";

    global.ExamPilot.subjectBanks[SUBJECT_NAME] = {
        subject: SUBJECT_NAME,
        questions: [
            {
                exam: "JAMB",
                year: 2021,
                topic: "Basic Economic Concepts",
                q: "The fundamental problem of economics arises primarily from:",
                options: [
                    "Excessive money supply",
                    "Scarcity of resources relative to unlimited wants",
                    "Government taxation",
                    "Inefficient transport systems"
                ],
                correct: 1,
                exp: "Economics exists because human wants are unlimited while productive resources are scarce, forcing choices and opportunity costs."
            },
            {
                exam: "WAEC",
                year: 2022,
                topic: "Demand and Supply",
                q: "A normal good experiences an increase in consumers' income. What is the immediate effect on its demand curve?",
                options: [
                    "Shift to the left",
                    "Shift to the right",
                    "Movement downward along the same curve",
                    "No change at any price"
                ],
                correct: 1,
                exp: "Higher income increases demand for a normal good at every price, shifting the demand curve to the right."
            },
            {
                exam: "JAMB",
                year: 2020,
                topic: "Money and Banking",
                q: "Which of the following is a primary function of money?",
                options: [
                    "Standard of deferred payment",
                    "Medium of exchange",
                    "Basis for credit creation",
                    "Store of prestige"
                ],
                correct: 1,
                exp: "Serving as a medium of exchange (alongside being a unit of account) is a core primary function of money."
            },
            {
                exam: "WAEC",
                year: 2023,
                topic: "Inflation",
                q: "Demand-pull inflation occurs when:",
                options: [
                    "Wages and raw material costs rise sharply",
                    "Aggregate demand exceeds aggregate supply at full employment",
                    "Imports are banned completely",
                    "Interest rates are reduced to zero by banks"
                ],
                correct: 1,
                exp: "Demand-pull inflation happens when total spending ('too much money chasing too few goods') outpaces available output."
            },
            {
                exam: "JAMB",
                year: 2024,
                topic: "National Income",
                q: "Gross Domestic Product (GDP) measures the total money value of final goods and services produced:",
                options: [
                    "By citizens living abroad only",
                    "Within a country's borders in a given period",
                    "Excluding government expenditure",
                    "Only in the agricultural sector"
                ],
                correct: 1,
                exp: "GDP measures output produced geographically within a country over a specific period, regardless of whether the producer is a citizen or foreigner."
            }
        ]
    };
})(window);
