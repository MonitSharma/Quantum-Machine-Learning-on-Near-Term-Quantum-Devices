
import qiskit
from qiskit import transpile, assemble
from qiskit import QuantumCircuit, ClassicalRegister, QuantumRegister, execute
from qiskit import BasicAer, Aer, execute
from qiskit.quantum_info import state_fidelity
from qiskit.visualization import *
from qiskit.quantum_info.operators import Operator
import numpy as np
import matplotlib.pyplot as plt
from qiskit.circuit.parameter import Parameter
import torch
from torch.autograd import Function
from torchvision import datasets, transforms
import torch.optim as optim
import torch.nn as nn
import torch.nn.functional as F

import qiskit
from qiskit import transpile, assemble
from qiskit.visualization import *


nqubits=6

def normlaizeData(data):
    #Create Array of pixel value
    testdata=data
    arr_data=testdata.flatten()/max(testdata.flatten());
    encoding_data= np.array([np.round(x,6) for x in arr_data]);
    sum_const=np.sqrt(sum(encoding_data*encoding_data))
    encoding_norm=encoding_data/sum_const
    return encoding_norm

# Choose on PQC from Hannah  Sim https://arxiv.org/pdf/1905.10876.pdf circuit 15

def circuit15(qc,theta):
    #circuit 15
    #theta is list of the parameters
    #theta length is (8)L
    #L is the number of repeatation
    nqubits=6
    qr = QuantumRegister(nqubits)
    qc = QuantumCircuit(qr, name='PQC')

    count=0


    for i in range(nqubits):
        qc.ry(theta[count],i)
        count=count+1
    for i in range(nqubits-1):
        qc.cx(i,i+1)
    
    qc.cx(0,nqubits-1)
    for i in range(nqubits):
        qc.ry(theta[count],i)
        count=count+1    
    for i in range(nqubits-1):
        qc.cx(i+1,i)
    qc.cx(nqubits-1,0)
    qc.to_instruction()
    return qc
# Choose on PQC from Hannah  Sim https://arxiv.org/pdf/1905.10876.pdf circuit 15

def encoding(qc,theta,L):
    #circuit 15
    #theta is list of the parameters
    #theta length is (8)L
    #L is the number of repeatation
    nqubits=6
    qr = QuantumRegister(nqubits)
    qc = QuantumCircuit(qr, name='Embed')

    count=0
    for i in range(nqubits):
        qc.h(i)
        
    for l in range(L):
        for i in range(nqubits):
            qc.ry(theta[count],i)
            count=count+1
        for i in range(nqubits-1):
            qc.cx(i,i+1)
        
        qc.cx(nqubits-1,0)
        for i in range(nqubits):
            qc.ry(theta[count],i)
            count=count+1    
        for i in range(nqubits-1):
            qc.cx(i+1,i)
        qc.cx(0,nqubits-1)
        
    qc.to_instruction()
    return qc




# mapping the data
# mapping is taken from https://arxiv.org/pdf/2003.09887.pdf
def binary(x):
    return ('0'*(6-len('{:b}'.format(x, '#010b') ))+'{:b}'.format(x, '#010b'))
def firsttwo(x):
    return x[:2]
parity = lambda x: firsttwo(binary(x)).count('1') % 2    