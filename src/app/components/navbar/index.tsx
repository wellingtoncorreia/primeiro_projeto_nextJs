import Link from "next/link";

export function Navbar() {
  return (
    <nav className="bg-black text-white py-5 px-8 flex justify-between items-center">
      <h1 className="text-xl font-bold">logo</h1>
      <ul className="flex gap-6">
        <li><Link href="/">HOME</Link></li>
        <li><Link href="/contatos">CONTATOS</Link></li>
        <li><Link href="/dashboard">DASHBOARDS</Link></li>
        <li><Link href="/pokemon">POKEMON</Link></li>
      </ul>
    </nav>
  );
}
