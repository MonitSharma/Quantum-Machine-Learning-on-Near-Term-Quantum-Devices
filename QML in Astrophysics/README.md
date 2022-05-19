

# Qhack_Quantum_Machine_Learning: Classifying existence of galaxy

[![DOI](https://zenodo.org/badge/468975373.svg)](https://zenodo.org/badge/latestdoi/468975373)

<table align="center">
    <tr>
        <td><img src="./qhack/nasa.jpg" width="500"></td>
        <td><img src="./qhack/nasa2.png" width="500"></td>
     </tr>
 </table>
 
## We develope galaxy detection technique from the telescope image via QML. 

We successfully demonstrated the detection of the galaxy with an accuracy of 94% via a quantum machine learning model from a NASA image. We divided the galaxy image from NASA into a small 16x16 image as input data. Then we encoded and train the data with a quantum circuit using the parameterized quantum circuit from the paper [Expressibility and entangling capability of parameterized quantum circuits for hybrid quantum-classical algorithms, arXiv:1905. 10876](https://arxiv.org/abs/1905.10876). With the circuit with high expressibility, we trained and test our model with Cross-Entropy as our loss function and L-BFGS algorithm for optimization. This algorithm is realized in PyTorch and qiskit machine-learning module. This work shows our capability of classification of galaxy images. 


## After training the 50 images, we show that our test model has 94% accuracy.

<td><img src="./qhack/Screen Shot 2022-02-25 at 3.55.50 PM.png" width="1000"></td>



## Video Presentation

[![Watch the video](https://img.youtube.com/vi/1wNSJAcfYjo/maxresdefault.jpg)](https://www.youtube.com/watch?v=SWmo46d4fkE)

## Code

[Image Pre-processing](https://github.com/BrightSky77/Qhack_Quantum_Machine_Learning/blob/main/qhack/CutImg.ipynb)

[QNN with Galaxy data](https://github.com/BrightSky77/Qhack_Quantum_Machine_Learning/blob/main/qhack/Notebooks/Image_QNN.ipynb)


