import Link from "next/link";

export default function NavBar() {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav className="mx-24">
        <div className="grid gap-10 h-full w-full grid-cols-2 bg-[#191919] text-white bg-opacity-50 ">
          <Link href="/">
            <div className="lg:flex font-bold hidden">
              <span className="text-[35px] text-red-700">VIBEO</span>
            </div>
          </Link>
          <div className="lg:flex lg:justify-end lg:content-end hidden">
            <nav>
              <Link
                className="mx-4 group text-black-500 transition-all duration-300 ease-in-out"
                href="/movies"
              >
                <span className="bg-left-bottom text-sm font-bold bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  MOVIES
                </span>
              </Link>
              <Link
                className="mx-4 group text-black-500 transition-all duration-300 ease-in-out"
                href="/theater-film"
              >
                <span className="bg-left-bottom text-sm font-bold bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  THEATER
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </nav>
    </section>
  );
}
