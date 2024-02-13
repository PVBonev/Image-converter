from flask import Flask, request, send_file, Response,jsonify
from flask_cors import CORS
import base64
import json
from PIL import Image, ImageFilter
import numpy as np
import io
import os

app = Flask(__name__)
CORS(app)

def serve_image(image_path):
    """Function to serve the grayscale image"""
    try:
        with open(image_path, 'rb') as f:
            image_data = f.read()
        return image_data
    except Exception as e:
        print(f"Error serving image: {e}")
        return None

def file_exists(filepath):
    return os.path.isfile(filepath)

@app.route('/grayscaleImage', methods=['GET'])
def get_grayscale_image():
    """
    GET route handler that serves the grayscale image.
    """
    try:
        make_image_grayscale('original_image.jpg')
        if file_exists('grayscale_image.jpg'):
            grayscale_image = serve_image('grayscale_image.jpg')
            # Serve the grayscale image with the appropriate content type
            return send_file(
                io.BytesIO(grayscale_image),
                mimetype='image/jpeg',
                as_attachment=True,
                download_name='grayscale_image.jpg'
            )
        else:
            return Response("Grayscale image does not exist", status=404)
    except Exception as e:
        print(f"Error serving grayscale image: {e}")
        return Response("Error serving grayscale image", status=500)

def make_image_grayscale(image_path):
    """Function to convert an image to grayscale using NumPy vectorization"""
    img = np.array(Image.open(image_path))
    gray_img = np.dot(img[..., :3], [0.2989, 0.5870, 0.1140])  # Grayscale conversion weights
    Image.fromarray(gray_img.astype(np.uint8)).save('grayscale_image.jpg')

@app.route('/invertImage', methods=['GET'])
def get_inverted_image():
    """
    GET route handler that serves the inverted image.
    """
    try:
        make_image_inverted('original_image.jpg')
        if file_exists('invert_image.jpg'):
            invert_image = serve_image('invert_image.jpg')
            # Serve the inverted image with the appropriate content type
            return send_file(
                io.BytesIO(invert_image),
                mimetype='image/jpeg',
                as_attachment=True,
                download_name='invert_image.jpg'
            )
        else:
            return Response("Inverted image does not exist", status=404)
    except Exception as e:
        print(f"Error serving inverted image: {e}")
        return Response("Error serving inverted image", status=500)

def make_image_inverted(image_path):
    """Function to convert an image to inverted using NumPy vectorization"""
    img = Image.open(image_path)
    inverted_image = Image.eval(img, lambda x: 255 - x)
    if inverted_image.mode == 'RGBA':
        inverted_image = inverted_image.convert('RGB')
    inverted_image.save('invert_image.jpg')

@app.route('/gaussianImage', methods=['GET'])
def get_gaussian_image():
    """
    GET route handler that serves the gaussian image.
    """
    try:
        make_image_gaussian('original_image.jpg')
        if file_exists('gaussian_image.jpg'):
            gaussian_image = serve_image('gaussian_image.jpg')
            # Serve the gaussian image with the appropriate content type
            return send_file(
                io.BytesIO(gaussian_image),
                mimetype='image/jpeg',
                as_attachment=True,
                download_name='gaussian_image.jpg'
            )
        else:
            return Response("Gaussian image does not exist", status=404)
    except Exception as e:
        print(f"Error serving gaussian image: {e}")
        return Response("Error serving gaussian image", status=500)

def make_image_gaussian(image_path):
    """Function to apply a Gaussian blur to an image using PIL"""
    img = Image.open(image_path)
    gaussian_img = img.filter(ImageFilter.GaussianBlur(radius=5))
    # Convert image to RGB if it's RGBA
    if gaussian_img.mode == 'RGBA':
        gaussian_img = gaussian_img.convert('RGB')
    gaussian_img.save('gaussian_image.jpg')

@app.route('/monochromeImage', methods=['GET'])
def get_monochrome_image():
    """
    GET route handler that serves the monochrome image.
    """
    try:
        make_image_monochrome('original_image.jpg')
        if file_exists('monochrome_image.jpg'):
            monochrome_image = serve_image('monochrome_image.jpg')
            # Serve the monochrome image with the appropriate content type
            return send_file(
                io.BytesIO(monochrome_image),
                mimetype='image/jpeg',
                as_attachment=True,
                download_name='monochrome_image.jpg'
            )
        else:
            return Response("Monochrome image does not exist", status=404)
    except Exception as e:
        print(f"Error serving monochrome image: {e}")
        return Response("Error serving monochrome image", status=500)
    
def make_image_monochrome(image_path):
    """Function to convert an image to monochrome using PIL"""
    img = Image.open(image_path)
    monochrome_img = img.convert('1')
    monochrome_img.save('monochrome_image.jpg')

@app.route('/', methods=['POST'])
def index():
    """
    POST route handler that accepts an image, makes it grayscale using NumPy, and returns a JSON containing the grayscale image with more fields
    """
    
    # Read image from request and write to the server's file system
    data = request.files['file']
    data.save('original_image.jpg')

    # according to the chosen filter apply the filter to the image
    filter = request.form['filter']
    
    if filter == 'grayscale':
        return Response("Selected grayscale conversion", status=200)

    elif filter == 'invert':
        return Response("Selected inverted conversion", status=200)
    
        

    # Return a downloadable link for the grayscale image
    return Response("Invalid filter", status=400)

if __name__ == '__main__':
    app.run(debug=True)
