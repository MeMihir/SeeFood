import tensorflow as tf
from tensorflow.keras.layers import AveragePooling2D, Flatten, Dropout, Dense
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam

def load_model():
    shape = (299,299,3)
    num_classes=101
    inceptionv3 = tf.keras.applications.InceptionV3(include_top=False, input_shape=shape, weights='imagenet')
    inceptionv3.trainable = False
    
    output_model = inceptionv3.output
    output_model = AveragePooling2D((8,8))(output_model)
    output_model = Dropout(0.4)(output_model)
    output_model = Flatten()(output_model)
    output_model = Dense(num_classes, kernel_initializer='glorot_uniform', activation='softmax')(output_model)

    model = Model(inputs=inceptionv3.input, outputs=output_model)
    model.load_weights('./models/pretrained/seefood-inceptionv3-5596.h5')
    print(model.summary())
    return model

