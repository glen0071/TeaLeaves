Features and Functions:

Collections
1. Users
 Properties:
  {
    _id: "string",
    createdOn: new Date(),
    email: "string",
    password: "string",
    Score: Number
  }  
2. Questions
  Properties:
    {
      _id: "string",
      createdBy: user._id,
      createdOn: new Date(),
      text: "string",
      headline: "string",
      deadline: Date(),
      themes: ["array", "array"],
      userAnswer: boolean,
      correctAnswer: boolean
    }

Views/Templates:
 - Edit one's own profile page
 - List of questions (organized or filtered by theme)
 - Single question page

 Login view:
  - List of questions - must login before answering
