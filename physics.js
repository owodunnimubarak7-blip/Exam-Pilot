(function (global) {
    "use strict";

    global.ExamPilot = global.ExamPilot || {};
    global.ExamPilot.subjectBanks = global.ExamPilot.subjectBanks || {};

    const SUBJECT_NAME = "Physics";

    global.ExamPilot.subjectBanks[SUBJECT_NAME] = {
        subject: SUBJECT_NAME,
        questions: [
            {
                exam: "JAMB",
                year: 2021,
                topic: "Measurements",
                q: "Which of the following is a derived physical quantity?",
                options: [
                    "Length",
                    "Mass",
                    "Velocity",
                    "Time"
                ],
                correct: 2,
                exp: "Velocity (displacement divided by time) is derived from fundamental quantities, whereas length, mass, and time are fundamental."
            },
            {
                exam: "WAEC",
                year: 2022,
                topic: "Force and Equilibrium",
                q: "According to Newton's second law of motion, the acceleration of a body is directly proportional to:",
                options: [
                    "Its mass",
                    "The net force acting on it",
                    "Its velocity squared",
                    "The frictional force alone"
                ],
                correct: 1,
                exp: "Newton's second law states that F = ma, so acceleration increases directly with net applied force for a constant mass."
            },
            {
                exam: "JAMB",
                year: 2020,
                topic: "Waves",
                q: "Which wave phenomenon proves that light waves are transverse rather than longitudinal?",
                options: [
                    "Reflection",
                    "Refraction",
                    "Polarisation",
                    "Diffraction"
                ],
                correct: 2,
                exp: "Only transverse waves can be polarised because their oscillations occur perpendicular to the direction of wave travel."
            },
            {
                exam: "WAEC",
                year: 2023,
                topic: "Electricity",
                q: "A resistor of 6 Ω carries a current of 2 A. What is the potential difference across it?",
                options: [
                    "3 V",
                    "8 V",
                    "12 V",
                    "0.33 V"
                ],
                correct: 2,
                exp: "By Ohm's law, V = I × R = 2 A × 6 Ω = 12 V."
            },
            {
                exam: "JAMB",
                year: 2024,
                topic: "Work, Energy and Power",
                q: "The SI unit of power is the:",
                options: [
                    "Joule",
                    "Watt",
                    "Newton",
                    "Pascal"
                ],
                correct: 1,
                exp: "Power is the rate of doing work (P = W/t) and is measured in watts (1 W = 1 J/s)."
            }
        ]
    };
})(window);
