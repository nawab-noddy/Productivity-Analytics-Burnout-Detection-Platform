import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# 1 Generate synthetic data
# We create 1000 fake days of data to teach the model what "Burnout" looks like.
np.random.seed(42)  # For reproducibility
n_samples = 1000

# Random generate metrics

sleep_hours = np.random.uniform(4, 10, n_samples)  # Sleep between 4 and 10 hours
work_hours = np.random.uniform(2, 14, n_samples)  # Work between 2 and 14 hours
stress_level = np.random.randint(1, 6, n_samples)  # Stress levels between 1 and 5

# create a dataframe (Table)
data = pd.DataFrame({
    'sleep_hours': sleep_hours,
    'work_hours': work_hours,
    'stress_levels': stress_level
})

# 2 Defint the "Target" (Anser Key)
# We define a simple rule to label days as "Burnout" (1) or "Healthy" (0):
# This teaches the AI the patterns  we care about.
# Rule: If Sleep < 6 OR (Stress > 4 and Work > 9) -> Burnout

conditions = [
    (data['sleep_hours'] < 6) | ((data['stress_levels'] > 4) & (data['work_hours'] > 9)),
]
choices = [1] #1 Burnout Risk
data['burnout_target'] = np.select(conditions, choices, default=0) #0 = Healthy

print("✅ Synthetic Data Generated. Example:")
print(data.head())

# 3 Split data into training and testing
X = data[['sleep_hours', 'work_hours', 'stress_levels']] # Features (Inputs)
y = data['burnout_target'] # target (Output)

X_train, X_test, y_train, y_test = train_test_split(X, y , test_size=0.2, random_state=42)

# Train Model (Random Forest)
# Random forest is great because it acts like a collection of decision trees.

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train) 

print(f"✅ Model Trained! Accuracy: {model.score(X_test, y_test) * 100:.2f}%")

# save the model
joblib.dump(model, 'burnout_model.pkl')
print("✅ Model Saved to 'burnout_model.pkl'")