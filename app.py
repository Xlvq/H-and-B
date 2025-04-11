from flask import Flask, jsonify
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)

@app.route("/yandex-reviews", methods=["GET"])
def get_yandex_reviews():
    try:
        url = "pass"
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        }
        res = requests.get(url, headers=headers)
        soup = BeautifulSoup(res.text, "html.parser")

        reviews = []
        for block in soup.select(".business-review-view__body"):
            text = block.get_text(strip=True)
            author = block.find_previous("span", class_="business-review-view__author")
            reviews.append({
                "text": text,
                "author": author.get_text(strip=True) if author else "Аноним"
            })

        return jsonify(reviews)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001, debug=True)
