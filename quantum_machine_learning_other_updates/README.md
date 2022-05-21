# Quantum Machine Learning
This is an exploration using synthetic data in CSV format to apply QML models for the sake of binary classification. You can find here three different approaches. Two with Qiskit (VQC and QK/SVC) and one with Pennylane (QVC).

## Caveats

1. No EDA was applied into the notebooks. I highly recommend that if you are going to use other CSVs, please take the time to review your data and put a lot of focus in the pre-processing stage of your architecture.
2. The synthetic data was public and extracted from Kaggle here: https://www.kaggle.com/datasets/mohammadarashi/synthetic-binary-classification
3. If you use your data I recommend also to explore a custom feature map (in the case of Qiskit) or encoding (in the case of Pennylane). The results of the models depends a lot on that.
4. I didn't add the requirements of the SDKs/libraries, but should be easy to install everything quickly. I suggest to create an specific environment to run these models and avoid conflicts. 
5. The approach was done with only two dimensions/qubits, but you can test with more. Also you con play with iterations in the case of the variational, and with shots, layers and different other parameters. 
