// Symulator wahadła

// Gravity Force = Mass * Gravitational Constant;
// Pendulum Force = Gravity Force * sine(theta)
// Angular Acceleration = Pendulum Force / Mass = gravitational acceleration * sine(theta);

// Angular Acceleration = (g / R) * sine(theta)

var p;

function setup()  {
  var canvas = createCanvas(640,360);
    canvas.parent('sketch-holder');

  // Stworzenie nowego wahadła w orginalnej pozycji i odpowiedniej długości sznurka
  p = new Pendulum(createVector(width/2,0),200);

}

function draw() {
  background(70); //kolor tła gdzie jest wahadło
  p.go();
}

function mousePressed() {
  p.clicked(mouseX,mouseY);
}

function mouseReleased() {
  p.stopDragging();
}
