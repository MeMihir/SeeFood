import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np
from models import inceptionv3_model

def preprocess_img(img):
    img = img*(.1/255)
    return img

def main():
    model = inceptionv3_model.load_model()
    img = np.array([plt.imread('./test_images/hotdog1.jpeg')])
    prepro_img = preprocess_img(img)
    print(np.max(model.predict(prepro_img)[0]))

main()
