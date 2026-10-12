HireOneAI — AI-Powered Career Platform

1. Project Overview

HireOneAI is an AI-powered career development platform that helps users analyze their resumes, practice interviews with AI, receive feedback on their answers, and generate personalized career roadmaps.

The project uses React for the frontend, Node.js and Express.js for backend services, MongoDB for persistent data, Redis for session and cache-related operations, and LangChain and LangGraph to build AI-powered workflows.

The AI features use a language model through Groq.

2. Main Features

Resume Analysis

Users upload their resumes in PDF format.

The backend extracts text from the PDF.

An AI agent analyzes the extracted information.

The platform can present resume insights and recommendations based on the analysis.

AI Interview Practice

The user starts an interview.

The AI generates interview questions.

The user submits answers.

The AI evaluates answers and generates feedback.

When the interview is completed, a summary is generated.

Personalized Career Roadmap

The user provides career-related information, such as a target role or goal.

The roadmap agent generates a learning plan.

The resource agent finds relevant learning resources, including articles, documentation, and YouTube videos.

3. Technology Stack

React and Vite: Build and run the frontend.

Tailwind CSS: Style the user interface.

Redux Toolkit: Manage shared frontend state.

Node.js and Express.js: Build backend APIs and services.

Express API Gateway: Route frontend requests to the appropriate backend service.

LangChain: Connect the application to the language model and structure AI interactions.

LangGraph: Organize multi-step AI workflows into nodes and transitions.

Groq: Provide access to the configured language model.

MongoDB: Store persistent application data.

Redis: Store session-related information and support cache-related operations.

Firebase Authentication: Verify user identity using Firebase ID tokens.

4. Backend Architecture

The backend is divided into separate services.

Gateway Service: Receives frontend API requests, applies authentication middleware where configured, and forwards requests to the relevant service.

Authentication Service: Verifies Firebase ID tokens, works with user records, and manages Redis-backed sessions.

Resume Service: Extracts PDF text and runs AI-based resume analysis.

Interview Service: Manages interview questions, answer feedback, and interview summaries using a LangGraph workflow.

Roadmap Service: Generates career roadmaps and finds relevant learning resources.

Billing Service: A scaffolded service whose payment functionality is not yet complete.

5. How Authentication Works

A user authenticates through Firebase.

The frontend sends the Firebase ID token with a backend request.

The authentication service verifies the token using Firebase Admin.

The service works with MongoDB user records and stores session information in Redis.

An HTTP-only cookie is used for session handling.

Requests are routed through the gateway, with authentication middleware applied according to the route configuration.

6. How the AI Interview Chatbot Works

The interview workflow is managed using LangGraph.

Workflow:

Interview request → Interview Agent → User answers → Feedback Agent → More questions or completion → Summary Agent

Interview Agent: Generates interview questions and manages the interview-start workflow.

Feedback Agent: Evaluates submitted answers and produces feedback.

Summary Agent: Generates the final summary when the interview is completed.

LangGraph helps organize the process into separate steps instead of putting the entire interview workflow into one large function.

7. How the Career Roadmap Chatbot Works

The roadmap workflow uses two main agents.

Workflow:

Career goal → Roadmap Agent → Resource Agent → Learning roadmap with resources

Roadmap Agent: Generates a structured learning plan for the user's target role or career goal.

Resource Agent: Adds relevant articles, documentation, and YouTube learning resources.

This separates roadmap generation from resource discovery and makes the workflow easier to maintain.

8. LangChain vs. LangGraph

LangChain helps connect the application to the language model and build AI interactions.

LangGraph organizes AI processing into a workflow containing nodes and transitions. In HireOneAI, it coordinates the interview and roadmap processes.

In simple terms, LangChain helps the application interact with the model, while LangGraph helps control the sequence of AI tasks.

9. Role of MongoDB and Redis

MongoDB

Stores persistent application data, such as user records and relevant feature data.

Supports the application's data retrieval and storage requirements.

Redis

Stores authentication session information with an expiration.

Supports fast access to session data.

The exact collections and keys depend on the implementation of each service.



<!-- cookie-parser-> to get session from cookie -->
<!-- cors-> to allow cross origin requests -->
<!-- dotenv-> to load environment variables from .env file -->
<!-- express-> to create server -->
<!-- express-http-proxy-> to proxy requests to another server (to acess services from gateway)-->
<!-- mongoose-> to connect to mongodb -->
<!-- dotenv-> to load environment variables from .env file -->
<!-- morgan-> to log requests response on vd code terminal -->
<!-- nodemon -> to run node js server continiously
<!-- firebase-admin-> to connect to firebase with secured login process -->
<!-- login process: token comes from frontend generated by firebase then we verify that token in our google auth service controller then we check that user already present in backend then go ahead if not create a user in database then create seession id by using crypto(inbuilt package in node js) then we store that session data in redis and then store that session in cookies also the return user (auth.controller Google auth function) -->
<!-- logout process: we get session id from cookies and then we delete that session from redis and then we delete that session from cookies -->
<!-- axios-> to make http requests(get,put,post,delete) -->
<!-- ioredis-> to connect to redis by redis instance(redis.js) -->
<!-- resume Service  -->
<!-- multer-> to upload or store resume inside backend file system -->
 <!-- pdf-parser-> to extract text from pdf file -->
 <!-- GROQ(LLM agent) -> langchain package used to create resume agent docs available on on langchain website -->
 <!-- redus-> to store resume data to access it from anywhere in resume service -->
 <!-- recharts-> to create charts in resume service -->
 <!-- react-to-print -> to print resume --> 
 <!-- monaco-editor-> to create code editor in interview -->
 <!-- circular-progressbar-> to create circular progress bar in interview -->
 <!-- razonpay-> to create payment gateway in billing service -->
 <!-- docker-> to create docker image and deploy it to aws -->

# hireOneAI
