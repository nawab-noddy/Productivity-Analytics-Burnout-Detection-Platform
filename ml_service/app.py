from flask import Flask, request, jsonify
import joblib
import pandas as pd

# 1. Initialize the Flask application
app = Flask(__name__)

# 2. Load the trained model
# We load the "brain" we saved earlier so it's ready to make predictions.
try:
    model = joblib.load('burnout_model.pkl')
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    print("Make sure 'burnout_model.pkl' exists in the same folder!")

# 3. Define the Prediction Endpoint
# This URL (http://localhost:5000/predict) is where Java/Postman will send data.
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # A. Get JSON data sent by Java/Postman
        data = request.get_json()

        # B. Extract the specific features our model needs
        # IMPORTANT FIX: 
        # Left side ('stress_levels') matches your train_model.py
        # Right side (data['stress_level']) matches your Postman JSON
        features = pd.DataFrame([{
            'sleep_hours': data['sleep_hours'],
            'work_hours': data['work_hours'],
            'stress_levels': data['stress_level'] 
        }])

        # C. Make the Prediction
        # result will be [0] (Healthy) or [1] (Burnout)
        prediction = model.predict(features)[0]

        # D. Get the Probability (Confidence)
        # FIX: Added [0][1] to extract the specific probability number for "Burnout"
        probability = model.predict_proba(features)[0][1]

        # E. Send the answer back
        return jsonify({
            'burnout_prediction': int(prediction), # 0 or 1
            'risk_probability': float(probability), # e.g., 0.85
            'message': 'Prediction successful'
        })

    except Exception as e:
        print(f"Error during prediction: {e}") # Print to terminal for debugging
        return jsonify({'error': str(e)}), 400

# 4. Run the Server
if __name__ == '__main__':
    # Java runs on 8080, so we run Python on 5000 to avoid conflict.
    app.run(host='0.0.0.0', port=5000, debug=True)