from flask import Flask, request, jsonify, render_template
import io
import pytesseract
import base64
from PIL import Image

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('main.html')

@app.route('/extract_text', methods=['POST'])
def extract_text():
    img_data = request.form['imageData'].split(",")[1]
    img = Image.open(io.BytesIO(base64.b64decode(img_data)))
    text = pytesseract.image_to_string(img)
    return jsonify({'text_from_img': text})

if __name__ == '__main__':
    app.run(debug=True)