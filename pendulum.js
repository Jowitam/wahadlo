// Prosta klasa Wahadło
// Funkcjonalność dla użytkownika - kliknięcie myszką i opuszczenie mulki

function Pendulum(origin_, r_) {

  this.origin = origin_.copy();
  this.position = createVector();//pozycja wahadła
  this.r = r_;
  this.angle = PI/2; //start wahadła z konta 360 st.

  this.aVelocity = 0.0;//zero obrotów
  this.aAcceleration = 0.0;
  this.damping = 0.995;   // samowolne spowalnianie
  this.ballr = 50.0;      // promień kulki

  this.dragging = false; //pogłębianie


  this.go = function() {
    this.update();
    this.drag();    // interakcja z użytkownikiem
    this.display();
  };

  // Funkcja aktualizująca pozycję
  this.update = function() {
    // Dopóki nie przeciągamy wahadła, ma się kołysać
    if (!this.dragging) {
      var gravity = 0.4;                                               // stałą arbitralna = siła ciężkości
      this.aAcceleration = (-1 * gravity / this.r) * sin(this.angle);  // równanie na przyśpieszenie (see: http://www.myphysicslab.com/pendulum1.html)
      this.aVelocity += this.aAcceleration;                            // prędkość narastająca
      this.aVelocity *= this.damping;                                  // samowolne tłumienie
      this.angle += this.aVelocity;                                    // kąt przyrostu
    }
  };

  this.display = function() {
    this.position.set(this.r*sin(this.angle), this.r*cos(this.angle), 0);         // konwersja biegunowa na długość kartezjańsą
    this.position.add(this.origin);                                               // pozycja wahadła

    stroke(255); //kolor obwódki kulki i sznurka
    strokeWeight(3); //grubość lini
    // rysowanie ramienia
    line(this.origin.x, this.origin.y, this.position.x, this.position.y);
    ellipseMode(CENTER);
    fill(127);//kolor kulki
    if (this.dragging) fill(200); //kolor kulki po przyciśnięciu
    // rysowanie kulki
    ellipse(this.position.x, this.position.y, this.ballr, this.ballr);
  };


  // Metoda interacji myszki

  // sprawdzenie czy klikamy na kulkę
  this.clicked = function(mx, my) {
    var d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.ballr) {
      this.dragging = true;
    }
  };

  // informacja że nie ma już kliknięcia na kulkę
  this.stopDragging = function() {
    this.aVelocity = 0; // puszczenie myszka - brak dodaktowej prędkości
    this.dragging = false;
  };

  this.drag = function() {
    // przeciągnięcie kulki powoduje obliczenie kąta między początkiem wahadłą a myszą i przypisanie kąta do wahadłą
    if (this.dragging) {
      var diff = p5.Vector.sub(this.origin, createVector(mouseX, mouseY));      // różnica między punktami
      this.angle = atan2(-1*diff.y, diff.x) - radians(90);                   // kąt względem osi pionowej
    }
  };
}
