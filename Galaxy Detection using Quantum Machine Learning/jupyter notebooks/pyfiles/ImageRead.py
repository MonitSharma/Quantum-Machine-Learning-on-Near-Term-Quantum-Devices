import numpy as np

#Image processing
from PIL import Image

#Calling Image from the path, and file name. 
#i is the number labeling of the data
#some of the files does not have name
def callImage(i,path,name):
    x1 = Image.open(
        path+str(name)+str(i)+'.jpg').convert('L');
    y1 = np.asarray(x1.getdata(), dtype=np.float64).reshape((x1.size[1], x1.size[0]));
    y_dat1 = np.asarray(y1, dtype=np.uint8)     
    return y_dat1

#Resize image into n x n pixel
def imageResize(data,pixel):
    image = Image.fromarray(data,'L')
    image= image.resize((pixel, pixel))
    image=np.asarray(image.getdata(), dtype=np.float64).reshape((image.size[1], image.size[0]))
    image=np.asarray(image, dtype=np.uint8)    
    return image




#Making MxN partition
def imagePartition(data,M,N):
    tiles = [data[x:x+M,y:y+N] for x in range(0,data.shape[0],M) for y in range(0,data.shape[1],N)]
    return tiles

def imageBinarize(data):
    # specify a threshold 0-255
    threshold = 75
    # make all pixels < threshold black
    bidata = 1.0 * (data > threshold)
    return bidata
    



