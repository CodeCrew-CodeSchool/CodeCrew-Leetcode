import { GameRoom, SubmissionLanguage } from "../src/models"

const sampleGameState: GameRoom = {
    id: "1234",
    users: [
        {
            username: "playerOne",
            id: "user123"
        },
        {
            username: "playerTwo",
            id: "user124"
        }
    ],
    challenges: [
        {
            id: "challenge1",
            numberOfTestCases: 2,
            userSubmissions: [
                {
                    userId: "user123",
                    testCasesPassed: [
                        "tc1",
                        "tc2"
                    ],
                    submissionCode: "function add(a, b) { return a + b; }",
                    submissionLanguage: SubmissionLanguage.JavaScript
                },
                {
                    userId: "user124",
                    testCasesPassed: [
                        "tc1"
                    ],
                    submissionCode: "function add(a, b) { return a + b; }",
                    submissionLanguage: SubmissionLanguage.JavaScript
                }
            ]
        },
        {
            id: "challenge2",
            numberOfTestCases: 2,
            userSubmissions: [
                {
                    userId: "user123",
                    testCasesPassed: [
                        "tc1"
                    ],
                    submissionCode: "function subtract(a, b) { return a - b; }",
                    submissionLanguage: SubmissionLanguage.JavaScript
                }
            ]
        }
    ]
}

import { ObjectId } from 'mongodb';
import { Challenge, TestCase } from '../src/models';

const sampleChallenges: Challenge[] = [
    {
        id: new ObjectId().toString(),
        title: 'Sum of Two Numbers',
        difficulty: 'Easy',
        description: 'Write a function that returns the sum of two numbers.',
        link: 'https://example.com/challenges/sum-of-two-numbers',
        functionSignatures: {
            python: 'def sum_two_numbers(a: int, b: int) -> int:',
            javascript: 'function sumTwoNumbers(a, b) {'
        },
        testCases: [
            {
                id: new ObjectId().toString(),
                input: [1, 2],
                output: 3
            },
            {
                id: new ObjectId().toString(),
                input: [10, 20],
                output: 30
            },
            {
                id: new ObjectId().toString(),
                input: [-1, -2],
                output: -3
            }
        ]
    },
    {
        id: new ObjectId().toString(),
        title: 'Reverse a String',
        difficulty: 'Medium',
        description: 'Write a function that reverses a string.',
        link: 'https://example.com/challenges/reverse-a-string',
        functionSignatures: {
            python: 'def reverse_string(s: str) -> str:',
            javascript: 'function reverseString(s) {'
        },
        testCases: [
            {
                id: new ObjectId().toString(),
                input: 'hello',
                output: 'olleh'
            },
            {
                id: new ObjectId().toString(),
                input: 'world',
                output: 'dlrow'
            },
            {
                id: new ObjectId().toString(),
                input: 'OpenAI',
                output: 'IAnepO'
            }
        ]
    },
    {
        id: new ObjectId().toString(),
        title: 'Find Maximum Value',
        difficulty: 'Hard',
        description: 'Write a function that finds the maximum value in an array.',
        link: 'https://example.com/challenges/find-maximum-value',
        functionSignatures: {
            python: 'def find_maximum(arr: list) -> int:',
            javascript: 'function findMaximum(arr) {'
        },
        testCases: [
            {
                id: new ObjectId().toString(),
                input: [1, 2, 3, 4, 5],
                output: 5
            },
            {
                id: new ObjectId().toString(),
                input: [10, 20, 30, 40, 50],
                output: 50
            },
            {
                id: new ObjectId().toString(),
                input: [-10, -20, -30, -40, -50],
                output: -10
            }
        ]
    }
];

export default sampleChallenges;


export {sampleGameState, sampleChallenges}