from flask import Flask, request, jsonify
import joblib
import os
import traceback

app = Flask(__name__)

# ---------- Load Model and Vectorizer ----------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

try:
    model_path = os.path.join(BASE_DIR, "spam_model.pkl")
    vectorizer_path = os.path.join(BASE_DIR, "vectorizer.pkl")

    print(f" Loading model from: {model_path}")
    print(f" Loading vectorizer from: {vectorizer_path}")

    model = joblib.load(model_path)
    vectorizer = joblib.load(vectorizer_path)

    print(" Model and vectorizer loaded successfully!")
except Exception as e:
    print(" Failed to load model or vectorizer:", e)
    model = None
    vectorizer = None


# ---------- Define Prediction Route ----------
@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get text from request JSON
        data = request.get_json(force=True)
        text = data.get("text", "").strip()

        if not text:
            return jsonify({
                "error": "Empty text provided",
                "isSpam": None
            }), 400

        # Ensure model loaded
        if model is None or vectorizer is None:
            return jsonify({
                "error": "Model not loaded",
                "isSpam": None
            }), 500

        # Transform and predict
        features = vectorizer.transform([text])
        prediction = model.predict(features)[0]

        # 0 = spam, 1 = not spam
        is_spam = bool(prediction == 0)

        # print(f"Received text: {text[:50]}... -> Spam: {is_spam}")


        return jsonify({
            "text": text,
            "isSpam": is_spam
        })

    except Exception as e:
        print(" Error during prediction:", e)
        traceback.print_exc()
        return jsonify({
            "error": str(e),
            "isSpam": None
        }), 500


# ---------- Health Check (optional) ----------
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Flask spam classifier is running "})


# ---------- Run Flask App ----------
if __name__ == "__main__":
    app.run(port=5001, debug=False)
