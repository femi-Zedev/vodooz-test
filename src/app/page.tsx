import Image from "next/image";


export default function Home() {
  return (
    <section className="flex justify-between bg-white px-32 bg-no-repeat bg-right w-full pt-12" style={{ backgroundImage: `url("/bg-pattern.svg")` }}>
      <hgroup className="my-auto">
        <h1 className="text-7xl leading-tight font-bold uppercase">
          Venez lire vos <br />
          auteurs favoris
        </h1>

        <p className="body24-regular mt-3">
          Trouvez les meilleurs livre du moment et vos livres préférés
        </p>
      </hgroup>

      <Image
        src={"/woman.png"}
        alt={"woman"}
        width={290}
        height={490}
        style={{ width: "250px", height: "auto" }} />
    </section>


  );
}
