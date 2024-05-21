import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="fibonacci">
  <div class="rectangle" style="position:fixed;border-bottom-right-radius: 100%;width:1px;height:1px">

  </div>
  </div>
`;

function* generadorFibonacci() {
  let a = 0;
  let b = 1;
  let c = 1;
  while (true) {
    c = a + b;
    yield c;
    a = b;
    b = c;
  }
}

let current: number;
let previous: number;
function generarSerieFibonacci(n) {
  const generador = generadorFibonacci();
  for (let i = 0; i < n; i++) {
    current = Number(generador.next().value);
    addRectangle(previous, current, i);
    previous = current;
  }
}

const n = 18;
generarSerieFibonacci(n);

function addRectangle(prev: number, curr: number, index: number) {
  console.log(index % 4, curr);
  let rectangle = document.createElement("div");
  rectangle.className = "rectangle";
  rectangle.style.width = `${curr}px`;
  rectangle.style.height = `${curr}px`;

  rectangle.style.background = generarGradienteAleatorio();
  switch (index % 4) {
    case 0:
      rectangle.style.borderBottomLeftRadius = "100%";
      rectangle.style.bottom = `0px`;
      rectangle.style.marginLeft = `-${curr}px`;
      break;
    case 1:
      rectangle.style.borderTopLeftRadius = "100%";
      rectangle.style.bottom = `${prev}px`;
      break;
    case 2:
      rectangle.style.borderTopRightRadius = "100%";
      rectangle.style.marginLeft = `${prev}px`;
      break;

    case 3:
      rectangle.style.borderBottomRightRadius = "100%";
      rectangle.style.right = `0px`;
      rectangle.style.marginTop = `${prev}px`;
      break;
  }
  let rectangles = document.getElementsByClassName("rectangle");
  if (rectangles.length) {
    rectangles[rectangles.length - 1]!.appendChild(rectangle);
  } else {
    document.getElementById("fibonacci")!.appendChild(rectangle);
  }
}

function generarColorAleatorio(): string {
  const letras = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letras[Math.floor(Math.random() * 16)];
  }
  return color;
}
function generarGradienteAleatorio(): string {
  const color1 = generarColorAleatorio();
  const color2 = generarColorAleatorio();
  return `linear-gradient(to right, ${color1}, ${color2})`;
}
