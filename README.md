# 🧠 Productivity Drift & Burnout Detection System

An **AI-assisted, backend-driven web application** designed to detect early signs of productivity drift and burnout by analyzing daily behavioral metrics.  
Unlike traditional productivity tools that only track tasks, this system focuses on **data quality, backend intelligence, and explainable decision-making**, following real industry practices.

---

## 📌 Problem Statement

Students and professionals often experience **gradual productivity decline and burnout** without realizing it.  
Most existing applications track tasks or time but fail to **identify behavioral patterns** that signal burnout early.

This project aims to:
- Collect reliable productivity signals
- Detect productivity drift using business rules
- Predict burnout risk using machine learning
- Provide actionable insights before burnout occurs

---

## 🎯 Project Goals

- Build a **production-grade Java backend** with clean architecture
- Design a **time-series data system** for behavioral analytics
- Introduce AI only after a strong data foundation
- Follow **industry-style phased development**
- Keep backend logic as the core of the system

---

## 🏗️ System Architecture

React Frontend
     |
     | REST APIs
     v
Spring Boot Backend (Java)
     |
     | REST Call
     v
Python ML Microservice


- The **Java backend** handles authentication, validation, business logic, and data storage
- The **AI service** is a separate microservice used only for inference
- Backend decisions are rule-driven, with AI acting as an assisting layer

---

## 🧩 Project Phases

### Phase 1 – Data Collection & Foundation (Current)
- User authentication using JWT
- Daily productivity data input
- Strict validation to ensure data quality
- Time-series storage of behavioral metrics
- APIs for fetching trends and summaries
- **No AI in this phase (intentional)**

### Phase 2 – Rule-Based Intelligence
- Productivity drift detection using rules
- Burnout risk thresholds
- Alerts and warnings
- Weekly summaries

### Phase 3 – AI Integration
- Burnout risk classification (Low / Medium / High)
- ML model inference via Python microservice
- Probability-based predictions
- Personalized recommendations

### Phase 4 – Feedback & Improvement
- User feedback on prediction accuracy
- Model performance monitoring
- Future retraining support

---

## 📊 Data Collected (Signals)

Each user provides daily metrics such as:
- Work / Study Hours
- Tasks Planned vs Completed
- Break Count
- Sleep Hours
- Stress Level (1–5)
- Mood
- Date

These metrics are stored as **validated time-series data** and later used for analysis and prediction.

---

## 🛠️ Technology Stack

### Backend (Primary Focus)
- Java
- Spring Boot
- Spring Security
- JWT Authentication
- RESTful APIs
- Hibernate / JPA
- Clean layered architecture (Controller → Service → Repository)

### Database
- MySQL / PostgreSQL
- Normalized schema
- Unique constraints to prevent duplicate daily entries
- Optimized for time-series queries

### AI / Machine Learning
- Python
- Scikit-learn
- Pandas
- NumPy
- Logistic Regression / Random Forest
- Flask or FastAPI for ML inference service

### Frontend
- React.js
- Axios / Fetch API
- Chart libraries (Chart.js / Recharts)

### Dev Tools
- Git & GitHub
- Docker (optional)
- Postman
- Render / Railway / AWS (deployment-ready)

---

## 🔐 Key Backend Features

- Secure authentication & authorization (JWT)
- Strong API validation to protect downstream analytics
- Business-rule-based decision making
- Microservice communication with AI service
- Separation of raw data and derived analytics
- Scalable and maintainable architecture

---

## 🧠 Why This Project Is Backend-Oriented

- AI is **not the core** — it is an assisting component
- All decisions flow through backend business logic
- Data engineering and validation are prioritized
- System works even without AI predictions
- Designed to reflect **real-world backend systems**

This project is intentionally built to demonstrate **Java backend engineering skills**, not just UI or ML usage.

---

## 🧪 Future Enhancements

- Automated data ingestion
- Advanced anomaly detection
- Notification system (Email / Push)
- Admin analytics dashboard
- Multi-user organization support

---

## 📄 License

This project is developed for **learning, experimentation, and demonstration of backend engineering skills**.

---

## 👨‍💻 Author

**Mohammad Anas**  
B.Tech CSE  
Aspiring Java Backend Developer  

---

### ⭐ Final Note

This project follows **industry-style phased development**, where data quality and backend reliability come before automation and AI.  
It is designed to be **interview-friendly**, explainable, and scalable.
