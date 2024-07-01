export function drawnApartFingerprint() {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || (canvas.getContext('experimental-webgl') as unknown as WebGLRenderingContext);
        if (!gl) {
            return 'WebGL not supported';
        }

        // Set the viewport and clear the canvas
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Create a shader program
        const vertexShaderSource = `
            attribute vec4 a_position;
            void main() {
                gl_Position = a_position;
            }
        `;
        const fragmentShaderSource = `
            precision mediump float;
            void main() {
                gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); // Green color
            }
        `;

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)!;
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)!;
        const program = createProgram(gl, vertexShader, fragmentShader)!;

        // Look up the position attribute location
        const positionLocation = gl.getAttribLocation(program, "a_position");

        // Create a buffer and put a single clipspace rectangle in it (2 triangles)
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        const positions = [
            -1, -1,
            1, -1,
            -1, 1,
            -1, 1,
            1, -1,
            1, 1,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        // Use our pair of shaders
        gl.useProgram(program);

        // Turn on the attribute
        gl.enableVertexAttribArray(positionLocation);

        // Bind the position buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        const size = 2;          // 2 components per iteration
        const type = gl.FLOAT;   // the data is 32bit floats
        const normalize = false; // don't normalize the data
        const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        const offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);

        // Draw the rectangle
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // Read the pixels
        const pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
        gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

        // Generate a hash of the pixels
        return hash(pixels);

    } catch (e: unknown) {
        if(e instanceof Error) return `Error: ${e.message}`;
    }
}

function createShader(gl: WebGLRenderingContext, type: GLenum, source: string) {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

function hash(pixels: Uint8Array) {
    let hash = 0;
    for (let i = 0; i < pixels.length; i++) {
        hash = (hash << 5) - hash + pixels[i];
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}