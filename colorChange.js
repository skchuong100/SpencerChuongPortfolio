let colorSets = [
    { primary: '#F800FF', secondary: '#FD7356' }, 
    { primary: '#00FF85', secondary: '#00A3FF' },
    { primary: '#00F0FF', secondary: '#8F00FF'}, 
    { primary: '#000AFF', secondary: '#DB00FF' }
];

let squareColorSets = ['#8F00FF', '#F800FF', '#00FF85', '#00F0FF'];
let triangleColorSets = ['#DB00FF', '#FD7356', '#00A3FF', '#8F00FF'];
let circleColorSets = ['#000AFF', '#E44797', '#00D6D6', '#5266FF'];

let currentSet = 0;
let currentSquareSet = 0;
let currentTriangleSet = 0;
let currentCircleSet = 0;

function updateShapeColors() {
    for (let i = 0; i < shapes.length; i++) {
        let shape = shapes[i];
        if (shape.type === "square") {
            shape.color = squareColorSets[currentSquareSet];
        } else if (shape.type === "triangle") {
            shape.color = triangleColorSets[currentTriangleSet];
        } else if (shape.type === "circle") {
            shape.color = circleColorSets[currentCircleSet];
        }
    }
}

document.getElementById('colorChangeButton').addEventListener('click', function() {
    let colors = colorSets[currentSet];
    document.documentElement.style.setProperty('--primary-color', colors.primary); // New color for --primary-color
    document.documentElement.style.setProperty('--secondary-color', colors.secondary); // New color for --secondary-color
    let intervalId = setInterval(function() {
        let transitionPrimaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color-transition');
        let transitionSecondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color-transition');
        
        if (transitionPrimaryColor !== colors.primary || transitionSecondaryColor !== colors.secondary) {
            document.documentElement.style.setProperty('--primary-color-transition', colors.primary); // New color for --primary-color-transition
            document.documentElement.style.setProperty('--secondary-color-transition', colors.secondary); // New color for --secondary-color-transition
        } else {
            clearInterval(intervalId);
        }
    }, 1000); // adjust this value as needed to control the speed of the transition
    currentSet = (currentSet + 1) % colorSets.length; // Rotate through the color sets

    currentSquareSet = (currentSquareSet + 1) % squareColorSets.length; // Rotate through the square color sets
    currentTriangleSet = (currentTriangleSet + 1) % triangleColorSets.length; // Rotate through the triangle color sets
    currentCircleSet = (currentCircleSet + 1) % circleColorSets.length; // Rotate through the circle color sets
    
    updateShapeColors(); // Update the colors of the shapes
});

