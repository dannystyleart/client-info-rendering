# Browser fingerprinting experiment

This experiment demonstrates a way to identify a browser, by utilizing it's performance footprint and renderer informations.

## How? What data

The process uses 2 factors of a setup of what users are usually have no easy way to spoof.

#### Canvas rendering

By rendering multiple layers on a canvas we're challanging the color blending, pixel placement and other rendering characteristics of a GPU. 

In theory the way a GPU renders an image is really unique even within the same model and driver. These differences will be represented in the data uri representation of the image canvas.

#### WebGL info

WebGL is a program for visual rendering, and it's versions are supported well, across major browsers. It stores information about the underlying gpu used as renderer. This information is not unique, but describes the system and cannot be spoofed.

Note: Some browsers or borwser profiles may not returning this debugger information.

_Part of this experiment to learn about these exceptions._
