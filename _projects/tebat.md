---
layout: page
title: TeBAT TPC Development
description: A next-generation Time Projection Chamber
img: assets/img/TeBAT_CAD.jpg
importance: 1
category: fundamental
related_publications: false
---

TeBAT - Texas Birmingham Active Target Time Projection Chamber

When performing nuclear physics experiments, we use beams of particles travelling at considerable fractions the speed of light and impinge them onto a target. An important area of physics is to try to understand not just the stable isotopes in nature (of which there are 251), but also the unstable isotopes (of which around 3000 are known but there could be up to 8000). This obviously means that most of the isotopes we know of are unstable!

So how do we study these short-lived balls of protons and neutrons? While some experiments can be performed with beams of stable isotopes, to study exotic nuclei far from stability, the beam itself needs to be unstable. What this traditionally means is that a primary nuclear reaction is used with a stable beam to produce a lot of unstable isotopes, which are then focused/accelerated to produce a secondary radioactive beam. Unfortunately, this process means that the intensity of the beam can become very small and therefore it may require running the experiment for many many weeks to generate good statistics.

Time Projection Chambers aim to make the most of every single beam ion: if you can't increase the beam intensity, you can generate more data by having a thicker target. Normally, this corresponds to a loss of resolution (due to not being certain where in the target the interaction took place), but by having an extended gas volume in a TPC the location can be known very well. Time Projection Chambers are essentially a gas volume (where the gas is the target of interest) and a uniform electric field is placed across the gas. As charged-particles traverse the gas and lose energy, they liberate electrons which are then drifted by the electric field. Position-sensitive detectors can therefore locate in a 2D plane where these charged particles have traversed, and the arrival time of the electrons tells us how far above the pad plane the event occured. See below for a schematic:

<img src="/assets/img/TPC.gif" alt="Animated GIF showing how charged particles leave electrons behind and are drifted by an electric field to a 2D position sensitive detector" width="800">

An important aspect of improving TPC technology is to improve the position resolution with which reconstruct these tracks. With a pixel-based approach to reconstructing, the position resolution is limited by the pad size. In the previous TPC, TexAT, this was 1.75 mm x 3.5 mm. However, advances in TPCs mean that one must no longer be limited to the size of a pad pixel. By deliberately spreading out the charge across multiple pads (with a known distribution), it is possible to generate sub-pad position resolution. In this way, the new TeBAT TPC uses DLC (Diamond-Like Carbon) as a resistive layer to spread the charge with a characteristic RC value and get a position resolution of the order of <0.5 mm from a pad size of 3 mm x 3 mm.

<img src="/assets/img/DLC2.png" alt="DLC layer showing the idea of spreading charge across multiple pads" width="800">


<img src="/assets/img/TeBAT_CAD.jpg" alt="CAD for TeBAT" width="800">

More information on TexAT & TeBAT can be found in <a href="/assets/pdf/TPC2023.pdf">this presentation</a> given as part of TPC2023 in College Station, TX, USA.
