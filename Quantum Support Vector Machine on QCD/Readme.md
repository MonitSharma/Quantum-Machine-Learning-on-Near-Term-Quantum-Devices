# Quantum Support Vector Machine with data from High Energy Physics

Over the last few years, quantum machine learning research has provided a lot of
insights on how we can understand and train quantum circuits as machine learning models.
While many connections to neural networks have been made, it becomes increasingly clear that
their mathematical foundation is intimately related to so-called kernel methods, the most famous
of which is the support vector machine (SVM) (see for example Schuld and Killoran (2018), Havlicek
et al. (2018), Liu et al. (2020), Huang et al. (2020), and, for a systematic summary which we will
follow here, Schuld (2021)).


--------------------------


# Quantum Chromo Dynamics

A primordial state of matter consisting of free quarks and gluons that existed in the early
universe a few microseconds after the Big Bang is also expected to form in high-energy heavy-ion
collisions. Determining the equation of state (EoS) of such a primordial matter is the ultimate
goal of high-energy heavy-ion experiments. Here we use supervised learning with a deep
convolutional neural network to identify the EoS employed in the relativistic hydrodynamic
simulations of heavy ion collisions. High-level correlations of particle spectra in transverse
momentum and azimuthal angle learned by the network act as an effective EoS-meter in deciphering
the nature of the phase transition in quantum chromodynamics. Such EoS-meter is model-independent
and insensitive to other simulation inputs including the initial conditions for hydrodynamic
simulations.



![](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-017-02726-3/MediaObjects/41467_2017_2726_Fig1_HTML.jpg?as=webp)


The conjectured phase diagram in quantum chromodynamics. In the region with high temperature and small baryon chemical potential, the phase transition between hadronic matter and quark–gluon plasma is a cross over according to lattice QCD calculations (blue dashed line in the small insert). In the region with low temperature and moderately high baryon chemical potential, the phase transition is first order (red line in the small insert). At low temperature and high baryon chemical potential, there might exist other phases, such as color superconductor



----------------

The best classifier (linear SVC) that generalizes well on two testing data sets achieves on average ~80% prediction accuracy. The important features from different classifiers differ from each other, however, those with good generalization capability have similar importance regions as given by the deep CNN. The deep CNN with on average ~95% prediction accuracy works much better to answer the core questions—is there a traceable encoder of the dynamical information from phase structure (EoS) that survives the evolution and exists in the final snapshot? If yes, then how to exclusively and effectively decode these information from the highly complex final output? These questions are crucial but unclear for decades in high-energy heavy-ion physics (and also in physical cosmology) due to the complexity and highly-dynamical characteristics in the collision evolution. The deep CNN demonstrates the revolution that big data analysis and machine learning might bring to the high energy physics and astrophysics.
