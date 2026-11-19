(function (global) {
    "use strict";

    global.ExamPilot = global.ExamPilot || {};
    global.ExamPilot.subjectBanks = global.ExamPilot.subjectBanks || {};

    const SUBJECT_NAME = "English Language";

    global.ExamPilot.subjectBanks[SUBJECT_NAME] = {
        subject: SUBJECT_NAME,
        questions: [
            {
                exam: "JAMB",
                year: 2021,
                topic: "Lexis and Structure",
                q: "Neither the principal nor the teachers ______ present at the assembly this morning.",
                options: [
                    "was",
                    "were",
                    "is",
                    "has been"
                ],
                correct: 1,
                exp: "With 'neither... nor', the verb agrees with the nearer subject ('the teachers', which is plural), so 'were' is correct."
            },
            {
                exam: "WAEC",
                year: 2022,
                topic: "Synonyms and Antonyms",
                q: "Choose the option nearest in meaning to the underlined word: The manager's CANDID opinion helped resolve the dispute.",
                options: [
                    "frank and honest",
                    "secretive",
                    "hesitant",
                    "hostile"
                ],
                correct: 0,
                exp: "'Candid' means frank, open, and honest in expression."
            },
            {
                exam: "JAMB",
                year: 2020,
                topic: "Grammar and Mechanics",
                q: "Hardly had the train departed ______ the heavy rain began.",
                options: [
                    "than",
                    "when",
                    "while",
                    "since"
                ],
                correct: 1,
                exp: "The correlative pair for 'hardly' or 'scarcely' is 'when' (whereas 'no sooner' pairs with 'than')."
            },
            {
                exam: "WAEC",
                year: 2023,
                topic: "Figures of Speech",
                q: "The classroom became a zoo during the teacher's absence. This is an example of:",
                options: [
                    "Simile",
                    "Metaphor",
                    "Personification",
                    "Oxymoron"
                ],
                correct: 1,
                exp: "Calling the classroom 'a zoo' directly equates it to a noisy, chaotic place without using 'like' or 'as'—a metaphor."
            },
            {
                exam: "JAMB",
                year: 2024,
                topic: "Synonyms and Antonyms",
                q: "Choose the word most nearly opposite in meaning to BENEVOLENT.",
                options: [
                    "Generous",
                    "Kind-hearted",
                    "Malevolent",
                    "Charitable"
                ],
                correct: 2,
                exp: "'Benevolent' means well-meaning and kindly; 'malevolent' means wishing harm or evil to others."
            }
        ]
    };
})(window);
