'use client';

export default function Home() {
  const mostrarAlerta = () => {
    alert("olá mundo!");
  };
  
  return (
    <div className="text-4xl m-4">
      <h1>Olá Mundo</h1>
      <button onClick={mostrarAlerta} className="bg-blue-400 p-2 cursor-pointer rounded hover:bg-black text-white transition-colors duration-200 ease-in-out">mostrar alerta</button>
    </div>
  );
}
